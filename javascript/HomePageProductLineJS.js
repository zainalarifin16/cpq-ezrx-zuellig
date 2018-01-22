
if(document.body.className.indexOf("logged-in") != -1){
	var fullUrl = window.location.host;
	//window.location.host is subdomain.domain.com
	var parts = fullUrl.split('.');
	var sub = parts[0];
	window.location = "https://"+sub+".bigmachines.com/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
	//console.log("yes success");
}
//added by suresh yagnam
var fullUrl = window.location.href;	
console.log("==++++++++++++++++++++++=="+fullUrl);
//if(fullUrl.indexOf("accessdenied.jsp") != -1){
if(fullUrl.indexOf("display_company_profile.jsp") == -1 && fullUrl.toLowerCase().indexOf("fromemail") == -1){
	console.log("==++++++++++++++++++++++==1111");
	var fullUrl = document.referrer;	
	if(fullUrl != ""){
		if(fullUrl.indexOf("display_company_profile.jsp") != -1 && fullUrl.toLowerCase().indexOf("fromemail") != -1){
			var params = fullUrl.split("?")[1];
			var localUrl = window.location.host;
			var parts = localUrl.split('.');
			var sub = parts[0];
			console.log("====document.referrer==="+fullUrl);
			var redirectURL = "https://"+sub+".bigmachines.com/commerce/buyside/document.jsp?formaction=performAction&"+params;
			console.log("====redirectURL==="+redirectURL);
			window.location = redirectURL;
			
		}			
	}
		
}
window.onload = function(){
	
	var PL = document.getElementById("product-nav-zuelligPharmaProducts");
	if(PL != null){
		PL.style.display = 'none';		
		console.log(PL);
	}
	//added by suresh yagnam
	var fullUrl = window.location.href;	
	console.log("================="+fullUrl.indexOf("display_company_profile.jsp"));
	console.log("++++++++++++++"+fullUrl.toLowerCase().indexOf("fromemail"));
	//display_company_profile.jsp
	if(fullUrl.indexOf("display_company_profile.jsp") != -1 && fullUrl.toLowerCase().indexOf("fromemail") != -1){
		var params = fullUrl.split("?")[1];
		var localUrl = window.location.host;
		var parts = localUrl.split('.');
		var sub = parts[0];
		var redirectURL = "/commerce/buyside/document.jsp?formaction=performAction&"+params;
		document.getElementById('redirectUrl').value = redirectURL;
		console.log("=====redirectUrl==="+document.getElementById('redirectUrl').value);			
	}
	/*var customerId = $('input[name="_customer_id~0"]');
	console.log(customerId);
	if(customerId != null && typeof customerId != 'undefined'){
		customerId.parentElement.parentElement.style.display='none';
	}
	*/
	//added by suresh yagnam
	/*var fullUrl = window.location.href;	
	if(fullUrl.indexOf("accessdenied.jsp") != -1){
		//alert(fullUrl);
		//if($("#home").length > 0){
			//$("#home").click();
		//}
		//console.log("+++++++++++++++++1111");		
		if(document.getElementById('home')){
			//console.log("+++++++++++++++++");
			document.getElementById('home').click();
		}
	}*/
	
}
/*if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
) {*/
 /*
    Start : 22 Dec 2017
    Task  : Align the buttons in the all orders page
    Page  : All Order
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/
    //window.addEventListener("load", modifyMenu);
    //$(document).ready(modifyMenu);
    /*var tabletMenuInterval = setInterval(tabletMenuIntervalFunc,500);
    function tabletMenuIntervalFunc(){
        console.log('modifyMenu 2');
        if(document.readyState === 'complete') {
            console.log('modifyMenu 3');
            modifyMenu();
            
        }
    }    
    function modifyMenu(){
        console.log('modifyMenu 1');
        var topMenu1 = '<ul class="topMenuModified"> <li class="jg-item-mainmenu"><a href="/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&amp;navType=1" id="jg-mainmenu-profile" class="jg-linkbtn profile" data-description="Profile">Profile</a></li><li class="jg-item-mainmenu"><a href="/commerce/display_company_profile.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-home" class="jg-linkbtn home" data-description="Home">Home</a></li><li class="jg-item-mainmenu"><a href="/admin/index.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-settings" class="jg-linkbtn settings" data-description="Settings">Settings</a></li><li class="jg-item-mainmenu"><a href="/logout.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-logout" class="jg-linkbtn logout" data-description="Logout">Logout</a></li></ul>';
        var topMenu2 = '';
        $('h2#jg-topbar-title').addClass('modified').after(topMenu1);
        $('.jg-list-tool')
        .append($('<li class="jg-item-tool">')
        .append('<a href="/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&amp;from_hp=true&amp;_bm_trail_refresh_=true" id="jg-submenu-myorders" class="my_order jg-linkbtn">All Orders</a>'))
        .append($('<li class="jg-item-tool">')
        .append('<a href="#" id="jg-submenu-copyorder" class="copy_order jg-linkbtn" data-description="Copy Order">Copy Order</a>'));
        clearInterval(tabletMenuInterval);
    }*/
    //modifyMenu();
/*
    End : 22 Dec 2017
    Task  : Align the buttons in the all orders page
    Page  : All Order
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/
//}