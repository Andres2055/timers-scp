<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Temporizadores</title>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
<style type="text/css">
@import url(http://d3g0gp89917ko0.cloudfront.net/v--50456838fc8c/common--theme/base/css/style.css);
@import url(http://d3g0gp89917ko0.cloudfront.net/v--50456838fc8c/common--theme/shiny/css/style.css);
@import url(http://05command.wdfiles.com/local--theme/scp-custom-2/style.css);
 
body
{
    font-family: verdana,arial,helvetica,sans-serif;
    font-size: 0.82em;
    color: #000;
}
 
table
{
    border-collapse: collapse;
}
 
table, th, td
{
    font-size: 1em;
    border: 1px solid #000;
    text-align: center;
}
 
input
{
    font-size: 1em;
}
 
#code
{
    border: 1px #000 dashed; 
    background-color: #eee;
    width: 600px;
    padding: 5px;
    margin-top: 20px;
    display: none;
}
 
#preview
{
    width: 600px;
    height: 75px;
    border: 0;
}
 
#timer
{
    border: 2px inset;
    font-family: verdana,arial,helvetica,sans-serif;
    font-size: 0.82em;
    color: #000;
    padding: 10px;
    font-weight: bold;
    width: 350px;
    height: 35px;
}
 
#text
{
    color: #D12A21;
}
</style>
<script src='timers.js'></script>
</head>
<body onLoad="selectTimer('0', <?php echo (TEST) ? 'true' : 'false'; ?>);">
 
<form id="typeForm">
<fieldset>
<legend>Seleccione el tipo de temporizador que necesite crear</legend>
<select name="type" id="type" size="1" onChange="selectTimer(this.options[this.options.selectedIndex].value, <?php echo (TEST) ? 'true' : 'false'; ?>);">
    <option value="0" selected>Eliminaci&oacute;n</option>
    <option value="1">Ban</option>
    <option value="2">Gen&eacute;rico</option>
</select>
</fieldset>
</form>
 
<form name="timerForm" id="timerForm" action="" method="" style="display: none;">
 
<fieldset id="global">
<legend>Opciones generales</legend>
<div id="customTimerTextOption">
<label for="customTimerText">Texto del temporizador a mostrar:</label>
<input name="customTimerText" id="customTimerText" type="text" size="25" maxlength="150" value="Este temporizador expira en"><br>
</div>
<label for="startNow" id="startNowLabel">&iquest;Comenzar temporizador ahora?</label>
<input id="startNowY" type="radio" name="startNow" checked onClick="toggleFieldset('start', 0);"> Si <input id="startNowN" name="startNow" type="radio" onClick="toggleFieldset('start', 1);"> No
</fieldset>
 
<fieldset id="start" style="display: none;">
<legend>Fecha/tiempo de inicio</legend>
<select id="startDate" size="1">
</select>
<select id="startTimeH" size="1">
</select>
<select id="startTimeM" size="1">
</select>
</fieldset>
 
<fieldset id="duration">
<legend>Duraci&oacute;n</legend>
<input id="duration1h" type="radio" name="duration" onClick="toggleFieldset('customDuration', 0);"> 1 hr
<input id="duration24h" type="radio" name="duration" onClick="toggleFieldset('customDuration', 0);" checked> 24 hrs 
<input id="duration48h" type="radio" name="duration" onClick="toggleFieldset('customDuration', 0);"> 48 hrs 
<input id="duration72h" type="radio" name="duration" onClick="toggleFieldset('customDuration', 0);"> 72 hrs 
<input id="duration1w" type="radio" name="duration" onClick="toggleFieldset('customDuration', 0);"> 1 sem
<input id="durationc" type="radio" name="duration" onClick="toggleFieldset('customDuration', 1);"> Personalizable
</fieldset>
 
<fieldset id="customDuration" style="display: none;">
<legend>Duraci&oacute;n Personalizable</legend>
<input name="customDurationAmt" id="customDurationAmt" type="text" size="2" maxlength="2" value="" onBlur="if (!isNumber(this.value)) alert('Por favor provee un valor num&eacute;rico');">
<select name="customDurationUnit" id="customDurationUnit" size="1">
    <option value="1"> horas
    <option value="2"> d&iacute;as
    <option value="3"> semanas
</select>
</fieldset>
 
<input type="button" name="generate" id="generate" value="Generar c&oacute;digo de temporizador" onClick="generateCode(document.getElementById('type').options[document.getElementById('type').options.selectedIndex].value, null, null, null);">
 
</form>
 
<div id="articles"></div>
<div id="code"></div>
<div id="preview"></div>
 
</body>
</html>