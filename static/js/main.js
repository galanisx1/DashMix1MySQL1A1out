import { initdineroChart } from './dineroChart.js';
import { initCalculations } from './calculations.js';
import { initSalesBarChart } from './salesBarChart.js'; // Importar la función

document.addEventListener('DOMContentLoaded', () => {
    initdineroChart();
    initCalculations();
    initSalesBarChart(); // Inicializar el gráfico de ventas
});

// Toggle sidebar menu items
document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function(e) {
    console.log('Searching for:', e.target.value);
});

// Notification interactions
document.querySelectorAll('.nav-right i').forEach(icon => {
    icon.addEventListener('click', function() {
        console.log('Notification clicked');
    });
});
