let activeTag = "all";

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
        const buttonValue = buttonEl.textContent.toLowerCase().replace(/\s+/g, '');
        if (buttonValue === activeTag) {
            buttonEl.classList.add("active");
        } else {
            buttonEl.classList.remove("active");
        }
    });
}
