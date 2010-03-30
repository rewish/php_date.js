[PHP: date - Manual](http://php.net/date)

Introduction
============

	<script type="text/javascript" src="php_date.js"></script>
	<script type="text/javascript">
		var obj = new Date;

		alert(obj.format('Y-m-d H:i:s'));
		// 2005-08-15 15:52:01
		alert(obj.format(Date.ISO8601));
		// 2005-08-15T15:52:01+09:00
		alert(obj.format(Date.RFC822));
		// Mon, 15 Aug 05 15:52:01 +0900

		alert(obj.format(Date.ISO8601));
		// 2005-08-15T15:52:01+09:00
		alert(obj.format(Date.RFC822));
		// Mon, 15 Aug 05 15:52:01 +0900

		alert(Date.parse('2005-08-15T15:52:01+09:00'));
		// 1124088721000
		alert(Date.parse('Wed, 19 Aug 09 00:12:58 +0900'));
		// 1250608378000

		alert(obj.format('Y-m-d H:i:s', 1124088721000));
		// 2005-08-15 15:52:01
		alert(obj.format('Y-m-d H:i:s', '2009-12-20T18:32:31+00:00'));
		// 2009-12-20 09:32:31
	</script>
