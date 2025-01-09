// calculations.js
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('es-MX').format(number);
}

function updateStats() {
    fetch('/get_dinero_data')
        .then(response => response.json())
        .then(data => {
            // Actualizar el número de eventos graficados
            const totalEvents = data.data.length + 1;
            const totalSalesElement = document.querySelector('.stat-card:nth-child(1) .stat-number');
            const totalSalesChangeElement = document.querySelector('.stat-card:nth-child(1) .stat-change');

            // Actualizar número de eventos graficados (Clientes por Semana)
            const weeklyOrders = document.querySelector('.stat-card:nth-child(2) .stat-number');
            if (weeklyOrders) {
                weeklyOrders.textContent = formatNumber(totalEvents);
            }

            // Calcular y actualizar el porcentaje de cambio
            if (data.data.length >= 2) {
                const lastTwoValues = data.data.slice(-2);
                const percentageChange = ((lastTwoValues[1].value - lastTwoValues[0].value) / lastTwoValues[0].value) * 100;

                // Actualizar el cambio porcentual en eventos graficados
                const customersChange = document.querySelector('.stat-card:nth-child(2) .stat-change');
                if (customersChange) {
                    customersChange.textContent = `${percentageChange >= 0 ? 'Increased' : 'Decreased'} by ${Math.abs(percentageChange).toFixed(1)}%`;
                }
            }

            if (data.data.length > 0) {
                // Obtener las ventas actuales (último dato) y el penúltimo para calcular el cambio
                const lastValue = data.data[data.data.length - 1].value;
                const previousValue = data.data.length > 1 ? data.data[data.data.length - 2].value : lastValue;
                
                // Calcular el cambio porcentual
                if (totalSalesChangeElement) {
                    const percentageChange = ((lastValue - previousValue) / previousValue) * 100;
                    totalSalesChangeElement.textContent = `${
                        percentageChange >= 0 ? 'Increased' : 'Decreased'
                    } by ${Math.abs(percentageChange).toFixed(1)}%`;
                }
            }
            
        
        })
        .catch(error => console.error('Error updating stats:', error));
}

export function initCalculations() {
    updateStats();
    setInterval(updateStats, 2000);
}

export { updateStats };