// let filterHoudini = false;
// let filterCommercial = false;
// let filterProgramming = false;
// let filterPersonal = false;
// let filterAll = false;

let filterButtonIds = ["houdini_button", "programming_button", "all_button"];

setFilterButtonState(document.getElementById('all_button'), true);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setFilterButtonState(button, state){
    if(state){
        // set value
        button.value = "on"; 

        // add style
        button.classList.add("active")

        // reset buttons
        for(let i=0; i<filterButtonIds.length; i++){
            let curId = filterButtonIds[i];
            if(curId!=button.id){
                setFilterButtonState(document.getElementById(curId), false);
            }
        }
    } else{
        // remove style
        button.classList.remove("active")
        // set value
        button.value = "off";
    }
}
function getFilterButtonState(button){
    return button=="on";
}
function toggleFilterButton(button){
    button.value = !getFilterButtonState(button);
}

function onFilterButtonClicked(id, tag) {
    const button = document.getElementById(id);
    setFilterButtonState(button, true);
    filterPortfolioItems(tag);
}
async function filterPortfolioItems(activeTag){
    const portfolioItems = document.querySelectorAll("[data-portfolio-item-tag]")

    let displayedCounter = 0;
    for (let i=0; i<portfolioItems.length; i++){
        const portfolioItem = portfolioItems[i];
        portfolioItem.style.animationDelay = (0)+'s';
        portfolioItem.classList.remove("active");
    }
    await sleep(150);
    for (let i=0; i<portfolioItems.length; i++){
        const portfolioItem = portfolioItems[i];
        const itemTags = JSON.parse(portfolioItem.getAttribute('data-portfolio-item-tag'));
        console.log("portfolio item: " + portfolioItem.innerText + ' ' + JSON.parse(portfolioItem.getAttribute('data-portfolio-item-tag')));
        if(
            activeTag==="all" || itemTags.includes(activeTag)
        ){
            if(!portfolioItem.classList.contains("active")){
                displayedCounter++;
                portfolioItem.classList.add("active");
            }
            portfolioItem.style.animationDelay = (displayedCounter*0.1)+'s';
            portfolioItem.style.display = "grid";

            const projectName = portfolioItem.getAttribute("data-project-name");
            portfolioItem.style.setProperty("--portfolio-item-name", '\"'+projectName+'\"');
        }
        // } else {
        //     portfolioItem.style.animationDelay = (0)+'s';
        //     portfolioItem.classList.remove("active");
        // }

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
        }
    });
});
