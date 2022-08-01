const title = document.querySelector('input[name="post-title"]').value;
const post_body = document.querySelector('textarea[name="post-body"]').value;

const postFormHandler = async function(event) {
    event.preventDefault();
  
    await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_body
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    document.location.replace("/dashboard");
  };
  
document.querySelector(".new-post-form").addEventListener("submit", postFormHandler);
  