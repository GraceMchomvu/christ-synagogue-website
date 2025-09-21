// Admin Panel JavaScript

// Enhanced Admin System with Password Management
let adminData = {
  // Admin settings
  adminSettings: {
    username: 'admin',
    password: 'admin123', // Will be hashed in production
    email: 'admin@christsynagogue.com',
    lastLogin: null,
    passwordChanged: false
  },
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
    },
    {
      id: 2,
      title: "Walking in Faith",
      speaker: "Prophet Baraka David Ogillo", 
      date: "2024-01-22",
      duration: "38:45",
      description: "Learning to trust God in all circumstances and walk by faith.",
      videoUrl: "https://youtube.com/watch?v=example2",
      thumbnail: "images/sermon2.jpg"
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
    },
    {
      id: 2,
      title: "Healing Testimony",
      author: "John K.",
      date: "2024-01-05",
      description: "John testifies about receiving divine direction that changed his career path.",
      videoUrl: "https://youtube.com/watch?v=testimony2",
      thumbnail: "images/testimony2.jpg",
      memberSince: "2022"
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
    },
    {
      id: 2,
      title: "Prayer Conference",
      date: "2024-03-01",
      time: "9:00 AM - 4:00 PM",
      location: "Conference Hall",
      description: "A full day of prayer, worship, and spiritual breakthrough.",
      image: "images/prayer-conf.jpg"
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
      name: "Worship Ministry",
      description: "Leading the congregation in Spirit-filled worship and praise.",
      leader: "Pastor Sarah",
      members: 15,
      icon: "music"
    },
    {
      id: 2,
      name: "Youth Ministry",
      description: "Empowering young people to grow in faith and serve God.",
      leader: "Pastor John",
      members: 25,
      icon: "users"
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

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
  initializeAdmin();
  loadDashboardStats();
  loadAllContent();
});

// Initialize admin panel
function initializeAdmin() {
  // Set up navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      showSection(section);
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
    });
  });
  
  // Check authentication (simple implementation)
  const isAuthenticated = localStorage.getItem('admin_authenticated');
  if (!isAuthenticated) {
    showLoginModal();
  } else {
    // Update user display
    updateUserDisplay();
  }
}

// Update user display in header
function updateUserDisplay() {
  const currentUser = localStorage.getItem('admin_user') || 'admin';
  const userDisplay = document.getElementById('current-user-display');
  if (userDisplay) {
    userDisplay.textContent = `Welcome, ${currentUser}`;
  }
  
  // Update current user in settings
  const currentUserInput = document.getElementById('current-user');
  if (currentUserInput) {
    currentUserInput.value = currentUser;
  }
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.admin-section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Show selected section
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Load content for the section
    switch(sectionName) {
      case 'sermons':
        loadSermons();
        break;
      case 'testimonies':
        loadTestimonies();
        break;
      case 'events':
        loadEvents();
        break;
      case 'gallery':
        loadGallery();
        break;
      case 'ministries':
        loadMinistries();
        break;
    }
  }
}

// Load dashboard statistics
function loadDashboardStats() {
  document.getElementById('sermons-count').textContent = adminData.sermons.length;
  document.getElementById('testimonies-count').textContent = adminData.testimonies.length;
  document.getElementById('events-count').textContent = adminData.events.length;
  document.getElementById('gallery-count').textContent = adminData.gallery.length;
}

// Load all content
function loadAllContent() {
  loadSermons();
  loadTestimonies();
  loadEvents();
  loadGallery();
  loadMinistries();
  loadSettings();
}

