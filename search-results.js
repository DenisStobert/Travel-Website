document.getElementById("phone-input").addEventListener("input", function (e) {
  var x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : `${x[1]} ${x[2]}${x[3] ? " " + x[3] : ""}`;
});
function startTimer(duration, display) {
  var timer = duration,
    hours,
    minutes,
    seconds;
  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + "h :" + minutes + "min";

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
document.addEventListener('DOMContentLoaded', function() {
  // Function to generate random additional price
  function getRandomAdditionalPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Get all price elements
  const priceElements = document.querySelectorAll('.airline-price');

  // Update each price element with a random additional price
  priceElements.forEach(priceElement => {
    const basePrice = parseInt(priceElement.getAttribute('data-base-price'), 10);
    const additionalPrice = getRandomAdditionalPrice(100, 1000);
    const newPrice = basePrice + additionalPrice;
    priceElement.textContent = `$${newPrice.toFixed(2)}*`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const fromAirport = params.get("fromAirport");
  const toAirport = params.get("toAirport");
  const departureDate = params.get("departureDate");
  const returnDate = params.get("returnDate");
  const tripType = params.get("tripType"); // 'Round-Trip' or 'One-Way'
  const passengers = params.get("passengers"); // Number of passengers

  // Set text in inputs or placeholders
  if (fromAirport && toAirport) {
    document.getElementById("from").placeholder = fromAirport;
    document.getElementById("to").placeholder = toAirport;
    document.querySelector(
      ".price-content h1"
    ).textContent = `${fromAirport} → ${toAirport}`;
  }
  // Dynamically set the destination in the "OTHER DEALS TO" header
  if (toAirport) {
    document.getElementById("destination-city").textContent = toAirport;
  }
  // Set dates in date inputs
  document.getElementById("departure").value = departureDate || "";
  const returnInput = document.getElementById("return");
  returnInput.value = returnDate || "";
  if (!returnDate || tripType === "One-Way") {
    returnInput.disabled = true;
    returnInput.style.backgroundColor = "rgba(0,0,0,0.1)";
    returnInput.placeholder = "";
  } else {
    returnInput.disabled = false;
    returnInput.style.backgroundColor = "";
    returnInput.placeholder = "mm/dd/yyyy";
  }

  // Update the display and active selection for trip type and passengers
  updateDropdown(".dropdown:nth-child(1)", tripType.replace("-", " ")); // Adjust if tripType has hyphen
  updateDropdown(
    ".dropdown:nth-child(2)",
    passengers > 6
      ? "6+ Passengers"
      : `${passengers} Passenger${passengers > 1 ? "s" : ""}`
  );
});

// Handles updating dropdown selected text and active states
function updateDropdown(dropdownSelector, value) {
  const dropdown = document.querySelector(dropdownSelector);
  const selected = dropdown.querySelector(".selected");
  const items = dropdown.querySelectorAll("li");

  selected.textContent = value; // Update the visible selected display
  items.forEach((item) => {
    item.classList.remove("active"); // Remove active from all first
    if (item.textContent === value) {
      item.classList.add("active"); // Set active where text matches
    }
  });
}

// To handle dropdown interactions
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = menu.querySelectorAll("li");
  const selected = select.querySelector(".selected");

  select.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents the document event from firing when clicking the select
    const isCurrentlyOpen = menu.classList.contains("menu-open");
    closeAllDropdowns(); // Close all dropdowns first
    if (!isCurrentlyOpen) {
      menu.classList.add("menu-open"); // Only open the menu if it was not already open
      caret.classList.add("caret-rotate");
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      closeAllDropdowns(); // Close dropdown after selection
      if (selected.innerText === "One Way") {
        document.getElementById("return").disabled = true;
        document.getElementById("return").style.backgroundColor =
          "rgba(0,0,0,0.1)";
        document.getElementById("return").value = "";
        document.getElementById("return").placeholder = "";
      } else {
        document.getElementById("return").disabled = false;
        document.getElementById("return").style.backgroundColor = "";
        document.getElementById("return").placeholder = "mm/dd/yyyy";
      }
    });
  });
});

