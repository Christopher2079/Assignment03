function signIn()
{
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    //get the hash value of the password
    var hashPassword = sha256(password);
    //call the server and verify & get their todo list
}

function createUser()
{
    var userName = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var cPass = document.getElementById("confirmPass").value;
    // check that the passwords match
    if(password != cPass)
        document.getElementById("createdUser").innerHTML = "Password did not match. Try again.";
    else if(typeof userName == 'undefined')
        document.getElementById("createdUser").innerHTML = "Please enter in a user name";
    else
    {
        // convert the password to a hash
        var hash = sha256(password);
        var hashC = sha256(cPass);
        if(hash != hashC)
        document.getElementById("createdUser").innerHTML = "hash didn't match";
        else
        {
            // check to see if the user exits
            // create the user  
            document.getElementById("createdUser").innerHTML = "user created. Go ahead and login";
        }
    }
}
function getList()
{
    //call the server and get the list
}