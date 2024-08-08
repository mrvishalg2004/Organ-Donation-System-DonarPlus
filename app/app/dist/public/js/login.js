const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            messageDiv.textContent = 'Login successful!';
            messageDiv.classList.remove('hidden', 'alert-error');
            messageDiv.classList.add('alert-success');
            // Redirect to dashboard or home page
            window.location.href = '/homepage.html';
        } else {
            messageDiv.textContent = 'Invalid credentials. Please try again.';
            messageDiv.classList.remove('hidden', 'alert-success');
            messageDiv.classList.add('alert-error');
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.classList.remove('hidden', 'alert-success');
        messageDiv.classList.add('alert-error');
    }
});

// Password toggle functionality
document.getElementById('passwordToggle').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});