// event handler function for login
async function loginFormHandler(event) {
    console.log(document.location);
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/my-pantry');
        } else {
            alert(response.statusText);
        }
    }
};

// event handler function for sign-up
async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && password) {
	const response = await fetch('/api/users', {
		method: 'post',
		body: JSON.stringify({
		username,
		password
		}),
		headers: { 'Content-Type': 'application/json' }
	});
	if (response.ok) {
		// redirect them to /my-pantry
		document.location.replace('/my-pantry')     
	} else {
		alert(response.statusText);
	}
	}
}

// event listener for login
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// event listener for sign-up
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);