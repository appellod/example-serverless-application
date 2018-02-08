/**
 * Handle form submission.
 */
const form = document.querySelector("form");
form.onsubmit = async function(e) {
	e.preventDefault();

	const email = document.querySelector("input[name=email]").value;
	const password = document.querySelector("input[name=password]").value;
  const data = { email, password };
  
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  
  const res = await fetch("/login", {
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: headers,
    method: "POST",
  });

	if (res.status === 200) {
    window.location = "/apidoc/index.html";
  } else {
    showError("Incorrect email address or password.");
  }
}

function showError(message) {
  const error = document.querySelector("#form-error");
  error.innerHTML = message;
  error.style.display = "block";
}