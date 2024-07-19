const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')){
    console.log('Connected');
    const id = event.target.getAttribute('data-id');
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert('Failed to delete post.')
    };

  };
};

document
  .querySelector('#delete-btn')
  .addEventListener('click', deletePost);