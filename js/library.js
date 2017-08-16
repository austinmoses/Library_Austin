var Library = function(city){
  this.myBookArr = new Array();
  this.instanceKey = city;
};

Library.prototype.init = function(){
  //cache selectors into variables
  this._checkLocalStorage();
  this._bindEvents();
   //recycle retreive() (get)
  //call function to populate book array if localstorage has our book array.
};

Library.prototype._bindEvents = function(){
  $("button.get-my-name").on("click", $.proxy(this._handleGetMyName, this)); //"this._handleGetMyName" would refer to the wrong thing. wrapping it in proxy resets referral
  $("#book-by-title-expand").click(function(){
    $("#book-by-title-content").slideToggle();
  });
  $("#book-by-author-expand").click(function(){
    $("#book-by-author-content").slideToggle();
  });
  $("#add-book-expand").click(function(){
    $("#add-book-content").slideToggle();
  });
  $("#remove-book-expand").click(function(){
    $("#remove-book-content").slideToggle();
  });
  $("#add-books-button").on("click", $.proxy(this.addBookForm, this));
  $("#remove-title-button").on("click", $.proxy(this.removeBookByTitle($("#remove-title-input").val()), this));//$.proxy(this.removeBookByTitle($("#remove-title-input").val()), this));
};

Library.prototype._checkLocalStorage = function(){
  var libLoad = JSON.parse(localStorage.getItem("denver")) || this._autoPush();
  this.myBookArr = libLoad;
  this._loadLibrary();
};

Library.prototype._loadLibrary = function(){
  var $libTable = $("#libTable");
  for(var i = 0; i < this.myBookArr.length; i++){
    var newRow = $("<tr>");
    var titleLoad = $("<td>").text(this.myBookArr[i].title);
    var authorLoad = $("<td>").text(this.myBookArr[i].author);
    var pagesLoad = $("<td>").text(this.myBookArr[i].numPages);
    var pDateLoad = $("<td>").text(this.myBookArr[i].pDate);

    newRow.append(titleLoad);
    newRow.append(authorLoad);
    newRow.append(pagesLoad);
    newRow.append(pDateLoad);
    $libTable.append(newRow);
  }
};

Library.prototype._handleGetMyName = function(){
  var inputVal = $("input.my-name").val();
  alert(inputVal);
};

Library.prototype.addBookForm = function(){
  var addBookForm = $("#add-book-form");
  var newForm = $('<form class="form-inline">')

  $(newForm).append('<input type="text" class="form-control" placeholder="Title"/>');
  $(newForm).append('<input type="text" class="form-control" placeholder="Author"/>');
  $(newForm).append('<input type="text" class="form-control" placeholder="Page Length"/>');
  $(newForm).append('<input type="text" class="form-control" placeholder="Publcation Date"/><br></br>');
  $("#add-book-form").append(newForm);
};

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pDate = new Date(oArgs.date);
};

/////////////////////////////////////////////////////////////Add Book/////////////////////////////////////////////////////////////////
Library.prototype.addBook = function(book){
  for(i = 0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == book.title){
      // alert("At Least One Book Already in Library");
      return false;
    }
  }
  this.myBookArr.push(book);
  return true;
};

//////////////////////////////////////////////////////////////removeBookByTitle////////////////////////////////////////////////////////////////
Library.prototype.removeBookByTitle = function(title){
var bool = false;
// var reg = new RegExp(title, "gi")
for(i = 0; i < this.myBookArr.length; i++){
  if(this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title){
    this.myBookArr.splice(i,1);
    this._autoPush();
    bool = true;
    }
  }
  return bool;
};

//////////////////////////////////////////////////////////////////removeBookByAuthor/////////////////////////////////////////////////////////////
Library.prototype.removeBookByAuthor = function(author) {
var bool = false;
// var reg = new RegExp(author, "gi")
for(i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
    this.myBookArr.splice(i,1);
    bool = true;
    }
  }
  return bool;
};

/////////////////////////////////////////////////////////////////getRandomBook///////////////////////////////////////////////////////////////////
Library.prototype.getRandomBook = function() {
  var randomBook = Math.floor(Math.random()*this.myBookArr.length);
  return this.myBookArr.length <= 0 ? null : this.myBookArr[randomBook];
  //   if(this.myBookArr.length != 0){
  //     return this.myBookArr[Math.floor(Math.random()*this.myBookArr.length)];
  //     }
  // return null;
};

/////////////////////////////////////////////////////////////getBookByTitle/////////////////////////////////////////////////////////////////////
Library.prototype.getBookByTitle = function(title) {
  var titleArr = new Array();
  // var reg = new RegExp(title, "gi");
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase() > -1 && title)) {
    titleArr.push(this.myBookArr[i]);
      }
    }
    return titleArr;
};

/////////////////////////////////////////////////////////getBooksByAuthor////////////////////////////////////////////////////////////////////////
Library.prototype.getBooksByAuthor = function(author) {
  var byAuthorArr = new Array();
  // var reg = new RegExp(author, "gi");
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
      byAuthorArr.push(this.myBookArr[i]);
    }
  }
  return byAuthorArr;
};

