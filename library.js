var Library = function(city) {
  this.myBookArr = new Array();
  this.instanceKey = city;
};

var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pDate = new Date(oArgs.date);
};

/////////////////////////////////////////////////////////////Add Book/////////////////////////////////////////////////////////////////
Library.prototype.addBook = function(book) {
  for(var i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title == book.title) {
      alert("At Least One Book Already in Library");
      return false;
    }
  }
  this.myBookArr.push(book);
  return true;
};

//////////////////////////////////////////////////////////////removeBookByTitle////////////////////////////////////////////////////////////////
Library.prototype.removeBookByTitle = function(title) {
var bool = false;
var reg = new RegExp(title, "gi")
for(var i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].title.match(reg)) {
    this.myBookArr.splice(i,1);
    bool = true;
    }
  }
  return bool;
};

//////////////////////////////////////////////////////////////////removeBookByAuthor/////////////////////////////////////////////////////////////
Library.prototype.removeBookByAuthor = function(author) {
var bool = false;
var reg = new RegExp(author, "gi")
for(var i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author.match(reg)) {
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
  var reg = new RegExp(title, "gi");
  for(var i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title.match(reg)) {
    titleArr.push(this.myBookArr[i]);
      }
    }
    return titleArr;
};

/////////////////////////////////////////////////////////getBooksByAuthor////////////////////////////////////////////////////////////////////////
Library.prototype.getBooksByAuthor = function(author) {
  var byAuthorArr = new Array();
  var reg = new RegExp(author, "gi");
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].author.match(reg)) {
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

Library.prototype.search = function(titleInput, authorInput, pagesInput) {
  var searchResults = new Array();
  if(titleInput && authorInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.match(RegExp(titleInput, "gi")) && this.myBookArr[i].author.match(RegExp(authorInput, "gi")) && String(this.myBookArr[i].numPages).match(RegExp(pagesInput, "gi"))) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput && authorInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.match(RegExp(titleInput, "gi")) && this.myBookArr[i].author.match(RegExp(authorInput, "gi"))) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.match(RegExp(titleInput, "gi")) && String(this.myBookArr[i].numPages).match(RegExp(pagesInput, "gi"))) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(authorInput && pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].author.match(RegExp(authorInput, "gi")) && String(this.myBookArr[i].numPages).match(RegExp(pagesInput, "gi"))) {
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(titleInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.match(RegExp(titleInput, "gi"))){
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(authorInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].author.match(RegExp(authorInput, "gi"))){
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  else if(pagesInput) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if (String(this.myBookArr[i].numPages).match(RegExp(pagesInput, "gi"))){
        searchResults.push(this.myBookArr[i]);
      }
    }
  }
  return searchResults;
};

//////////////////////////////////////////////////////////////Library Instances//////////////////////////////////////////////////////////////
var denverLib = new Library("denver");
var boulderLib = new Library("boulder");
var goldenLib = new Library("golden");
var littletonLib = new Library("littleton");
var parkerLib = new Library("parker");
var auroraLib = new Library("aurora");
var coSpringsLib = new Library("coSprings");
////////////////////////////////////////////////////////////////Books//////////////////////////////////////////////////////////////////////
var BookOne = new Book({title: "IT", author: "Stephen King", numPages: 1138, date: "09/01/1986"});
var BookTwo = new Book({title: "Harry Potter and the Sorcerer's Stone", author: "JK Rowling", numPages: 400, date: "09/01/1998"});
var BookThree = new Book({title: "Fuck you Javascript", author: "Austin Moses", numPages: 1000000, date: "08/08/2017"});
var BookFour = new Book({title: "Harry Potter 2", author: "JK Rowling", numPages: 450, date: "06/02/1999"});
var BookFive = new Book({title: "The Great Gatsby", author: "F. Scott Fitzgerald", numPages: 215, date: "04/10/1925"});
var BookSix = new Book({title: "This Shining", author: "Stephen King", numPages:447, date: "01/28/1977"});
var BookSeven = new Book({title: "Scale", author: "Keith Buckley", numPages: 248, date: "12/15/2015"});

///////////////////////////////////////////////////////////////localStorage///////////////////////////////////////////////////////////////////
 Library.prototype.storage = function(libInstance) {
   var storageContainer = JSON.stringify(libInstance.myBookArr);
  localStorage.setItem(libInstance.instanceKey, storageContainer);
};

Library.prototype.retrieve = function(libInstance) {
  return JSON.parse(localStorage.getItem(this.instanceKey));
};
