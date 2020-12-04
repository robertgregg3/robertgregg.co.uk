const mainNav        = document.getElementById('nav-container');
const inputName      = document.getElementById('name');
const inputEmail     = document.getElementById('email');
const inputTextarea  = document.getElementById('textarea');
const statusName     = document.getElementById('status-name');
const statusEmail    = document.getElementById('status-email');
const statusTextarea = document.getElementById('status-textarea');
const submitBtn      = document.getElementById('submit-btn');	

let root = 'http://www.robertgregg.co.uk/';

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
		url: root + `images/pdf/cv.pdf`,
		alt: 'View My CV!'
	},
	{
		page_title: 'Contact',
		url: root + `contact.html`,
		title: 'Get in touch!'
	}
];

function toggleNav() {
	const nav              = document.querySelector('nav .main-nav');
	const getInTouchBtn    = document.getElementById('get-in-touch');
	const navToggle        = document.querySelector('nav .nav__toggle');
	const toggleTopLine    = document.querySelector('nav .nav__toggle__line-top');
	const toggleMiddleLine = document.querySelector('nav .nav__toggle__line-middle')
	const toggleBottomLine = document.querySelector('nav .nav__toggle__line-bottom');
	
	navToggle.addEventListener('click', openMenu);

	if(getInTouchBtn){ // this button is just on the home page
		getInTouchBtn.addEventListener('click', () => {
			openMenu();
			triggerContact();
		});
	}

	function openMenu() {
		nav.classList.toggle('display');
		toggleTopLine.classList.toggle('nav__toggle__line-top--selected');
		toggleBottomLine.classList.toggle('nav__toggle__line-bottom--selected');
		toggleMiddleLine.classList.toggle('display');
	};
}

function addMenuData(menuData) {
	const menuEl = document.createElement('div');
	menuEl.classList.add('main-nav')
	menuEl.classList.add('display')

	menuEl.innerHTML = `
			<div class="nav-popup-left">
				<div class="rob-head-shot"><img src="/images/rob.jpg" /></div>
				<a href="https://www.linkedin.com/in/robert-gregg-b1a66a32/"><span class="spring icon-linkedin icon"></span></a>
			</div>
			<div class="nav-popup-right">
				<ul>
					<li class="nav-item"><a href="${menuData[0].url}" title="${menuData[0].page_title}">${menuData[0].page_title}</a></li>
					<li class="nav-item"><a href="${menuData[1].url}" title="${menuData[1].page_title}">${menuData[1].page_title}</a></li>
					<li class="nav-item"><a href="${menuData[2].url}" title="${menuData[2].page_title}">${menuData[2].page_title}</a></li>
					<li id="contact-button">${menuData[3].page_title}<span class="nav-item-arrow"><i class="far fa-arrow-alt-circle-right"></i></span</li>
					<li>
						<div id="contact-container" class="hidden">
							<form 
							action="https://formspree.io/f/xrgokqda" 
							method="POST" 
							id="contact-form"
							>
								<input id="name" type="text" placeholder="name" name="name"/>
								<input id="email" type="email" placeholder="email" name="email" />
								<textarea id="textarea" placeholder="message" name="message"></textarea>
								<div id="my-form-status"></div>
								<input id="submit-btn" type="submit" value="Send">
							</form>
						</div>
					</li>
				</ul>
			</div>
				`;

	mainNav.appendChild(menuEl);

	const contactBtn = document.getElementById('contact-button');
	contactBtn.addEventListener('click', triggerContact);

	toggleNav();
}

function triggerContact(){
	const contactContainer = document.getElementById('contact-container');
	const menuItems        = document.querySelectorAll('.nav-item'); 
	const menuItemArrow    = document.querySelector('.nav-item-arrow'); 
	const formInputs       = document.querySelectorAll('input')

	contactContainer.classList.toggle('hidden');
	menuItemArrow.classList.toggle('point-down');

	menuItems.forEach(item => {
		item.classList.toggle('hidden');

		formInputs.forEach(input => {
			input.classList.toggle('form-resp-padding');
		});
	});
}

addMenuData(menuData);

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form   = document.getElementById("contact-form");
    var status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      submitBtn.style = "display: none ";
	  status.innerHTML = "Thanks! Your form was submitted successfully. I will usually respond within 24 hours";
	  inputName.style = "display: none";
	  inputEmail.style = "display: none";
	  inputTextarea.style = "display: none";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.  Please check that you have filled in the form correctly";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }