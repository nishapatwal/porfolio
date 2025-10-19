// Configuration - Use values from config.js
const CONFIG = {
    github: {
        username: window.PORTFOLIO_CONFIG?.github?.username || 'nishapatwal', // Use config.js or fallback
        apiUrl: 'https://api.github.com'
    },
    linkedin: {
        // Note: LinkedIn API requires OAuth and has restrictions
        // For demo purposes, we'll use mock data
        profileId: window.PORTFOLIO_CONFIG?.linkedin?.profileUrl || 'nisha-linkedin-profile'
    }
};

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const linkedinCard = document.getElementById('linkedin-card');
const githubReposCount = document.getElementById('github-repos');
const linkedinConnectionsCount = document.getElementById('linkedin-connections');
const githubLink = document.getElementById('github-link');
const linkedinLink = document.getElementById('linkedin-link');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// GitHub API Integration
async function fetchGitHubData() {
    try {
        // Fetch user profile
        const userResponse = await fetch(`${CONFIG.github.apiUrl}/users/${CONFIG.github.username}`);
        
        if (!userResponse.ok) {
            throw new Error('GitHub user not found');
        }
        
        const userData = await userResponse.json();
        
        // Update profile information
        updateGitHubProfile(userData);
        
        // Fetch repositories
        const reposResponse = await fetch(`${CONFIG.github.apiUrl}/users/${CONFIG.github.username}/repos?sort=updated&per_page=6`);
        
        if (!reposResponse.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const reposData = await reposResponse.json();
        
        // Update repositories count
        githubReposCount.textContent = userData.public_repos || 0;
        
        // Update GitHub link
        githubLink.href = userData.html_url || window.PORTFOLIO_CONFIG?.social?.github || 'https://github.com/nishapatwal';
        
        // Display repositories
        displayGitHubRepos(reposData);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        displayGitHubError();
    }
}

function updateGitHubProfile(userData) {
    // Profile placeholder is now handled by CSS
    
    // Update profile name
    const profileName = document.getElementById('profile-name');
    if (userData.name && profileName) {
        profileName.textContent = userData.name;
    }
    
    // Update profile title with bio if available
    const profileTitle = document.getElementById('profile-title');
    if (userData.bio && profileTitle) {
        profileTitle.textContent = userData.bio;
    } else if (profileTitle) {
        profileTitle.textContent = 'B.Tech Student';
    }
}

function displayGitHubRepos(repos) {
    if (!repos || repos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-info-circle"></i>
                <p>No public repositories found.</p>
            </div>
        `;
        return;
    }

    const reposHTML = repos.map(repo => {
        const languageColor = getLanguageColor(repo.language);
        const updatedDate = new Date(repo.updated_at).toLocaleDateString();
        
        return `
            <div class="project-card">
                <div class="project-header">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">
                        ${repo.description || 'No description available'}
                    </p>
                    <div class="project-meta">
                        <div class="project-language">
                            <span class="language-dot" style="background-color: ${languageColor}"></span>
                            <span>${repo.language || 'Unknown'}</span>
                        </div>
                        <div class="project-stats">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 0.5rem;">
                        Updated on ${updatedDate}
                    </p>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="project-link primary">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${repo.homepage ? 
                        `<a href="${repo.homepage}" target="_blank" class="project-link secondary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : 
                        `<a href="${repo.html_url}/issues" target="_blank" class="project-link secondary">
                            <i class="fas fa-bug"></i> Issues
                        </a>`
                    }
                </div>
            </div>
        `;
    }).join('');

    projectsGrid.innerHTML = reposHTML;
}

function displayGitHubError() {
    const currentUsername = window.PORTFOLIO_CONFIG?.github?.username || CONFIG.github.username;
    projectsGrid.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load GitHub repositories. Please check the username in the configuration.</p>
            <p style="font-size: 0.9rem; margin-top: 1rem; color: var(--text-light);">
                Current username: <strong>${currentUsername}</strong>
            </p>
        </div>
    `;
}

// Language colors for GitHub repositories
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'C++': '#f34b7d',
        'C': '#555555',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Ruby': '#701516',
        'Vue': '#2c3e50',
        'React': '#61dafb'
    };
    return colors[language] || '#586069';
}

// LinkedIn Integration with OAuth
async function fetchLinkedInData() {
    try {
        const config = window.PORTFOLIO_CONFIG?.linkedin;
        if (!config) {
            throw new Error('LinkedIn configuration not found');
        }

        // Check if we have an access token stored
        const accessToken = localStorage.getItem('linkedin_access_token');
        
        if (accessToken) {
            // Fetch profile data with access token
            await fetchLinkedInProfile(accessToken);
        } else {
            // Check if we're returning from OAuth callback
            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get('code');
            
            if (authCode) {
                // Exchange authorization code for access token
                await exchangeCodeForToken(authCode);
            } else {
                // Show login button or use mock data
                displayLinkedInLoginOption();
            }
        }
        
    } catch (error) {
        console.error('Error with LinkedIn integration:', error);
        // Fallback to mock data
        displayLinkedInMockData();
    }
}

// LinkedIn OAuth login (make it globally accessible)
window.initiateLinkedInLogin = function() {
    const config = window.PORTFOLIO_CONFIG?.linkedin;
    if (!config) return;
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
        `scope=${encodeURIComponent(config.scope)}`;
    
    window.location.href = authUrl;
}

// Exchange authorization code for access token
async function exchangeCodeForToken(authCode) {
    const config = window.PORTFOLIO_CONFIG?.linkedin;
    if (!config) return;
    
    try {
        // Note: This should be done on a backend server for security
        // Client-side token exchange is not recommended for production
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: authCode,
                client_id: config.clientId,
                client_secret: config.clientSecret,
                redirect_uri: config.redirectUri
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to exchange code for token');
        }
        
        const tokenData = await response.json();
        localStorage.setItem('linkedin_access_token', tokenData.access_token);
        
        // Fetch profile data
        await fetchLinkedInProfile(tokenData.access_token);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        displayLinkedInMockData();
    }
}

// Fetch LinkedIn profile data
async function fetchLinkedInProfile(accessToken) {
    try {
        const response = await fetch('https://api.linkedin.com/v2/people/~?projection=(id,firstName,lastName,headline,summary,profilePicture(displayImage~:playableStreams))', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch LinkedIn profile');
        }
        
        const profileData = await response.json();
        
        // Transform LinkedIn API response to our format
        const transformedData = {
            name: `${profileData.firstName.localized.en_US} ${profileData.lastName.localized.en_US}`,
            headline: profileData.headline?.localized?.en_US || 'Professional',
            location: 'India', // LinkedIn API v2 doesn't provide location in lite profile
            summary: profileData.summary?.localized?.en_US || 'LinkedIn Professional',
            connections: 150, // Not available in lite profile
            profileUrl: window.PORTFOLIO_CONFIG?.linkedin?.profileUrl || '#',
            avatar: profileData.profilePicture?.displayImage?.elements?.[0]?.identifiers?.[0]?.identifier || 'https://via.placeholder.com/80x80/667eea/ffffff?text=N'
        };
        
        displayLinkedInProfile(transformedData);
        
        // Update connections count
        linkedinConnectionsCount.textContent = transformedData.connections;
        
        // Update LinkedIn link
        linkedinLink.href = transformedData.profileUrl;
        
    } catch (error) {
        console.error('Error fetching LinkedIn profile:', error);
        displayLinkedInMockData();
    }
}

// Display LinkedIn login option
function displayLinkedInLoginOption() {
    const linkedinHTML = `
        <div class="linkedin-login">
            <div style="text-align: center; padding: 2rem;">
                <i class="fab fa-linkedin" style="font-size: 3rem; color: #0077b5; margin-bottom: 1rem;"></i>
                <h3>Connect with LinkedIn</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                    Click below to fetch real LinkedIn profile data
                </p>
                <button onclick="initiateLinkedInLogin()" class="btn btn-primary" style="background: #0077b5; border: none;">
                    <i class="fab fa-linkedin"></i> Connect LinkedIn
                </button>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-light);">
                    Or view demo data below
                </p>
            </div>
        </div>
    `;
    
    linkedinCard.innerHTML = linkedinHTML;
    
    // Also show mock data as fallback
    setTimeout(() => {
        displayLinkedInMockData();
    }, 3000);
}

// Display mock LinkedIn data as fallback
function displayLinkedInMockData() {
    const config = window.PORTFOLIO_CONFIG?.linkedin?.mockData;
    const mockData = {
        name: 'Nisha Patwal',
        headline: config?.headline || 'B.Tech Student | Aspiring Software Developer',
        location: 'India',
        summary: config?.summary || 'Passionate B.Tech student with a strong interest in software development and emerging technologies. Currently exploring full-stack development and working on various projects to enhance my skills.',
        connections: config?.connections || 150,
        endorsements: config?.endorsements || 5,
        recommendations: config?.recommendations || 3,
        profileUrl: window.PORTFOLIO_CONFIG?.linkedin?.profileUrl || 'https://www.linkedin.com/in/nisha-patwal-286842333/',
        avatar: null // No image
    };
    
    displayLinkedInProfile(mockData);
    
    // Update connections count
    if (linkedinConnectionsCount) {
        linkedinConnectionsCount.textContent = mockData.connections;
    }
    
    // Update LinkedIn link
    if (linkedinLink) {
        linkedinLink.href = mockData.profileUrl;
    }
}

function displayLinkedInProfile(profileData) {
    const avatarHTML = profileData.avatar 
        ? `<img src="${profileData.avatar}" alt="${profileData.name}">`
        : `<div class="profile-placeholder">
               <div class="profile-initials">NP</div>
           </div>`;
    
    const linkedinHTML = `
        <div class="linkedin-profile">
            <div class="linkedin-avatar">
                ${avatarHTML}
            </div>
            <div class="linkedin-info">
                <h3>${profileData.name}</h3>
                <p><strong>${profileData.headline}</strong></p>
                <p><i class="fas fa-map-marker-alt"></i> ${profileData.location}</p>
            </div>
        </div>
        <div class="linkedin-summary">
            <p>${profileData.summary}</p>
        </div>
        <div class="linkedin-stats">
            <div class="linkedin-stat">
                <span class="linkedin-stat-number">${profileData.connections}+</span>
                <span class="linkedin-stat-label">Connections</span>
            </div>
            <div class="linkedin-stat">
                <span class="linkedin-stat-number">${profileData.endorsements || 5}</span>
                <span class="linkedin-stat-label">Endorsements</span>
            </div>
            <div class="linkedin-stat">
                <span class="linkedin-stat-number">${profileData.recommendations || 3}</span>
                <span class="linkedin-stat-label">Recommendations</span>
            </div>
        </div>
    `;
    
    if (linkedinCard) {
        linkedinCard.innerHTML = linkedinHTML;
    }
}

function displayLinkedInError() {
    linkedinCard.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load LinkedIn profile data.</p>
            <p style="font-size: 0.9rem; margin-top: 1rem; color: var(--text-light);">
                LinkedIn API requires OAuth authentication. Currently showing demo data.
            </p>
        </div>
    `;
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .highlight-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Fix h1 title display issue
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Display the greeting with name
        heroTitle.innerHTML = `Hi I'm Nisha`;
    }
});

