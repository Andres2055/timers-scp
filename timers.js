var host = "http://herramientasparaSCP.esy.es/";
var suffix = "";
var preffix = "";
var ajaxResult = null;
 
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
 
String.prototype.lpad = function(padding, length)
{
    str = this;
 
    while (str.length < length)
    {
        str = padding + str;
    }
 
    return str;
}
 
function generateTimer(timestamp, type, timerText)
{
    var now = new Date();
    var then = new Date(timestamp);
    var html = "";
    var interval = then.getTime() - now.getTime();
    var active = true;
    var text = document.getElementById('text');
    var clock = document.getElementById('clock');
 
    if (interval < 0)
    {
        active = false;
        interval = interval*-1;
    }
 
    timerText = getTimerText(type, active);
 
    text.innerHTML = "<strong>" + timerText + ":</strong>";
    var clockUnits = convertInterval(interval);
    var clockContent = "";
 
    if (clockUnits[0] != 0)
    {
        clockContent += clockUnits[0] + "d ";
    }
 
    if (clockUnits[1] != 0)
    {
        clockContent += clockUnits[1] + "h ";
    }
 
    if (clockUnits[2] != 0)
    {
        clockContent += clockUnits[2] + "m ";
    }    
 
    if (clockUnits[3] != 0)
    {
        clockContent += clockUnits[3] + "s ";
    }
    else
    {
        if (clockUnits[0] == 0 && clockUnits[1] == 0 && clockUnits[2] == 0)
        {
            clockContent += "Ahora";
            suffix = "";
        }
    }
 
    clock.innerHTML = clockContent + suffix;    
    var timerStart = setInterval(function () { tick(then, type, timerText); }, 1000);
}
 
function convertInterval(t)
{
    var cd = 24 * 60 * 60 * 1000;
    var ch = 60 * 60 * 1000;
    var cm = 60 * 1000;
    var d = Math.floor(t/cd);
    var h = Math.floor((t-d*cd)/ch);
    var m = Math.floor((t-d*cd-h*ch)/cm);
    var s = Math.round((t-d*cd-h*ch-m*cm)/1000);
 
    if (h == 24)
    {
        d++;
        h = 0;
    }
 
    if (m == 60)
    {
        h++;
        m = 0;
    }
 
    if (s == 60)
    {
        m++;
        s = 0;
    }
 
    return [d, h, m, s];
}
 
function generateCode(type, rating)
{
    var code = document.getElementById('code');
    var codeContent = "";
    var preview = document.getElementById('preview');
    var timestamp;
 
    if (type == 2)
    {
        var timerText = document.getElementById('customTimerText').value;
    }
 
    if (type == 0)
    {
        var now = new Date().getTime();
        var oneDay = 86400000;
        timestamp = new Date(now + oneDay).getTime();
        code.style.height = "375px";
        codeContent = "<p><strong>T&iacute;tulo de Post:</strong><br><br><i>Staff Post - Voto de Eliminaci&oacute;n</i></p><p><strong>Contenido del Post:</strong></p>";
        codeContent += "<p><i>Comienzo del voto de eliminaci&oacute;n en " + rating + ".</p><p>[[iframe " + host + "getTimer.php?timestamp=" + timestamp + "&type=0 style=\"width: 500px; height: 60px; border: 0;\"]]</i></p>";
        codeContent += "<p><i>**Se inicia el proceso de eliminaci&oacute;n de este art&iacute;culo, ya que tiene una puntuaci&oacute;n neta de " + rating + ", y ha pasado m&aacute;s de una semana de su publicaci&oacute;n. Cuando el contador llegue a cero, se proceder&aacute; a borrar el art&iacute;culo de la wiki.</i></p>";
        codeContent += "<p><i>**Si no eres el autor y desea reescribir este art&iacute;culo, puede responder a este mensaje solicitando la oportunidad de hacerlo. Obtenga permiso del autor (o de la administración si este art&iacute;culo tiene más de 6 meses) y asegúrese de copiar la fuente de la p&aacute;gina en su borrador. Por favor, __no__ responda a este post por cualquier otra raz&oacute;n a menos que seas parte del Staff.**</i></p>";
    }
    else
    {
        code.style.height = "50px";
        var start, duration;
 
        if (document.getElementById('startNowY').checked == true)
        {
            start = new Date().getTime();
        }
        else
        {
            var startDate = document.getElementById('startDate').options[document.getElementById('startDate').selectedIndex].value;
            startDate = startDate.split("|");
            var startH = document.getElementById('startTimeH').options[document.getElementById('startTimeH').selectedIndex].value;
            var startM = document.getElementById('startTimeM').options[document.getElementById('startTimeM').selectedIndex].value;
            start = new Date(parseInt(startDate[0]), parseInt(startDate[1]), parseInt(startDate[2]), parseInt(startH), parseInt(startM), 0, 0).getTime();
        }
 
        if (document.getElementById('durationc').checked)
        {
            duration = document.getElementById('customDurationAmt').value;
 
            switch (document.getElementById('customDurationUnit').options[document.getElementById('customDurationUnit').selectedIndex].value)
            {
                case "2":
                    duration = duration * (1000*60*60*24);
                break;
 
                case "3":
                    duration = duration * (1000*60*60*24*7);
                break;
 
                default:
                    duration = duration * (1000*60*60);
            }
        }
        else
        {
            if (document.getElementById('duration1h').checked)
            {
                duration = (1000*60*60);
            }
            else if (document.getElementById('duration24h').checked)
            {
                duration = (1000*60*60*24);
            }
            else if (document.getElementById('duration48h').checked)
            {
                duration = (1000*60*60*48);
            }
            else if (document.getElementById('duration72h').checked)
            {
                duration = (1000*60*60*72);
            }
            else
            {
                duration = (1000*60*60*24*7);
            }
        }
 
        timestamp = start + duration;
        codeContent = "<strong>[[iframe " + host + "getTimer.php?timestamp=" + timestamp + "&type=" + type;
 
        if (type == 2)
        {
            codeContent += "&text=" + timerText.replace(" ", "%20");
        }
 
        codeContent += " style=\"width: 500px; height: 60px; border: 0;\"]]</i></strong>";
 
        console.log("Code content: " + codeContent);
        code.style.height = "50px;";
    }
 
    var previewHTML = "<p><strong>Vista previa del Temporizador:</strong><br><br><iframe src=\"" + host + "getTimer.php?timestamp=" + timestamp + "&type=" + type;
 
    if (type == 2)
    {
        previewHTML += "&text=" + timerText.replace(" ", "%20");
    }
 
    previewHTML += "\" style=\"width: 500px; height: 60px; border: 0;\"></iframe></p>";
    preview.innerHTML = previewHTML;
    preview.style.display = "block";
 
    code.innerHTML = codeContent;
    code.style.display = "block";
 
}
 
