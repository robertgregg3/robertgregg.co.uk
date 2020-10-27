/*  Todo
            1) create a function of Lis and map to the menu nav so I don'y repeat the code and have to edit the menu once
            2) add correctly numbered images
*/
// portfolioCategoryData
const portfolioCategoryData = [ 
    'show-all',
    'front-end',
    'back-end',
    'html',
    'css3',
    'javascript',
    'nodejs',
    'mongodb',
    'typescript',
    'php',
    'mysql',
    'graphql',
    'photoshop',
    'premiere-pro',
    'uiux',
    'websites',
    'wordpress'
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
        skill8: 'websites'
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
        skill8: 'websites'
    },
    {
        title: 'SS4A',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill5: 'photoshop',
        skill6: 'premiere-pro',
        skill7: 'wordpress',
        skill8: 'websites'
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
        skill8: 'websites'   
    },     
    {
        title: 'TAKT',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'uiux',
        skill7: 'wordpress',
        skill8: 'websites'   
    },
    {
        title: 'recipe-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },         
    {
        title: 'note-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },
    {
        title: 'movie-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'password-generator',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'drawing-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'todo-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'github-profiles',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'countdown-timer',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    },    {
        title: 'quiz-app',
        skill1: 'front-end',
        skill2: 'html',
        skill3: 'css3',
        skill4: 'javascript'
    }
];

const pfItemContainer       = document.getElementById('pf-items');
const pfCatContainer        = document.getElementById('pf-categories'); // container
const pfPageTransition      = document.getElementById('pf-filter-page-animation'); // container
const pfPageTransitionTitle = document.getElementById('pf-filter-title');

let img1            = 1;
let img2            = 2;
let currentPfItem   = 0;  // index of portfolioItemData. Increases when 
let currentCategory = '';


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
        
        pfItem.classList.add('show-all',
        currentPfItemData.skill1, currentPfItemData.skill2,currentPfItemData.skill3, currentPfItemData.skill4,currentPfItemData.skill5, currentPfItemData.skill6,currentPfItemData.skill7, currentPfItemData.skill8,currentPfItemData.skill9, currentPfItemData.skill10,currentPfItemData.skill11, currentPfItemData.skill12,currentPfItemData.skill13, currentPfItemData.skill4,currentPfItemData.skill15, currentPfItemData.skill16,currentPfItemData.skill17);
        
        let url = currentPfItemData.title.replace(/\s+/g, '').toLowerCase(); // remove spaces etc from title to create url
        
        pfItem.innerHTML = `
        <a href="/portfolio/${url}.html">
            <div class="pf-header">
                <i class="circles"></i>
                <span class="title">${currentPfItemData.title}</span>
            </div>
            <div class="pf-main">
                <img src="https://www.robertgregg.co.uk/images/p${img1}.jpg" alt="" class="pf-item-hover-img" />
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
                    <li class="pf-tag spring icon-${currentPfItemData.skill17}">${currentPfItemData.skill17}</li>
                </ul>
            </div>
            <img src="https://www.robertgregg.co.uk/images/p${img2}.jpg" alt="" class="pf-item-img" />
            </div>
        </div>
        </a>
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
        
        pfItemContainer.appendChild(pfItem);
        currentPfItem++;
        increaseImgNum(); 
        checkPfItem();
    }
}


function checkPfItem() {
    const allPfItems = document.querySelectorAll('.pf-item');
    
}

// for every portfolio item increase the numbers of the images.  
function increaseImgNum(){
    img1 += 2;
    img2 += 2;
}

// remove every clicked class before adding it
function removeClickedClass(){
    let allPfCategories = document.querySelectorAll('.pf-category')
    
    allPfCategories.forEach(category =>{
        if(category.classList.contains('pf-category-clicked')){
            category.classList.remove('pf-category-clicked');
        }
    });
}

// function filterPortfolioItems() {
//     const pfFilterCategories = document.querySelectorAll('.pf-category');
    
  
//     // pfFilterCategories.forEach(category => {
//     //     console.log(category.innerText)
//     //     pfFilterItems.forEach(item => {
//     //         if(!item.classList.contains(category.innerText)) {
//     //             item.style.display= 'none';
//     //         }
//     //     });
//     // });

// }
    
    // console.log(value.innerText)

  


addPortfolioCategory();
addPortfolioItem();




