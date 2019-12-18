const items = {
    bookmarks: [
      {
        id: 'x56w',
        title: 'Title 1',
        rating: 3,
        url: 'http://www.title1.com',
        desc: 'lorem ipsum dolor sit',
      },
      {
        id: '6ffw',
        title: 'Title 2',
        rating: 5,
        url: 'http://www.title2.com',
        desc: 'dolorum tempore deserunt',
      }
    ],
    adding: false,
    error: null,
    filter: 0
};


const addItem = function (item) {
  this.items.bookmarks.push(item);
  //console.log(this.items.bookmarks);
};
const removeitem = function(item){
  console.log(item);
  console.log(this.items.bookmarks);
  for( var i = 0; i < this.items.bookmarks.length; i++){ 
    if ( this.items.bookmarks[i].title === item) {
      //console.log(this.items.bookmarks);
      this.items.bookmarks.splice(i,1); 
    }
    
 }

};
const setError = function (error) {
  this.items.error = error;
};





export default{
  items,
  addItem,
  removeitem,
  setError
}