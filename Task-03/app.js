const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const msg = document.getElementById("msg");

const API = "http://localhost:5000";

function showMessage(text, type){
  msg.textContent = text;
  msg.className = "msg " + type;
}

function validate(){
  let ok = true;
  emailErr.textContent = "";
  passErr.textContent = "";
  msg.textContent = "";

  const e = email.value.trim();
  const p = password.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!e){
    emailErr.textContent = "Email is required";
    ok = false;
  } else if(!emailPattern.test(e)){
    emailErr.textContent = "Enter valid email format";
    ok = false;
  }

  if(!p){
    passErr.textContent = "Password is required";
    ok = false;
  } else if(p.length < 6){
    passErr.textContent = "Password must be at least 6 characters";
    ok = false;
  }

  return ok;
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if(!validate()) return;

  try{
    const res = await fetch(`${API}/api/login`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await res.json();

    if(!data.ok){
      showMessage(data.message || "Login failed", "fail");
      return;
    }

    showMessage(`Login successful! Welcome ${data.user.fullName}`, "success");
  }catch(err){
    showMessage("Network/Server error: Failed to fetch", "fail");
  }
});
