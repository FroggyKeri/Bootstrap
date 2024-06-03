import Chart from 'chart.js/auto';

async function fetchData() {
    const response = await fetch('./assets/plantData.txt');
    const text = await response.text();
    const lines = text.split('\n').filter(line => line && !line.startsWith('#'));
    const data = lines.map(line => {
        const [date, time, temp, light, soil, humidity] = line.split(' ');
        return {
            date: `${date} ${time}`,
            temp: parseFloat(temp),
            light: parseFloat(light),
            soil: parseFloat(soil),
            humidity: parseFloat(humidity)
        };
    });
    return data;
}

(async function() {
    const data = await fetchData();

    const ctx = document.getElementById('acquisitions').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(row => row.date),
            datasets: [
                {
                    label: 'Temperature (C)',
                    data: data.map(row => row.temp),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Light Level (%)',
                    data: data.map(row => row.light),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Soil Moisture (%)',
                    data: data.map(row => row.soil),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Air Humidity (%)',
                    data: data.map(row => row.humidity),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})();
