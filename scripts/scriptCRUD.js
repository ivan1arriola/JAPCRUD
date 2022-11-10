const SERVER_MOCK = "https://63606653af66cc87dc137d25.mockapi.io"
const GET = "/users/"
const POST = "/users"
const PUT = "/users/"
const DELETE = "/users/"

const btnGet1 = document.getElementById("btnGet1");
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

function showData(data) {    
    if (!inputGet1Id.value) {
        results.innerHTML = "";
        for (const datos of data) {
            results.innerHTML += `<p>Nombre: ${datos.name} <br>Apellido: ${datos.lastname} <br> ID: ${datos.id} </p>`;            
        }        
    } else {
        let encontrado = false;
        for (const datos of data) {
            if (datos.id===inputGet1Id.value) {                
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