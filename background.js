var cookieToListenTo = "svd-mc";


chrome.browserAction.onClicked.addListener(removeCookies);

function removeCookies() {
	chrome.cookies.getAll({domain: "svd.se"}, function(cookies) {
		console.log(cookies);
	});
}

jQuery(document).ready(function(){
	console.log("ready");

	chrome.cookies.get({url: "https://www.svd.se", name: "svd-mc"}, function(cookie) {
		console.log(cookie);
		chrome.browserAction.setBadgeText({text: cookie.value});
	});

	chrome.cookies.onChanged.addListener(function (changeInfo) {
		if(changeInfo.cookie.name == cookieToListenTo) {
			var tmpValue = changeInfo.cookie.value;
			console.log(tmpValue);
			chrome.browserAction.setBadgeText({text: tmpValue});
			if(tmpValue >= 19) {
							
			}
		}
    });

});