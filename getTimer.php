<?php header('Content-type: text/html; charset=utf-8'); ?>
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Ver temporizador</title>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
<script type="text/javascript" src="timers.js"></script>
<style type="text/css">
#timer
{
    border: 2px inset;
    font-family: verdana,arial,helvetica,sans-serif;
    font-size: 0.82em;
    color: #000;
    padding: 10px;
    font-weight: bold;
    width: 400px;
    height: 20px;
}
 
#text
{
    color: #D12A21;
}
</style>
</head>
<body onLoad="generateTimer(<?php echo $_GET['timestamp']; ?>, <?php echo $_GET['type']; ?>, <?php echo $_GET['text']; ?>);">
 
<div id="timer">
    <span id="text"></span>
    <span id="clock"></span>
</div>
 
</body>
</html>