// Function to close all dropdowns
function closeAllDropdowns() {
  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".menu");
    const caret = dropdown.querySelector(".caret");
    menu.classList.remove("menu-open");
    caret.classList.remove("caret-rotate");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any actions on load
  document
    .getElementById("submitQuoteButton")
    .addEventListener("click", submitQuote);
});
function submitQuote() {
  const inputs = document.querySelectorAll("input[required]:not(:disabled)"); // Only consider enabled inputs
  let allFieldsFilled = true;
  let validationMessage = "Please fill in this field.";

  // Remove existing error messages
  document.querySelectorAll(".error-message").forEach((element) => {
    element.parentNode.removeChild(element);
  });

  // Determine the trip type
  const tripType = document.querySelector(".selected").textContent.trim();

  inputs.forEach((input) => {
    // Reset previous styles
    input.style.borderColor = "";
    input.classList.remove("error");

    // Autofill 'from' and 'to' if empty using their placeholders
    if ((input.id === "from" || input.id === "to") && !input.value) {
      input.value = input.placeholder;
    }

    // Check if required fields are filled, exempting the return date for 'One Way' trips
    if (!input.value && !(input.id === "return" && tripType === "One Way")) {
      input.style.borderColor = "red";
      input.classList.add("error");
      allFieldsFilled = false;

      // Add error message below input
      const errorMessage = document.createElement("div");
      errorMessage.textContent = validationMessage;
      errorMessage.classList.add("error-message");
      errorMessage.style.color = "red";
      input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
  });

  if (allFieldsFilled) {
    Swal.fire({
      title: "Success!",
      text: "A travel advisor will contact you soon.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      // Optionally submit the form here if needed
    });
  }
}

window.onload = function () {
  var timeInSeconds = 17 * 3600 + 32 * 60; // 17 hours and 32 minutes in seconds
  var display = document.querySelector("#timer");
  startTimer(timeInSeconds, display);
};
document.addEventListener("DOMContentLoaded", function () {
  // Get all select elements within .third containers
  const selects = document.querySelectorAll(".flight-details .third select");

  // Add event listeners to each select element
  selects.forEach((select) => {
    select.addEventListener("focus", () => {
      select.parentNode.classList.add("focused");
    });
    select.addEventListener("blur", () => {
      select.parentNode.classList.remove("focused");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const navbar1 = document.querySelector(".main-nav");
  window.addEventListener("scroll", function () {
    // Check if page is scrolled more than 50 pixels
    if (window.scrollY > 50) {
      navbar1.classList.add("scrolled");
    } else {
      navbar1.classList.remove("scrolled");
    }
  });
});
// Disable scrolling on the body and any other scrollable elements
function disableScroll() {
  document.body.style.overflow = "hidden";
  // Add similar lines for other scrollable elements if necessary
  // document.querySelector('.scrollable-element').style.overflow = 'hidden';
}

// Enable scrolling on the body and any other scrollable elements
function enableScroll() {
  document.documentElement.style.overflow = "auto"; // for the html element
  document.body.style.overflow = "auto";
}
// Call disableScroll as soon as possible
disableScroll();
window.addEventListener("load", function () {
  setTimeout(() => {
    // Wait for 2 seconds after the page has loaded
    const loader = document.querySelector(".loader-wrapper");
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
      enableScroll();
    }, 1000); // Additional time for the fade-out transition
  }, 1000); // Minimum display time for the loader
});
function handleSubscribe(e) {
  e.preventDefault(); // Prevents the form from submitting normally

  // Trigger SweetAlert
  Swal.fire({
    title: "Thank you for subscribing!",
    text: "You will now receive updates directly to your inbox.",
    icon: "success",
    confirmButtonText: "Close",
  }).then((result) => {
    if (result.isConfirmed) {
      // Optional: Handle further logic after the user clicks 'Close'
      // For example, you might want to actually submit the form programmatically here
      // or reset the form fields.
    }
  });
}
document.getElementById("tripType").addEventListener("click", function (event) {
  if (event.target.classList.contains("trip-option-form")) {
    // Remove active class from all options
    document.querySelectorAll(".trip-option-form").forEach(function (option) {
      option.classList.remove("active");
    });
    // Add active class to clicked option
    event.target.classList.add("active");
    // Optionally handle the value
    console.log("Selected Trip Type:", event.target.dataset.value);
    // If you need to use this value for further processing, you can set it on a hidden input or form data
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var menuIcon = document.querySelector(".menu-icon a");
  var navLinks = document.querySelectorAll(".nav__links a");
  var navLinksContainer = document.querySelector(".nav__links");
  var navContact = document.querySelector(".nav__contact");
  var navLogo = document.querySelector(".nav__logo");
  var navLogoMobile = document.querySelector(".nav__logo-mobile");

  // Function to toggle the mobile navigation
  function toggleMenu() {
    if (navLinksContainer.style.transform === "translateY(0%)") {
      navLinksContainer.style.transform = "translateY(-100%)"; // Hide it
      navContact.style.display = "none"; // Hide nav contact
      navLogoMobile.style.display = "none"; // Hide mobile logo
      navLogo.style.opacity = "1";
      document.body.style.overflow = "auto"; // Allow scrolling on the body
    } else {
      navLinksContainer.style.transform = "translateY(0%)"; // Show it
      navContact.style.display = "block"; // Show nav contact
      navLogoMobile.style.display = "block"; // Show mobile logo
      navLogo.style.opacity = "0";
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
    }
  }

  // Function to set active class on clicked link and handle navigation
  function handleNavLinkClick(event) {
    // Remove 'active' class from all links
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add 'active' class to clicked link
    this.classList.add("active");

    // Navigate to the section linked by the anchor
    const hash = this.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // Offset by header height
        behavior: "smooth",
      });
    }

    // If in mobile view and menu is open, toggle the menu closed
    if (
      window.innerWidth <= 600 &&
      navLinksContainer.style.transform === "translateY(0%)"
    ) {
      toggleMenu();
    }
  }

  // Attach event listeners
  menuIcon.addEventListener("click", toggleMenu);
  navLinks.forEach((link) =>
    link.addEventListener("click", handleNavLinkClick)
  );
});

// Keep this structure. You won't need the 'description' property anymore since it's static.
const destinations = {
  turkey: {
    imageUrl: "assets/trending-card-1.jpeg",
    name: "Turkey",
    price: "$2325",
  },
  vietnam: {
    imageUrl: "assets/trending-card-2.jpeg",
    name: "Vietnam",
    price: "$1449",
  },
  carribean: {
    imageUrl: "assets/trending-card-3.jpeg",
    name: "Carribean",
    price: "$2165",
  },
  dubai: {
    imageUrl: "assets/trending-card-4.jpeg",
    name: "Dubai",
    price: "$2775",
  },
  singapore: {
    imageUrl: "assets/trending-card-5.jpeg",
    name: "Singapore",
    price: "$2959",
  },
  tokyo: {
    imageUrl: "assets/trending-card-6.jpeg",
    name: "Tokyo",
    price: "$2899",
  },
  japan: {
    imageUrl: "assets/trending-card-8.jpeg",
    name: "Japan",
    price: "$1535",
  },
  delhi: {
    imageUrl: "assets/trending-card-7.jpeg",
    name: "Delhi",
    price: "$1909",
  },
  frankfurt: {
    imageUrl: "assets/trending-card-9.jpeg",
    name: "Frankfurt",
    price: "$1039",
  },
  amsterdam: {
    imageUrl: "assets/trending-card-10.jpeg",
    name: "Amsterdam",
    price: "$1635",
  },
  sydney: {
    imageUrl: "assets/trending-card-11.jpeg",
    name: "Sydney",
    price: "$2899",
  },
  cairo: {
    imageUrl: "assets/trending-card-12.jpg",
    name: "Cairo",
    price: "$2325",
  },
};

// Get the modal
var modal = document.getElementById("myModal");

// Get all elements with the class 'trending__card'
var cards = document.getElementsByClassName("trending__card");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to populate and open modal
var openModal = function () {
  var destinationId = this.getAttribute("data-destination");
  var data = destinations[destinationId];

  var modalLeft = document.querySelector(".modal-left");
  modalLeft.style.backgroundImage = `url(${data.imageUrl})`; // Make sure URLs are correct

  document.getElementById(
    "modalDestinationName"
  ).innerText = `Fly to ${data.name} in Business Class up to 77% OFF`;
  document.getElementById("modalPrice").innerText = `${data.price}`;

  modal.style.display = "block"; // This should only be called here
  document.body.classList.add("no-scroll");
};

// Function to close modal
var closeModal = function () {
  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
};

// Attach openModal function to click event of each card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", openModal);
}

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
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

