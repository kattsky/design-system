// Pagination

// Get all category__list-item
const categoryListItems = document.querySelectorAll('.c-category__list-item');
// Get all category__info-wrapper
const categoryInfoWrappers = document.querySelectorAll('.c-category__info-wrapper');

function handleClick(index) {
    // Hide all category info wrappers
    for (let i = 0; i < categoryInfoWrappers.length; i++) {
        // Set the display style property of each category__info-wrapper to 'none' to hide them
        categoryInfoWrappers[i].style.display = 'none';
    }

    // Display only the corresponding category__info-wrapper based on the clicked category__list-item
    categoryInfoWrappers[index].style.display = 'flex';

    // Remove active class from all category__list-item
    for (let i = 0; i < categoryListItems.length; i++) {
        categoryListItems[i].classList.remove('c-category__list-item--active');
    }
    // Add active class to the clicked category__list-item
    categoryListItems[index].classList.add('c-category__list-item--active');
}

// Add a click event listener to each category__list-item
// When clicked, calls the handleClick function with the index of the clicked item
for (let i = 0; i < categoryListItems.length; i++) {
    categoryListItems[i].addEventListener('click', function() {
        handleClick(i);
    });
}

// Set initial state: hide all category__info-wrapper elements except the first one
for (let i = 1; i < categoryInfoWrappers.length; i++) {
  categoryInfoWrappers[i].style.display = 'none';
}


// Accordion applied to Seasonal Delights section

// Get all accordion headers
const accordionHeaders = document.querySelectorAll('.c-seasonal__accordion-header');

// Loop through each accordion header and attach click event listener
for (let i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].addEventListener('click', function() {
        // Get the next sibling element, which is the accordion body
        const accordionBody = this.nextElementSibling;

        // Toggle the 'active' class to show/hide the accordion body
        accordionBody.classList.toggle('c-seasonal__accordion-body--active');
    });
}



// Breadcrumbs

// Function to update breadcrumbs
function updateBreadcrumbs(pageTitle, pageURL) {
  // Retrieve breadcrumb list from localStorage or initialize an empty array
  let breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')) || [];

  // Add the new breadcrumb item
  breadcrumbs.push({ title: pageTitle, url: pageURL });

  // Save the updated breadcrumbs back to localStorage
  localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
}

// Function to load breadcrumbs on page load
function loadBreadcrumbs() {
  // Retrieve breadcrumb list from localStorage
  const breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));

  if (breadcrumbs) {
    // Select the breadcrumb list element
    const breadcrumbList = document.getElementById('breadcrumb-list');

    // Clear existing breadcrumbs
    breadcrumbList.innerHTML = '';

    // Get the start index for displaying the last five breadcrumbs
    const startIndex = Math.max(breadcrumbs.length - 5, 0);

    // Get the last five breadcrumbs
    const lastFiveBreadcrumbs = breadcrumbs.slice(startIndex);

    // Iterate over the last five breadcrumbs and add them to the breadcrumb list
    lastFiveBreadcrumbs.forEach(crumb => {
      const breadcrumbItem = document.createElement('li');
      breadcrumbItem.classList.add('c-top-nav__breadcrumb-item');
      breadcrumbItem.innerHTML = `<a class="u-navlinks c-top-nav__breadcrumb-link" href="${crumb.url}">${crumb.title}</a>`;
      breadcrumbList.appendChild(breadcrumbItem);
    });
  }
}

// Add event listener to sidebar menu items
const sidebarMenuItems = document.querySelectorAll('.c-sidebar__list-item a');
for (let i = 0; i < sidebarMenuItems.length; i++) {
  const item = sidebarMenuItems[i];
  item.addEventListener('click', function(event) {
    // Prevent default link behavior
    event.preventDefault();

    // Retrieve page title and URL from clicked menu item
    const pageTitle = item.textContent.trim();
    const pageURL = item.getAttribute('href');

    // Update breadcrumbs
    updateBreadcrumbs(pageTitle, pageURL);

    // Navigate to the clicked page
    window.location.href = pageURL;
  });
}

// Load breadcrumbs on page load
window.addEventListener('DOMContentLoaded', loadBreadcrumbs);



// Carousel - coded with https://codepen.io/ecemgo/pen/WNappPz and ChatGPT

document.addEventListener("DOMContentLoaded", function() {
    // select all elements with the classes below
    const slides = document.querySelectorAll(".c-testimonials__content-slide");
    const pageDots = document.querySelectorAll(".c-testimonials__page");
    //  initialise a variable currentIndex to keep track of the index of the current slide
    let currentIndex = 0;
  
    // Define a function that takes an index parameter
    // responsible for showing the slide at the specified index and updating the page indicators accordingly
    function showSlide(index) {
        // iterates over all slides
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (i === index) {
          slide.classList.add("c-testimonials__content-slide--active");
          slide.classList.remove("c-testimonials__content-slide--off-screen");
        } else {
          slide.classList.remove("c-testimonials__content-slide--active");
          slide.classList.add("c-testimonials__content-slide--off-screen");
        }
      }
    //   iterates over all page-indicators
      for (let i = 0; i < pageDots.length; i++) {
        const indicator = pageDots[i];
        indicator.classList.toggle("c-testimonials__page--active", i === index);
      }
    }
    // Increments the currentIndex by 1 and ensures it loops back to 0 when it reaches the end of the slides
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);  // calls the showSlide function to display the next slide
    }
    // decrements the currentIndex by 1 and ensures it loops back to the last slide index when it reaches the beginning
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex); // calls the showSlide function to display the previous slide
    }
  
    // Add event listeners for left and right arrow clicks
    // When clicked, they call the prevSlide and nextSlide functions, respectively
    document.querySelector(".c-testimonials__left-arrow-wrap").addEventListener("click", prevSlide);
    document.querySelector(".c-testimonials__right-arrow-wrap").addEventListener("click", nextSlide);

    // Add event listeners for pagination clicks
    // iterates over each element in the pageDots
    // an event listener is added for the click event
    // the corresponding index `i` that is passed to `showSlide` will display the corresponding slide  
    for (let i = 0; i < pageDots.length; i++) {
        pageDots[i].addEventListener("click", function() {
        showSlide(i);
        });
    }
  

    // Initial setup
    // display the first slide when the page loads
    showSlide(currentIndex);
  });
  