document.getElementById('get-location').addEventListener('click', () => {
    const locationOutput = document.getElementById('location-output');
    locationOutput.textContent = "Fetching location...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationOutput.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            (error) => {
                locationOutput.textContent = "Unable to retrieve location.";
                console.error(error);
            }
        );
    } else {
        locationOutput.textContent = "Geolocation is not supported by this browser.";
    }
});

document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Booking confirmed!');
});
