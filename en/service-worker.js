'use strict';
var regID ;
var API_KEY = "3003776fa8a9b6dcfca5b06dc40093dc75dbb2844dc5260c37c561bb5cf25b72"
var SECERT_KEY = "64475de13a7938de6ce054c0448e1d535b74a091a38a2857bf52916980644396"
if ('serviceWorker' in navigator) {
  var jsAddress = "chrome-worker.js"
  navigator.serviceWorker.register(jsAddress).then(function() {
   return navigator.serviceWorker.ready;
  }).then(function(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
	  regID = sub.endpoint
	   	var idD = regID.substring(regID.indexOf("d/")+1);
		regID =  idD.substring(idD.indexOf("/")+1);
		registerDeviceWithApp42(regID)		 
    });
  }).catch(function(error) {
    console.log('Service Worker error :', error);
  });
 
}


function registerDeviceWithApp42(token ){
	var pushNotificationService  = new App42Push();
	App42.initialize(API_KEY, SECERT_KEY);
	pushNotificationService.storeDeviceToken(App42.getLoggedInUser(),token,"CHROME",{  
		success: function(object) 
		{  
			//window.close();
		},
		error: function(error) {  
			//window.close();
		}  
	});  
}