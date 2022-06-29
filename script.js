//intersection observer
const blogSearch = document.querySelector('#blog-search');
blogSearch.addEventListener('keyup', filterPosts);
// https://reactgo.com/add-event-listener-multiple-elements-javascript/#:~:text=Adding%20event%20listener%20to%20multiple,an%20event%20listener%20to%20it
//click on tag to filter blog
const tag = document.querySelectorAll('.post__meta--taglist_item').forEach(t => {
    console.log(t.innerText);
    t.addEventListener('click', (t)=>{
        console.log('tag clicked');
        console.log(t.explicitOriginalTarget.innerText);
        //set equal to content of search box
    });
});

//filters all blog posts
function filterPosts() {
    let filter = blogSearch.value.toLowerCase();
    const posts = document.querySelectorAll('.post').forEach(p => {
        p.innerText.toLowerCase().indexOf(filter) > -1 
        ? p.style.display = "" 
        : p.style.display = 'none';
        });

}
//enables header at a specific point in scrolling
const header = document.querySelector('.header');
const mainNav = document.querySelector('.mainNav');

const observerCallback = (e) => {
    !(e[0].isIntersecting) ? mainNav.classList.add("applyBackground") :
    mainNav.classList.remove("applyBackground");
}
const observerOptions = {threshold : .4}

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(header);