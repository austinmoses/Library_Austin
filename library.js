var Library = function() {};

var Book = function(oArgs) {
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.aDate = oArgs.date; //.split("/");
  // this.pubDate = new Date(this.aDate[0], this.aDate[1]);
};

// var Books = Library.prototype.myBookArr

Library.prototype.myBookArr = [];

//Add Book
Library.prototype.addBook = function(book) {;
  for(var i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].title == book.title) {
      alert("Book Already in Library");
      return false;
    }
  }
  this.myBookArr.push(book);
  return true;
};

//removeBookByTitle

Library.prototype.removeBookByTitle = function(title) {
var bool = false;
for(var i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].title == title) {
    this.myBookArr.splice(i,1);
    bool = true;
    }
  }
  return bool;
};

//removeBookByAuthor

Library.prototype.removeBookByAuthor = function(author) {
var bool = false;
for(var i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author == author) {
    this.myBookArr.splice(i,1);
    bool = true;
    }
  }
  return bool;
};

//getRandomBook
Library.prototype.getRandomBook = function() {
  var randomBook = Math.floor(Math.random()*this.myBookArr.length);
  return this.myBookArr <= 0 ? null : this.myBookArr[randomBook];
  //   if(this.myBookArr.length != 0){
  //     return this.myBookArr[Math.floor(Math.random()*this.myBookArr.length)];
  //     }
  // return null;
};

//getBookByTitle
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

//getBooksByAuthor
Library.prototype.getBooksByAuthor = function(author) {
  var authorArr = new Array();
  var reg = new RegExp(author, "gi");
  for(i = 0; i < this.myBookArr.length; i++) {
    if(this.myBookArr[i].author.match(reg)) {
      authorArr.push(this.myBookArr[i]);
    }
  }
  return authorArr;
};

//addBooks

Library.prototype.addBooks = function(addBooksArr) {
  var numberBooksAdded = 0;
  for(i = 0; i < addBooksArr.length; i++) {         //we use this for loop to loop through the iterations of the loop we're passing through. In other words, the loop we're iterating through does not exist until we pass it into our function.
    if(this.addBook(addBooksArr[i])){
    numberBooksAdded++
    }
  }
    return numberBooksAdded;
  };

var denLib = new Library();
var boulLib = new Library();

var BookOne = new Book({title: "IT", author: "Stephen King", numPages: 390, date: "03/12/1987"});
var BookTwo = new Book({title: "Harry Potter", author: "JK Rowling", numPages: 400, date: "05/05/2000"});
var BookThree = new Book({title: "Fuck you Javascript", author: "Austin Moses", numPages: 1000000, date: "08/08/2017"});
var BookFour = new Book({title: "Harry Potter 2", author: "JK Rowling", numPages: 450, date: "05/05/2001"});
