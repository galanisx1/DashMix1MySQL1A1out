import { initdineroChart } from './dineroChart.js';
import { initCalculations } from './calculations.js';
import { initSalesBarChart } from './salesBarChart.js'; // Importar la función

document.addEventListener('DOMContentLoaded', () => {
    initdineroChart();
    initCalculations();
    initSalesBarChart(); // Inicializar el gráfico de ventas
});

// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
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
    // Add search functionality here
    console.log('Searching for:', e.target.value);
});

// Notification interactions
document.querySelectorAll('.nav-right i').forEach(icon => {
    icon.addEventListener('click', function() {
        // Add notification handling here
        console.log('Notification clicked');
    });
});
