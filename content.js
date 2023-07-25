// Function to perform modifications
function modifyPage() {
    // Remove the <aside> element
    let element = document.querySelector('aside.scaffold-layout__aside[aria-label="Add to your feed"]');
    if (element) {
        element.remove();
    }

    // Adjust the width in :root CSS
    let root = document.querySelector(':root');
    root.style.setProperty("--scaffold-layout-aside-width", "minmax(0,0px)", "important");

    // Find all h2 elements
    let headers = document.querySelectorAll('h2.feed-skip-link__container');
    headers.forEach(header => {
        // Get next sibling (the div after h2)
        let nextDiv = header.nextElementSibling;
        if (nextDiv && nextDiv.tagName.toLowerCase() === 'div') {
            // Check if one of its children has the specified class
            let hasClass = nextDiv.querySelector('.app-aware-link.update-components-actor__container-link.relative.display-flex.flex-grow-1');
            if (hasClass) {
                // Remove the h2
                header.remove();
                // Remove the div
                nextDiv.remove();
            }
        }
    });
}


// Perform modifications if the extension is enabled
chrome.storage.sync.get('toggleState', function(data) {
    if (data.toggleState !== false) {
        // Alert the user
        alert('LinkedIn page cleanup activated.');

        // Set delay (5000 milliseconds = 5 seconds)
        setTimeout(modifyPage, 5000);

        // Create a MutationObserver instance to watch for changes in the document
        let observer = new MutationObserver(modifyPage);

        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
    }
});
