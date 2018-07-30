/**
 * Gets the resetHash GET parameter and updates the resetHash input's value.
 */
window.onload = function() {
	const hash = window.location.search.split("=")[1];
	const input = document.querySelector("input[name=resetHash]");
	input.value = hash;
};

/**
 * Handle form submission.
 */
const form = document.querySelector("form");
form.onsubmit = async function(e) {
	e.preventDefault();

	const confirmation = document.querySelector("input[name=confirmation]").value;
	const password = document.querySelector("input[name=password]").value;
  const resetHash = document.querySelector("input[name=resetHash]").value;

	if (password && password === confirmation) {
    const data = { password, resetHash };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    const res = await fetch("/v1/authentication/reset-password", {
      body: JSON.stringify(data),
      credentials: "same-origin",
      headers: headers,
      method: "POST",
    });

    if (res.status === 200) {
      // hide all input fields
      const inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.display = "none";
      }

      // show success message
      const success = document.querySelector("#form-success");
      success.innerHTML = "Password updated successfully!";
      success.style.display = "block";
    } else {
      showError("There was an error resetting your password.");
    }
	} else if (!password) {
    showError("Please enter a password.");
	} else {
    showError("Passwords do not match.");
	}
}

function showError(message) {
  const error = document.querySelector("#form-error");
  error.innerHTML = message;
  error.style.display = "block";
}