/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navbar = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// get the active section
function activeSection() {
    topSection = sections[0];
    min = 1000000;
    for (section of sections) {
        let bounding = section.getBoundingClientRect();
        if (bounding.top > -500 & bounding.top < min) {
            min = bounding.top;
            topSection = section;
        };
    };
    return topSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav(){
    let numOfSections = document.getElementById('myMain'); 
    for (let i=1; i < numOfSections.children.length; i++){
        let ul = document.getElementById("navbar__list");
        let li = document.createElement('li');
        let atag = document.createElement('a');
        li.setAttribute("id", `section${i}nav`);
        atag.setAttribute("href", "#")
        atag.textContent = "section"+i;
        li.appendChild(atag);
        ul.appendChild(li);
    }

}


// Add class 'active' to section when near top of viewport

function active(){
    window.addEventListener('scroll', function (){
        let section = activeSection();
        let navsections = document.getElementsByTagName('li');
        let navsection = document.getElementById(`${section.id}nav`);
        section.classList.add('active-class-section');
        navsection.classList.add('active-class-nav');
        for (let navitem of navsections) {
            if(navitem.id != navsection.id){
                navitem.classList.remove('active-class-nav');
            }
        }
        for (let sectionitem of sections) {
            if(sectionitem.id != section.id){
                sectionitem.classList.remove('active-class-section');
            }
        }
    });
}


// Scroll to anchor ID using scrollTO event (from navbar to section)

function scrollOnClick() {
    navbar.addEventListener('click', function (event) {
        event.preventDefault();
        idOfSection = event.target.innerText;
        let click = document.getElementById(idOfSection);

        let yPos = click.getBoundingClientRect().top + document.documentElement.scrollTop;

        window.scrollTo({
            top: yPos,
            behavior: 'smooth',
        });


    });
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

buildNav();

// Scroll to section on link click

scrollOnClick();

// Set sections as active

active();