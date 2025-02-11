// Create an XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Define the API URL
const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Open a GET request
xhr.open("GET", apiUrl, true);

// Send the request
xhr.send();

// When response is received
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // 4 means request is complete
        if (xhr.status === 200) { // 200 means success
            const responseData = JSON.parse(xhr.responseText);

            // Display JSON Data
            document.getElementById("json-data").textContent = JSON.stringify(responseData, null, 2);

            // Display Data in Table
            displayTable(responseData);
        } else {
            console.error("Error fetching data:", xhr.status);
        }
    }
};

// Function to Display Data in Table
function displayTable(data) {
    const tableBody = document.querySelector("#user-table tbody");
    data.forEach(user => {
        let row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.phone}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
zaz