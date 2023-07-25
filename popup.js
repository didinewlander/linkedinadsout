document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggleVisibility');
    checkbox.addEventListener('change', function() {
        // Save the state of the switch to chrome.storage
        chrome.storage.sync.set({toggleState: this.checked}, function() {
            console.log('Toggle state is set to ' + this.checked);
        });

        // Reload the current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
});
