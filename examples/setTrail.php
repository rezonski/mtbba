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
    } else {
        mysqli_query($conn, "START TRANSACTION");

        $logObj = (object)[];
        $logObj->status = true;
        $steps = array();

        if (!$conn->set_charset("utf8")) {
            $logObj->status = false;
            array_push($steps, (object)array("step" => "Setting charset", "status" => $logObj->status, "log" => "Error loading character set utf8: ".$conn->error));
        } else {
            $logObj->status = true;
            array_push($steps, (object)array("step" => "Setting charset", "status" => $logObj->status, "log" => "Current character set".$conn->character_set_name()));
        }

        $lines = $response['lines'];
        $waypoints = $response['waypoints'];
        $generalFacts = $response['generalFacts'];
        $newTrail = ($generalFacts['trailID'] == null || $generalFacts['trailVersionID'] == null);

        $logObj->newTrail = $newTrail;

        if (!$newTrail) {
            $trailID = (int)$generalFacts['trailID'];
            $oldVersionID = (int)$generalFacts['trailVersionID'];
            $logObj->oldVersionID = $oldVersionID;
            array_push($steps, (object)array("step" => "Parsing ID", "status" => 1, "log" => "Existing trail: $trailID = ".$trailID." , $oldVersionID = ".$oldVersionID));
        } else {
            $sql = "SELECT MAX(id) as 'id' from `trails`";
            $maxTrailIDresults = mysqli_query($conn,$sql);
            if (mysqli_num_rows($maxTrailIDresults) > 0) {
                while($row = mysqli_fetch_assoc($maxTrailIDresults)) {
                    $trailID = (int)$row['id'] + 1;
                }
            }
            array_push($steps, (object)array("step" => "Parsing ID", "status" => 1, "log" => "New trail: $trailID = ".$trailID));
        }

        $logObj->trailID = $trailID;

        // GENERAL
        if (1==1 && $logObj->status) {
            if(!$newTrail) {
                // UPDATE TRAIL DATA
                $sql = "UPDATE `trails` SET
                            `name` = '".$generalFacts['trailName']."',
                            `name_en` = '".$generalFacts['trailNameEn']."',
                            `slug` = '".str_replace(
                                            array("š","đ","ž","č","ć","!","?",")","(","&"," "),
                                            array("s","dj","z","c","c","","","","","","-"), 
                                            mb_strtolower($generalFacts['trailName'])
                                        )."',
                            `desc` = '".$generalFacts['trailDesc']."',
                            `desc_en` = '".$generalFacts['trailDescEn']."'
                        WHERE `id` = ".$trailID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "general", "step" => "UPDATE trails", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));

                // SET OLD VERSION ID TO INACTIVE
                $sql = "UPDATE `trail_versions` set `active` = 0 where `id_trail` = ".$trailID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "general", "step" => "UPDATE trail_versions set active = 0", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));

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
                                '".$generalFacts['trailName']."',
                                '".$generalFacts['trailNameEn']."',
                                '".str_replace(array("š","đ","ž","č","ć","!","?",")","(","&"," "), array("s","dj","z","c","c","","","","","","-"), mb_strtolower($generalFacts['trailName']))."',
                                '".$generalFacts['trailDesc']."',
                                '".$generalFacts['trailDescEn']."'
                            )";
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "general", "step" => "INSERT INTO trails", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
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
                            ".$generalFacts['trailTypeID'].",
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
                            '".json_encode($generalFacts['center'])."',
                            '".json_encode($generalFacts['bounds'])."',
                            '".$generalFacts['fileName']."',
                            '".$generalFacts['externalLink']."',
                            '".$generalFacts['imageURL']."'
                        )";
            $sql = str_replace(array("\n", "\r", "  "), "", $sql);
            $logObj->status = ($conn->query($sql));
            array_push($steps, (object)array("segment" => "general", "step" => "INSERT INTO trail_versions", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));


            // GET NEW VERSION ID
            $result = mysqli_query($conn,"SELECT MAX(id) as 'id' from `trail_versions` where `id_trail` = ".$trailID." and `active` = 1");
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $newVersionID = (int)$row['id'];
                }
            }
            $logObj->newVersionID = $newVersionID;
            $sql = str_replace(array("\n", "\r", "  "), "", $sql);
            $logObj->status = ($conn->query($sql));
            array_push($steps, (object)array("segment" => "general", "step" => "GET NEW VERSION ID", "status" => 1, "log" => "$newVersionID = ".$newVersionID));
        }

        // PATH
        if (2==2 && $logObj->status) {
            // UPDATE & DELETE
            if (!$newTrail) {
                // BACKUP EXISTING PATH
                $sql = "INSERT into `hist_trail_version_path`
                            (
                                `id`,
                                `id_version`,
                                `lat`,
                                `lon`,
                                `elevation`,
                                `prev_dist`,
                                `prev_elev`
                            )
                        SELECT 
                            `id`,
                            `id_version`,
                            `lat`,
                            `lon`,
                            `elevation`,
                            `prev_dist`,
                            `prev_elev` 
                        FROM `trail_version_path`
                        WHERE `id_version` = ".$oldVersionID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "path", "step" => "INSERT into hist_trail_version_path", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
                
                // DELETE EXISTING PATH
                $sql = "DELETE FROM `trail_version_path` WHERE `id_version` = ".$oldVersionID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "path", "step" => "DELETE FROM trail_version_path", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
            }

            foreach ($lines as $line) {
                $goodones = 0;
                $badones = 0;
                $geometry = $line["geometry"];
                $coordinates = $geometry["coordinates"];
                foreach ($coordinates as $value) {
                    $sql = "INSERT INTO `trail_version_path` 
                                (
                                    `id_version`, 
                                    `lon`, 
                                    `lat`, 
                                    `elevation`,
                                    `prev_dist`,
                                    `prev_elev`
                                ) 
                            VALUES
                                (
                                    ".$newVersionID.", 
                                    ".$value['lon'].", 
                                    ".$value['lat'].", 
                                    ".round($value['elevation'],2).", 
                                    ".round($value['prevDist'],5).", 
                                    ".round($value['prevElev'],2)." 
                                )";
                    if ($conn->query($sql) === TRUE) {
                        $goodones += 1;
                    } else {
                        $badones += 1;
                    }
                }
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "path", "step" => "INSERT INTO trail_version_path", "status" => 1, "log" => "Total good/bad: ".$goodones."/".$badones));
            }
        }

        // WAYPOINTS
        if (3==3 && $logObj->status) { 
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
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "waypoints", "step" => "INSERT into hist_trail_version_points", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));

                // DELETE OLD WAYPOINTS
                $sql = "DELETE FROM `trail_version_points` where `id_version` = ".$oldVersionID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("segment" => "waypoints", "step" => "DELETE FROM trail_version_points", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
            }
            // INSERT NEW
            $goodones = 0;
            $badones = 0;
            foreach ($waypoints as $waypoint) {
                $property = $waypoint["properties"];
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
                                ".(int)$property['id'].",
                                ".$newVersionID.", 
                                '".$property['name']."', 
                                '".$property['nameEn']."', 
                                '".$property['desc']."', 
                                '".$property['descEn']."', 
                                ".$property['lat'].", 
                                ".$property['lon'].", 
                                ".$property['elevation'].", 
                                ".$property['elevGain'].", 
                                ".$property['elevLoss'].", 
                                ".$property['nextElevGain'].", 
                                ".$property['nextElevLoss'].", 
                                ".$property['odometer'].", 
                                ".$property['nextStepDist'].", 
                                '".$property['symbol']."', 
                                '".$property['pictogram']."', 
                                '".$property['pictureUrl']."', 
                                '".$property['time']."',
                                ".(int)$property['elevationProfile'].",
                                '".json_encode($property['wpGeoJSON'])."'
                            )";
                if ($conn->query($sql) === TRUE) {
                    $goodones += 1;
                } else {
                    $badones += 1;
                }
            }
            $sql = str_replace(array("\n", "\r", "  "), "", $sql);
            $logObj->status = ($conn->query($sql));
            array_push($steps, (object)array("segment" => "waypoints", "step" => "INSERT INTO trail_version_points", "status" => 1, "log" => "Total good/bad: ".$goodones."/".$badones));
        }

        // MOUNTAIN & TRAILS
        if (4==4 && $logObj->status) {
            // DELETE EXISTING
            if (!$newTrail) {
                $sql = "DELETE FROM `trail_regions` WHERE `id_trail` = ".$trailID;
                $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                $logObj->status = ($conn->query($sql));
                array_push($steps, (object)array("step" => "DELETE FROM trail_regions", "status" => $logObj->status, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
            }
            // INSERT NEW
            $mntns = $generalFacts['mntns'];
            $mntns_list = "TraiID = ".$trailID." , mntns: ";
            foreach ($mntns as $idmnt) {
                $sql = "INSERT INTO `trail_regions` (`id_trail`,`id_mnt`) VALUES (".$trailID.", ".$idmnt.")";
                if ($conn->query($sql) === TRUE) {
                    $mntns_list += $idmnt.", ";
                } else {
                    $sql = str_replace(array("\n", "\r", "  "), "", $sql);
                    $logObj->status = ($conn->query($sql));
                    array_push($steps, (object)array("step" => "INSERT INTO trail_regions VALUES (".$trailID.", ".$idmnt.")", "status" => 0, "log" => $conn->error, "sql" => (($logObj->status) ? '' : $sql)));
                }
            }
            $sql = str_replace(array("\n", "\r", "  "), "", $sql);
            $logObj->status = ($conn->query($sql));
            array_push($steps, (object)array("step" => "INSERT INTO trail_regions", "status" => 1, "log" => $mntns_list));
        }

        $logObj->log = $steps;

        if ($logObj->status) {
            mysqli_query($conn, "COMMIT");
            $logObj->transation = "commited";
        } else {
            mysqli_query($conn, "ROLLBACK");
            $logObj->transation = "rollbacked";
        }

        $displayLog = json_encode($logObj);
        echo $displayLog;
        $conn->close();
    }
?>