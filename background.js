var cookieToListenTo = "svd-mc";
var domain = "svd.se";
var numFreeArticles = 6;

chrome.browserAction.onClicked.addListener(removeCookies);

function removeCookies() {
	chrome.cookies.getAll({domain: domain}, function(cookies) {
		
		var iterate = $.each(cookies, function(index,cookie){
			console.log(cookie);
			
			chrome.cookies.remove({url: "https://www.svd.se", name: cookie.name}, function(result) {
				console.log(result);
			});		
		});
		
		$.when(iterate).then(function(){updateBadgeCounter()}, function(){console.log("Error removing cookies")}); 
	});


	
}

jQuery(document).ready(function(){
	console.log("ready");

	updateBadgeCounter();

	chrome.cookies.onChanged.addListener(function (changeInfo) {
		if(changeInfo.cookie.name == cookieToListenTo) {
			var tmpValue = changeInfo.cookie.value;
			console.log(tmpValue);
			chrome.browserAction.setBadgeText({text: (numFreeArticles-tmpValue).toString()});
			if(tmpValue >= (numFreeArticles-1)) {
				removeCookies();		
			}
		}
    });

});

function updateBadgeCounter(){
	
	chrome.cookies.get({url: "https://www.svd.se", name: cookieToListenTo}, function(cookie) {
		console.log(cookie);
		var count = 0;			

		if(cookie !=null){
			count = cookie.value;
		}
		
		var badgeText = numFreeArticles - count;

		chrome.browserAction.setBadgeText({text: badgeText.toString()});
	});
};
