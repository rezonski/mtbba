<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mytrails";
    $conn = new mysqli($servername, $username, $password, $dbname);

    /* change character set to utf8 */
    if (!$conn->set_charset("utf8")) {
      // printf("Error loading character set utf8: %s\n", $conn->error);
    } else {
      // printf("Current character set: %s\n", $conn->character_set_name());
    }

    $sql = "SELECT MAX(token) as maxtok
            FROM tokens
            WHERE counter = (SELECT MIN(counter) FROM tokens)";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $token = $row["maxtok"];
        }    
    };

    $sql = "UPDATE tokens set counter = (counter+1) where token = '".$token."'";
    
    $result = $conn->query($sql);

    echo $token;
?>