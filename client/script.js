const header = document.querySelector('.header');
const mainNav = document.querySelector('.mainNav');

//Navigation Links
const homePage = document.querySelector('#home');
const registerPage = document.querySelector('#register');
const loginPage = document.querySelector('#login');
const accountPage = document.querySelector('#account');

let contentSection = document.querySelector('#content');

//content views
const registerView = `<center><form action="/register" method="post"  >
  <div class="container">
    <h1>Register</h1><br>
    <p>Please fill in this form to create an account.</p><br>
    <hr>
    <label for="firstName"><b>First Name</b></label>
    <input type="text" placeholder="Enter First Name..." name="firstName" id="firstName" required>
    <br>
    <label for="lastName"><b>Last Name</b></label>
    <input type="text" placeholder="Enter Last Name..." name="lastName" id="lastName" required>
    <br>
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username..." name="userName" id="userName" required>
    <br>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password..." name="psw" id="psw" required>
    <br>
    <div class="buttons">
    <button type="submit" class="register">Submit</button>
    </div></div>
    <br><br><br>
    </form></center>`;

const accountView = `<center><form action="/account" method="post">
  <div class="container">
    <h1>Edit Account Details</h1><br>
    <p>Fill out the following information to update account info.</p><br>
    <hr>
    <label for="firstName"><b>First Name</b></label>
    <input type="text" placeholder="Enter First Name..." name="firstName" id="firstName">
    <br>
    <label for="lastName"><b>Last Name</b></label>
    <input type="text" placeholder="Enter Last Name..." name="lastName" id="lastName">
    <br>
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username..." name="userName" id="userName">
    <br>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password..." name="psw" id="psw">
    <br>
    <div class="buttons">
    <button type="submit" id="update" class="login">Update</button>
    <button type="button" id="logout" class="login">Log Out</button>
    <br><br>
    <button type="button" id="delete" class="register">Delete Account</button>
    </div></div>
    <br><br><br>
    </form></center>`;

 const loginView = `<center><form action="/login" method="post">
<div class="container">
  <h1>Login</h1><br>
  <p>Please sign into your account.</p><br>
  <hr>
  <label for="username"><b>Username</b></label>
  <input type="text" placeholder="Enter Username..." name="userName" id="userName" required>
  <br>
  <label for="psw"><b>Password</b></label>
  <input type="password" placeholder="Enter Password..." name="psw" id="psw" required>
  <br>
  <div class="buttons">
  <button type="submit" class="login">Login</button>
  </div></div>
  <br><br><br>
  </form></center>`;

const searchView = `<h2 id="blog-post-header">Recent Posts</h2>
<input type="text" id="blog-search" placeholder="Search for a post...">
<section class="blog-posts">
    <div class = "post-container">
        <article class="post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/puerto_rico.png" alt="puerto_rico" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Hometown in Puerto Rico</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">travel</a>
                        <a href="#" class="post__meta--taglist_item">puerto rico</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sit obcaecati voluptates provident, quas optio odit praesentium
                possimus nulla error? Maxime unde iste praesentium doloremque
                accusantium obcaecati accusamus quaerat deleniti cumque.
                <img src="/images/buddhism.jpg" alt="buddhism" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Meditation in nature...</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">buddhism</a>
                        <a href="#" class="post__meta--taglist_item">peace</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea blanditiis
                incidunt velit ex eveniet. Fuga, dolores, repellat, beatae maiores id
                vitae tempore animi voluptates nihil quas dolorem adipisci harum nulla.
                <img src="/images/catacombs.jpg" alt="catacombs" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Visit to Catacombs Paris</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">travel</a>
                        <a href="#" class="post__meta--taglist_item">France</a>
                        <a href="#" class="post__meta--taglist_item">Paris</a>
                        <a href="#" class="post__meta--taglist_item">Christianity</a>
                        <a href="#" class="post__meta--taglist_item">spooky</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/day-of-the-dead.jpg" alt="day-of-the-dead" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Coolest festival in Mexico</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">Mexico</a>
                        <a href="#" class="post__meta--taglist_item">Day of the Dead</a>
                        <a href="#" class="post__meta--taglist_item">holiday</a>
                        <a href="#" class="post__meta--taglist_item">celebration</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/holi.png" alt="holi girl" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Found a girl at Holi celebration</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">India</a>
                        <a href="#" class="post__meta--taglist_item">Holi</a>
                        <a href="#" class="post__meta--taglist_item">colors</a>
                        <a href="#" class="post__meta--taglist_item">celebration</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/japan.jpg" alt="japan" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Hello, Japan</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">Japan</a>
                        <a href="#" class="post__meta--taglist_item">Shinto</a>
                        <a href="#" class="post__meta--taglist_item">Asia</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/pilgrimage.jpg" alt="mecca" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Pilgrimage to Mecca</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">equality</a>
                        <a href="#" class="post__meta--taglist_item">Islam</a>
                        <a href="#" class="post__meta--taglist_item">Saudi Arabia</a>
                        <a href="#" class="post__meta--taglist_item">Mecca</a>
                        <a href="#" class="post__meta--taglist_item">travel</a>
                        
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                <img src="/images/rumi.jpg" alt="rumi" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Poetry and Sufism</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">Rumi</a>
                        <a href="#" class="post__meta--taglist_item">poetry</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                <img src="/images/salsa.jpg" alt="salsa" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Salsa Dancing</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">Puerto Rico</a>
                        <a href="#" class="post__meta--taglist_item">salsa</a>
                        <a href="#" class="post__meta--taglist_item">dancing</a>
                        <a href="#" class="post__meta--taglist_item">celebration</a>
                        <a href="#" class="post__meta--taglist_item">festival</a>
                    </div>
                </div>
            </p>
        </article>
        <article class = "post">
            <p class="post__desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque et nesciunt, eligendi minima quidem hic ullam sunt
                consequuntur consectetur ipsa.
                <img src="/images/south-africa.jpg" alt="beaded bracelets" class="post__img"
                loading="lazy">
                <div class="post__meta">
                    <a href="#" class="post__meta--title">Gorgeous South African bracelets</a>
                    <div class="post__meta--taglist">
                        <a href="#" class="post__meta--taglist_item">South Africa</a>
                        <a href="#" class="post__meta--taglist_item">bracelets</a>
                    </div>
                </div>
            </p>
        </article>
    </div>
</section>`;

