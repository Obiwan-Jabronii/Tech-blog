const username = document.querySelector('#username_signup').value.trim();
const password = document.querySelector('#password_signup').value.trim();

const signupFormHandler = async function(event) {
    event.preventDefault();
  
    fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
};
  
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);
  