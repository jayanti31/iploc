<?php
if(!empty($_REQUEST['url']))
{
   $url  = $_REQUEST['url'];
   $content = file_get_contents($url);
   header("Access-Control-Allow-Origin: *");
   die($content);
}
else
{
	die("unauthorized");
}
?>