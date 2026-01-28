function filterProjects(tag) {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        const tags = project.dataset.tags.split(" ");

        if (tag === "all" || tags.includes(tag)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}
