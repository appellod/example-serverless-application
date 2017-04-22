/**
 * Handle form submission.
 */
var form = document.querySelector("form");
form.onsubmit = function(e) {
	e.preventDefault();

	var email = document.querySelector("input[name=email]").value;
	var password = document.querySelector("input[name=password]").value;
	var data = {
		email: email,
		password: password
	};

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				window.location = "/apidoc/index.html";
			} else {
				// show error message
				var error = document.querySelector("#form-error");
				error.innerHTML = "Incorrect email address or password.";
				error.style.display = "block";
			}
		}
	};

	xhttp.open("POST", "/login", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
}