////////////////////////////////////////////////////////////addBooks/////////////////////////////////////////////////////////////////////
Library.prototype.addBooks = function(addBooksArr) {
  var numberBooksAdded = 0;
  for(i = 0; i < addBooksArr.length; i++) {         //we use this for loop to loop through the iterations of the loop we're passing through. In other words, the loop we're iterating through does not exist until we pass it into our function.
    if(this.addBook(addBooksArr[i])){
    numberBooksAdded++
    }
  }
    return numberBooksAdded;
  };

  //////////////////////////////////////////////////////////////getAuthors/////////////////////////////////////////////////////////////////////
  Library.prototype.getAuthors = function() {
    var authorListArr = new Array();
    for(i = 0; i < this.myBookArr.length; i++) loop: {
     for(a = 0; a < authorListArr.length; a++) {
      if(this.myBookArr[i].author == authorListArr[a]) {
        break loop;
        }
      }
      authorListArr.push(this.myBookArr[i].author);
    }
    return authorListArr;
  };

  //////////////////////////////////////////////////////////getRandomAuthorName///////////////////////////////////////////////////////////////
  Library.prototype.getRandomAuthorName = function() {
    var randomAuthor = Math.floor(Math.random()*this.myBookArr.length);
    return this.myBookArr.length <= 0 ? null : this.myBookArr[randomAuthor].author;
  };

/////////////////////////////////////////////////////////Search/////////////////////////////////////////////////////////////////////////////


// Library.prototype.searchSubmit = function() {
//   document.getElementById("searchSubmit").onclick(valdiateSearch());
// };
Library.prototype.validateSearch = function() {
  var titleInput = document.getElementById("titleInput").value == "" ? null : document.getElementById("titleInput").value;
  var authorInput = document.getElementById("authorInput").value == "" ? null : document.getElementById("authorInput").value;
  var pagesInput = document.getElementById("pagesInput").value == "" ? null : document.getElementById("pagesInput").value;

  this.search(titleInput, authorInput, pagesInput);
};

Library.prototype.search = function(titleInput, authorInput, pagesInput) {
  var searchResults = new Array();
  if(titleInput && authorInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.toLowerCase().indexOf(titleInput.toLowerCase()) > -1 && this.myBookArr[i].author.toLowerCase().indexOf(authorInput.toLowerCase()) > -1 && String(this.myBookArr[i].numPages).match(pagesInput)) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput && authorInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.toLowerCase().indexOf(titleInput.toLowerCase()) > -1 && this.myBookArr[i].author.toLowerCase().indexOf(authorInput.toLowerCase()) > -1) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.toLowerCase().indexOf(titleInput.toLowerCase()) > -1 && String(this.myBookArr[i].numPages).match(pagesInput)) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(authorInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].author.toLowerCase().indexOf(authorInput.toLowerCase()) > -1 && String(this.myBookArr[i].numPages).match(pagesInput)) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.toLowerCase().indexOf(titleInput.toLowerCase()) > -1) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(authorInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].author.toLowerCase().indexOf(authorInput.toLowerCase()) > -1) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (String(this.myBookArr[i].numPages).match(pagesInput)) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  return searchResults;
};


//////////////////////////////////////////////////////////////Library Instances//////////////////////////////////////////////////////////////
$(function(){ //document ready
window.denverLib = new Library("denver");
window.denverLib.init();

// window.boulderLib = new Library("boulder");
// window.boulderLib.init();
// window.goldenLib = new Library("golden");
// window.littletonLib = new Library("littleton");
// window.parkerLib = new Library("parker");
// window.auroraLib = new Library("aurora");
// window.coSpringsLib = new Library("coSprings");
});
////////////////////////////////////////////////////////////////Books//////////////////////////////////////////////////////////////////////
window.BookOne = new Book({title: "IT", author: "Stephen King", numPages: 1138, date: "09/01/1986"});
window.BookTwo = new Book({title: "Harry Potter and the Sorcerer's Stone", author: "JK Rowling", numPages: 400, date: "09/01/1998"});
window.BookThree = new Book({title: "Fuck you Javascript", author: "Austin Moses", numPages: 1000000, date: "08/08/2017"});
window.BookFour = new Book({title: "Harry Potter 2", author: "JK Rowling", numPages: 450, date: "06/02/1999"});
window.BookFive = new Book({title: "The Great Gatsby", author: "F. Scott Fitzgerald", numPages: 215, date: "04/10/1925"});
window.BookSix = new Book({title: "This Shining", author: "Stephen King", numPages:447, date: "01/28/1977"});
window.BookSeven = new Book({title: "Scale", author: "Keith Buckley", numPages: 248, date: "12/15/2015"});

///////////////////////////////////////////////////////////////localStorage///////////////////////////////////////////////////////////////////

Library.prototype._autoPush = function () {
  this.addBooks([BookOne, BookTwo, BookThree, BookFour, BookFive, BookSix, BookSeven]);
  var storageContainer = JSON.stringify(this.myBookArr);
  localStorage.setItem(this.instanceKey, storageContainer);
  this._loadLibrary();
  return false;
};

// Library.prototype.retrieve = function(libInstance) {
//   return JSON.parse(localStorage.getItem(this.instanceKey));
// };
