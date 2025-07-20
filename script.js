// Events data for each month
const monthlyEvents = {
  jan: {
    proposed: [
      "New Year Prayer Service",
      "CMO Executive Meeting",
      "Planning Session for Q1 Activities"
    ],
    completed: []
  },
  feb: {
    proposed: [
      "Monthly Mass Attendance",
      "Skills Workshop: Leadership",
      "Environmental Clean-up Drive"
    ],
    completed: []
  },
  mar: {
    proposed: [
      "Quarterly Retreat",
      "Medical Outreach Program",
      "Bible Study Session"
    ],
    completed: []
  },
  apr: {
    proposed: [
      "Easter Celebration",
      "Financial Literacy Seminar",
      "Sports Event: Football Tournament"
    ],
    completed: []
  },
  may: {
    proposed: [
      "Health Seminar",
      "Charity Drive",
      "Monthly Mass Attendance"
    ],
    completed: []
  },
  jun: {
    proposed: [
      "Mid-year Review Meeting",
      "Mentorship Program Launch",
      "Community Service Project"
    ],
    completed: [
      "Fathers' Day Celebration (June 12th-15th)"
    ]
  },
  jul: {
    proposed: [
      "Quarterly Retreat",
      "Skills Workshop: Communication",
      "Environmental Clean-up",
      "Pray Push & Play (July 26)"
    ],
    completed: [
      "Summer Prayer Retreat (July 15)"
    ]
  },
  aug: {
    proposed: [],
    completed: []
  },
  sep: {
    proposed: [
      "Annual Harvest Preparation",
      "Medical Outreach",
      "Financial Literacy Seminar"
    ],
    completed: []
  },
  oct: {
    proposed: [
      "Annual Harvest and Bazaar",
      "Charity Drive",
      "Health Seminar"
    ],
    completed: []
  },
  nov: {
    proposed: [
      "CMO Day Celebration",
      "Skills Workshop: Team Building",
      "Environmental Clean-up"
    ],
    completed: []
  },
  dec: {
    proposed: [
      "Christmas Celebration",
      "Year-end Review Meeting",
      "Community Service Project"
    ],
    completed: []
  }
};

// Month names for display
const monthNames = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", oct: "October", nov: "November", dec: "December"
};

