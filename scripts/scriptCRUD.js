const SERVER_MOCK = "https://63606653af66cc87dc137d25.mockapi.io"
const GETALL = "/users"
const GET = "/users/"
const POST = "/users"
const PUT = "/users/"
const DELETE = "/users/"

const getAllJSONData = () => {
    let result = {};
    return fetch(SERVER_MOCK + GETALL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        result.status = "ok";
        result.data = response;
        hideSpinner();
        return result;
      })
      .catch(function (error) {
        result.status = "error";
        result.data = error;
        hideSpinner();
        return result;
      });
  };