<?php 
    $UserId = -1;
    $UserId = $_REQUEST["UserId"];
    //echo "test1";
    if($UserId > 0) {
        //echo "Test2";
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "SELECT ListName FROM Lists li 
                Join UserList ul on li.ListId = ul.ListId
                JOIN User us ON ul.UserId = us.UserId
                WHERE us.UserId = " . $UserId;


        $result = mysqli_query($db, $sql);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo sprintf("| %s |", htmlspecialchars($row['ListName']));
               // echo "<br>";
            }
        } 
        else {
            echo "No Lists Found";
        }
        
    } 
    else{
        echo "ERROR! No Lists found";
    }

?>