import { store } from "../Store/store";

export const timeToString = (time: string) => {
  const splittedTime = time.split(":");
  const hours = Number(splittedTime[0]);
  const minutes = Number(splittedTime[1]);

  if (hours === 1) {
    if (minutes === 0) {
      return hours + " heure";
    } else {
      return hours + "h" + minutes;
    }
  } else if (hours > 1) {
    if (minutes === 0) {
      return hours + " heures";
    } else {
      return hours + "h" + minutes;
    }
  } else {
    return minutes + " minutes";
  }
};

/**
 * Retourne une date string au format MM-YYYY
 * @param date
 * @returns string
 */
export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const monthKey = `${newDate.getDate().toString().padStart(2, "0")}-${(
    newDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${newDate.getFullYear()}`;

  return monthKey;
};

export const successToast = (message: string, summary: string = "Succès") => {
  const reduxStore = store.getState();
  reduxStore.auth.toast.show({
    severity: "success",
    summary: `${summary} : `,
    detail: message,
    life: 3000,
  });
};

export const errorToast = (message: string, summary: string = "Erreur") => {
  const reduxStore = store.getState();
  reduxStore.auth.toast.show({
    severity: "error",
    summary: `${summary} : `,
    detail: message,
    life: 3000,
  });
};
