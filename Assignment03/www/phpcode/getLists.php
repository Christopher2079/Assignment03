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


        $result = mysqli_query($db, $sql);
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<ul data-role="listview" data-split-icon="plus" data-theme="a" data-split-theme="b" data-inset="true">
                        <li><a href="#">
                        <h2>'.htmlspecialchars($row['ListName']).'</h2>
                        </a><a href="#'.htmlspecialchars($row['ListId']).'_addItem" data-rel="popup" data-position-to="window" data-transition="pop">Add Item</a>
                    </li>
                    
                    <div data-role="popup" id="'.htmlspecialchars($row['ListId']).'_addItem" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">
                        <h3>Add Item</h3>
                        <p>Enter Item Information: </p>
                        <form id="addItem">
                            Item Name: <input type="text" id="addItemName"><br>
                        </form>
                        <a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="addItem('.htmlspecialchars($row['ListId']).');">Add Item</a>
                    <a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini">Cancel</a>
                    </div>';
                    
                $sql = "Select ItemId, ItemName FROM ListItems Where ListId = ".htmlspecialchars($row['ListId']);
                $itemResult = mysqli_query($db, $sql);
                if($itemResult)
                {
                    while($row = mysqli_fetch_assoc($itemResult)){
                        
                        
                        echo '<li><a href="#">
                                <h2>'.htmlspecialchars($row['ItemName']).'</h2>
                                </a><a href="#'.htmlspecialchars($row['ItemId']).'_editItem" data-theme="a" data-rel="popup" data-position-to="window" data-transition="pop">'.htmlspecialchars($row['ItemName']).'</a>
                            </li>
                            
                            <div data-role="popup" id="'.htmlspecialchars($row['ItemId']).'_editItem" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">
                            <h3>Edit Item</h3>
                            <a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="removeItem('.htmlspecialchars($row['ItemId']).');">Remove Item</a>
                            <a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini" onclick="checkOffItem('.htmlspecialchars($row['ItemId']).');">Check Off</a>
                            <a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini">Cancel</a>
                        </div>';
                        
                    }
                }
                echo '</ul>';
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

























