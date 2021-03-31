const cacheData = ["index.html", "index.css"];
const cacheVersion = "v3";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      return cache.addAll(cacheData);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker actived");
  console.log("Cleaning cache");
  event.waitUntil(
    caches.keys().then((cacheList) => {
      return cacheList.map((cache) => {
        if (!cache.includes(cacheVersion)) {
          console.log("delete cache:" + cache);
          return caches.delete(cache);
        }
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service worker: Fetching");
  let requestClone = event.request.clone();
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        let responseClone = response.clone();

        caches.open(cacheVersion).then((cache) => {
          // cache.put(event.request, responseClone);
          cache.put(requestClone, responseClone);
        });

        return response;
      });
    })
  );
});
