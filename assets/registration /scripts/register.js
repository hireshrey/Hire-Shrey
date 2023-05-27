function registration() {
  var Fname = document.getElementById("Fname").value;
  var mname = document.getElementById("mname").value;
  var lname = document.getElementById("lname").value;
  var cource = document.getElementById("cource").value;
  var gender = document.getElementsByName('gender');
  for (var radio of gender)
  {
      if (radio.checked) {
          alert(radio.value);
      }
  }
  var phone = document.getElementById("phone").value;
  var Address = document.getElementById("Address").value;
  var email = document.getElementById("email").value;
  var password = matchPassword();

  console.log(Fname);
  console.log(mname);
  console.log(lname);
  console.log(cource);
  console.log(gender);
  console.log(phone);
  console.log(Address);
  console.log(email);
  console.log(password); 
  window.location.href = "loginpage.html";
}
function matchPassword() {
  var pw1 = document.getElementById("password");
  var pw2 = document.getElementById("password2");
  if (pw1 != pw2) {
    alert("Passwords did not match");
  } else {
    alert("Password created successfully");
    return pw1;
  }
}
