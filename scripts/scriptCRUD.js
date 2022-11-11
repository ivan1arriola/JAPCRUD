const SERVER_MOCK = "https://63606653af66cc87dc137d25.mockapi.io"
const GET = "/users/"
const POST = "/users"
const PUT = "/users/"
const DELETE = "/users/"

const showAlert = (message) => {
    const bsAlert = document.createElement("div")
    bsAlert.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show")
    bsAlert.setAttribute("role", "alert")
    bsAlert.innerHTML = message
    const button = document.createElement("button")
    button.classList.add("btn-close")
    button.setAttribute("type", "button")
    button.setAttribute("data-bs-dismiss", "alert")
    button.setAttribute("aria-label", "Close")
    bsAlert.appendChild(button)
    document.body.appendChild(bsAlert)
}


// Metodo Get

const btnGet1 = document.getElementById("btnGet1"); //Get
const results = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");

btnGet1.addEventListener("click", async () => {
    try {
        const response = await fetch(SERVER_MOCK + GET);
        const data = await response.json();
        showData(data);
    } catch (error) {
        showAlert("Ocurrió un error");
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
        showAlert("Ocurrió un error");
        console.log(error);
    }
}

// Metodo Put

const btnModalPut = document.getElementById("btnPut");
const putBox = document.getElementById("put-box")
const inputPutId = document.getElementById("inputPutId");

const dataModal = document.getElementById("dataModal");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnSendChanges = document.getElementById("btnSendChanges");

// Habilita o desabilita el boton Modal Put
putBox.addEventListener("change", async() => {
    if (inputPutId.value) {
       btnModalPut.disabled = false;
    } else {
        btnModalPut.disabled = true;
    }
});

btnModalPut.addEventListener("click", async () => {
    const id = inputPutId.value;
    const response = await fetch(SERVER_MOCK + GET + id);
    const data = await response.json();
    if(data.id){
        inputPutNombre.value = data.name;
        inputPutApellido.value = data.lastname;
        dataModal.classList.add("show");
        const myModal = new bootstrap.Modal('#dataModal', {
            keyboard: false
          })
        myModal.show();
          
    } else {
        showAlert("No existe el usuario");
    }
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
        showAlert("Ocurrió un error");
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
        if (response.status === 200) {
            showAlert("Usuario eliminado");
        } else {
            showAlert("No existe el usuario");
        }
    } catch (error) {
        showAlert("Ocurrió un error");
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
