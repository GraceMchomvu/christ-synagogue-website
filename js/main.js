// Advanced Features JavaScript

// Initialize theme toggle immediately
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing theme toggle...');
  initializeThemeToggle();
});

// Fallback initialization after a short delay
setTimeout(function() {
  console.log('Fallback theme toggle initialization...');
  initializeThemeToggle();
}, 1000);

// Additional fallback for slower loading
setTimeout(function() {
  console.log('Second fallback theme toggle initialization...');
  initializeThemeToggle();
}, 3000);

// Track if theme toggle is already initialized
let themeToggleInitialized = false;

function initializeThemeToggle() {
  // Prevent duplicate initialization
  if (themeToggleInitialized) {
    console.log('⚠️ Theme toggle already initialized, skipping...');
    return;
  }

  const themeToggle = document.querySelector('.theme-toggle');
  const themeText = document.querySelector('.theme-text');
  const html = document.documentElement;

  console.log('🔍 Looking for theme toggle...', themeToggle);
  console.log('🔍 Looking for theme text...', themeText);

  if (themeToggle && themeText) {
    console.log('✅ Theme toggle found:', themeToggle);
    themeToggleInitialized = true;
    
    // Function to update theme text and meta tag
    function updateThemeText() {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      themeText.textContent = currentTheme === 'dark' ? 'Dark' : 'Light';
      
      // Update theme-color meta tag
      const themeColorMeta = document.getElementById('theme-color-meta');
      if (themeColorMeta) {
        themeColorMeta.content = currentTheme === 'dark' ? '#1f2937' : '#6366f1';
      }
      
      console.log('🎨 Theme text updated to:', currentTheme);
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🖱️ Theme toggle clicked!');
      
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      console.log('🔄 Current theme:', currentTheme, '→ New theme:', newTheme);
      
      // Add animation class
      themeToggle.classList.add('changing');
      
      // Change theme
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update text
      updateThemeText();
      
      console.log('✨ Theme changed to:', newTheme);
      
      // Remove animation class after animation completes
      setTimeout(function() {
        themeToggle.classList.remove('changing');
      }, 300);
    });
    
    // Load saved theme and update text
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeText();
    console.log('💾 Loaded theme:', savedTheme);
    
    // Test theme switching
    console.log('🧪 Testing theme switch...');
    setTimeout(function() {
      console.log('🧪 Current data-theme attribute:', html.getAttribute('data-theme'));
      console.log('🧪 Current CSS variables:', {
        bg: getComputedStyle(document.body).getPropertyValue('--bg'),
        text: getComputedStyle(document.body).getPropertyValue('--text')
      });
    }, 1000);
    
  } else {
    console.log('❌ Theme toggle elements not found!');
    console.log('themeToggle:', themeToggle);
    console.log('themeText:', themeText);
  }
}

// Header Scroll Effect
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    
    if (isOpen) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close menu when clicking on a link
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// Language Toggle - DISABLED FOR NOW TO SHOW TEXT
// const langToggle = document.querySelector('.lang-toggle');
// const langText = document.querySelector('.lang-text');

// if (langToggle && langText) {
//   langToggle.addEventListener('click', () => {
//     const currentLang = html.getAttribute('data-lang') || 'en';
//     const newLang = currentLang === 'en' ? 'sw' : 'en';
//     html.setAttribute('data-lang', newLang);
//     langText.textContent = newLang === 'en' ? 'SW' : 'EN';
//     localStorage.setItem('language', newLang);
//   });
  
//   // Load saved language
//   const savedLang = localStorage.getItem('language') || 'en';
//   html.setAttribute('data-lang', savedLang);
//   langText.textContent = savedLang === 'en' ? 'SW' : 'EN';
  
//   // Ensure language is properly initialized
//   if (!html.getAttribute('data-lang')) {
//     html.setAttribute('data-lang', 'en');
//   }
// }


// Voice Search
const voiceSearchBtn = document.getElementById('voice-search');
if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  voiceSearchBtn.addEventListener('click', () => {
    if (voiceSearchBtn.classList.contains('listening')) {
      recognition.stop();
      voiceSearchBtn.classList.remove('listening');
    } else {
      recognition.start();
      voiceSearchBtn.classList.add('listening');
    }
  });
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    voiceSearchBtn.classList.remove('listening');
    
    // Simple search functionality
    if (transcript.includes('sermon')) {
      document.querySelector('#sermons').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('prayer')) {
      document.querySelector('#prayer-scheduler').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('contact')) {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    } else if (transcript.includes('about')) {
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  recognition.onerror = () => {
    voiceSearchBtn.classList.remove('listening');
  };
}

