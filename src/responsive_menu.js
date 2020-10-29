function toggleNav() {
	const nav              = document.querySelector('nav ul');
	const navToggle        = document.querySelector('nav .nav__toggle');
	const toggleTopLine    = document.querySelector('nav .nav__toggle__line-top');
	const toggleMiddleLine = document.querySelector('nav .nav__toggle__line-middle')
	const toggleBottomLine = document.querySelector('nav .nav__toggle__line-bottom');
	
	navToggle.addEventListener('click', () => {
		nav.classList.toggle('display');
		toggleTopLine.classList.toggle('nav__toggle__line-top--selected');
		toggleBottomLine.classList.toggle('nav__toggle__line-bottom--selected');
		toggleMiddleLine.classList.toggle('display');
	});
}

const mainNav = document.getElementById('nav-container');
let root      = 'http://www.robertgregg.co.uk/';

const menuData = [
	{
		page_title: 'Home',
		url: root,
		title: 'The home of Robert Gregg the Software Developer'
	},
	{
		page_title: 'Portfolio',
		url: root + `portfolio.html`,
		title: 'View my portfolio'
	},
	{
		page_title: 'CV',
		url: root + `pdf/cv.pdf`,
		alt: 'View My CV!'
	},
	{
		page_title: 'Contact',
		url: root + `contact.html`,
		title: 'Get in touch!'
	}
];

function addMenuData(menuData) {
	const menuEl = document.createElement('div');
	menuEl.classList.add('main-nav')

	menuEl.innerHTML = `
			<ul class="display">
				<li><a href="${menuData[0].url}" title="${menuData[0].page_title}">${menuData[0].page_title}</a></li>
				<li><a href="${menuData[1].url}" title="${menuData[1].page_title}">${menuData[1].page_title}</a></li>
				<li><a href="${menuData[2].url}" title="${menuData[2].page_title}">${menuData[2].page_title}</a></li>
				<li><a href="${menuData[3].url}" title="${menuData[3].page_title}">${menuData[3].page_title}</a></li>
			</ul>
	`;

	mainNav.appendChild(menuEl);

	toggleNav();
}

addMenuData(menuData);

console.log(menuData[1].url);



