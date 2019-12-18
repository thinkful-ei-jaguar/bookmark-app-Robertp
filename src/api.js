import store from './store'

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Robert';

const getItems = function() {
  return fetch(`${BASE_URL}/bookmarks`); 
};

const createItem = function (bookmark) {
  const newItem = JSON.stringify(bookmark);
  return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:newItem
    })
    .catch((error) => {
        store.setError(error.message);

    });
};
const DeleteItem = function (id) {
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
        store.setError(error.message);
  
      });
  
  }



  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
   
        // In either case, parse the JSON stream:
        return res.json();
      })
   
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
   
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }
  

export default {
  getItems,
  createItem,
  DeleteItem
};