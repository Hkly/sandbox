// Theme configurations
const themes = {
    default: {
        name: 'Purple Wave',
        bgGradient: ['#667eea', '#764ba2'],
        btnGradient: ['#667eea', '#764ba2'],
        colors: [
            '#f0f0f0', // Default gray
            '#FFD700', // Gold (sand)
            '#DEB887', // Burlywood (light sand)
            '#F4A460', // Sandy brown
            '#D2691E', // Chocolate (wet sand)
            '#87CEEB', // Sky blue
            '#4169E1', // Royal blue
            '#32CD32', // Lime green
            '#FF6347', // Tomato
            '#FF69B4', // Hot pink
            '#9370DB', // Medium purple
            '#FF8C00'  // Dark orange
        ]
    },
    ocean: {
        name: 'Ocean Breeze',
        bgGradient: ['#1e3c72', '#2a5298'],
        btnGradient: ['#1e3c72', '#2a5298'],
        colors: [
            '#f0f0f0', // Default gray
            '#00CED1', // Dark turquoise
            '#20B2AA', // Light sea green
            '#4682B4', // Steel blue
            '#5F9EA0', // Cadet blue
            '#87CEEB', // Sky blue
            '#00BFFF', // Deep sky blue
            '#1E90FF', // Dodger blue
            '#0000CD', // Medium blue
            '#4169E1', // Royal blue
            '#000080', // Navy
            '#191970'  // Midnight blue
        ]
    },
    sunset: {
        name: 'Sunset Glow',
        bgGradient: ['#ff6b6b', '#ffd93d'],
        btnGradient: ['#ff6b6b', '#ffd93d'],
        colors: [
            '#f0f0f0', // Default gray
            '#FFD700', // Gold
            '#FFA500', // Orange
            '#FF8C00', // Dark orange
            '#FF7F50', // Coral
            '#FF6347', // Tomato
            '#FF4500', // Orange red
            '#DC143C', // Crimson
            '#FF1493', // Deep pink
            '#FF69B4', // Hot pink
            '#FFB6C1', // Light pink
            '#FFFFE0'  // Light yellow
        ]
    },
    forest: {
        name: 'Forest Green',
        bgGradient: ['#134e5e', '#71b280'],
        btnGradient: ['#134e5e', '#71b280'],
        colors: [
            '#f0f0f0', // Default gray
            '#228B22', // Forest green
            '#32CD32', // Lime green
            '#00FF00', // Lime
            '#7FFF00', // Chartreuse
            '#ADFF2F', // Green yellow
            '#9ACD32', // Yellow green
            '#6B8E23', // Olive drab
            '#556B2F', // Dark olive green
            '#8FBC8F', // Dark sea green
            '#90EE90', // Light green
            '#98FB98'  // Pale green
        ]
    },
    candy: {
        name: 'Candy Pop',
        bgGradient: ['#ff9a9e', '#fecfef'],
        btnGradient: ['#ff9a9e', '#fecfef'],
        colors: [
            '#f0f0f0', // Default gray
            '#FF69B4', // Hot pink
            '#FF1493', // Deep pink
            '#FFB6C1', // Light pink
            '#FFC0CB', // Pink
            '#DDA0DD', // Plum
            '#EE82EE', // Violet
            '#DA70D6', // Orchid
            '#BA55D3', // Medium orchid
            '#9370DB', // Medium purple
            '#8A2BE2', // Blue violet
            '#9400D3'  // Dark violet
        ]
    }
};

// Current theme and colors
let currentTheme = 'default';
let colors = themes[currentTheme].colors;

// Initialize the grid
function initializeSandbox() {
    const grid = document.getElementById('sandboxGrid');
    const cellCount = 48; // 6x8 grid approximately
    
    // Clear existing cells
    grid.innerHTML = '';
    
    // Create cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'sandbox-cell';
        cell.dataset.colorIndex = '0';
        cell.style.backgroundColor = colors[0];
        
        // Add click event listener
        cell.addEventListener('click', () => {
            cycleColor(cell);
        });
        
        grid.appendChild(cell);
    }
}

// Cycle through colors when clicked
function cycleColor(cell) {
    let currentIndex = parseInt(cell.dataset.colorIndex);
    currentIndex = (currentIndex + 1) % colors.length;
    cell.dataset.colorIndex = currentIndex;
    cell.style.backgroundColor = colors[currentIndex];
}

// Reset all cells to default color
function resetSandbox() {
    const cells = document.querySelectorAll('.sandbox-cell');
    cells.forEach(cell => {
        cell.dataset.colorIndex = '0';
        cell.style.backgroundColor = colors[0];
    });
}

// Apply theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    currentTheme = themeName;
    colors = theme.colors;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-gradient-start', theme.bgGradient[0]);
    document.documentElement.style.setProperty('--bg-gradient-end', theme.bgGradient[1]);
    document.documentElement.style.setProperty('--btn-gradient-start', theme.btnGradient[0]);
    document.documentElement.style.setProperty('--btn-gradient-end', theme.btnGradient[1]);
    
    // Save theme preference
    localStorage.setItem('sandboxTheme', themeName);
    
    // Reset the grid to show new colors
    resetSandbox();
}

// Load saved theme or default
function loadTheme() {
    const savedTheme = localStorage.getItem('sandboxTheme');
    if (savedTheme && themes[savedTheme]) {
        currentTheme = savedTheme;
        document.getElementById('themeSelect').value = savedTheme;
        applyTheme(savedTheme);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSandbox();
    loadTheme();
    
    // Add reset button listener
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetSandbox);
    
    // Add theme selector listener
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
});