homePage.addEventListener('click', blogContent);
registerPage.addEventListener('click', registerContent);
loginPage.addEventListener('click', loginContent);
accountPage.addEventListener('click', accountContent);

function blogContent() {
    contentSection.innerHTML = searchView;
    const searchBox = document.querySelector('#blog-search');
    const tagList = document.querySelectorAll('.post__meta--taglist_item'); //objects
    
    searchBox.addEventListener('keyup', filterPosts);

    function filterPosts() {
        let filter = searchBox.value.toLowerCase();
        const posts = document.querySelectorAll('.post').forEach(p => {
            p.innerText.toLowerCase().indexOf(filter) > -1 
            ? p.style.display = "" 
            : p.style.display = 'none';
            });
    }

    tagList.forEach(tags => {
        tags.addEventListener('click', (t)=>{
            searchBox.value = t.explicitOriginalTarget.innerText; //setting search box's value equal to tag's text 
            if (searchBox.value) {
                filterPosts(); //call filter posts when search box has a value
            }
        });
    });
}

const path = window.location.pathname; //tells us which route we are at

switch(path) {
    case "/register":
        registerContent();
        break;
    case "/login":
        loginContent();
        break;
    case "/account":
        accountContent();
        break;
    default:
        blogContent();
}

let respData;
let loggedIn = false;

function registerContent() {
    contentSection.innerHTML = registerView;
    const form = contentSection.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        const resp = await fetch("/register", { //fetch call
            method:"POST",
            body:json, //passing form data as body of request
            headers: {'Content-Type': 'application/json'}
        });
        respData = await resp.json(); //only asking for json data on body of response
        if (resp.ok) {
            loginContent();
        }
    });
}

function loginContent() {
    if (loggedIn) {
        alert(`User is already logged in. Please log out on account page first.`);
    } else {
    contentSection.innerHTML = loginView;
    const form = contentSection.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        const resp = await fetch("/login", { //fetch call
            method:"POST",
            body:json, //passing form data as body of request
            headers: {'Content-Type': 'application/json'}
        });
       if (resp.status === 200) {
            respData = await resp.json();
       } else {
        alert("Invalid login. Please try again.");
        loginContent();
       }
        if (resp.ok) { 
            loggedIn = true;
            accountContent();
        }
    });
}
}

function accountContent() {
    if (!loggedIn){
        alert('Please log in before accessing the account page.');
    } else {
        contentSection.innerHTML = accountView;
   

    //respData is global variable of data from the server
    let currentUserId = respData._id; //getting the user id from respData (json) in order to uses it in delete fetch call

    const form = contentSection.querySelector("form");
    let firstNameField = contentSection.querySelector("#firstName");
    let lastNameField = contentSection.querySelector("#lastName");
    let userNameField = contentSection.querySelector("#userName");
    let passwordField = contentSection.querySelector("#psw");
    let deleteBtn = contentSection.querySelector("#delete");
    let logoutBtn = contentSection.querySelector("#logout");

    firstNameField.value = respData.firstname;
    lastNameField.value = respData.lastname;
    userNameField.value = respData.username;
    passwordField.value = respData.psw;


    form.addEventListener("submit", async (event) => { //here we add event listener for update button to submit new form data
        event.preventDefault();
        const formData = new FormData(form);
        var object = {id: currentUserId};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        const resp = await fetch("/account", { //fetch call
            method: "PUT",
            body: json, //passing form data as body of request
            headers: {'Content-Type': 'application/json'}
        });
        respData = await resp.json();
        if (resp.ok){
            alert("Your information was successfully updated!");
        }
    });

    logoutBtn.addEventListener("click", () => {
        loggedIn = false;
        respData, currentUserId = {}
        blogContent();
    });

    //add event listener for delete button that will fetch homepage once user is deleted. 
    deleteBtn.addEventListener("click", async() => {
        loggedIn = false;
        var jsonID={id: currentUserId}; 
        jsonID = JSON.stringify(jsonID);
        const resp = await fetch("/account", { //fetch call
            method:"DELETE",
            body: jsonID, //passing form data as body of request
            headers: {'Content-Type': 'application/json'}
        });
        respData = await resp.json();
        if (resp.ok) {
            alert("The account was successfully deleted.");
            blogContent();
        }
    });
}
}

//intersection observer - enables header background after user has scrolled past a specific point 
const observerCallback = (e) => {
    !(e[0].isIntersecting) ? mainNav.classList.add("applyBackground") :
    mainNav.classList.remove("applyBackground");
}
const observerOptions = {threshold : .4}

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(header);