// Prayer Scheduler Form
const prayerForm = document.getElementById('prayer-scheduler-form');
if (prayerForm) {
  prayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(prayerForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = prayerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Prayer session request submitted! We will contact you soon.');
      prayerForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Interactive Map Functions
window.getDirections = () => {
  const url = 'https://maps.google.com/maps?daddr=Majengo,+Arusha,+Tanzania';
  window.open(url, '_blank');
};

window.shareLocation = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Christ Synagogue Ministries',
      text: 'Visit us at Majengo, Arusha, Tanzania',
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText('Christ Synagogue Ministries - Majengo, Arusha, Tanzania');
    alert('Location copied to clipboard!');
  }
};

// PWA Installation
let deferredPrompt;
const pwaBanner = document.getElementById('pwa-banner');
const pwaInstallBtn = document.getElementById('pwa-install');
const pwaDismissBtn = document.getElementById('pwa-dismiss');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  pwaBanner.classList.add('show');
});

if (pwaInstallBtn) {
  pwaInstallBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA installation: ${outcome}`);
      deferredPrompt = null;
      pwaBanner.classList.remove('show');
    }
  });
}

if (pwaDismissBtn) {
  pwaDismissBtn.addEventListener('click', () => {
    pwaBanner.classList.remove('show');
    localStorage.setItem('pwa-dismissed', 'true');
  });
}

// Check if PWA was already dismissed
if (localStorage.getItem('pwa-dismissed') === 'true') {
  pwaBanner.style.display = 'none';
}

// Offline Detection
const offlineIndicator = document.getElementById('offline-indicator');

window.addEventListener('online', () => {
  offlineIndicator.classList.remove('show');
});

window.addEventListener('offline', () => {
  offlineIndicator.classList.add('show');
});

// Service Worker Registration for Offline Mode
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Push Notifications
const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Schedule service reminders
      scheduleServiceReminders();
    }
  }
};

const scheduleServiceReminders = () => {
  // Schedule Sunday service reminder
  const sundayReminder = new Notification('Sunday Service Reminder', {
    body: 'Join us for worship and prophetic message at 10:00 AM',
    icon: '/assets/favicon.svg',
    tag: 'sunday-service'
  });
  
  // Schedule Tuesday service reminder
  setTimeout(() => {
    const tuesdayReminder = new Notification('Tuesday Prayer Service', {
      body: 'Prayer and Bible study at 7:00 PM',
      icon: '/assets/favicon.svg',
      tag: 'tuesday-service'
    });
  }, 2000);
};

// Request notification permission on page load
requestNotificationPermission();

// Original functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    const target = targetId && document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Copy to Clipboard Function for Payment Details
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Use modern clipboard API
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess();
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess();
    } else {
      console.error('Fallback: Copying text command was unsuccessful');
    }
  } catch (err) {
    console.error('Fallback: Unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopySuccess() {
  // Find the clicked button and add success animation
  const buttons = document.querySelectorAll('.copy-btn');
  buttons.forEach(btn => {
    if (btn.classList.contains('copied')) {
      btn.classList.remove('copied');
    }
  });
  
  // Add success animation to the most recently clicked button
  setTimeout(() => {
    const clickedBtn = event.target;
    if (clickedBtn && clickedBtn.classList.contains('copy-btn')) {
      clickedBtn.classList.add('copied');
      clickedBtn.textContent = 'Copied!';
      
      setTimeout(() => {
        clickedBtn.classList.remove('copied');
        clickedBtn.textContent = 'Copy';
      }, 2000);
    }
  }, 10);
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Contact form validation (client-side only)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */(document.getElementById('name'));
    const email = /** @type {HTMLInputElement} */(document.getElementById('email'));
    const message = /** @type {HTMLTextAreaElement} */(document.getElementById('message'));
    const status = /** @type {HTMLElement} */(document.querySelector('.form-status'));

    const errors = { name: '', email: '', message: '' };
    if (!name.value.trim()) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.email = 'Please enter a valid email.';
    if (!message.value.trim()) errors.message = 'Please enter a message.';

    ['name','email','message'].forEach(key => {
      const el = document.querySelector(`.error[data-for="${key}"]`);
      if (el) el.textContent = errors[key];
    });

    if (!errors.name && !errors.email && !errors.message) {
      status.textContent = 'Thanks! Your message has been received.';
      form.reset();
      setTimeout(() => { status.textContent = ''; }, 4000);
    } else {
      status.textContent = '';
    }
  });
}



