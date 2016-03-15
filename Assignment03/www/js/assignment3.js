var userIsLoggedIn = false;
            var loggedInUser = -1;
            function DisplayInfo(){
                 window.setInterval(function () {
                    {
                        document.getElementById("Loggedin").innerHTML = userIsLoggedIn;
                        document.getElementById("LoggedinUser").innerHTML = loggedInUser;
                        getList();
                    }
                 }, 100);
            }
            function signIn()
            {
                var userName = document.getElementById("userName").value;
                var password = document.getElementById("password").value;
                
                //get the hash value of the password
                var hashPassword = sha256(password);
                //call the server and verify & get their todo list
                if(userName == "")
                    document.getElementById("ableTologin").innerHTML = "please enter a username";
                else if(password == "")
                    document.getElementById("ableTologin").innerHTML = "please enter a Password";
                else{
                    document.getElementById("ableTologin").innerHTML = "";

                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            loggedInUser = xhttp.responseText;
                            if(loggedInUser > 0){
                                document.getElementById("ableTologin").innerHTML = "User has been Logged in";
                                userIsLoggedIn = true;
                                
                            }
                            else{
                                document.getElementById("ableTologin").innerHTML = "Error, Incorrect Username or Password";

                            }
                        }
                    };
                    xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/userLogin.php?UserName='" + userName + "'&Password='"+hashPassword+"'", true);
                    xhttp.send();

                }
                
                
                
            }
            function createUser()
            {
                var userName = ""; 
                userName = document.getElementById("user").value;
                var password = document.getElementById("pass").value;
                var cPass = document.getElementById("confirmPass").value;
                // check that the passwords match
                if(password != cPass || password == "" || cPass == "")
                    document.getElementById("createdUser").innerHTML = "Password did not match. Try again.";
                else if(password.length < 6)
                    document.getElementById("createdUser").innerHTML = "Password Must be greater than 5 characters";

                else if(typeof userName == 'undefined' || userName == "")
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
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                document.getElementById("createdUser").innerHTML = xhttp.responseText;
                            }
                        };
                        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/chkUserExists.php?UserName='" + userName + "'&Password='"+hash+"'", true);
                        xhttp.send();
                           
                    }
                }
            }
            function getList()
            {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                            document.getElementById("UserLists").innerHTML = xhttp.responseText;
                    }
                };
                xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/getLists.php?UserId=" + loggedInUser , true);
                xhttp.send();
            }