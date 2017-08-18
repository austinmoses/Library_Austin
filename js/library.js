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
//////////////////////////////////////////////////////////////table constructor//////////////////////////////////////////////
var Table = function(array, jumbotron) {
  var libTableNew = $("<table>").addClass("remove-item table table-bordered");
  var newTableHead = $("<tr>");

  var titleHead = $("<th>").text("Title");
  var authorHead = $("<th>").text("Author");
  var pagesHead = $("<th>").text("Page Length");
  var dateHead = $("<th>").text("Publication Date");

  newTableHead.append(titleHead);
  newTableHead.append(authorHead);
  newTableHead.append(pagesHead);
  newTableHead.append(dateHead);
  libTableNew.append(newTableHead);

  $(".remove-item").remove();
  for(var i = 0; i < array.length; i++){
    var newRow = $("<tr>");
    var titleLoad = $("<td>").text(array[i].title);
    var authorLoad = $("<td>").text(array[i].author);
    var pagesLoad = $("<td>").text(array[i].numPages);
    var pDateLoad = $("<td>").text(array[i].pDate);

    newRow.append(titleLoad);
    newRow.append(authorLoad);
    newRow.append(pagesLoad);
    newRow.append(pDateLoad);
    libTableNew.append(newRow);

$(jumbotron).append(libTableNew);
 }
};

Library.prototype.count = function(){
  var counter = 0;
  return counter += 1;
}
//////////////////////////////////////////////////////////////table constructor end///////////////////////////////////////
var inputBook = function(){

  // var counter = this.count;

  this.title = $("#add-title").val();
  this.author = $("#add-author").val();
  this.numPages = $("#add-pages").val();
  this.pDate = new Date(String($("#add-title"+counter).val()));
};

Library.prototype.init = function(){
  //cache selectors into variables
  // this._autoLoadArray();
  this._checkLocalStorage();
  this._bindEvents();
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
  $("#remove-title-button").on("click", $.proxy(this.removeBookByTitle, this));//$.proxy(this.removeBookByTitle($("#remove-title-input").val()), this));
  $("#remove-author-button").on("click", $.proxy(this.removeBookByAuthor, this));
  $("#get-authors").on("click", $.proxy(this.getAuthors, this));
  $("#get-random-book").on("click", $.proxy(this.getRandomBook, this));
  $("#get-book-by-title").on("click", $.proxy(this.getBookByTitle, this));
  $("#get-random-author").on("click", $.proxy(this.getRandomAuthorName, this));
  $("#get-book-by-author").on("click", $.proxy(this.getBooksByAuthor, this));
  $("#submit-books-button").on("click", $.proxy(this.addBooksInput, this));
  $("#search-submit").on("click", $.proxy(this.validateSearch, this));
};

Library.prototype._checkLocalStorage = function(){
  var libLoad = JSON.parse(localStorage.getItem(this.instanceKey)) || this._autoPush();
  this.myBookArr = libLoad;
  this._loadLibrary($("#libTable"));
};

Library.prototype._loadLibrary = function(screen){ //main Library Jumbotron
  var libTableNew = $("<table>").addClass("table table-bordered");
  var newTableHead = $("<tr>");

  var titleHead = $("<th>").text("Title");
  var authorHead = $("<th>").text("Author");
  var pagesHead = $("<th>").text("Page Length");
  var dateHead = $("<th>").text("Publication Date");

  newTableHead.append(titleHead);
  newTableHead.append(authorHead);
  newTableHead.append(pagesHead);
  newTableHead.append(dateHead);
  libTableNew.append(newTableHead);

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
    libTableNew.append(newRow);
  }
  screen.html(libTableNew)
};

Library.prototype._handleGetMyName = function(){
  var inputVal = $("input.my-name").val();
  alert(inputVal);
};

Library.prototype.addBookForm = function(){
  var addBookForm = $("#add-book-form");
  var newForm = $('<form class="form-inline">')
  // var counter = this.count();

  // if(counter >= 5){
  //   alert("Only 5 Books at a Time, Please!")
  //   return
  //}

  var newTitleInput = $('<input type="text" class="form-control" placeholder="Title"/>').attr("id", "add-title");
  var newAuthorInput = $('<input type="text" class="form-control" placeholder="Author"/>').attr("id", "add-author");
  var newPagesInput = $('<input type="text" class="form-control" placeholder="Page Length"/>').attr("id", "add-pages");
  var newDateInput = $('<input type="text" class="form-control" placeholder="Publcation Date"/><br></br>').attr("id", "add-date-");

  $(newForm).append(newTitleInput);
  $(newForm).append(newAuthorInput);
  $(newForm).append(newPagesInput);
  $(newForm).append(newDateInput);
  $("#add-book-form").append(newForm);
};

/////////////////////////////////////////////////////////////Add Book/////////////////////////////////////////////////////////////////
Library.prototype.addBook = function(book){
  var bool = false
  for(i = 0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == book.title){
      // alert("At Least One Book Already in Library");
    }
  }
  this.myBookArr.push(book);
  this._autoPush();
  this._checkLocalStorage();
  bool = true;
};

