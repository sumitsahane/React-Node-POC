/* Action Types */
export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "UPDATE_PIECHART";

export function getProductList() {
  return dispatch => {
    fetch("/api/read")
      .then(res => res.json())
      .then(responseJson => {
        dispatch({ type: GET_PRODUCT_LIST, data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createProduct(prodObj) {
  return dispatch => {
    fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prodObj)
    })
      .then(res => res.json())
      .then(responseJson => {
        dispatch({ type: CREATE_PRODUCT, data: responseJson.pobj });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function updateProduct(prodObj) {
  return dispatch => {
    fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prodObj)
    })
      .then(res => res.json())
      .then(responseJson => {
        dispatch({ type: UPDATE_PRODUCT, data: responseJson.pobj });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteProduct(id) {
  return dispatch => {
    fetch("/api/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    })
      .then(res => res.json())
      .then(responseJson => {
        dispatch({ type: DELETE_PRODUCT, id: id });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
