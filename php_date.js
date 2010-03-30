/**
 * @fileOverview
 * <p>Dateオブジェクトを拡張して、PHPのdate関数と同様の書式でフォーマット出来るようにする。</p>
 * <p>他、おまけメソッド色々付き。<a href="http://rewish.org/javascript/php_date">詳細</a>。</p>
 * <pre>
 * The MIT License
 *
 * Copyright (c) 2009-2010 rew &lt;rewish.org@gmail.com&gt;
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * </pre>
 *
 * @name     PHP Date
 * @version  0.3.0
 * @author   rew &lt;<a href="mailto:rewish.org@gmail.com">rewish.org@gmail.com</a>&gt;
 */
(function() {

/**
 * Y-m-d\\TH:i:sP
 * @constant
 * @return {String}
 */
Date.ATOM = 'Y-m-d\\TH:i:sP';
/**
 * l, d-M-y H:i:s T
 * @constant
 * @return {String}
 */
Date.COOKIE = 'l, d-M-y H:i:s T';
/**
 * Y-m-d\\TH:i:sP
 * @constant
 * @return {String}
 */
Date.ISO8601 = 'Y-m-d\\TH:i:sO';
/**
 * D, d M y H:i:s O
 * @constant
 * @return {String}
 */
Date.RFC822 = 'D, d M y H:i:s O';
/**
 * l, d-M-y H:i:s T
 * @constant
 * @return {String}
 */
Date.RFC850 = 'l, d-M-y H:i:s T';
/**
 * D, d M y H:i:s O
 * @constant
 * @return {String}
 */
Date.RFC1036 = 'D, d M y H:i:s O';
/**
 * D, d M Y H:i:s O
 * @constant
 * @return {String}
 */
Date.RFC1123 = 'D, d M Y H:i:s O';
/**
 * D, d M Y H:i:s O
 * @constant
 * @return {String}
 */
Date.RFC2822 = 'D, d M Y H:i:s O';
/**
 * Y-m-d\\TH:i:sP
 * @constant
 * @return {String}
 */
Date.RFC3339 = 'Y-m-d\\TH:i:sP';
/**
 * D, d M Y H:i:s O
 * @constant
 * @return {String}
 */
Date.RSS = 'D, d M Y H:i:s O';
/**
 * Y-m-d\\TH:i:sP
 * @constant
 * @return {String}
 */
Date.W3C = 'Y-m-d\\TH:i:sP';

/**
 * Month keys
 * @private
 */
var monthKeys = {
	'Jan' : 0, 'Feb' : 1, 'Mar' : 2, 'Apr' : 3, 'May' : 4,  'Jun' : 5,
	'Jul' : 6, 'Aug' : 7, 'Sep' : 8, 'Oct' : 9, 'Nov' : 10, 'Dec' : 11
};
/**
 * Month full names
 * @private
 */
var monthFullNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];
/**
 * Month short names
 * @private
 */
var monthShortNames = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
/**
 * Day full names
 * @private
 */
var dayFullNames = [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday'
];
/**
 * Day short names
 * @private
 */
var dayShortNames = [
	'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
/**
 * Timezone data
 * @private
 */
var timezone = {
	'id'   : 'Asia/Tokyo',
	'abbr' : 'JST'
};
/**
 * Date.parse Original
 * @private
 */
var DateParse = Date.parse;
/**
 * Date.parse patterns
 * @private
 */
var parsePattern = [
	// [2009-08-01T01:02:03Z] or [2009-08-01T01:02:03+09:00]
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([\+|\-]{1}\d{2}:\d{2})?/,
	// [Monday, 01-Aug-09 01:02:03 JST] or [Mon, 01 Aug 2009 01:02:03 +0900]
	/^[a-z]+, (\d{2,})[\s\-]([a-z]{3})[\s\-](\d{2}) (\d{2}):(\d{2}):(\d{2})\s*(.+)?/i
];
/**
 * is Opera
 * @private
 */
var isOpera = typeof window.opera !== 'undefined';
/**
 * zero padding
 * @private
 */
function zp(v, dig) {
	dig = dig || 2;
	return (new Array(dig + 1).join('0') + v).slice(-dig);
}

/**
 * Date.parse及び定数で扱えるフォーマットをパースしてUTCベースのUNIXタイムスタンプを返す
 *
 * @param  {String} dateString      規格に沿った日付文字列
 * @param  {Number} [baseYear=2000] 年が二桁の時ベースになる年
 * @return {Number} UNIXタイムスタンプ
 */
Date.parse = function(dateString, baseYear) {
	var m, time;

	// OperaはDate.parseが変なので取り敢えずNaNにする
	time = isOpera ? NaN : DateParse(dateString);

	if (!isNaN(time)) {
		return time;
	}

	// [2009-08-01T01:02:03Z] or [2009-08-01T01:02:03+09:00]
	if (m = dateString.match(parsePattern[0])) {
		time = Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]);
		return m[7] ? Date.applyDiffTime(time, m[7]) : time;
	}

	// [Monday, 01-Aug-09 01:02:03 JST] or [Mon, 01 Aug 2009 01:02:03 +0900]
	if (m = dateString.match(parsePattern[1])) {
		time = Date.UTC(+m[3] + (baseYear || 2000), monthKeys[m[2]], m[1], m[4], m[5], m[6]);
		return m[7] ? Date.applyDiffTime(time, m[7]) : time;
	}

	// OperaかつtimeがNaNならDate.parseを通す
	return isOpera && isNaN(time) ? DateParse(dateString) : time;
};

