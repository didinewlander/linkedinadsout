// Function to perform modifications
function modifyPage() {
    // Remove the <aside> element
    let element = document.querySelector('aside');
    if (element) {
        element.remove();
    }
    element = document.querySelector('aside');
    if(element) element.remove();
    element = document.querySelector('footer');
    if(element) element.remove();
    // Adjust the width in :root CSS
    let root = document.querySelector(':root');
    root.style.setProperty("--scaffold-layout-aside-width", "minmax(0,0px)", "important");

    // Find all div elements (assuming each post is in a div)
    // Find all promoted posts
    let promotedPosts = document.querySelectorAll('.feed-shared-update-v2');

    promotedPosts.forEach((post) => {
        let isPromoted = post.querySelector('.update-components-actor__sub-description');

        if (isPromoted && isPromoted.textContent.includes('Promoted')) {
            post.innerHTML = '<p>This post was a promotion and has been removed.</p>';
        }
    });

}

// Perform modifications if the extension is enabled
chrome.storage.sync.get('toggleState', function (data) {
    if (data.toggleState) {
        // Set delay (5000 milliseconds = 5 seconds)
        setTimeout(modifyPage, 5000);

        setInterval(modifyPage, 5000);

        // // Create a MutationObserver instance to watch for changes in the document
        // let observer = new MutationObserver(function(mutationsList, observer) {
        //     modifyPage();
        // });

        // // Start observing the document with the configured parameters
        // observer.observe(document.body, { childList: true, subtree: true });
    }
});