var cookieToListenTo = "svd-mc";
var domain = "svd.se";
var numArticles = 4; //number of articles before warning that free articles are soon used up. (6 articles are free) 

function removeCookies() {	
	chrome.cookies.getAll({domain: domain}, function(cookies) {
		
		var iterate = $.each(cookies, function(index,cookie){			
			chrome.cookies.remove({url: "https://www.svd.se", name: cookie.name}, function(result) {
				
			});		
		});
		
		$.when(iterate).then(function(){
			updateBadgeCounter();
		}, function(){console.log("Error removing cookies")}); 
	});
	
}

jQuery(document).ready(function(){
	

	updateBadgeCounter();

	chrome.cookies.onChanged.addListener(function (changeInfo) {
		if(changeInfo.cookie.name == cookieToListenTo) {
			var tmpValue = changeInfo.cookie.value;
			console.log(tmpValue);
			chrome.browserAction.setBadgeText({text: (numArticles-tmpValue).toString()});
			if(tmpValue >= (numArticles-1)) {
				chrome.browserAction.setBadgeText({text: "Clear"});
				setTimeout(function(){removeCookies()},500);
			}
		}
    });

});

function updateBadgeCounter(){
	
	chrome.cookies.get({url: "https://www.svd.se", name: cookieToListenTo}, function(cookie) {		
		var count = 0;			

		if(cookie !=null){
			count = cookie.value;
		}
		
		var badgeText = numArticles - count;

		chrome.browserAction.setBadgeText({text: badgeText.toString()});
		
	});
	
};
