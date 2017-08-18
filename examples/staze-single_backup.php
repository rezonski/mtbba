<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title><?php echo apply_filters('the_title', $post->post_title)." (".wpv_post_taxonomies_shortcode_render(array('type' => 'planine', 'separator' => ', ', 'show' => 'name')).")";?></title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='//api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.js'></script>
    <link href='//fonts.googleapis.com/css?family=Roboto:200,300,400,500,700' rel='stylesheet' type='text/css'>
    <link href='//api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
    <script src='//code.highcharts.com/highcharts.js'></script>
    <script src='//code.highcharts.com/modules/exporting.js'></script>
    <link href='//www.mtb.ba/stazenew/css/style.css' rel='stylesheet' />
    <script src='//www.mtb.ba/stazenew/js/jquery.min.js'></script>
    <script src='//www.mtb.ba/stazenew/js/togeojson.js'></script>
    <script src='//www.mtb.ba/stazenew/js/turf.min.js'></script>
    <script src='//www.mtb.ba/stazenew/js/helper.js'></script>
</head>
<body>
<div class='visualisation'>
    <div id='map' class='map'></div>
    <div class='trail-name'>
        <div class='trail-name-icon'></div>
        <div class='trail-name-text'><?php echo apply_filters('the_title', $post->post_title)." (".wpv_post_taxonomies_shortcode_render(array('type' => 'planine', 'separator' => ', ', 'show' => 'name')).")";?></div>
    </div>
    <div class='details'>
        <div class='menu'>
            <div class='menu-item style-params menu-item-active' onclick='menuClicked(0)' style="background-image: url('//www.mtb.ba/stazenew/svg/params1_active.svg')"></div>
            <div class='menu-item style-elevchart' onclick='menuClicked(1)' style="background-image: url('//www.mtb.ba/stazenew/svg/profile_active.svg')"></div>
            <div class='menu-item style-waypoints' onclick='menuClicked(2)' style="background-image: url('//www.mtb.ba/stazenew/svg/waypoints_active.svg')"></div>
            <div class='menu-item style-description' onclick='menuClicked(3)' style="background-image: url('//www.mtb.ba/stazenew/svg/description_active.svg')"></div>
        </div>
        <div class='content'>
            <div class='content-item style-params content-active'>
                <div class='parameters-container'>
                    <div class='parameters-row'>
                        <div class='parameters-column odometer'>
                            <div class='parameters-value'>36 km</div>
                            <div class='parameters-label'>duzina staze</div>
                        </div>
                        <div class='parameters-column category'>
                            <div class='parameters-value'><?php echo wpv_post_taxonomies_shortcode_render(array('type' => 'kategorije-staza', 'separator' => ', ', 'show' => 'name'));?></div>
                            <div class='parameters-label'>namjena</div>
                        </div>
                        <div class='parameters-column elevgain'>
                            <div class='parameters-value'><?php echo get_post_meta(get_the_ID(), 'wpcf-visinski-uspon', true);?> m</div>
                            <div class='parameters-label'>visinskog uspona</div>
                        </div>
                        <div class='parameters-column elevloss'>
                            <div class='parameters-value'>1550 m</div>
                            <div class='parameters-label'>visinskog spusta</div>
                        </div>
                    </div>
                    <div class='parameters-row'>
                        <div class='parameters-column difficulty'>
                            <div class='parameters-value'><?php echo get_post_meta(get_the_ID(), 'wpcf-tehnicka-zahjevnost', true);?>/10</div>
                            <div class='parameters-label'>tehnicka zahtjevnost</div>
                        </div>
                        <div class='parameters-column slope'>
                            <div class='parameters-value'>11 %</div>
                            <div class='parameters-label'>maksimalni nagib</div>
                        </div>
                        <div class='parameters-column maxelev'>
                            <div class='parameters-value'>1550 mnv</div>
                            <div class='parameters-label'>najvisa tacka</div>
                        </div>
                        <div class='parameters-column minelev'>
                            <div class='parameters-value'>50 mnv</div>
                            <div class='parameters-label'>najniza tacka</div>
                        </div>
                    </div>
                </div>
                <div id='surface-pie' class='chart-pie'></div>
            </div>
            <div class='content-item style-elevchart'>
                <div id='elevation-profile' class='chart-elevation'></div>
            </div>
            <div class='content-item style-waypoints'>
                <div class='waypoints-container'></div>
            </div>
            <div class='content-item style-description'>
                <div class='description-container'>
                    <div class='description-text-container'>
                        <div class='description-text-content content-active' id='description-bos'><?php echo get_post_meta(get_the_ID(), 'wpcf-opis-staze', true);?></div>
                        <div class='description-text-content' id='description-eng'><?php echo get_post_meta(get_the_ID(), 'wpcf-opis-staze-engleski', true);?></div>
                    </div>
                    <div class='description-image' style="background-image: url(<?php echo "'".get_post_meta(get_the_ID(), 'wpcf-foto-staze', true)."'";?>)"></div>
                    <div class='description-switcher' id='language-switcher' onclick='toogleDescriptionLanguage()'>English version</div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    // GLOBALS
    window.globalno = {
        trailName: 'Bradina - Martinov grob',
        trailCategory: <?php echo "'".wpv_post_taxonomies_shortcode_render(array('type' => 'kategorije-staza', 'separator' => ', ', 'show' => 'name'))."'";?>,
        trailMountains: <?php echo "'".wpv_post_taxonomies_shortcode_render(array('type' => 'planine', 'separator' => ', ', 'show' => 'name'))."'";?>,
        surface: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-sastav-staze', true)."'";?>,
        techDiff: 3,
        odometer: 0,
        elevGain: 0,
        elevLoss: 0,
        minElev: 0,
        maxElev: 0,
        maxSlope: 0,
        gpx: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-gpx-snimak', true)."'";?>,
        gpxExport: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-gpx-snimak-export', true)."'";?>,
        activeLanguage: 'bos',
    };
    // MAP
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    $.ajax(window.globalno.gpx).done(function(gpx) {
        var dataJSON = parseRaw(toGeoJSON.gpx(gpx));
        window.dataJSON = dataJSON;
        console.log(dataJSON);
        // get center and bounds from json
        var box = turf.bbox(dataJSON);
        var bbox = [[box[0], box[1]], [box[2], box[3]]];
        var mapCenter = turf.center(dataJSON);
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v10',
            zoom: 5,
            center: mapCenter.geometry.coordinates
        });
        window.map = map;
        var popup = new mapboxgl.Popup({
            // closeButton: false,
            closeOnClick: false
        });
        map.on('load', function() {
            map.fitBounds(bbox);
            addTrailLayers(map);
            addPopups(map, popup);
            renderlayout(dataJSON);
            addChart(map, dataJSON);
        });
    });
</script>
</body>
</html>
