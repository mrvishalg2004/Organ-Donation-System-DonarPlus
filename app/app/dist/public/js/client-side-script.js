document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        // Check if the response is valid JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();

            if (response.ok) {
                window.location.href = 'https://www.google.com';
            } else {
                console.error('Error:', data.message);
                alert(data.message); // Display error message to the user
            }
        } else {
            console.error('Unexpected response format:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
