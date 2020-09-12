const Library = (() => {
  let myLibrary = [];

  function init() {
    addBookToLibrary(
      Book("The Queen of Attolia", "Megan Whalen Turner", 280, "Read")
    );
    addBookToLibrary(
      Book("The King of Attolia", "Megan Whalen Turner", 397, "Read")
    );
    addBookToLibrary(
      Book("Thick As Thieves", "Megan Whalen Turner", 352, "Read")
    );

    displayLibrary();
    toggleForm();
    validateForm();
  }

  function addBookToLibrary(book) {
    myLibrary.push(book);
  }

  function displayLibrary() {
    var oldTBody = document
      .getElementById("libtable")
      .getElementsByTagName("tbody")[0];
    var newTBody = document.createElement("tbody");
    var i = 0;

    myLibrary.forEach((book) => {
      var row = newTBody.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell5.classList.add("has-text-centered");
      cell6.classList.add("has-text-centered");

      var btn = document.createElement("button");
      btn.classList.add("button", "is-danger", "is-small");
      btn.textContent = "Delete";
      btn.setAttribute("data-index", i);
      btn.addEventListener("click", () => {
        myLibrary.splice(btn.getAttribute("data-index"), 1);
        displayLibrary();
      });

      var readBtn = document.createElement("button");
      readBtn.classList.add("button", "is-warning", "is-small");
      readBtn.textContent = book.readStatus == "Read" ? "To Read" : "Read";
      readBtn.addEventListener("click", () => {
        book.readStatus = readBtn.textContent;
        displayLibrary();
      });

      cell1.innerHTML = book.title;
      cell2.innerHTML = book.author;
      cell3.innerHTML = book.pages;
      cell4.innerHTML = book.readStatus;
      cell5.appendChild(btn);
      cell6.appendChild(readBtn);

      i++;
    });

    oldTBody.parentNode.replaceChild(newTBody, oldTBody);
  }

  function toggleForm() {
    const addButton = document.querySelector("#addNew");
    const newFormContainer = document.querySelector("#newFormContainer");

    addButton.addEventListener("click", () => {
      newFormContainer.classList.remove("is-hidden");
    });

    const hideButton = document.getElementById("hide");

    hideButton.addEventListener("click", (e) => {
      newFormContainer.classList.add("is-hidden");
    });
  }

  function validateForm() {
    const newForm = document.querySelector("#newForm");

    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const readStatus = document.querySelector("#readStatus");
    const help = newForm.querySelectorAll(".help");
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, i) => {
      input.addEventListener("input", () => {
        if (input.validity.valueMissing) {
          input.classList.add("is-danger");
          showError(i);
        } else {
          input.classList.remove("is-danger");
          help[i].innerHTML = "";
          help[i].classList.remove("is-danger");
        }
      });
    });

    function showError(i) {
      help[i].classList.add("is-danger");
      help[i].textContent = `Please enter a value.`;
    }

    newForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        title.validity.valueMissing ||
        author.validity.valueMissing ||
        pages.validity.valueMissing
      ) {
        inputs.forEach((input, i) => {
          if (input.validity.valueMissing) {
            input.classList.add("is-danger");
            showError(i);
          }
        });
      } else {
        let newBook = Book(
          title.value,
          author.value,
          pages.value,
          readStatus.value
        );

        newForm.reset();
        addBookToLibrary(newBook);
        displayLibrary();
      }
    });
  }

  return { init };
})();

const Book = (title, author, pages, readStatus) => {
  return { title, author, pages, readStatus };
};

Library.init();