function tick(then, type, timerText)
{
    var now = new Date();
    var interval = then.getTime() - now.getTime();
    var active = true;
 
    if (interval < 0)
    {
        active = false;
        interval = interval*-1;
    }
 
    if (type != 2)
    {
        timerText = getTimerText(type, active);
    }
 
    text.innerHTML = "<strong>" + timerText + ":</strong>";
    var clockUnits = convertInterval(interval);
    var clockContent = "";
 
    if (clockUnits[0] != 0)
    {
        clockContent += clockUnits[0] + "d ";
    }
 
    if (clockUnits[1] != 0)
    {
        clockContent += clockUnits[1] + "h ";
    }
 
    if (clockUnits[2] != 0)
    {
        clockContent += clockUnits[2] + "m ";
    }    
 
    if (clockUnits[3] != 0)
    {
        clockContent += clockUnits[3] + "s ";
    }
    else
    {
        if (clockUnits[0] == 0 && clockUnits[1] == 0 && clockUnits[2] == 0)
        {
            clockContent += "Ahora";
            preffix = "";
        }
    }
 
    clock.innerHTML = preffix + clockContent ;
}
 
function getTimerText(type, active)
{
    var text = document.getElementById('text');
 
    if (active)
    {
        switch (type)
        {
            case 0:
                timerText = "Esta p&aacute;gina ser&aacute; elegible para la eliminaci&oacute;n en";
            break;
 
            case 1:
                timerText = "El ban de este usuario expira en";
            break;
 
            default:
                timerText = "Este temporizador expira en";
        }    
    }
    else
    {
        text.style.color = "#3F9C14";
        preffix = " hace ";
 
        switch (type)
        {
            case 0:
                timerText = "Esta p&aacute;gina es elegible para la eliminaci&oacute;n";
            break;
 
            case 1:
                timerText = "El ban de este usuario ha expirado";
            break;
 
            default:
                timerText = "Este temporizador ha expirado";
        }    
    }
 
    return timerText;
 
}
 
function timestampTZ(t)
{
    var date = new Date(t);
    var UTCDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()).getTime();
    var offset = new Date().getTimezoneOffset();
    offset = offset*60*1000;
    return UTCDate-offset;
}
 
//initAjax(): initialize an XMLHttpRequest object depending on the browser version and capabilities of the user
function initAjax()
{
    if (!window.XMLHttpRequest)
    {
        window.XMLHttpRequest = function()
        {
            var types = [
                'MSXML2.XMLHTTP.6.0', 
                'MSXML2.XMLHTTP.5.0', 
                'MSXML2.XMLHTTP.4.0', 
                'MSXML2.XMLHTTP.3.0', 
                'MSXML2.XMLHTTP', 
                'Microsoft.XMLHTTP'
            ];
 
            for (var i = 0; i < types.length; i++)
            {
                try
                {
                    return new ActiveXObject(types[i]);
                }
                catch(e) {}
            }
            return undefined;
        }
    }
    else
    {
        return new XMLHttpRequest();
    }
}
 
