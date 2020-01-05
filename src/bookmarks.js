import $ from 'jquery';
import './index.css';
import store from './store';
import api from './api'



const newbutton = function(){
    return `
        <div class="head">
            <button class="buttonstyle">New</button>
            <select class= "select"  name="select">
                <option value="filter">reset</option>
                <option type="submit" value="by min to max">Starting at low</option>
                <option type="submit" value="by max to min">Starting at high</option>
                <option type="submit" value="Rating 5 or higher">Rating 5 or higher</option>
                <option type="submit" value="Rating 4 or higher">Rating 4 or higher</option>
                <option type="submit" value="Rating 3 or higher">Rating 3 or higher</option>
                <option type="submit" value="Rating 2 or higher">Rating 2 or higher</option>
            </select>
    </div>
    `
}
const handlebuttonclickonfilter=function(){
    $('.select').change(function(event){
        //event.preventDefault();
        //store.items.bookmarks=[];
        


        if($(this).val() == "by min to max"){
            
            let a = store.items.bookmarks.sort(function(a, b){
                return a.rating-b.rating
            });
           
            thebody();
            handlebuttonclickonbox();
            
        }
        else if($(this).val() == "filter"){
           store.items.bookmarks=[];
            api.getItems()
                .then(res => res.json())
                .then((items) => {
                    //console.log(items);
                items.forEach((item) => store.addItem(item));
            });
            thebody();
            handlebuttonclickonbox();
        }
        else if($(this).val() == "by max to min"){
           
            let a = store.items.bookmarks.sort(function(a, b){
                return b.rating-a.rating
            });
            thebody();
            handlebuttonclickonbox();
            
        }
        else if($(this).val() == "Rating 5 or higher"){
            let al = store.items.bookmarks.filter(function(a){
                return a.rating >4
            });
            const a2=store.items.bookmarks;
            store.items.bookmarks=al;
            thebody();
            handlebuttonclickonbox();
            store.items.bookmarks=a2;
        }
        else if($(this).val() == "Rating 4 or higher"){
           
            let al = store.items.bookmarks.filter(function(a){
                return a.rating >3
            });
            const a2=store.items.bookmarks;
            store.items.bookmarks=al;

            thebody();
            handlebuttonclickonbox();
            store.items.bookmarks=a2;
            
        }
        else if($(this).val() == "Rating 3 or higher"){
           
            let al = store.items.bookmarks.filter(function(a){
                return a.rating >2
            });
            
            store.items.bookmarks=al;
            const a2=store.items.bookmarks;
            thebody();
            handlebuttonclickonbox();
            store.items.bookmarks=a2;
        }
        else if($(this).val() == "Rating 2 or higher"){
           
            let al = store.items.bookmarks.filter(function(a){
                return a.rating > 1
            });
            const a2=store.items.bookmarks;
            store.items.bookmarks=al;
            thebody();
            handlebuttonclickonbox();    
            store.items.bookmarks=a2;

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
        const data = $(event.currentTarget).find("#box2");
        $(data).toggle();
        handlebuttonclickondeleteitem();
    
    });
}
const handlebuttonclickonadditem=function(){
    $('#new-bookmark-form').on('submit',function(event){
        event.preventDefault();
        var newbook = $('#new-bookmark-form').serializeArray();
        let bookmark={
            "title":newbook[1].value,
            "url":newbook[0].value,
            "rating":newbook[2].value,
            "desc" : newbook[3].value,
        }
        
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
        const data = $(event.currentTarget).closest(".test1").find('#box').find('h3').text();//grabs title
        const del=$(event.currentTarget).closest(".test1").find('#box').find('h3').attr('id');//gets element id  
        store.removeitem(data);//removes from store
        api.DeleteItem(del)//remove from api
            .then(() => {
                thebody();//rendersnewdody
                handlebuttonclickonbox();

         })
         .catch((error) => {
            store.setError(error.message);
        });
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