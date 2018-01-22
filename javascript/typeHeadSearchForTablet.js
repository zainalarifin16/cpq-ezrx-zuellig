console.log("invoked...............");
window.onload = function(){	
	var fullUrl = window.location.host;
	var parts = fullUrl.split('.');
	var sub = parts[0];
	
	var scriptEle = document.createElement("script");
	scriptEle.setAttribute("type","text/javascript");
	scriptEle.setAttribute("src","https://code.jquery.com/ui/1.12.1/jquery-ui.js");
	document.head.appendChild(scriptEle);
	
	var scriptEle = document.createElement("script");
	scriptEle.setAttribute("type","text/javascript");
	scriptEle.setAttribute("src","https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js");
	//scriptEle.setAttribute("src","https://code.jquery.com/mobile/latest/jquery.mobile.min.js");
	document.head.appendChild(scriptEle);
	
	var scriptEle = document.createElement("script");
	scriptEle.setAttribute("type","text/javascript");
	scriptEle.setAttribute("src","https://"+sub+".bigmachines.com/bmfsweb/"+sub+"/image/javascript/customerTypeHead.js");
	//document.getElementsByTagName("head")[0].appendElement(scriptEle);
	document.head.appendChild(scriptEle);
	console.log("invoked1...............");
	
}

//document.write("yesssssssssssssssssssssssssssss");