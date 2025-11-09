document.addEventListener('DOMContentLoaded', function() {
    initSkipLink();
    initSmoothScroll();
    initContactForm();
    initPortfolioModal();
    initBlogFilter();
    initLoadMore();
    initAnimations();
    setActiveNavLink();
});

function initSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.removeAttribute('tabindex');
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
        
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    field.classList.remove('is-valid', 'is-invalid');
    
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    
    if (field.hasAttribute('required') && value === '') {
        field.classList.add('is-invalid');
        if (errorElement) {
            errorElement.textContent = 'This field is required';
        }
        isValid = false;
    } else if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid email address';
            }
            isValid = false;
        }
    }
    
    if (isValid && value !== '') {
        field.classList.add('is-valid');
    }
    
    return isValid;
}

function submitContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');
    
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        messageDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        form.reset();
        
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        const alert = messageDiv.querySelector('.alert');
        if (alert) {
            alert.focus();
        }
        
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 2000);
}

function initPortfolioModal() {
    const projectButtons = document.querySelectorAll('.view-project');
    const modal = document.getElementById('projectModal');
    
    if (modal) {
        const modalTitle = modal.querySelector('.modal-title');
        const modalContent = document.getElementById('project-content');
        
        const projects = {
            1: {
                title: 'TechShop Online Store',
                description: 'A fully responsive e-commerce platform with secure payment integration and inventory management.',
                details: `
                    <p><strong>Client:</strong> TechShop Retail</p>
                    <p><strong>Duration:</strong> 3 months</p>
                    <p><strong>Technologies:</strong> React, Node.js, MongoDB, Stripe API</p>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Responsive design for all devices</li>
                        <li>Secure payment processing with Stripe</li>
                        <li>Advanced product filtering and search</li>
                        <li>Inventory management system</li>
                        <li>Customer review and rating system</li>
                    </ul>
                    <p>The project resulted in a 40% increase in online sales for the client within the first month of launch.</p>
                `
            },
            2: {
                title: 'FitTrack Fitness App',
                description: 'A cross-platform mobile application for tracking workouts, nutrition, and fitness goals.',
                details: `
                    <p><strong>Client:</strong> FitTrack Health</p>
                    <p><strong>Duration:</strong> 4 months</p>
                    <p><strong>Technologies:</strong> React Native, Firebase, Redux</p>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Workout tracking with custom routines</li>
                        <li>Nutrition logging with calorie counting</li>
                        <li>Progress photos and measurements</li>
                        <li>Social features for motivation</li>
                        <li>Integration with health devices</li>
                    </ul>
                    <p>The app has been downloaded over 50,000 times and maintains a 4.8-star rating in app stores.</p>
                `
            },
            3: {
                title: 'Global Finance Corp',
                description: 'A modern corporate website with investor relations portal and secure client dashboard.',
                details: `
                    <p><strong>Client:</strong> Global Finance Corporation</p>
                    <p><strong>Duration:</strong> 5 months</p>
                    <p><strong>Technologies:</strong> Angular, .NET Core, SQL Server, Azure</p>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Secure client portal with role-based access</li>
                        <li>Real-time financial data visualization</li>
                        <li>Document management system</li>
                        <li>Multi-language support</li>
                        <li>Compliance with financial regulations</li>
                    </ul>
                    <p>The website improved client engagement by 60% and reduced administrative overhead by 30%.</p>
                `
            },
            4: {
                title: 'ProjectFlow SaaS',
                description: 'A project management SaaS application with real-time collaboration and analytics.',
                details: `
                    <p><strong>Client:</strong> ProjectFlow Inc.</p>
                    <p><strong>Duration:</strong> 6 months</p>
                    <p><strong>Technologies:</strong> Vue.js, Laravel, MySQL, WebSockets</p>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Real-time task management and updates</li>
                        <li>Team collaboration tools</li>
                        <li>Advanced reporting and analytics</li>
                        <li>Time tracking and billing</li>
                        <li>Integration with popular tools</li>
                    </ul>
                    <p>The SaaS platform now serves over 500 businesses with a 95% customer satisfaction rate.</p>
                `
            },
            5: {
                title: 'TravelEase Booking Platform',
                description: 'Complete UI/UX redesign for a travel booking platform focusing on user experience.',
                details: `
                    <p><strong>Client:</strong> TravelEase</p>
                    <p><strong>Duration:</strong> 2 months</p>
                    <p><strong>Technologies:</strong> Figma, Adobe XD, User Testing Tools</p>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Streamlined booking process</li>
                        <li>Mobile-first responsive design</li>
                        <li>Accessibility improvements</li>
                        <li>Personalized recommendations</li>
                        <li>Enhanced visual hierarchy</li>
                    </ul>
                    <p>The redesign led to a 25% increase in conversion rates and 40% reduction in bounce rate.</p>
                `
            },
            6: {
                title: 'NovaTech Branding',
                description: 'Complete brand identity design including logo, style guide, and marketing materials.',
                details: `
                    <p><strong>Client:</strong> NovaTech Solutions</p>
                    <p><strong>Duration:</strong> 1 month</p>
                    <p><strong>Technologies:</strong> Adobe Creative Suite, Brand Guidelines</p>
                    <p><strong>Deliverables:</strong></p>
                    <ul>
                        <li>Logo design and variations</li>
                        <li>Complete brand style guide</li>
                        <li>Business cards and stationery</li>
                        <li>Marketing collateral</li>
                        <li>Social media templates</li>
                    </ul>
                    <p>The new branding helped NovaTech establish a strong market presence and increased brand recognition by 70%.</p>
                `
            }
        };
        
        projectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const project = projects[projectId];
                
                if (project) {
                    modalTitle.textContent = project.title;
                    modalContent.innerHTML = `
                        <h2 class="h5">${project.title}</h2>
                        <p class="text-muted">${project.description}</p>
                        ${project.details}
                    `;
                    
                    const firstFocusable = modalContent.querySelector('a, button, input, [tabindex]');
                    if (firstFocusable) {
                        setTimeout(() => firstFocusable.focus(), 100);
                    }
                }
            });
        });
        
        modal.addEventListener('shown.bs.modal', function() {
            const firstFocusable = modalContent.querySelector('a, button, input, [tabindex]');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        });
    }
}

