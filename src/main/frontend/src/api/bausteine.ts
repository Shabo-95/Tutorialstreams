import { Baustein } from "../interfaces/Baustein";

const url_prod = "http://localhost:8080/baustein/";

//Baustein erstellen Funktion
export const createBaustein = async (data: Baustein) => {
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

//Baustein aktualisieren Funktion
export const updateBaustein = async (data: Baustein) => {
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

//Baustein abrufen Funktion
export const getBausteinById = async (id: string) => {
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

//Baustein abrufen Funktion
export const getBausteinByName = async (name: string) => {
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

//Alle Bausteine abrufen Funktion
export const getAllBausteine = async () => {
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

//Baustein löschen Funktion
export const deleteBaustein = async (id: string) => {
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
