let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
};

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  var oldTBody = document.getElementById('libtable').getElementsByTagName('tbody')[0];
  var newTBody = document.createElement('tbody');
  var i = 0;

  myLibrary.forEach((book) => {
    var row = newTBody.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = book.title;
    cell2.innerHTML = book.author;
    cell3.innerHTML = book.pages;
    cell4.innerHTML = book.readStatus;

    i++;
  });

  oldTBody.parentNode.replaceChild(newTBody,oldTBody);
};

const addButton = document.querySelector('#addNew');
const newFormContainer = document.querySelector('#newFormContainer')

addButton.addEventListener("click", (e) => {
  newFormContainer.classList.remove('is-hidden');
});

const hideButton = document.getElementById("hide");

hideButton.addEventListener("click", (e) => {
  newFormContainer.classList.add('is-hidden');
})

const newForm = document.querySelector('#newForm');


newForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").value;

  let newBook = new Book(title, author, pages, readStatus);

  newForm.reset();
  addBookToLibrary(newBook);
  displayLibrary();
});


addBookToLibrary(new Book('Queen of Attolia', 'Megan Whalen Turner', 300, 'Read'));
addBookToLibrary(new Book('King of Attolia', 'Megan Whalen Turner', 450, 'Read'));
addBookToLibrary(new Book('Thick As Thieves', 'Megan Whalen Turner', 300, 'Read'));
displayLibrary();