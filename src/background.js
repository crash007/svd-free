var cookieToListenTo = "svd-mc";
var domain = "svd.se";
var numArticles = 4; //number of articles before warning that free articles are soon used up. (6 articles are free) 

function removeCookies() {	
	browser.cookies.getAll({domain: domain}, function(cookies) {
		
		var iterate = $.each(cookies, function(index,cookie){			
			browser.cookies.remove({url: "https://www.svd.se", name: cookie.name}, function(result) {
				
			});		
		});
		
		$.when(iterate).then(function(){
			updateBadgeCounter();
		}, function(){console.log("Error removing cookies")}); 
	});
	
}

jQuery(document).ready(function(){
	

	updateBadgeCounter();

	browser.cookies.onChanged.addListener(function (changeInfo) {
		if(changeInfo.cookie.name == cookieToListenTo) {
			var tmpValue = changeInfo.cookie.value;
			console.log(tmpValue);
			browser.browserAction.setBadgeText({text: (numArticles-tmpValue).toString()});
			if(tmpValue >= (numArticles-1)) {
				browser.browserAction.setBadgeText({text: "Clear"});
				setTimeout(function(){removeCookies()},500);
			}
		}
    });

});

function updateBadgeCounter(){
	
	browser.cookies.get({url: "https://www.svd.se", name: cookieToListenTo}, function(cookie) {		
		var count = 0;			

		if(cookie !=null){
			count = cookie.value;
		}
		
		var badgeText = numArticles - count;

		browser.browserAction.setBadgeText({text: badgeText.toString()});
		
	});
	
};
