// Function to add or remove the CSS class to hide/show elements
function toggleVisibility(element, isVisible) {
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
    } else {
        console.error('Element not found');
    }
}


// Function to hide promoted posts
function hidePromotedPosts() {
    let promotedPosts = document.querySelectorAll('.feed-shared-update-v2');
    promotedPosts.forEach((post) => {
        let isPromoted = post.querySelector('.update-components-actor__sub-description');   
        if (isPromoted && isPromoted.textContent.includes('Promoted')) {
            toggleVisibility(post, false); 
        } else {
            toggleVisibility(post, true);
        }
    });
}

// Function to perform modifications
function modifyPage() {
    toggleVisibility(document.querySelector('.ad-banner-container'), false); // Hide the promoted aside
    let footer = document.querySelector('footer');
    let sc = document.querySelector('.scaffold-layout__sticky-content');
    if (footer && sc) sc.appendChild(footer);
    toggleVisibility(document.querySelector('aside'), false);
    let root = document.querySelector(':root');
    if (root) root.style.setProperty("--scaffold-layout-aside-width", "minmax(0,20px)", "important");
    hidePromotedPosts();
}

// Perform modifications if the extension is enabled
chrome.storage.sync.get('toggleState', function (data) {
    if (data.toggleState) {
        setInterval(modifyPage, 5000);
    }
});
