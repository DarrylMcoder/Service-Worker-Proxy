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

self.addEventListener('fetch', function(event) {
  if(event.request.url.includes("/darrylmcoder-proxy/")){
    event.respondWith(handleRequest(event.request));
  }else{
    return;
  }
});
    
async function handleRequest(request) {
  const response = await fetch(await editRequest(request));
  return response;
}

async function editRequest(request) {
  var proxy = "./?url=";
  var url = await getRealUrl(request.url);
  var proxyUrl = proxy + url;
  if(true) {
    const newRequest = new Request(proxyUrl, {
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
  }else{
   
  }
}

async function getRealUrl(url) {
  const parts = url.split("/darrylmcoder-proxy/");
  return parts[1].trim();
}