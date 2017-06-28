<?php
    include 'dbconnection.php'; 

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