<?php header('Access-Control-Allow-Origin: *');
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

        $sql = "Select Password, UserId From User Where UserName = " . $UserName;
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                if("'".htmlspecialchars($row['Password'])."'" == $Password)
                {
                    echo htmlspecialchars($row['UserId']);
                    
                }
                else
                {
                    echo -1;
                }
            }
        } 
        else {
            echo -1;
        }
    } 
    else{
        echo -1;
    }

?>