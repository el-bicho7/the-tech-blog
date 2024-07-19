const updatePost = async (event) => {
  if (event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const date = new Date().toLocaleString('en-US');
  
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title, content, date}),
        headers: {
          'Content-type': 'application/json',
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add post')
      };
    };
  };
};

document
  .querySelector('#update-post-form')
  .addEventListener('submit', updatePost);