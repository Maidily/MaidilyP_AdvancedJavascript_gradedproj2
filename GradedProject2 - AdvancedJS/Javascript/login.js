
const form = document.querySelector("form");

form.onsubmit = (e)=> {

    //preventing form from submitting
    e.preventDefault();

    localStorage.setItem("username", "admin");
    localStorage.setItem("password", "admin123");

    var username = document.getElementById("uname").value;
    var password = document.getElementById("password").value;

    if ( username == localStorage.getItem("username") && password == localStorage.getItem("password") ) {
        //redirecting user to the specified url which is inside action attribute of form tag
        window.location.href = form.getAttribute("action");
    }
    else if ( username != localStorage.getItem("username") ) {
        alert("Invalid username or password!");
    }
    else {
        alert("Invalid or bad password!");
    }
}


// preventing back button action :: resume-page to login-page
window.history.forward();
function noBack() {
    window.history.forward();
}