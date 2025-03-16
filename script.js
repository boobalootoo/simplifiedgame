// Generate a unique ID for the user’s device
function getDeviceID() {
    let deviceID = localStorage.getItem("deviceID");
    if (!deviceID) {
        deviceID = "device-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("deviceID", deviceID);
    }
    return deviceID;
}

// Function to save the record
function saveRecord(record) {
    console.log("Submitting record:", record);
    fetch("https://script.google.com/macros/s/AKfycbwsG06dGQsqT_22efWAZn9RtadK3JKAoINByzP1KLosycvC-Mv2q0S6Se4fdA84tF9pTw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
    })
    .then(() => alert("Data submitted successfully!"))
    .catch(error => console.error("Error:", error));
}

// Attach event listener to the table using event delegation
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("species-records");
    const addRowBtn = document.querySelector(".add-row");

    table.addEventListener("click", function(event) {
        if (event.target.classList.contains("submit-btn")) {
            console.log("Submit button clicked!"); // Debugging

            const row = event.target.closest("tr");
            const username = row.cells[0].querySelector("input").value.trim();
            const species = row.cells[1].querySelector("input").value.trim();
            const date = row.cells[2].querySelector("input").value.trim();
            const place = row.cells[3].querySelector("input").value.trim();

            // Ensure all fields are filled
            if (!username || !species || !date || !place) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            const deviceID = getDeviceID();
            const record = { username, deviceID, species, date, place };
            saveRecord(record);
        } else if (event.target.classList.contains("date-btn")) {
            getDate(event.target);
        } else if (event.target.classList.contains("location-btn")) {
            getLocation(event.target);
        }
    });

    // Function to add a new row
    addRowBtn.addEventListener("click", function() {
        console.log("Adding a new row"); // Debugging
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" placeholder="Enter username"></td>
            <td><input type="text" placeholder="Species you think it is"></td>
            <td><input type="text" class="date" placeholder="Enter manually"> <button class="button date-btn">USE DEVICE DATE</button></td>
            <td><input type="text" class="place" placeholder="Enter manually"> <button class="button location-btn">USE DEVICE LOCATION</button></td>
            <td><button class="button submit-btn">SUBMIT</button></td>
        `;
        table.appendChild(newRow);
    });
});

// Function to get the current date
function getDate(button) {
    button.previousElementSibling.value = new Date().toISOString().split("T")[0];
}

// Function to get the device location
function getLocation(button) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            button.previousElementSibling.value = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
