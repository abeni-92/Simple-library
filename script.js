const addBook = document.getElementById("add");
const modal = document.querySelector(".modal");
const books = document.getElementById("books");
const form = document.querySelector("form");

// modal elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");

let library = [];

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
	let titleVal = title.value;
	let authorVal = author.value;
	let pagesVal = pages.value;
	let readCheckVal = readCheck.checked;
	let id = library.length; 
	
	addToLibrary(id, titleVal, authorVal, pagesVal, readCheckVal);
	saveLibraryToLocalStorage();

	closeModal();
	displayBooks();
});

// books.addEventListener("click", e => {
// 	let target = e.target;

// 	if (target.classList.contains("read") || target.classList.contains("unread")) {
// 		const bookDiv = target.closest(".book");
// 		const bookId = bookDiv.dataset.bookId;
// 		const book = library.find((book) => book.id === Number(bookId));
// 	}
// });

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
	let newBook = new Book(Number(id), title, author, pages, readCheck);
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


// initial display
document.addEventListener("DOMContentLoaded", loadLibraryFromLocalStorage);
