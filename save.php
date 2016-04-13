<?php
$tasktitle = $_POST['tasktitle'];
$apps = $_POST['apps'];
$group = $_POST['group'];
$date = strftime("%Y-%m-%d-%A");
$timesaved = strftime("%H:%M:%S");
$file = "favorites.json";
//$cont = $tasktitle.$apps.$group; 
$cont = '{'."\n".'"tpb": ['.$tasktitle.'],'."\n".'"app": ['.$apps.']'."\n".','."\n".'"group": ['."\n".$group.']'."\n".'}';
$f = fopen ($file, 'w+');
fwrite($f, $cont);
fclose($f);
?>