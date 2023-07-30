// Function to perform modifications
function modifyPage() {
  //all elements to remove
  const elementsNames = ["aside", "footer"];

  elementsNames.forEach((name) => {
    const element = document.querySelectorAll(name);

    element.forEach((e) => {
      e.remove();
    });
  });

  // Adjust the width in :root CSS
  const root = document.querySelector(":root");
  root.style.setProperty(
    "--scaffold-layout-aside-width",
    "minmax(0,0px)",
    "important"
  );

  // let responseBar = document.querySelector('feed-shared-social-actions')
  // responseBar.style = "margin:0; justify-content: space-around";
  // Find all div elements (assuming each post is in a div)
  // Find all promoted posts
  const promotedPosts = document.querySelectorAll(".feed-shared-update-v2");

  promotedPosts.forEach((post) => {
    const isPromoted = post.querySelector(
      ".update-components-actor__sub-description"
    );

    if (
      isPromoted &&
      isPromoted.textContent.toLowerCase().includes("promoted")
    ) {
      post.remove();
    }
  });
}

// Perform modifications if the extension is enabled
chrome.storage.sync.get("toggleState", function (data) {
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
