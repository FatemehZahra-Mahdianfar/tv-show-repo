document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    window.location.href = "index.html";
  });
});

// Checking the validity of the email
function validateEmail(email) {
  const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return check.test(email);
}
