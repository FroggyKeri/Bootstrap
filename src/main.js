import Chart from 'chart.js/auto'

const myRequest = new Request("/assets/plantData.json");
console.log(myRequest);

fetch(myRequest)
    .then((response) => {
        console.log(response);
        return response.json(); // Parse JSON data
    })
    .then((data) => {
        console.log(data); // Log the parsed JSON data

        // Extract labels and datasets
        const labels = data.map(entry => entry.date + " " + entry.time);
        const tempData = data.map(entry => entry.temp);
        const lightData = data.map(entry => entry.light);
        const moistureData = data.map(entry => entry.moisture);
        const humidityData = data.map(entry => entry.humidity);

        // Create a line chart using Chart.js
        new Chart(
            document.getElementById('acquisitions'),
            {
                type: 'line', // Change chart type to line
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: tempData,
                            borderColor: 'rgb(255, 99, 132)', // Red color
                            fill: false
                        },
                        {
                            label: 'Light',
                            data: lightData,
                            borderColor: 'rgb(255, 205, 86)', // Yellow color
                            fill: false
                        },
                        {
                            label: 'Moisture',
                            data: moistureData,
                            borderColor: 'rgb(54, 162, 235)', // Blue color
                            fill: false
                        },
                        {
                            label: 'Humidity (%)',
                            data: humidityData,
                            borderColor: 'rgb(75, 192, 192)', // Cyan color
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: true, // Enable auto-skipping of labels
                                maxTicksLimit: 10 // Maximum number of ticks to display
                                
                            }
                        }
                    }
                }
            }
        );
    })
    .catch((error) => {
        console.error('Error:', error);
    });


