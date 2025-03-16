document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("species-records");
    const addRowBtn = document.querySelector(".add-row");

    addRowBtn.addEventListener("click", function() {
        console.log("Adding a new row"); // Debugging
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Enter username"></td>
            <td></td> <!-- Empty Picture Column -->
            <td><input type="text" placeholder="Species you think it is"></td>
            <td>
                <input type="text" class="date" placeholder="Enter manually">
                <button class="button date-btn">USE DEVICE DATE</button>
            </td>
            <td>
                <input type="text" class="place" placeholder="Enter manually">
                <button class="button location-btn">USE DEVICE LOCATION</button>
            </td>
            <td><button class="button submit-btn">SUBMIT</button></td>
        `;

        // Apply the same pixelated border style to new rows
        newRow.style.border = "6px solid forestgreen";
        newRow.style.backgroundColor = "beige";

        table.appendChild(newRow);
    });
});
