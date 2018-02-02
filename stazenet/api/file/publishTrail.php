<?php
  
  $inputPayload = file_get_contents('php://input'); //($_POST doesn't work here)
  $parsedPayload = json_decode($inputPayload, true); // decoding received JSON to array

  // logging
  $logObj = (object)[];
  $logObj->status = true;
  $steps = array();

  $dataCollection = $parsedPayload['collection'];
  $destinationFilename = $parsedPayload['uuid'].'.json';

  try {
    //Convert updated array to JSON
    $jsondata = json_encode($dataCollection, JSON_PRETTY_PRINT);
    array_push($steps, 'JSON encoding successfully completed');

    //write json data into data.json file
    if (file_put_contents($destinationFilename, $jsondata)) {
      array_push($steps, 'Data successfully saved into file '.$destinationFilename);
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
