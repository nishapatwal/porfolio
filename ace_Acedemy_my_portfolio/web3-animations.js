// Web3 3D Background Animations using Three.js
class Web3Background {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('bg-canvas'),
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Create particles
        this.createParticles();
        
        // Create floating geometries
        this.createFloatingGeometries();
        
        // Create connecting lines
        this.createConnectingLines();
    }

    createParticles() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const neonColors = [
            new THREE.Color(0x00ffff), // Cyan
            new THREE.Color(0xff00ff), // Magenta
            new THREE.Color(0x00ff41), // Green
            new THREE.Color(0x8a2be2), // Purple
            new THREE.Color(0x0080ff), // Blue
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            // Random neon colors
            const color = neonColors[Math.floor(Math.random() * neonColors.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingGeometries() {
        const geometryTypes = [
            new THREE.BoxGeometry(0.2, 0.2, 0.2),
            new THREE.OctahedronGeometry(0.15),
            new THREE.TetrahedronGeometry(0.15),
            new THREE.IcosahedronGeometry(0.12),
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x00ffff, 
                wireframe: true, 
                transparent: true, 
                opacity: 0.6 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xff00ff, 
                wireframe: true, 
                transparent: true, 
                opacity: 0.6 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x00ff41, 
                wireframe: true, 
                transparent: true, 
                opacity: 0.6 
            }),
        ];

        for (let i = 0; i < 20; i++) {
            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            // Add custom properties for animation
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatRange: Math.random() * 2 + 1
            };

            this.geometries.push(mesh);
            this.scene.add(mesh);
        }
    }

    createConnectingLines() {
        const lineCount = 50;
        
        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const pointCount = Math.floor(Math.random() * 5) + 3;
            
            for (let j = 0; j < pointCount; j++) {
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15
                ));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }

        // Animate floating geometries
        this.geometries.forEach((mesh, index) => {
            // Rotation
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            // Floating motion
            mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + index) * 0.01;
        });

        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll parallax effect
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (this.particles) {
                this.particles.rotation.z = scrollY * 0.0001;
            }
            
            this.geometries.forEach((mesh, index) => {
                mesh.position.y += Math.sin(scrollY * 0.001 + index) * 0.001;
            });
        });
    }
}

// Particle explosion effect for interactions
class ParticleExplosion {
    constructor(scene, position, color = 0x00ffff) {
        this.scene = scene;
        this.particles = [];
        this.createExplosion(position, color);
    }

    createExplosion(position, color) {
        const particleCount = 50;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = position.x;
            positions[i3 + 1] = position.y;
            positions[i3 + 2] = position.z;

            // Random velocity for explosion effect
            velocities.push({
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: color,
            size: 0.1,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        this.scene.add(points);

        // Animate explosion
        let opacity = 1;
        const animate = () => {
            const positions = points.geometry.attributes.position.array;
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;
            }
            
            points.geometry.attributes.position.needsUpdate = true;
            
            opacity -= 0.02;
            material.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                this.scene.remove(points);
            }
        };
        
        animate();
    }
}


// Crypto Ticker Animation
class CryptoTicker {
    constructor() {
        this.ticker = document.querySelector('.crypto-ticker');
        this.init();
    }

    init() {
        if (!this.ticker) return;

        // Simulate real-time price updates
        setInterval(() => {
            this.updatePrices();
        }, 5000);

        // Add click to hide/show
        this.ticker.addEventListener('click', () => {
            this.ticker.style.opacity = this.ticker.style.opacity === '0.3' ? '1' : '0.3';
        });
    }

    updatePrices() {
        const ethPrice = 2450.32 + (Math.random() - 0.5) * 100;
        const btcPrice = 43210.89 + (Math.random() - 0.5) * 1000;
        const ethChange = (Math.random() - 0.5) * 10;
        const btcChange = (Math.random() - 0.5) * 5;

        const ethDiv = this.ticker.children[0];
        const btcDiv = this.ticker.children[1];

        ethDiv.innerHTML = `ETH: $${ethPrice.toFixed(2)} <span style="color: ${ethChange > 0 ? 'var(--accent-neon)' : 'var(--orange-neon)'};">${ethChange > 0 ? '+' : ''}${ethChange.toFixed(1)}%</span>`;
        btcDiv.innerHTML = `BTC: $${btcPrice.toFixed(2)} <span style="color: ${btcChange > 0 ? 'var(--accent-neon)' : 'var(--orange-neon)'};">${btcChange > 0 ? '+' : ''}${btcChange.toFixed(1)}%</span>`;
    }
}

// Hamburger Menu Controller
class HamburgerMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = this.navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        // Observe all sections
        const sections = document.querySelectorAll('section, .highlight-item, .skill-category, .project-card');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize crypto ticker
    new CryptoTicker();

    // Initialize hamburger menu
    new HamburgerMenu();

    // Initialize scroll animations
    new ScrollAnimations();

    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
        const web3Background = new Web3Background();
        
        // Add click interactions for particle explosions
        document.addEventListener('click', (event) => {
            const position = new THREE.Vector3(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                0
            );
            
            // Convert screen coordinates to world coordinates
            position.unproject(web3Background.camera);
            position.multiplyScalar(2);
            
            new ParticleExplosion(web3Background.scene, position);
        });
        
        // Add enhanced hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .profile-card, .highlight-item, .skill-category, .contact-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.transition = 'all 0.3s ease';
                
                // Add particle explosion on hover
                const rect = element.getBoundingClientRect();
                const position = new THREE.Vector3(
                    ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1,
                    -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1,
                    0
                );
                position.unproject(web3Background.camera);
                position.multiplyScalar(1);
                
                new ParticleExplosion(web3Background.scene, position, 0x00ff41);
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
        
    } else {
        console.warn('Three.js not loaded. 3D animations disabled.');
    }

    // Add typing effect to hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Web3Background, ParticleExplosion };
}
