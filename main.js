// Disable scrolling on the body and any other scrollable elements
function disableScroll() {
  document.body.style.overflow = 'hidden';
  // Add similar lines for other scrollable elements if necessary
  // document.querySelector('.scrollable-element').style.overflow = 'hidden';
}

// Enable scrolling on the body and any other scrollable elements
function enableScroll() {
  document.documentElement.style.overflow = 'auto'; // for the html element
  document.body.style.overflow = 'auto';
}
// Call disableScroll as soon as possible
disableScroll();
window.addEventListener('load', function() {
  setTimeout(() => { // Wait for 2 seconds after the page has loaded
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = 'none';
      enableScroll();
    }, 1000); // Additional time for the fade-out transition
  }, 1000); // Minimum display time for the loader
});

document.addEventListener('DOMContentLoaded', function () {
    // Access the 'From' input
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, {
        types: ['(cities)'] // Suggests cities from all over the world
    });

    // Listen for when a place is selected from the 'From' input
    autocompleteFrom.addListener('place_changed', function () {
        var place = autocompleteFrom.getPlace();
        console.log('Place from:', place); // Example action: logging the selected place
    });

    // Access the 'To' input
    var inputTo = document.getElementById('to');
    var autocompleteTo = new google.maps.places.Autocomplete(inputTo, {
        types: ['(cities)'] // Suggests cities from all over the world
    });

    // Listen for when a place is selected from the 'To' input
    autocompleteTo.addListener('place_changed', function () {
        var place = autocompleteTo.getPlace();
        console.log('Place to:', place); // Example action: logging the selected place
    });
});
document.getElementById('roundTrip').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('oneWay').classList.remove('active');
  document.getElementById('returnDate').disabled = false;
});

document.getElementById('oneWay').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('roundTrip').classList.remove('active');
  document.getElementById('returnDate').disabled = true;
});

// Initialize as round trip
document.getElementById('returnDate').disabled = false;
document.addEventListener('DOMContentLoaded', function () {
  var departureInput = document.getElementById('departureDate');
  var returnInput = document.getElementById('returnDate');
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // JavaScript months are 0-based.
  var year = today.getFullYear();
  
  // Ensuring two digits for day and month
  if(day < 10) day = '0' + day;
  if(month < 10) month = '0' + month;
  
  var todayFormatted = `${year}-${month}-${day}`;
  departureInput.setAttribute('min', todayFormatted);
  returnInput.setAttribute('min', todayFormatted);
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__form", {
  ...scrollRevealOption,
  delay: 500,
});

// trending container
/*ScrollReveal().reveal(".trending__card", {
  ...scrollRevealOption,
  interval: 500,
});*/

// destination container
ScrollReveal().reveal(".destination__card", {
  duration: 1000,
  interval: 500,
});

// seller container
ScrollReveal().reveal(".seller__card", {
  ...scrollRevealOption,
  interval: 500,
});

// guide container
ScrollReveal().reveal(".guide__card", {
  ...scrollRevealOption,
  interval: 500,
});

//  client container
ScrollReveal().reveal(".client__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal('.step', {
  ...scrollRevealOption,
  interval: 300
});
ScrollReveal().reveal('.line img', {
  ...scrollRevealOption,
  delay: 1000, // Delay line images more than the steps
  interval: 300
});

var swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
      delay: 5000,  // 5000 milliseconds = 5 seconds
      disableOnInteraction: false,  // Continue autoplay when the swiper is interacted with (swipe, navigation buttons, etc.)
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});

