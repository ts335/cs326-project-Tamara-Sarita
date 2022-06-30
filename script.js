//constants being used in file
const searchBox = document.querySelector('#blog-search');
const tagList = document.querySelectorAll('.post__meta--taglist_item'); //objects
const header = document.querySelector('.header');
const mainNav = document.querySelector('.mainNav');

searchBox.addEventListener('keyup', filterPosts);

//filters blog posts when user clicks on a tag
tagList.forEach(tags => {
    tags.addEventListener('click', (t)=>{
        console.log("Tag Clicked! : ", t); //tag object that was clicked
        searchBox.value = t.explicitOriginalTarget.innerText; //setting search box's value equal to tag's text 
        if (searchBox.value) {
            filterPosts(); //call filter posts when search box has a value
        }
    });
});

//filters blog posts when user types in a value
function filterPosts() {
    let filter = searchBox.value.toLowerCase();
    const posts = document.querySelectorAll('.post').forEach(p => {
        p.innerText.toLowerCase().indexOf(filter) > -1 
        ? p.style.display = "" 
        : p.style.display = 'none';
        });

}

//intersection observer - enables header background after user has scrolled past a specific point 
const observerCallback = (e) => {
    !(e[0].isIntersecting) ? mainNav.classList.add("applyBackground") :
    mainNav.classList.remove("applyBackground");
}
const observerOptions = {threshold : .4}

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(header);