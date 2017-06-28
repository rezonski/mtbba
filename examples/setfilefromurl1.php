<?php
    if (isset($_GET['polyline']) && isset($_GET['mapParams']) && isset($_GET['fileName'])) {  
        $token = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
        $getURL = 'https://api.mapbox.com/v4/mapbox.streets/path-4+f44-0.5+f44-0('.urlencode($_GET['polyline']).')/'.urlencode(isset($_GET['mapParams'])).'/500x300.png?access_token='.$token;
        // echo '</br>Value:</br>';
        // echo 'kumwFrjvbMaf%40kuD%7BnCkS';
        echo '</br>Parsed:</br>';
        echo $_GET['polyline'];
        echo '</br>Encoded:</br>';
        echo urlencode($_GET['polyline']);
        echo '</br>URL:</br>';
        echo $getURL;
        echo '</br>';
        $setURL = 'upload/'.$_GET['fileName'];
        
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