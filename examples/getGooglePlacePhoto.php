<?php
    header('Access-Control-Allow-Origin: *');
    $log = array();
    array_push($log, "started");
    $return = (object)[];
    $return->success = true;
    if (isset($_GET['photoReference']) && isset($_GET['fileName']) && isset($_GET['key'])) {  
        $getURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference='.urlencode($_GET['photoReference']).'&key='.$_GET['key'];
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