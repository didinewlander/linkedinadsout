document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('toggleVisibility');
    const linkedInState = document.getElementById('linkedInState');
    const adsState = document.getElementById('adsState');

    // Set the initial state of the checkbox
    chrome.storage.sync.get('toggleState', function(data) {
        checkbox.checked = data.toggleState;
        updateStyles(data.toggleState);
    });

    checkbox.addEventListener('change', function() {
        const isChecked = this.checked;  // Save the state before entering into another function scope

        // Save the state of the switch to chrome.storage
        chrome.storage.sync.set({toggleState: isChecked}, function() {
            console.log('Toggle state is set to ' + isChecked);
            updateStyles(isChecked);
        });

        // Reload the current tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });

    function updateStyles(isChecked) {
        if (isChecked) {
            linkedInState.style.color = 'green';
            linkedInState.innerText = "Linked : IN";
            adsState.style.color = 'gray';
            adsState.innerText = "Ads : OUT"
        } else {
            linkedInState.style.color = 'gray';
            linkedInState.innerText = "Linked : OUT";
            adsState.style.color = 'green';
            adsState.innerText = "Ads : IN";

        }
    }
});
