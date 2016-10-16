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

    $output = '';

    if (isset($_GET['mntid'])) {
        $output = '[';
        $mntid = $_GET['mntid'];

        $sql = "SELECT reg1.id, reg1.name, reg2.name AS country, reg1.region, reg1.slug, reg1.desc,\n"
        . "reg1.maxelev, reg1.type, reg1.lat_center, reg1.lon_center,reg1.bounds\n"
        . "FROM repo_regions AS reg1, repo_regions AS reg2\n"
        . "where reg2.id = reg1.id_parent\n"
        . "and reg1.id_parent is not null\n"
        . "and reg1.id = ".$mntid;

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $output .= 
    '
{
    "id": '.$row["id"].',
    "name": "'.$row["name"].'",
    "country": "'.$row["country"].'",
    "region": "'.$row["region"].'",
    "slug": "'.$row["slug"].'",
    "desc": "'.$row["desc"].'",
    "type": "'.$row["type"].'",
    "maxelev": '.$row["maxelev"].',
    "lon_center": '.$row["lon_center"].',
    "lat_center": '.$row["lat_center"].',
    "bounds": '.$row["bounds"].'
}
';
            }    
        };
        $output .= ']';

    } else if (isset($_GET['countryid'])) {
        $output = '[';
        $countryid = $_GET['countryid'];

        $sql = "SELECT reg1.id, reg1.name, reg1.region, reg1.slug, reg1.desc,\n"
        . "reg1.maxelev, reg1.type, reg1.lat_center, reg1.lon_center,reg1.bounds\n"
        . "FROM repo_regions AS reg1, repo_regions AS reg2\n"
        . "where reg2.id = reg1.id_parent\n"
        . "and reg1.id_parent is not null\n"
        . "and reg1.id_parent = ".$countryid; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $output .= 
    '
{
    "id": '.$row["id"].',
    "name": "'.utf8_decode($row["name"]).'",
    "region": "'.$row["region"].'",
    "slug": "'.$row["slug"].'",
    "desc": "'.$row["desc"].'",
    "type": "'.$row["type"].'",
    "maxelev": '.$row["maxelev"].',
    "lon_center": '.$row["lon_center"].',
    "lat_center": '.$row["lat_center"].',
    "bounds": '.$row["bounds"].'
}
';
            }
        };
        $output .= ']';

    } else {
        $output = '{
"countries": [';
        $sql = 
"SELECT reg1.id, reg1.name, reg1.slug, reg1.lat_center, reg1.lon_center,COALESCE(reg1.bounds,'null') AS `bounds`, count(reg2.id) AS `total`
FROM repo_regions AS reg1, repo_regions AS reg2
where reg1.id = reg2.id_parent
and reg1.id_parent is null
group by  reg1.id, reg1.name, reg1.slug, reg1.lat_center, reg1.lon_center,COALESCE(reg1.bounds,'null')"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "name": "'.$row["name"].'",
        "slug": "'.$row["slug"].'",
        "lon_center": '.$row["lon_center"].',
        "lat_center": '.$row["lat_center"].',
        "bounds": '.$row["bounds"].',
        "total": '.$row["total"].'
    }';
            }
        };
        $output .= '
]';
        $output .= ',
"mountains": [';

        $sql = 
"SELECT reg1.id, reg1.name, reg1.region, reg1.slug, reg1.id_parent, reg1.desc, reg1.maxelev, 
reg1.type, reg1.lat_center, reg1.lon_center,COALESCE(reg1.bounds,'null') AS `bounds`, numoftrails(reg1.id) AS `total` 
FROM repo_regions AS reg1, repo_regions AS reg2 where reg2.id = reg1.id_parent and reg1.id_parent is not null order by reg1.name asc"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "id_parent": '.$row["id_parent"].',
        "name": "'.$row["name"].'",
        "region": "'.$row["region"].'",
        "slug": "'.$row["slug"].'",
        "lon_center": '.$row["lon_center"].',
        "lat_center": '.$row["lat_center"].',
        "bounds": '.$row["bounds"].',
        "total": '.$row["total"].'
    }';
            }
        };

        $output .= '
    ]';

    $output .= ',
"trailTypes": [';

        $sql = 
"SELECT t.id, t.name, t.desc, (select count(v.id) from trail_versions v where v.trail_type = t.id and v.active = 1) as total
from repo_types t where t.cat_id = 0 order by t.id asc"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "name": "'.$row["name"].'",
        "desc": "'.$row["desc"].'",
        "total": '.$row["total"].'
    }';
            }
        };

        $output .= '
    ]';

$output .= ',
"fitnessLevels": [';

        $sql = 
"SELECT t.id, t.name, t.desc, (select count(v.id) from trail_versions v where v.required_fitness = t.id and v.active = 1) as total
from repo_types t where t.cat_id = 1 order by t.id asc"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "name": "'.$row["name"].'",
        "desc": "'.$row["desc"].'",
        "total": '.$row["total"].'
    }';
            }
        };

        $output .= '
    ]';

$output .= ',
"techniqueLevels": [';

        $sql = 
"SELECT t.id, t.name, t.desc, (select count(v.id) from trail_versions v where v.required_technique = t.id and v.active = 1) as total
from repo_types t where t.cat_id = 2 order by t.id asc"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "name": "'.$row["name"].'",
        "desc": "'.$row["desc"].'",
        "total": '.$row["total"].'
    }';
            }
        };

        $output .= '
    ]';

$output .= ',
"surfaceTypes": [';

        $sql = 
"SELECT t.id, t.name, t.desc, t.meta1, t.meta2
from repo_types t where t.cat_id = 10 order by t.id asc"; 

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "id": '.$row["id"].',
        "name": "'.$row["name"].'",
        "desc": "'.$row["desc"].'",
        "colorRGBA": "'.$row["meta1"].'",
        "colorHex": "'.$row["meta2"].'"
    }';
            }
        };

        $output .= '
    ]';

$output .= ',
"pointTypes": [';

        $sql = "SELECT `symbol_code`, `desc`, `desc_en` FROM `repo_point_symbol`";

        $counter = 0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($counter > 0) {
                    $output .= ',';
                }
                $counter++;
                $output .= 
'
    {
        "symbol_code": "'.$row["symbol_code"].'",
        "desc": "'.$row["desc"].'",
        "desc_en": "'.$row["desc_en"].'"
    }';
            }
        };

        $output .= '
    ]
}';
    }

    
    echo $output;
?>