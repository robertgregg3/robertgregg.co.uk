/*  Adding a new portfolio item:
    1) add the css, js etc pages.
    2) add the images 
    3) add item to portfolioItemData
*/

/*  Adding a new portfolio skill:
    1) add skill to portfolioCategoryData
    2) add a new skill number to both sections of addPortfolioItem
*/

// portfolioCategoryData
const portfolioCategoryData = [ 
    'all',
    'back-end',
    'css3',
    'front-end',
    'html',
    'javascript',
    // 'mongodb',
    'nodejs',
    'graphql',
    'mysql',
    // 'php',
    'photoshop',
    'premiere-pro',
    'react',
    'typescript',
    'uiux',
    'websites',
    'wordpress',
    // 'angular'
]

// portfolio Item
const portfolioItemData = [
    {
        title: 'HowToStreetDance',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill5: 'photoshop',
        skill6: 'premiere-pro',
        skill7: 'wordpress',
        skill8: 'websites',
        details: 'I have built and designed many sites but here are 4 examples.  This website was created with a wordpress theme but heavily customized to fit our UI UX needs. It includes connecting various 3rd party apps together.  This site is the sales page for the members area (members.howtostreetdance.com) where there are hundreds of courses and lesson that we created, filmed, edited and added to the site. The membership area uses a membership app combined with an email service provider which provides access through tags added upon signup/completion of the questionnaire. The platform is free at the time of writing so you can take a look. A theme was used for the initial setup and was then customized with css.',
        url: 'http://www.howtostreetdance.com'
    },
    {
        title: 'S3 Studios',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill5: 'photoshop',
        skill6: 'premiere-pro',
        skill7: 'wordpress',
        skill8: 'websites',
        details: 'This website was created with a wordpress drag and drop builder customized to fit our UI UX needs.  We added a woocommerce shop, payment providers, timetable for the classes run which was linked to the club management software.',
        url: 'http://www.s3studios.co.uk'
    },
    {
        title: 'BARTONSTEIN',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill5: 'photoshop',
        skill6: 'premiere-pro',
        skill7: 'wordpress',
        skill8: 'websites',  
        details: 'This website was created with a wordpress theme. Dealing with the client from beginning to completion',
        url: 'http://www.bartonstein.co.uk' 
    },     
    {
        title: 'TAKT',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill7: 'wordpress',
        skill8: 'websites',
        details: 'This website was created with a wordpress theme. Dealing with the client from beginning to completion',
        url: 'http://www.takt.co.uk'    
    },
    {
        title: 'recipe-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'This recipe app uses a third-party API and allows users to save their favorite meals to the local storage (just for demo purposes). As well as add meals you can also remove them once added, and also search using the search bar',
        url: '/portfolio/recipe-app.html'
    },         
    {
        title: 'note-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'This Notes app allows users to create and save notes to the local storage (just for demo purposes)',
        url: '/portfolio/note-app.html'
    },
    {
        title: 'movie-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'This Movie app uses a third-party API and allows users to search via the search bar for movies, and view the movie info.',
        url: '/portfolio/movie-app.html'
    },    
    {
        title: 'password-generator',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'Generate a password using numbers, letters (uppercase and/or lowecase) and symbols. You can then copy to the clipboard.',
        url: '/portfolio/password-generator.html'
    },    
    {
        title: 'drawing-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'Using the canvas element I created a simple drawing app allwing you to change the size of the pen and the color.  Currently this is not for mobile/touch screen.',
        url: '/portfolio/drawing-app.html'
    },    
    {
        title: 'todo-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'This toto app allows users to create and save todos to the local storage (just for demo purposes)',
        url: '/portfolio/todo-app.html'
    },    
    {
        title: 'github-profiles',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'Type in the username from someone on github and the page will show their profile along with their repos.',
        url: '/portfolio/github-profiles.html'
    },    
    {
        title: 'countdown-timer',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'A simple countdown timer',
        url: '/portfolio/countdown-timer.html'
    },    
    {
        title: 'quiz-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'A simple quiz app that displays the number of correct answers at the end',
        url: '/portfolio/quiz-app.html'
    },
    {
        title: 'scroll-animation',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript',
        details: 'Displaying some scroll based animation. Shiney object ahoy!',
        url: '/portfolio/scroll-animation.html'
    },
    {
        title: 'bootstrap-dashboard',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        details: 'Showing an example of a dashboard built using bootstrap',
        url: '/portfolio/bootstrap-dashboard.html'    
    },
    {
        title: 'in-progress',
        skill1: 'front-end',
        skill2: 'back-end',
        skill3: 'html',
        skill4: 'css3',
        skill5: 'react',
        skill6: 'typescript',
        skill7: 'nodejs',
        skill8: 'graphql',
        skill9: 'mysql',
        details: 'I am at present working on some full stack projects which will be added here soon.',
        url: '#/'
    }
];

