document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const galleryContainer = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let projects = [];
    let currentProject = null;
    let currentImageIndex = 0;

    // Fetch config and projects
    Promise.all([
        fetch('config.json').then(res => res.json()),
        fetch('projects.json').then(res => res.json())
    ]).then(([config, projectData]) => {
        applyConfig(config);
        projects = projectData;
        renderProjects(projects);
    }).catch(error => console.error('Error loading data:', error));

    function applyConfig(config) {
        document.title = config.siteTitle;
        const logos = document.querySelectorAll('.logo');
        logos.forEach(logo => logo.textContent = config.logoText);

        // Apply primary color if it exists
        if (config.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', config.primaryColor);
        }

        // About section
        const aboutSection = document.getElementById('site-about');
        if (aboutSection) aboutSection.textContent = config.about;

        // Resume button
        const resumeBtn = document.getElementById('resume-btn');
        if (resumeBtn) resumeBtn.href = config.resumeUrl;

        // Social Links
        const linkedin = document.getElementById('link-linkedin');
        if (linkedin) linkedin.href = config.contact.linkedin;

        const github = document.getElementById('link-github');
        if (github) github.href = config.contact.github;

        const email = document.getElementById('link-email');
        if (email) email.href = `mailto:${config.contact.email}`;
    }

    function renderProjects(projectsToRender) {
        projectGrid.innerHTML = '';
        projectsToRender.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${project.cover}" alt="${project.title}" class="project-card-image">
                <div class="project-card-content">
                    <h3 class="project-card-title">${project.title}</h3>
                </div>
            `;
            card.addEventListener('click', () => openModal(project));
            projectGrid.appendChild(card);
        });
    }

    function openModal(project) {
        currentProject = project;
        currentImageIndex = 0;

        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;

        const powerBiLink = document.getElementById('powerbi-link');
        powerBiLink.href = project.powerbi;
        if (project.powerbi === '#' || !project.powerbi) {
            powerBiLink.style.display = 'none';
        } else {
            powerBiLink.style.display = 'inline-block';
        }

        updateGallery();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function updateGallery() {
        galleryContainer.innerHTML = '';
        currentProject.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = currentProject.title;
            galleryContainer.appendChild(img);
        });

        if (currentProject.images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }

        slideGallery();
    }

    function slideGallery() {
        galleryContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }

    // Gallery Navigation
    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = currentProject.images.length - 1;
        }
        slideGallery();
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < currentProject.images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        slideGallery();
    });

    // Close Modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Accessibility: Escape key to close modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
