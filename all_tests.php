<?php
$time = strtotime('-1 day');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>All Tests</title>
	<script src="../php_date.js"></script>
	<script>
function puts(str) {
	document.write(str);
}
obj = new Date;
obj.setTime(<?php echo $time; ?>000);
	</script>
	<style type="text/css">
body {
	background	: #FFF;
	color		: #333;
	font-size	: 13px;
	*font-size	: small;
	*font		: x-small;
	font-family	:
		'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro',
		'メイリオ', Meiryo, verdana, 'ＭＳ Ｐゴシック', sans-serif;
	line-height	: 1.6;
	letter-spacing	: 0.05em;
}

table {
/*	border-collapse	: collapse;
	border-spacing	: 1px; */
	font-size: inherit;
	font: 100%;
}

th, td {
	padding: 7px 15px;
	text-align: center;
	border: 1px solid #CCC;
}

thead th {
	background: #E5E5E5;
}

tr.Passed td {
	color: #4F8A10;
	border-color: #4F8A10;
	background-color: #DFF2BF;
}

tr.Failed td {
	color: #D8000C;
	border-color: #D8000C;
	background-color: #FFBABA;
}
	</style>
</head>
<body>

<table>
	<thead>
		<tr>
			<th>テスト内容</th>
			<th>JS結果</th>
			<th>PHP結果</th>
			<th>比較</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Date.parse('2009-08-01T01:02:03Z')</td>
			<td><script>puts(Date.parse('2009-08-01T01:02:03Z'));</script></td>
			<td><?php echo strtotime('2009-08-01T01:02:03Z'); ?>000</td>
			<td></td>
		</tr>
		<tr>
			<td>Date.parse('2009-08-01T01:02:03+09:00')</td>
			<td><script>puts(Date.parse('2009-08-01T01:02:03+09:00'));</script></td>
			<td><?php echo strtotime('2009-08-01T01:02:03+09:00'); ?>000</td>
			<td></td>
		</tr>
		<tr>
			<td>Date.parse('Monday, 01-Aug-09 01:02:03 JST')</td>
			<td><script>puts(Date.parse('Monday, 01-Aug-09 01:02:03 JST'));</script></td>
			<td><?php echo strtotime('Monday, 01-Aug-09 01:02:03 JST'); ?>000</td>
			<td></td>
		</tr>
		<tr>
			<td>Date.parse('Mon, 01 Aug 2009 01:02:03 +0900')</td>
			<td><script>puts(Date.parse('Mon, 01 Aug 2009 01:02:03 +0900'));</script></td>
			<td><?php echo strtotime('Mon, 01 Aug 2009 01:02:03 +0900'); ?>000</td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('d')</td>
			<td><script>puts(obj.format('d'));</script></td>
			<td><?php echo date('d', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('D')</td>
			<td><script>puts(obj.format('D'));</script></td>
			<td><?php echo date('D', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('j')</td>
			<td><script>puts(obj.format('j'));</script></td>
			<td><?php echo date('j', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('l')</td>
			<td><script>puts(obj.format('l'));</script></td>
			<td><?php echo date('l', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('N')</td>
			<td><script>puts(obj.format('N'));</script></td>
			<td><?php echo date('N', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('S')</td>
			<td><script>puts(obj.format('S'));</script></td>
			<td><?php echo date('S', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('w')</td>
			<td><script>puts(obj.format('w'));</script></td>
			<td><?php echo date('w', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('z')</td>
			<td><script>puts(obj.format('z'));</script></td>
			<td><?php echo date('z', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('W')</td>
			<td><script>puts(obj.format('W'));</script></td>
			<td><?php echo date('W', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('F')</td>
			<td><script>puts(obj.format('F'));</script></td>
			<td><?php echo date('F', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('m')</td>
			<td><script>puts(obj.format('m'));</script></td>
			<td><?php echo date('m', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('M')</td>
			<td><script>puts(obj.format('M'));</script></td>
			<td><?php echo date('M', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('n')</td>
			<td><script>puts(obj.format('n'));</script></td>
			<td><?php echo date('n', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('t')</td>
			<td><script>puts(obj.format('t'));</script></td>
			<td><?php echo date('t', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('L')</td>
			<td><script>puts(obj.format('L'));</script></td>
			<td><?php echo date('L', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('o')</td>
			<td><script>puts(obj.format('o'));</script></td>
			<td><?php echo date('o', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('Y')</td>
			<td><script>puts(obj.format('Y'));</script></td>
			<td><?php echo date('Y', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('y')</td>
			<td><script>puts(obj.format('y'));</script></td>
			<td><?php echo date('y', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('a')</td>
			<td><script>puts(obj.format('a'));</script></td>
			<td><?php echo date('a', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('A')</td>
			<td><script>puts(obj.format('A'));</script></td>
			<td><?php echo date('A', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('B')</td>
			<td><script>puts(obj.format('B'));</script></td>
			<td><?php echo date('B', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('G')</td>
			<td><script>puts(obj.format('G'));</script></td>
			<td><?php echo date('G', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('h')</td>
			<td><script>puts(obj.format('h'));</script></td>
			<td><?php echo date('h', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('H')</td>
			<td><script>puts(obj.format('H'));</script></td>
			<td><?php echo date('H', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('i')</td>
			<td><script>puts(obj.format('i'));</script></td>
			<td><?php echo date('i', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('s')</td>
			<td><script>puts(obj.format('s'));</script></td>
			<td><?php echo date('s', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('u')</td>
			<td><script>puts(obj.format('u'));</script></td>
			<td><?php echo date('u', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('e')</td>
			<td><script>puts(obj.format('e'));</script></td>
			<td><?php echo date('e', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('I')</td>
			<td><script>puts(obj.format('I'));</script></td>
			<td><?php echo date('I', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('O')</td>
			<td><script>puts(obj.format('O'));</script></td>
			<td><?php echo date('O', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('P')</td>
			<td><script>puts(obj.format('P'));</script></td>
			<td><?php echo date('P', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('T')</td>
			<td><script>puts(obj.format('T'));</script></td>
			<td><?php echo date('T', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('Z')</td>
			<td><script>puts(obj.format('Z'));</script></td>
			<td><?php echo date('Z', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('c')</td>
			<td><script>puts(obj.format('c'));</script></td>
			<td><?php echo date('c', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('r')</td>
			<td><script>puts(obj.format('r'));</script></td>
			<td><?php echo date('r', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format('U')</td>
			<td><script>puts(obj.format('U'));</script></td>
			<td><?php echo date('U', $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.ATOM))</td>
			<td><script>puts(obj.format(Date.ATOM));</script></td>
			<td><?php echo date(DATE_ATOM, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.COOKIE))</td>
			<td><script>puts(obj.format(Date.COOKIE));</script></td>
			<td><?php echo date(DATE_COOKIE, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.ISO8601))</td>
			<td><script>puts(obj.format(Date.ISO8601));</script></td>
			<td><?php echo date(DATE_ISO8601, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC822))</td>
			<td><script>puts(obj.format(Date.RFC822));</script></td>
			<td><?php echo date(DATE_RFC822, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC850))</td>
			<td><script>puts(obj.format(Date.RFC850));</script></td>
			<td><?php echo date(DATE_RFC850, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC1036))</td>
			<td><script>puts(obj.format(Date.RFC1036));</script></td>
			<td><?php echo date(DATE_RFC1036, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC1123))</td>
			<td><script>puts(obj.format(Date.RFC1123));</script></td>
			<td><?php echo date(DATE_RFC1123, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC2822))</td>
			<td><script>puts(obj.format(Date.RFC2822));</script></td>
			<td><?php echo date(DATE_RFC2822, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RFC3339))</td>
			<td><script>puts(obj.format(Date.RFC3339));</script></td>
			<td><?php echo date(DATE_RFC3339, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.RSS))</td>
			<td><script>puts(obj.format(Date.RSS));</script></td>
			<td><?php echo date(DATE_RSS, $time); ?></td>
			<td></td>
		</tr>
		<tr>
			<td>obj.format(Date.W3C))</td>
			<td><script>puts(obj.format(Date.W3C));</script></td>
			<td><?php echo date(DATE_W3C, $time); ?></td>
			<td></td>
		</tr>
	</tbody>
</table>

<script>
var result = ['Failed', 'Passed'], td, js, php,
    tr = document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr');
for (var i = 0, length = tr.length; i < length; ++i) {
	td = tr[i].getElementsByTagName('td');
	js = td[1].lastChild.nodeValue;
	php = td[2].firstChild.nodeValue;
	td[3].innerHTML = result[+(js === php)];
	tr[i].className = td[3].innerHTML;
	if (i % 2 === 0) {
		tr[i].className += ' even';
	}
}
</script>
</body>
</html>