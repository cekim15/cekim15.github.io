let activeTag = "all";
let sortOrder = "newest"; // "newest" or "oldest"

function sortProjects(order) {
    sortOrder = order;
    
    // Update button states
    const newestBtn = document.getElementById('sort-newest');
    const oldestBtn = document.getElementById('sort-oldest');
    
    if (order === 'newest') {
        newestBtn.classList.add('active');
        oldestBtn.classList.remove('active');
    } else {
        oldestBtn.classList.add('active');
        newestBtn.classList.remove('active');
    }
    
    // Re-sort and apply current filter
    applySort();
}

function applySort() {
    const container = document.querySelector('.projects-container');
    const projects = Array.from(document.querySelectorAll('.project-card'));
    
    projects.sort((a, b) => {
        const dateA = parseProjectDate(a.querySelector('.project-date').textContent);
        const dateB = parseProjectDate(b.querySelector('.project-date').textContent);
        
        if (sortOrder === 'newest') {
            return dateB - dateA; // Descending (newest first)
        } else {
            return dateA - dateB; // Ascending (oldest first)
        }
    });
    
    // Re-append sorted projects to container
    projects.forEach(project => {
        container.appendChild(project);
    });
}

function parseProjectDate(dateString) {
    // Extract the end date from strings like "Aug 2025 – Dec 2025" or "Nov 2024"
    const parts = dateString.split('–');
    const endDateStr = parts.length > 1 ? parts[1].trim() : parts[0].trim();
    
    // Parse "Month Year" format
    const [month, year] = endDateStr.split(/\s+/);
    const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    return new Date(parseInt(year), monthMap[month] || 0);
}

function filterProjects(tag) {
    const projects = document.querySelectorAll('.project-card');

    if (activeTag === tag) {
        activeTag = "all";
    } else {
        activeTag = tag;
    }

    projects.forEach(project => {
        const tags = project.dataset.tags.split(" ");

        if (activeTag === "all" || tags.includes(activeTag)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });

    updateActiveTags();
    applySort();
}

function updateActiveTags() {
    const allTags = document.querySelectorAll('.tag');
    const allButtons = document.querySelectorAll('.filters button');

    allTags.forEach(tagEl => {
        if (tagEl.dataset.value === activeTag) {
            tagEl.classList.add("active-tag");
        } else {
            tagEl.classList.remove("active-tag");
        }
    });

    allButtons.forEach(buttonEl => {
        const buttonValue = buttonEl.dataset.value;
        if (buttonValue === activeTag) {
            buttonEl.classList.add("active");
        } else {
            buttonEl.classList.remove("active");
        }
    });
}
