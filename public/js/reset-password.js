/**
 * Gets the resetHash GET parameter and updates the resetHash input's value.
 */
window.onload = function() {
  var hash = window.location.search.split("=")[1];

  var input = document.querySelector("input[name=resetHash]");
  input.value = hash;
};

/**
 * Handle form submission.
 */
var form = document.querySelector("form");
form.onsubmit = function(e) {
  e.preventDefault();

  var password = document.querySelector("input[name=password]").value;
  var confirmation = document.querySelector('input[name="confirm-password"]').value;

  if (password && password == confirmation) {
    var resetHash = document.querySelector("input[name=resetHash]").value;
    var password = document.querySelector("input[name=password]").value;
    var data = {
      resetHash: resetHash,
      password: password
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          // hide all input fields
          var inputs = document.querySelectorAll("input");
          for (var i = 0; i < inputs.length; i++) {
            inputs[i].style.display = "none";
          }

          // show success message
          var success = document.querySelector("#form-success");
          success.innerHTML = "Password updated successfully!";
          success.style.display = "block";
        } else {
          // show error message
          var error = document.querySelector("#form-error");
          error.innerHTML = "There was an error resetting your password.";
          error.style.display = "block";
        }
      }
    };

    xhttp.open("POST", "/v1/authentication/reset-password", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  } else if (!password) {
    // show error message
    var error = document.querySelector("#form-error");
    error.innerHTML = "Please enter a password.";
    error.style.display = "block";
  } else {
    // show error message
    var error = document.querySelector("#form-error");
    error.innerHTML = "Passwords do not match.";
    error.style.display = "block";
  }
}
