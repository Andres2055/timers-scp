<?php
error_reporting(E_STRICT);
 
$ch = curl_init("http://www.lafundacionscp.wikidot.com/sandbox-inwiki-de-andres2055");
 
function var_dump_pre($v)
{
    echo "<pre>";
    var_dump($v);
    echo "</pre>";
}
 
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($crl, CURLOPT_FRESH_CONNECT, 1);
 
$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->loadHTML('<?xml encoding="UTF-8">'.curl_exec($ch));
 
curl_close($ch);
 
foreach ($dom->getElementById('u-timers')->childNodes->item(0)->childNodes as $node)
{
    if (strtoupper($node->nodeName) == "P")
    {
        $articles = $node->nodeValue;
        $articles = explode("?", $articles);
 
        foreach ($articles as &$article)
        {
            $article = explode("|", $article);
 
            for ($x = 0; $x < count($article); $x++)
            {
                $article[$x] = str_replace("\n", "", $article[$x]);
            }
 
            if (strpos($article[4], "en-eliminación") !== False)
            {
                $article[4] = 1;
            }
            else
            {
                $article[4] = 0;
            }
        }
 
        $children = $node->childNodes;
        $y = 0;
 
        for ($x = 0; $x < $children->length; $x++)
        {
            if (strtoupper($children->item($x)->nodeName) == "SPAN")
            {
                $timestampCreated = intval(substr($children->item($x)->getAttribute('class'), 11, 

10));
                $now = new DateTime();
                $now = intval($now->getTimestamp());
 
                if (intval($articles[$y][2]) <= -25 || (intval($articles[$y][2]) <= -10 && ($now - 

$timestampCreated) > 60*60*24))
                {
                    $articles[$y][3] = $timestampCreated;
                }
                else
                {
                    $articles[$y][3] = "X";
                }
                $y++;
            }
        }
    }
}
 
array_pop($articles);
 
$dom = null;
 
$output = "";
 
foreach ($articles as $key => $article)
{
 
    $tmpOutput = "";
 
    for ($x = 0; $x < count($article); $x++)
    {
        if ($article[3] != "X")
        {
 
            $tmpOutput .= $article[$x];
 
            if ($x < 4)
            {
                $tmpOutput .= ";";
            }
        }
    }
 
    if ($tmpOutput != "")
    {
        $output .= $tmpOutput."|";
    }
}
 
echo $output;
?>