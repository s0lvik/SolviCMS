<?php
	include("parts/config/connect.php");	
?>

<!DOCTYPE HTML>
<html>
<head>
<title>SolviCMS | �������</title>
<meta name="" content="">

<link rel="stylesheet" type="text/css" href="css/big.css" />
<script src="js/big.js"></script>
</head>
<body onload="fillTextarea();">
	<table>
		<tr>
			<td width="1000">
				��� �������� (�������� cat.php): <input type="text" name="page_name" id="page_name" /><br />Title: <input type="text" name="page_title" id="page_title" /><br />
				���:<br />
				<textarea id="page_code" name="page_code" class="big-textarea"></textarea>
				<a href="javascript:void(0);" onclick="createNewPage();">���������</a>
				<a href="javascript:void(0);" onclick="fillTextarea();">���������</a>
				<a href="javascript:void(0);" onclick="insertHtmlAtCursor();">�������� ���</a>
			</td>
		</tr>
	</table>
</body>
</html>