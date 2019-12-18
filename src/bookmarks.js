import $ from 'jquery';
import './index.css';
import store from './store';
import api from './api'



const newbutton = function(){
    return `
        <div class="head">
            <button class="buttonstyle">New</button>
            <select class= "select"  name="select">
                <option value="none">filter</option>
                <option type="submit" value="by min to max">Starting at low</option>
                <option type="submit" value="by max to min">Starting at high</option>
            </select>
    </div>
    `
}
const handlebuttonclickonfilter=function(){
    $('.select').change(function(event){
        //event.preventDefault();
        console.log($(this).val())
        if($(this).val() == "by min to max"){
            console.log("unsorted")
            let a = store.items.bookmarks.sort(function(a, b){
                return a.rating-b.rating
            });
            //console.log(a);
            thebody();
            handlebuttonclickonbox();
            console.log("sorted")
        }
        else if($(this).val() == "by max to min"){
            console.log("unsorted")
            let a = store.items.bookmarks.sort(function(a, b){
                return b.rating-a.rating
            });
            //console.log(a);
            thebody();
            handlebuttonclickonbox();
            console.log("sorted")
        }

    });
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
    $('#additem').on('submit',function(event){
        event.preventDefault();
        var newbook = $('#new-bookmark-form').serializeArray();
        let bookmark={
            "title":newbook[1].value,
            "url":newbook[0].value,
            "rating":newbook[2].value,
            "desc" : newbook[3].value,
        }
        //console.log(bookmark.description);
        api.createItem(bookmark)
            .then(newItem => {
                store.addItem(newItem);
                thebody();
                handlebuttonclickonbox(); 
             })
             .catch((error) => {
                store.setError(error.message);
            });
        
        thebody();//rendersnewdody
        handlebuttonclickonbox();
        
    });
}


const handlebuttonclickondeleteitem = function(){
    $('.removeitem').on('click',function(event){
        event.preventDefault();
        console.log("my cause is just")
        const data = $(event.currentTarget).closest(".test1").find('#box').find('h3').text();//grabs title
        console.log(data);
        const del=$(event.currentTarget).closest(".test1").find('#box').find('h3').attr('id');//gets element id
        console.log(del);
        store.removeitem(data);//removes from store
        api.DeleteItem(del)//remove from api
            .then(() => {
                thebody();//rendersnewdody
                handlebuttonclickonbox();
                //render();
         })
         .catch((error) => {
            store.setError(error.message);
        });
        console.log("reachedend");
        thebody();//rendersnewdody
        handlebuttonclickonbox();//renders the eventfornewbody    
    });
}




const newbookadd= function(){
    return `<form id="new-bookmark-form" style="display:none">
            <label for="newbookmarkentry">Add New Bookmark</label>
            <input type="text" name="url" class="add-new-bookmark-entry" placeholder="Http//samplelink.code/whatever" required>
            <label for="Name">Name</label>
            <input type="text" name="title" class="add-new-bookmark-name" placeholder="harry potter,blues clue" required>
            <label for="stars">how many stars</label>
            <input type="text" name="rating" class="add-new-bookmark-star" placeholder="1-5" required>
            <label for="desctiption">description : </label>
            <input class="higherheight" type="text" name="description" class="add-new-bookmark-star" placeholder="orem lipsum .." height:"50px" required>
            <button type= "submit" class ="additem" id="additem">Add item</button>
    </form>
    `
}

const generatelistofbookmarks= function(books){
    let htmlbod = "";
    books.map(element=>{
        htmlbod+=`
        <div class ="test1" id="box-toggle">
            <div class ="box"id="box">
                <h3 id= ${element.id}>${element.title}</h3>
                <p class="rightpls"> rating: ${element.rating}</p>
            </div>
            <div class ="box2" style="display:none" id="box2">
                <a href=${element.url} target="_blank">${element.url}</a>
                <p> ${element.desc}</p>
                <button class="removeitem">Remove item</button>
            </div>
        </div>
        `
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
    handlebuttonclickonfilter();

}

const render = function() {
    thetop();
    thebody();

}

export default{
    render,
    eventhandler
};