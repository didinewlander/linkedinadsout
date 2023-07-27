// Function to add or remove the CSS class to hide/show elements
function toggleVisibility(element, isVisible) {
    if (element) {
        if (isVisible) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

// Function to hide promoted posts
function hidePromotedPosts() {
    let promotedPosts = document.querySelectorAll('.feed-shared-update-v2');

    promotedPosts.forEach((post) => {
        let isPromoted = post.querySelector('.update-components-actor__sub-description');

        if (isPromoted && isPromoted.textContent.includes('Promoted')) {
            toggleVisibility(post, false); // Hide the post
        } else {
            toggleVisibility(post, true); // Show the post
        }
    });
}

// Function to perform modifications
function modifyPage() {
    toggleVisibility(document.querySelector('aside'), false); // Hide the aside
    toggleVisibility(document.querySelector('footer'), false); // Hide the footer
    hidePromotedPosts();
}

// Perform modifications if the extension is enabled
chrome.storage.sync.get('toggleState', function (data) {
    if (data.toggleState) {
        setInterval(modifyPage, 5000);

        // // Create a MutationObserver instance to watch for changes in the document
        // let observer = new MutationObserver(function(mutationsList, observer) {
        //     modifyPage();
        // });

        // // Start observing the document with the configured parameters
        // observer.observe(document.body, { childList: true, subtree: true });
    }
});
