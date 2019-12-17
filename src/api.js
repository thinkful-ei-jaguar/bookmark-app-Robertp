const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Robert';

const getItems = function() {

  return fetch(`${BASE_URL}/bookmarks`); 
};

const createItem = function (name) {
  const newItem = JSON.stringify(name);
    console.log(newItem);
  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:newItem
  });
};
/*
const updateItem = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  console.log(`${BASE_URL}/items/${id}`);
  return fetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};
const DeleteItem = function (id) {
  console.log(`${BASE_URL}/items/${id}`);
  return fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

}

*/
export default {
  getItems,
  createItem,
  //updateItem,
  //DeleteItem
};