<?php
  $steps = array();

  $myObj = (object)[];
  $myObj->name = "John";
  $myObj->age = (object)[];
  $myObj->age->first = 30;
  $myObj->age->last = 30;
  $myObj->city = "New York";

  $myObj->age->last = 30;
  
  array_push($steps, (object)array("step" => "Setting charset", "status" => 1, "log" => "Error loading character"));
  array_push($steps, (object)array("step" => "asdasddas", "status" => 0, "log" => "Error 1111 character"));
  array_push($steps, (object)array("step" => "Afdsdf sds", "status" => 1, "log" => "Error load23423423ing character"));

  $myObj->log = $steps;

  $myJSON = json_encode($myObj);

  echo $myJSON;
?>