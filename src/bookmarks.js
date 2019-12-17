import $ from 'jquery';
import './index.css';
import store from './store';
import api from './api'



const newbutton = function(){
    return `
        <div class="head">
            <button class="buttonstyle">New</button>
            <button class="filter">filter</button>
            <div class=""filtercontent">
            </div>
    </div>
    `
}
const handlebuttonclickonnew=function(){
    $('.buttonstyle').click(function(event){
        event.preventDefault();
        $("#new-bookmark-form").toggle();
    });
}

const handlebuttonclickonbox=function(){
    $('.test1').on('click',function(event){
        //console.log(event.currentTarget);
        const data = $(event.currentTarget).find("#box2");
        //console.log(data);
        $(data).toggle();
        handlebuttonclickondeleteitem();
        //event.stopPropagation();
    
    });
}
const handlebuttonclickonadditem=function(){
    $('#additem').on('click',function(event){
        event.preventDefault();
        var newbook = $('#new-bookmark-form').serializeArray();
        let bookmark={
            "title":newbook[1].value,
            "url":newbook[0].value,
            "rating":newbook[2].value,
            "description":newbook[3].value,
        }
        console.log(bookmark);
        /*api.createItem(bookmark)
            .then(res => res.json())
            .then((newItem) => {

                store.addItem(newItem);
                //render();
      });*/
        store.addItem(bookmark);
        thebody();//rendersnewdody
        handlebuttonclickonbox();
    });
}


const handlebuttonclickondeleteitem = function(){
    $('#removeitem').on('click',function(event){
        //event.preventDefault();
        console.log("my cause is just")
        const data = $(event.currentTarget).closest(".test1").find('#box').find('h3').text();//grabs title
        console.log(data);
        store.removeitem(data);
        const domel=$(event.currentTarget).closest(".test1");
        console.log(domel);
        thebody();//rendersnewdody
        handlebuttonclickonbox();
        //renders the eventfornewbody    
    });
}




const newbookadd= function(){
    return `<form id="new-bookmark-form" style="display:none">
            <label for="newbookmarkentry">Add New Bookmark</label>
            <input type="text" name="url" class="add-new-bookmark-entry" placeholder="Http//samplelink.code/whatever">
            <label for="Name">Name</label>
            <input type="text" name="title" class="add-new-bookmark-name" placeholder="harry potter,blues clue">
            <label for="stars">how many stars</label>
            <input type="text" name="rating" class="add-new-bookmark-star" placeholder="1-5">
            <label for="desctiption">description : </label>
            <input class="higherheight" type="text" name="description" class="add-new-bookmark-star" placeholder="orem lipsum .." height:"50px">
            <button class ="additem" id="additem">Add item</button>
    </form>
    `
}

const generatelistofbookmarks= function(books){
    let htmlbod = "";
    books.map(element=>{
        htmlbod+=`
        <div class ="test1" id="box-toggle">
            <div class ="box"id="box">
                <h3>${element.title}</h3>
                <p class="rightpls"> ${element.rating}</p>
            </div>
            <div class ="box2" style="display:none" id="box2">
                <h5 class='test'>${element.url}</h5>
                <p> ${element.description}</p>
                <button class="removeitem"id="removeitem">Remove item</button>
            </div>
            
        </div>
        `
        //console.log(element);
        });
    return htmlbod;

};



const thebody = function(){

    const thebod = generatelistofbookmarks(store.items.bookmarks);
    $('.body').html(thebod);

}

const thetop = function(){
    let htmltop='';
    const button =  newbutton();
    const newbookform = newbookadd();
    htmltop=button+newbookform;
    $('.head').html(htmltop);
}






const eventhandler=function(){
    handlebuttonclickonnew();
    handlebuttonclickonbox();
    handlebuttonclickonadditem();
    handlebuttonclickondeleteitem();

}

const render = function() {
    thetop();
    thebody();

}

export default{
    render,
    eventhandler
};