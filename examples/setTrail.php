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

$lines = $response['lines'];
$waypoints = $response['waypoints'];
$generalFacts = $response['generalFacts'];
$newTrail = ($generalFacts['trailID'] != null && $generalFacts['trailVersionID'] != null) ? false : true;

if ($generalFacts['trailID'] != null && $generalFacts['trailVersionID'] != null) {
    $newTrail = false;
    $trailID = $generalFacts['trailID'];
    $oldVersionID = (int)$generalFacts['trailVersionID'];
} else {
    $maxTrailIDresults = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trails`");
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($maxTrailIDresults)) {
            $trailID = (int)$row['id'] + 1;
        }
    }
}


// PATHS
if (1==1) {
    if(!$newTrail) {
        // UPDATE TRAIL DATA
        $sql = "UPDATE `trails` SET
                    `name` = '".$response['trailName']."',
                    `name_en` = '".$response['trailNameEn']."',
                    `slug` = '".str_replace(
                                    array("š","đ","ž","č","ć","!","?",")","(","&"," "),
                                    array("s","dj","z","c","c","","","","","","-"), 
                                    mb_strtolower($response['trailName'])
                                )."',
                    `desc` = '".$response['trailDesc']."',
                    `desc_en` = '".$response['trailDescEn']."'
                WHERE `id` = ".$trailID;

        if ($conn->query($sql) === TRUE) {
            echo "EXISTING_ID_$".$trailID."#endTrailId<br>";
        } else {
            echo "ERROR: UPDATE trails NOT OK : ". $sql . "<br>" . $conn->error;
        }

        // SET OLD VERSION ID TO INACTIVE
        $sql = "UPDATE `trail_versions` set `active` = 0 where `id_trail` = ".$trailID;
        if ($conn->query($sql) === TRUE) {
            // echo "UPDATE trail_versions to inactive OK";
        } else {
            echo "ERROR: UPDATE trail_versions to inactive NOT OK : ". $sql . "<br>" . $conn->error;
        }
    } else {
        $sql = "INSERT INTO `trails`
                    (
                        `id`,
                        `name`,
                        `name_en`,
                        `slug`,
                        `desc`,
                        `desc_en`
                    ) 
                VALUES
                    (
                        ".$trailID.", 
                        '".$response['trailName']."',
                        '".$response['trailNameEn']."',
                        '".str_replace(array("š","đ","ž","č","ć","!","?",")","(","&"," "), array("s","dj","z","c","c","","","","","","-"), mb_strtolower($response['trailName']))."',
                        '".$response['trailDesc']."',
                        '".$response['trailDescEn']."'
                    )";

        if ($conn->query($sql) === TRUE) {
            echo "NEW_ID_$".$trailID."#endTrailId<br>";
        } else {
            echo "ERROR: INSERT INTO trails NOT OK : ". $sql . "<br>" . $conn->error;
        }
    }

    // INSERT NEW VERSION
    $sql = "INSERT INTO `trail_versions`
                (
                    `id_trail`, 
                    `date`, 
                    `active`,
                    `trail_type`,
                    `distance`,
                    `elev_gain`,
                    `elev_loss`,
                    `elev_min`,
                    `elev_max`,
                    `surface`,
                    `review_landscape`,
                    `review_fun`,
                    `required_fitness`,
                    `required_technique`,
                    `center`,
                    `bounds`,
                    `inputfilename`,
                    `external_link`,
                    `image_url`
                ) 
            VALUES
                (
                    ".$trailID.", 
                    CURTIME(),
                    1,
                    ".$generalFacts['typeID'].",
                    ".$generalFacts['distance'].",
                    ".$generalFacts['elevGain'].",
                    ".$generalFacts['elevLoss'].",
                    ".$generalFacts['elevMin'].",
                    ".$generalFacts['elevMax'].",
                    '".json_encode($generalFacts['surfaceCollection'])."',
                    ".$generalFacts['reviewLandscape'].",
                    ".$generalFacts['reviewFun'].",
                    ".$generalFacts['requiredFitness'].",
                    ".$generalFacts['requiredTechnique'].",
                    '".json_encode($generalFacts['center'])."'
                    '".json_encode($generalFacts['bounds'])."'
                    '".$generalFacts['fileName']."'
                    '".$generalFacts['externalLink']."'
                    '".$generalFacts['imageURL']."'
                )";

    if ($conn->query($sql) === TRUE) {
        // echo "INSERT INTO trail_versions OK";
    } else {
        echo "ERROR: INSERT INTO trail_versions NOT OK : ". $sql . "<br>" . $conn->error;
    }

    // GET NEW VERSION ID
    $result = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trail_versions` where `id_trail` = ".$trailID." and `active` = 1");
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while ($row = mysqli_fetch_assoc($result)) {
            $newVersionID = (int)$row['id'];
            echo "NEW_VERSIONID_$".$newVersionID."#endVersionId";
        }
    }
}

