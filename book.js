const newBookBtn = document.createElement("button");
newBookBtn.classList.add("btn");
newBookBtn.classList.add("newBookBtn");
newBookBtn.textContent = "+";
const promptContainer = document.createElement("form");
promptContainer.classList.add("promptContainer");
const outmost_container = document.querySelector(".outmost-container");

const promptContainerContainer = document.createElement("div");
promptContainerContainer.classList.add("promptContainerContainer");
promptContainerContainer.appendChild(promptContainer);

// outmost_container.appendChild(newBookBtn);
newBookBtn.addEventListener("click", () => {
  promptContainerContainer.classList.add("active");
});

// Create a buy a book box
const labelTitle = document.createElement("label");
labelTitle.id = "label-title";
labelTitle.htmlFor = "title";
labelTitle.textContent = "Title:";

const inputTitle = document.createElement("input");
inputTitle.id = "title";
inputTitle.required = true;

inputTitle.addEventListener("input", (e) => {
  if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity("Missing Title Name");
  } else {
    inputTitle.setCustomValidity("");
  }
});

labelTitle.appendChild(inputTitle);

const labelAuthor = document.createElement("label");
labelAuthor.htmlFor = "author";
labelAuthor.id = "label-author";
labelAuthor.textContent = "Author:";

const inputAuthor = document.createElement("input");
inputAuthor.id = "author";
inputAuthor.required = true;

inputAuthor.addEventListener("input", (e) => {
  if (inputAuthor.validity.valueMissing) {
    inputAuthor.setCustomValidity("Missing Author Name");
  } else {
    inputAuthor.setCustomValidity("");
  }
});

labelAuthor.appendChild(inputAuthor);

const labelPages = document.createElement("label");
labelPages.htmlFor = "pages";
labelPages.id = "label-pages";
labelPages.textContent = "Pages:";

const inputPages = document.createElement("input");
inputPages.id = "pages";
inputPages.type = "number";
inputPages.min = 1;
inputPages.max = 99999;
inputPages.step = 1;
inputPages.required = true;

inputPages.addEventListener("input", (e) => {
  if (inputPages.validity.rangeOverflow) {
    inputPages.setCustomValidity("Over the Range Limit!");
  } else if (inputPages.validity.rangeUnderflow) {
    inputPages.setCustomValidity("Under the Range Limit!");
  } else {
    inputPages.setCustomValidity("");
  }
});

labelPages.appendChild(inputPages);

// Div for the radio button
const readRadioDiv = document.createElement("div");
readRadioDiv.classList.add("readRadioDiv");
const yesRead = document.createElement("input");
yesRead.type = "radio";
yesRead.name = "radio";
yesRead.value = true;
yesRead.id = "yesOption";

const labelYes = document.createElement("label");
labelYes.textContent = "Read";
labelYes.htmlFor = "yesOption";

const noRead = document.createElement("input");
noRead.type = "radio";
noRead.name = "radio";
noRead.value = false;
noRead.id = "noOption";

const labelNo = document.createElement("label");
labelNo.textContent = "Not Read";
labelNo.htmlFor = "noOption";

readRadioDiv.append(yesRead, labelYes, noRead, labelNo);

// Submit Btn
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.classList.add("btn");
submitBtn.classList.add("submitBtn");
submitBtn.textContent = "Add";

promptContainer.append(
  labelTitle,
  labelAuthor,
  labelPages,
  readRadioDiv,
  submitBtn
);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    (this.author = author),
      (this.pages = pages),
      (this.read = read),
      (this.uniqueID = crypto.randomUUID());
  }

  toggleReadStatus() {
    this.read = !this.read;
  }

  getStatusText() {
    return this.read ? "Already read" : "Not read yet";
  }

  getStatusClass() {
    return this.read ? "read" : "notRead";
  }
}

const theHobbit = new Book("theHobbit", "author", 123, true);

const myLibrary = [];

function addBookToLibrary(bookContent) {
  if (checkDuplicate(bookContent)) {
    alert("Already exist");
    return;
  } else {
    if (bookContent instanceof Book) {
      addBookToBookRack(bookContent);
      // alert(bookContent.info());
    } else {
      alert("Not Valid");
    }
  }
}

// Submit Button Function
promptContainer.addEventListener("submit", (e) => {
  e.preventDefault(); // No reload or something

  const titleName = inputTitle.value;
  const authorName = inputAuthor.value;
  const pagesNumber = inputPages.value;
  const radioChecked = document.querySelector(
    'input[name="radio"]:checked'
  )?.value;
  const isRead = radioChecked === "true";

  //   if (!titleName || !authorName || !pagesNumber || !radioChecked) {
  //     alert("Invalid!");
  //     promptContainer.reset();
  //     return;
  //   }

  const newBook = new Book(titleName, authorName, pagesNumber, isRead);

  addBookToLibrary(newBook);

  promptContainer.reset();
  promptContainerContainer.classList.remove("active");
});

