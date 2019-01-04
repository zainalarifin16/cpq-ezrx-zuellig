
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
	
	var urlHost = window.location.host;
	var parts = urlHost.split(".");
	var sub = parts[0];

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

	if(fullUrl.indexOf("edit_tables.jsp") != -1){

		setTimeout( function(){
			var aTags = document.querySelectorAll("span.x-tree3-node-text");
			for(var i=0;i<aTags.length;i++){
				aTags[i].closest(".x-tree3-node").style.display = "none";
			}

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {

					var itemsRes = JSON.parse(this.responseText);
					var items = itemsRes.items;
					var listedTables = [];
					for (var i=0;i<items.length;i++){                                 
						var tableName = items[i].foldername;
						listedTables.push(tableName);

					}
					for(var i=0;i<aTags.length;i++){
						if(listedTables.indexOf(aTags[i].textContent) != -1){
							aTags[i].closest(".x-tree3-node").style.display = "block";
						}
					}
				}
			};
			xhttp.open("GET", "https://"+sub+".bigmachines.com/rest/v6/customBU_Table_Access?q={$or:[{'currency':{$eq:'"+_BM_USER_CURRENCY+"'}},{'applicableforallbus':{$eq:'Yes'}}]}", true);
			//xhttp.setRequestHeader("Authorization", "Basic c3VyZXNoLnlhZ25hbUBvcmFjbGUuY29tOlN1cmVzaDcxMTY1JA==");
			xhttp.send();
		}, 2000 )
	}

	if( fullUrl.indexOf("admin/index.jsp") != -1 ){

		var listedSections = [];
		var sections = document.querySelectorAll("h2");
		[].forEach.call(sections, (e)=>{
			listedSections.push(e.innerText);
			e.parentNode.parentNode.style.display = "none"; 
		});

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
						var itemsRes = JSON.parse(this.responseText);
						var items = itemsRes.items;
						//var listedSections = ["Commerce and Documents","Developer Tools","Integration Platform","General","Products","Style and Templates","Users"];
						for (var i=0;i<items.length;i++){                                 
								var sectionName = items[i].accessiblesection;
								// console.log(sectionName);
								// console.log(listedSections.indexOf(sectionName) );
								console.log(items[i].allowfullaccess);
								if(items[i].allowfullaccess != "Yes"){
										if(listedSections.indexOf(sectionName) !=-1){
											var headings = document.evaluate("//h2[contains(., '"+sectionName+"')]", document, null, XPathResult.ANY_TYPE, null );
											var thisHeading = headings.iterateNext();
											thisHeading.parentNode.parentNode.style.display = "block"; ;
										}
								}else{
									sections.forEach( (e)=>{
										e.parentNode.parentNode.style.display = "block"; 
									});
								}
						}
										
						// console.log(itemsRes.items.length);
				}
		};
		xhttp.open("GET", "https://"+sub+".bigmachines.com/rest/v6/customAdmin_Links_Access?q={$or:[{'username':{$eq:'"+_BM_USER_LOGIN+"'}},{'username':{$eq:'All'}}]}", true);
		//xhttp.setRequestHeader("Authorization", "Basic c3VyZXNoLnlhZ25hbUBvcmFjbGUuY29tOlN1cmVzaDcxMTY1JA==");
		xhttp.send();
	}
	
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