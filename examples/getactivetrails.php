<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost:3307";
    $username = "root";
    $password = "letmein";
    $dbname = "staze";
    $conn = new mysqli($servername, $username, $password, $dbname);

    /* change character set to utf8 */
    if (!$conn->set_charset("utf8")) {
      // printf("Error loading character set utf8: %s\n", $conn->error);
    } else {
      // printf("Current character set: %s\n", $conn->character_set_name());
    }

    $trailsarray = '[';
    $tempiterator = 0;

    $sql = "SELECT 
                trail_id,
                trail_slug,
                trail_name,
                trail_desc,
                type_id,
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
                center,
                bounds,
                inputfilename,
                external_link,
                image_url
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
            $sqlmntarray = "SELECT r.id, r.name
                            FROM repo_regions r, trail_regions t
                            where r.id = t.id_mnt 
                            and t.id_trail = ".$row["trail_id"]." order by r.id asc ";
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
                    "trailID": '.$row["trail_id"].',
                    "trailSlug": '.$row["trail_slug"].',
                    "mntns": '.$mntarray.',
                    "trailName": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_name"]).'",
                    "trailDesc": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_desc"]).'",
                    "surface": '.$row["surface"].',
                    "typeID": '.$row["type_id"].',
                    "typeName": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["type_name"]).'",
                    "typeDesc": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["type_desc"]).'",
                    "distance": '.$row["distance"].',
                    "elevMin": '.$row["elev_min"].',
                    "elevMax": '.$row["elev_max"].',
                    "elevGain": '.$row["elev_gain"].',
                    "elevLoss": '.$row["elev_loss"].',
                    "reviewLandscape": '.$row["review_landscape"].',
                    "reviewFun": '.$row["review_fun"].',
                    "requiredFitness": '.$row["required_fitness"].',
                    "requiredTechnique": '.$row["required_technique"].',
                    "center": "'.$row["center"].'",
                    "bounds": "'.$row["bounds"].'",
                    "inputfilename": "'.$row["inputfilename"].'",
                    "externalLink": "'.$row["external_link"].'",
                    "imageUrl": "'.$row["image_url"].'"
                }';
        }
        $trailsarray .=']';   
    };

    echo $trailsarray;
?>