document.addEventListener("DOMContentLoaded", function () {
  // Access the 'From' input
  var inputFrom = document.getElementById("from");
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, {
    types: ["(cities)"], // Suggests cities from all over the world
  });

  // Listen for when a place is selected from the 'From' input
  autocompleteFrom.addListener("place_changed", function () {
    var place = autocompleteFrom.getPlace();
    console.log("Place from:", place); // Example action: logging the selected place
  });

  // Access the 'To' input
  var inputTo = document.getElementById("to");
  var autocompleteTo = new google.maps.places.Autocomplete(inputTo, {
    types: ["(cities)"], // Suggests cities from all over the world
  });

  // Listen for when a place is selected from the 'To' input
  autocompleteTo.addListener("place_changed", function () {
    var place = autocompleteTo.getPlace();
    console.log("Place to:", place); // Example action: logging the selected place
  });
});
document.getElementById("roundTrip").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("oneWay").classList.remove("active");
  document.getElementById("returnDate").disabled = false;
});

document.getElementById("oneWay").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("roundTrip").classList.remove("active");
  document.getElementById("returnDate").disabled = true;
});

// Initialize as round trip
document.getElementById("returnDate").disabled = false;
document.addEventListener("DOMContentLoaded", function () {
  var departureInput = document.getElementById("departureDate");
  var returnInput = document.getElementById("returnDate");
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // JavaScript months are 0-based.
  var year = today.getFullYear();

  // Ensuring two digits for day and month
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  var todayFormatted = `${year}-${month}-${day}`;
  departureInput.setAttribute("min", todayFormatted);
  returnInput.setAttribute("min", todayFormatted);
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

ScrollReveal().reveal(".step", {
  ...scrollRevealOption,
  interval: 300,
});
ScrollReveal().reveal(".line img", {
  ...scrollRevealOption,
  delay: 1000, // Delay line images more than the steps
  interval: 300,
});
