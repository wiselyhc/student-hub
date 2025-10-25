/**
 * Handles the response from Google's Sign-In.
 * This function is called by the Google GSI library.
 */
async function handleCredentialResponse(response) {
  // 1. Get the Google ID token
  const idToken = response.credential;

  // 2. Create a Firebase credential with the Google ID token
  // 'firebase' is available globally from the SDK script
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

  try {
    // 3. Sign the user into Firebase with the credential
    // 'auth' is available globally from firebase-init.js
    const result = await auth.signInWithCredential(credential);
    const user = result.user;

    // 4. CHECK IF THIS IS A NEW USER
    if (result.additionalUserInfo.isNewUser) {
      // 5. ADD THE USER TO THE DATABASE
      // 'db' is available globally from firebase-init.js
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        theme: 'light', // Set a default theme
        role: 'user' // Set a default role
      });
      console.log("New user created in Firestore database");
    } else {
      console.log("Existing user signed in.");
    }

    // 6. Set sessionStorage items so your other pages know you're logged in
    sessionStorage.setItem('isLoggedIn', 'true');

    // 7. Redirect to the account center
    window.location.href = 'account-center.html';

  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
}