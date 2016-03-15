<?php 
    $UserName = "";
    $Password = "";
    $UserName = $_REQUEST["UserName"];
    $Password = $_REQUEST["Password"];

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
        echo "ERROR! No Lists found";
    }

?>