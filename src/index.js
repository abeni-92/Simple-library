import './style.css';

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
// import { fa1} from "@fortawesome/free-solid-svg-icons/fa1";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";

library.add(faAdd, faGithub);
dom.watch();

const nav = document.createElement('nav');
nav.innerHTML = ` <h1>Library</h1>			  
				  <a class="add" id="login">Login</a>`;

const addIcon = document.createElement('a');				  
addIcon.classList.add('add');
addIcon.innerHTML = `<i class="fa-solid fa-add"></i> Add`;

const modal = document.createElement('div');
modal.classList.add('modal');

modal.innerHTML = `<div class="modal-content">
						<h2>Add New Book</h2>
						<form action="#" method="get">
							<input type="text" name="title" id="title" required placeholder="Title">
							<input type="text" name="author" id="author" required placeholder="Author">
							<input type="number" name="pages" id="pages" max="10000" required placeholder="Pages">
							<div class="check"><label for="readCheck">Have you read it?</label><input type="checkbox" name="readCheck" id="readCheck"></div>	
							<button class="submit">submit</button>	
						</form>
				   </div>`;

const bookSection = document.createElement('section');
bookSection.setAttribute('id', 'books');

// <i class="fa-brands fa-github"></i>
const footer = document.createElement('footer');
footer.innerHTML = `<p>Simple Library &copy; Abenezer Tesfaye <span id="year"></span></p>
				    <a href="https://github.com/abeni-92/Simple-library" target="_blank"><i class="fa-brands fa-github "></i></a>`;

const year = footer.querySelector('span');
year.textContent = new Date().getFullYear();

const body = document.querySelector('body');
body.append(nav, addIcon, modal, bookSection, footer);

addIcon.addEventListener('click', () => {
	modal.style.display = 'block';
});

window.addEventListener('click', (e) => {
	if(e.target.className == 'modal'){
		closeModal();
	}
});
document.addEventListener("keydown", (e) => {
	if(e.key == "Escape") {
		closeModal();
	}
});


const form = modal.querySelector('form');
const title = modal.querySelector("#title");
const author = modal.querySelector("#author");
const pages = modal.querySelector("#pages");
const readCheck = modal.querySelector("#readCheck");

let Books = getBooks();

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let id = getUniqueId();
	let Title = title.value;
	let Author = author.value;
	let Pages = pages.value;
	let ReadCheck = readCheck.checked;

	const book = {
		id,
		Title,
		Author,
		Pages,
		ReadCheck
	}

	Books.push(book);
	saveBooks()
	
	resetForm();
	displayBooks();
	modal.style.display = 'none';

});

function saveBooks() {
	localStorage.setItem("books", JSON.stringify(Books));
}

function displayBooks(){

	bookSection.innerHTML = '';
	Books.forEach((book) => {		
			const div = document.createElement("div");
			div.classList.add("book");
			div.dataset.bookId = book.id;

			const btnText = book.ReadCheck ? 'Read' : 'UnRead';
			const btnClass = book.ReadCheck ? 'read' : 'unread';
			
			div.innerHTML = `<p>${book.Title}</p>
							<p>${book.Author}</p>
							<p>${book.Pages}</p>
							<button class="${btnClass}">${btnText}</button>
							<button class="remove">remove</button>`;
			bookSection.append(div);
	});
}

bookSection.addEventListener('click', (e) => {
	const target = e.target;

	if (target.classList.contains('read') || target.classList.contains("unread")){	
		const bookDiv = target.closest(".book");
		const bookId = bookDiv.dataset.bookId;
		const book = Books.find((book) => book.id == bookId);
		book.ReadCheck == true ? book.ReadCheck = false : book.ReadCheck = true;
		saveBooks();
	}

	if (target.classList.contains("remove")){
		const bookDiv = target.closest(".book");
		bookDiv.classList.add("delete");
		const bookId = bookDiv.dataset.bookId;
		const booksData = JSON.parse(localStorage.getItem("books"));
		
		Books = booksData.filter((book) => book.id != bookId);
		saveBooks();
	}
	setTimeout(() => {
		displayBooks()
	}, 1500);

});

function getUniqueId() {
	let id = 0;
	const Books = localStorage.getItem('books');
	if (Books) {
	  const parsedBooks = JSON.parse(Books);
	  id = parsedBooks.length > 0 ? parsedBooks[parsedBooks.length - 1].id + 1 : 0;
	}
	return id;
}

function resetForm() {
	form.reset();
}

function closeModal() {
	modal.style.display = 'none';
}

function getBooks() {
	const storedBooks = localStorage.getItem('books');
	if(storedBooks) {
		return JSON.parse(storedBooks)
	}
	return [];
}


document.addEventListener('DOMContentLoaded', displayBooks);



