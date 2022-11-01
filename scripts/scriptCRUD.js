const SERVER_MOCK = "https://63606653af66cc87dc137d25.mockapi.io"
const GET = "/users/"
const POST = "/users"
const PUT = "/users/"
const DELETE = "/users/"

const get = async (id = "")  => {
    const response = await fetch(SERVER_MOCK + GET + id)
    const data = await response.json()
    return data
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