// Load sermons
function loadSermons() {
  const container = document.getElementById('sermons-list');
  if (!container) return;
  
  if (adminData.sermons.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
        </svg>
        <h3>No Sermons Yet</h3>
        <p>Add your first sermon to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = adminData.sermons.map(sermon => `
    <div class="item-card">
      <div class="item-info">
        <h4>${sermon.title}</h4>
        <p>${sermon.speaker} • ${formatDate(sermon.date)} • ${sermon.duration}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-secondary" onclick="editSermon(${sermon.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteSermon(${sermon.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load testimonies
function loadTestimonies() {
  const container = document.getElementById('testimonies-list');
  if (!container) return;
  
  if (adminData.testimonies.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"/>
        </svg>
        <h3>No Testimonies Yet</h3>
        <p>Add your first testimony to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = adminData.testimonies.map(testimony => `
    <div class="item-card">
      <div class="item-info">
        <h4>${testimony.title}</h4>
        <p>${testimony.author} • ${formatDate(testimony.date)} • Member since ${testimony.memberSince}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-secondary" onclick="editTestimony(${testimony.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTestimony(${testimony.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load events
function loadEvents() {
  const container = document.getElementById('events-list');
  if (!container) return;
  
  if (adminData.events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
        </svg>
        <h3>No Events Yet</h3>
        <p>Add your first event to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = adminData.events.map(event => `
    <div class="item-card">
      <div class="item-info">
        <h4>${event.title}</h4>
        <p>${formatDate(event.date)} • ${event.time} • ${event.location}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-secondary" onclick="editEvent(${event.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load gallery
function loadGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;
  
  if (adminData.gallery.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
        </svg>
        <h3>No Images Yet</h3>
        <p>Add your first image to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = adminData.gallery.map(image => `
    <div class="gallery-item">
      <img src="../${image.image}" alt="${image.title}" onerror="this.src='../images/placeholder.jpg'">
      <div class="gallery-item-overlay">
        <button class="btn btn-secondary" onclick="editGalleryImage(${image.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteGalleryImage(${image.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load ministries
function loadMinistries() {
  const container = document.getElementById('ministries-list');
  if (!container) return;
  
  if (adminData.ministries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2L2,7L12,12L22,7L12,2M2,17L12,22L22,17M2,12L12,17L22,12"/>
        </svg>
        <h3>No Ministries Yet</h3>
        <p>Add your first ministry to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = adminData.ministries.map(ministry => `
    <div class="item-card">
      <div class="item-info">
        <h4>${ministry.name}</h4>
        <p>${ministry.leader} • ${ministry.members} members</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-secondary" onclick="editMinistry(${ministry.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteMinistry(${ministry.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Load settings
function loadSettings() {
  const settings = adminData.settings;
  document.getElementById('church-name').value = settings.churchName;
  document.getElementById('prophet-name').value = settings.prophetName;
  document.getElementById('church-location').value = settings.location;
  document.getElementById('sunday-service').value = settings.sundayService;
  document.getElementById('tuesday-prayer').value = settings.tuesdayPrayer;
}

// Show forms
function showSermonForm(sermonId = null) {
  const sermon = sermonId ? adminData.sermons.find(s => s.id === sermonId) : null;
  
  document.getElementById('modal-title').textContent = sermon ? 'Edit Sermon' : 'Add New Sermon';
  document.getElementById('modal-body').innerHTML = `
    <form id="sermon-form">
      <div class="form-group">
        <label>Title *</label>
        <input type="text" id="sermon-title" value="${sermon?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Speaker *</label>
        <input type="text" id="sermon-speaker" value="${sermon?.speaker || ''}" required>
      </div>
      <div class="form-group">
        <label>Date *</label>
        <input type="date" id="sermon-date" value="${sermon?.date || ''}" required>
      </div>
      <div class="form-group">
        <label>Duration</label>
        <input type="text" id="sermon-duration" value="${sermon?.duration || ''}" placeholder="e.g., 45:30">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea id="sermon-description" placeholder="Brief description of the sermon">${sermon?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Video URL</label>
        <input type="url" id="sermon-video-url" value="${sermon?.videoUrl || ''}" placeholder="https://youtube.com/watch?v=...">
      </div>
      <div class="form-group">
        <label>Thumbnail Image</label>
        <input type="text" id="sermon-thumbnail" value="${sermon?.thumbnail || ''}" placeholder="images/sermon.jpg">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${sermon ? 'Update' : 'Add'} Sermon</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  // Handle form submission
  document.getElementById('sermon-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveSermon(sermonId);
  });
}

function showTestimonyForm(testimonyId = null) {
  const testimony = testimonyId ? adminData.testimonies.find(t => t.id === testimonyId) : null;
  
  document.getElementById('modal-title').textContent = testimony ? 'Edit Testimony' : 'Add New Testimony';
  document.getElementById('modal-body').innerHTML = `
    <form id="testimony-form">
      <div class="form-group">
        <label>Title *</label>
        <input type="text" id="testimony-title" value="${testimony?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Author Name *</label>
        <input type="text" id="testimony-author" value="${testimony?.author || ''}" required>
      </div>
      <div class="form-group">
        <label>Date *</label>
        <input type="date" id="testimony-date" value="${testimony?.date || ''}" required>
      </div>
      <div class="form-group">
        <label>Member Since</label>
        <input type="text" id="testimony-member-since" value="${testimony?.memberSince || ''}" placeholder="e.g., 2023">
      </div>
      <div class="form-group">
        <label>Description *</label>
        <textarea id="testimony-description" required placeholder="Share the testimony story">${testimony?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Video URL</label>
        <input type="url" id="testimony-video-url" value="${testimony?.videoUrl || ''}" placeholder="https://youtube.com/watch?v=...">
      </div>
      <div class="form-group">
        <label>Thumbnail Image</label>
        <input type="text" id="testimony-thumbnail" value="${testimony?.thumbnail || ''}" placeholder="images/testimony.jpg">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${testimony ? 'Update' : 'Add'} Testimony</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  // Handle form submission
  document.getElementById('testimony-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveTestimony(testimonyId);
  });
}

function showEventForm(eventId = null) {
  const event = eventId ? adminData.events.find(e => e.id === eventId) : null;
  
  document.getElementById('modal-title').textContent = event ? 'Edit Event' : 'Add New Event';
  document.getElementById('modal-body').innerHTML = `
    <form id="event-form">
      <div class="form-group">
        <label>Event Title *</label>
        <input type="text" id="event-title" value="${event?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Date *</label>
        <input type="date" id="event-date" value="${event?.date || ''}" required>
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="text" id="event-time" value="${event?.time || ''}" placeholder="e.g., 6:00 PM or 9:00 AM - 4:00 PM">
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" id="event-location" value="${event?.location || ''}" placeholder="e.g., Main Sanctuary">
      </div>
      <div class="form-group">
        <label>Description *</label>
        <textarea id="event-description" required placeholder="Describe the event">${event?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Event Image</label>
        <input type="text" id="event-image" value="${event?.image || ''}" placeholder="images/event.jpg">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${event ? 'Update' : 'Add'} Event</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  // Handle form submission
  document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveEvent(eventId);
  });
}

function showGalleryForm(imageId = null) {
  const image = imageId ? adminData.gallery.find(i => i.id === imageId) : null;
  
  document.getElementById('modal-title').textContent = image ? 'Edit Image' : 'Add New Image';
  document.getElementById('modal-body').innerHTML = `
    <form id="gallery-form">
      <div class="form-group">
        <label>Image Title *</label>
        <input type="text" id="gallery-title" value="${image?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea id="gallery-description" placeholder="Describe the image">${image?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Image Path *</label>
        <input type="text" id="gallery-image" value="${image?.image || ''}" required placeholder="images/photo.jpg">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="gallery-category">
          <option value="Worship" ${image?.category === 'Worship' ? 'selected' : ''}>Worship</option>
          <option value="Community" ${image?.category === 'Community' ? 'selected' : ''}>Community</option>
          <option value="Prayer" ${image?.category === 'Prayer' ? 'selected' : ''}>Prayer</option>
          <option value="Outreach" ${image?.category === 'Outreach' ? 'selected' : ''}>Outreach</option>
          <option value="Events" ${image?.category === 'Events' ? 'selected' : ''}>Events</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${image ? 'Update' : 'Add'} Image</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  // Handle form submission
  document.getElementById('gallery-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveGalleryImage(imageId);
  });
}

function showMinistryForm(ministryId = null) {
  const ministry = ministryId ? adminData.ministries.find(m => m.id === ministryId) : null;
  
  document.getElementById('modal-title').textContent = ministry ? 'Edit Ministry' : 'Add New Ministry';
  document.getElementById('modal-body').innerHTML = `
    <form id="ministry-form">
      <div class="form-group">
        <label>Ministry Name *</label>
        <input type="text" id="ministry-name" value="${ministry?.name || ''}" required>
      </div>
      <div class="form-group">
        <label>Leader Name *</label>
        <input type="text" id="ministry-leader" value="${ministry?.leader || ''}" required>
      </div>
      <div class="form-group">
        <label>Number of Members</label>
        <input type="number" id="ministry-members" value="${ministry?.members || ''}" min="0">
      </div>
      <div class="form-group">
        <label>Description *</label>
        <textarea id="ministry-description" required placeholder="Describe the ministry's purpose and activities">${ministry?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Icon</label>
        <select id="ministry-icon">
          <option value="music" ${ministry?.icon === 'music' ? 'selected' : ''}>Music</option>
          <option value="users" ${ministry?.icon === 'users' ? 'selected' : ''}>Users</option>
          <option value="heart" ${ministry?.icon === 'heart' ? 'selected' : ''}>Heart</option>
          <option value="book" ${ministry?.icon === 'book' ? 'selected' : ''}>Book</option>
          <option value="home" ${ministry?.icon === 'home' ? 'selected' : ''}>Home</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">${ministry ? 'Update' : 'Add'} Ministry</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  // Handle form submission
  document.getElementById('ministry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveMinistry(ministryId);
  });
}

// Save functions
function saveSermon(sermonId) {
  const formData = {
    title: document.getElementById('sermon-title').value,
    speaker: document.getElementById('sermon-speaker').value,
    date: document.getElementById('sermon-date').value,
    duration: document.getElementById('sermon-duration').value,
    description: document.getElementById('sermon-description').value,
    videoUrl: document.getElementById('sermon-video-url').value,
    thumbnail: document.getElementById('sermon-thumbnail').value
  };
  
  if (sermonId) {
    const index = adminData.sermons.findIndex(s => s.id === sermonId);
    adminData.sermons[index] = { ...adminData.sermons[index], ...formData };
    showMessage('Sermon updated successfully!', 'success');
  } else {
    const newId = Math.max(...adminData.sermons.map(s => s.id), 0) + 1;
    adminData.sermons.push({ id: newId, ...formData });
    showMessage('Sermon added successfully!', 'success');
  }
  
  closeModal();
  loadSermons();
  loadDashboardStats();
  saveData();
}

function saveTestimony(testimonyId) {
  const formData = {
    title: document.getElementById('testimony-title').value,
    author: document.getElementById('testimony-author').value,
    date: document.getElementById('testimony-date').value,
    memberSince: document.getElementById('testimony-member-since').value,
    description: document.getElementById('testimony-description').value,
    videoUrl: document.getElementById('testimony-video-url').value,
    thumbnail: document.getElementById('testimony-thumbnail').value
  };
  
  if (testimonyId) {
    const index = adminData.testimonies.findIndex(t => t.id === testimonyId);
    adminData.testimonies[index] = { ...adminData.testimonies[index], ...formData };
    showMessage('Testimony updated successfully!', 'success');
  } else {
    const newId = Math.max(...adminData.testimonies.map(t => t.id), 0) + 1;
    adminData.testimonies.push({ id: newId, ...formData });
    showMessage('Testimony added successfully!', 'success');
  }
  
  closeModal();
  loadTestimonies();
  loadDashboardStats();
  saveData();
}

function saveEvent(eventId) {
  const formData = {
    title: document.getElementById('event-title').value,
    date: document.getElementById('event-date').value,
    time: document.getElementById('event-time').value,
    location: document.getElementById('event-location').value,
    description: document.getElementById('event-description').value,
    image: document.getElementById('event-image').value
  };
  
  if (eventId) {
    const index = adminData.events.findIndex(e => e.id === eventId);
    adminData.events[index] = { ...adminData.events[index], ...formData };
    showMessage('Event updated successfully!', 'success');
  } else {
    const newId = Math.max(...adminData.events.map(e => e.id), 0) + 1;
    adminData.events.push({ id: newId, ...formData });
    showMessage('Event added successfully!', 'success');
  }
  
  closeModal();
  loadEvents();
  loadDashboardStats();
  saveData();
}

function saveGalleryImage(imageId) {
  const formData = {
    title: document.getElementById('gallery-title').value,
    description: document.getElementById('gallery-description').value,
    image: document.getElementById('gallery-image').value,
    category: document.getElementById('gallery-category').value
  };
  
  if (imageId) {
    const index = adminData.gallery.findIndex(i => i.id === imageId);
    adminData.gallery[index] = { ...adminData.gallery[index], ...formData };
    showMessage('Image updated successfully!', 'success');
  } else {
    const newId = Math.max(...adminData.gallery.map(i => i.id), 0) + 1;
    adminData.gallery.push({ id: newId, ...formData });
    showMessage('Image added successfully!', 'success');
  }
  
  closeModal();
  loadGallery();
  loadDashboardStats();
  saveData();
}

function saveMinistry(ministryId) {
  const formData = {
    name: document.getElementById('ministry-name').value,
    leader: document.getElementById('ministry-leader').value,
    members: parseInt(document.getElementById('ministry-members').value) || 0,
    description: document.getElementById('ministry-description').value,
    icon: document.getElementById('ministry-icon').value
  };
  
  if (ministryId) {
    const index = adminData.ministries.findIndex(m => m.id === ministryId);
    adminData.ministries[index] = { ...adminData.ministries[index], ...formData };
    showMessage('Ministry updated successfully!', 'success');
  } else {
    const newId = Math.max(...adminData.ministries.map(m => m.id), 0) + 1;
    adminData.ministries.push({ id: newId, ...formData });
    showMessage('Ministry added successfully!', 'success');
  }
  
  closeModal();
  loadMinistries();
  saveData();
}

// Edit functions
function editSermon(id) {
  showSermonForm(id);
}

function editTestimony(id) {
  showTestimonyForm(id);
}

function editEvent(id) {
  showEventForm(id);
}

function editGalleryImage(id) {
  showGalleryForm(id);
}

function editMinistry(id) {
  showMinistryForm(id);
}

// Delete functions
function deleteSermon(id) {
  if (confirm('Are you sure you want to delete this sermon?')) {
    adminData.sermons = adminData.sermons.filter(s => s.id !== id);
    loadSermons();
    loadDashboardStats();
    saveData();
    showMessage('Sermon deleted successfully!', 'success');
  }
}

function deleteTestimony(id) {
  if (confirm('Are you sure you want to delete this testimony?')) {
    adminData.testimonies = adminData.testimonies.filter(t => t.id !== id);
    loadTestimonies();
    loadDashboardStats();
    saveData();
    showMessage('Testimony deleted successfully!', 'success');
  }
}

function deleteEvent(id) {
  if (confirm('Are you sure you want to delete this event?')) {
    adminData.events = adminData.events.filter(e => e.id !== id);
    loadEvents();
    loadDashboardStats();
    saveData();
    showMessage('Event deleted successfully!', 'success');
  }
}

function deleteGalleryImage(id) {
  if (confirm('Are you sure you want to delete this image?')) {
    adminData.gallery = adminData.gallery.filter(i => i.id !== id);
    loadGallery();
    loadDashboardStats();
    saveData();
    showMessage('Image deleted successfully!', 'success');
  }
}

function deleteMinistry(id) {
  if (confirm('Are you sure you want to delete this ministry?')) {
    adminData.ministries = adminData.ministries.filter(m => m.id !== id);
    loadMinistries();
    saveData();
    showMessage('Ministry deleted successfully!', 'success');
  }
}

// Settings functions
function saveGeneralSettings() {
  const settings = {
    churchName: document.getElementById('church-name').value,
    prophetName: document.getElementById('prophet-name').value,
    location: document.getElementById('church-location').value,
    sundayService: document.getElementById('sunday-service').value,
    tuesdayPrayer: document.getElementById('tuesday-prayer').value
  };
  
  adminData.settings = { ...adminData.settings, ...settings };
  saveData();
  showMessage('Settings saved successfully!', 'success');
}

function saveServiceTimes() {
  const settings = {
    sundayService: document.getElementById('sunday-service').value,
    tuesdayPrayer: document.getElementById('tuesday-prayer').value
  };
  
  adminData.settings = { ...adminData.settings, ...settings };
  saveData();
  showMessage('Service times saved successfully!', 'success');
}

// Utility functions
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function showMessage(message, type = 'success') {
  const container = document.getElementById('message-container');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
  messageEl.innerHTML = `
    <div class="message-icon">${icon}</div>
    <div>${message}</div>
  `;
  
  container.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function saveData() {
  // In a real app, this would save to a database
  localStorage.setItem('admin_data', JSON.stringify(adminData));
}

function loadData() {
  const saved = localStorage.getItem('admin_data');
  if (saved) {
    adminData = { ...adminData, ...JSON.parse(saved) };
  }
}

function logout() {
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_user');
  window.location.reload();
}

// Password Management Functions
function showChangePasswordModal() {
  document.getElementById('modal-title').textContent = 'Change Password';
  document.getElementById('modal-body').innerHTML = `
    <form id="change-password-form">
      <div class="form-group">
        <label>Current Password</label>
        <input type="password" id="current-password" required placeholder="Enter current password">
      </div>
      <div class="form-group">
        <label>New Password</label>
        <input type="password" id="new-password" required placeholder="Enter new password" minlength="6">
        <small class="form-help">Password must be at least 6 characters long</small>
      </div>
      <div class="form-group">
        <label>Confirm New Password</label>
        <input type="password" id="confirm-password" required placeholder="Confirm new password">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Change Password</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  document.getElementById('change-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    changePassword();
  });
}

function changePassword() {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  // Validation
  if (newPassword.length < 6) {
    showMessage('Password must be at least 6 characters long!', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showMessage('New passwords do not match!', 'error');
    return;
  }
  
  // Load current admin settings
  const savedAdminSettings = localStorage.getItem('admin_settings');
  const adminSettings = savedAdminSettings ? JSON.parse(savedAdminSettings) : adminData.adminSettings;
  
  // Verify current password
  if (currentPassword !== adminSettings.password) {
    showMessage('Current password is incorrect!', 'error');
    return;
  }
  
  // Update password
  adminSettings.password = newPassword;
  adminSettings.passwordChanged = true;
  adminSettings.lastPasswordChange = new Date().toISOString();
  
  // Save updated settings
  localStorage.setItem('admin_settings', JSON.stringify(adminSettings));
  
  closeModal();
  showMessage('Password changed successfully!', 'success');
}

// User Profile Management
function showUserProfileModal() {
  const savedAdminSettings = localStorage.getItem('admin_settings');
  const adminSettings = savedAdminSettings ? JSON.parse(savedAdminSettings) : adminData.adminSettings;
  
  document.getElementById('modal-title').textContent = 'User Profile';
  document.getElementById('modal-body').innerHTML = `
    <form id="user-profile-form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="profile-username" value="${adminSettings.username}" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="profile-email" value="${adminSettings.email}" required>
      </div>
      <div class="form-group">
        <label>Last Login</label>
        <input type="text" value="${adminSettings.lastLogin ? new Date(adminSettings.lastLogin).toLocaleString() : 'Never'}" readonly>
      </div>
      <div class="form-group">
        <label>Password Changed</label>
        <input type="text" value="${adminSettings.passwordChanged ? 'Yes' : 'No'}" readonly>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Update Profile</button>
        <button type="button" class="btn btn-warning" onclick="showChangePasswordModal()">Change Password</button>
      </div>
    </form>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  document.getElementById('user-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateUserProfile();
  });
}

function updateUserProfile() {
  const username = document.getElementById('profile-username').value;
  const email = document.getElementById('profile-email').value;
  
  // Load current admin settings
  const savedAdminSettings = localStorage.getItem('admin_settings');
  const adminSettings = savedAdminSettings ? JSON.parse(savedAdminSettings) : adminData.adminSettings;
  
  // Update profile
  adminSettings.username = username;
  adminSettings.email = email;
  adminSettings.lastUpdated = new Date().toISOString();
  
  // Save updated settings
  localStorage.setItem('admin_settings', JSON.stringify(adminSettings));
  
  closeModal();
  showMessage('Profile updated successfully!', 'success');
}

// Backup and Restore Functions
function showBackupModal() {
  document.getElementById('modal-title').textContent = 'Backup & Restore';
  document.getElementById('modal-body').innerHTML = `
    <div class="backup-section">
      <h4>Backup Data</h4>
      <p>Download a backup of all your website data</p>
      <button class="btn btn-primary" onclick="downloadBackup()">Download Backup</button>
    </div>
    
    <div class="backup-section">
      <h4>Restore Data</h4>
      <p>Upload a backup file to restore your data</p>
      <input type="file" id="backup-file" accept=".json" style="margin-bottom: 1rem;">
      <button class="btn btn-warning" onclick="restoreBackup()">Restore Backup</button>
    </div>
    
    <div class="backup-section">
      <h4>Reset to Default</h4>
      <p>Reset all data to default values (this cannot be undone!)</p>
      <button class="btn btn-danger" onclick="resetToDefault()">Reset All Data</button>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
}

function downloadBackup() {
  const backupData = {
    adminSettings: JSON.parse(localStorage.getItem('admin_settings') || '{}'),
    adminData: JSON.parse(localStorage.getItem('admin_data') || '{}'),
    contactForms: JSON.parse(localStorage.getItem('contactForms') || '[]'),
    prayerForms: JSON.parse(localStorage.getItem('prayerForms') || '[]'),
    testimonies: JSON.parse(localStorage.getItem('testimonies') || '[]'),
    visitors: JSON.parse(localStorage.getItem('visitors') || '[]'),
    timestamp: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(backupData, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `csm-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showMessage('Backup downloaded successfully!', 'success');
}

function restoreBackup() {
  const fileInput = document.getElementById('backup-file');
  const file = fileInput.files[0];
  
  if (!file) {
    showMessage('Please select a backup file!', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const backupData = JSON.parse(e.target.result);
      
      // Restore data
      if (backupData.adminSettings) localStorage.setItem('admin_settings', JSON.stringify(backupData.adminSettings));
      if (backupData.adminData) localStorage.setItem('admin_data', JSON.stringify(backupData.adminData));
      if (backupData.contactForms) localStorage.setItem('contactForms', JSON.stringify(backupData.contactForms));
      if (backupData.prayerForms) localStorage.setItem('prayerForms', JSON.stringify(backupData.prayerForms));
      if (backupData.testimonies) localStorage.setItem('testimonies', JSON.stringify(backupData.testimonies));
      if (backupData.visitors) localStorage.setItem('visitors', JSON.stringify(backupData.visitors));
      
      showMessage('Backup restored successfully! Page will reload.', 'success');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      showMessage('Invalid backup file!', 'error');
    }
  };
  reader.readAsText(file);
}

function resetToDefault() {
  if (confirm('Are you sure you want to reset all data? This action cannot be undone!')) {
    if (confirm('This will delete ALL your data. Are you absolutely sure?')) {
      localStorage.clear();
      showMessage('Data reset successfully! Page will reload.', 'success');
      setTimeout(() => window.location.reload(), 2000);
    }
  }
}

// Reset Admin Password Function
function resetAdminPassword() {
  if (confirm('This will reset the admin password to default (admin123). Continue?')) {
    // Reset admin settings to default
    const defaultAdminSettings = {
      username: 'admin',
      password: 'admin123',
      email: 'admin@christsynagogue.com',
      lastLogin: null,
      passwordChanged: false
    };
    
    localStorage.setItem('admin_settings', JSON.stringify(defaultAdminSettings));
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    
    showMessage('Admin password reset to default (admin123). Please login again.', 'success');
    setTimeout(() => window.location.reload(), 2000);
  }
}

// Force Reset Admin Password Function (for emergency use)
function forceResetAdminPassword() {
  // Clear all admin-related localStorage data
  localStorage.removeItem('admin_settings');
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_user');
  localStorage.removeItem('admin_data');
  
  // Reset to default admin settings
  const defaultAdminSettings = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@christsynagogue.com',
    lastLogin: null,
    passwordChanged: false
  };
  
  localStorage.setItem('admin_settings', JSON.stringify(defaultAdminSettings));
  
  alert('Admin password has been reset to default credentials:\nUsername: admin\nPassword: admin123\n\nPlease refresh the page and login.');
}

function showLoginModal() {
  document.getElementById('modal-title').textContent = 'Admin Login';
  document.getElementById('modal-body').innerHTML = `
    <form id="login-form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="login-username" required placeholder="Enter username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="login-password" required placeholder="Enter password">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
    <div class="login-help">
      <p><strong>Default credentials:</strong> admin / admin123</p>
      <p><small>Change your password after first login for security</small></p>
      <div class="reset-buttons" style="margin-top: 0.5rem;">
        <button type="button" class="btn btn-warning btn-small" onclick="resetAdminPassword()">
          Reset Password to Default
        </button>
        <button type="button" class="btn btn-danger btn-small" onclick="forceResetAdminPassword()" style="margin-left: 0.5rem;">
          Force Reset (Emergency)
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Load admin settings
    const savedAdminSettings = localStorage.getItem('admin_settings');
    const adminSettings = savedAdminSettings ? JSON.parse(savedAdminSettings) : adminData.adminSettings;
    
    if (username === adminSettings.username && password === adminSettings.password) {
      // Update last login
      adminSettings.lastLogin = new Date().toISOString();
      localStorage.setItem('admin_settings', JSON.stringify(adminSettings));
      
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', username);
      closeModal();
      loadData();
      loadDashboardStats();
      loadAllContent();
      showMessage('Welcome back, ' + username + '!', 'success');
    } else {
      showMessage('Invalid credentials! Please try again.', 'error');
    }
  });
}

// Initialize data loading
loadData();

