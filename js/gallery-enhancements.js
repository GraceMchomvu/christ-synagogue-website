// Beautiful Church Gallery - Continuous Video-like Sequence

document.addEventListener('DOMContentLoaded', function() {
  const photoGrid = document.querySelector('.photo-grid');
  const photoItems = document.querySelectorAll('.photo-item');
  
  // Add entrance animation for the gallery
  if (photoGrid) {
    photoGrid.style.opacity = '0';
    photoGrid.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      photoGrid.style.transition = 'all 0.8s ease-out';
      photoGrid.style.opacity = '1';
      photoGrid.style.transform = 'translateY(0)';
    }, 200);
  }
  
  // Add loading animation for images
  photoItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      img.style.opacity = '0';
      img.style.filter = 'blur(5px)';
      
      img.onload = function() {
        setTimeout(() => {
          img.style.transition = 'all 0.6s ease-out';
          img.style.opacity = '1';
          img.style.filter = 'blur(0px)';
        }, index * 100);
      };
    }
  });
  
  // Preload images for smoother animation
  function preloadImages() {
    photoItems.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
      }
    });
  }
  
  // Start preloading after a short delay
  setTimeout(preloadImages, 1000);
  
  // Performance optimization - pause animations when page is hidden
  document.addEventListener('visibilitychange', function() {
    const photoSequence = document.querySelector('.photo-sequence');
    if (photoSequence) {
      if (document.hidden) {
        photoSequence.style.animationPlayState = 'paused';
      } else {
        photoSequence.style.animationPlayState = 'running';
      }
    }
  });
  
  // Intersection Observer for performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      const photoSequence = document.querySelector('.photo-sequence');
      if (photoSequence) {
        if (entry.isIntersecting) {
          // Gallery is visible, ensure animation is running
          photoSequence.style.animationPlayState = 'running';
        } else {
          // Gallery is not visible, pause animation
          photoSequence.style.animationPlayState = 'paused';
        }
      }
    });
  }, observerOptions);
  
  if (photoGrid) {
    observer.observe(photoGrid);
  }
  
  // Add subtle hover effects
  photoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add subtle vibration on mobile
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
  });
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    const photoSequence = document.querySelector('.photo-sequence');
    if (photoSequence) {
      photoSequence.style.animationPlayState = 'paused';
    }
  });
});

// Enhanced Gallery Animations
document.addEventListener('DOMContentLoaded', function() {
  // Add performance optimization
  const photoSequence = document.querySelector('.photo-sequence');
  if (photoSequence) {
    // Enable hardware acceleration
    photoSequence.style.willChange = 'transform';
    
    // Add smooth transitions
    photoSequence.style.transition = 'transform 0.1s ease-out';
  }
  
  // Add reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const photoSequence = document.querySelector('.photo-sequence');
    if (photoSequence) {
      photoSequence.style.animation = 'none';
    }
  }
});