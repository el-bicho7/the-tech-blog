const newComment = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#content').value;
  const date = new Date().toLocaleString('en-US');
  const id = document.querySelector('#title').dataset.id;
  
  if (content) {
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({content, date}),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if (response.ok) {
      document.location.replace(`/${id}/comment`);
    } else {
      alert('Failed to add comment')
    }
  }
};

document
  .querySelector('#comment-post-form')
  .addEventListener('submit', newComment);