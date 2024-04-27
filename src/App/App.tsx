import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Accueil from "../Pages/Accueil/Accueil";
import ShoppingList from "../Pages/ShoppingList/ShoppingList";
import Parameters from "../Pages/Parameters/Parameters";
import CreateRecipe from "../Pages/CreateRecipe/CreateRecipe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Recipes from "../Pages/Recipes/Recipes";
import { useAxiosInterceptors } from "../Hooks/useAxiosInterceptor.hook";
import { logOut, updateAuth } from "../Store/Reducers/authReducer";
import HelloF from "../Pages/HelloF/HelloF";
import { useFetchGet } from "../Hooks/api.hook";
import { errorToast } from "../Services/functions";
import { updateSecondaryTables } from "../Store/Reducers/secondaryTablesReducer";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const App = () => {
  const isInterceptorActive = useAxiosInterceptors();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const toast = useRef(null);
  const staticData = useFetchGet<Partial<SecondaryState>>("/retrieveStaticData")

  useEffect(() => {
    if (!auth.isConnected && window.location.pathname !== "/") window.location.replace("/")
  }, [auth.isConnected])

  useEffect(() => {
    dispatch(updateAuth({
      toast: toast.current,
    }));
  }, [toast.current]);


  useEffect(() => {
    if (staticData.error) {
      errorToast("Le site a rencontré une erreur technique, veuillez revenir dans quelques minutes")
      dispatch(logOut())
    }

    if (staticData.loaded && staticData.data) {
      dispatch(updateSecondaryTables({
        regimes: staticData.data.regimes,
        types: staticData.data.types,
        ingTypes: staticData.data.ingTypes,
        units: staticData.data.units
      }))
    }
  }, [staticData.loaded]);

  return (
    <div id="app">
      <BrowserRouter>
        <Toast ref={toast}></Toast>
        {auth.isConnected && <NavBar></NavBar>}
        {isInterceptorActive &&
          <Routes>
            <Route path="/" element={<Accueil />}></Route>
            {auth.isConnected && (
              <>
                <Route path="/all" element={<Recipes />}></Route>
                <Route path="/shop" element={<ShoppingList />}></Route>
                <Route path="/param" element={<Parameters />}></Route>
                <Route path="/create" element={<CreateRecipe />}></Route>
                <Route path="/hf" element={<HelloF />}></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        }
        {auth.isConnected && <Footer></Footer>}
      </BrowserRouter>
    </div>
  );
};

export default App;
