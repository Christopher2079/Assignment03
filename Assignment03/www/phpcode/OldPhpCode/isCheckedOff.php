<?php header('Access-Control-Allow-Origin: *');
    $ItemId = -1;
    $isCheckedOff = -1;
    $ItemId = $_REQUEST["ItemId"];
    $isCheckedOff = $_REQUEST["isCheckedOff"];

    if($ItemId > 0 || $isCheckedOff > 0) {
        //echo "Test2";
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "UPDATE ListItems SET ItemCheckedOff =".$isCheckedOff." WHERE ItemId = ".$ItemId."";


        mysqli_query($db, $sql);

    } 
    else{
        echo "ERROR! ItemId < 0 || ischeckedoff < 0";
    }

?>