function getPages(test)
{
    document.getElementById('preview').style.display = "none";
    document.getElementById('code').style.display = "none";
    document.getElementById('articles').innerHTML = "<h3>Cargando...</h3>";
    var req = initAjax();
    var URL = "getPages.php";
    var pages = document.getElementById('articles');
    req.open('GET', URL, true);
    req.send(null);
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200) 
        {
            if (test)
            {
                parseResponse("SCP-ES-TEST;scp-es-test;-25;0|");
            }
            else
            {
                parseResponse(req.responseText);
            }
        }
    }
}
 
function parseResponse(r)
{
    if (r != "")
    {
        var rows = r.split('|');
        var output = "<table width=\"350\" cellpadding=\"4\" cellspacing=\"0\" border=\"0\">";
        output += "<thead><tr valign=top><th>T&iacute;tulo</th><th>Puntaje Actual</th><th>Acci&oacute;n</th></tr></thead><tbody>";
 
        for (var x = 0; x < (rows.length - 1); x++)
        {
            rows[x] = rows[x].split(';');
            //Row start
            output += "<tr valign=top>";
            //Title
            output += "<td align=\"center\" width=\"150\"><a href=\"http://www.lafundacionscp.wikidot.com/" + rows[x][1] + "\" target=\"_blank\">" + rows[x][0] + "</a></td>";
            //Rating
            output += "<td align=\"center\" width=\"50\">" + rows[x][2] + "</td>";
            //Status
            output += "<td align=\"center\" width=\"150\">";
            if (rows[x][3] == 0)
            {
                output += "<a href=\"#\" onClick=\"generateCode(0, " + rows[x][2] + ");\">Mostrar contenido del<br>post de eliminaci&oacute;n</a>";
            }
            else
            {
                output += "Inicio del voto de eliminaci&oacute;n";
            }
 
            //Row end
            output += "</td></tr>";
        }
 
        output += "</tbody></table>";
        output += "<p><a href=\"#\" onClick=\"getPages(false);\">Actualizar</a></p>";
    }
    else
    {
        output = "<h3>There are currently no articles within (early) deletion range</h3>";
        output += "<p><a href=\"#\" onClick=\"getPages(false);\">Actualizar</a></p>";
    }
 
    document.getElementById('articles').innerHTML = output;
}
 
function toggleFieldset(f, d)
{
    if (d == 0)
    {
        document.getElementById(f).style.display = "none";
    }
    else
    {
        document.getElementById(f).style.display = "block";
    }
}
 
function fillCustomDateTime()
{
    var t = new Date().getTime();
    var d = 1000*60*60*24;
    var dSelect = document.getElementById('startDate');
    var x,o, oText, day;
 
    while (dSelect.firstChild)
    {
        dSelect.removeChild(dSelect.firstChild);
    }        
 
    for (x = -7; x <= 7; x++)
    {
        oDate = new Date(t + (x*d));
        day = oDate.getDate();
        if (day < 10) day = "0" + day;
        o = document.createElement('option');
        oText = document.createTextNode(oDate.getMonth() + 1 + "-" + day + "-" + oDate.getFullYear());
        o.setAttribute('value', oDate.getFullYear() + "|" + oDate.getMonth() + "|" + day);
        if (x == 0) o.selected = true;
        o.appendChild(oText);
        dSelect.appendChild(o);
 
    }
 
    var hSelect = document.getElementById('startTimeH');
 
    while (hSelect.firstChild)
    {
        hSelect.removeChild(hSelect.firstChild);
    }
 
    for (x = 0; x <= 23; x++)
    {
        o = document.createElement('option');
        oText = x;
        if (x < 10)    oText = "0" + x;
        if (x == 12) o.selected = true;
        oText = document.createTextNode(oText);
        o.appendChild(oText);
        hSelect.appendChild(o);
    }
 
    var mSelect = document.getElementById('startTimeM');
 
    while (mSelect.firstChild)
    {
        mSelect.removeChild(mSelect.firstChild);
    }
 
    for (x = 0; x <= 59; x++)
    {
        o = document.createElement('option');
        oText = x;
        if (x < 10)    oText = "0" + x;
        if (x == 0) o.selected = true;
        oText = document.createTextNode(oText);
        o.appendChild(oText);
        mSelect.appendChild(o);
    }    
}
 
function isNumber(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}
 
function selectTimer(type, test)
{
    console.log('TEST = ' + test);
    switch (parseInt(type))
    {
        case 0:
            document.getElementById('timerForm').style.display = "none";
            document.getElementById('articles').style.display = "block";
            getPages(test);
        break;
 
        case 1:
            document.getElementById('timerForm').style.display = "block";
            document.getElementById('customTimerTextOption').style.display = "none";
            fillCustomDateTime();
            document.getElementById('articles').style.display = "none";
        break;
 
        case 2:
            document.getElementById('timerForm').style.display = "block";
            document.getElementById('customTimerTextOption').style.display = "block";
            fillCustomDateTime();
            document.getElementById('articles').style.display = "none";
        break;
 
        default:
    }
 
    formReset();
    document.getElementById('code').style.display = "none";
    document.getElementById('preview').style.display = "none";
}
 
function formReset()
{
    document.getElementById('startNowY').checked = true;
    document.getElementById('start').style.display = "none";
    fillCustomDateTime();
}