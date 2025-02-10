let filterButtonIds = ["houdini_button", "programming_button", "all_button"];

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
    console.log("BUTTON CLICKED");
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
    await sleep(300);
    for (let i=0; i<portfolioItems.length; i++){
        const portfolioItem = portfolioItems[i];
        const itemTags = JSON.parse(portfolioItem.getAttribute('data-portfolio-item-tag'));
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

function setPortfolioAnimationTriggers(){
    // get all portfolio items
    document.querySelectorAll('.portfolio-items div').forEach((portfolioItem) => {
        portfolioItem.addEventListener('animationend', () => {
            console.log('animation end');
            // after dissapear
            if (!portfolioItem.classList.contains('active')) {
                // unload portfolio item
                console.log('setting to none');
                portfolioItem.style.display = 'none';
            }
            // after appear
            else{
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log('content loaded');

    fetch('/website_api/projects/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            populatePortfolioItems(data);
        })
        .catch(error => console.error('Error:', error));




});

function populatePortfolioItems(jsonData, start=0, end=jsonData.length){
    let portfolioColumns = getComputedStyle(document.body).getPropertyValue('--portfolio-columns');
    console.log("Window Width: " + window.innerWidth);
    console.log("Column Count: " +portfolioColumns);
    let portfolioImageWidth = Math.floor(window.innerWidth/portfolioColumns);
    console.log("portfolioImageWidth: " + portfolioImageWidth);

    let portfolioSection = document.querySelector(".portfolio-items"); 

    let effectiveEnd = Math.min(end, jsonData.length);

    // preload
    for(let i=start; i<effectiveEnd; i++){
        let preload=new Image();
        let localImagePath = "filters:format%28avif%29/picsum.photos/seed/"+(i+1)+"/1920/1080";
        preload.src = "https://parkerbritt.com/thumbor/unsafe/20x0/"+localImagePath;
    }

    for(let i=start; i<effectiveEnd; i++){
        let itemJson = jsonData[i];
        let itemName = itemJson.name;
        // let localImagePath = "wip.parkerbritt.com/assets/portfolio/"+itemJson.dir+"/thumbnail.avif";
        let localImagePath = "filters:format%28avif%29/picsum.photos/seed/"+(i+1)+"/1920/1080";
        let itemImagePath = "https://parkerbritt.com/thumbor/unsafe/"+Math.floor(portfolioImageWidth)+"x0/"+localImagePath;
        // let itemImagePath = "assets/portfolio/personal_flower_bloom/original.png";
        let itemTags = itemJson.tags;
        console.log("creating new item: ", itemName);

        // container
        let itemContainer = document.createElement('div');
        itemContainer.setAttribute("data-project-name", itemName);
        itemContainer.setAttribute("data-portfolio-item-tag", JSON.stringify(itemTags));

        // preload
        let preloadURL = "https://parkerbritt.com/thumbor/unsafe/20x0/"+localImagePath;
        itemContainer.style.background = 'url('+preloadURL+') center / cover no-repeat';


        // image
        let itemImage = document.createElement('img');
        itemImage.setAttribute("src", itemImagePath);
        itemImage.setAttribute("loading", "lazy");
        itemContainer.appendChild(itemImage);

        portfolioSection.appendChild(itemContainer);
    }

    setPortfolioAnimationTriggers();

    // when content has finished, press all button
    setFilterButtonState(document.getElementById('all_button'), true);
    filterPortfolioItems('all')
}