// WAYPOINTS
if (2==2) { 
    // UPDATE & DELETE
    if (!$newTrail) {
        // BACKUP OLD WAYPOINTS
        $sql = "INSERT into `hist_trail_version_points` 
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
            SELECT `id`, 
                    `id_version`, 
                    `name`, 
                    `name_en`, 
                    `desc`, 
                    `desc_en`, 
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
                    `elevationprofile`,
                    `wp_geojson`
            FROM `trail_version_points`
            WHERE `id_version` = ".$oldVersionID;
        
        if ($conn->query($sql) === TRUE) {
            // echo "insert into hist_trail_version_points - done <br>";
        } else {
            echo "ERROR insert into hist_trail_version_points - error: ". $conn->error."<br>";
        }

        // DELETE OLD WAYPOINTS
        $sql = "DELETE FROM `trail_version_points`
                    where `id_version` = ".$oldVersionID;

        if ($conn->query($sql) === TRUE) {
            // echo "delete from trail_version_points - done <br>";
        } else {
            echo "ERROR delete from trail_version_points - error: ". $conn->error."<br>";
        }
    }
    // INSERT NEW
    foreach ($waypoints as $value) {
        $sql = "INSERT INTO `trail_version_points`
                    (
                        `id`, 
                        `id_version`, 
                        `name`, 
                        `name_en`, 
                        `desc`, 
                        `desc_en`, 
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
                        `elevationprofile`,
                        `wp_geojson`
                    ) 
                VALUES 
                    (
                        ".(int)$value['id'].",
                        ".$newVersionID.", 
                        '".$value['name']."', 
                        '".$value['nameEn']."', 
                        '".$value['desc']."', 
                        '".$value['descEn']."', 
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
                        ".(int)$value['elevationprofile'].",
                        '".$value['wpGeoJSON']."'
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
}

// MOUNTAIN & TRAILS
if (3==3) {
    $mntns = $generalFacts['mntns'];
    if (!$newTrail) {
        $sql = "DELETE FROM `trail_regions` WHERE `id_trail` = ".$trailID;
        if ($conn->query($sql) === TRUE) {
            // echo "OK DELETE FROM trail_regions where id_trail = ".$trailID;
        } else {
            echo "ERROR: DELETE FROM trail_regions where id_trail = ".$trailID." : ". $sql . "<br>" . $conn->error;
        }
    }

    foreach ($mntns as $idmnt) {
        $sql = "INSERT INTO `trail_regions` (`id_trail`,`id_mnt`) VALUES (".$trailID.", ".$idmnt.")";
        if ($conn->query($sql) === TRUE) {
            // echo "OK INSERT INTO trail_region trail_id ".$id." mnt_id ".$idmnt;
        } else {
            echo "ERROR INSERT INTO trail_region trail_id ".$trailID." mnt_id ".$idmnt." : ". $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>