var userIsLoggedIn = false;
var loggedInUser = -1;

function showCreateForm() {
    document.getElementById('new-list').style.cssText = 'display: block;';
}

function cancelCreate() {
    document.getElementById('new-list').style.cssText = 'display: none;';
}

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
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //alert("Ready State: " + xhttp.readyState + ", Status: " + xhttp.status);
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("simpleReturn").innerHTML = xhttp.responseText;
            //alert(xhttp.responseText);
        }
        
    };
    xhttp.open("GET", "http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/simpleReturn.php", true);
    xhttp.send();
    
    */
    window.setInterval(function () {
       

    }, 100);


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
    }
    document.getElementById("addItemName").value = "";
}

function removeItem(ItemId) {
    
    alert("Item has been Removed");
}

function checkOffItem(ItemId, isCheckedOff) {
    
    if(!isCheckedOff) {
        alert("Item has been checked off");
    } else {
        alert("Item has been unchecked");
    }
}

function createList(){
    //use the logged in user id to link the user and the new list
    var ListName = document.getElementById("list-name").value;

    if(ListName === "") {
        alert("List Not Added, Please enter a List name");
    } else {
        alert("New list has been created");
    }
    document.getElementById("list-name").value = "";
}