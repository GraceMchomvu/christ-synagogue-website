// Admin Data Loader - Connects admin panel data to main website
// This script loads data from localStorage and makes it available to the main website

class AdminDataLoader {
  constructor() {
    this.adminData = null;
    this.loadData();
  }

  // Load admin data from localStorage
  loadData() {
    try {
      const savedData = localStorage.getItem('admin_data');
      if (savedData) {
        this.adminData = JSON.parse(savedData);
      } else {
        // Use default data if no admin data exists
        this.adminData = this.getDefaultData();
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      this.adminData = this.getDefaultData();
    }
  }

  // Get default data structure
  getDefaultData() {
    return {
      sermons: [
        {
          id: 1,
          title: "The Power of Prayer",
          speaker: "Prophet Baraka David Ogillo",
          date: "2024-01-15",
          duration: "45:30",
          description: "A powerful message about the importance of prayer in our daily lives.",
          videoUrl: "https://youtube.com/watch?v=example1",
          thumbnail: "images/sermon1.jpg"
        }
      ],
      testimonies: [
        {
          id: 1,
          title: "Deliverance Testimony",
          author: "Sarah M.",
          date: "2024-01-10",
          description: "Sarah shares how prayer and deliverance broke spiritual chains in her life.",
          videoUrl: "https://youtube.com/watch?v=testimony1",
          thumbnail: "images/testimony1.jpg",
          memberSince: "2023"
        }
      ],
      events: [
        {
          id: 1,
          title: "Revival Service",
          date: "2024-02-15",
          time: "6:00 PM",
          location: "Main Sanctuary",
          description: "A special revival service with prophetic messages and healing.",
          image: "images/revival.jpg"
        }
      ],
      gallery: [
        {
          id: 1,
          title: "Sunday Service",
          description: "Worship and praise during Sunday service",
          image: "images/IMG_0812.JPG",
          category: "Worship"
        },
        {
          id: 2,
          title: "Community Gathering",
          description: "Church members fellowship together",
          image: "images/IMG_1527.JPG",
          category: "Community"
        },
        {
          id: 3,
          title: "Prayer Meeting",
          description: "Midweek prayer and Bible study",
          image: "images/IMG_1530.JPG",
          category: "Prayer"
        }
      ],
      ministries: [
        {
          id: 1,
          name: "Prophetic Ministry",
          description: "Delivering prophetic insight and divine direction through the power of the Holy Spirit.",
          leader: "Prophet Baraka David Ogillo",
          members: 50,
          icon: "heart"
        },
        {
          id: 2,
          name: "Prayer & Deliverance",
          description: "Breaking spiritual chains and promoting spiritual freedom through prayer and deliverance services.",
          leader: "Pastor Sarah",
          members: 25,
          icon: "users"
        },
        {
          id: 3,
          name: "Online Outreach",
          description: "Streaming content on YouTube, Facebook, and TikTok to reach a global audience.",
          leader: "Media Team",
          members: 15,
          icon: "globe"
        }
      ],
      settings: {
        churchName: "Christ Synagogue Ministries",
        prophetName: "Prophet Baraka David Ogillo",
        location: "Arusha, Tanzania",
        sundayService: "10:00 AM - Worship & Prophetic Message",
        tuesdayPrayer: "7:00 PM - Prayer & Bible Study"
      }
    };
  }

  // Get sermons data
  getSermons() {
    return this.adminData?.sermons || [];
  }

  // Get testimonies data
  getTestimonies() {
    return this.adminData?.testimonies || [];
  }

  // Get events data
  getEvents() {
    return this.adminData?.events || [];
  }

  // Get gallery data
  getGallery() {
    return this.adminData?.gallery || [];
  }

  // Get ministries data
  getMinistries() {
    return this.adminData?.ministries || [];
  }

  // Get settings data
  getSettings() {
    return this.adminData?.settings || {};
  }

  // Update content on the main website
  updateWebsiteContent() {
    this.updateNewsSection();
    this.updateSermonsSection();
    this.updateTestimoniesSection();
    this.updateEventsSection();
    this.updateGallerySection();
    this.updateMinistriesSection();
    this.updateSettingsContent();
  }

  // Update news section
  updateNewsSection() {
    this.updateLatestSermons();
    this.updateUpcomingEvents();
    this.updateRecentTestimonies();
  }

  // Update latest sermons in news section
  updateLatestSermons() {
    const sermons = this.getSermons();
    const container = document.getElementById('latest-sermons');
    
    if (!container) return;

    // Get the 3 most recent sermons (sorted by date)
    const latestSermons = sermons
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (latestSermons.length === 0) {
      container.innerHTML = `
        <div class="news-item">
          <div class="news-item-thumbnail">
            <svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
            </svg>
          </div>
          <div class="news-item-content">
            <h4 class="news-item-title">No sermons available</h4>
            <p class="news-item-description">Check back soon for new sermons!</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = latestSermons.map(sermon => `
      <div class="news-item sermon-item" onclick="window.location.href='#sermons'">
        <div class="news-item-thumbnail">
          ${sermon.thumbnail && sermon.thumbnail !== '' ? 
            `<img src="${sermon.thumbnail}" alt="${sermon.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor" style="display: none;">📺</svg>` :
            `<svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor">📺</svg>`
          }
        </div>
        <div class="news-item-content">
          <h4 class="news-item-title">${sermon.title}</h4>
          <div class="news-item-meta">
            <span>👤 ${sermon.speaker}</span>
            <span>📅 ${this.formatDate(sermon.date)}</span>
            ${sermon.duration ? `<span>⏱️ ${sermon.duration}</span>` : ''}
          </div>
          <p class="news-item-description">${sermon.description || 'Watch this powerful sermon and be blessed.'}</p>
        </div>
      </div>
    `).join('');
  }

  // Update upcoming events in news section
  updateUpcomingEvents() {
    const events = this.getEvents();
    const container = document.getElementById('upcoming-events');
    
    if (!container) return;

    // Get upcoming events (future dates only, sorted by date)
    const upcomingEvents = events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    if (upcomingEvents.length === 0) {
      container.innerHTML = `
        <div class="news-item">
          <div class="news-item-thumbnail">
            <svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
            </svg>
          </div>
          <div class="news-item-content">
            <h4 class="news-item-title">No upcoming events</h4>
            <p class="news-item-description">Stay tuned for upcoming events and activities!</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = upcomingEvents.map(event => {
      const eventDate = new Date(event.date);
      const day = eventDate.getDate();
      const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
      
      return `
        <div class="news-item event-item" onclick="window.location.href='#events'">
          <div class="news-item-thumbnail">
            <div class="news-item-date">
              <div style="font-size: 1.5rem; font-weight: bold;">${day}</div>
              <div style="font-size: 0.8rem;">${month}</div>
            </div>
          </div>
          <div class="news-item-content">
            <h4 class="news-item-title">${event.title}</h4>
            <div class="news-item-meta">
              <span>📅 ${this.formatDate(event.date)}</span>
              ${event.time ? `<span>🕐 ${event.time}</span>` : ''}
              ${event.location ? `<span>📍 ${event.location}</span>` : ''}
            </div>
            <p class="news-item-description">${event.description || 'Join us for this special event.'}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update recent testimonies in news section
  updateRecentTestimonies() {
    const testimonies = this.getTestimonies();
    const container = document.getElementById('recent-testimonies');
    
    if (!container) return;

    // Get the 3 most recent testimonies (sorted by date)
    const recentTestimonies = testimonies
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (recentTestimonies.length === 0) {
      container.innerHTML = `
        <div class="news-item">
          <div class="news-item-thumbnail">
            <svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"/>
            </svg>
          </div>
          <div class="news-item-content">
            <h4 class="news-item-title">No testimonies available</h4>
            <p class="news-item-description">Share your testimony of God's goodness!</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = recentTestimonies.map(testimony => `
      <div class="news-item testimony-item" onclick="window.location.href='#testimonies'">
        <div class="news-item-thumbnail">
          ${testimony.thumbnail && testimony.thumbnail !== '' ? 
            `<img src="${testimony.thumbnail}" alt="${testimony.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor" style="display: none;">🙏</svg>` :
            `<svg class="default-thumbnail" viewBox="0 0 24 24" fill="currentColor">🙏</svg>`
          }
        </div>
        <div class="news-item-content">
          <h4 class="news-item-title">${testimony.title}</h4>
          <div class="news-item-meta">
            <span>👤 ${testimony.author}</span>
            <span>📅 ${this.formatDate(testimony.date)}</span>
            ${testimony.memberSince ? `<span>🏠 Member since ${testimony.memberSince}</span>` : ''}
          </div>
          <p class="news-item-description">${testimony.description || 'Read this powerful testimony of God\'s goodness.'}</p>
        </div>
      </div>
    `).join('');
  }

  // Update sermons section
  updateSermonsSection() {
    const sermons = this.getSermons();
    const sermonsGrid = document.querySelector('.sermons-grid');
    
    if (!sermonsGrid || sermons.length === 0) return;

    // Clear existing content
    sermonsGrid.innerHTML = '';

    // Add sermons (limit to 3 for display)
    const displaySermons = sermons.slice(0, 3);
    
    displaySermons.forEach(sermon => {
      const sermonElement = document.createElement('div');
      sermonElement.className = 'sermon-video';
      
      // Extract YouTube video ID if it's a YouTube URL
      let videoId = '';
      if (sermon.videoUrl && sermon.videoUrl.includes('youtube.com/watch?v=')) {
        videoId = sermon.videoUrl.split('v=')[1].split('&')[0];
      } else if (sermon.videoUrl && sermon.videoUrl.includes('youtu.be/')) {
        videoId = sermon.videoUrl.split('youtu.be/')[1].split('?')[0];
      }

      sermonElement.innerHTML = `
        <h3>${sermon.title}</h3>
        <div class="video-wrapper">
          ${videoId ? 
            `<iframe src="https://www.youtube.com/embed/${videoId}" title="${sermon.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` :
            `<div class="no-video">Video not available</div>`
          }
        </div>
        <div class="sermon-info">
          <p><strong>Speaker:</strong> ${sermon.speaker}</p>
          <p><strong>Date:</strong> ${this.formatDate(sermon.date)}</p>
          ${sermon.duration ? `<p><strong>Duration:</strong> ${sermon.duration}</p>` : ''}
          ${sermon.description ? `<p>${sermon.description}</p>` : ''}
        </div>
      `;
      
      sermonsGrid.appendChild(sermonElement);
    });
  }

  // Update testimonies section
  updateTestimoniesSection() {
    const testimonies = this.getTestimonies();
    const testimoniesContainer = document.querySelector('.testimonies-sequential');
    
    if (!testimoniesContainer || testimonies.length === 0) return;

    // Clear existing content
    testimoniesContainer.innerHTML = '';

    // Add testimonies (limit to 3 for display)
    const displayTestimonies = testimonies.slice(0, 3);
    
    displayTestimonies.forEach((testimony, index) => {
      const testimonyElement = document.createElement('div');
      testimonyElement.className = 'testimony-card';
      
      testimonyElement.innerHTML = `
        <div class="testimony-content">
          <div class="quote-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
            </svg>
          </div>
          <blockquote>
            <p>${testimony.description}</p>
          </blockquote>
          <div class="testimony-author">
            <h4>${testimony.title}</h4>
            <p>— ${testimony.author} <span class="member-since">(Member since ${testimony.memberSince})</span></p>
          </div>
        </div>
      `;
      
      testimoniesContainer.appendChild(testimonyElement);
    });
  }

  // Update events section
  updateEventsSection() {
    const events = this.getEvents();
    const eventsContainer = document.querySelector('#events .container');
    
    if (!eventsContainer || events.length === 0) return;

    // Find or create events list container
    let eventsList = eventsContainer.querySelector('.events-list');
    if (!eventsList) {
      // Create events list if it doesn't exist
      const eventsSection = document.createElement('div');
      eventsSection.className = 'events-list';
      eventsContainer.appendChild(eventsSection);
      eventsList = eventsSection;
    }

    // Clear existing content
    eventsList.innerHTML = '';

    // Add upcoming events (filter for future events)
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
    
    if (upcomingEvents.length === 0) {
      eventsList.innerHTML = '<p>No upcoming events scheduled.</p>';
      return;
    }

    upcomingEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.className = 'event-card';
      
      eventElement.innerHTML = `
        <div class="event-date">
          <span class="day">${new Date(event.date).getDate()}</span>
          <span class="month">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
        </div>
        <div class="event-details">
          <h3>${event.title}</h3>
          <p class="event-time">${event.time} ${event.location ? `• ${event.location}` : ''}</p>
          <p class="event-description">${event.description}</p>
        </div>
      `;
      
      eventsList.appendChild(eventElement);
    });
  }

  // Update gallery section
  updateGallerySection() {
    const gallery = this.getGallery();
    const photoGrid = document.querySelector('.photo-grid');
    
    if (!photoGrid || gallery.length === 0) return;

    // Clear existing content
    photoGrid.innerHTML = '';

    // Add gallery images (limit to 9 for display)
    const displayGallery = gallery.slice(0, 9);
    
    displayGallery.forEach(image => {
      const imageElement = document.createElement('div');
      imageElement.className = 'photo-item';
      
      imageElement.innerHTML = `
        <img src="${image.image}" alt="${image.title}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
        <div class="photo-overlay">
          <h3>${image.title}</h3>
          <p>${image.description}</p>
        </div>
      `;
      
      photoGrid.appendChild(imageElement);
    });
  }

  // Update ministries section
  updateMinistriesSection() {
    const ministries = this.getMinistries();
    const ministriesContainer = document.querySelector('#ministries .grid.three.cards');
    
    if (!ministriesContainer || ministries.length === 0) return;

    // Clear existing content
    ministriesContainer.innerHTML = '';

    // Add ministries (limit to 3 for display)
    const displayMinistries = ministries.slice(0, 3);
    
    displayMinistries.forEach(ministry => {
      const ministryElement = document.createElement('article');
      ministryElement.className = 'card';
      
      // Get icon based on ministry icon type
      let iconSvg = '';
      switch(ministry.icon) {
        case 'heart':
          iconSvg = '<use href="assets/icons.svg#heart"></use>';
          break;
        case 'users':
          iconSvg = '<use href="assets/icons.svg#youth"></use>';
          break;
        case 'globe':
          iconSvg = '<use href="assets/icons.svg#globe"></use>';
          break;
        default:
          iconSvg = '<use href="assets/icons.svg#heart"></use>';
      }
      
      ministryElement.innerHTML = `
        <div class="card-icon">
          <svg viewBox="0 0 48 48" aria-hidden="true">${iconSvg}</svg>
        </div>
        <h3>${ministry.name}</h3>
        <p>${ministry.description}</p>
        <div class="ministry-info">
          <small><strong>Leader:</strong> ${ministry.leader}</small>
          <small><strong>Members:</strong> ${ministry.members}</small>
        </div>
      `;
      
      ministriesContainer.appendChild(ministryElement);
    });
  }

  // Update settings content throughout the website
  updateSettingsContent() {
    const settings = this.getSettings();
    
    // Update church name in header
    const brandSpan = document.querySelector('.brand span');
    if (brandSpan && settings.churchName) {
      brandSpan.textContent = settings.churchName;
    }

    // Update prophet name in about section
    const prophetNames = document.querySelectorAll('[data-translate="about.prophet"]');
    prophetNames.forEach(element => {
      if (settings.prophetName) {
        element.textContent = settings.prophetName;
      }
    });

    // Update location in visit section
    const locationElements = document.querySelectorAll('[data-translate="visit.location"]');
    locationElements.forEach(element => {
      if (settings.location) {
        element.textContent = settings.location;
      }
    });

    // Update service times
    const serviceTimeElements = document.querySelectorAll('.service-time');
    serviceTimeElements.forEach(element => {
      if (settings.sundayService && element.textContent.includes('Sunday')) {
        element.textContent = `Sunday: ${settings.sundayService}`;
      }
      if (settings.tuesdayPrayer && element.textContent.includes('Tuesday')) {
        element.textContent = `Tuesday: ${settings.tuesdayPrayer}`;
      }
    });
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Refresh data and update website
  refresh() {
    this.loadData();
    this.updateWebsiteContent();
  }
}

// Initialize the data loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.adminDataLoader = new AdminDataLoader();
  
  // Update website content with admin data
  window.adminDataLoader.updateWebsiteContent();
  
  // Listen for storage changes (when admin panel updates data)
  window.addEventListener('storage', function(e) {
    if (e.key === 'admin_data') {
      window.adminDataLoader.refresh();
    }
  });
  
  // Listen for custom admin data change events
  window.addEventListener('adminDataChanged', function(e) {
    if (e.detail && e.detail.adminData) {
      window.adminDataLoader.adminData = e.detail.adminData;
      window.adminDataLoader.updateWebsiteContent();
    }
  });
  
  // Listen for postMessage from admin panel (if in iframe)
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'adminDataChanged' && e.data.data) {
      window.adminDataLoader.adminData = e.data.data;
      window.adminDataLoader.updateWebsiteContent();
    }
  });
});

// Make AdminDataLoader available globally for debugging
window.AdminDataLoader = AdminDataLoader;

// Add debugging functions
window.debugAdminData = function() {
  console.log('Current admin data:', window.adminDataLoader?.adminData);
  console.log('Sermons:', window.adminDataLoader?.getSermons());
  console.log('Testimonies:', window.adminDataLoader?.getTestimonies());
  console.log('Events:', window.adminDataLoader?.getEvents());
  console.log('Gallery:', window.adminDataLoader?.getGallery());
  console.log('Ministries:', window.adminDataLoader?.getMinistries());
  console.log('Settings:', window.adminDataLoader?.getSettings());
};

window.testAdminIntegration = function() {
  console.log('Testing admin integration...');
  
  // Check if admin data loader is initialized
  if (window.adminDataLoader) {
    console.log('✓ Admin data loader initialized');
    
    // Check if data is loaded
    const data = window.adminDataLoader.adminData;
    if (data) {
      console.log('✓ Admin data loaded');
      console.log(`- Sermons: ${data.sermons?.length || 0}`);
      console.log(`- Testimonies: ${data.testimonies?.length || 0}`);
      console.log(`- Events: ${data.events?.length || 0}`);
      console.log(`- Gallery: ${data.gallery?.length || 0}`);
      console.log(`- Ministries: ${data.ministries?.length || 0}`);
    } else {
      console.log('✗ No admin data found');
    }
    
    // Try to update content
    try {
      window.adminDataLoader.updateWebsiteContent();
      console.log('✓ Website content updated');
    } catch (error) {
      console.log('✗ Error updating website content:', error);
    }
  } else {
    console.log('✗ Admin data loader not initialized');
  }
};

// Auto-run test on page load for debugging
if (window.location.search.includes('debug=admin')) {
  setTimeout(() => {
    window.testAdminIntegration();
  }, 1000);
}
