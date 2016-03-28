var userIsLoggedIn = false;
var loggedInUser = -1;

function DisplayInfo() {
    "use strict";
    window.setInterval(function () {
        getList();   
    }, 500);
}



function getList() {
   "use strict";
    $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
        data: {action: 'getLists', UserId: loggedInUser},
        dataType: 'text',
        type: 'post',
        success: function(output) {
           // alert(output);
            $('#UserLists').html(output).enhanceWithin();
        }
    });  
        

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

        $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
            data: {action: 'signIn', userName: "'" + userName + "'", hashPassword: "'" + hashPassword + "'"},
            type: 'post',
            success: function(output) {
                loggedInUser = output;
                if (output > 0) {
                    document.getElementById("ableTologin").innerHTML = "User has been Logged in";
                    userIsLoggedIn = true;
                    loggedInUser = output;

                } else {
                    document.getElementById("ableTologin").innerHTML = output;
                }
            }
        }); 
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
        // convert the password to a hashPassword
        var hashPassword = sha256(password),
            hashC = sha256(cPass);

        if (hashPassword !== hashC) {
            document.getElementById("createdUser").innerHTML = "hashPassword didn't match";

        } else {

            $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
                data: {action: 'createUser', userName: "'" + userName + "'", hashPassword: "'" + hashPassword + "'"},
                type: 'post',
                success: function(output) {
                    // alert(output);
                    document.getElementById("createdUser").innerHTML = output;
                }
            }); 
            
            
        }
    }
}

function addItem(ListId) {
    var ItemName = document.getElementById("addItemName"+ListId).value;

    if(ItemName === "") {
        alert("Item Not Added, Please enter a item name");
    } else {
        $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
            data: {action: 'addItem', ItemName: "'" + ItemName + "'", ListId: ListId},
            type: 'post',
            success: function(output) {
            }
        });  
    }
    document.getElementById("addItemName").value = "";
}

function removeItem(ItemId) {    
    $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
        data: {action: 'removeItem', ItemId: ItemId},
        type: 'post',
        success: function(output) {
           // alert(output);
        }
    }); 
}

function checkOffItem(ItemId, isCheckedOff) {
    var checkOff = -1;
    if(!isCheckedOff) {
        checkOff = 1;
    } else {
        checkOff = 0;
    }
    
    $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
        data: {action: 'checkOffItem', ItemId: ItemId, checkOff: checkOff},
        type: 'post',
        success: function(output) {
           // alert(output);
        }
    }); 
}

function createList(){
    var ListName = document.getElementById("list-name").value;

    if(ListName === "") {
        alert("List Not Added, Please enter a List name");
    } else {
        //call the php code to add the list to the list table
        //also have to link it to the user with the userlist table
        $.ajax({ url: 'http://icarus.cs.weber.edu/~cs79098/CS3750/Assign3/assignment3.php',
            data: {action: 'createList', UserId: "'" + loggedInUser + "'", ListName: "'" + ListName + "'"},
            type: 'post',
            success: function(output) {
               alert(output);
            }
        }); 
        
        
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

function removeList(ListId) {
    //loggedInUser --> this is the active logged in user
    //need to remove list, list linked to user, and all items that belog to that list.
    
}

function createAddListPopup() {
    $('#AddList-screen').remove();
    $('#AddList-popup').remove();
    
    var PopupDiv =  '<div data-role="popup" id="AddList" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">'+
                    '<h3>Add New List</h3>'+
                    '<p>Enter List Information: </p>'+
                    '<form id="addItem">'+
                        'List name: <input type="text" id="list-name"><br>'+
                    '</form>'+
                    '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="createList();">Create List</a>'+
                            '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini">Cancel</a>'+
        '<a href="index.html" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Cancel</a>'+
                    '</div>';
                            
    $('#ListPopups').html(PopupDiv).enhanceWithin();

}

function createAddItemPopup(ListId) {
    $('#'+ListId+'_addItem-screen').remove();
    $('#'+ListId+'_addItem-popup').remove();
    var PopupDiv ='<div data-role="popup" id="' + ListId + '_addItem" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">' + 
                        '<h3>Add Item</h3>' +
                        '<p>Enter Item Information: </p>' +
                        '<form id="addItem">' +
                            'Item Name: <input type="text" id="addItemName' + ListId + '"><br>' +
                        '</form>' +
                        '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="addItem('+ ListId +');">Add Item</a>' +
                        '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="removeList('+ ListId +');">Remove List</a>' +
                    '<a href="index.html" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Cancel</a>' +
                    '</div>';
    //alert(PopupDiv);
    //document.getElementById("ListPopups").innerHTML = PopupDiv;
    $('#ListPopups').html(PopupDiv).enhanceWithin();

    
}

function createEditItemPopup(ItemId, isCheckedOff) {
    $('#'+ItemId+'_editItem-screen').remove();
    $('#'+ItemId+'_editItem-popup').remove();
    var PopupDiv = '';
    
    if(!isCheckedOff){
       PopupDiv =   '<div data-role="popup" id="'+ItemId+'_editItem" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">' +
                    '<h3>Edit Item</h3>' +
                    '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="removeItem('+ItemId+');">Remove Item</a>' +
                    '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="checkOffItem('+ItemId+','+isCheckedOff+')">Check Off</a>' +
                    '<a href="index.html" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Cancel</a>'+
                    '</div>';
    }
    else{
               PopupDiv =   '<div data-role="popup" id="'+ItemId+'_editItem" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">' +
                    '<h3>Edit Item</h3>' +
                    '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="removeItem('+ItemId+');">Remove Item</a>' +
                    '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="checkOffItem('+ItemId+','+isCheckedOff+')">Uncheck</a>' +
                    '<a href="index.html" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Cancel</a>'+
                    '</div>';
    }
    
    
    //alert(PopupDiv);
    //document.getElementById("ListPopups").innerHTML = PopupDiv;
    $('#ListPopups').html(PopupDiv).enhanceWithin();

    
}