function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentActive = document.querySelector('.filter-btn.active');
            if (currentActive) {
                currentActive.classList.remove('active');
                currentActive.setAttribute('aria-pressed', 'false');
            }
            
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    post.removeAttribute('aria-hidden');
                    visibleCount++;
                    setTimeout(() => {
                        post.classList.add('fade-in');
                    }, 10);
                } else {
                    post.style.display = 'none';
                    post.classList.remove('fade-in');
                    post.setAttribute('aria-hidden', 'true');
                }
            });
            
            const loadMoreBtn = document.getElementById('load-more');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = visibleCount === 0 ? 'none' : 'block';
            }
        });
    });
}

function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const blogPostsContainer = document.getElementById('blog-posts');
            const newPosts = [
                {
                    category: 'web-dev',
                    title: 'Progressive Web Apps: The Future of Web',
                    excerpt: 'How PWAs are bridging the gap between web and mobile applications.',
                    date: 'September 10, 2023'
                },
                {
                    category: 'ui-ux',
                    title: 'Minimalist Design Principles',
                    excerpt: 'The art of saying more with less in digital interface design.',
                    date: 'September 5, 2023'
                },
                {
                    category: 'mobile',
                    title: 'The Rise of Kotlin in Android Development',
                    excerpt: 'Why Kotlin has become the preferred language for Android apps.',
                    date: 'August 28, 2023'
                }
            ];
            
            const originalText = this.textContent;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            this.disabled = true;
            this.setAttribute('aria-label', 'Loading more blog posts');
            
            setTimeout(() => {
                newPosts.forEach((post, index) => {
                    const postId = blogPostsContainer.children.length + index + 1;
                    const postElement = document.createElement('div');
                    postElement.className = 'col-lg-4 col-md-6 blog-post fade-in';
                    postElement.setAttribute('data-category', post.category);
                    
                    let badgeClass = 'bg-primary';
                    let categoryText = 'Web Development';
                    
                    if (post.category === 'ui-ux') {
                        badgeClass = 'bg-success';
                        categoryText = 'UI/UX Design';
                    } else if (post.category === 'mobile') {
                        badgeClass = 'bg-info';
                        categoryText = 'Mobile Apps';
                    } else if (post.category === 'seo') {
                        badgeClass = 'bg-warning';
                        categoryText = 'SEO & Marketing';
                    }
                    
                    postElement.innerHTML = `
                        <div class="card blog-card border-0 shadow-sm h-100">
                            <div class="blog-image bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                                <h5 class="text-muted">${categoryText}</h5>
                            </div>
                            <div class="card-body">
                                <span class="badge ${badgeClass} mb-2">${categoryText}</span>
                                <h3 class="card-title h5">${post.title}</h3>
                                <p class="card-text">${post.excerpt}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <time class="text-muted" datetime="${new Date(post.date).toISOString().split('T')[0]}">${post.date}</time>
                                    <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    blogPostsContainer.appendChild(postElement);
                });
                
                this.innerHTML = originalText;
                this.disabled = false;
                this.removeAttribute('aria-label');
                
                if (blogPostsContainer.children.length >= 9) {
                    this.style.display = 'none';
                    this.setAttribute('aria-hidden', 'true');
                }
                
                const newPostElements = blogPostsContainer.querySelectorAll('.blog-post:not(.fade-in)');
                newPostElements.forEach(post => {
                    post.classList.add('fade-in');
                });
            }, 1500);
        });
    }
}

function initAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
         
        const elementsToAnimate = document.querySelectorAll('.card, section, .team-image');
        elementsToAnimate.forEach(element => {
            if (!element.classList.contains('fade-in')) {
                observer.observe(element);
            }
        });
    }
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close alert message"></button>
    `;
    
    const mainContent = document.querySelector('main') || document.body;
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    alertDiv.focus();
    
    setTimeout(() => {
        if (alertDiv.parentElement) {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }
    }, 5000);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
        
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }
});