const username = document.querySelector('#username_login').value.trim();
const password = document.querySelector('#password_login').value.trim();

const loginHandler = async function(event) {
    event.preventDefault();
  

    fetch("/api/user/login", {
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
  
document
    .querySelector("#login_form")
    .addEventListener("submit", loginHandler);
  