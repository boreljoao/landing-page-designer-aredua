document.addEventListener("DOMContentLoaded", function() {
    const scrollingText = document.querySelector(".scrolling-text");
    if (scrollingText) {
        // Duplicate content to ensure the CSS animation is seamless
        // The CSS animation moves the element by -50% of its own width,
        // so the content needs to be doubled.
        scrollingText.innerHTML += scrollingText.innerHTML;
    }
    const categoryBtns = document.querySelectorAll(".service-category-btn");
    const serviceDescriptions = document.querySelectorAll(".service-description");

    categoryBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Hide all service descriptions
            serviceDescriptions.forEach(desc => {
                desc.style.display = "none";
            });
            
            // Show the selected service description
            const category = this.getAttribute("data-category");
            document.getElementById(category).style.display = "block";
        });
    });
    
    // Initialize with Social Media visible
    document.getElementById("social-media").style.display = "block";
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".close-btn");
    
    mobileMenuBtn.addEventListener("click", function() {
        mobileMenu.classList.add("active");
    });
    
    closeBtn.addEventListener("click", function() {
        mobileMenu.classList.remove("active");
    });
    
    // Fechar o menu quando um link é clicado
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            mobileMenu.classList.remove("active");
        });
    });
    
    // Scrolling text duplication (seu código existente)
   
    
  
});

 // link a mailto
document.addEventListener("DOMContentLoaded", function () {
    const email = "borelduda@gmail.com";
    const emailLink = document.getElementById("emailLink");

    function isMobile() {
      return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    if (isMobile()) {
      emailLink.href = `mailto:${email}`;
    } else {
      emailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
      emailLink.target = "_blank";
      emailLink.rel = "noopener noreferrer";
    }
  });
