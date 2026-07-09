let activeSkill = "all";

function getAvailableSkills() {
    const cards = document.querySelectorAll('.card[data-skills]');
    const skillSet = new Set();
    cards.forEach(card => {
        const skills = card.dataset.skills.split(' ');
        skills.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
}

function populateSkillFilters() {
    const container = document.getElementById('work-filters');
    const skills = getAvailableSkills();

    skills.forEach(skill => {
        const button = document.createElement('button');
        button.classList.add('work-filter-btn');
        button.dataset.skill = skill;
        button.textContent = skill.replace(/-/g, ' ');
        button.onclick = () => filterBySkill(skill);
        container.appendChild(button);
    });
}

function filterBySkill(skill) {
    const cards = document.querySelectorAll('.card[data-skills]');

    if (activeSkill === skill) {
        activeSkill = "all";
    } else {
        activeSkill = skill;
    }

    cards.forEach(card => {
        const skills = card.dataset.skills.split(" ");

        if (activeSkill === "all" || skills.includes(activeSkill)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    updateActiveSkillTags();
}

function updateActiveSkillTags() {
    const allTags = document.querySelectorAll('.skill-tag');
    const allButtons = document.querySelectorAll('.work-filter-btn');

    allTags.forEach(tag => {
        if (tag.dataset.skill === activeSkill) {
            tag.classList.add("active-tag");
        } else {
            tag.classList.remove("active-tag");
        }
    });

    allButtons.forEach(button => {
        if (button.dataset.skill === activeSkill) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateSkillFilters();
});
