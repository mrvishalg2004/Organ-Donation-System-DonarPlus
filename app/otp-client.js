// public/otp-client.js

document.getElementById('send-otp-btn').addEventListener('click', () => {
    const email = document.getElementById('email-input').value;

    fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('OTP sent successfully');
        } else {
            alert('Failed to send OTP');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
