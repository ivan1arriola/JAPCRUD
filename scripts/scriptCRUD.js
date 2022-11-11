const SERVER_MOCK = "https://63606653af66cc87dc137d25.mockapi.io"
const GET = "/users/"
const POST = "/users"
const PUT = "/users/"
const DELETE = "/users/"

const btnGet1 = document.getElementById("btnGet1"); //Get
const results = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");

btnGet1.addEventListener("click", async () => {
    try {
        const response = await fetch(SERVER_MOCK + GET);
        const data = await response.json();
        showData(data);
    } catch (error) {
        alert("Ocurrió un error");
    }
});

// Metodo Post
const btnPost = document.getElementById("btnPost");
const postBox = document.getElementById("post-box")
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");

postBox.addEventListener("change", () => {
    if (inputPostNombre.value && inputPostApellido.value) {
        btnPost.disabled = false;
    } else {
        btnPost.disabled = true;
    }
});

btnPost.addEventListener("click", async () => {
    const newUser = {
        name: inputPostNombre.value,
        lastname: inputPostApellido.value,
    };
    addUser(newUser);
});

const addUser = async (newUser) => {
    try {
        const response = await fetch(SERVER_MOCK + POST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        const data = await response.json();
        console.log(response);
    } catch (error) {
        alert("Ocurrió un error");
        console.log(error);
    }
}

// Metodo Put

const showModalPut = document.getElementById("btnPut");
const putBox = document.getElementById("put-box")
const inputPutId = document.getElementById("inputPutId");

const dataModal = document.getElementById("dataModal");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnSendChanges = document.getElementById("btnSendChanges");

putBox.addEventListener("change", async() => {
    if (inputPutId.value) {
        const id = inputPutId.value;
        const response = await fetch(SERVER_MOCK + GET + id);
        const data = await response.json();
        if(data.id) showModalPut.disabled = false;
        else showModalPut.disabled = true;
    } else {
        showModalPut.disabled = true;
    }
});

showModalPut.addEventListener("click", async () => {
    const id = inputPutId.value;
    const response = await fetch(SERVER_MOCK + GET + id);
    const data = await response.json();
    inputPutNombre.value = data.name;
    inputPutApellido.value = data.lastname;
});

dataModal.addEventListener("change", () => {
    if (inputPutNombre.value && inputPutApellido.value) {
        btnSendChanges.disabled = false;
    } else {
        btnSendChanges.disabled = true;
    }
});


btnSendChanges.addEventListener("click", async () => {
    const id = inputPutId.value;
    const updatedUser = {
        name: inputPutNombre.value,
        lastname: inputPutApellido.value,
    };
    try {
        const response = await fetch(SERVER_MOCK + PUT + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });
        const data = await response.json();
        console.log(response);
    } catch (error) {
        alert("Ocurrió un error");
        console.log(error);
    }
});



// Metodo Delete

const btnDelete = document.getElementById("btnDelete");
const deleteBox = document.getElementById("delete-box")
const inputDelete = document.getElementById("inputDelete");

deleteBox.addEventListener("change", () => {
    if (inputDelete.value) {
        btnDelete.disabled = false;
    } else {
        btnDelete.disabled = true;
    }
});

btnDelete.addEventListener("click", async () => {
    const id = inputDelete.value;
    try {
        const response = await fetch(SERVER_MOCK + DELETE + id, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(response);
    } catch (error) {
        alert("Ocurrió un error");
        console.log(error);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
function showData(data) {
    if (!inputGet1Id.value) {
        results.innerHTML = "";
        for (const datos of data) {
            results.innerHTML += `<p>Nombre: ${datos.name} <br>Apellido: ${datos.lastname} <br> ID: ${datos.id} </p>`;
        }
    } else {
        let encontrado = false;
        for (const datos of data) {
            if (datos.id === inputGet1Id.value) {
                results.innerHTML = `<p>Nombre: ${datos.name} <br>Apellido: ${datos.lastname} <br> ID: ${datos.id} </p>`;
                encontrado = true;
            }
        }
        if (!encontrado) {
            results.innerHTML = `<p> Usuario no encontrado </p>`;
        }
    }
}

const post = async (data) => {
    const response = await fetch(SERVER_MOCK + POST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

const put = async (id, data) => {
    const response = await fetch(SERVER_MOCK + PUT + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

const remove = async (id) => {
    const response = await fetch(SERVER_MOCK + DELETE + id, {
        method: "DELETE"
    })
    const result = await response.json()
    return result
}