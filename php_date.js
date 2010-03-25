/**
 * @fileOverview
 * <p>Dateオブジェクトを拡張して、PHPのdate関数と同様の書式でフォーマット出来るようにする。</p>
 * <p>他、おまけメソッド色々付き。<a href="http://rewish.org/javascript/php_date">詳細</a>。</p>
 * <pre>
 * The MIT License
 *
 * Copyright (c) 2009 rew &lt;rewish.org@gmail.com&gt;
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
 * @version  0.2.0
 * @author   rew &lt;<a href="mailto:rewish.org@gmail.com">rewish.org@gmail.com</a>&gt;
 */

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
Date.ISO8601 = 'Y-m-d\\TH:i:sP';
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
 * Date.parse Original
 * @private
 */
Date.__parse = Date.parse;

/**
 * Date.parse及び定数で扱えるフォーマットをパースしてUTCベースのUNIXタイムスタンプを返す
 *
 * @param  {String} dateString      規格に沿った日付文字列
 * @param  {Number} [baseYear=2000] 年が二桁の時ベースになる年
 * @return {Number} UNIXタイムスタンプ
 */
Date.parse = function(dateString, baseYear) {
	// OperaはDate.parseが変なので取り敢えずNaNにする
	var time = window.opera ? NaN : Date.__parse(dateString);
	if (!isNaN(time)) {
		return time;
	}

	var m, ds = dateString;

	// [2009-08-01T01:02:03Z] or [2009-08-01T01:02:03+09:00]
	if (m = ds.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([\+|\-]{1}\d{2}:\d{2})?/)) {
		time = Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]);
		return m[7] ? Date.applyDiffTime(time, m[7]) : time;
	}

	// [Monday, 01-Aug-09 01:02:03 JST] or [Mon, 01 Aug 2009 01:02:03 +0900]
	baseYear = baseYear || 2000;
	if (m = ds.match(/^[a-zA-Z]+, (\d{2,})[\s|\-]([a-zA-Z]{3})[\s|\-](\d{2}) (\d{2}):(\d{2}):(\d{2})\s*(.+)?/)) {
		var month = new Date().__monthKeys[m[2]];
		time = Date.UTC(+m[3] + baseYear, month, m[1], m[4], m[5], m[6]);
		return m[7] ? Date.applyDiffTime(time, m[7]) : time;
	}

	// OperaかつtimeがNaNならDate.parseを通す
	return window.opera && isNaN(time) ? Date.__parse(dateString) : time;
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
 * Month keys
 * @private
 */
Date.prototype.__monthKeys = {
	'Jan' : 0, 'Feb' : 1, 'Mar' : 2, 'Apr' : 3, 'May' : 4,  'Jun' : 5,
	'Jul' : 6, 'Aug' : 7, 'Sep' : 8, 'Oct' : 9, 'Nov' : 10, 'Dec' : 11
};
/**
 * Month full names
 * @private
 */
Date.prototype.__monthFullNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];
/**
 * Month short names
 * @private
 */
Date.prototype.__monthShortNames = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
/**
 * Day full names
 * @private
 */
Date.prototype.__dayFullNames = [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday'
];
/**
 * Day short names
 * @private
 */
