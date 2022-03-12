const postId = document.querySelector('input[name="post_id"]').value;

const deleteClickHandler = async function() {
    await fetch(`/api/post/${postId}`, {
      method: 'DELETE'
    });
  
    document.location.replace('/dashboard');
};
