export function initWaterChart() {
    const ctx = document.getElementById('waterChart').getContext('2d');

    // Obtener datos dinámicos desde el backend
    fetch('/get_water_data')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(item => item.timestamp);
            const values = data.data.map(item => item.value);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Consumo de Agua (m³)',
                        data: values,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Tiempo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'm³'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching water data:', error));
}
