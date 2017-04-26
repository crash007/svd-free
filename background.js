var clicks = 0;

function increment() {
  chrome.browserAction.setBadgeText({text: (++clicks).toString()});
}

chrome.browserAction.onClicked.addListener(testar);

function testar() {
console.log("test");
}

jQuery(document).ready(function(){
console.log("ready");
});