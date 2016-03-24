<?php header('Access-Control-Allow-Origin: *');
    $ItemName = "";
    $ListId = -1;
    $ItemName = $_REQUEST["ItemName"];
    $ListId = $_REQUEST["ListId"];

    if($ItemName != "" || $ListId < 0) {
        //echo "Test2";
        $db = mysqli_connect('localhost',
            'W01162084',
            'Jaysoncs!',
            'W01162084');

        $sql = "Insert Into ListItems Values(null, ".$ItemName.", NOW(), ".$ListId.", 0)";


        mysqli_query($db, $sql);

    } 
    else{
        echo "ERROR! Item Name Wrong or List Id < 0";
    }

?>