Date.prototype.__dayShortNames = [
	'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
/**
 * Timezone data
 * @private
 */
Date.prototype.__timezone = {
	'id'   : 'Asia/Tokyo',
	'abbr' : 'JST'
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
	var
		self  = this,
		year  = year  || self.getFullYear(),
		month = month || self.getMonth(),
		date  = date  || self.getDate(),
		// 今年の1月4日の曜日番号から1日2日3日の合計3日を減算
		// 上記で算出した週番号開始日を経過日数に加算
		doy = ((new Date(year, 0, 4).getDay() || 7) - 3)
		    + self.getElapseDays(year);
	// 経過日数が0以下の場合、前年から続く週番号
	if (doy <= 0) {
		year = year - 1;
		doy  = ((new Date(year, 0, 4).getDay() || 7) - 3)
		     + (new Date(year, 11, 31).getElapseDays(year));
	}
	// 12月29日より前はここで終了
	if (month < 11 || date < 29) {
		// 算出された日数を一週間分の7で割って小数点以下切り上げ
		return Math.ceil(doy / 7);
	}
	// 12月29日～12月31日の曜日がそれぞれ月、月or火、月～水なら次月の週番号開始
	if ((self.getDay() || 7) <= (3 - (31 - date))) {
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
	var
		self  = this,
		year  = year  || self.getFullYear(),
		month = month || self.getMonth(),
		date  = date  || self.getDate(),
		wn = self.getISOWeekNumber(year, month, date);
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
	var self = this;
	return self.getTime() + (self.getTimezoneOffset() * 60 * 1000);
};

/**
 * 対象年がうるう年かどうか
 *
 * @param  {Number}  [year=this.getFullYear()] 対象年
 * @return {Boolean} うるう年ならtrue、平年ならfalse
 */
Date.prototype.isLeapYear = function(year) {
	var year = year || this.getFullYear();
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
	var
		self = this,
		gmt  = self.toGMTString().split(' ')[4].split(':'),
		hour = hour || +gmt[0],
		min  = min  || +gmt[1],
		sec  = sec  || +gmt[2],
		beat = (hour * 3600 + min * 60 + sec + 3600) / 86.4;
	return ('00' + Math.floor(beat >= 1000 ? beat - 1000 : beat)).slice(-3);
};

/**
 * 対象日の序数を表すサフィックスを返す
 *
 * @param  {Number} [date=this.getDate()] 対象日
 * @return {String} "st" or "nd" or "rd" or "th"
 */
Date.prototype.getSuffix = function(date) {
	var date = date || this.getDate();
	return date == 1 || date == 21 || date == 31 ? 'st'
	     : date == 2 || date == 22 ? 'nd'
	     : date == 3 || date == 23 ? 'rd'
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
	var
		self  = this,
		year  = year  || self.getFullYear(),
		month = month || 0,
		date  = date  || 1,
		start = new Date(year, month, date),
		now   = new Date(self.getFullYear(), self.getMonth(), self.getDate());
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
	var
		self  = this,
		year  = year  || self.getFullYear(),
		month = month || self.getMonth();
	return new Date(year, month + 1, 0).getDate();
};

/**
 * 12時間単位の時間を返す
 *
 * @param  {Number} [hour=this.getHours()] 対象の時間
 * @return {Number} 12時間単位の時間
 */
Date.prototype.getHalfHours = function(hour) {
	var hour = hour || this.getHours();
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
	return [
		offset > 0 ? '-' : '+',
		('0' + Math.abs(offset)).slice(-2),
		colon ? ':' : '', '00'
	].join('');
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
	var self = this;
	var getFormatDate = function(format, obj) {
		var result = [], format = format + '';
		for (var i = 0, str; str = format.charAt(i); i++) {
			if (str === '\\') {
				result[++i] = format.charAt(i);
				continue;
			}
			result[i]
				// [Day] 01 to 31
				= str === 'd' ? ('0' + self.getDate()).slice(-2)
				// [Day] Mon through Sun
				: str === 'D' ? self.__dayShortNames[self.getDay()]
				// [Day] 1 to 31
				: str === 'j' ? self.getDate()
				// [Day] Monday through Sunday
				: str === 'l' ? self.__dayFullNames[self.getDay()]
				// [Day] 1 (for Monday) through 7 (for Sunday)
				: str === 'N' ? self.getDay() === 0 ? 7 : self.getDay()
				// [Day] st, nd, rd or th. Works well with j
				: str === 'S' ? self.getSuffix(self.getDate())
				// [Day] 0 (for Sunday) through 6 (for Saturday)
				: str === 'w' ? self.getDay()
				// [Day] 0 through 365
				: str === 'z' ? self.getElapseDays()

				// [Week] Example: 42 (the 42nd week in the year)
				: str === 'W' ? ('0' + self.getISOWeekNumber()).slice(-2)

				// [Month] January through December
				: str === 'F' ? self.__monthFullNames[self.getMonth()]
				// [Month] 01 through 12
				: str === 'm' ? ('0' + (self.getMonth() + 1)).slice(-2)
				// [Month] Jan through Dec
				: str === 'M' ? self.__monthShortNames[self.getMonth()]
				// [Month] 1 through 12
				: str === 'n' ? self.getMonth() + 1
				// [Month] 28 through 31
				: str === 't' ? self.getMonthTotalDays()

				// [Year] 1 if it is a leap year, 0 otherwise.
				: str === 'L' ? self.isLeapYear() ? 1 : 0
				// [Year] Examples: 1999 or 2003 (ISO8601)
				: str === 'o' ? self.getISOYear()
				// [Year] Examples: 1999 or 2003
				: str === 'Y' ? self.getFullYear()
				// [Year] Examples: 99 or 03
				: str === 'y' ? (self.getFullYear() + '').slice(-2)

				// [Time] am or pm
				: str === 'a' ? self.getHours() < 12 ? 'am' : 'pm'
				// [Time] AM or PM
				: str === 'A' ? self.getHours() < 12 ? 'AM' : 'PM'
				// [Time] 000 through 999
				: str === 'B' ? self.getInternetTime()
				// [Time] 1 through 12
				: str === 'g' ? self.getHalfHours()
				// [Time] 0 through 23
				: str === 'G' ? self.getHours()
				// [Time] 01 through 12
				: str === 'h' ? ('0' + self.getHalfHours()).slice(-2)
				// [Time] 00 through 23
				: str === 'H' ? ('0' + self.getHours()).slice(-2)
				// [Time] 00 to 59
				: str === 'i' ? ('0' + self.getMinutes()).slice(-2)
				// [Time] 00 through 59
				: str === 's' ? ('0' + self.getSeconds()).slice(-2)
				// [Time] Example: 654321
				: str === 'u' ? ('00' + self.getMilliseconds()).slice(-3) + '000'

				// [Timezone] Examples: UTC, GMT, Atlantic/Azores
				: str === 'e' ? self.__timezone['id']
				// [Timezone] 1 if Daylight Saving Time, 0 otherwise.
				: str === 'I' ? 0
				// [Timezone] Example: +0900
				: str === 'O' ? self.getGMTDiff()
				// [Timezone] Example: +09:00
				: str === 'P' ? self.getGMTDiff(true)
				// [Timezone] Examples: EST, MDT ...
				: str === 'T' ? self.__timezone['abbr']
				// [Timezone] -43200 through 50400
				: str === 'Z' ? (self.getTimezoneOffset() > 0 ? '-' : '')
				              + Math.abs(self.getTimezoneOffset() * 60)

				// [Full Date/Time] 2004-02-12T15:19:21+00:00
				: str === 'c' ? getFormatDate(Date.ISO8601)
				// [Full Date/Time] Example: Thu, 21 Dec 2000 16:01:07 +0200
				: str === 'r' ? getFormatDate(Date.RFC2822)
				// [Full Date/Time] Unix timestamp
				: str === 'U' ? (self.getTime() + '').slice(0, -3)

				// [NoMatch]
				: str;
		}
		return result.join('');
	};
	if (!timestamp) {
		return getFormatDate(format);
	}
	var oldTime = self.getTime();
	self.setTime(typeof timestamp === 'number' ? timestamp : Date.parse(timestamp));
	var formatDate = getFormatDate(format);
	self.setTime(oldTime);
	return formatDate;
};
