import 'regenerator-runtime';
import '../styles/main.scss';
import '../styles/responsive.css';

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.toggle-button');
  const navbarLinks = document.querySelector('.navbar-links');
  const restaurantsContainer = document.getElementById('restaurants');
  const searchInput = document.querySelector('#search-input');
  const searchButton = document.querySelector('.search-btn');

  let allRestaurants = [];

  // Display restaurants function
  function displayRestaurants(restaurants) {
    restaurantsContainer.innerHTML = '';
    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<p>No restaurants found</p>';
    } else {
      restaurants.forEach((restaurant) => {
        const restaurantItem = `
  <div class="restaurant-item" tabindex="0" 
      aria-label="Restaurant Card: ${restaurant.name}, located in ${restaurant.city} 
      with rating ${restaurant.rating}">
      <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" 
           alt="Gambar restoran ${restaurant.name}" tabindex="0">
      <div class="rating" tabindex="0">
          <p><strong>Rating: ⭐</strong> ${restaurant.rating}</p>
          <i class="fas fa-heart" aria-label="Mark ${restaurant.name} as favorite" tabindex="0"></i>
      </div>
      <h3 tabindex="0">${restaurant.name}</h3>
      <p class="city" tabindex="0">City: ${restaurant.city}</p>
      <p class="description" tabindex="0">
        ${restaurant.description.substring(0, 200)}...
      </p>
  </div>
`;

        restaurantsContainer.innerHTML += restaurantItem;
      });
    }
  }

  // Fetch data from the Dicoding Restaurant API
  const BASE_URL = 'https://restaurant-api.dicoding.dev';

  async function fetchRestaurants() {
    try {
      const response = await fetch(`${BASE_URL}/list`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      allRestaurants = data.restaurants;
      displayRestaurants(allRestaurants);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      restaurantsContainer.innerHTML = '<p>Error loading restaurants. Please try again later.</p>';
    }
  }

  // Filter restaurants by city
  function filterRestaurantsByCity(city) {
    let filteredRestaurants;
    if (city.toLowerCase() === 'all') {
      filteredRestaurants = allRestaurants;
    } else {
      filteredRestaurants = allRestaurants.filter((restaurant) => restaurant.city.toLowerCase()
        .includes(city.toLowerCase()));
    }
    displayRestaurants(filteredRestaurants);
  }

  // Search button event listener
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      filterRestaurantsByCity(query);
    } else {
      displayRestaurants(allRestaurants);
    }
  });

  // Search input enter key event listener
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        filterRestaurantsByCity(query);
      } else {
        displayRestaurants(allRestaurants);
      }
    }
  });

  // Navbar toggle button events
  toggleButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navbarLinks.classList.toggle('active');
      event.preventDefault();
    }
  });

  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    const isClickInside = navbarLinks.contains(event.target) || toggleButton.contains(event.target);
    if (!isClickInside) {
      navbarLinks.classList.remove('active');
    }
  });

  // Load restaurants on page load
  fetchRestaurants();
});
