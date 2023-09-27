import './style.css'

let userData = null;

const getUser = async () => {
  const user = await fetch('http://localhost:3000/user/1');
  userData = await user.json();
  
  console.log(userData);

  const glassBox = document.querySelector('.glassbox');

  glassBox.innerHTML = `
    <h1>${userData.username}</h1>
  `;
};

getUser();
