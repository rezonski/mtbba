<?php
    if (isset($_GET['polyline']) && isset($_GET['fileName'])) {  
        $getURL = 'https://api.mapbox.com/v4/mapbox.streets/path-5+f44-0.5+f44-0.2('.urlencode($_GET['polyline']).')/18.501629601708554,43.843932094371844,10/500x300.png?access_token=pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
        // echo $getURL;
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