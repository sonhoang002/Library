const newBookBtn = document.createElement("button");
newBookBtn.classList.add("btn");
newBookBtn.classList.add("newBookBtn");
newBookBtn.textContent = "Add new book!";

const outmost_container = document.querySelector(".outmost-container");

outmost_container.appendChild(newBookBtn);
newBookBtn.addEventListener("click", () => {
    promptContainerContainer.classList.add("active");
});

// Create a buy a book box
const promptContainer = document.createElement("form");
promptContainer.classList.add("promptContainer");

const labelTitle = document.createElement("label");
labelTitle.id = "title";
labelTitle.textContent = "Title:";
const inputTitle = document.createElement("input");
inputTitle.id = "title";
labelTitle.appendChild(inputTitle);

const labelAuthor = document.createElement('label');
labelAuthor.id = "author";
labelAuthor.textContent = "Author:";
const inputAuthor = document.createElement("input");
inputAuthor.id = "author";
labelAuthor.appendChild(inputAuthor);

const labelPages = document.createElement("label");
labelPages.id = "pages";
labelPages.textContent = "Pages:";
const inputPages = document.createElement("input");
inputPages.id = "pages";
inputPages.type = "number";
inputPages.min = 1;
inputPages.max = 99999;
inputPages.step = 1;
labelPages.appendChild(inputPages);

// Div for the radio button
const readRadioDiv = document.createElement("div");
readRadioDiv.classList.add("readRadioDiv");
const yesRead = document.createElement("input");
yesRead.type = "radio"
yesRead.name = "radio";
yesRead.value = "read";
yesRead.id = "yesOption"

const labelYes = document.createElement("label");
labelYes.textContent = "Read";
labelYes.htmlFor = "yesOption";

const noRead = document.createElement("input");
noRead.type = "radio"
noRead.name = "radio";
noRead.value = "not yet read";
noRead.id = "noOption"

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

promptContainer.append(labelTitle, labelAuthor, labelPages, readRadioDiv, submitBtn);

const promptContainerContainer = document.createElement("div");
promptContainerContainer.classList.add("promptContainerContainer")
promptContainerContainer.appendChild(promptContainer);

// Function
// Add books to the library
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.uniqueID = crypto.randomUUID();

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    };
};

const myLibrary = [];

function addBookToLibrary(bookContent) {
    if (checkDuplicate(bookContent)) {
        alert("Already exist");
        return;
    } else {
        if (bookContent instanceof Book) {
            myLibrary.push(bookContent);
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
    const radioChecked = document.querySelector('input[name="radio"]:checked')?.value;

    if (!titleName || !authorName || !pagesNumber || !radioChecked) {
        alert("Invalid!");
        promptContainer.reset();
        return;
    }

    const readed = radioChecked === "read";
    const newBook = new Book(titleName, authorName, pagesNumber, readed);
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

outmost_container.append(promptContainerContainer);

// Check Dup
function checkDuplicate(bookContent) {
    for (let i = 0; i < myLibrary.length; i ++) {
        if (bookContent.title.toLowerCase() === myLibrary[i].title.toLowerCase() &&
            bookContent.author.toLowerCase() === myLibrary[i].author.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// How many books
const bookContainer = document.querySelector(".book-container");
let limit = bookContainer.offsetWidth / 150;

// Variables and stuff
const colors = ['lightblue', 'tomato', 'khaki', 'lightgreen'];
const dialog = document.querySelector("[closedby='any']");
const dialogCloser = document.querySelector("[closedby='closerequest']");
const viewBtn = document.querySelector(".view");
const removeBtn = document.querySelector(".remove");
let currentContent = null;

viewBtn.addEventListener('click', () => {
    if (currentContent !== null) {
        writeAndOpenModal(currentContent);
        dialogCloser.close();
    };
});

removeBtn.addEventListener('click', () => {
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
        newBookOnShelf.textContent = `${bookContent.title}`;
        newBookOnShelf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        newBookOnShelf.style.height = "85%";
        newBookOnShelf.id = bookContent.uniqueID;

        // Click on book to view their contents
        newBookOnShelf.addEventListener("click", () => {
            currentContent = bookContent;
            dialogCloser.showModal();
        });

        bookContainer.appendChild(newBookOnShelf);
    }
}

function writeAndOpenModal(bookContent) {
    const titleB = document.querySelector(".titleName");
    const authorB = document.querySelector(".authorName");
    const pagesB = document.querySelector(".pagesNumber");
    const statusB = document.querySelector(".readStatus");
    titleB.textContent = bookContent.title;
    authorB.textContent = bookContent.author;
    pagesB.textContent = bookContent.pages;
    statusB.textContent = bookContent.read ? "Already read" : "Not read yet";
    dialog.showModal();
};

function removeBookFromLibrary(bookContent) {
    for (let i = 0; i < myLibrary.length; i ++) {
        if (myLibrary[i].uniqueID === bookContent.uniqueID) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}