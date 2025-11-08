// Plane animation along the flight path

/**
 * Get a point along an SVG path at a given percentage
 */
function getPointAtPercentage(path, percentage) {
    const length = path.getTotalLength();
    const point = path.getPointAtLength((percentage / 100) * length);
    return point;
}

/**
 * Calculate the angle/rotation for the plane based on path direction
 */
function getAngleAtPercentage(path, percentage) {
    const length = path.getTotalLength();
    const point1 = path.getPointAtLength((percentage / 100) * length);
    const point2 = path.getPointAtLength(Math.min(((percentage + 0.1) / 100) * length, length));

    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
    return angle;
}

/**
 * Animate the plane along the flight path
 */
function animatePlane(targetPercentage) {
    const plane = document.getElementById('plane');
    const path = document.getElementById('flightPath');
    const vizContainer = document.getElementById('vizContainer');

    if (!plane || !path) {
        console.error('Plane or path element not found');
        return;
    }

    // Set up Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });

    observer.observe(vizContainer);

    function startAnimation() {
        const duration = 2500; // Animation duration in ms
        const startTime = performance.now();
        const startPercentage = 0;

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth takeoff and landing
            const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const currentPercentage = startPercentage + (targetPercentage - startPercentage) * easeInOutCubic;

            // Get position and angle at current percentage
            const point = getPointAtPercentage(path, currentPercentage);
            const angle = getAngleAtPercentage(path, currentPercentage);

            // Update plane position and rotation
            plane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Add floating animation class when done
                plane.classList.add('plane-flying');
            }
        }

        // Start the animation
        requestAnimationFrame(animate);
    }
}

/**
 * Create a subtle pulsing effect for the destination marker
 */
function animateDestination() {
    const endLocation = document.getElementById('endLocation');
    if (endLocation) {
        setInterval(() => {
            endLocation.style.opacity = '0.7';
            setTimeout(() => {
                endLocation.style.opacity = '1';
            }, 1000);
        }, 2000);
    }
}

/**
 * Add parallax effect to country labels on mouse move
 */
function addParallaxEffect() {
    const vizContainer = document.getElementById('vizContainer');
    const countryLabels = document.querySelectorAll('.country-label');

    if (window.innerWidth > 768) { // Only on larger screens
        vizContainer.addEventListener('mousemove', (e) => {
            const rect = vizContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            countryLabels.forEach((label, index) => {
                const speed = (index + 1) * 2;
                const translateX = x * speed;
                const translateY = y * speed;
                label.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });

        vizContainer.addEventListener('mouseleave', () => {
            countryLabels.forEach(label => {
                label.style.transform = 'translate(0, 0)';
            });
        });
    }
}

/**
 * Animate the flight path drawing in
 */
function animateFlightPath() {
    const flightPath = document.getElementById('flightPath');
    if (!flightPath) return;

    const length = flightPath.getTotalLength();

    // Set up the starting position
    flightPath.style.strokeDasharray = length;
    flightPath.style.strokeDashoffset = length;
    flightPath.style.transition = 'stroke-dashoffset 1.5s ease-in-out';

    // Trigger the animation after a brief delay
    setTimeout(() => {
        flightPath.style.strokeDashoffset = '0';
    }, 200);
}

// Make animatePlane available globally for data.js
window.animatePlane = animatePlane;

// Initialize additional animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animateFlightPath();
        animateDestination();
        addParallaxEffect();
    });
} else {
    animateFlightPath();
    animateDestination();
    addParallaxEffect();
}
