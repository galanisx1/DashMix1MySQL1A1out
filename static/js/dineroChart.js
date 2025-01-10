export function initdineroChart() {
    const ctx = document.getElementById('dineroChart').getContext('2d');

    ctx.canvas.style.width = '800px';
    ctx.canvas.style.height = '400px';

    let chartInstance = null;

    function getRandomDinero() {
        return (Math.random() * (2000 - 100) + 100).toFixed(2);
    }

    function getFormattedDateTime() {
        const now = new Date();
        return now.toLocaleString();
    }

    function updateChart(chart, newData) {
        chart.data.labels.push(getFormattedDateTime());
        chart.data.datasets[0].data.push(parseFloat(newData));

        while (chart.data.labels.length > 15) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update();
    }

    async function sendDineroData(value) {
        try {
            const response = await fetch('/save_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dinero: value }),
            });
            const result = await response.json();
            if (result.total_ventas) {
                updateTotalDisplay(result.total_ventas);
            }
            console.log('Data saved:', result.message);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    function updateTotalDisplay(total) {
        const statNumber = document.querySelector('.stat-card:first-child .stat-number');
        if (statNumber) {
            statNumber.textContent = new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(total);
        }
    }

    fetch('/get_dinero_data')
        .then(response => response.json())
        .then(data => {
            const limitedData = data.data.slice(-15); // Use only the last 15 entries
            const labels = limitedData.map(item => item.timestamp);
            const values = limitedData.map(item => item.value);

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Ventas ($)',
                        data: values,
                        borderColor: 'rgb(113, 70, 243)',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Tiempo'
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
                            min: 100,
                            max: 2000,
                            ticks: {
                                stepSize: 200
                            }
                        }
                    }
                }
            });

            setInterval(() => {
                const newValue = getRandomDinero();
                updateChart(chartInstance, newValue);
                sendDineroData(newValue);
            }, 2000);
        })
        .catch(error => console.error('Error fetching dinero data:', error));
}
