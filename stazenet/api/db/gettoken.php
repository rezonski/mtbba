<?php
    include 'dbconnection.php'; 

    mysqli_query($conn, "START TRANSACTION");

    // $sql = "SELECT MAX(token) as maxtok
    //         FROM tokens
    //         WHERE counter = (SELECT MIN(counter) FROM tokens)";
    
    $sql = "SELECT token as tok, mapboxsourceid as sid, mapboxlayerid as lid 
            FROM tokens 
            WHERE token = (SELECT MAX(token) 
                            FROM tokens 
                            WHERE counter = (SELECT MIN(counter) 
                                                FROM tokens))";

    $result = $conn->query($sql);
    $returnObj = (object)[];
    
    $token = '';

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $token = $row["tok"];
            $returnObj->token = $row["tok"];
            $returnObj->sid = $row["sid"];
            $returnObj->lid = $row["lid"];
        }    
    };

    $sql = "UPDATE tokens set counter = (counter+1) where token = '".$token."'";
    
    $result = $conn->query($sql);

    mysqli_query($conn, "COMMIT");

    $displayLog = json_encode($returnObj);
    echo $displayLog;
    $conn->close();
?>