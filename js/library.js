//////////////////////////////////////////////////////////////constructors//////////////////////////////////////////////
var Library = function(city){
  this.myBookArr = new Array();
  this.instanceKey = city;
};

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pDate = new Date(oArgs.date);
};

Library.prototype.newTable = function(array, jumbotron) {
  $(jumbotron).empty();
  for(var i = 0; i < array.length; i++){
  $(jumbotron).append(
    "<tr>",
      "<td>"+array[i].title+"</td>",
      "<td>"+array[i].author+"</td>",
      "<td>"+array[i].numPages+"</td>",
      "<td>"+array[i].pDate+"</td>",
    "</tr>"
  )
    }
  };

////////////////////////////////////////////////////////////////INIT////////////////////////////////////////////////////////////////
  Library.prototype.init = function(){
    //cache selectors into variables
    this._checkLocalStorage();
    this._bindEvents();
  };

  ///////////////////////////////////////////////////////////////localStorage///////////////////////////////////////////////////////////////////
  Library.prototype._checkLocalStorage = function(){
    var libLoad = JSON.parse(localStorage.getItem(this.instanceKey)) || this._ifNoStorage();
    this.myBookArr = libLoad;
    this._loadLibrary($("#libTable"));
  };

  Library.prototype._loadLibrary = function(libTable){ //main Library Jumbotron
    this.newTable(this.myBookArr, libTable);
  };

  Library.prototype._autoLoadArray = function(){
      this.addBooks([BookOne, BookTwo, BookThree, BookFour, BookFive]);
  };

  Library.prototype._autoPush = function () {
    var storageContainer = JSON.stringify(this.myBookArr);
    localStorage.setItem(this.instanceKey, storageContainer);
  };

  Library.prototype._ifNoStorage = function () {
    this._autoLoadArray();
    this._autoPush();
    return this.myBookArr;
  };

/////////////////////////////////////////////////////////////////bindEvents//////////////////////////////////////////////////////////
Library.prototype._bindEvents = function(){
  $("button.get-my-name").on("click", $.proxy(this._handleGetMyName, this));
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
  $("#remove-title-button").on("click", $.proxy(this.removeBookByTitle, this));
  $("#remove-author-button").on("click", $.proxy(this.removeBookByAuthor, this));
  $("#get-authors").on("click", $.proxy(this.getAuthors, this));
  $("#get-random-book").on("click", $.proxy(this.getRandomBook, this));
  $("#get-book-by-title").on("click", $.proxy(this.getBookByTitle, this));
  $("#get-random-author").on("click", $.proxy(this.getRandomAuthorName, this));
  $("#get-book-by-author").on("click", $.proxy(this.getBooksByAuthor, this));
  $("#submit-books-button").on("click", $.proxy(this.multiAdd, this));
  $("#search-submit").on("click", $.proxy(this.validateSearch, this));
};

Library.prototype.addBookForm = function(){
  var addBookForm = $(".multi-add-form");
  var addBookLi = $("<li>")
  var newForm = $('<form class="form-inline">')

  var newTitleInput = $('<input type="text" class="form-clear form-control mult-add-title" placeholder="Title"/>')
  var newAuthorInput = $('<input type="text" class="form-clear form-control multi-add-author" placeholder="Author"/>')
  var newPagesInput = $('<input type="number" class="form-clear form-control multi-add-pages" placeholder="Page Length"/>')
  var newDateInput = $('<input type="date" class="form-clear form-control multi-add-date" placeholder="Publcation Date"/><br></br>')

  $(newForm).append(newTitleInput, newAuthorInput, newPagesInput, newDateInput);
  $(addBookLi).append(newForm);
  $(".multi-add-form").append(addBookLi);
};

/////////////////////////////////////////////////////////////Main Functions/////////////////////////////////////////////////////////////////
Library.prototype.addBook = function(book){
  var bool = false
  for(i = 0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == book.title){
    }
  }
  this.myBookArr.push(book);
  this._autoPush();
  this._checkLocalStorage();
  bool = true;
};

Library.prototype.removeBookByTitle = function(){
var bool = false;
var titleRemoveIn = $("#remove-title-input").val();
// var reg = new RegExp(title, "gi")
for(i = 0; i < this.myBookArr.length; i++){
  if(this.myBookArr[i].title.toLowerCase().indexOf(titleRemoveIn.toLowerCase()) > -1 && titleRemoveIn){
    this.myBookArr.splice(i,1);
    $("#remove-title-input").val("")
    this._autoPush();
    this._checkLocalStorage();
    bool = true;
    }
  }
  return bool;
};

