<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mysql";

$conn = new mysqli($servername, $username, $password, $dbname);

/* change character set to utf8 */
if (!$conn->set_charset("utf8")) {
// printf("Error loading character set utf8: %s\n", $conn->error);
} else {
// printf("Current character set: %s\n", $conn->character_set_name());
}

$sqlreparray = 
"SELECT id, guid, post_date, post_title, post_content FROM wp_posts where post_type = 'post' and post_status = 'publish' and post_author = 13 ORDER BY `wp_posts`.`ID` asc";

$resultreparray = $conn->query($sqlreparray);

if ($resultreparray->num_rows > 0) {
    // output data of each row
    while($row = $resultreparray->fetch_assoc()) {
echo '*********************************************************************************************
';
echo  $row["post_title"].'

';
echo  $row["guid"].'
';
echo  $row["post_date"].'

';
echo  str_replace("\n", "", str_replace("\r", "", strip_tags($row["post_content"])));
echo  '


';
    }
}
?>