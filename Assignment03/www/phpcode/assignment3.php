<?php header('Access-Control-Allow-Origin: *');

    if(isset($_POST['action']) && !empty($_POST['action'])) {
        $action = $_POST['action'];
        switch($action) {
            case 'getLists'     : getLists();break;
            case 'signIn'       : signIn();break;
            case 'createUser'   : createUser();break;
            case 'addItem'      : addItem();break;
            case 'removeItem'   : removeItem();break;
            case 'checkOffItem' : checkOffItem();break;
            case 'createList'   : createList();break;
            case 'removeList'   : removeList();break;
            default : echo "alert('Wha? How did you get here???')";
        }
    }

    function getLists(){
        if(isset($_POST['UserId']) && !empty($_POST['UserId'])) {
            $UserId = $_POST['UserId'];
            if($UserId > 0) {
                //echo "Test2";
                $db = mysqli_connect('localhost',
                                    'W01162084',
                                    'Jaysoncs!',
                                    'W01162084');

                $sql = "SELECT li.ListId, li.ListName FROM Lists li 
                        Join UserList ul on li.ListId = ul.ListId
                        JOIN User us ON ul.UserId = us.UserId
                        WHERE us.UserId = " . $UserId;

                echo    '<div id="ListDiv">

                        <ul data-role="listview" data-icon="false" data-theme="a" data-split-theme="b" data-inset="true">
                            <li><a href="#AddList" data-rel="popup" data-position-to="window" data-transition="pop" onclick="createAddListPopup();">
                                <h2><Center>Add New List</Center></h2></a>
                            </li>
                        </ul>';

                $result = mysqli_query($db, $sql);
                    if ($result) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo    '<ul data-role="listview" data-split-icon="plus" data-theme="a" data-split-theme="b" data-inset="true">
                                    <li><a href="#" >
                                    <h2>'.htmlspecialchars($row['ListName']).'</h2>
                                    </a><a href="#'.htmlspecialchars($row['ListId']).'_addItem" data-rel="popup" data-position-to="window" data-transition="pop" onclick="createAddItemPopup('.htmlspecialchars($row['ListId']).');">Add Item</a>
                                    </li>';



                            $sql = "Select ItemId, ItemName, ItemCheckedOff  FROM ListItems Where ListId = ".htmlspecialchars($row['ListId']);
                            $itemResult = mysqli_query($db, $sql);
                            if($itemResult) {
                                while($row = mysqli_fetch_assoc($itemResult)) {
                                    echo '<li data-icon="info"><a href="#">';

                                    //Check to see if the item in the list has been check off
                                    if(!htmlspecialchars($row['ItemCheckedOff'])){
                                        echo'<h2>'.htmlspecialchars($row['ItemName']).'</h2>';
                                    }
                                    else {
                                        echo '<h2><strike>'.htmlspecialchars($row['ItemName']).'</strike></h2>';
                                    }

                                    echo '</a><a href="#'.htmlspecialchars($row['ItemId']).'_editItem" data-theme="a" data-rel="popup" data-position-to="window" data-transition="pop" onclick="createEditItemPopup('.htmlspecialchars($row['ItemId']).', '.htmlspecialchars($row['ItemCheckedOff']).' );">'.htmlspecialchars($row['ItemName']).'</a>
                                        </li>';

                                }
                            }
                        echo '</ul>';
                        echo '</div>';

                    }
                } 
                else {
                    echo "No Lists Found";
                }

            } 
            else{
            echo "Please Login to see your lists";
            }
        }
    }

    function signIn(){
        $userName = $_POST["userName"];
        $hashPassword = $_POST["hashPassword"];

        if($userName != "") {
            //echo "Test2";
            $db = mysqli_connect('localhost',
                                'W01162084',
                                'Jaysoncs!',
                                'W01162084');

            $sql = "Select Password, UserId From User Where UserName = " . $userName;
            $result = mysqli_query($db, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    if("'".htmlspecialchars($row['Password'])."'" == $hashPassword) {
                        echo htmlspecialchars($row['UserId']);
                    }else{
                        echo "Password Incorrect";
                    }
                }
            } 
            else {
                echo "User Does not exist";
            }
        } 
        else{
            echo "Error, bad username";
        }
    }

    function createUser() {
        
        $UserName = $_POST["userName"];
        $Password = $_POST["hashPassword"];

        if($UserName != "") {
            //echo "Test2";
            $db = mysqli_connect('localhost',
                                'W01162084',
                                'Jaysoncs!',
                                'W01162084');

            $sql = "Select userName From User Where UserName = " . $UserName;

            $result = mysqli_query($db, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "User Already Exists";
                }
            } 
            else {
                $sql = "Insert Into User Values(null,".$UserName . "," . $Password . ")";
                mysqli_query($db, $sql);
                echo "User created. Go ahead and login";

            }
        } 
        else{
            echo "ERROR! Bad UserName";
        }
    }

    function addItem() {
        $ItemName = $_POST["ItemName"];
        $ListId = $_POST["ListId"];

        if($ItemName != "" || $ListId < 0) {
            //echo "Test2";
            $db = mysqli_connect('localhost',
                                'W01162084',
                                'Jaysoncs!',
                                'W01162084');

            $sql = "Insert Into ListItems Values(null, ".$ItemName.", NOW(), ".$ListId.", 0)";
            mysqli_query($db, $sql);
            echo "Item Name: $ItemName | ListId: $ListId" ;
        } 
        else{
            echo "ERROR! Item Name Wrong or List Id < 0";
        }
    }

    function removeItem() {
        $ItemId = $_POST["ItemId"];

        if($ItemId > 0) {
            $db = mysqli_connect('localhost',
                                'W01162084',
                                'Jaysoncs!',
                                'W01162084');

            $sql = "DELETE FROM ListItems WHERE ItemId = $ItemId";


            mysqli_query($db, $sql);

        } 
        else{
            echo "ERROR! ItemId < 0";
        }
        
    }

    function checkOffItem() {
        
        $ItemId = $_POST["ItemId"];
        $isCheckedOff = $_POST["checkOff"];

        if($ItemId > 0 || $isCheckedOff > 0) {
            //echo "Test2";
            $db = mysqli_connect('localhost',
                'W01162084',
                'Jaysoncs!',
                'W01162084');

            $sql = "UPDATE ListItems SET ItemCheckedOff =".$isCheckedOff." WHERE ItemId = ".$ItemId."";
            mysqli_query($db, $sql);
        } else {
            echo "ERROR! ItemId < 0 || ischeckedoff < 0";
        }
    }

    function createList() {
        $UserID = $_POST["UserId"];
        $ListName = $_POST["ListName"];

        $db = mysqli_connect('localhost',
                            'W01162084',
                            'Jaysoncs!',
                            'W01162084');
        //check to see if list name already exists and get the listID
        $sql = "SELECT ListID FROM Lists WHERE ListName = $ListName";

        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) > 0){
            while ($row = mysqli_fetch_row($result)){
                $ListID = $row[0];
            }
        }
        else{
            //if it doesn't exist create the list and get the listID
            $sql2 = "INSERT INTO Lists Values(null, $ListName)";
            mysqli_query($db, $sql2);

            $result = mysqli_query($db, $sql);
            if (mysqli_num_rows($result) > 0){
                while ($row = mysqli_fetch_row($result)){
                    $ListID = $row[0];
                }
            }
        }
        //connect the list to the user
        $sql = "INSERT INTO UserList Values(null, $UserID , $ListID )";
        mysqli_query($db, $sql);
    }

    function removeList() {
        //remove the list here
        
        $ListId = $_POST["ListId"];        

        if($ListId > 0) {
            $db = mysqli_connect('localhost',
                                'W01162084',
                                'Jaysoncs!',
                                'W01162084');

            $sql = "DELETE FROM ListItems WHERE ListID = $ListId";
            $sql2 = "DELETE FROM Lists WHERE ListID = $ListId";


            mysqli_query($db, $sql);
            mysqli_query($db, $sql2);

        } 
        else{
            echo "ERROR! ListId < 0";
        }
        
    }

?>