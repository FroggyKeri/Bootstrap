import Chart from 'chart.js/auto'
import 'bootstrap';


//sidebar & up-to-top button
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};


//Chart

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


