const AUTH0_DOMAIN = 'dev-mduiv3ndupdsrupv.us.auth0.com'; // Replace with your Auth0 domain
const AUTH0_CLIENT_ID = 'RJr6Wcpsjohszbycos0zlmJgbiQHvPVY'; // Replace with your Auth0 client ID
const AUTH0_REDIRECT_URI = 'http://localhost:4000'; // Replace with your redirect URI

const webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT_URI,
    responseType: 'token id_token',
    scope: 'openid profile email'
});

// Login function
document.getElementById('login-btn').onclick = function() {
    webAuth.authorize();
};

// Logout function
document.getElementById('logout-btn').onclick = function() {
    webAuth.logout({
        returnTo: AUTH0_REDIRECT_URI // Redirect to your application after logout
    });
};

// Handle authentication result
function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Save the tokens in local storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);

            // Get user info
            webAuth.client.userInfo(authResult.accessToken, function(err, user) {
                if (err) {
                    console.error('Error getting user info:', err);
                    return;
                }
                if (user) {
                    // Hide login content and show form content
                    document.getElementById('auth-content').style.display = 'none';
                    document.getElementById('form-content').style.display = 'block';
                }
            });
        } else if (err) {
            console.error('Error during authentication:', err);
        }
    });
}

// Call the handleAuthentication function on page load
handleAuthentication();
