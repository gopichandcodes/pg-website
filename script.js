/**
 * Sree Lakshya Premium Ladies PG
 * Enhanced JavaScript for animations and interactions
 * Minimal, performant, and accessible
 */

(function() {
  'use strict';

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  
  const initScrollAnimations = function() {
    const elements = document.querySelectorAll('.scroll-fade-in');
    
    if (!elements.length) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion is preferred
      elements.forEach(el => el.classList.add('visible'));
      return;
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all scroll-fade-in elements
    elements.forEach(el => observer.observe(el));
  };

  // ============================================
  // WHATSAPP DEEP LINK WITH FALLBACK
  // ============================================
  
  const initWhatsAppLinks = function() {
    const whatsappNumber = '916363187007'; // India country code +91, number without +
    const prefilledMessage = encodeURIComponent(
      'Hi, I am interested in Sree Lakshya – Premium Ladies PG. Please share room availability, rent, and admission process.'
    );
    
    // Base WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;
    
    // Fallback URL (without prefilled message for devices that don't support it)
    const whatsappFallback = `https://wa.me/${whatsappNumber}`;
    
    // Find all WhatsApp links
    const whatsappLinks = document.querySelectorAll('#whatsapp-btn, #whatsapp-contact, #whatsapp-cta');
    
    whatsappLinks.forEach(link => {
      // Set the primary URL
      link.href = whatsappURL;
      
      // Add click handler with fallback logic
      link.addEventListener('click', function(e) {
        // Check if we're on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // For mobile, try the prefilled message first
        // For desktop, use the web version
        if (isMobile) {
          // On mobile, try to open WhatsApp app with prefilled message
          // If that fails, fall back to opening chat without message
          try {
            // Attempt to open with prefilled message
            window.location.href = whatsappURL;
          } catch (error) {
            // Fallback: open without prefilled message
            window.location.href = whatsappFallback;
          }
        } else {
          // On desktop, open WhatsApp Web
          window.open(whatsappURL, '_blank');
        }
      });
    });
  };

  // ============================================
  // SMOOTH SCROLL ENHANCEMENT
  // ============================================
  
  const initSmoothScroll = function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable smooth scroll if user prefers reduced motion
      document.documentElement.style.scrollBehavior = 'auto';
    }
  };

  // ============================================
  // GALLERY INTERACTION (Optional Enhancement)
  // ============================================
  
  const initGalleryInteractions = function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    galleryItems.forEach(item => {
      // Add keyboard accessibility
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'View gallery image');
      
      // Handle keyboard interaction
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Future: Could open lightbox or full-size view
          // For now, just focus the element
          item.focus();
        }
      });
    });
  };

  // ============================================
  // FIXED HEADER SCROLL BEHAVIOR
  // ============================================
  
  const initHeaderScroll = function() {
    const header = document.getElementById('site-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    const handleScroll = function() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    };
    
    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Initial check
    handleScroll();
  };

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  
  const initBackToTop = function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    // Show/hide button based on scroll position
    const handleScroll = function() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrollPosition > heroHeight * 0.5) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Initial check
    handleScroll();
    
    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // ============================================
  // SMOOTH SCROLL FOR NAVIGATION LINKS
  // ============================================
  
  const initSmoothScrollNav = function() {
    const navLinks = document.querySelectorAll('.nav-link, .scroll-indicator');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle anchor links
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed header
            const headerHeight = document.getElementById('site-header')?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  
  const init = function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initWhatsAppLinks();
        initSmoothScroll();
        initGalleryInteractions();
        initHeaderScroll();
        initBackToTop();
        initSmoothScrollNav();
        initReviewsSlider();
        initReviewCardActivation();
      });
    } else {
      // DOM is already ready
      initScrollAnimations();
      initWhatsAppLinks();
      initSmoothScroll();
      initGalleryInteractions();
      initHeaderScroll();
      initBackToTop();
      initSmoothScrollNav();
      initReviewsSlider();
      initReviewCardActivation();
    }
  };

  // ============================================
  // REVIEWS SLIDER - PREMIUM AUTO-SLIDE
  // ============================================
  
  const initReviewsSlider = function() {
    const reviewsSection = document.getElementById('reviews');
    const reviewsTrack = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('review-prev');
    const nextBtn = document.getElementById('review-next');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (!reviewsSection || !reviewsTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let autoSlideInterval = null;
    let pauseTimeout = null;
    let isPaused = false;
    let isInViewport = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    const totalReviews = reviewCards.length;
    
    // Get cards per view based on current window size
    const getCardsPerView = function() {
      const width = window.innerWidth;
      if (width <= 480) return 1;
      if (width <= 768) return 2;
      return 3;
    };
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const autoSlideDelay = prefersReducedMotion ? 0 : 4500; // 4.5 seconds
    const resumeDelay = 5500; // 5.5 seconds after pause
    
    // Update active card highlighting
    const updateActiveCards = function() {
      const cardsPerView = getCardsPerView();
      let activeIndex;
      
      if (cardsPerView === 1) {
        // Mobile: highlight the visible card
        activeIndex = currentIndex;
      } else if (cardsPerView === 2) {
        // Tablet: highlight the first visible card
        activeIndex = currentIndex;
      } else {
        // Desktop: highlight the center card
        activeIndex = currentIndex + 1;
      }
      
      reviewCards.forEach(function(card, index) {
        if (index === activeIndex && activeIndex < totalReviews) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    };
    
    // Update slider position
    const updateSlider = function() {
      if (reviewCards.length === 0) return;
      const cardWidth = reviewCards[0].offsetWidth;
      const cardMargin = parseInt(getComputedStyle(reviewCards[0]).marginLeft) || 0;
      const totalCardWidth = cardWidth + (cardMargin * 2);
      const translateX = -(currentIndex * totalCardWidth);
      reviewsTrack.style.transform = `translateX(${translateX}px)`;
    };
    
    // Helper to deactivate any active review card when sliding
    const deactivateActiveReviewCard = function() {
      if (typeof initReviewCardActivation.deactivateAll === 'function') {
        initReviewCardActivation.deactivateAll();
      }
    };

    // Go to next slide
    const nextSlide = function() {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, totalReviews - cardsPerView);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      deactivateActiveReviewCard();
      updateActiveCards(); // Update immediately
      updateSlider();
      pauseAutoSlide();
    };
    
    // Go to previous slide
    const prevSlide = function() {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, totalReviews - cardsPerView);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      deactivateActiveReviewCard();
      updateActiveCards(); // Update immediately
      updateSlider();
      pauseAutoSlide();
    };
    
    // Start auto-slide
    const startAutoSlide = function() {
      if (prefersReducedMotion || !isInViewport || isPaused) return;
      
      autoSlideInterval = setInterval(function() {
        if (!isPaused && isInViewport) {
          nextSlide();
        }
      }, autoSlideDelay);
    };
    
    // Pause auto-slide
    const pauseAutoSlide = function() {
      isPaused = true;
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
      
      // Clear existing resume timeout
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }
      
      // Resume after inactivity
      pauseTimeout = setTimeout(function() {
        isPaused = false;
        if (isInViewport) {
          startAutoSlide();
        }
      }, resumeDelay);
    };
    
    // Check if section is in viewport
    const checkViewport = function() {
      const rect = reviewsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Section is visible if any part of it is in the viewport
      const isVisible = (
        rect.top < windowHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
      
      if (isVisible && !isInViewport) {
        isInViewport = true;
        if (!isPaused && !prefersReducedMotion) {
          startAutoSlide();
        }
      } else if (!isVisible && isInViewport) {
        isInViewport = false;
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval);
          autoSlideInterval = null;
        }
      }
  };
  
  // ============================================
  // REVIEWS - CARD ACTIVATE / SCROLL BEHAVIOR
  // ============================================
  // - No buttons, no text measurement
  // - Each card shows preview (overflow hidden)
  // - Clicking a card activates it and allows vertical scroll
  // - Only one card active at a time
  const initReviewCardActivation = function() {
    if (!reviewCards.length) return;

    const deactivateAll = function() {
      reviewCards.forEach(function(card) {
        card.classList.remove('is-review-active');
        const textEl = card.querySelector('.review-text');
        if (textEl) {
          textEl.classList.remove('expanded');
          textEl.scrollTop = 0;
        }
      });
    };

    // Expose helper inside slider scope so next/prev can use it
    initReviewCardActivation.deactivateAll = deactivateAll;

    reviewCards.forEach(function(card) {
      const textEl = card.querySelector('.review-text');
      if (!textEl) return;

      card.style.cursor = 'pointer';

      card.addEventListener('click', function(e) {
        // Ignore clicks on nav buttons inside section, if any
        if (e.target.closest('.review-nav')) return;

        const alreadyActive = card.classList.contains('is-review-active');
        deactivateAll();

        if (!alreadyActive) {
          card.classList.add('is-review-active');
          textEl.classList.add('expanded');
        }

        pauseAutoSlide();
      });
    });
  };
    
    // Touch/swipe support for mobile
    const initTouchSupport = function() {
      reviewsTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
      }, { passive: true });
      
      reviewsTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }
    };
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });
    
    prevBtn.addEventListener('click', function() {
      prevSlide();
    });
    
    // Keyboard navigation
    reviewsSection.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });
    
    // Pause on hover (desktop only)
    if (!isMobile) {
      reviewsSection.addEventListener('mouseenter', function() {
        pauseAutoSlide();
      });
      
      reviewsSection.addEventListener('mouseleave', function() {
        if (isInViewport) {
          pauseAutoSlide(); // Will resume after timeout
        }
      });
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Reset to first slide if needed
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalReviews - cardsPerView);
        if (currentIndex > maxIndex) {
          currentIndex = 0;
        }
        updateSlider();
        updateActiveCards();
        if (autoSlideInterval) {
          clearInterval(autoSlideInterval);
          autoSlideInterval = null;
        }
        if (isInViewport && !isPaused) {
          startAutoSlide();
        }
      }, 250);
    });
    
    // Initialize
    updateSlider();
    updateActiveCards();
    initReviewCardActivation();
    initTouchSupport();
    
    // Check viewport on scroll
    window.addEventListener('scroll', function() {
      checkViewport();
    }, { passive: true });
    
    // Initial viewport check
    checkViewport();
  };

  // Start initialization
  init();

  // Re-initialize scroll animations if new content is dynamically added
  // (Not needed for static site, but good practice)
  if (window.MutationObserver) {
    const mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          // Check if any new scroll-fade-in elements were added
          const newElements = Array.from(mutation.addedNodes).filter(
            node => node.nodeType === 1 && node.classList && node.classList.contains('scroll-fade-in')
          );
          if (newElements.length) {
            initScrollAnimations();
          }
        }
      });
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

})();
