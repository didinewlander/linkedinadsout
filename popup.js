document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggleVisibility');
    checkbox.addEventListener('change', function() {
        // Reload the current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
});
