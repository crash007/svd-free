jQuery(document).ready(function () {

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function (mutations, observer) {
        $(mutations).each(function (i) {
            if (this.previousSibling != null && this.previousSibling.id == "ad-blocker-dialog-popup") {
                removeAdblockerPopup();
            }

        });

    });


    observer.observe(document, {
        subtree: true,
        childList: true
    });

});


function removeAdblockerPopup() {
    if ($('#ad-blocker-dialog-popup').length) {
        console.log("Removing adblocker dialog popup");
        $('#ad-blocker-dialog-popup').removeClass("is-open");
        $('html').css("overflow-y", "");
        $('#ad-blocker-dialog-popup').removeAttr("id");
    } else {
        console.log("No adblock popup found");
    }
}
