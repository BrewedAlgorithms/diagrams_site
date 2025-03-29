document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations but disable for feature explanations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        disable: window.innerWidth < 768 // Disable animations on mobile
    });
    
    // Make sure all feature explanations are visible
    document.querySelectorAll('.feature-explanation').forEach(element => {
        element.removeAttribute('data-aos');
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.display = 'block';
    });
    
    // Make all research graphs visible
    document.querySelectorAll('.research-graph').forEach(element => {
        element.removeAttribute('data-aos');
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.display = 'block';
    });
    
    // Initialize Mermaid
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
        }
    });
    
    // Add hover effects to diagram cards
    const diagramCards = document.querySelectorAll('.diagram-card');
    diagramCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add animation to the hero icons
    const heroIcons = document.querySelectorAll('.animation-container i');
    heroIcons.forEach((icon, index) => {
        // Initial positions
        const positions = [
            { x: 0, y: 0 },            // Center
            { x: 30, y: -60 },         // Top right
            { x: -30, y: -60 },        // Top left
            { x: 30, y: 60 },          // Bottom right
            { x: -30, y: 60 }          // Bottom left
        ];
        
        // Set initial position
        const pos = positions[index % positions.length];
        icon.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        
        // Add interactive hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = '#3498db';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            this.style.color = '';
        });
    });
    
    // Add sticky navigation
    const navbar = document.querySelector('.navbar');
    let sticky = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Research tabs functionality
    const researchTabs = document.querySelectorAll('.research-tabs li');
    if (researchTabs.length > 0) {
        researchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                researchTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab content
                const tabContents = document.querySelectorAll('.research-tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        window.addEventListener('scroll', function() {
            timelineItems.forEach(item => {
                const position = item.getBoundingClientRect();
                
                // If item is in viewport
                if (position.top < window.innerHeight - 100) {
                    item.classList.add('animate');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = parseFloat(statElement.textContent);
                    
                    animateValue(statElement, 0, targetValue, 2000);
                    observer.unobserve(statElement);
                }
            });
        }, options);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Function to animate number counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const isPercentage = element.textContent.includes('%');
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            element.textContent = isPercentage ? `${value}%` : value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // Initialize panzoom for diagrams if available
    const diagramElement = document.getElementById('diagram-element');
    if (diagramElement && typeof Panzoom !== 'undefined') {
        // Wait for mermaid to render before initializing panzoom
        setTimeout(function() {
            try {
                const panzoom = Panzoom(diagramElement, {
                    maxScale: 5,
                    minScale: 0.5
                });
                
                // Enable mouse wheel zooming
                diagramElement.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    const delta = e.deltaY;
                    
                    if (delta > 0) {
                        panzoom.zoomOut(0.2, {
                            animate: false
                        });
                    } else {
                        panzoom.zoomIn(0.2, {
                            animate: false
                        });
                    }
                });
                
                // Set initial scale
                panzoom.zoom(1.0);
                
                // Add zoom control buttons
                const zoomIn = document.getElementById('zoom-in');
                const zoomOut = document.getElementById('zoom-out');
                const resetZoom = document.getElementById('reset-zoom');
                
                if (zoomIn) {
                    zoomIn.addEventListener('click', function() {
                        panzoom.zoomIn();
                    });
                }
                
                if (zoomOut) {
                    zoomOut.addEventListener('click', function() {
                        panzoom.zoomOut();
                    });
                }
                
                if (resetZoom) {
                    resetZoom.addEventListener('click', function() {
                        panzoom.reset();
                    });
                }
                
                // Change cursor on diagram element
                diagramElement.style.cursor = 'grab';
                
                diagramElement.addEventListener('mousedown', function() {
                    this.style.cursor = 'grabbing';
                });
                
                diagramElement.addEventListener('mouseup', function() {
                    this.style.cursor = 'grab';
                });
            } catch (error) {
                console.log("Panzoom initialization error:", error);
            }
        }, 1000); // Give mermaid time to render
    }
}); 