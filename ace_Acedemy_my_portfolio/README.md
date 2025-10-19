# 🌟 Nisha's Portfolio Website

A modern, responsive portfolio website for Nisha, a B.Tech student, featuring GitHub API integration to showcase latest projects and LinkedIn integration for professional information.

## ✨ Features

- **Modern Design**: Clean, professional, and mobile-responsive design
- **GitHub Integration**: Automatically fetches and displays latest repositories
- **LinkedIn Integration**: Shows professional profile information
- **Interactive UI**: Smooth animations and transitions
- **Responsive Layout**: Works perfectly on all devices
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Fast Loading**: Optimized images and lazy loading
- **Contact Form**: Functional contact form for inquiries

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com) *(Update with actual URL)*

## 📸 Screenshots

### Desktop View
![Desktop Screenshot](https://via.placeholder.com/800x600/667eea/ffffff?text=Desktop+View)

### Mobile View
![Mobile Screenshot](https://via.placeholder.com/400x800/667eea/ffffff?text=Mobile+View)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: GitHub REST API, LinkedIn API
- **Fonts**: Google Fonts (Inter)
- **Icons**: Font Awesome
- **Animations**: CSS Animations & Intersection Observer API

## 📋 Prerequisites

- A modern web browser
- GitHub account (for API integration)
- LinkedIn account (for profile integration)
- Basic knowledge of HTML/CSS/JavaScript (for customization)

## 🔧 Setup Instructions

### 1. Clone or Download

```bash
git clone https://github.com/your-username/nisha-portfolio.git
cd nisha-portfolio
```

Or download the ZIP file and extract it.

### 2. Configure Personal Information

Edit the `config.js` file and update the following:

```javascript
const PORTFOLIO_CONFIG = {
    personal: {
        name: 'Your Name',
        title: 'Your Title',
        email: 'your.email@example.com',
        phone: '+91 your-phone-number',
        location: 'Your Location',
        // ... other personal info
    },
    
    github: {
        username: 'your-github-username', // IMPORTANT: Replace this
    },
    
    linkedin: {
        profileUrl: 'https://linkedin.com/in/your-profile',
    },
    
    // ... other configurations
};
```

### 3. Update GitHub Integration

In `script.js`, make sure the GitHub username is correctly set:

```javascript
const CONFIG = {
    github: {
        username: 'your-actual-github-username', // Replace this
        apiUrl: 'https://api.github.com'
    }
};
```

### 4. Customize Content

Update the following files with your information:

- **index.html**: Update meta tags, title, and any hardcoded content
- **styles.css**: Customize colors, fonts, or layout if needed
- **script.js**: Modify API endpoints or add custom functionality

### 5. Add Your Images

Replace placeholder images with your actual photos:

- Profile image in the hero section
- Any project screenshots
- Favicon (create a `favicon.ico` file)

### 6. Deploy

Choose one of these deployment options:

#### Option A: GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

#### Option B: Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed automatically

#### Option C: Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy with one click

#### Option D: Local Development
Simply open `index.html` in your web browser for local testing.

## 🔑 API Configuration

### GitHub API

The portfolio uses GitHub's public API to fetch repository data. No authentication is required for public repositories, but you're limited to 60 requests per hour.

**To increase the rate limit:**
1. Create a GitHub Personal Access Token
2. Add it to the API requests (see GitHub API documentation)

### LinkedIn API

LinkedIn API has strict requirements and requires OAuth authentication. The current implementation uses mock data for demonstration.

**To implement real LinkedIn integration:**
1. Register your application with LinkedIn
2. Implement OAuth 2.0 flow
3. Replace mock data with actual API calls

## 🎨 Customization

### Colors
Update CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... other colors */
}
```

### Fonts
Change the Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Layout
Modify the CSS Grid and Flexbox layouts in `styles.css` to change the structure.

## 📱 Mobile Responsiveness

The portfolio is fully responsive and includes:
- Mobile-first design approach
- Hamburger menu for mobile navigation
- Optimized touch targets
- Responsive typography and spacing

## 🔍 SEO Optimization

The portfolio includes:
- Semantic HTML structure
- Meta tags for social sharing
- Structured data markup
- Optimized images with alt text
- Fast loading performance

## 🚀 Performance Features

- **Lazy Loading**: Images load only when needed
- **Intersection Observer**: Animations trigger when elements are visible
- **Optimized CSS**: Minimal and efficient stylesheets
- **Compressed Assets**: Optimized images and fonts

## 🐛 Troubleshooting

### Common Issues

1. **GitHub repositories not loading**
   - Check if the username in `config.js` is correct
   - Ensure the GitHub profile is public
   - Check browser console for API errors

2. **Styling issues**
   - Clear browser cache
   - Check if all CSS files are loading
   - Verify file paths are correct

3. **Mobile menu not working**
   - Ensure JavaScript is enabled
   - Check if `script.js` is loading properly

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/nisha-portfolio/issues).

## 📞 Support

If you need help setting up the portfolio, feel free to:
- Open an issue on GitHub
- Contact via email: your.email@example.com

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com) for icons
- [Google Fonts](https://fonts.google.com) for typography
- [GitHub API](https://docs.github.com/en/rest) for repository data
- Inspiration from various portfolio designs

## 📈 Future Enhancements

- [ ] Dark mode toggle
- [ ] Blog section
- [ ] Project filtering
- [ ] Resume download
- [ ] Contact form backend
- [ ] Real LinkedIn API integration
- [ ] Performance analytics
- [ ] PWA capabilities

---

**Made with ❤️ by Nisha**

*Last updated: October 2024*