// Web3 Geometric Shapes and Particles
function createWeb3Elements() {
    const hero = document.querySelector('.hero');
    
    // Create floating geometric shapes
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'web3-shapes';
    shapesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Create various Web3 shapes
    const shapes = ['cube', 'triangle', 'hexagon', 'diamond'];
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20 + 10;
        
        shape.className = `web3-shape ${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatWeb3 ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.6;
        `;
        
        if (shapeType === 'cube') {
            shape.style.background = `linear-gradient(45deg, ${color}, transparent)`;
            shape.style.border = `1px solid ${color}`;
            shape.style.borderRadius = '2px';
            shape.style.boxShadow = `0 0 10px ${color}`;
        } else if (shapeType === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.filter = `drop-shadow(0 0 5px ${color})`;
        } else if (shapeType === 'hexagon') {
            shape.style.background = color;
            shape.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
            shape.style.boxShadow = `0 0 10px ${color}`;
        } else if (shapeType === 'diamond') {
            shape.style.background = `linear-gradient(45deg, ${color}, transparent)`;
            shape.style.transform = 'rotate(45deg)';
            shape.style.border = `1px solid ${color}`;
            shape.style.boxShadow = `0 0 10px ${color}`;
        }
        
        shapesContainer.appendChild(shape);
    }
    
    // Create glowing particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'web3-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            animation: floatParticle ${Math.random() * 8 + 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(shapesContainer);
    hero.appendChild(particlesContainer);
}

