/* MENU NAVIGATION */

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