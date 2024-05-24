document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const errorMessages = [];
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const otherNames = document.getElementById('otherNames').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
  
    // Validate first name and last name
    if (firstName.length < 1 || !/^[a-zA-Z]+$/.test(firstName)) {
      errorMessages.push('First name is required and must contain only letters.');
    }
    if (lastName.length < 1 || !/^[a-zA-Z]+$/.test(lastName)) {
      errorMessages.push('Last name is required and must contain only letters.');
    }
  
    // Validate other names
    if (otherNames.length > 0 && !/^[a-zA-Z]+$/.test(otherNames)) {
      errorMessages.push('Other names must contain only letters.');
    }
  
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMessages.push('Invalid email address.');
    }
  
    // Validate phone number
    if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      errorMessages.push('Phone number must be 11 digits.');
    }
  
    // Validate gender
    if (!gender) {
      errorMessages.push('Gender is required.');
    }
  
    const errorDiv = document.getElementById('errorMessages');
    if (errorMessages.length > 0) {
      errorDiv.innerHTML = errorMessages.join('<br>');
    } else {
      errorDiv.innerHTML = '';
  
      // If no errors, submit the form via JavaScript
      fetch('http://localhost:3000/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          otherNames,
          email,
          phone,
          gender,
        }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          alert('Error: ' + error.message);
        });
    }
  });
  