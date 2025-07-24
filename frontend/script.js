document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userData = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
    role: document.querySelector('#role').value
  };

  const res = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const result = await res.json();
  alert(result.message);
});