/**
 * 時差を適用する
 *
 * @param  {Number} time ミリ秒単位のUNIXタイムスタンプ
 * @param  {String} diff 時差文字列 (+0900 or +09:00 or JST)
 * @return {Number} 時差を適用したUNIXタイムスタンプ
 */
Date.applyDiffTime = function(time, diff) {
	diff = diff.replace('JST', '+0900').replace('UTC', '+0000');
	var diffTime = diff.match(/\d{2}/g);
	diffTime = ((Math.abs(diffTime[0]) * 60) + Math.abs(diffTime[1])) * 60 * 1000;
	return diff.match(/^./)[0] === '-' ? time + diffTime : time - diffTime;
};

/**
 * ISO-8601 月曜日に始まる年単位の週番号を返す<br>
 * ※1月4日及びその年の最初の木曜日が含まれる週が開始週番号
 *
 * @param  {Number} [year=this.getFullYear()] 対象年
 * @param  {Number} [month=this.getMonth()] 対象月
 * @param  {Number} [date=this.getDate()]  対象日
 * @return {Number} 週番号 (1-53)
 */
Date.prototype.getISOWeekNumber = function(year, month, date) {
	var _doy, doy;
	year  = year  || this.getFullYear();
	month = month || this.getMonth();
	date  = date  || this.getDate();
	// 今年の1月4日の曜日番号から1日2日3日の合計3日を減算
	_doy = (new Date(year, 0, 4).getDay() || 7) - 3;
	// 上記で算出した週番号開始日を経過日数に加算
	doy = _doy + this.getElapseDays(year);
	// 経過日数が0以下の場合、前年から続く週番号
	if (doy <= 0) {
		year = year - 1;
		doy  = _doy + (new Date(year, 11, 31).getElapseDays(year));
	}
	// 12月29日より前はここで終了
	if (month < 11 || date < 29) {
		// 算出された日数を一週間分の7で割って小数点以下切り上げ
		return Math.ceil(doy / 7);
	}
	// 12月29日～12月31日の曜日がそれぞれ月、月or火、月～水なら次月の週番号開始
	if ((this.getDay() || 7) <= (3 - (31 - date))) {
		return 1;
	}
	// 算出された日数を一週間分の7で割って小数点以下切り上げ
	return Math.ceil(doy / 7);
};

/**
 * ISO-8601 週番号に属する年を返す
 *
 * @param  {Number} [year=this.getFullYear()] 対象年
 * @param  {Number} [month=this.getMonth()] 対象月
 * @param  {Number} [date=this.getDate()]  対象日
 * @return {Number} 年
 */
Date.prototype.getISOYear = function(year, month, date) {
	year  = year  || this.getFullYear();
	month = month || this.getMonth();
	date  = date  || this.getDate();
	wn = this.getISOWeekNumber(year, month, date);
	return date <= 3 && wn >= 52 ? year - 1
	     : date >= 29 && wn == 1 ? year + 1
	     : year;
};

/**
 * getTimeの数値から時差を引いたミリ秒単位の数値を返す
 *
 * @return {Number} ミリ秒単位の数値
 */
