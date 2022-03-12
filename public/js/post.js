const title = document.querySelector('input[name="post_title"]').value;
const body = document.querySelector('textarea[name="post_body"]').value;

const postFormHandler = async function(event) {
    event.preventDefault();
  
    await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    document.location.replace("/dashboard");
  };
  
document.querySelector("#post_form").addEventListener("submit", postFormHandler);
  