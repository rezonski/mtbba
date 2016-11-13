<?php
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

    $trailsarray = '[';
    $tempiterator = 0;

    $sql = "SELECT trail_id,
                trail_name,
                trail_desc,
                type_name,
                type_desc,
                COALESCE(distance,0) AS `distance`,
                COALESCE(elev_min,0) AS `elev_min`,
                COALESCE(elev_max,0) AS `elev_max`,
                COALESCE(elev_gain,0) AS `elev_gain`, 
                COALESCE(elev_loss,0) AS `elev_loss`,
                COALESCE(surface,'null') AS `surface`,
                COALESCE(review_landscape,0) AS `review_landscape`,
                COALESCE(review_fun,0) AS `review_fun`,
                COALESCE(required_fitness,0) AS `required_fitness`,
                COALESCE(required_technique,0) AS `required_technique`,
                COALESCE(lat_center,0) AS `lat_center`,
                COALESCE(lon_center,0) AS `lon_center`,
                COALESCE(bounds,0) AS `bounds` 
            FROM active_trails";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if ($tempiterator > 0) {
                $trailsarray .= ',';
            }
            $tempiterator++;

            /*Mountains array*/
            $sqlmntarray = 
            "SELECT r.id, r.name FROM repo_regions r, trail_regions t where r.id = t.id_mnt and t.id_trail = ".$row["trail_id"]." order by r.id asc ";
            $resultmntarray = $conn->query($sqlmntarray);
            $mntarray = '[';
            $tempmntiterator = 0;
            if ($resultmntarray->num_rows > 0) {
                // output data of each row
                while($mntrow = $resultmntarray->fetch_assoc()) {
                    if ($tempmntiterator > 0) {
                        $mntarray .= ',';
                    }
                    $mntarray .= '{
                                "id": '.$mntrow["id"].',
                                "name": "'.$mntrow["name"].'"
                            }';
                    $tempmntiterator++;
                }
            }
            $mntarray .= ']';
            
            $trailsarray .='
    {
        "name": "'.$row["trail_name"].'",
        "trail_id": "'.$row["trail_id"].'",
        "mntns": '.$mntarray.',
        "trail_name": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_name"]).'",
        "trail_desc": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_desc"]).'",
        "surface": '.$row["surface"].',
        "type_name": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["type_name"]).'",
        "type_desc": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["type_desc"]).'",
        "distance": '.$row["distance"].',
        "elev_min": '.$row["elev_min"].',
        "elev_max": '.$row["elev_max"].',
        "elev_gain": '.$row["elev_gain"].',
        "elev_loss": '.$row["elev_loss"].',
        "review_landscape": '.$row["review_landscape"].',
        "review_fun": '.$row["review_fun"].',
        "required_fitness": '.$row["required_fitness"].',
        "required_technique": '.$row["required_technique"].',
        "lat_center": '.$row["lat_center"].',
        "lon_center": '.$row["lon_center"].',
        "bounds": '.$row["bounds"].'
    }';
        }
        $trailsarray .=']';   
    };

    echo $trailsarray;
?>