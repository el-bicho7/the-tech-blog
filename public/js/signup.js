const singUpFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log(name, email, password);

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to singup');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', singUpFormHandler);

