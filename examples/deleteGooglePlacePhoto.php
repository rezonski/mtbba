<?php
    header('Access-Control-Allow-Origin: *');
    $log = array();
    array_push($log, "started");
    $return = (object)[];
    $return->success = true;
    $return->msg = "Delete OK";
    $setURL = $_GET['fileName'];
    if (!unlink($setURL)) {
        $return->success = false;
        $return->url = $setURL;
        $return->msg = "Delete NOT OK";
        array_push($log, "Unlink failed");
    }
    $return->log = $log;
    echo json_encode($return);
?>