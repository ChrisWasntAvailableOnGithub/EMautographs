document.addEventListener('DOMContentLoaded', function() {
    const searchTermElement = document.getElementById('searchTerm');
    const resultDiv = document.getElementById('result');

    // Set the search box value to "EM" on page load
    searchTermElement.value = 'EM';

    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let searchTerm = searchTermElement.value.trim().toUpperCase();

        // Check if the search term follows the "EM" pattern and has exactly 6 numbers
        if (!/^EM\d{6}$/.test(searchTerm)) {
            resultDiv.innerHTML = 'Please enter a valid certification serial code (e.g., EM123456).';
            return;
        }

        // Simulate checking if the result exists (replace with actual logic)
        const resultExists = await checkIfResultExists(searchTerm);

        // Display result or error message
        if (resultExists) {
            resultDiv.innerHTML = `Searching for: ${searchTerm}`;
            // Replace "yourpage.html" with the actual page you want to redirect to
            window.location.href = `../lookup/${searchTerm.toLowerCase()}.html`;
        } else {
            resultDiv.innerHTML = 'Invalid certification serial code.';
        }
    });

    // Allow only numeric input in the search box, limited to 6 digits after "EM"
    searchTermElement.addEventListener('input', function() {
        let currentInput = searchTermElement.value;
        let numericInput = currentInput.replace(/\D/g, ''); // Keep only numeric characters

        // Ensure "EM" is present
        currentInput = numericInput.length > 0 ? 'EM' + numericInput.slice(0, 6) : 'EM';

        // Update the value and trim to 8 characters (including "EM")
        searchTermElement.value = currentInput.substring(0, 8);
    });
    ``
    // Allow users to type in the search box
    searchTermElement.removeAttribute('readonly');

    // Clear the resultDiv on page load
    resultDiv.innerHTML = '';

    // Function to check if the HTML file exists
    async function checkIfResultExists(searchTerm) {
        try {
            const response = await fetch(`../lookup/${searchTerm.toLowerCase()}.html`, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error('Error checking file existence.', error);
            return false;
        }
    }
});