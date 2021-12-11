self.addEventListener('install', function(event){
      // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
    self.skipWaiting();
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', event => {
  if(!event.request.url.includes("darrylmcoder-proxy/")) {
    return;
  }
  event.respondWith(async function() {
    return fetch(event.request)
    .then(response => {
      return response.text()
      .then(text => decrypt(text))
      .then(text => {
        return new Response("Response: " + text, 
        {
          status: 200,
          statusText: response.statusText,
          headers: response.headers
        });
      }).catch(e => {
        return new Response("Error: " + e);
      });
    })
    .catch(e => {
      return new Response("Error: " + e);
    });
  }());
});
    





function decrypt(crypted,key = "WERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890Q") {
        var alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
        var decrypted_str = "";
        var found = false;
        for(var i = 0; i < crypted.length; i++) {
          var crypted_val = crypted.charAt(i);
          for(var j = 0; j < key.length; j++){
            var key_val = key.charAt(j);
            var alpha_val = alpha.charAt(j);
            if(key_val == crypted_val) {
              decrypted_str += alpha_val;
              found = true;
            }
          }
          if(found != true) {
            decrypted_str += crypted_val;
          }
          found = false;
        }
        return decrypted_str;
      }