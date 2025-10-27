// Color palette for the sandbox
let colors = [
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

// Render the color palette swatches
function renderColorPalette() {
    const palette = document.getElementById('colorPalette');
    palette.innerHTML = '';
    
    colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        
        // Add remove button (but not for the first default color)
        if (index > 0) {
            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeColor(index);
            });
            swatch.appendChild(removeBtn);
        }
        
        palette.appendChild(swatch);
    });
}

// Add a new color to the palette
function addColor() {
    const colorInput = document.getElementById('colorInput');
    const newColor = colorInput.value.toUpperCase();
    
    // Check if color already exists
    if (colors.includes(newColor)) {
        alert('This color is already in the palette!');
        return;
    }
    
    colors.push(newColor);
    renderColorPalette();
    
    // Generate a new random color for the next selection
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    colorInput.value = randomColor;
}

// Remove a color from the palette
function removeColor(index) {
    if (index === 0) {
        alert('Cannot remove the default color!');
        return;
    }
    
    colors.splice(index, 1);
    renderColorPalette();
    
    // Update all cells that had a color index >= removed index
    const cells = document.querySelectorAll('.sandbox-cell');
    cells.forEach(cell => {
        let colorIndex = parseInt(cell.dataset.colorIndex);
        if (colorIndex === index) {
            // Reset to default if the cell was using the removed color
            cell.dataset.colorIndex = '0';
            cell.style.backgroundColor = colors[0];
        } else if (colorIndex > index) {
            // Adjust index for colors that were after the removed one
            cell.dataset.colorIndex = (colorIndex - 1).toString();
        }
    });
}

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
    renderColorPalette();
    initializeSandbox();
    
    // Add reset button listener
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetSandbox);
    
    // Add color picker listeners
    const addColorBtn = document.getElementById('addColorBtn');
    addColorBtn.addEventListener('click', addColor);
    
    // Allow Enter key to add color
    const colorInput = document.getElementById('colorInput');
    colorInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addColor();
        }
    });
});
