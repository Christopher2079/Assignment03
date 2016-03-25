<?php header('Access-Control-Allow-Origin: *');
    $ItemId = -1;
    $ItemId = $_REQUEST["ItemId"];

    if($ItemId > 0) {
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "DELETE FROM ListItems WHERE ItemId = ".$ItemId."";


        mysqli_query($db, $sql);

    } 
    else{
        echo "ERROR! ItemId < 0";
    }

?>