// Function to show events for a specific month
function showEvents(month) {
  const eventsPanel = document.getElementById('eventsPanel');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const eventsTitle = document.getElementById('eventsTitle');
  const proposedEvents = document.getElementById('proposedEvents');
  const completedEvents = document.getElementById('completedEvents');

  // Update title
  eventsTitle.textContent = `${monthNames[month]} 2025 Events`;

  // Clear previous events
  proposedEvents.innerHTML = '';
  completedEvents.innerHTML = '';

  // Check if month has any events
  const hasProposed = monthlyEvents[month].proposed.length > 0;
  const hasCompleted = monthlyEvents[month].completed.length > 0;

  if (!hasProposed && !hasCompleted) {
    // Show no events message
    const noEventsMsg = document.createElement('div');
    noEventsMsg.style.cssText = 'text-align: center; padding: 40px 20px; color: #666; font-style: italic;';
    noEventsMsg.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 16px;">📅</div>
      <div style="font-size: 1.1rem; margin-bottom: 8px;">No events scheduled</div>
      <div style="font-size: 0.9rem;">This month is currently free for planning new activities</div>
    `;
    proposedEvents.appendChild(noEventsMsg);
  } else {
    // Populate proposed events
    if (hasProposed) {
      monthlyEvents[month].proposed.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        proposedEvents.appendChild(li);
      });
    } else {
      const noProposedMsg = document.createElement('li');
      noProposedMsg.style.cssText = 'color: #999; font-style: italic;';
      noProposedMsg.textContent = 'No proposed events';
      proposedEvents.appendChild(noProposedMsg);
    }

    // Populate completed events
    if (hasCompleted) {
      monthlyEvents[month].completed.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        completedEvents.appendChild(li);
      });
    } else {
      const noCompletedMsg = document.createElement('li');
      noCompletedMsg.style.cssText = 'color: #999; font-style: italic;';
      noCompletedMsg.textContent = 'No completed events';
      completedEvents.appendChild(noCompletedMsg);
    }
  }

  // Show the modal backdrop and panel
  modalBackdrop.classList.add('show');
  eventsPanel.classList.add('show');

  // Update active month label
  document.querySelectorAll('.month-label').forEach(label => {
    label.classList.remove('active');
  });
  document.querySelector(`[data-month="${month}"]`).classList.add('active');
}

// Function to close events panel
function closeEvents() {
  const eventsPanel = document.getElementById('eventsPanel');
  const modalBackdrop = document.getElementById('modalBackdrop');
  
  eventsPanel.classList.remove('show');
  modalBackdrop.classList.remove('show');
  
  // Remove active state from all month labels
  document.querySelectorAll('.month-label').forEach(label => {
    label.classList.remove('active');
  });
}

// Add click event listeners to month labels
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.month-label').forEach(label => {
    label.addEventListener('click', function() {
      const month = this.getAttribute('data-month');
      showEvents(month);
    });
  });

  // Close panel when clicking on backdrop
  document.getElementById('modalBackdrop').addEventListener('click', function() {
    closeEvents();
  });

  // Close panel when clicking outside (but not on the panel itself)
  document.addEventListener('click', function(event) {
    const eventsPanel = document.getElementById('eventsPanel');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!eventsPanel.contains(event.target) && 
        !timelineContainer.contains(event.target) && 
        eventsPanel.classList.contains('show')) {
      closeEvents();
    }
  });

  // Close panel with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const eventsPanel = document.getElementById('eventsPanel');
      if (eventsPanel.classList.contains('show')) {
        closeEvents();
      }
    }
  });

  // Objective card click handlers for mobile
  const objectiveCards = document.querySelectorAll('.objective-card');
  
  objectiveCards.forEach(card => {
    card.addEventListener('click', function() {
      const objectiveName = this.querySelector('.objective-name').textContent;
      showObjectiveDetails(objectiveName);
    });
  });
});

function showObjectiveDetails(objectiveName) {
  // Create modal content based on objective
  let activities = [];
  let icon = '';
  
  switch(objectiveName) {
    case 'Spiritual Development':
      icon = '🙏';
      activities = [
        'Daily Prayer and Meditation',
        'Weekly Bible Study', 
        'Monthly Retreat',
        'Quarterly Confession'
      ];
      break;
    case 'Personal Development':
      icon = '📚';
      activities = [
        'Skills Workshop',
        'Leadership Training',
        'Reading Program',
        'Mentorship Program'
      ];
      break;
    case 'Health and Wellness':
      icon = '💪';
      activities = [
        'Health Talks',
        'Health Living practices',
        'Mental Health programmes',
        'Sports and Keep fit activities'
      ];
      break;
    case 'Community Service':
      icon = '🤝';
      activities = [
        'Volunteer Outreach',
        'Charity Events',
        'Youth Mentoring',
        'Community Clean-up'
      ];
      break;
  }
  
  // Create modal HTML
  const modalHTML = `
    <div class="events-panel show" id="objectiveModal">
      <div class="events-header">
        <h2 class="events-title">${icon} ${objectiveName}</h2>
        <button class="close-btn" onclick="closeObjectiveModal()">&times;</button>
      </div>
      <div class="events-content">
        <h3>Activities & Details</h3>
        <ul class="activity-details-list">
          ${activities.map(activity => `<li>${activity}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="modal-backdrop show" onclick="closeObjectiveModal()"></div>
  `;
  
  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeObjectiveModal() {
  const modal = document.getElementById('objectiveModal');
  // Only remove the dynamically created modal-backdrop, not the one with id 'modalBackdrop'
  const backdrops = document.querySelectorAll('.modal-backdrop');
  if (modal) {
    modal.remove();
  }
  backdrops.forEach(backdrop => {
    if (!backdrop.id) {
      backdrop.remove();
    }
  });
} 