const pfItemContainer       = document.getElementById('pf-items');
const pfCatContainer        = document.getElementById('pf-categories'); // container
const pfPageTransition      = document.getElementById('pf-filter-page-animation'); // container for page transition
const pfPageTransitionTitle = document.getElementById('pf-filter-title'); // page transition title
const pfPPopupContainer     = document.getElementById('popup-container'); // container for portfolio popup
const pfPPopupInfoEl        = document.getElementById('popup-info'); // container for portfolio popup

let currentPfItem = 0;  // index of portfolioItemData. Increases when 

// function for the portfolio category navigation
function addPortfolioCategory() {
    for (let key of portfolioCategoryData) 
    {
        const pfCategory = document.createElement('li');
        
        pfCategory.classList.add('pf-category');
        
        pfCategory.innerHTML = `
            <span class="icon-${key} spring icon"></span>
            <span class="pf-category-title">${key}</span>
            </li>           
        `;        
        pfCatContainer.appendChild(pfCategory);
        
        pfCategory.addEventListener('click', () =>{
            removeClickedClass(); // remove every pfCategory clicked class before adding it
            addClickedClass(); // set a delay so the class is added after the page transition
            triggerPageTransition(); 
            setTimeout(filterPortfolioItems, 100);             
        });

        function filterPortfolioItems(){
            const pfFilterItems = document.querySelectorAll('.pf-item');

            pfFilterItems.forEach(item => {
                item.classList.add('hidden');
                let items = pfCategory.innerText.toLowerCase();
                if(item.classList.contains(items)) {
                    item.classList.remove('hidden');
                } 
            });   
        }
        
        function addClickedClass(){
            pfCategory.classList.add('pf-category-clicked');
        }  
        
        function triggerPageTransition(){
            pfPageTransition.classList.toggle('pf-filter-page-effects'); // add class to trigger page transition
            pfPageTransitionTitle.innerHTML = key; // make the h3 text = the button text that was clicked. 
        }
    }  
}

// function to add the portfolio items, getting the data from the array
function addPortfolioItem() {
    for (let key in portfolioItemData)
    {
        
        const currentPfItemData = portfolioItemData[currentPfItem];  // index of the portfolioItemData
        const pfItem = document.createElement('div');
        
        pfItem.classList.add('pf-item');
        
        pfItem.classList.add('all',
        currentPfItemData.skill1, currentPfItemData.skill2,currentPfItemData.skill3, currentPfItemData.skill4,currentPfItemData.skill5, currentPfItemData.skill6,currentPfItemData.skill7, currentPfItemData.skill8,currentPfItemData.skill9, currentPfItemData.skill10,currentPfItemData.skill11, currentPfItemData.skill12,currentPfItemData.skill13, currentPfItemData.skill4,currentPfItemData.skill15, currentPfItemData.skill16);
                
        let url = currentPfItemData.title.replace(/\s+/g, '').toLowerCase();
        
        pfItem.innerHTML = `   
        <div class="pf-header">
                <i class="circles"></i>
                <span class="title">${currentPfItemData.title}</span>
            </div>
            <div class="pf-main">
                <img src="/images/${url+1}.jpg" alt="${currentPfItemData.title}" class="pf-item-hover-img" />
            <div class="pf-tags">
                <ul>
                    <li class="pf-tag spring icon-${currentPfItemData.skill1}">${currentPfItemData.skill1}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill2}">${currentPfItemData.skill2}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill3}">${currentPfItemData.skill3}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill4}">${currentPfItemData.skill4}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill5}">${currentPfItemData.skill5}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill6}">${currentPfItemData.skill6}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill7}">${currentPfItemData.skill7}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill8}">${currentPfItemData.skill8}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill9}">${currentPfItemData.skill9}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill10}">${currentPfItemData.skill0}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill11}">${currentPfItemData.skill11}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill12}">${currentPfItemData.skill12}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill13}">${currentPfItemData.skill13}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill14}">${currentPfItemData.skill14}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill15}">${currentPfItemData.skill15}</li>
                    <li class="pf-tag spring icon-${currentPfItemData.skill16}">${currentPfItemData.skill16}</li>
                </ul>
            </div>
            <img src="/images/${url+2}.jpg" alt="" class="pf-item-img" />
            </div>
        </div>
        `;

        // hover to show the tags and additional image
        const pfItemHoverImg = pfItem.querySelector('.pf-item-hover-img');
        const pfItemTags     = pfItem.querySelector('.pf-tags');
        
        pfItem.querySelector('.pf-main').addEventListener('mouseover', () =>{
            pfItemHoverImg.classList.add('height');
            pfItemTags.classList.add('height');
        }); 
        
        pfItem.querySelector('.pf-main').addEventListener('mouseout', () =>{
            pfItemHoverImg.classList.remove('height');
            pfItemTags.classList.remove('height');
        }); 

        pfItem.addEventListener('click', () => {
            displayPortfolioDetails(currentPfItemData);
        });
        
        pfItemContainer.appendChild(pfItem);
        currentPfItem++;
    }
}


