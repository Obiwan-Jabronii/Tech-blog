async function postFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/posts`, {
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
  