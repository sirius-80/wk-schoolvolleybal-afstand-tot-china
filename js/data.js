// Data management for fundraising visualization

const TOTAL_DISTANCE_KM = 8000; // Approximate distance Netherlands to China

// Country positions along the flight path (as percentage of total distance)
const COUNTRIES = [
    { name: 'Nederland', start: 0, end: 8 },
    { name: 'Duitsland', start: 8, end: 18 },
    { name: 'Polen', start: 18, end: 28 },
    { name: 'Rusland', start: 28, end: 70 },
    { name: 'Mongolië', start: 70, end: 90 },
    { name: 'China', start: 90, end: 100 }
];

/**
 * Fetch fundraising data from JSON file
 */
async function fetchFundraisingData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Kon data niet laden');
        }
        const data = await response.json();
        return data.fundraising;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return default values if fetch fails
        return {
            huidigBedrag: 0,
            doelBedrag: 41500,
            laatstBijgewerkt: new Date().toISOString().split('T')[0]
        };
    }
}

/**
 * Calculate the percentage of goal reached
 */
function calculatePercentage(current, goal) {
    return Math.min((current / goal) * 100, 100);
}

/**
 * Calculate kilometers traveled based on fundraising progress
 */
function calculateKilometers(current, goal) {
    const percentage = calculatePercentage(current, goal);
    return Math.round((percentage / 100) * TOTAL_DISTANCE_KM);
}

/**
 * Determine which country the plane is currently over
 */
function getCurrentCountry(percentage) {
    for (const country of COUNTRIES) {
        if (percentage >= country.start && percentage < country.end) {
            return country.name;
        }
    }
    return 'China'; // If at or past 100%
}

/**
 * Format currency for display
 */
function formatCurrency(amount) {
    return '€ ' + amount.toLocaleString('nl-NL');
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Update the UI with fundraising data
 */
function updateUI(data) {
    const percentage = calculatePercentage(data.huidigBedrag, data.doelBedrag);
    const kilometers = calculateKilometers(data.huidigBedrag, data.doelBedrag);

    // Update amount raised
    document.getElementById('amountRaised').textContent = formatCurrency(data.huidigBedrag);

    // Update percentage
    document.getElementById('percentage').textContent = Math.round(percentage) + '%';

    // Update kilometers traveled
    document.getElementById('kmTraveled').textContent = kilometers.toLocaleString('nl-NL') + ' km';

    // Update last update date
    document.getElementById('lastUpdate').textContent = formatDate(data.laatstBijgewerkt);

    // Return data for animation
    return {
        percentage,
        kilometers
    };
}

/**
 * Animate numbers counting up
 */
function animateNumber(element, start, end, duration = 1500) {
    const startTime = performance.now();
    const isEuro = element.id === 'amountRaised';
    const isKm = element.id === 'kmTraveled';

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);

        if (isEuro) {
            element.textContent = formatCurrency(current);
        } else if (isKm) {
            element.textContent = current.toLocaleString('nl-NL') + ' km';
        } else {
            element.textContent = current + '%';
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Initialize the application
 */
async function init() {
    const data = await fetchFundraisingData();
    const animationData = updateUI(data);

    // Animate numbers
    setTimeout(() => {
        animateNumber(document.getElementById('amountRaised'), 0, data.huidigBedrag, 2000);
        animateNumber(document.getElementById('percentage'), 0, Math.round(animationData.percentage), 2000);
        animateNumber(document.getElementById('kmTraveled'), 0, animationData.kilometers, 2000);
    }, 300);

    // Start plane animation
    if (window.animatePlane) {
        window.animatePlane(animationData.percentage);
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