Date.prototype.getUTCTime = function() {
	return this.getTime() + (this.getTimezoneOffset() * 60 * 1000);
};

/**
 * 対象年がうるう年かどうか
 *
 * @param  {Number}  [year=this.getFullYear()] 対象年
 * @return {Boolean} うるう年ならtrue、平年ならfalse
 */
Date.prototype.isLeapYear = function(year) {
	year = year || this.getFullYear();
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * 現在のインターネットタイムを返す
 *
 * @param  {Number} [hour=GMT Hour] 対象時
 * @param  {Number} [min=GMT Min]   対象分
 * @param  {Number} [sec=GMT Sec]   対象秒
 * @return {String} インターネットタイム
 */
Date.prototype.getInternetTime = function(hour, min, sec) {
	var beat, gmt = this.toGMTString().split(' ')[4].split(':');
	hour = hour || +gmt[0];
	min  = min  || +gmt[1];
	sec  = sec  || +gmt[2];
	beat = (hour * 3600 + min * 60 + sec + 3600) / 86.4;
	return zp(Math.floor(beat >= 1000 ? beat - 1000 : beat), 3);
};

/**
 * 対象日の序数を表すサフィックスを返す
 *
 * @param  {Number} [date=this.getDate()] 対象日
 * @return {String} "st" or "nd" or "rd" or "th"
 */
Date.prototype.getSuffix = function(date) {
	date = ('' + (date || this.getDate())).slice(-1);
	return date === '1' ? 'st'
	     : date === '2' ? 'nd'
	     : date === '3' ? 'rd'
	     : 'th';
};

/**
 * 対象年月日からの経過日数を返す
 *
 * @param  {Number} [year=this.getFullYear()] 対象年
 * @param  {Number} [month=0] 対象月
 * @param  {Number} [date=1]  対象日
 * @return {Number} 経過日数
 */
Date.prototype.getElapseDays = function(year, month, date) {
	var start = new Date(year || this.getFullYear(), month || 0, date  || 1),
	    now   = new Date(this.getFullYear(), this.getMonth(), this.getDate());
	return Math.floor((now - start) / 60 / 60 / 24 / 1000);
};

/**
 * 対象月の全日数を返す
 *
 * @param  {Number} [year=this.getFullYear()] 対象年
 * @param  {Number} [month=this.getMonth()]   対象月
 * @return {Number} 対象月の全日数
 */
Date.prototype.getMonthTotalDays = function(year, month) {
	year  = year  || this.getFullYear();
	month = month || this.getMonth();
	return new Date(year, month + 1, 0).getDate();
};

/**
 * 12時間単位の時間を返す
 *
 * @param  {Number} [hour=this.getHours()] 対象の時間
 * @return {Number} 12時間単位の時間
 */
Date.prototype.getHalfHours = function(hour) {
	hour = hour || this.getHours();
	return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
};

/**
 * グリニッジ標準時 (GMT) との時差を返す
 *
 * @param  {Boolean} [colon] trueなら時間と分をコロンで区切る
 * @return {String}  時差文字列 (+0900 or +09:00)
 */
Date.prototype.getGMTDiff = function(colon) {
	var offset = this.getTimezoneOffset() / 60;
	colon = colon ? ':' : '';
	return [offset > 0 ? '-' : '+', zp(Math.abs(offset)), colon, '00'].join('');
};

/**
 * PHPのdate関数と同様の書式で日付をフォーマット
 *
 * @example
 * var date = new Date();
 * date.format('Y-m-d H:i:s'); // 1970-01-01 00:00:00
 * @param  {String} format フォーマット文字列
 * @param  {Number|String} [timestamp] UNIXタイムスタンプ または Date.parseでパース出来る日付
 * @return {String} フォーマット文字列にしたがってフォーマットされた日付
 * @see <a href="http://php.net/manual/ja/function.date.php">PHP: date - Manual</a>
 */
Date.prototype.format = function(format, timestamp) {
	if (!timestamp) {
		return toFormatDate.call(this, format);
	}
	if (typeof timestamp !== 'number') {
		timestamp = Date.parse(timestamp);
	}
	var _timestamp = this.getTime();
	this.setTime(timestamp);
	var formatDate = toFormatDate.call(this, format);
	this.setTime(_timestamp);
	return formatDate;
};

function toFormatDate(format) {
	var result = [];
	format = format + '';
	for (var i = 0, str; str = format.charAt(i); i++) {
		if (str === '\\') {
			result[++i] = format.charAt(i);
			continue;
		}
		result[i]
			// [Day] 01 to 31
			= str === 'd' ? zp(this.getDate())
			// [Day] Mon through Sun
			: str === 'D' ? dayShortNames[this.getDay()]
			// [Day] 1 to 31
			: str === 'j' ? this.getDate()
			// [Day] Monday through Sunday
			: str === 'l' ? dayFullNames[this.getDay()]
			// [Day] 1 (for Monday) through 7 (for Sunday)
			: str === 'N' ? this.getDay() === 0 ? 7 : this.getDay()
			// [Day] st, nd, rd or th. Works well with j
			: str === 'S' ? this.getSuffix(this.getDate())
			// [Day] 0 (for Sunday) through 6 (for Saturday)
			: str === 'w' ? this.getDay()
			// [Day] 0 through 365
			: str === 'z' ? this.getElapseDays()

			// [Week] Example: 42 (the 42nd week in the year)
			: str === 'W' ? zp(this.getISOWeekNumber())

			// [Month] January through December
			: str === 'F' ? monthFullNames[this.getMonth()]
			// [Month] 01 through 12
			: str === 'm' ? zp(this.getMonth() + 1)
			// [Month] Jan through Dec
			: str === 'M' ? monthShortNames[this.getMonth()]
			// [Month] 1 through 12
			: str === 'n' ? this.getMonth() + 1
			// [Month] 28 through 31
			: str === 't' ? this.getMonthTotalDays()

			// [Year] 1 if it is a leap year, 0 otherwise.
			: str === 'L' ? this.isLeapYear() ? 1 : 0
			// [Year] Examples: 1999 or 2003 (ISO8601)
			: str === 'o' ? this.getISOYear()
			// [Year] Examples: 1999 or 2003
			: str === 'Y' ? this.getFullYear()
			// [Year] Examples: 99 or 03
			: str === 'y' ? (this.getFullYear() + '').slice(-2)

			// [Time] am or pm
			: str === 'a' ? this.getHours() < 12 ? 'am' : 'pm'
			// [Time] AM or PM
			: str === 'A' ? this.getHours() < 12 ? 'AM' : 'PM'
			// [Time] 000 through 999
			: str === 'B' ? this.getInternetTime()
			// [Time] 1 through 12
			: str === 'g' ? this.getHalfHours()
			// [Time] 0 through 23
			: str === 'G' ? this.getHours()
			// [Time] 01 through 12
			: str === 'h' ? zp(this.getHalfHours())
			// [Time] 00 through 23
			: str === 'H' ? zp(this.getHours())
			// [Time] 00 to 59
			: str === 'i' ? zp(this.getMinutes())
			// [Time] 00 through 59
			: str === 's' ? zp(this.getSeconds())
			// [Time] Example: 654321
			: str === 'u' ? zp(this.getMilliseconds(), 3) + '000'

			// [Timezone] Examples: UTC, GMT, Atlantic/Azores
			: str === 'e' ? timezone['id']
			// [Timezone] 1 if Daylight Saving Time, 0 otherwise.
			: str === 'I' ? 0
			// [Timezone] Example: +0900
			: str === 'O' ? this.getGMTDiff()
			// [Timezone] Example: +09:00
			: str === 'P' ? this.getGMTDiff(true)
			// [Timezone] Examples: EST, MDT ...
			: str === 'T' ? timezone['abbr']
			// [Timezone] -43200 through 50400
			: str === 'Z' ? (this.getTimezoneOffset() > 0 ? '-' : '')
			              + Math.abs(this.getTimezoneOffset() * 60)

			// [Full Date/Time] 2004-02-12T15:19:21+00:00
			// Date.ISO8601
			: str === 'c' ? toFormatDate.call(this, Date.ATOM)
			// [Full Date/Time] Example: Thu, 21 Dec 2000 16:01:07 +0200
			: str === 'r' ? toFormatDate.call(this, Date.RFC2822)
			// [Full Date/Time] Unix timestamp
			: str === 'U' ? (this.getTime() + '').slice(0, -3)

			// [NoMatch]
			: str;
	}
	return result.join('');
}

})();
