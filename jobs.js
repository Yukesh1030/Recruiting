document.addEventListener('DOMContentLoaded', () => {
    // 1. Accordion Toggles
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const icon = trigger.querySelector('.btn-collapse');
            
            if (targetContent) {
                targetContent.classList.toggle('collapsed-content');
                if (icon) {
                    icon.classList.toggle('ri-subtract-line');
                    icon.classList.toggle('ri-add-line');
                    icon.classList.toggle('rotated-icon');
                }
            }
        });
    });

    // 2. Filter & Sort Elements
    const globalSearch = document.getElementById('globalSearch');
    const locationSearch = document.getElementById('locationSearch');
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const clearBtn = document.getElementById('clearFilters');
    const jobsFeed = document.getElementById('jobsFeed');
    const jobCountDisplay = document.getElementById('jobCount');
    
    const sortTrigger = document.getElementById('sortTrigger');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortOptions = document.querySelectorAll('.sort-option');
    const sortText = document.getElementById('sortText');

    let currentSort = 'newest';

    // 3. Sorting Functionality
    const sortJobs = (criteria) => {
        const cardsArray = Array.from(document.querySelectorAll('.job-card'));
        
        cardsArray.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            
            if (criteria === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        
        // Clear and re-append sorted cards
        cardsArray.forEach(card => jobsFeed.appendChild(card));
    };

    // 4. Filter Functionality
    const applyFilters = () => {
        const searchTerm = globalSearch.value.toLowerCase();
        const locationTerm = locationSearch.value.toLowerCase();
        
        const activeFilters = {
            type: [],
            experience: [],
            interest: []
        };
        
        checkboxes.forEach(cb => {
            if (cb.checked) {
                activeFilters[cb.dataset.filter].push(cb.value);
            }
        });

        const jobCards = document.querySelectorAll('.job-card');
        let visibleCount = 0;

        jobCards.forEach(card => {
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const meta = card.querySelector('.job-meta').textContent.toLowerCase();
            const skill = card.querySelector('.job-skill').textContent.toLowerCase();
            const type = card.dataset.type;
            const experience = card.dataset.experience;
            const interest = card.dataset.interest;
            const location = card.dataset.location.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || meta.includes(searchTerm) || skill.includes(searchTerm);
            const matchesLocation = location.includes(locationTerm);
            const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(type);
            const matchesExperience = activeFilters.experience.length === 0 || activeFilters.experience.includes(experience);
            const matchesInterest = activeFilters.interest.length === 0 || activeFilters.interest.includes(interest);

            if (matchesSearch && matchesLocation && matchesType && matchesExperience && matchesInterest) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        jobCountDisplay.textContent = visibleCount;
    };

    // 5. Event Listeners
    if (globalSearch) globalSearch.addEventListener('input', applyFilters);
    if (locationSearch) locationSearch.addEventListener('input', applyFilters);
    checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            globalSearch.value = '';
            locationSearch.value = '';
            checkboxes.forEach(cb => cb.checked = false);
            applyFilters();
        });
    }

    // 6. Sort Event Listeners
    if (sortTrigger) {
        sortTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            sortDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if (sortDropdown) sortDropdown.classList.remove('active');
    });

    sortOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const criteria = option.dataset.sort;
            currentSort = criteria;
            
            sortOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            sortText.textContent = `Sort by ${option.textContent}`;
            sortDropdown.classList.remove('active');
            
            sortJobs(criteria);
        });
    });

    // Initial Execution
    sortJobs('newest');
    applyFilters();
});
