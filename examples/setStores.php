<?php 
    header('Access-Control-Allow-Origin: *');

    $str_json = file_get_contents('php://input'); //($_POST doesn't work here)
    $response = json_decode($str_json, true); // decoding received JSON to array

    // $fp = fopen('data/stores.geojson', 'w');
    // fwrite($fp, json_encode($response));
    // fclose($fp);

    $logObj = (object)[];
    $logObj->status = true;
    $json_data = json_encode($response);
    file_put_contents('data/stores.geojson', $json_data);
    $displayLog = json_encode($logObj);
    echo $displayLog;
?>