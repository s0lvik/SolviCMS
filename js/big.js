var last_code = '';
var last_cursor_pos = 0;
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
	var page_name = document.getElementById('page_name').value
	
	if (page_name == '')
	{
		
		var body_code = 
		'<table>\n'+
		'  <tr>\n'+
		'     <td>\n'+
		'        \n'+
		'     </td>\n'+
		'     <td>\n'+
		'        \n'+
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
	else
	{
		var page_code = document.getElementById('page_code');
		page_code.value = getFile(page_name);
	}
	
	last_code = page_code.value;
}

function getFile(name)
{
	var req = getXmlHttp(); 
	var page_name = document.getElementById('page_name').value;
	var page_code = document.getElementById('page_code').value;
	var req_text = '';
	
	req.onreadystatechange = function() {  
        // onreadystatechange активируется при получении ответа сервера
		if (req.readyState == 4) { 
            // если запрос закончил выполняться
			if(req.status == 200) { 
				req_text = req.responseText;
			}
		}
	}
	req.open('GET', 'pages/'+name, false);  
	req.send(null);
	
	return req_text;
}

function insertTab(evt, obj) 
{	
    evt = evt || window.event;
    var keyCode = evt.keyCode || evt.which || 0;
    
    if(keyCode == 9)
    {
        if(document.selection)
        {															
            document.selection.createRange().duplicate().text = "\t";
        }
        else if(obj.setSelectionRange)
        {				
            var strFirst = obj.value.substr(0, obj.selectionStart);
            var strLast  = obj.value.substr(obj.selectionEnd, obj.value.length);

            obj.value = strFirst + "\t" + strLast;
       
            var cursor = strFirst.length + "\t".length;

            obj.selectionStart = obj.selectionEnd = cursor;
        }
        
        if(evt.preventDefault && evt.stopPropagation)
        {
            evt.preventDefault();
            evt.stopPropagation();
        }
        else {
            evt.returnValue = false;
            evt.cancelBubble = true;
        }
        
        return false;
    }
	
	if ((!evt.ctrlKey) && (!evt.altKey))
	document.getElementById('red-info').innerHTML = '<font color="red">С момента последней загрузки код был изменен. <br />Нажмите <b>Ctrl+S</b> для просмотра текущего состояния...</font>';	
}

function replaceOrInsertHTML(obj,evt,textHTML,cursorPos)
{
	last_code = document.getElementById('page_code').value;
	
		evt.preventDefault();
        if(document.selection)
        {															
            document.selection.createRange().duplicate().text = textHTML;
        }
        else if(obj.setSelectionRange)
        {				
            var strFirst = obj.value.substr(0, obj.selectionStart);
            var strLast  = obj.value.substr(obj.selectionEnd, obj.value.length);

            obj.value = strFirst + textHTML + strLast;
       
            var cursor = strFirst.length + cursorPos;

            obj.selectionStart = obj.selectionEnd = cursor;
        }
        
        if(evt.preventDefault && evt.stopPropagation)
        {
            evt.preventDefault();
            evt.stopPropagation();
        }
        else {
            evt.returnValue = false;
            evt.cancelBubble = true;
        }
	return false;
}

function backtoLastCode()
{
	var page_code = document.getElementById('page_code');
		page_code.value = last_code;	
	page_code.selectionStart = page_code.selectionEnd = last_cursor_pos;
}

$(document).ready(function()
{
	$('#page_code').bind('keydown', 'alt+d', function(e){
		replaceOrInsertHTML(this,e,'<div id="" name=""></div>',9);
	});
	
	$('#page_code').bind('keydown', 'alt+p', function(e){
		replaceOrInsertHTML(this,e,'<?php  ?>',6);
	});	
	
	$('#page_code').bind('keydown', 'alt+e', function(e){
		replaceOrInsertHTML(this,e,'<?php echo ""; ?>',12);
	});		
	
	$('#page_code').bind('keydown', 'alt+i', function(e){
		replaceOrInsertHTML(this,e,'<?php include(""); ?>',15);
	});
	
	$('#page_code').bind('keydown', 'alt+s', function(e){
		replaceOrInsertHTML(this,e,'<link rel="stylesheet" href="" type="text/css" />',29);
	});
	
	$('#page_code').bind('keydown', 'ctrl+z', function(e){
		backtoLastCode();
	});
	
	$('#page_code').bind('keydown', 'ctrl+s', function(e){
		e.preventDefault();
		
		
		
		var page_name = $('#page_name').val();
		var page_code = $('#page_code').val();
		
		for (var i=1; i<page_code.length-1; i++)
		{
			page_code = page_code.replace('\n','[nl]');
			page_code = page_code.replace('\t','[tab]');
		}
		
		$.ajax({
			url: 'parts/admin/create-page.php?page_name='+page_name+'&page_code='+page_code
		});
		
		$('#red-info').html('');
		
		setTimeout(function(){
			$('#save-file').attr('src','pages/'+page_name);
			$('#hide-code-frame').fadeIn("fast");
		},100);
		
		$('#info').fadeIn("fast");
		setTimeout(function(){ $('#info').fadeOut("fast"); }, 2000);
		
	});
	
	$('#info').click(function(){
		
	});
	
	
});