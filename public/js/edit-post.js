const postId = document.querySelector('input[name="post-id"]').value;

async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post_title"]').value.trim();
    const body = document.querySelector('input[name="post_body"]').value;

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        json(response.statusText)
    }
};

document.querySelector('.edit-post').addEventListener('submit', editPostHandler)
