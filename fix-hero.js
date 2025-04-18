// Script to ensure hero section buttons are visible
document.addEventListener("DOMContentLoaded", function() {
  console.log("Hero fix script loaded");
  
  // Function to force hero elements visibility
  function fixHeroVisibility() {
    // Get hero buttons
    const heroButtons = document.querySelector('.hero-btns');
    const ctaButton = document.querySelector('.cta');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    // Log current state
    console.log("Hero buttons container:", heroButtons);
    console.log("CTA button:", ctaButton);
    console.log("Let's Talk button:", ctaSecondary);
    
    // Force visibility on container
    if (heroButtons) {
      heroButtons.style.display = 'flex';
      heroButtons.style.gap = '20px';
      heroButtons.style.zIndex = '100';
      heroButtons.style.position = 'relative';
      heroButtons.style.marginTop = '40px';
      heroButtons.style.opacity = '1';
      heroButtons.style.visibility = 'visible';
      console.log("Fixed hero buttons container");
    }
    
    // Force visibility on CTA button
    if (ctaButton) {
      ctaButton.style.display = 'inline-flex';
      ctaButton.style.alignItems = 'center';
      ctaButton.style.zIndex = '100';
      ctaButton.style.position = 'relative';
      ctaButton.style.opacity = '1';
      ctaButton.style.visibility = 'visible';
      console.log("Fixed CTA button");
    }
    
    // Force visibility on Let's Talk button
    if (ctaSecondary) {
      ctaSecondary.style.display = 'inline-flex';
      ctaSecondary.style.alignItems = 'center';
      ctaSecondary.style.zIndex = '100';
      ctaSecondary.style.position = 'relative';
      ctaSecondary.style.opacity = '1';
      ctaSecondary.style.visibility = 'visible';
      console.log("Fixed Let's Talk button");
    }
  }
  
  // Run immediately
  fixHeroVisibility();
  
  // Run again after a delay to ensure it works after other scripts
  setTimeout(fixHeroVisibility, 1000);
  
  // Run again after page fully loads
  window.addEventListener('load', function() {
    setTimeout(fixHeroVisibility, 500);
  });
}); 