function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    if (email == "" || password == "") {
        alert("enter value");

        if (email == "shrey@gmail.com" && password == "123") {
            window.location.replace("http://www.google.com");
        } else {
            alert("try again");
        }
    }
}
