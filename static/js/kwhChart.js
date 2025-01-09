export function initKwhChart() {
    const ctx = document.getElementById('kwhChart').getContext('2d');

    // Obtener datos dinámicos desde el backend
    fetch('/get_kwh_data')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(item => item.timestamp);
            const values = data.data.map(item => item.value);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Consumo de kWh',
                        data: values,
                        borderColor: 'rgba(75, 192, 192, 1)',
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
                                text: 'kWh'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching kWh data:', error));
}
