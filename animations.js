// Advanced animations for portfolio
document.addEventListener("DOMContentLoaded", function() {
  console.log("Animations.js loaded"); // Debug log
  
  // Add GSAP library dynamically
  const gsapScript = document.createElement('script');
  gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
  document.head.appendChild(gsapScript);
  
  gsapScript.onload = function() {
    console.log("GSAP loaded successfully"); // Debug log
    // Initialize animations once GSAP is loaded
    initAnimations();
  };

  gsapScript.onerror = function() {
    console.error("Failed to load GSAP. Falling back to basic animations.");
    // Ensure portfolio items are visible even without GSAP
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
  };
  
  function initAnimations() {
    // Initialize ScrollTrigger
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    document.head.appendChild(scrollTriggerScript);
    
    scrollTriggerScript.onload = function() {
      console.log("ScrollTrigger loaded successfully"); // Debug log
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate hero elements
      animateHero();
      
      // Animate portfolio items
      animatePortfolio();
      
      // Text reveal animations for sections
      animateSectionTitles();
      
      // Cursor follower effect
      createCursorFollower();
    };
    
    scrollTriggerScript.onerror = function() {
      console.error("Failed to load ScrollTrigger. Using fallback animations.");
      // Ensure portfolio is visible without ScrollTrigger
      basicPortfolioAnimation();
    };
  }
  
  // Basic fallback animation if GSAP fails to load
  function basicPortfolioAnimation() {
    console.log("Using basic portfolio animations"); // Debug log
    
    document.querySelectorAll(".gallery-item").forEach((item, index) => {
      // Add a delay based on index
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100);
    });
  }
  
  function animateHero() {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Reveal hero badge with delay
    gsap.to(".hero-badge", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.5
    });
    
    // Create a more elaborate hero animation sequence
    heroTimeline
      .from(".hero-graphic", { 
        scale: 0.8, 
        opacity: 0, 
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      })
      .from(".hero h1", { 
        y: 50, 
        opacity: 0, 
        duration: 1 
      }, "-=1.3")
      .from(".highlight::after", {
        width: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .from(".hero p", { 
        y: 30, 
        opacity: 0, 
        duration: 0.8 
      }, "-=0.6")
      .from(".cta", { 
        y: 20, 
        opacity: 0, 
        duration: 0.6,
        scale: 0.9
      }, "-=0.4")
      .from(".cta-secondary", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scale: 0.9
      }, "-=0.5");
      
    // Parallax effect on hero section
    gsap.to(".hero::before, .hero::after", {
      y: 100,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Add floating animation to hero graphic
    gsap.to(".hero-graphic", {
      y: -30,
      x: 10,
      rotation: 5,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Animate the grid background with parallax
    gsap.to(".hero-bg-grid", {
      backgroundPosition: "100px 100px",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
  
  function animatePortfolio() {
    console.log("Portfolio animation initiated"); // Debug log
    console.log("Portfolio items found:", document.querySelectorAll(".gallery-item").length); // Debug log
    
    // Force portfolio section to be visible
    const portfolioSection = document.querySelector(".portfolio");
    if (portfolioSection) {
      portfolioSection.style.display = "block";
      portfolioSection.style.opacity = "1";
      portfolioSection.style.visibility = "visible";
      console.log("Portfolio section forced visible");
    }
    
    // Make gallery items visible immediately as fallback
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
    
    // Stagger animation for portfolio items
    gsap.from(".gallery-item", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top bottom-=50",
        toggleActions: "play none none none",
        onEnter: () => console.log("Portfolio entered viewport") // Debug log
      },
      onComplete: () => console.log("Portfolio animation completed") // Debug log
    });
    
    // Animate portfolio background shapes
    gsap.to(".portfolio::before", {
      x: 30,
      y: -20,
      rotation: 15,
      duration: 15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    gsap.to(".portfolio::after", {
      x: -20,
      y: 30,
      rotation: -10,
      duration: 18,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Hover animations for portfolio items
    document.querySelectorAll(".gallery-item").forEach(item => {
      const img = item.querySelector("img");
      const content = item.querySelector(".card-content");
      
      if (!img || !content) {
        console.error("Missing image or content in gallery item", item);
        return;
      }
      
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(img, { 
          scale: 1.05, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to(content, { 
          y: "0%", 
          duration: 0.4, 
          ease: "power3.out" 
        }, 0);
      
      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  }
  
  function animateSectionTitles() {
    // Animated underline effect for section titles
    gsap.utils.toArray(".section-title").forEach(title => {
      // Create and append the line element
      const line = document.createElement("span");
      line.className = "title-line";
      title.appendChild(line);
      
      // Add initial styling
      gsap.set(line, { 
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        width: "0",
        height: "3px",
        backgroundColor: "var(--primary)",
        transform: "translateX(-50%)"
      });
      
      // Animate on scroll
      gsap.to(line, {
        width: "60px",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }
  
  function createCursorFollower() {
    // Create cursor follower element
    const cursor = document.createElement("div");
    cursor.className = "cursor-follower";
    document.body.appendChild(cursor);
    
    // Style the cursor
    gsap.set(cursor, {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "var(--primary)",
      position: "fixed",
      pointerEvents: "none",
      opacity: 0,
      zIndex: 9999,
      mixBlendMode: "difference"
    });
    
    // Follow mouse movement with smooth animation
    document.addEventListener("mousemove", e => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Show cursor when it moves
      if (cursor.style.opacity === "0") {
        gsap.to(cursor, { opacity: 0.7, duration: 0.3 });
      }
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
    
    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll("a, button, .gallery-item, input, textarea");
    
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { 
          scale: 2, 
          opacity: 0.4,
          duration: 0.3 
        });
      });
      
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 0.7,
          duration: 0.3 
        });
      });
    });
  }
  
  // Add a fallback to make sure portfolio is visible even without animations
  setTimeout(() => {
    const portfolioItems = document.querySelectorAll(".gallery-item");
    if (portfolioItems.length > 0) {
      console.log("Applying fallback visibility to portfolio items"); // Debug log
      portfolioItems.forEach(item => {
        if (getComputedStyle(item).opacity < 0.5) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
      });
    }
  }, 2000);
}); 