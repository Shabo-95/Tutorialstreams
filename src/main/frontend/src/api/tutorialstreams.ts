import { Tutorialstream } from "../interfaces/Tutorialstream";

const url_prod = "http://localhost:8080/framework/";

//Tutorialstream erstellen Funktion
export const createTutorialstream = async (data: Tutorialstream) => {
  return await fetch(url_prod + "create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log(error));
};

//Tutorialstream aktualisieren Funktion
export const updateTutorialstream = async (data: Tutorialstream) => {
  return await fetch(url_prod + "update", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log(error));
};

//Tutorialstream abrufen Funktion
export const getTutorialstreamById = async (id: string) => {
  return await fetch(url_prod + "id/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
};

//Tutorialstream abrufen Funktion
export const getTutorialstreamByName = async (name: string) => {
  return await fetch(url_prod + "name/" + name, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
};

//Alle Tutorialstreame abrufen Funktion
export const getAllTutorialstreams = async () => {
  return await fetch(url_prod + "all", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => console.log(error));
};

//Tutorialstream löschen Funktion
export const deleteTutorialstream = async (id: string) => {
  return await fetch(url_prod + "delete/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(
        "status:",
        res.status,
        res.ok ? "-> item deleted successfully" : ""
      );
      // Either true or false
      return res.ok;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
