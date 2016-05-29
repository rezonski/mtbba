
<?php
$str_json = file_get_contents('php://input'); //($_POST doesn't work here)
$response = json_decode($str_json, true); // decoding received JSON to array
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mytrails";
$goodones = 0;
$badones = 0;
$id;

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

if ($response['newupdate'] == "new") {
    // $result = mysqli_query($conn,"SELECT MAX(id) from `trail_version_points`");
    $result = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trails`");
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            $id = (int)$row['id'] + 1;
        }
    }

    $sql = "INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) 
            VALUES (".$id.", 
                    '".$response['name']."',
                    '".str_replace(array("š","đ","ž","č","ć","!","?",")","(","&"," "), array("s","dj","z","c","c","","","","","","-"), mb_strtolower($response['name']))."',
                    '".$response['description']."')";

    if ($conn->query($sql) === TRUE) {
        echo "NEW_ID_$".$id."#endTrailId
";
    } else {
        echo "ERROR: INSERT INTO trails NOT OK : ". $sql . "<br>" . $conn->error;
    }

    foreach ($response['idplanine'] as $idmnt) {
        $sql = "INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) 
                VALUES (".$id.", ".$idmnt.")";

        if ($conn->query($sql) === TRUE) {
            // echo "OK INSERT INTO trail_region trail_id ".$id." mnt_id ".$idmnt;
        } else {
            echo "ERROR INSERT INTO trail_region trail_id ".$id." mnt_id ".$idmnt." : ". $sql . "<br>" . $conn->error;
        }
    }


} else {
    $id = (int)$response['id'];
    $sql = "UPDATE `trail_versions` set `active` = 0 where `id_trail` = ".$id;

    if ($conn->query($sql) === TRUE) {
        // echo "UPDATE trail_versions to inactive OK";
    } else {
        echo "UPDATE trail_versions to inactive NOT OK : ". $sql . "<br>" . $conn->error;
    }
}

$sql = "INSERT INTO `trail_versions`
        (   `id_trail`, 
            `date`, 
            `active`,
            `trail_type`,
            `distance`,
            `elev_gain`,
            `elev_loss`,
            `surface`,
            `inputfilename`
        ) 
        VALUES
        (
            ".$id.", 
            CURTIME(),
            1,
            ".$response['idtrailtype'].",
            ".$response['distance'].",
            ".$response['elevgain'].",
            ".$response['elevloss'].",
            '".$response['sastav']."',
            '".$response['inputfilename']."'
        )";

if ($conn->query($sql) === TRUE) {
    // echo "INSERT INTO trail_versions OK";
} else {
    echo "INSERT INTO trail_versions NOT OK : ". $sql . "<br>" . $conn->error;
}

$result = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trail_versions` where `id_trail` = ".$id." and `active` = 1");
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $versionid = (int)$row['id'];
        echo "NEW_VERSIONID_$".$versionid."#endVersionId";
    }
}

$conn->close();
?>