// If clicking outside of the input box, close the box
promptContainerContainer.addEventListener("click", (e) => {
  if (e.target === promptContainerContainer) {
    promptContainerContainer.classList.remove("active");
  }
});

// Check Dup
function checkDuplicate(bookContent) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      bookContent.title.toLowerCase() === myLibrary[i].title.toLowerCase() &&
      bookContent.author.toLowerCase() === myLibrary[i].author.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

// How many books
const bookContainer = document.querySelector(".book-container");
let limit = bookContainer.offsetWidth / 150;

// Variables and stuff
const colors = [
  "lightblue",
  "lightgoldenrodyellow",
  "tomato",
  "khaki",
  "lightgreen",
  "lightcyan",
  "honeydew",
  "azure",
  "goldenrod",
];
const dialog = document.querySelector("[closedby='any']");
const dialogCloser = document.querySelector(".closerDia");
const cancelBtn = document.querySelector("#cancel");
const viewBtn = document.querySelector("#view");
const removeBtn = document.querySelector("#remove");
let currentContent = null;

cancelBtn.addEventListener("click", () => {
  if (currentContent !== null) {
    dialogCloser.close();
  }
});

viewBtn.addEventListener("click", () => {
  if (currentContent !== null) {
    writeAndOpenModal(currentContent, currentContent.uniqueID);
    dialog.showModal();
    dialogCloser.close();
  }
});

removeBtn.addEventListener("click", () => {
  if (currentContent !== null) {
    removeBookFromLibrary(currentContent);
    const removeBook = document.getElementById(currentContent.uniqueID);
    if (removeBook !== null) {
      bookContainer.removeChild(removeBook);
    }
    dialogCloser.close();
    currentContent = null;
  }
});

// Add books to book rack
function addBookToBookRack(bookContent) {
  limit = bookContainer.offsetWidth / 150;
  if (myLibrary.length > limit) {
    alert("No more room!");
  } else {
    const newBookOnShelf = document.createElement("div");
    newBookOnShelf.classList.add("bookOnShelf");
    const head = document.createElement("div");
    head.classList.add("bookHead");
    const body = document.createElement("div");
    body.classList.add("bookBody");
    const foot = document.createElement("div");
    foot.classList.add("bookFoot");
    newBookOnShelf.append(head, body, foot);

    body.textContent = `${bookContent.title}`;
    newBookOnShelf.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    newBookOnShelf.style.height = `${Math.floor(Math.random() * 20) + 70}%`;
    newBookOnShelf.id = bookContent.uniqueID;
    const clone = newBookOnShelf.cloneNode(true);

    // Click on book to view their contents
    newBookOnShelf.addEventListener("click", () => {
      currentContent = bookContent;
      newBookOnShelf.classList.add("background");
      clone.style.opacity = "1";
      const computedStyle = window.getComputedStyle(newBookOnShelf);
      clone.style.width = computedStyle.width;
      clone.style.height = computedStyle.height;

      promptMiddle.appendChild(clone);
      promptMiddle.classList.add("active");

      dialogCloser.showModal();
    });

    dialogCloser.addEventListener("close", () => {
      newBookOnShelf.classList.remove("background");
      if (promptMiddle.contains(clone)) {
        promptMiddle.removeChild(clone);
      }
      promptMiddle.classList.remove("active");
    });

    bookContainer.appendChild(newBookOnShelf);
    myLibrary.push(bookContent);
  }
}

addBookToBookRack(theHobbit);
let checkArray = [];

function writeAndOpenModal(bookContent, checkID) {
  if (checkArray.includes(checkID)) {
    return;
  } else {
    checkArray.push(checkID);
  }

  const titleB = document.querySelector(".titleName");
  const authorB = document.querySelector(".authorName");
  const pagesB = document.querySelector(".pagesNumber");
  const statusB = document.querySelector(".readStatus");

  titleB.textContent = "Title: " + bookContent.title;
  authorB.textContent = "Author: " + bookContent.author;
  pagesB.textContent = "Number of Pages: " + bookContent.pages;

  // Set initial status
  statusB.textContent = bookContent.getStatusText();
  statusB.className = "readStatus " + bookContent.getStatusClass();

  const newStatusB = statusB.cloneNode(true);
  statusB.parentNode.replaceChild(newStatusB, statusB);

  newStatusB.addEventListener("click", () => {
    bookContent.toggleReadStatus();

    newStatusB.textContent = bookContent.getStatusText();
    newStatusB.className = "readStatus " + bookContent.getStatusClass();
  });
}

function removeBookFromLibrary(bookContent) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].uniqueID === bookContent.uniqueID) {
      myLibrary.splice(i, 1);
      break;
    }
  }
}

// Moving book to the middle at focus
const promptMiddle = document.createElement("div");
promptMiddle.classList.add("promptMiddle");

outmost_container.append(promptContainerContainer, newBookBtn, promptMiddle);
