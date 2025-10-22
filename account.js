/**
 * Handles the response from Google's Sign-In.
 * This function is called by the Google GSI library (loaded in account-creation.html)
 * after a user successfully signs in with their Google account.
 */
function handleCredentialResponse(response) {
  // The 'response.credential' is a JWT (JSON Web Token)
  console.log("Encoded JWT ID token: " + response.credential);
  
  // In a real application, you would send this 'response.credential' to your
  // server for verification to securely authenticate the user.
  
  // For this demo, we'll decode the payload on the client side
  // to get the user's information.
  // Note: This is insecure for production, but fine for this client-only demo.
  const payload = JSON.parse(atob(response.credential.split('.')[1]));

  console.log("Google User ID: " + payload.sub);
  console.log("Full Name: " + payload.name);
  console.log("Email: " + payload.email);
  console.log("Profile Picture URL: " + payload.picture);

  // --- Login Simulation ---
  // This part mimics the behavior of the other buttons to log the user in.
  
  // 1. Set the 'isLoggedIn' flag in session storage
  sessionStorage.setItem('isLoggedIn', 'true');
  
  // 2. (Optional) Save user info to display on the account page
  sessionStorage.setItem('userName', payload.name);
  sessionStorage.setItem('userEmail', payload.email);
  sessionStorage.setItem('userPicture', payload.picture);

  // 3. Redirect to the account center page
  window.location.href = 'account-center.html';
}

