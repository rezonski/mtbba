<?php
    header('Access-Control-Allow-Origin: *');
    
    $servername = "localhost";
    $username = "root";
    $password = "letmein";
    $dbname = "staze";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // $servername = "localhost";
    // $username = "root";
    // $password = "vJF;1GlzU$r7";
    // $dbname = "mermtb11_staze";
    // $conn = new mysqli($servername, $username, $password, $dbname);

    // $servername = "localhost";
    // $username = "mermtb11_stazeadmin";
    // $password = "iU*87MI^.T[A";
    // $dbname = "mermtb11_staze";
    // $conn = new mysqli($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        /* change character set to utf8 */
        if (!$conn->set_charset("utf8")) {
          die("Error loading character set utf8: %s\n".$conn->error);
        }
    }
?>