let activeTag = "all";
let sortOrder = "newest"; // "newest" or "oldest"

document.addEventListener('DOMContentLoaded', () => {
    applySort();
});

function sortProjects(order) {
    if (sortOrder === order) {
        return;
    }

    sortOrder = order;

    const newestBtn = document.getElementById('sort-newest');
    const oldestBtn = document.getElementById('sort-oldest');

    if (order === 'newest') {
        newestBtn.classList.add('active');
        oldestBtn.classList.remove('active');
    } else {
        oldestBtn.classList.add('active');
        newestBtn.classList.remove('active');
    }
    applySort();
}

function applySort() {
    const container = document.querySelector('.projects-container');
    const projects = Array.from(document.querySelectorAll('.project-card'));

    projects.sort((a, b) => {
        const dateA = parseProjectDate(a.querySelector('.project-date').textContent);
        const dateB = parseProjectDate(b.querySelector('.project-date').textContent);

        if (sortOrder === 'newest') {
            return dateB - dateA; // descending
        } else {
            return dateA - dateB; // ascending
        }
    });
    
    projects.forEach(project => {
        container.appendChild(project);
    });
}

function parseProjectDate(dateString) {
    const parts = dateString.split('–');
    const endDateStr = parts.length > 1 ? parts[1].trim() : parts[0].trim();
    
    const [month, year] = endDateStr.split(/\s+/);
    const monthMap = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
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
