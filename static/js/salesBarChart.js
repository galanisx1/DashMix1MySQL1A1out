export function initSalesBarChart() {
    const ctx = document.getElementById('salesBarChart').getContext('2d');

    // Set canvas size dynamically
    ctx.canvas.style.width = '800px';
    ctx.canvas.style.height = '400px';

    const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sem 6', 'Sem 7', 'Sem 8', 'Sem 9'],
            datasets: [{
                label: 'Ventas',
                data: [25000, 38000, 60000, 45000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Adjust aspect ratio
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Semanas'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ventas ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    console.log('Sales bar chart initialized');
}

