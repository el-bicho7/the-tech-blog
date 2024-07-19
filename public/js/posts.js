const newPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  const date = new Date().toLocaleString('en-US');

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({title, content, date}),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add post')
    }
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newPost);