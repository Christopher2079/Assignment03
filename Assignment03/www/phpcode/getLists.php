<?php header('Access-Control-Allow-Origin: *');
    $UserId = -1;
    $UserId = $_REQUEST["UserId"];
    //echo "test1";
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
        
        echo '<div id="ListDiv">';

        echo'<ul data-role="listview" data-icon="false" data-theme="a" data-split-theme="b" data-inset="true">
                        <li><a href="#AddList" data-rel="popup" data-position-to="window" data-transition="pop" onclick="createAddListPopup();">
                            <h2><Center>Add New List</Center></h2>
                            </a>
                        </li>

            </ul>';
        
        
        
        
        
        
        $result = mysqli_query($db, $sql);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<ul data-role="listview" data-split-icon="plus" data-theme="a" data-split-theme="b" data-inset="true">
                        <li><a href="#" >
                        <h2>'.htmlspecialchars($row['ListName']).'</h2>
                        </a><a href="#'.htmlspecialchars($row['ListId']).'_addItem" data-rel="popup" data-position-to="window" data-transition="pop" onclick="createAddItemPopup('.htmlspecialchars($row['ListId']).');">Add Item</a>
                    </li>';
                    
                    
                    
                $sql = "Select ItemId, ItemName, ItemCheckedOff  FROM ListItems Where ListId = ".htmlspecialchars($row['ListId']);
                $itemResult = mysqli_query($db, $sql);
                if($itemResult)
                {
                    while($row = mysqli_fetch_assoc($itemResult)){
                        
                        
                        echo '<li data-icon="info"><a href="#">';
                        
                        //Check to see if the item in the list has been check off
                        if(!htmlspecialchars($row['ItemCheckedOff'])){
                           echo'<h2>'.htmlspecialchars($row['ItemName']).'</h2>';
                        }
                        else{
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

?>

























