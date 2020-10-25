// function filterPortfolio(){} - btings it all together
    //add class hidden to the divs that don't contain the class of the selected element value
    // removes all selected classes
    // triggers page animation transtion
    // then re adds selected class to category
// function addHiddenClasses()
// function removeSelectedClasses()
// function addSelectedClasses()
// function pageAnimation()
// 





const portfolioContainer        = document.getElementById('pf'); // container
const portfolioItem1            = document.getElementById('pf-item-1'); // the ID we have used for testing
const portfolioItem1Hover       = document.getElementById('pf-item-1-hover'); 
const portfolioTags1            = document.getElementById('pf-tags-1');
const portfolioFrontEnd         = document.getElementById('pf-nav-front-end'); // portfolio category
const portfolioItem             = portfolioContainer.querySelectorAll('.pf-item'); // each portfolio item
const portfolioPageAnimate      = document.getElementById('pf-filter-page-animation');
const portfolioPageAnimateTitle = document.getElementById('pf-filter-title'); // TITLE ON PAGE ANIMATION
const portfolioFilterItemTitle  = document.getElementById('pf-nav-front-end'); // category navigation

portfolioItem1.addEventListener('mouseover', () => {  
    // portfolio item is hovered it shows the tags and other image
   portfolioItem1Hover.classList.add('height');
   portfolioTags1.classList.add('height');
});

portfolioItem1.addEventListener('mouseout', () => {
    // Above tags and image dissappear when the mouse is off the item
    portfolioItem1Hover.classList.remove('height');
    portfolioTags1.classList.remove('height');
 });

 console.log(portfolioFrontEnd.innerText)
 
 portfolioFrontEnd.addEventListener('click', () => {
     
     for (let item of portfolioItem) {
         if(!item.classList.contains(portfolioFrontEnd.innerText))
         {
             item.classList.add('hidden');
             
             portfolioPageAnimate.classList.add('pf-filter-page-effects'); 
             
             setTimeout(addNavClass, 1000);
             
             function addNavClass() {
                 portfolioFilterItemTitle.classList.add('pf-category-clicked');
                }
            }
            portfolioPageAnimateTitle.innerText = portfolioFrontEnd.innerText;
    }
 });


