<?php
    if (isset($_GET['getURL']) && isset($_GET['setURL'])) {  
        $getURL = $_GET['getURL'];
        $setURL = $_GET['setURL'];
        $getURL = "http://www.theonlytutorials.com/images/logo.png";
        $file = file_get_contents($getURL); 
        if (file_put_contents($setURL, $file) === false) {
            echo "# Error: Unable to upload"; 
        } else {
            echo $setURL;
        }
    } else {
        echo "# Error: Unknown prameters";   
    }
?>