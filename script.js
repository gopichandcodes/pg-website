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
    }
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
