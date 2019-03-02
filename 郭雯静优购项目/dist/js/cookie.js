function getCookie(name) {
	var cookies = document.cookie;
	var arr = cookies.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] == name) {
			return newArr[1];
		}
	}
}
function setCookie(name, val, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + val + ";expires=" + oDate;
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}