// Add CSS for Web3 animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatWeb3 {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.6; 
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
            opacity: 0.8; 
        }
        50% { 
            transform: translateY(-10px) translateX(-10px) rotate(180deg); 
            opacity: 0.4; 
        }
        75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg); 
            opacity: 0.7; 
        }
    }
    
    @keyframes floatParticle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.8; 
        }
        33% { 
            transform: translateY(-15px) translateX(15px) scale(1.2); 
            opacity: 1; 
        }
        66% { 
            transform: translateY(-5px) translateX(-10px) scale(0.8); 
            opacity: 0.6; 
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for config.js to load, then initialize
    setTimeout(() => {
        // Update CONFIG with values from PORTFOLIO_CONFIG if available
        if (window.PORTFOLIO_CONFIG) {
            CONFIG.github.username = window.PORTFOLIO_CONFIG.github.username;
            CONFIG.linkedin.profileId = window.PORTFOLIO_CONFIG.linkedin.profileUrl;
        }
        
        // Create Web3 effects
        createWeb3Elements();
        
        // Fetch data from APIs
        fetchGitHubData();
        
        // Force LinkedIn data to load immediately with local image
        displayLinkedInMockData();
        
        // Profile placeholder is handled by CSS
        
        // Ensure GitHub link is set even if API fails
        if (githubLink && window.PORTFOLIO_CONFIG?.social?.github) {
            githubLink.href = window.PORTFOLIO_CONFIG.social.github;
        }
        
        // Add loading states
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    }, 100);
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling for API failures
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
    // You could show a user-friendly error message here
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Implement your analytics tracking here
    console.log('Event tracked:', eventName, properties);
}

// Track user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.project-link')) {
        trackEvent('project_link_clicked', {
            project: e.target.closest('.project-card')?.querySelector('.project-title')?.textContent
        });
    }
    
    if (e.target.matches('.social-link')) {
        trackEvent('social_link_clicked', {
            platform: e.target.querySelector('i')?.className
        });
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
