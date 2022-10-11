import { Tutorial } from "../interfaces/Tutorial";

const url_prod = "http://localhost:8080/tutorial/";

//Tutorial erstellen Funktion
export const createTutorial = async (data: Tutorial) => {
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

//Tutorial aktualisieren Funktion
export const updateTutorial = async (data: Tutorial) => {
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

//Tutorial abrufen Funktion
export const getTutorialById = async (id: string) => {
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

//Tutorial abrufen Funktion
export const getTutorialByName = async (name: string) => {
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

//Tutorial abrufen Funktion
export const getTutorialByBaustein = async (baustein: string) => {
    return await fetch(url_prod + baustein, {
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

//Tutorial abrufen Funktion
export const getTutorialByBausteinAndLevel = async (
    baustein: string,
    level: string
) => {
    return await fetch(url_prod + baustein + "/" + level, {
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

//Alle Tutorials abrufen Funktion
export const getAllTutorials = async () => {
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

//Tutorial löschen Funktion
export const deleteTutorial = async (id: string) => {
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
