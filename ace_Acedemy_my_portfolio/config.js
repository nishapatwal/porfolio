// Portfolio Configuration
// Update these values with Nisha's actual information

const PORTFOLIO_CONFIG = {
    // Personal Information
    personal: {
        name: 'Nisha',
        title: 'B.Tech Student & Aspiring Developer',
        email: 'nisha@example.com',
        phone: '+91 12345 67890',
        location: 'India',
        bio: 'Passionate about technology and innovation. Currently pursuing B.Tech and building amazing projects that solve real-world problems.',
        profileImage: null // No image
    },

    // GitHub Configuration
    github: {
        username: 'nishapatwal', // Actual GitHub username (case-sensitive)
        showPrivateRepos: false,
        maxRepos: 6,
        sortBy: 'updated' // options: 'updated', 'created', 'pushed', 'full_name'
    },

    // LinkedIn Configuration
    linkedin: {
        clientId: '78tia1op51hk05',
        clientSecret: 'WPL_AP1.TFGaZriZ8CiMsRA0.tH1jzA==', // WARNING: Should be stored securely on backend
        redirectUri: window.location.origin + '/auth/linkedin/callback',
        scope: 'r_liteprofile r_emailaddress',
        profileUrl: 'https://www.linkedin.com/in/nisha-patwal-286842333/',
        // Fallback mock data
        mockData: {
            headline: 'B.Tech Student | Aspiring Software Developer',
            summary: 'Passionate B.Tech student with a strong interest in software development and emerging technologies. Currently exploring full-stack development and working on various projects to enhance my skills.',
            connections: 150,
            endorsements: 5,
            recommendations: 3
        }
    },

    // Social Media Links
    social: {
        github: 'https://github.com/nishapatwal',
        linkedin: 'https://www.linkedin.com/in/nisha-patwal-286842333/',
        email: 'mailto:nisha@example.com',
        twitter: 'https://twitter.com/nisha-twitter', // Optional
        instagram: 'https://instagram.com/nisha-instagram' // Optional
    },

    // Skills Configuration
    skills: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Bootstrap', 'Tailwind CSS'],
        backend: ['Node.js', 'Python', 'Express', 'Django', 'MongoDB', 'MySQL', 'PostgreSQL'],
        tools: ['Git', 'Docker', 'AWS', 'Figma', 'Postman', 'VS Code', 'Linux'],
        languages: ['JavaScript', 'Python', 'Java', 'C++', 'SQL']
    },

    // Education
    education: {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science Engineering',
        university: 'Your University Name',
        year: '2021-2025', // Update with actual years
        cgpa: '8.5/10' // Optional
    },

    // Theme Configuration
    theme: {
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        accentColor: '#f093fb',
        darkMode: false // Set to true for dark theme
    },

    // API Configuration
    api: {
        github: {
            baseUrl: 'https://api.github.com',
            rateLimit: 60 // requests per hour for unauthenticated requests
        },
        // Add other API configurations here
    },

    // SEO Configuration
    seo: {
        title: 'Nisha - B.Tech Student Portfolio',
        description: 'Portfolio of Nisha, a passionate B.Tech student and aspiring developer showcasing projects and skills.',
        keywords: ['portfolio', 'developer', 'student', 'projects', 'web development'],
        author: 'Nisha',
        ogImage: 'https://via.placeholder.com/1200x630/667eea/ffffff?text=Nisha+Portfolio' // Replace with actual OG image
    },

    // Analytics (Optional)
    analytics: {
        googleAnalyticsId: '', // Add your GA4 ID if you want analytics
        hotjarId: '' // Add Hotjar ID if you want heatmaps
    },

    // Contact Form Configuration
    contact: {
        // For a real contact form, you'll need a backend service
        // Options: Formspree, Netlify Forms, EmailJS, etc.
        formspreeEndpoint: '', // Add your Formspree endpoint
        emailjsServiceId: '', // Add EmailJS service ID
        emailjsTemplateId: '', // Add EmailJS template ID
        emailjsUserId: '' // Add EmailJS user ID
    },

    // Feature Flags
    features: {
        darkModeToggle: true,
        contactForm: true,
        blogSection: false,
        testimonials: false,
        downloadResume: true,
        animations: true,
        particles: true
    }
};

// Export configuration (for use in other files)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
}

// Make it available globally
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
