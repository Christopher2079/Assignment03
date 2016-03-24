var userIsLoggedIn = false;
var loggedInUser = -1;


function getList() {
    "use strict";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            $('#UserLists').empty().append(xhttp.responseText).enhanceWithin();
            
        }
    };
    xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/getLists.php?UserId=" + loggedInUser, true);
    xhttp.send();
        

}

function DisplayInfo() {
    "use strict";
    window.setInterval(function () {
       getList(); 
    }, 1000);


}

function signIn() {
    "use strict";
    var userName = document.getElementById("userName").value,
        password = document.getElementById("password").value,

    //get the hash value of the password
        hashPassword = sha256(password);
    //call the server and verify & get their todo list
    if (userName === "") {
        document.getElementById("ableTologin").innerHTML = "please enter a username";
    } else if (password === "") {
        document.getElementById("ableTologin").innerHTML = "please enter a Password";
    } else {
        document.getElementById("ableTologin").innerHTML = "";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                loggedInUser = xhttp.responseText;
                if (loggedInUser > 0) {
                    document.getElementById("ableTologin").innerHTML = "User has been Logged in";
                    userIsLoggedIn = true;

                } else {
                    document.getElementById("ableTologin").innerHTML = "Error, Incorrect Username or Password";

                }
            }
        };
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/userLogin.php?UserName='" + userName + "'&Password='" + hashPassword + "'", true);
        xhttp.send();
    }
}

function createUser() {
    "use strict";
    var userName = "",
        password = document.getElementById("pass").value,
        cPass = document.getElementById("confirmPass").value;
    userName = document.getElementById("user").value;

    // check that the passwords match
    if (password !== cPass || password === "" || cPass === "") {
        document.getElementById("createdUser").innerHTML = "Password did not match. Try again.";

    } else if (password.length < 6) {
        document.getElementById("createdUser").innerHTML = "Password Must be greater than 5 characters";

    } else if (typeof userName === 'undefined' || userName === "") {
        document.getElementById("createdUser").innerHTML = "Please enter in a user name";
    } else {
        // convert the password to a hash
        var hash = sha256(password),
            hashC = sha256(cPass);

        if (hash !== hashC) {
            document.getElementById("createdUser").innerHTML = "hash didn't match";

        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    document.getElementById("createdUser").innerHTML = xhttp.responseText;
                }
            };
            xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/chkUserExists.php?UserName='" + userName + "'&Password='" + hash + "'", true);
            xhttp.send();

        }
    }
}



function addItem(ListId) {
    var ItemName = document.getElementById("addItemName").value;

    if(ItemName === "") {
        alert("Item Not Added, Please enter a item name");
    } else {
        alert("Item has been added");
        
        /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
                //alert(xhttp.responseText);
            }

        };
        //need to pass in the item name and the list id
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
        xhttp.send();

        */
        
    }
    document.getElementById("addItemName").value = "";
}

function removeItem(ItemId) {
    
    alert("Item has been Removed");
    
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
            //alert(xhttp.responseText);
        }

    };
    //need to pass in the item Id
    xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
    xhttp.send();

    */
}

function checkOffItem(ItemId, isCheckedOff) {
    
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
            //alert(xhttp.responseText);
        }
    };
    */

    
    if(!isCheckedOff) {
        alert("Item has been checked off");
        
        /*
        //Need to pass a value = 1 and that will be used to change the status of the item
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
        xhttp.send();
        */
        
    } else {
        alert("Item has been unchecked");
        /*
        //Need to pass a value = 0 and that will be used to change the status of the item
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
        xhttp.send();
        */
    }
}

function createList(){
    var ListName = document.getElementById("list-name").value;

    if(ListName === "") {
        alert("List Not Added, Please enter a List name");
    } else {
        //call the php code to add the list to the list table
        //also have to link it to the user with the userlist table
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState === 4 && xhttp.status === 200){
                document.getElementById("listCreated").innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET","http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/listCreate.php?UserID='" + loggedInUser + "'&ListName='" + ListName + "'", true);
        xhttp.send();
        
        
        /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
                //alert(xhttp.responseText);
            }

        };
        //need to pass in ListName and listId
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
        xhttp.send();

        */
        
        //This next call will be used to link the user to the new list in the UserList table
        /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
                //alert(xhttp.responseText);
            }

        };
        //need to pass in Logged in user ID, the new list ID will be grabbed by an sql statment for the "newest" list id
        xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/someLink.php", true);
        xhttp.send();

        */
        
    }
    document.getElementById("list-name").value = "";
    getList();
}