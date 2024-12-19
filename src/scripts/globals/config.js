const CONFIG = {
  KEY: 'TESTING',
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  BASE_IMAGE_URL: (id) =>
    `https://restaurant-api.dicoding.dev/images/large/${id}`,
  DATABASE_NAME: 'restaurant_catalouge-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurant',
  CACHE_NAME: new Date().toISOString()
};

export default CONFIG;
