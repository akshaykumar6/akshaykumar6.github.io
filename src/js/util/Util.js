
define(function () {

	var util = {

		getCookie: function (c_name) {

			var i, x, y, ARRcookies = document.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++) {
				x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
				x = x.replace(/^\s+|\s+$/g, "");
				if (x == c_name) {
					return unescape(y);
				}
			}
		},

		setCookie: function (c_name, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value;
		},

		deleteCookie: function (c_name) {
			document.cookie = c_name + '=null; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/';
		}
	};

	return util;
});