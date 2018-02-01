<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title></title>
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
        <div class='trail-name-text'></div>
        <div class='trail-download' onclick='downloadGPX()'>GPX</div>
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
                            <div class='parameters-value' id='value-odometer'></div>
                            <div class='parameters-label'>duzina staze</div>
                        </div>
                        <div class='parameters-column category'>
                            <div class='parameters-value' id='value-category'></div>
                            <div class='parameters-label'>namjena</div>
                        </div>
                        <div class='parameters-column elevgain'>
                            <div class='parameters-value' id='value-elevgain'></div>
                            <div class='parameters-label'>visinskog uspona</div>
                        </div>
                        <div class='parameters-column elevloss'>
                            <div class='parameters-value' id='value-elevloss'></div>
                            <div class='parameters-label'>visinskog spusta</div>
                        </div>
                    </div>
                    <div class='parameters-row'>
                        <div class='parameters-column difficulty'>
                            <div class='parameters-value' id='value-difficulty'></div>
                            <div class='parameters-label'>tehnicka zahtjevnost</div>
                        </div>
                        <div class='parameters-column slope'>
                            <div class='parameters-value' id='value-slope'></div>
                            <div class='parameters-label'>maksimalni nagib</div>
                        </div>
                        <div class='parameters-column maxelev'>
                            <div class='parameters-value' id='value-maxelev'></div>
                            <div class='parameters-label'>najvisa tacka</div>
                        </div>
                        <div class='parameters-column minelev'>
                            <div class='parameters-value' id='value-minelev'></div>
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
                    <div class='description-text-container'></div>
                    <div class='description-image' style="background-image: url(<?php echo "'".get_post_meta(get_the_ID(), 'wpcf-foto-staze', true)."'";?>)"></div>
                    <div class='description-switcher' id='language-switcher' onclick='toogleDescriptionLanguage()'>English version</div>
                </div>
            </div>
        </div>
    </div>
    <div class='site-logo'><a href="http://www.mtb.ba/"><img src="http://www.mtb.ba/slike/index/logo.gif"></a></div>
</div>
<script>
    // GLOBALS
    window.trail = {
        trailName: <?php echo "'".apply_filters('the_title', $post->post_title)."'";?>,
        trailCategory: <?php echo "'".wpv_post_taxonomies_shortcode_render(array('type' => 'kategorije-staza', 'separator' => ', ', 'show' => 'name'))."'";?>,
        trailMountains: <?php echo "'".wpv_post_taxonomies_shortcode_render(array('type' => 'planine', 'separator' => ', ', 'show' => 'name'))."'";?>,
        surface: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-sastav-staze', true)."'";?>,
        techDiff: <?php echo get_post_meta(get_the_ID(), 'wpcf-tehnicka-zahjevnost', true);?>,
        odometer: 0,
        elevGain: 0,
        elevLoss: 0,
        minElev: 5000,
        maxElev: 0,
        maxSlope: 0,
        gpx: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-gpx-snimak', true)."'";?>,
        gpxExport: <?php echo "'".get_post_meta(get_the_ID(), 'wpcf-gpx-snimak-export', true)."'";?>,
        descBos: <?php echo "'".preg_replace("/\r\n|\r|\n/",'<br/>',get_post_meta(get_the_ID(), 'wpcf-opis-staze', true))."'";?>,
        descEng: <?php echo "'".preg_replace("/\r\n|\r|\n/",'<br/>',get_post_meta(get_the_ID(), 'wpcf-opis-staze-engleski', true))."'";?>,
        activeLanguage: 'bos',
        satelliteLayer: false,
        minesLayer: false,
    };
    // MAP
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVyc2FkcGFzaWMiLCJhIjoiY2lqenc1ZnpkMDA2N3ZrbHo4MzQ2Z2YzZyJ9.TIDhGaRGIYtw9_f_Yb3Ptg';
    $.ajax(window.trail.gpx).done(function(gpx) {
        var dataJSON = parseRaw(toGeoJSON.gpx(gpx));
        window.dataJSON = dataJSON;
        // console.log(dataJSON);
        // get center and bounds from json
        var box = turf.bbox(dataJSON);
        window.trail.bbox = [[box[0], box[1]], [box[2], box[3]]];
        window.trail.mapCenter = turf.center(dataJSON);
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v10',
            zoom: 6,
            center: window.trail.mapCenter.geometry.coordinates,
            maxBounds: [[15, 42.3], [20.5, 45.5]]
        });
        window.map = map;
        var popup = new mapboxgl.Popup({
            // closeButton: false,
            closeOnClick: false
        });
        map.on('load', function() {
            map.fitBounds(window.trail.bbox);
            addSources(map);
            addLayers(map);
            addControls(map);
            addPopups(map, popup);
            renderlayout(dataJSON);
            addChart(map, dataJSON);
        });
    });
</script>
</body>
</html>
