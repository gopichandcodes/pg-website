// Simple confirmation when user clicks Contact button
document.addEventListener("DOMContentLoaded", function () {
    const contactButton = document.querySelector(".btn");
  
    if (contactButton) {
      contactButton.addEventListener("click", function () {
        console.log("Contact button clicked");
      });
    }
  });
  