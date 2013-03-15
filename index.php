<?php
	include("parts/config/connect.php");	
?>

<!DOCTYPE HTML>
<html>
<head>
<title>SolviCMS | Главная</title>
<meta name="" content="">

<link rel="stylesheet" type="text/css" href="css/big.css" />
<script src="js/jquery-1.4.2.js"></script>
<script src="js/jquery.hotkeys.js"></script>
<script src="js/big.js"></script>

</head>
<body onload="fillTextarea();">
	<table cellspacing="10">
		<tr>
			<td width="600">
				Имя страницы (например cat.php): <input type="text" name="page_name" id="page_name" value="newpage.php" />
				<input type="submit" value="R" onClick="fillTextarea();" />
				<br />Title: <input type="text" name="page_title" id="page_title" value="newpage" /><br /><br />
				Код:<br /><br />
				<textarea id="page_code" name="page_code" class="big-textarea" onkeydown="insertTab(event, this);"></textarea>
				<a href="javascript:void(0);" onclick="createNewPage();">Сохранить</a>
				<a href="javascript:void(0);" onclick="fillTextarea();">Обновить</a>
				<a href="javascript:void(0);" onclick="insertHtmlAtCursor();">Вставить код</a>
				<div id="info">Документ успешно сохранен.</div>
			</td>
			<td>
				<div id="hide-code-frame">
					Просмотр кода онлайн:<br />
					<p id="red-info"></p>
					<iframe src="index.php" name="save-file" id="save-file" >					
					</iframe>
				</div>
			</td>
		</tr>
	</table>
</body>
</html>