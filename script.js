const addBook = document.getElementById("add");
const modal = document.querySelector(".modal");
const books = document.getElementById("books");
const form = document.querySelector("form");
const year = document.getElementById("year");
const login = document.getElementById("login");

// window.onload = function () {
//     google.accounts.id.initialize({
//       client_id: 'YOUR_GOOGLE_CLIENT_ID',
//       callback: handleCredentialResponse
//     });
//     google.accounts.id.prompt();
//   };

login.addEventListener("click", () => {
	console.log("start");

});

// modal elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");
// let id = 0;

let library = getLibraryLocalStorage();

// open Modal when "Add Book" button is clicked
addBook.addEventListener("click", () => {
	resetForm();
	modal.style.display = "block";
});

// close modal when clicking outside modal or pressing escape key
window.addEventListener("click", (e) => {
	if(e.target.className == "modal"){
		closeModal();
	}
});
document.addEventListener("keydown", (e) => {
	if(e.key == "Escape") {
		closeModal();
	}
});

// add Book to Library
form.addEventListener("submit", (e) => {
	e.preventDefault();
	let id = getUniqueId();
	let titleVal = title.value;
	let authorVal = author.value;
	let pagesVal = pages.value;
	let readCheckVal = readCheck.checked;
	
	addToLibrary(id, titleVal, authorVal, pagesVal, readCheckVal);
	saveLibraryToLocalStorage();

	closeModal();
	displayBooks();
});

// change read or unread status and remove book
books.addEventListener("click", (e) => {
	const target = e.target;

	if (target.classList.contains("read") || target.classList.contains("unread")){	
		const bookDiv = target.closest(".book");
		const bookId = bookDiv.dataset.bookId;
		const book = library.find((book) => book.id == bookId);
		book.readCheck == true ? book.readCheck = false : book.readCheck = true;
		saveLibraryToLocalStorage();
	}
	if (target.classList.contains("remove")){
		const bookDiv = target.closest(".book");
		const bookId = bookDiv.dataset.bookId;
		const libraryData = JSON.parse(localStorage.getItem("library"));
		
		library = libraryData.filter((book) => book.id != bookId);
		saveLibraryToLocalStorage();
	}

	loadLibraryFromLocalStorage();
});

class Book {
	constructor(id, title, author, pages, readCheck) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.readCheck = readCheck;
	}
}

function addToLibrary(id, title, author, pages, readCheck) {
	let newBook = new Book(id, title, author, pages, readCheck);
	library.push(newBook);

}

function resetForm() {
	form.reset();
}
function closeModal(){
	modal.style.display = "none";
}

function displayBooks(){
	books.innerHTML = "";
	
	library.forEach((book) => {
		const div = document.createElement("div");
		div.classList.add("book");
		div.dataset.bookId = book.id;

		const btnText = book.readCheck ? 'Read' : 'UnRead';
		const btnClass = book.readCheck ? 'read' : 'unread';
		
		div.innerHTML = `<p>${book.title}</p>
						<p>${book.author}</p>
						<p>${book.pages}</p>
						<button class="${btnClass}">${btnText}</button>
						<button class="remove">remove</button>`;
		books.append(div);
	});
}

function saveLibraryToLocalStorage(){
    localStorage.setItem("library", JSON.stringify(library));
} 

function loadLibraryFromLocalStorage(){
	const libraryData = localStorage.getItem("library");
	if(libraryData) {
		library = JSON.parse(libraryData);
		displayBooks();
	} 
}

function getUniqueId() {
	let id = 0;
	const libraryData = localStorage.getItem('library');
	if (libraryData) {
	  const books = JSON.parse(libraryData);
	  id = books.length > 0 ? books[books.length - 1].id + 1 : 0;
	}
	return id;
}

function getLibraryLocalStorage() {
	const storedLibrary = localStorage.getItem("library");
	if (storedLibrary) {
	  return JSON.parse(storedLibrary);
	} else {
	  return [];
	}
}
  
year.innerHTML = new Date().getFullYear();

// initial display
document.addEventListener("DOMContentLoaded", loadLibraryFromLocalStorage);
