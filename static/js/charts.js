// Configuración de las gráficas
class ChartManager {
    constructor() {
        this.kwhChart = null;
        this.waterChart = null;
        this.salesChart = null;
        this.salesBarChart = null;
        this.dineroChart = null;
        
        // Wait for DOM to be fully loaded before initializing charts
        console.log(document.getElementById('salesBarChart'));
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeCharts());
        } else {
            this.initializeCharts();
        }
        this.startUpdates();
        }

    initializeCharts() {
    console.log("Initializing all charts...");
    this.initKwhChart();
    console.log("Kwh chart initialized");
    this.initWaterChart();
    console.log("Water chart initialized");
    this.initSalesChart();
    console.log("Sales chart initialized");
    this.initSalesBarChart();
    console.log("SalesBar chart initialized");
    this.initdineroChart();
    console.log("Dinero chart initialized");
    }

           
    initKwhChart() {
        const ctxKwh = document.getElementById('kwhChart').getContext('2d');
        const kwhData = {
            labels: [],
            datasets: [{
                label: 'Consumo de kWh',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            }]
        };

        this.kwhChart = new Chart(ctxKwh, {
            type: 'line',
            data: kwhData,
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
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initWaterChart() {
        const ctxWater = document.getElementById('waterChart').getContext('2d');
        const waterData = {
            labels: [],
            datasets: [{
                label: 'Consumo de m³ de Agua',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            }]
        };

        this.waterChart = new Chart(ctxWater, {
            type: 'line',
            data: waterData,
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
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initSalesChart() {
        const ctxSales = document.getElementById('salesChart').getContext('2d');
        const salesData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            datasets: [{
                label: 'Ventas ($)',
                data: [10, 30, 40, 50, 40, 30],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            }]
        };

        this.salesChart = new Chart(ctxSales, {
            type: 'line',
            data: salesData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Monto ($)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    
   


    initdineroChart() {
        const ctxdinero = document.getElementById('dineroChart').getContext('2d');
        const dineroData = {
            labels: [],
            datasets: [{
                label: 'Ventas de Punto de Venta1',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4,
            }]
        };

        this.dineroChart = new Chart(ctxdinero, {
            type: 'line',
            data: dineroData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '$$$$'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }


    getRandomKwh() {
        return (Math.random() * 2 + 1).toFixed(2); // Entre 1 y 3 kWh
    }

    getRandomWater() {
        return (Math.random() * 10 + 5).toFixed(2); // Entre 5 y 15 m³
    }

    getRandomdinero() {
        return (Math.random() * (1500 - 100) + 100).toFixed(2); // Entre 100 y 1500
    }

    updateKwhChart() {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        const data = this.kwhChart.data;

        if (data.labels.length >= 10) {
            data.labels.shift();
            data.datasets[0].data.shift();
        }

        data.labels.push(timeLabel);
        data.datasets[0].data.push(this.getRandomKwh());

        this.kwhChart.update();
    }

    updateWaterChart() {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        const data = this.waterChart.data;

        if (data.labels.length >= 10) {
            data.labels.shift();
            data.datasets[0].data.shift();
        }

        data.labels.push(timeLabel);
        data.datasets[0].data.push(this.getRandomWater());

        this.waterChart.update();
    }

    updatedineroChart() {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        const data = this.dineroChart.data;

        if (data.labels.length >= 10) {
            data.labels.shift();
            data.datasets[0].data.shift();
        }

        data.labels.push(timeLabel);
        data.datasets[0].data.push(this.getRandomdinero());

        this.dineroChart.update();
    }

    startUpdates() {
        // Actualizar la gráfica de kWh cada 2 segundos
        setInterval(() => this.updateKwhChart(), 2000);

        // Actualizar la gráfica de agua cada 5 segundos
        setInterval(() => this.updateWaterChart(), 5000);

        // Actualizar la gráfica de kWh cada 2 segundos
        setInterval(() => this.updatedineroChart(), 2000);
    }
}

async function sendChartData(chartData) {
    try {
        const response = await fetch('/save_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chartData),
        });
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function updateAndSendData() {
    const kwhValue = generateRandomValue(100, 200); // Valor dinámico de kWh
    const waterValue = generateRandomValue(20, 50); // Valor dinámico de Agua m³
    //const dineroValue = generateRandomValue(1, 2000); // Valor dinámico de Dinero

    // Actualizar las gráficas aquí si es necesario
    // ...

    // Enviar los datos al servidor
    const data = {
        kwh: kwhValue,
        water: waterValue,
        dinero: dineroValue
    };

    fetch('/save_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => console.log(result.message))
        .catch(error => console.error('Error sending data:', error));
}


function updateKwhTable() {
    fetch('/get_kwh_data')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('kwhTable');
            table.innerHTML = ''; // Limpiar la tabla antes de actualizar

            data.data.forEach(entry => {
                const row = document.createElement('tr');
                const timestampCell = document.createElement('td');
                const valueCell = document.createElement('td');

                timestampCell.textContent = entry.timestamp;
                valueCell.textContent = entry.value.toFixed(2);

                row.appendChild(timestampCell);
                row.appendChild(valueCell);
                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching kWh data:', error));
}

// Enviar datos cada 5 segundos
setInterval(updateAndSendData, 2000);


// Inicializar cuando el documento esté listo
// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChartManager();
});