//////////////////////////////////////////////////////////////removeBookByTitle////////////////////////////////////////////////////////////////
Library.prototype.removeBookByTitle = function(){
var bool = false;
var titleRemoveIn = $("#remove-title-input").val();
// var reg = new RegExp(title, "gi")
for(i = 0; i < this.myBookArr.length; i++){
  if(this.myBookArr[i].title.toLowerCase().indexOf(titleRemoveIn.toLowerCase()) > -1 && titleRemoveIn){
    this.myBookArr.splice(i,1);
    this._autoPush();
    this._checkLocalStorage();
    bool = true;
    }
  }
  return bool;
};

//////////////////////////////////////////////////////////////////removeBookByAuthor/////////////////////////////////////////////////////////////
Library.prototype.removeBookByAuthor = function() {
var bool = false;
var authorRemoveIn = $("#remove-author-input").val();
// var reg = new RegExp(author, "gi")
for(i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author.toLowerCase().indexOf(authorRemoveIn.toLowerCase()) > -1 && authorRemoveIn) {
    this.myBookArr.splice(i,1);
    this._autoPush();
    this._checkLocalStorage();
    bool = true;
    }
  }
  return bool;
};

/////////////////////////////////////////////////////////////////getRandomBook///////////////////////////////////////////////////////////////////
Library.prototype.getRandomBook = function() {
  var randomBookContainer = new Array();
  var randomBook = Math.floor(Math.random()*this.myBookArr.length);
  var randomBookDisplay = this.myBookArr.length <= 0 ? null : this.myBookArr[randomBook];
  randomBookContainer.push(randomBookDisplay);

  randomBookTable = new Table(randomBookContainer, $("#results-jumbotron"));

};

/////////////////////////////////////////////////////////////getBookByTitle/////////////////////////////////////////////////////////////////////
Library.prototype.getBookByTitle = function() {
  var titleArr = new Array();
  var getTitleInput = $("#book-by-title-input").val();
  titleArr.splice(0, titleArr.length);
  console.log(getTitleInput);
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title.toLowerCase().indexOf(getTitleInput.toLowerCase()) > -1) {
    titleArr.push(this.myBookArr[i]); //how do i clear this array? why is every single book being pushed when $("#book-by-title-input") logs out with the correct title? WHAT THE FUCK?!!!!!!!
      }
    }
    titleResultTable = new Table(titleArr, $("#results-jumbotron"))
};

/////////////////////////////////////////////////////////getBooksByAuthor////////////////////////////////////////////////////////////////////////
Library.prototype.getBooksByAuthor = function() {
  var byAuthorArr = new Array();
  var byAuthorInput = $("#book-by-author-input").val();
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].author.toLowerCase().indexOf(byAuthorInput.toLowerCase()) > -1 && byAuthorInput) {
      byAuthorArr.push(this.myBookArr[i]);
    }
  }

  var byAuthorTable = new Table(byAuthorArr, $("#results-jumbotron"));
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

  Library.prototype.addBooksInput = function() {
    var booksInput = new inputBook($("#add-books-form").each(this.addBooksInput(index, value)));
    // var booksInput2 = new inputBook;
    // var booksInput3 = new inputBook;
    // var booksInput4 = new inputBook;
    // var booksInput5 = new inputBook;

    var addBooksArr = new Array();
    var numberBooksAdded = 0;


    // if(booksInput1){
    //   addBooksArr.push(booksInput1);
    // }
    //
    // if(booksInput2){
    //   addBooksArr.push(booksInput2);
    // }
    //
    // if(booksInput3){
    //   addBooksArr.push(booksInput3);
    // }
    //
    // if(booksInput4){
    //   addBooksArr.push(booksInput4);
    // }
    //
    // if(booksInput5){
    //   addBooksArr.push(booksInput5);
    // }

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
    $(".remove-item").remove();
    for(var i = 0; i < authorListArr.length; i++){
      div = $("<div>"+authorListArr[i]+"</div>").addClass("remove-item");
    $("#results-jumbotron").append(div);
    }
  };

  //////////////////////////////////////////////////////////getRandomAuthorName///////////////////////////////////////////////////////////////
  Library.prototype.getRandomAuthorName = function() {
    var randomAuthor = Math.floor(Math.random()*this.myBookArr.length);
    var randomAuthorDisplay = this.myBookArr.length <= 0 ? null : this.myBookArr[randomAuthor].author;
    $(".remove-item").remove();
      div = $("<div>"+randomAuthorDisplay+"</div>").addClass("remove-item");
    $("#results-jumbotron").append(div);
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
  var searchResultsDisplay = new Table(searchResults, $("#search-results-display"));
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
window.BookSix = new Book({title: "The Shining", author: "Stephen King", numPages:447, date: "01/28/1977"});
window.BookSeven = new Book({title: "Scale", author: "Keith Buckley", numPages: 248, date: "12/15/2015"});

///////////////////////////////////////////////////////////////localStorage///////////////////////////////////////////////////////////////////

Library.prototype._autoPush = function () {
  if(this.myBookArr.length == 0){
    this.addBooks([BookOne, BookTwo, BookThree, BookFour, BookFive, BookSix, BookSeven]);
  }
  var storageContainer = JSON.stringify(this.myBookArr);
  localStorage.setItem(this.instanceKey, storageContainer);
};
