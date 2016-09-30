<?php
  
  function fugao ($vugao) 
  {
    if  ( $vugao < 0 )
       {
       return fugao($vugao+360);
       }
    else
      {
       return $vugao%360;
      }
  };
  
  $ulaz = $_GET["opis"];
  
  $slike=explode("-",$ulaz);

  $loffset = 0;
  $toffset = 0;
  $picwidth = 300;
  $picheight = 300;
  $xOffset = 0;
  $yOffset = 0; 
  $brojac = 1;
  
    
  $pozadina = imagecreatefromgif("blank.gif");
  
  $suprotni[0] = imagecreatefromgif("z270.gif");
  
    foreach ($slike as $slika)
    {       
        if ($brojac==1)
        {
          $ugaooffset=270-$slika;
        $suprotni[$brojac]=imagecreatefromgif("z".fugao(270+$ugaooffset).".gif");
        $brojac++;
        }
        else
        {
          if ( substr($slika,0,1)=="v" || substr($slika,0,1)=="z" )
           {
              $suprotni[$brojac] = imagecreatefromgif("s".substr($slika,0,1).fugao(intval(substr($slika,1))+$ugaooffset).".gif");
            $brojac++;
           }
        else
          {
            $suprotni[$brojac] = imagecreatefromgif("s".fugao($slika+$ugaooffset).".gif");
            $brojac++;
          }
          

        }         
    }
  
  
  $brojslojeva = $brojac - 1;
      
    for ( $brojac2 = $brojslojeva; $brojac2 >= 0; $brojac2--) 
    {
      imagecopymerge($pozadina,$suprotni[$brojac2],0,0,0,0,$picwidth,$picheight,100);
    }
      
  header('Content-type: image/gif');
  
  imagegif($pozadina);
  
  imagedestroy($pozadina);
  
?>