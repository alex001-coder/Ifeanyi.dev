// script.js - Ifeanyi Williams Eze Portfolio
// This file handles all the interactive parts of the website


// ---- MOBILE MENU ----
// this function opens and closes the nav menu on mobile
function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  menu.classList.toggle("open");
}


// ---- NAVBAR BACKGROUND ON SCROLL ----
// when user scrolls down, the navbar gets a darker background
window.onscroll = function() {
  var navbar = document.getElementById("navbar");
  var backBtn = document.getElementById("back-top");

  // add scrolled class after 50px
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // show back to top button after 400px
  if (window.scrollY > 400) {
    backBtn.style.display = "flex";
    backBtn.style.alignItems = "center";
    backBtn.style.justifyContent = "center";
  } else {
    backBtn.style.display = "none";
  }

  // check if skill bars are visible and animate them
  animateBars();
};


// ---- BACK TO TOP ----
// scrolls back to the top when the button is clicked
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ---- TYPEWRITER EFFECT ----
// types out different job titles in the hero section

var titles = ["Intern", "Tech Enthusiast", "Problem Solver", "Lifelong Learner"];
var titleIndex = 0;    // which title we are on
var charIndex = 0;     // how many characters we have typed
var isDeleting = false;

function typeWriter() {
  var currentTitle = titles[titleIndex];
  var el = document.getElementById("typewriter");

  if (isDeleting) {
    // remove one character
    el.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // add one character
    el.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  var speed = 100;

  // if we finished typing, wait then start deleting
  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true;
    speed = 1500; // pause before deleting
  }

  // if we finished deleting, move to next title
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = titleIndex + 1;

    // go back to first title if we reached the end
    if (titleIndex === titles.length) {
      titleIndex = 0;
    }

    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

// start the typewriter when the page loads
typeWriter();


// ---- SKILL BARS ANIMATION ----
// checks if the skills section is on screen and fills the bars

var barsAnimated = false; // this makes sure bars only animate once

function animateBars() {
  if (barsAnimated) return; // stop if already done

  var skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  // get how far the skills section is from the top
  var sectionTop = skillsSection.getBoundingClientRect().top;

  // if the section is visible in the window
  if (sectionTop < window.innerHeight - 100) {
    var bars = document.querySelectorAll(".bar-fill");

    for (var i = 0; i < bars.length; i++) {
      var targetWidth = bars[i].getAttribute("data-width");
      bars[i].style.width = targetWidth + "%";
    }

    barsAnimated = true; // mark as done so it doesn't run again
  }
}


// ---- CONTACT FORM VALIDATION ----
// checks that all fields are filled in before sending

function validateForm(event) {
  event.preventDefault(); // stop the form from actually submitting

  var name    = document.getElementById("name").value.trim();
  var email   = document.getElementById("email").value.trim();
  var subject = document.getElementById("subject").value.trim();
  var message = document.getElementById("message").value.trim();

  // clear any old error messages first
  document.getElementById("name-error").textContent    = "";
  document.getElementById("email-error").textContent   = "";
  document.getElementById("subject-error").textContent = "";
  document.getElementById("message-error").textContent = "";

  var hasError = false;

  // check if name is empty
  if (name === "") {
    document.getElementById("name-error").textContent = "Please enter your name.";
    hasError = true;
  }

  // check if email is empty or looks wrong
  if (email === "") {
    document.getElementById("email-error").textContent = "Please enter your email.";
    hasError = true;
  } else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    hasError = true;
  }

  // check if subject is empty
  if (subject === "") {
    document.getElementById("subject-error").textContent = "Please enter a subject.";
    hasError = true;
  }

  // check if message is empty
  if (message === "") {
    document.getElementById("message-error").textContent = "Please write your message.";
    hasError = true;
  }

  // if no errors, show the success message and clear the form
  if (!hasError) {
    document.getElementById("contact-form").reset();
    document.getElementById("success-msg").style.display = "block";

    // hide the success message after 5 seconds
    setTimeout(function() {
      document.getElementById("success-msg").style.display = "none";
    }, 5000);
  }
}


// ---- FOOTER YEAR ----
// sets the current year in the footer automatically
document.getElementById("year").textContent = new Date().getFullYear();
