const portfolioItem1      = document.getElementById('p-item-1');
const portfolioItem1Hover = document.getElementById('p-item-1-hover');
const portfolioTags1      = document.getElementById('p-tags-1');


portfolioItem1.addEventListener('mouseover', () => {
   portfolioItem1Hover.classList.add('height');
   portfolioTags1.classList.add('height');
});

portfolioItem1.addEventListener('mouseout', () => {
    portfolioItem1Hover.classList.remove('height');
    portfolioTags1.classList.remove('height');
 });