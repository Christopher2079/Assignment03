<?php
    $UserId = -1;
    $UserId = $_REQUEST["UserId"];
    if($UserId > 0) {
        //echo "Test";
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "SELECT * FROM LISTS WHERE ListId = " . $UserID;


        $result = mysqli_query($db, $sql);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo sprintf("ListId: %s | ListName: %s ", htmlspecialchars($row['ListId']), htmlspecialchars($row['ListName']));
                echo "<br>";
            }
        } else {
            echo "No Lists Found";
        }
    } else{
        echo "ERROR! No Lists found";
    }





?>