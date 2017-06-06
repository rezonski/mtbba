<?php
    header('Access-Control-Allow-Origin: *');
    $log = array();
    array_push($log, "started");
    $return = (object)[];
    $return->success = true;
    if (isset($_GET['geojson']) && isset($_GET['fileName']) && isset($_GET['mapParams']) && isset($_GET['deleteFile'])) {  
        $getURL = 'https://api.mapbox.com/v4/mapbox.satellite/geojson('.urlencode($_GET['geojson']).')/'.$_GET['mapParams'].'/300x300.png?access_token=pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
        $setURL = 'upload/'.$_GET['fileName'];
        $deleteFile = $_GET['deleteFile'];
        array_push($log, "Get picture from ".$getURL." and save to ".$setURL);
        $file; 
        try {
            $file = file_get_contents($getURL); 
            if (file_put_contents($setURL, $file) === false) {
                $return->success = false;
                $return->msg = "Unable to upload";
                array_push($log, "Error: Unable to upload");
            } else {
                $return->url = $setURL;
                array_push($log, "Upload OK");
                if (strlen($deleteFile) > 0) {
                    array_push($log, "Try deleting ");
                    if (!unlink($deleteFile)) {
                        $return->success = false;
                        $return->msg = "Error deleting file ".$deleteFile;
                        array_push($log, "Error deleting file ".$deleteFile);
                    }
                    else {
                        array_push($log, "Deleted file ".$deleteFile);
                    }
                }
            }
        }
        catch (Exception $e) {
            $return->success = false;
            $return->msg = $e;
            array_push($log, "Error: ".$e);
        }
    } else {
        $return->success = false;
        $return->msg = "Unknown prameters";
        array_push($log, "Error: Unknown prameters");
    }
    $return->log = $log;
    echo json_encode($return);
?>