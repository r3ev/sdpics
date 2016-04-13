<?php include("/var/www/vhosts/terr4.nl/httpdocs/sdpics/password_protect.php"); 

session_start();
$session_id='1'; // User login session value
?>
 
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Speeddial</title>
  



  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  
  <script type="text/javascript" src="ul/scripts/jquery.form.js"></script>
  
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="http://www.terr4.nl/sdpics/ctm/jquery.contextMenu.js"></script>
    <script src="http://www.terr4.nl/sdpics/ctm/jquery.ui.position.js"></script>
  <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="http://www.terr4.nl/sdpics/ctm/jquery.contextMenu.css" />
  <script type='text/javascript' src='SDscript.js'></script>

<!-- <script type="text/javascript" src="ul/scripts/jquery.min.js"></script>
 -->
</head>
<body>

<div style="position:absolute; right:50px; bottom:50px;" class="context-menu-one box menu-1">


</div>
<div id="menu" name="button"><img src="pics/cog.png"></div><div id="test" name="button"><img src="pics/cog.png"></div>
<div id="page" name="page">
<table id="add_sd">
<tr>
<td>
name
</td>
<td>
<input class="tasktitle" id="new_name" name="new_name" type="text" value="speeddial name..." onfocus="if (this.value == 'speeddial name...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'speeddial name...';}">
</td>
<td rowspan=4 width=130>
<div id='preview'>
</div>
</td>
</tr>
<tr>
<td>
url
</td>
<td>

<input class="tasktitle" id="new_url" name="new_url" type="text" value="url..." onfocus="if (this.value == 'url...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'url...';}">
</td>

</tr>
<tr>
<td>
group
</td>
<td>

<select id='combo'>
</select>
<input id="plus" value=" + " type="button" />
<input id="minus" value=" - " type="button" />
<td>
</td>
</td>

</tr>
<tr height=54>
<td colspan=2>
<div style="width:300px">

<form id="imageform" method="post" enctype="multipart/form-data" action='ajaximage.php'>
Upload your image <input type="file" name="photoimg" id="photoimg" />
</form>

</div>
</td>

</tr>
<tr>

<td>
	<input class="save2" value="Save on page" type="button" />
</td>
<td>
<form method="post" name="tasktitleform" action="">
	<div class="title" ></div>
<!-- 	<input class="tasktitle" id="tasktitle" name="tasktitle" type="text" value="Task name..." onfocus="if (this.value == 'Task name...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Task name...';}" /> -->
	<input class="save" value="Save Edits" type="button" />
</form>
</td>
<td>
</td>
</tr>
<tr>
<td>

</td>
<td>
       
</td>
<td>
</td>
</tr>
</table>
<div id="addGroup">
<table id="add_group">
<tr>
<td>
<input class="tasktitle" id="new_group" name="new_group" type="text" value="new group..." onfocus="if (this.value == 'new group...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'new group...';}">
</td>
<td>
<input class="add" value="add group" type="button" />
</td>
</tr>
</table>
</div>
</div>
<div id="rc_li">
<table><tr><th colspan=2>Change Speeddial</th></tr><tr><td>name:</td><td><input class="tasktitle" id="change_id" name="'+id+'" type="text" value="'+id+'"></td></tr><tr><td>url:</td><td><input class="tasktitle" id="change_url" name="'+url+'" type="text" value="'+url+'"></td></tr><tr><td>image:</td><td><input class="tasktitle" id="change_img" name="'+image+'" type="text" value="'+image+'"></td></tr><tr><td>group:</td><td><select id="rc_li_combo"></select></td></tr><tr><td colspan=2><input id="changeLi" value="Save Changes" type="button" /></td></tr></table>
</div>
</body>
</html>