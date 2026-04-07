const API = "http://localhost:5000";

// ---------------- REGISTER ----------------
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(API + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert(data);
    })
    .catch(err => {
        console.log(err);
        alert("Error in register");
    });
}

// ---------------- LOGIN ----------------
function login() {
    fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data === "Login success" || data.message === "Login success") {
            // ✅ SAVE USERNAME
            localStorage.setItem(
                "username",
                document.getElementById("username").value
            );

           showToast("Login successful");

            // ✅ REDIRECT
            window.location = "dashboard.html";
        } else {
            alert("Invalid credentials ❌");
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error ❌");
    });
}

// ---------------- CREATE POST ----------------
function createPost() {
    fetch("http://localhost:5000/posts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data === "Post created") {
           showToast("Post created");
            loadPosts();
        } else {
            alert("Error creating post ❌");
        }
    })
    .catch(err => {
        console.log(err);
        alert("Server error ❌");
    });
}

// ---------------- LOAD POSTS ----------------
function loadPosts() {
    fetch("http://localhost:5000/posts")
        .then(res => res.json())
        .then(posts => {

            let html = "";

            posts.reverse().forEach(p => {
                html += `
                    <div class="post-card">
                        <h3>${p.title}</h3>
                        <p>${p.content}</p>

                        <button onclick="editPost('${p._id}', '${p.title}', '${p.content}')">Edit</button>
                        <button onclick="deletePost('${p._id}')">Delete</button>
                    </div>
                `;
            });

            document.getElementById("posts").innerHTML = html;
        });
}
// ---------------- AUTO LOAD ----------------
window.onload = function () {
    if (document.getElementById("posts")) {
        loadPosts();
    }
};


// Delete post //

function deletePost(id) {
    fetch(`${API}/posts/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        showToast("Post deleted");  // NOW it shows after deletion
        loadPosts();               // refresh posts
    })
    .catch(err => {
        console.error(err);
        alert("Error deleting post ❌");
    });
}
// REFRESH//

// REFRESH //
function refreshPosts() {
    loadPosts();
    showToast("Posts refreshed ");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
// Edit post//

function editPost(id, oldTitle, oldContent) {
    const title = prompt("Edit title:", oldTitle);
    const content = prompt("Edit content:", oldContent);

    if (!title || !content) return;

    fetch(`${API}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(data => {
        showToast("Post updated");
        loadPosts();
    })
    .catch(err => {
        console.log(err);
        alert("Error updating ❌");
    });
}

//Clear form //
function clearForm() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}
window.onload = function() {

    // 👇 ONLY run on dashboard page
    if (window.location.pathname.includes("dashboard.html")) {

        const user = localStorage.getItem("username");

        if (!user) {
            window.location = "login.html";
        } else {
            document.getElementById("welcome").innerText = "Welcome, " + user;
            loadPosts();
        }
    }
};

// LOGOUT //

function logout() {
    localStorage.removeItem("username");
    window.location = "login.html";
}

 // SHOWTOAST//

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    showToast("Cleared ");
}