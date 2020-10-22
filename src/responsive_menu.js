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


/* COUNTDOWN TIMER*/
//Ending date, current date, subtract.

const launch = 'Dec 1 2020';

function countdown(){
	const launchDate = new Date(launch);
	const currentDate = new Date();

	const totalSeconds = (launchDate - currentDate) / 1000 ;
	const days = Math.floor((totalSeconds / 3600) / 24);
	const hours = Math.floor((totalSeconds / 3600) % 24);
	const minutes = Math.floor((totalSeconds / 60) % 60);
	const seconds = Math.floor((totalSeconds) % 60);

	const daysC = document.getElementById('days');
	const hoursC = document.getElementById('hours');
	const minutesC = document.getElementById('minutes');
	const secondsC = document.getElementById('seconds');

	daysC.innerHTML    = formatTime(days);
	hoursC.innerHTML   = formatTime(hours);
	minutesC.innerHTML = formatTime(minutes);
	secondsC.innerHTML = formatTime(seconds);
}

function formatTime(time) {
	return time < 10 ? (`0${time}`) : time;
}

countdown();

setInterval(countdown, 1000); // calls the countdown function every second