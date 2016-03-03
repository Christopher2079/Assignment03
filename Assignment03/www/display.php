<!DOCTYPE html>
<html>
    <head>
        <title>ToDo List</title>
        <meta name="viewpoint" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#login">Login</a></li>
                <li><a data-toggle="tab" href="#signUp">Sign up</a></li>
                <li><a data-toggle="tab" href="#list">List</a></li>
            </ul>
            
            <div class="tab-content">
                <div id="login" class="tab-pane fade in active">
                    <p>This is where the form with login will go</p>
                    <form id="formLogin">
                        User name: <input type="text" id="userName"><br>
                        Password: <input type="text" id="password"><br>
                        <p id="ableTologin"></p><br>
                        <button onclick="signIn()">Login</button>
                    </form>
                </div>
                
                <div id="signUp" class="tab-pane fade">
                    <p>This is where a user will sign up to use the app</p>
                    <form id="formCreateUser">
                        User name: <input type="text" id="user"><br>
                        Password: <input type="text" id="pass"><br>
                        Confirm Password: <input type="text" name="confirmPass"><br>
                        <p id="createdUser"></p>
                    <button onclick="createUser()">Sign up</button>
                    </form>
                </div>
                
                <div id="list" class="tab-pane fade" onclick="getList()">
                    <p>This is where the list will go.</p>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            function signIn()
            {
                var userName = document.getElementById("userName");
                var password = document.getElementById("password");
                
                //get the hash value of the password
                //call the server and verify & get their todo list
            }
            function createUser()
            {
                var userName = document.getElementById("user");
                var password = document.getElementById("pass");
                var confirmPass = document.getElementById("confirmPass");
                
                // check that the passwords match
                if(password != confirmPass)
                    document.getElementById("createdUser").innerHTML = "Password did not match. Try again.";
                
                // convert the password to a hash
                // check to see if the user exits
                // create the user
            }
            function getList()
            {
                //call the server and get the list
            }
        </script>
    </body>
</html>