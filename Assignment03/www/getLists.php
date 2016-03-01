<?php header('content-type: application/json; charset=utf-8');
    $UserId = -1;
    $UserId = $_REQUEST["UserId"];
    //echo "test1";
    if($UserId > 0) {
        //echo "Test2";
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "SELECT * FROM Lists WHERE ListId = " . $UserId;


        $result = mysqli_query($db, $sql);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo sprintf("ListId: %s | ListName: %s ", htmlspecialchars($row['ListId']), htmlspecialchars($row['ListName']));
                echo "<br>";
            }
        } 
        else {
            echo "No Lists Found";
        }
        
    } 
    else{
        echo "ERROR! No Lists found";
    }
    $data = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    echo $_GET['callback'].'('.json_encode($data).')';
?>