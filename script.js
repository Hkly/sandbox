// Color palette for the sandbox
const colors = [
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
];

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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSandbox();
    
    // Add reset button listener
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetSandbox);
});
