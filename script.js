const addBook = document.getElementById("add");
const modal = document.querySelector(".modal");
const readBook = document.querySelectorAll(".read");
const books = document.getElementById("books");

// modal
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readCheck = document.getElementById("readCheck");
const form = document.querySelector("form");


const myLibrary = [
	{
		id: 1,
		title: 'Mere Christianity',
		author: 'C.S.Lewis',
		pages: '414',
		readCheck: false
	},
	{
		id: 2,
		title: 'Mere Christianity',
		author: 'C.S.Lewis',
		pages: '414',
		readCheck: true
	},
	{
		id: 3,
		title: 'Mere Christianity',
		author: 'C.S.Lewis',
		pages: '414',
		readCheck: false
	},
	{
		id: 4,
		title: 'Mere Christianity',
		author: 'C.S.Lewis',
		pages: '414',
		readCheck: true
	}
]

// myLibrary.forEach((book) => {
// 	let div = document.createElement("div");
// 	div.classList.add("book");
// 	div.innerHTML = `   <p>${book.title}</p>
// 						<p>${book.author}</p>
// 						<p>${book.pages}</p>
// 						<button class="read">Read</button>
// 						<button class="remove">remove</button>
// 					`;
// 	books.append(div);
// });


// const modalcontent = document.querySelector(".modal-content");
addBook.addEventListener("click", () => {
	title.value = "";
	author.value = "";
	pages.value = "";
	readCheck.value = "";
	modal.style.display = "block";
});

window.addEventListener("click", (e) => {
	if(e.target.className == "modal"){
		modal.style.display = "none";
	}
});

readBook.forEach((book) => {
	book.addEventListener("click", (e) => {
		let bookClass = e.currentTarget.classList;
		if(bookClass.contains("read")){
			bookClass.replace("read", "unread");
		    e.target.innerText = "UnRead"	
		} else {
			bookClass.replace("unread", "read");
			e.target.innerText = "Read"	
		}
	});
});

function Book(title, author, pages, readCheck){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readCheck = readCheck;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let titleVal = title.value;
	let authorVal = author.value;
	let pagesVal = pages.value;
	let readCheckVal;
	if(readCheck.checked){
		readCheckVal = true;
	} else {
		readCheckVal = false;
	}

	// let newBook = new Book();
	// newBook.title = titleVal;
	// newBook.author = authorVal;
	// newBook.pages = pagesVal;
	// newBook.readCheck = readCheckVal;
	// myLibrary.push(newBook);

	let div = document.createElement("div");
	div.classList.add("book");
		div.innerHTML = `
					<p>${titleVal}</p>
				<p>${authorVal}</p>
					<p>${pagesVal}</p>
					<button class="unread">Unread</button>
					<button class="remove">remove</button>
					`;
	books.append(div);
	modal.style.display = "none";
});


