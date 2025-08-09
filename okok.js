const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const photoInput = document.getElementById("photo");
const previewImage = document.getElementById("preview");
const slides = document.querySelectorAll('.slide');

//  التنقل بين نموذج التسجيل والدخول
function switchForm(target) {
  if (target === 'login') {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  } else {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  }
}

//  التحقق من البيانات الفارغة
function validateInput(input, message) {
  const error = input.nextElementSibling;
  input.classList.remove("invalid");
  error.textContent = "";
  if (!input.value.trim()) {
    error.textContent = message;
    input.classList.add("invalid");
    return false;
  }
  return true;
}

//  عرض الصورة المرفوعة
photoInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = "";
    previewImage.style.display = "none";
  }
});

// معالجة نموذج التسجيل
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName");
  const username = document.getElementById("regUsername");
  const email = document.getElementById("regEmail");
  const password = document.getElementById("regPassword");
  const photo = document.getElementById("photo");
  const errorBox = document.getElementById("registerError");

  errorBox.textContent = "";

  let isValid = true;

  // تحقق من الحقول الفارغة
  isValid &= validateInput(fullName, " Full name is Required");
  isValid &= validateInput(username, " Username is Required");
  isValid &= validateInput(email, " Email is Required");
  isValid &= validateInput(password, " Password is Required")

  // تحقق من البريد
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    email.nextElementSibling.textContent = "please Sir enter a valid Email";
    email.classList.add("invalid");
    isValid = false;
  }

  // تحقق من كلمة المرور
  const passwordRegex = /^(?=.*\d).{8,}$/;
  if (password.value && !passwordRegex.test(password.value)) {
    password.nextElementSibling.textContent = "password should be 8 charcter and at least 1 number"
    password.classList.add("invalid");
    isValid = false;
  }

  // تحقق من الصورة
  if (!photo.files[0]) {
    errorBox.textContent = "please uploead a photo of yourself";
    isValid = false;
  }

  // تحقق من التكرار
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.username === username.value)) {
    username.nextElementSibling.textContent = "Username is already exist";
    username.classList.add("invalid");
    isValid = false;
  }
  if (users.some(u => u.email === email.value)) {
    email.nextElementSibling.textContent = " Email is already Exist";
    email.classList.add("invalid");
    isValid = false;
  }

  // إذا جميع التحقق سليم
  if (isValid) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const photoData = e.target.result;

      const newUser = {
        fullName: fullName.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value,
        photo: photoData
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account registration has been successful, please log in.");
      switchForm("login");
      registerForm.reset();
      previewImage.src = "";
      previewImage.style.display = "none";
    };
    reader.readAsDataURL(photo.files[0]);
  }
  // ==================put-pic-and-userName-in-localStorage==================
  const name = document.getElementById('regUsername');
  const file = document.getElementById("photo").files[0];
  // if (!file) return alert("please choose a photo");

  const reader = new FileReader();
  reader.onload = function () {
    localStorage.setItem("userImage", reader.result);
  };
  reader.readAsDataURL(file);
  localStorage.setItem("user-name", name.value);
  // ==================end-put-pic-and-userName-in-localStorage==================
});

//  معالجة نموذج الدخول
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const user = document.getElementById("loginUser");
  const pass = document.getElementById("loginPass");
  const errorBox = document.getElementById("loginError");

  user.classList.remove("invalid");
  pass.classList.remove("invalid");
  errorBox.textContent = "";

  let isValid = true;

  if (!user.value.trim()) {
    user.classList.add("invalid");
    user.nextElementSibling.textContent = " please Enter your Email or Username";
    isValid = false;
  } else {
    user.nextElementSibling.textContent = "";
  }

  if (!pass.value.trim()) {
    pass.classList.add("invalid");
    pass.nextElementSibling.textContent = " Please enter your Password";
    isValid = false;
  } else {
    pass.nextElementSibling.textContent = "";
  }

  if (!isValid) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    u => (u.email === user.value.trim() || u.username === user.value.trim())
  );

  if (!matchedUser) {
    errorBox.textContent = " Email or Username is not correct";
    user.classList.add("invalid");
    return;
  }

  if (matchedUser.password !== pass.value) {
    errorBox.textContent = " Password is not correct";
    pass.classList.add("invalid");
    return;
  }

  //  تسجيل دخول ناجح
  window.location.href = "index.html";
});

//  تغيير خلفية السلايد كل 5 ثواني
let slideIndex = 0;
setInterval(() => {
  if (slides.length === 0) return;
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}, 4000);

