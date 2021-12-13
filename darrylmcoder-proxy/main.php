<?PHP

    
ini_set('error_reporting', E_ALL ^ E_NOTICE); 
ini_set('display_errors', 1); 
    
echo "REQUEST_URI: {$_SERVER['REQUEST_URI']}<br>\n";

echo "PATH: {$_GET['url']}<br>\n";

$splits = explode("darrylmcoder-proxy/",$_SERVER['REQUEST_URI']);

$url = $splits[1];

echo "SPLIT: {$url}";