<?php
    include 'dbconnection.php'; 

    if (isset($_GET['trailid'])) {
        $id = $_GET['trailid'];
        
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        /* change character set to utf8 */
        if (!$conn->set_charset("utf8")) {
          // printf("Error loading character set utf8: %s\n", $conn->error);
        } else {
          // printf("Current character set: %s\n", $conn->character_set_name());
        }

        /*
        Path points properties
         */

        $sqlpathproperties = "SELECT
                                trail_id,
                                point_id,
                                lon,
                                lat,
                                elevation,
                                prev_dist,
                                prev_elev 
                            FROM active_path
                            WHERE trail_id = ".$id;

        $resultpathproperties = $conn->query($sqlpathproperties);
        $pathproperties = '';
        $tempiterator = 1;

        if ($resultpathproperties->num_rows > 0) {
            // output data of each row
            while($row = $resultpathproperties->fetch_assoc()) {
                if ($tempiterator > 1) {
                    $pathproperties .= ',';
                }
                $pathproperties .= '
                ['.$row["lon"].','.$row["lat"].','.$row["elevation"].','.$row["prev_dist"].','.$row["prev_elev"].']';
                $tempiterator++;
            }
        } 

        /*
        General trail properties
         */
        

        /*Mountains array*/

        $sqlmntarray = "SELECT
                            r.id,
                            r.name 
                        FROM repo_regions r, trail_regions t 
                        where r.id = t.id_mnt 
                            and t.id_trail = ".$id."
                            order by r.id asc";

        $resultmntarray = $conn->query($sqlmntarray);
        $mntarray = '[';
        $tempiterator = 1;

        if ($resultmntarray->num_rows > 0) {
            // output data of each row
            while($row = $resultmntarray->fetch_assoc()) {
                if ($tempiterator > 1) {
                    $mntarray .= ',';
                }
                // $mntarray .= '{
                //             "id": '.$row["id"].',
                //             "name": "'.$row["name"].'"
                //         }';
                $mntarray .= $row["id"];
                $tempiterator++;
            }
        }

        $mntarray .= ']';

        
        $sqltrailproperties = 
        "SELECT trail_id,
                trail_uuid,
                owner_id,
                publish_status,
                trail_name,
                trail_name_en,
                trail_desc,
                trail_desc_en,
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
        FROM active_trails 
        where trail_id = ".$id;

        $resulttrailpropeties = $conn->query($sqltrailproperties);
        if ($resulttrailpropeties->num_rows > 0) {
            // output data of each row
            while($row = $resulttrailpropeties->fetch_assoc()) {
                $trailProperies = 
    '{
            "type": "Feature",
            "properties": {
                "trailID": "'.$row["trail_id"].'",
                "trailUUID": "'.$row["trail_uuid"].'",
                "ownerID": "'.$row["owner_id"].'",
                "publishStatus": '.$row["publish_status"].',
                "trailName": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_name"]).'",
                "trailNameEn": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_name_en"]).'",
                "trailDesc": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_desc"]).'",
                "trailDescEN": "'.str_replace(array("\r\n", "\n\r", "\r", "\n"), "", $row["trail_desc_en"]).'",
                "mntns": '.$mntarray.',
                "surfaceCollection": '.$row["surface"].',
                "typeID": "'.$row["type_id"].'",
                "typeName": "'.$row["type_name"].'",
                "typeDesc": "'.$row["type_desc"].'",
                "distance": '.$row["distance"].',
                "elevMin": '.$row["elev_min"].',
                "elevMax": '.$row["elev_max"].',
                "elevGain": '.$row["elev_gain"].',
                "elevLoss": '.$row["elev_loss"].',
                "reviewLandscape": '.$row["review_landscape"].',
                "reviewFun": '.$row["review_fun"].',
                "requiredFitness": '.$row["required_fitness"].',
                "requiredTechnique": '.$row["required_technique"].',
                "center": '.$row["center"].',
                "bounds": '.$row["bounds"].',
                "externalLink": "'.$row["external_link"].'",
                "imageURL": "'.$row["image_url"].'"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": ['.$pathproperties.']
            }
        }';
            }
        };

        /*
        Waypoints properties
         */

        $sqlwaypointsproperties = "SELECT
                                    trail_id,
                                    point_id,
                                    point_name,
                                    point_name_en,
                                    point_desc,
                                    point_desc_en,
                                    lon,
                                    lat,
                                    elevation,
                                    elevgain,
                                    elevloss,
                                    nextelevgain,
                                    nextelevloss,
                                    odometer,
                                    nextstepdist,
                                    symbol,
                                    pictogram,
                                    pictureurl,
                                    time,
                                    elevationprofile
                                FROM `active_waypoints`
                                where trail_id = ".$id;

        $resultwaypointsproperties = $conn->query($sqlwaypointsproperties);
        $waypointsproperties = '';

        if ($resultwaypointsproperties->num_rows > 0) {
            // output data of each row
            while($row = $resultwaypointsproperties->fetch_assoc()) {
                $waypointsproperties .= ',
        {
          "type": "Feature",
          "properties": {
            "id": '.$row["point_id"].',
            "name": "'.$row["point_name"].'",
            "nameEn": "'.$row["point_name_en"].'",
            "desc": "'.$row["point_desc"].'",
            "descEn": "'.$row["point_desc_en"].'",
            "symbol": "'.$row["symbol"].'",
            "odometer": '.$row["odometer"].',
            "nextStepDist": '.$row["nextstepdist"].',
            "elevGain": '.$row["elevgain"].',
            "elevLoss": '.$row["elevloss"].',
            "nextElevGain": '.$row["nextelevgain"].',
            "nextElevLoss": '.$row["nextelevloss"].',
            "pictogram": "'.$row["pictogram"].'",
            "pictureUrl": "'.$row["pictureurl"].'",
            "time": "'.$row["time"].'",
            "elevationProfile": '.$row["elevationprofile"].'
          },
          "geometry": {
            "type": "Point",
            "coordinates": ['.$row["lon"].','.$row["lat"].','.$row["elevation"].']
          }
        }';
            }
        } 


        $out = 
    '{
      "type": "FeatureCollection",
      "features": [
        '.$trailProperies.$waypointsproperties.']
    }';

        echo  $out;

    } else {
        echo "Unknown prameters";   
    }
?>