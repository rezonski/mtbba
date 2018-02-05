<?php
    $path = '../../jsons/';
    // header('Content-Type: text/plain; charset=utf-8');
    header('Content-Type: application/json');
    // header('charset=utf-8');
    $inputPayload = file_get_contents('php://input'); //($_POST doesn't work here)
    $parsedPayload = json_decode($inputPayload, true); // decoding received JSON to array

    // logging
    $logObj = (object)[];
    $logObj->status = true;
    $logObj->payload = $parsedPayload;
    $steps = array();


    $dataCollection = $parsedPayload['collection'];
    $logObj->collection = $dataCollection;
    $destinationFileName = $parsedPayload['uuid'].'.json';
    $logObj->fileName = $destinationFileName;
    array_push($steps, 'Parsing input parameters successfully completed, destinationFileName = '.$destinationFileName);

    try {
        //Convert updated array to JSON
        $jsondata = json_encode($dataCollection, JSON_UNESCAPED_UNICODE  | JSON_UNESCAPED_SLASHES);
        // $jsondata = json_encode($dataCollection, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE  | JSON_UNESCAPED_SLASHES);
        // $jsondata = json_encode($dataCollection, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); 
        $logObj->jsondata = $jsondata;
        array_push($steps, 'JSON encoding successfully completed');

        // Check if the file exists
        if(file_exists($path.$destinationFileName)){
            array_push($steps, 'File with name '.$destinationFileName.' already exists in '.$path);
        }

        // $fp = fopen($path.$destinationFileName, 'w');
        // fwrite($fp, $jsondata);
        // fclose($fp);

        //write json data into data.json file
        if (file_put_contents($path.$destinationFileName, $jsondata)) {
            array_push($steps, 'Data successfully saved into file '.$path.$destinationFileName);
        }
        else {
            $logObj->status = false;
            array_push($steps, 'Error while saving data');
        }
    }
    catch (Exception $e) {
        $logObj->status = false;
        array_push($steps, 'Caught exception');
    }
    $logObj->log = $steps;
    $displayLog = json_encode($logObj);
    echo $displayLog;
?>
