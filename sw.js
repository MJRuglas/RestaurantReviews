const CACHE_NAME = 'index.html';
const URLs = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
	
];

console.log('Service Worker: Registered');

//Add event listener here to check when Service Worker is registered.
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(URLs);
		})
	);				  
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request)
		.then(function(response){
			if(response) {
				console.log('Found ', e.request, ' in cache');
				return response;
			} else {
			
			console.log('Could not find ', e.request, ' in cache, fetching!');
			return fetch(e.request)
				.then(function (response) {
				    const clonedResponse = response.clone();
					caches.open(CACHE_NAME).then(function(cache) {
						cache.put(e.request, clonedResponse);
					});
				
				     return response;
			})
								
				.catch(function(err) {
					console.log("error");
	             });
			}
		})
	);
});
		
