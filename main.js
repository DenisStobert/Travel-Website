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
function handleSubscribe(e) {
  e.preventDefault(); // Prevents the form from submitting normally

  // Trigger SweetAlert
  Swal.fire({
    title: 'Thank you for subscribing!',
    text: 'You will now receive updates directly to your inbox.',
    icon: 'success',
    confirmButtonText: 'Close'
  }).then((result) => {
    if (result.isConfirmed) {
      // Optional: Handle further logic after the user clicks 'Close'
      // For example, you might want to actually submit the form programmatically here
      // or reset the form fields.
    }
  });
}
document.getElementById('tripType').addEventListener('click', function(event) {
  if (event.target.classList.contains('trip-option-form')) {
    // Remove active class from all options
    document.querySelectorAll('.trip-option-form').forEach(function(option) {
      option.classList.remove('active');
    });
    // Add active class to clicked option
    event.target.classList.add('active');
    // Optionally handle the value
    console.log("Selected Trip Type:", event.target.dataset.value);
    // If you need to use this value for further processing, you can set it on a hidden input or form data
  }
});
// Keep this structure. You won't need the 'description' property anymore since it's static.
const destinations = {
  turkey: {
    imageUrl: 'assets/trending-card-1.jpeg',
    name: 'Turkey',
    price: '$2325',
  },
  vietnam: {
    imageUrl: 'assets/trending-card-2.jpeg',
    name: 'Vietnam',
    price: '$1449',
  },
  carribean: {
    imageUrl: 'assets/trending-card-3.jpeg',
    name: 'Carribean',
    price: '$2165',
  },
  dubai: {
    imageUrl: 'assets/trending-card-4.jpeg',
    name: 'Dubai',
    price: '$2775',
  },
  singapore: {
    imageUrl: 'assets/trending-card-5.jpeg',
    name: 'Singapore',
    price: '$2959',
  },
  tokyo: {
    imageUrl: 'assets/trending-card-6.jpeg',
    name: 'Tokyo',
    price: '$2899',
  },
  japan: {
    imageUrl: 'assets/trending-card-8.jpeg',
    name: 'Japan',
    price: '$1535',
  },
  delhi: {
    imageUrl: 'assets/trending-card-7.jpeg',
    name: 'Delhi',
    price: '$1909',
  },
  frankfurt: {
    imageUrl: 'assets/trending-card-9.jpeg',
    name: 'Frankfurt',
    price: '$1039',
  },
  amsterdam: {
    imageUrl: 'assets/trending-card-10.jpeg',
    name: 'Amsterdam',
    price: '$1635',
  },
  sydney: {
    imageUrl: 'assets/trending-card-11.jpeg',
    name: 'Sydney',
    price: '$2899',
  },
  cairo: {
    imageUrl: 'assets/trending-card-12.jpg',
    name: 'Cairo',
    price: '$2325',
  },
};

// Get the modal
var modal = document.getElementById('myModal');

// Get all elements with the class 'trending__card'
var cards = document.getElementsByClassName('trending__card');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// Function to populate and open modal
var openModal = function() {
  var destinationId = this.getAttribute('data-destination');
  var data = destinations[destinationId];

  var modalLeft = document.querySelector('.modal-left');
  modalLeft.style.backgroundImage = `url(${data.imageUrl})`; // Make sure URLs are correct

  document.getElementById('modalDestinationName').innerText = `Fly to ${data.name} in Business Class up to 77% OFF`;
  document.getElementById('modalPrice').innerText = `From ${data.price} Round-trip, Total`;

  modal.style.display = 'block'; // This should only be called here
};

// Function to close modal
var closeModal = function() {
  modal.style.display = 'none';
};

// Attach openModal function to click event of each card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', openModal);
}

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};


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