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
  event.respondWith(async () => {
    fetch(event.request).then(response => {
      response.text().then(text => {
          return decrypt(text,"WERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890Q");
        }).then(text => {
          return new Response("Response: " + text,
          {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          }); 
        }).catch(e => {
      return new Response("Error: " + e);
        });
    }).catch(e => {
      return new Response("Error: " + e);
    });
  });
});
    









async function handleRequest(request) {
  try {
    var response = await fetch(await getRealUrl(request.url));
  return await editResponse(response);
  } catch(e) {
    return new Response("Error1: " + e);
  }
}

async function editRequest(request) {
  var proxy = self.scriptURL + "?url=";
  var url = await getRealUrl(request.url);
  var proxyUrl = proxy + url;
  if(true) {
    var newRequest = new Request(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      credentials: request.credentials,
      cache: request.cache,
      redirect: request.redirect,
      referrer: request.referrer,
      integrity: request.integrity
    });
    return newRequest;
  }
}

async function editResponse(response) {
  var data = decrypt(response.body,"WERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890Q");
  return new Response("Response6:" + data,{
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

async function getRealUrl(url) {
  const parts = url.split("/darrylmcoder-proxy/");
  return parts[1].trim();
}

function decrypt(crypted,key) {
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