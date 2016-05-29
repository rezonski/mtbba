<?php
$str_json = file_get_contents('php://input'); //($_POST doesn't work here)
$response = json_decode($str_json, true); // decoding received JSON to array
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mytrails";
$goodones = 0;
$badones = 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


/* change character set to utf8 */
if (!$conn->set_charset("utf8")) {
  // printf("Error loading character set utf8: %s\n", $conn->error);
} else {
  // printf("Current character set: %s\n", $conn->character_set_name());
}


$sql = "INSERT into `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`,`time`,`elevationprofile`)
SELECT `id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`, `elevationprofile`
FROM `trail_version_points`
WHERE `id_version` in (SELECT id
                       FROM `trail_versions`
                       where `id_trail` IN (SELECT `id_trail` 
                                            FROM `trail_versions`
                                            where `id` = ".(int)$response['general']['versionid']."))";

if ($conn->query($sql) === TRUE) {
    // echo "insert into hist_trail_version_points - done <br>";
} else {
    echo "ERROR insert into hist_trail_version_points - error: ". $conn->error."<br>";
}

$sql = "DELETE FROM `trail_version_points`
WHERE `id_version` in (SELECT id
                       FROM `trail_versions`
                       where `id_trail` IN (SELECT `id_trail` 
                                            FROM `trail_versions`
                                            where `id` = ".(int)$response['general']['versionid']."))";

if ($conn->query($sql) === TRUE) {
    // echo "delete from trail_version_points - done <br>";
} else {
    echo "ERROR delete from trail_version_points - error: ". $conn->error."<br>";
}


foreach ($response['waypoints'] as $value) {
    $sql = "INSERT INTO `trail_version_points`
                (
                    `id`, 
                    `id_version`, 
                    `name`, 
                    `desc`, 
                    `lat`, 
                    `lon`, 
                    `elevation`, 
                    `elevgain`, 
                    `elevloss`, 
                    `nextelevgain`, 
                    `nextelevloss`, 
                    `odometer`, 
                    `nextstepdist`, 
                    `symbol`, 
                    `pictogram`, 
                    `pictureurl`,
                    `time`,
                    `elevationprofile`
                ) 
            VALUES 
                (
                    ".(int)$value['id'].",
                    ".(int)$response['general']['versionid'].", 
                    '".$value['name']."', 
                    '".$value['desc']."', 
                    ".$value['lat'].", 
                    ".$value['lon'].", 
                    ".$value['elevation'].", 
                    ".$value['elevgain'].", 
                    ".$value['elevloss'].", 
                    ".$value['nextelevgain'].", 
                    ".$value['nextelevloss'].", 
                    ".$value['odometer'].", 
                    ".$value['nextstepdist'].", 
                    '".$value['symbol']."', 
                    '".$value['pictogram']."', 
                    '".$value['pictureurl']."', 
                    '".$value['time']."',
                    ".(int)$value['elevationprofile']."  
                )";

    if ($conn->query($sql) === TRUE) {
        echo $value['id']." - done " .$value['name']. " <br>";
        $goodones += 1;
    } else {
        $badones += 1;
        echo $value['id']." - error " .$value['name']. " - " . $conn->error."<br>";
        // echo $iterator." - Error: " . $sql . "<br>" . $conn->error;
    }
}
echo "<br>Number of good ones: ".$goodones;
echo "<br>Number of bad ones: ".$badones;
$conn->close();
?>