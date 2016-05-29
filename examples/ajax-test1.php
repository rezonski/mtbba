<?php
$str_json = file_get_contents('php://input'); //($_POST doesn't work here)
$response = json_decode($str_json, true); // decoding received JSON to array
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mytrails";
$goodones = 0;
$badones = 0;
$tempelevation = 0;

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

// $result = mysqli_query($conn,"SELECT MAX(id) from `trail_version_points`");
$result = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trail_version_path` where `id_version`=".(int)$response['general']['versionid']);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $iterator = (int)$row['id'];
    }
}

$sql = "INSERT into `hist_trail_version_path` (`id`,`id_version`,`lat`,`lon`,`elevation`,`prev_dist`,`prev_elev`)
SELECT `id`,`id_version`,`lat`,`lon`,`elevation`,`prev_dist`,`prev_elev` 
FROM `trail_version_path`
WHERE `id_version` in (SELECT id
                       FROM `trail_versions`
                       where `id_trail` IN (SELECT `id_trail` 
                                            FROM `trail_versions`
                                            where `id` = ".(int)$response['general']['versionid']."))";

if ($conn->query($sql) === TRUE) {
    // echo "insert into hist_trail_version_path - done <br>";
} else {
    echo "ERROR insert into hist_trail_version_path - error: ". $conn->error."<br>";
}

$sql = "DELETE FROM `trail_version_path`
WHERE `id_version` in (SELECT id
                       FROM `trail_versions`
                       where `id_trail` IN (SELECT `id_trail` 
                                            FROM `trail_versions`
                                            where `id` = ".(int)$response['general']['versionid']."))";

if ($conn->query($sql) === TRUE) {
    // echo "delete from trail_version_path - done <br>";
} else {
    echo "ERROR delete from trail_version_path - error: ". $conn->error."<br>";
}

foreach ($response['path'] as $value) {
    $iterator += 1;
    $sql = "INSERT INTO `trail_version_path` 
                (
                    `id`, 
                    `id_version`, 
                    `lon`, 
                    `lat`, 
                    `elevation`,
                    `prev_dist`,
                    `prev_elev`
                ) 
            VALUES
                (
                    ".$iterator.", 
                    ".(int)$response['general']['versionid'].", 
                    ".$value['lon'].", 
                    ".$value['lat'].", 
                    ".round($value['elevation'],2).", 
                    ".round($value['prev_dist'],5).", 
                    ".round($value['prev_elev'],2)." 
                )";

    if ($conn->query($sql) === TRUE) {
        echo $iterator." - done " .$value['lon']. " elevation ".$value['elevation']." <br>";
        $goodones += 1;
    } else {
        $badones += 1;
        echo $iterator." - Error: " .$value['lon']. " - " . $conn->error."<br>";
        // echo $iterator." - Error: " . $sql . "<br>" . $conn->error;
    }
    // echo "<br>";
}
echo "<br>Number of good ones: ".$goodones;
echo "<br>Number of bad ones: ".$badones;
$conn->close();
?>