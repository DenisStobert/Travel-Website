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

document.addEventListener('DOMContentLoaded', function () {
  var mySwiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
  });
});
function initAutocomplete() {
  var fromInput = document.getElementById("fromAirport");
  var toInput = document.getElementById("toAirport");

  var options = {
    types: ["(airports)"],
    componentRestrictions: { country: "us" },
  };

  var autocompleteFrom = new google.maps.places.Autocomplete(
    fromInput,
    options
  );
  var autocompleteTo = new google.maps.places.Autocomplete(toInput, options);
}

// Load the script asynchronously
function loadGooglePlacesScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initAutocomplete";
  document.body.appendChild(script);
}

window.onload = loadGooglePlacesScript;
