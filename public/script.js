let posts = [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Implement login functionality here
    console.log("Logged in as:", username);
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    // Implement user registration functionality here
    console.log("Registered new user:", newUsername);
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const postContent = document.getElementById('postContent').value;
    if (postContent.length <= 100) {
        posts.unshift(postContent);
        displayPosts();
    } else {
        alert("Innlegg kan ikke være mer enn 100 tegn!");
    } 
    document.getElementById('postContent').value = '';
});

function displayPosts() {
    const blogPosts = document.getElementById('blogPosts');
    blogPosts.innerHTML = '';
    posts.forEach(function(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.textContent = post;
        blogPosts.appendChild(postElement);
    });
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}