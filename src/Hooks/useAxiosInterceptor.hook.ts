import axios from "axios";
import { store } from "../Store/store";
import { logOut, updateAuth } from "../Store/Reducers/authReducer";
import { useEffect, useState } from "react";
import { fetchPost } from "./api.hook";

type RefreshSubscriber = (newToken: string) => void;

export const useAxiosInterceptors = () => {
  // State pour suivre si l'intercepteur est actif
  const [isInterceptorActive, setIsInterceptorActive] = useState(false);

  useEffect(() => {
    // Utilisation de deux variables pour gérer le rafraîchissement du token JWT
    let isRefreshing = false; // Indique si une opération de rafraîchissement du token est en cours
    let refreshSubscribers: RefreshSubscriber[] = []; // Liste de fonctions de rappel pour rejouer les requêtes après le rafraîchissement du token

    // Configuration de l'intercepteur Axios pour gérer les réponses
    axios.interceptors.response.use(
      // Fonction pour traiter les réponses réussies
      (response) => response,
      // Fonction pour traiter les erreurs de réponse
      async (error) => {
        // Extraction du message d'erreur et du statut de la réponse
        const message = error.response?.data?.message;
        const status = error.response?.status;

        // Vérification si le statut est 401 et le message est "Expired JWT Token"
        if (status === 401 && message === "Unauthorized") {
          const originalRequest = error.config; // Sauvegarde de la requête d'origine

          // Vérification si aucune opération de rafraîchissement du token n'est déjà en cours
          if (!isRefreshing) {
            isRefreshing = true; // Définition de l'indicateur de rafraîchissement à true pour indiquer qu'une opération de rafraîchissement est en cours

            try {
              // Tentative de rafraîchir le token JWT en envoyant une requête POST au point de terminaison de rafraîchissement du token
              const res = await fetchPost("/auth/refresh", {}, false, true);

              // Extraction du nouveau token JWT de la réponse
              const newToken = res.data.access_token;

              // Mise à jour du token JWT dans le store Redux
              store.dispatch(
                updateAuth({
                  token: newToken,
                })
              );

              // Mise à jour du token JWT dans l'en-tête de la requête d'origine
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // Appel de toutes les fonctions de rappel en attente pour rejouer les requêtes avec le nouveau token JWT
              refreshSubscribers.forEach((callback) => callback(newToken));

              // Réinitialisation de la liste des fonctions de rappel après avoir traité toutes les requêtes en attente
              refreshSubscribers = [];

              // Renvoi de la requête d'origine avec le nouveau token JWT
              return axios(originalRequest);
            } catch (err) {
              // En cas d'erreur lors du rafraîchissement du token, déconnexion de l'utilisateur
              store.dispatch(logOut());
              // Renvoi de l'erreur pour la traiter au niveau supérieur
              return Promise.reject(err);
            } finally {
              // Réinitialisation de l'indicateur de rafraîchissement après avoir traité la demande de rafraîchissement
              isRefreshing = false;
            }
          } else {
            // Si une opération de rafraîchissement est déjà en cours, mise en file d'attente de la requête d'origine dans la liste des fonctions de rappel
            return new Promise((resolve) => {
              refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest));
              });
            });
          }
        }

        // Si le statut de la réponse n'est pas 401 ou si le message n'est pas "Expired JWT Token", renvoyer l'erreur pour la traiter au niveau supérieur
        return Promise.reject(error);
      }
    );

    // Mise à jour de l'état pour indiquer que l'intercepteur est actif
    setIsInterceptorActive(true);
  }, []); // L'effet est exécuté une seule fois après le montage du composant

  // Renvoyer l'état qui indique si l'intercepteur est actif
  return isInterceptorActive;
};
