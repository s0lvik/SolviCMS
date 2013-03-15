var page_title = '';



function getXmlHttp()
{
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}


function createNewPage() 
{
	var req = getXmlHttp(); 
	var page_name = document.getElementById('page_name').value;
	var page_code = document.getElementById('page_code').value;
	 
	req.onreadystatechange = function() {  
        // onreadystatechange активируется при получении ответа сервера
		if (req.readyState == 4) { 
            // если запрос закончил выполняться
			if(req.status == 200) { 
				alert("Ответ сервера: "+req.responseText);
			}
		}
	}
	req.open('GET', 'parts/admin/create-page.php?page_name='+page_name+'&page_code='+page_code, true);  
	req.send(null);
}


function fillTextarea()
{
	var page_title = "<title>" + document.getElementById('page_title').value + "</title>\n";
	
	var body_code = 
	'<table>\n'+
	'  <tr>\n'+
	'     <td>\n'+
	'         \n'+
	'     </td>\n'+
	'     <td>\n'+
	'         \n'+
	'     </td>\n'+
	'  </tr>\n'+	
	'</table>\n';
	
	var page_code = document.getElementById('page_code');
	page_code.value =
	'<?php include("../parts/config/connect.php"); ?>\n\n'+ 
	'<!doctype html>\n'+
	'<html>\n\n'+
	'<head>\n'+
	page_title+
	'</head>\n\n\n'+
	'<body>\n\n'+
	body_code+
	'\n'+
	'</body>\n\n'+
	'</html>\n';
}