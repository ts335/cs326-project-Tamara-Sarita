//intersection observer
const blogSearch = document.querySelector('#blog-search');
blogSearch.addEventListener('keyup', filterPosts);

//click on tag to filter blog
const tag = document.querySelector('.post__meta--taglist_item');
tag.addEventListener('click', clickTagHandler);

function clickTagHandler() {
    console.log('Tag clicked.');
    const taglist = document.querySelectorAll('.post__meta--taglist').forEach(t => {
        console.log("Print: ", t);
        });
}

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