function displayPortfolioDetails(currentPfItemData) {
    // clean the container beofre showing the pop up otherwise you get duplicates
    pfPPopupContainer.innerHTML = '';

    // update the popup info
    const pfPopupEl = document.createElement('div');
    
    pfPopupEl.classList.add('popup-info');

    let url = currentPfItemData.title.replace(/\s+/g, '').toLowerCase(); // remove spaces etc from title to create  
    
    pfPopupEl.innerHTML = `
            <div id="close"><i class="fas fa-times"></i></div>
            <div class="pf-info-header">
            <h3 class="pf-info-title">${currentPfItemData.title}</h3>
            </div>
            <img src="/images/${url+2}.jpg" alt="${currentPfItemData.title}">
            <ul class="pf-info-tags">
                <li class="pf-tag spring icon icon-${currentPfItemData.skill1}">${currentPfItemData.skill1}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill2}">${currentPfItemData.skill2}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill3}">${currentPfItemData.skill3}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill4}">${currentPfItemData.skill4}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill5}">${currentPfItemData.skill5}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill6}">${currentPfItemData.skill6}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill7}">${currentPfItemData.skill7}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill8}">${currentPfItemData.skill8}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill9}">${currentPfItemData.skill9}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill10}">${currentPfItemData.skill0}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill11}">${currentPfItemData.skill11}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill12}">${currentPfItemData.skill12}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill13}">${currentPfItemData.skill13}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill14}">${currentPfItemData.skill14}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill15}">${currentPfItemData.skill15}</li>
                <li class="pf-tag spring icon icon-${currentPfItemData.skill16}">${currentPfItemData.skill16}</li>
            </ul>
            <p class="details">${currentPfItemData.details}</p>
            <a href="${currentPfItemData.url}"><button id="pf-info-btn">Go to project</button></a>
            `;
            
            pfPPopupContainer.appendChild(pfPopupEl);
            
            // show the popup
            pfPPopupContainer.classList.remove('hidden');

            const popupCloseBtn = document.getElementById('close');  // popup close button
            popupCloseBtn.addEventListener('click', () => {
                pfPPopupContainer.classList.add('hidden');
            });
        }
        
        const pfPopupItems = document.querySelectorAll('.pf-item');
        
pfPopupItems.forEach(pfPopupItem => {
    pfPopupItem.addEventListener('click', () => {
        alert('hi')
        displayPortfolioDetails(portfolioItemData);
        pfPPopupContainer.classList.remove('hidden');
    });
});

// remove every clicked class before adding it
function removeClickedClass(){
    let allPfCategories = document.querySelectorAll('.pf-category')
    
    allPfCategories.forEach(category =>{
        if(category.classList.contains('pf-category-clicked')){
            category.classList.remove('pf-category-clicked');
        }
    });
}

addPortfolioCategory();
addPortfolioItem();