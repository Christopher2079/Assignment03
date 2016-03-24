<?php header('Access-Control-Allow-Origin: *');
    $ListID = "";
    $UserID = "";
    $ListName = "";
    $UserID = $_REQUEST["UserID"];
    $ListName = $_REQUEST["ListName"];

    $db = mysqli_connect('localhost',
        'W01162084',
        'Jaysoncs!',
        'W01162084');
    //check to see if list name already exists and get the listID
    $sql = "SELECT ListID 
            FROM List 
            WHERE ListName = " . $ListName;

    $result = mysqli_query($db, $sql);
    if (mysqli_num_rows($result) > 0){
        $row = mysql_fetch_row($result);
        $ListID = $row[0];
    }
    else{
        //if it doesn't exist create the list and get the listID
        $sql2 = "INSERT INTO Lists
                Values(null,".$ListName . ")";
        mysqli_query($db, $sql2);

        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) > 0){
            $row = mysql_fetch_row($result);
            $ListID = $row[0];
        }
    }
    //connect the list to the user
    $sql = "INSERT INTO UserList
            Values(null," .$UserID . "," . $ListID . ")";
    mysqli_query($db, $sql);
    echo "List was created";
?>