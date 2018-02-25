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
        $logObj->jsondata = $jsondata;
        array_push($steps, 'JSON encoding successfully completed');

        // Check if the file exists
        if(file_exists($path.$destinationFileName)){
            array_push($steps, 'File with name '.$destinationFileName.' already exists in '.$path);
        }

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

    include '../db/dbconnection.php';
    
    mysqli_query($conn, "START TRANSACTION");
    $sql = "UPDATE `trails` SET `publish_status` = 1 WHERE `uuid` = '".$parsedPayload['uuid']."'";
    $logObj->status = ($conn->query($sql));
    array_push($steps, 'UPDATE `trails` SET `publish_status` = 1');

    $logObj->log = $steps;

    if ($logObj->status) {
        mysqli_query($conn, "COMMIT");
        $logObj->transation = "commited";
    } else {
        mysqli_query($conn, "ROLLBACK");
        $logObj->transation = "rollbacked";
    }

    $displayLog = json_encode($logObj);
    echo $displayLog;

    $conn->close();
?>
