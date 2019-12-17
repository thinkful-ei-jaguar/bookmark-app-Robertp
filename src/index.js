import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api';
//import store from './store';



import bookmarks from "./bookmarks";


const main = function () {
    console.log("ok");
    api.getItems()
    .then(res => res.json())
    .then((items) => {
        console.log(items);
      //items.forEach((item) => store.addItem(item));
      //bookmarks.render();
    });

    bookmarks.render();
    bookmarks.eventhandler();
    console.log("loaded");
};





$(main);

