let filterHoudini = false;
let filterCommercial = false;
let filterProgramming = false;
let filterPersonal = false;
function onFilterButtonClicked(id, tag) {
    const button = document.getElementById(id);
    button.classList.toggle("filter-button-clicked")
    if(tag==='houdini'){
        filterHoudini = !filterHoudini;
    } else if(tag==='commercial'){
        filterCommercial = !filterCommercial;
    } else if (tag==='personal'){
        filterPersonal = !filterPersonal;
    } else if (tag==='programming'){
        filterProgramming = !filterProgramming;
    }
    console.log("toggled: " + filterHoudini, filterProgramming, filterCommercial, filterPersonal);
    filterPortfolioItems();
}
function filterPortfolioItems(){
    const portfolioItems = document.querySelectorAll("[data-portfolio-item-tag]")
    console.log("len:" + portfolioItems.length);
    let displayedCounter = 0;
    for (let i=0; i<portfolioItems.length; i++){
        const portfolioItem = portfolioItems[i];
        const itemTags = JSON.parse(portfolioItem.getAttribute('data-portfolio-item-tag'));
        console.log("portfolio item: " + portfolioItem.innerText + ' ' + JSON.parse(portfolioItem.getAttribute('data-portfolio-item-tag')));
        if(
            (filterHoudini && itemTags.includes('houdini')) ||
            (filterProgramming && itemTags.includes('programming')) ||
            (filterCommercial && itemTags.includes('commercial')) ||
            (filterPersonal && itemTags.includes('personal'))
        ){
            if(!portfolioItem.classList.contains("active")){
                displayedCounter++;
                portfolioItem.classList.add("active");
            }
            portfolioItem.style.animationDelay = (displayedCounter*0.1)+'s';
            portfolioItem.style.display = "grid";

            const projectName = portfolioItem.getAttribute("data-project-name");
            portfolioItem.style.setProperty("--portfolio-item-name", '\"'+projectName+'\"');
        } else {
            portfolioItem.classList.remove("active");
        }

    }
}

// get all portfolio items
document.querySelectorAll('.portfolio-items div').forEach((portfolioItem) => {
    portfolioItem.addEventListener('animationend', () => {
        // after dissapear
        if (!portfolioItem.classList.contains('active')) {
            // unload portfolio item
            portfolioItem.style.display = 'none';
        }
        // after appear
        else{
            // reset animation delay
            portfolioItem.style.animationDelay = (0)+'s';
        }
    });
});
