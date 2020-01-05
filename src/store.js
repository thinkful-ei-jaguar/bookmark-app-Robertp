const items = {
    bookmarks: [
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
const getError = function (error) {
  return this.items.error;
};





export default{
  items,
  addItem,
  removeitem,
  setError,
  getError
}