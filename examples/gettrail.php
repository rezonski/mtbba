<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mytrails";

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

    $sqlpathproperties = "SELECT trail_id, point_id, lon, lat, elevation, prev_dist, prev_elev FROM active_path WHERE trail_id = ".$id;

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
            ['.$row["lon"].','.$row["lat"].','.$row["elevation"].']';
            $tempiterator++;
        }
    } 

    /*
    General trail properties
     */
    

    /*Mountains array*/

    $sqlmntarray = 
    "SELECT r.id, r.name FROM repo_regions r, trail_regions t where r.id = t.id_mnt and t.id_trail = ".$id." order by r.id asc ";

    $resultmntarray = $conn->query($sqlmntarray);
    $mntarray = '[';
    $tempiterator = 1;

    if ($resultmntarray->num_rows > 0) {
        // output data of each row
        while($row = $resultmntarray->fetch_assoc()) {
            if ($tempiterator > 1) {
                $mntarray .= ',';
            }
            $mntarray .= '{
                        "id": '.$row["id"].',
                        "name": "'.$row["name"].'"
                    }';
            $tempiterator++;
        }
    }

    $mntarray .= ']';

    
    $sqltrailproperties = 
    "SELECT trail_id,
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
            "name": "'.$row["trail_name"].'",
            "trail_id": "'.$row["trail_id"].'",
            "mntns": '.$mntarray.',
            "trail_name": "'.$row["trail_name"].'",
            "trail_desc": "'.$row["trail_desc"].'",
            "surface": '.$row["surface"].',
            "type_name": "'.$row["type_name"].'",
            "type_desc": "'.$row["type_desc"].'",
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

    $sqlwaypointsproperties = "SELECT trail_id,point_id,point_name,point_desc,lon,lat,elevation,elevgain,
    elevloss,nextelevgain,nextelevloss,odometer,nextstepdist,symbol,pictogram,pictureurl,time,elevationprofile
    FROM `active_waypoints` where trail_id = ".$id;

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
        "desc": "'.$row["point_desc"].'",
        "symbol": "'.$row["symbol"].'",
        "odometer": '.$row["odometer"].',
        "nextstepdist": '.$row["nextstepdist"].',
        "elevgain": '.$row["elevgain"].',
        "elevloss": '.$row["elevloss"].',
        "nextelevgain": '.$row["nextelevgain"].',
        "nextelevloss": '.$row["nextelevloss"].',
        "pictogram": "'.$row["pictogram"].'",
        "pictureurl": "'.$row["pictureurl"].'",
        "time": "'.$row["time"].'",
        "elevationprofile": '.$row["elevationprofile"].'
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