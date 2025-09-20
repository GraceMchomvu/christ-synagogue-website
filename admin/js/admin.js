// Admin Panel JavaScript

// Data storage (in a real app, this would be a database)
let adminData = {
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
  window.location.reload();
}

function showLoginModal() {
  document.getElementById('modal-title').textContent = 'Admin Login';
  document.getElementById('modal-body').innerHTML = `
    <form id="login-form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="login-username" required>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="login-password" required>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
    <p style="margin-top: 1rem; color: #6b7280; font-size: 0.9rem;">
      Default credentials: admin / admin123
    </p>
  `;
  
  document.getElementById('modal-overlay').classList.add('active');
  
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_authenticated', 'true');
      closeModal();
      loadData();
      loadDashboardStats();
      loadAllContent();
    } else {
      showMessage('Invalid credentials!', 'error');
    }
  });
}

// Initialize data loading
loadData();

