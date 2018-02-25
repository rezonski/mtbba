// Mapas ***********************************

function get_my_url (bounds) { 
             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 
  
             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 

                if (z >= 0 && z <= 4) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/Small2/Z" + z + "/" + y + "_" + x + ".png" + "?v=" + ver_geacron;}
                else if (z >= 5 && z <= 6 ) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/Medium2/Z" + z + "/" + y + "_" + x + ".png" + "?v=" + ver_geacron; }

                var url = this.url;

                if (url instanceof Array) {
                    url = this.selectUrl(path, url);
                }
                console.log('#1 ' + url + path); 
                return url + path; 
             } 
       } 

function get_my_urlplano (bounds) { 
             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 
  
             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 

        if (z >= 0 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/plano/Z" + z + "/" + y + "/" + x + ".png" + "?v=" + ver_geacron}
        var url = this.url;

        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
// alert(url + path);
                console.log('#2 ' + url + path); 
                 return url + path; 
             } 
         } 

function get_my_urlpais (bounds) { 

             var anow = "" + ano;
             anow = anow.replace("-", "B");

              if (map.baseLayer.name == etiq[5]) {miopais.setOpacity(1)} else if (map.baseLayer.name == etiq[6]) {miopais.setOpacity(0.7)} else {miopais.setOpacity(0.4)}
             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 
  
             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 

                    if (z >= 0 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/tiles/area/" + anow + "/Z" + z + "/" + y + "/" + x + ".png" + "?v=" + ver_geacron;

                    var url = this.url;

                    if (url instanceof Array) {
                        url = this.selectUrl(path, url);
                    }
                    console.log('#3 ' + url + path); 
                 return url + path;
             } 
     }

   } 

function get_my_urllit (bounds) { 

             var anow = "" + anolk;
             anow = anow.replace("-", "B");

             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 

             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 
// cambiar en por lang
       // if (z >= 3 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/tiles/label2/" + lng + "/L" + anow + "/Z" + z + "/" + y + "/" + x + ".png" ;

        if (z >= 3 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/tiles/label1/en" + "/L" + anow + "/Z" + z + "/" + y + "/" + x + ".png" + "?v=" + ver_geacron ;

        var url = this.url;

        if (url instanceof Array) {

            url = this.selectUrl(path, url);
        }
                 console.log('#4 ' + url + path); 
                 return url + path; 

             } 
       }

  } 


function get_my_urllake (bounds) { 
             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 
  
             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 

       if (z >= 0 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/lagos2/Z" + z + "/" + y + "/" + x + ".png" + "?v=" + ver_geacron;
       // if (z >= 0 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/lagos/Z" + z + "/" + y + "_" + x + ".png";
        var url = this.url;

        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
// alert(url + path);
                 console.log('#5 ' + url + path); 
                 return url + path; 
             } 
       }
  } 


function get_my_urllake2 (bounds) { 

             var anow = "" + anolk;
             anow = anow.replace("-", "B");
             
             var res = this.map.getResolution(); 
             var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)); 
             var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)); 
             var z = this.map.getZoom(); 
             var limit = Math.pow(2, z); 
  
             if (y < 0 || y >= limit) { 
                 return null; 
             } else { 
                 x = ((x % limit) + limit) % limit; 

        if (z >= 0 && z <= 6) { var path = "wpc.4693.edgecastcdn.net/004693" + "/GIS/lk" + anow + "/Z" + z + "/" + y + "/" + x + ".png" + "?v=" + ver_geacron}

        var url = this.url;

        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
                 console.log('#6 ' + url + path); 
                 return url + path; 
             } 
         } 