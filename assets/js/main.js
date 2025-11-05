function loadpage(baseFile, content) {
    document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="BlueCode - Professional Web Development & Digital Solutions">
            <meta name="keywords" content="web development, digital solutions, coding, design, portfolio">
            <meta name="author" content="BlueCode Team">
            <title>BlueCode - Professional Web Development</title>
            
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="assets/css/main.css">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <span class="text-primary">Blue</span>Code
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="services.html">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="portfolio.html">Portfolio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="blog.html">Blog</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contact.html">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                ${content}
            </main>

            <footer class="bg-dark text-white py-4 mt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <h5><span class="text-primary">Blue</span>Code</h5>
                            <p>Professional web development and digital solutions for your business.</p>
                        </div>
                        <div class="col-md-4 mb-3">
                            <h5>Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="index.html" class="text-white">Home</a></li>
                                <li><a href="about.html" class="text-white">About</a></li>
                                <li><a href="services.html" class="text-white">Services</a></li>
                                <li><a href="portfolio.html" class="text-white">Portfolio</a></li>
                                <li><a href="blog.html" class="text-white">Blog</a></li>
                                <li><a href="contact.html" class="text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4 mb-3">
                            <h5>Contact Info</h5>
                            <p>Email: info@bluecode.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <p>Address: 123 Tech Street, Digital City</p>
                        </div>
                    </div>
                    <hr class="bg-white">
                    <div class="text-center">
                        <p>&copy; 2023 BlueCode. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
            <script src="assets/js/main.js"></script>
        </body>
        </html>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initContactForm();
    initPortfolioModal();
    initBlogFilter();
    initLoadMore();
    initAnimations();
    setActiveNavLink();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
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
    
    if (field.hasAttribute('required') && value === '') {
        field.classList.add('is-invalid');
        isValid = false;
    } else if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
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
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
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
                        <h5>${project.title}</h5>
                        <p class="text-muted">${project.description}</p>
                        ${project.details}
                    `;
                }
            });
        });
    }
}

function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');            
        
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.classList.add('fade-in');
                    }, 10);
                } else {
                    post.style.display = 'none';
                    post.classList.remove('fade-in');
                }
            });
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
            
            setTimeout(() => {
                newPosts.forEach((post, index) => {
                    const postId = blogPostsContainer.children.length + index + 1;
                    const postElement = document.createElement('div');
                    postElement.className = 'col-lg-4 col-md-6 blog-post fade-in';
                    postElement.setAttribute('data-category', post.category);
                    
                    let badgeClass = 'bg-primary';
                    if (post.category === 'ui-ux') badgeClass = 'bg-success';
                    if (post.category === 'mobile') badgeClass = 'bg-info';
                    if (post.category === 'seo') badgeClass = 'bg-warning';
                    
                    postElement.innerHTML = `
                        <div class="card blog-card border-0 shadow-sm h-100">
                            <div class="blog-image bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                                <h5 class="text-muted">${post.category === 'web-dev' ? 'Web Development' : 
                                                         post.category === 'ui-ux' ? 'UI/UX Design' : 
                                                         post.category === 'mobile' ? 'Mobile Apps' : 'SEO & Marketing'}</h5>
                            </div>
                            <div class="card-body">
                                <span class="badge ${badgeClass} mb-2">${post.category === 'web-dev' ? 'Web Development' : 
                                                                       post.category === 'ui-ux' ? 'UI/UX Design' : 
                                                                       post.category === 'mobile' ? 'Mobile Apps' : 'SEO & Marketing'}</span>
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.excerpt}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">${post.date}</small>
                                    <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    blogPostsContainer.appendChild(postElement);
                });
                
                this.textContent = originalText;
                this.disabled = false;
                
                if (blogPostsContainer.children.length >= 9) {
                    this.style.display = 'none';
                }
            }, 1500);
        });
    }
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
     
    const elementsToAnimate = document.querySelectorAll('.card, section');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.parentElement.removeChild(alertDiv);
        }
    }, 5000);
}