Library.prototype.removeBookByAuthor = function() {
var bool = false;
var authorRemoveIn = $("#remove-author-input").val();
for(i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author.toLowerCase().indexOf(authorRemoveIn.toLowerCase()) > -1) {
    this.myBookArr.splice(i,1);
    i--;
    bool = true;
    }
  }
  $("#remove-author-input").val("");
  this._autoPush();
  this._checkLocalStorage();
  return bool;
};

Library.prototype.getRandomBook = function() {
  var randomBookContainer = new Array();
  var randomBook = Math.floor(Math.random()*this.myBookArr.length);
  var randomBookDisplay = this.myBookArr.length <= 0 ? null : this.myBookArr[randomBook];
  randomBookContainer.push(randomBookDisplay);

  this.newTable(randomBookContainer, $("#results-jumbotron"));
};

Library.prototype.getBookByTitle = function() {
  var titleArr = new Array();
  var getTitleInput = $("#book-by-title-input").val();
  titleArr.splice(0, titleArr.length);
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title.toLowerCase().indexOf(getTitleInput.toLowerCase()) > -1) {
    titleArr.push(this.myBookArr[i]); //how do i clear this array? why is every single book being pushed when $("#book-by-title-input") logs out with the correct title? WHAT THE FUCK?!!!!!!!
      }
    }
    $("#book-by-title-input").val("");
    this.newTable(titleArr, $("#results-jumbotron"));
};

Library.prototype.getBooksByAuthor = function() {
  var byAuthorArr = new Array();
  var byAuthorInput = $("#book-by-author-input").val();
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].author.toLowerCase().indexOf(byAuthorInput.toLowerCase()) > -1 && byAuthorInput) {
      byAuthorArr.push(this.myBookArr[i]);
    }
  }
  $("#book-by-author-input").val("");
  this.newTable(byAuthorArr, $("#results-jumbotron"));
};

Library.prototype.multiAdd = function(){
  var multiAddArr = new Array();
  $("ul.multi-add-form li").each(function(){
    var bookInput = new Book({title: $(this).find("input:nth-child(1)").val(), author: $(this).find("input:nth-child(2)").val(), numPages: $(this).find("input:nth-child(3)").val(), date: new Date(String($(this).find("input:nth-child(4)").val()))})
    multiAddArr.push(bookInput);
  });
  this.addBooks(multiAddArr);
  $("input.form-clear").val("");
};

Library.prototype.addBooks = function(addBooksArr) {
  var numberBooksAdded = 0;
  for(a = 0; a < addBooksArr.length; a++) {         //we use this for loop to loop through the iterations of the loop we're passing through. In other words, the loop we're iterating through does not exist until we pass it into our function.
    this.addBook(addBooksArr[a]);
  }
};


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
  $("#results-jumbotron").empty();
  for(var a = 0; a < authorListArr.length; a++){
  $("#results-jumbotron").append(
    "<tr>",
      "<td>"+"</td>",
      "<td>"+authorListArr[a]+"</td>",
      "<td>"+"</td>",
      "<td>"+"</td>",
    "</tr>"
    )
  }
};

Library.prototype.getRandomAuthorName = function() {
  var randomAuthor = Math.floor(Math.random()*this.myBookArr.length);
  var randomAuthorDisplay = this.myBookArr.length <= 0 ? null : this.myBookArr[randomAuthor].author;
  $("#results-jumbotron").empty();
  $("#results-jumbotron").append(
    "<tr>",
      "<td>"+"</td>",
      "<td>"+randomAuthorDisplay+"</td>",
      "<td>"+"</td>",
      "<td>"+"</td>",
    "</tr>"
      )
  };

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
  this.newTable(searchResults, $("#search-results-display"));
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
window.BookThree = new Book({title: "Fuck you Javascript", author: "Austin Moses", numPages: 000000, date: "08/08/2017"});
window.BookFour = new Book({title: "Harry Potter 2", author: "JK Rowling", numPages: 450, date: "06/02/1999"});
window.BookFive = new Book({title: "The Great Gatsby", author: "F. Scott Fitzgerald", numPages: 215, date: "04/10/1925"});
window.BookSix = new Book({title: "The Shining", author: "Stephen King", numPages:447, date: "01/28/1977"});
window.BookSeven = new Book({title: "Scale", author: "Keith Buckley", numPages: 248, date: "12/15/2015"});
