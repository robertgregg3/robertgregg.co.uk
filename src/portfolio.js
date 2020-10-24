const portfolioContainer        = document.getElementById('portfolio');
const portfolioItem1            = document.getElementById('p-item-1');
const portfolioItem1Hover       = document.getElementById('p-item-1-hover');
const portfolioTags1            = document.getElementById('p-tags-1');
const portfolioFrontEnd         = document.getElementById('p-nav-front-end');
const portfolioItem             = portfolioContainer.querySelectorAll('.p-item');
const portfolioPageAnimate      = document.getElementById('p-filter-page-animation');
const portfolioPageAnimateTitle = document.getElementById('p-filter-title');
const portfolioFilterItemTitle  = document.getElementById('p-nav-front-end');

portfolioItem1.addEventListener('mouseover', () => {
   portfolioItem1Hover.classList.add('height');
   portfolioTags1.classList.add('height');
});

portfolioItem1.addEventListener('mouseout', () => {
    portfolioItem1Hover.classList.remove('height');
    portfolioTags1.classList.remove('height');
 });

 portfolioFrontEnd.addEventListener('click', () => {
 // when the button is clicked, store the id    
    for (let item of portfolioItem) {
        if(!item.classList.contains(portfolioFrontEnd.innerText)){
             item.classList.add('hidden');
             portfolioPageAnimate.classList.add('p-filter-page-effects');
             setTimeout(addNavClass, 1000);
             function addNavClass() {
                 portfolioFilterItemTitle.classList.add('p-item-nav-clicked');
             }
        }
        portfolioPageAnimateTitle.innerText = portfolioFrontEnd.innerText;
    }
 });


 // have ids for all of the possible nav ideas
 // give every portfolio item a class of any languages involved
 // when you click the id, if any element doen't have a class of the value of the id, 
 // add class hidden