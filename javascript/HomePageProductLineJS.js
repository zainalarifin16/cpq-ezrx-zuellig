if (document.body.className.indexOf("logged-in") != -1) {
	var fullUrl = window.location.host;
	//window.location.host is subdomain.domain.com
	var parts = fullUrl.split('.');
	var sub = parts[0];
	window.location = "https://" + sub + ".bigmachines.com/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
	//console.log("yes success");
}
//added by suresh yagnam
var fullUrl = window.location.href;
console.log("==++++++++++++++++++++++==" + fullUrl);
//if(fullUrl.indexOf("accessdenied.jsp") != -1){
if (fullUrl.indexOf("display_company_profile.jsp") == -1 && fullUrl.toLowerCase().indexOf("fromemail") == -1) {
	console.log("==++++++++++++++++++++++==1111");
	var fullUrl = document.referrer;
	if (fullUrl != "") {
		if (fullUrl.indexOf("display_company_profile.jsp") != -1 && fullUrl.toLowerCase().indexOf("fromemail") != -1) {
			var params = fullUrl.split("?")[1];
			var localUrl = window.location.host;
			var parts = localUrl.split('.');
			var sub = parts[0];
			console.log("====document.referrer===" + fullUrl);
			var redirectURL = "https://" + sub + ".bigmachines.com/commerce/buyside/document.jsp?formaction=performAction&" + params;
			console.log("====redirectURL===" + redirectURL);
			window.location = redirectURL;

		}
	}

}
function getQueryVariableUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

window.onload = function () {

	if(getQueryVariableUrl("flag") == "rightnow"){
		window.sessionStorage.setItem("flag", "rightnow");
	}
	var urlHost = window.location.host;
	var parts = urlHost.split(".");
	var sub = parts[0];

	var PL = document.getElementById("product-nav-zuelligPharmaProducts");
	if (PL != null) {
		PL.style.display = 'none';
		console.log(PL);
	}
	//added by suresh yagnam
	var fullUrl = window.location.href;
	console.log("=================" + fullUrl.indexOf("display_company_profile.jsp"));
	console.log("++++++++++++++" + fullUrl.toLowerCase().indexOf("fromemail"));
	//display_company_profile.jsp
	if (fullUrl.indexOf("display_company_profile.jsp") != -1 && fullUrl.toLowerCase().indexOf("fromemail") != -1) {
		var params = fullUrl.split("?")[1];
		var localUrl = window.location.host;
		var parts = localUrl.split('.');
		var sub = parts[0];
		var redirectURL = "/commerce/buyside/document.jsp?formaction=performAction&" + params;
		document.getElementById('redirectUrl').value = redirectURL;
		console.log("=====redirectUrl===" + document.getElementById('redirectUrl').value);
	}

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	
	var isIEBrowser = (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));

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

	var closestOfClass = function(node, className){
		if(typeof(node.msMatchesSelector) !== "undefined" ){
			console.log(node, node.className, className, node.msMatchesSelector(className) );
			if(typeof(node) !== "undefined"){
				if(node.msMatchesSelector(className)){
					return node;
				}
				else if(typeof(node.parentNode) !== "undefined"){
					return closestOfClass(node.parentNode, className);
				}
			}
			
		}else{
			if(typeof(node.parentNode) !== "undefined"){
				return closestOfClass(node.parentNode, className);
			}else{
				return null;
			}
		}
	}

	if (fullUrl.indexOf("/admin/") != -1 || fullUrl.indexOf("/commerce/profile/") != -1) {
		(function() {
		// Load the script
		var script = document.createElement("SCRIPT");
		script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
		script.type = 'text/javascript';
		script.onload = function() {
			var $ = window.jQuery;
			// Use $ here...

			function getAccessMenu() {
				// return true;
				if( window._BM_USER_COMPANY.indexOf("zuelligpharma") == -1 ) return true;

				var listedSections = [];
				var ua = window.navigator.userAgent;
				var msie = ua.indexOf("MSIE ");
				
				var isIEBrowser = (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
				console.log( "isIEBrowser" );
				console.log(isIEBrowser);
				// debugger;
				var sections = document.querySelectorAll("h2");
				if (isIEBrowser)
				{
					if(sections.length > 0){
						for(var i = 0; i< sections.length; i++){
							listedSections.push(sections[i].innerText);
							sections[i].parentNode.parentNode.style.display = "none";
						}
					}
				} else {
					sections.forEach(function(e){
						listedSections.push(e.innerText);
						e.parentNode.parentNode.style.display = "none";
					})
					// [].forEach.call(sections, (e) => {
					// 	listedSections.push(e.innerText);
					// 	e.parentNode.parentNode.style.display = "none";
					// });
				}
		
				listedMenuAdmin = [];
				var linkadmin = document.querySelectorAll(".admin-sidebar-item, .admin-sidebar-current");
				
				if (isIEBrowser)
				{
					if(linkadmin.length>0){
						for(var i=0; i< linkadmin.length; i++){
							var e = linkadmin[i];
							// console.log(e);
							listedMenuAdmin.push(e.href);
							e.style.display = "none";
							if (e.nextSibling != null) {
								// console.log(e.nextSibling.nextSibling);
								if (e.nextSibling.nextSibling != null) {
									if( e.nextSibling.nextSibling.style != null ){
										e.nextSibling.nextSibling.style.display = "none";
									}
								}
							}
						}
					}
				}else{
					linkadmin.forEach(function(e){
						listedMenuAdmin.push(e.href);
						e.style.display = "none";
						if (e.nextSibling != null) {
							console.log(e.nextSibling.nextSibling);
							if (e.nextSibling.nextSibling != null) {
								if( e.nextSibling.nextSibling.style != null ){
									e.nextSibling.nextSibling.style.display = "none";
								}
							}
						}
					})
					// [].forEach.call(linkadmin, (e) => {
					// 	listedMenuAdmin.push(e.href);
					// 	e.style.display = "none";
					// 	if (e.nextSibling != null) {
					// 		console.log(e.nextSibling.nextSibling);
					// 		if (e.nextSibling.nextSibling != null) {
					// 			if( e.nextSibling.nextSibling.style != null ){
					// 				e.nextSibling.nextSibling.style.display = "none";
					// 			}
					// 		}
					// 	}
					// });
				}
		
				filterComponent = document.getElementById("x-auto-9");
				if (filterComponent != null) {
					filterComponent.style.display = "none";
				}
		
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function () {
					console.log(this);
					if (this.readyState == 4 && this.status == 200) {
						var itemsRes = JSON.parse(this.responseText);
						var items = itemsRes.items;
						//var listedSections = ["Commerce and Documents","Developer Tools","Integration Platform","General","Products","Style and Templates","Users"];
						for (var i = 0; i < items.length; i++) {
							var sectionName = items[i].accessiblesection;
							// console.log(items[i].allowfullaccess);
		
							for (var j = 0; j < listedMenuAdmin.length; j++) {
								// console.log( sectionName, listedMenuAdmin[j].indexOf(sectionName));
								if (listedMenuAdmin[j].indexOf("/" + sectionName + "/") != -1) {
									// var menu = document.evaluate(".admin-sidebar-item[href*='/"+sectionName+"/']", document, null, XPathResult.ANY_TYPE, null );
									// var thismenu = menu.iterateNext();
									// thismenu.
									var section = document.querySelector(".admin-sidebar-item[href*='/" + sectionName + "/']");
									if (section != null) {
										section.style.display = "block";
										if (section.nextSibling != null) {
											if (section.nextSibling.nextSibling != null) {
												// console.log( section.nextSibling.nextSibling );
												if(section.nextSibling.nextSibling.style != null){
													section.nextSibling.nextSibling.style.display = "block";
												}
											}
										}
										section.parentNode.style.display = "inline-flex";
										section.parentNode.style.float = "right";
									}
								}
							}
		
							if (items[i].allowfullaccess != "Yes") {
								// ruleAccessMenu.listMenu.push( sectionName );
								for (var j = 0; j < listedSections.length; j++) {
									// console.log(listedSections[j], " == ", sectionName);
									if (listedSections[j].indexOf(sectionName) != -1) {
										
										// if(isIEBrowser){
										// 	// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
										// 	closestOfClass($("h2:contains('"+listedSections[j]+"')"), ".ul-list-display").style.display = "block";
										// }else{
										// 	$("h2:contains('"+listedSections[j]+"')").closest(".ul-list-display").show();
										// }

										$("h2:contains('"+listedSections[j]+"')").closest(".ul-list-display").show();
		
										/* var headings = document.evaluate("//h2[contains(., '" + listedSections[j] + "')]", document, null, XPathResult.ANY_TYPE, null);
										var thisHeading = headings.iterateNext();
										// console.log(listedSections[j], thisHeading); // Prints the html element in console
										if (thisHeading != null) {
											// console.log(listedSections[j]);
											// console.log(thisHeading.textContent); // prints the text content in console
											if (thisHeading.parentNode != null) {
												thisHeading.parentNode.parentNode.style.display = "block";
											}
										} */
									}
								}
		
							} else {
								// ruleAccessMenu.isFullAccess = true;
								var linkadmin = document.querySelectorAll(".admin-sidebar-item, .admin-sidebar-current");
								if (isIEBrowser){
									for(var i=0; i< linkadmin.length; i++){
										var e = linkadmin[i];
										// console.log(e);
										listedMenuAdmin.push(e.href);
										e.style.display = "block";
										if (e.nextSibling != null) {
											// console.log(e.nextSibling.nextSibling);
											if (e.nextSibling.nextSibling != null) {
												if( e.nextSibling.nextSibling.style != null ){
													e.nextSibling.nextSibling.style.display = "block";
												}
											}
										}
									}

									if(sections.length > 0){
										for(var i = 0; i< sections.length; i++){
											console.log(sections[i], sections[i].parentNode.parentNode);
											sections[i].parentNode.parentNode.style.display = "block";
										}
									}

								}else{
									console.log(linkadmin);
									linkadmin.forEach(function(e){
										listedMenuAdmin.push(e.href);
										e.style.display = "block";
										if (e.nextSibling != null) {
											// console.log(e.nextSibling.nextSibling);
											if (e.nextSibling.nextSibling != null) {
												if( e.nextSibling.nextSibling.style != null ){
													e.nextSibling.nextSibling.style.display = "block";
												}
											}
										}
									})
									// [].forEach.call(linkadmin, (e) => {
									// 	listedMenuAdmin.push(e.href);
									// 	e.style.display = "block";
									// 	if (e.nextSibling != null) {
									// 		// console.log(e.nextSibling.nextSibling);
									// 		if (e.nextSibling.nextSibling != null) {
									// 			if( e.nextSibling.nextSibling.style != null ){
									// 				e.nextSibling.nextSibling.style.display = "block";
									// 			}
									// 		}
									// 	}
									// });

									sections.forEach(function(e){
										e.parentNode.parentNode.style.display = "block";
									});

								}
								
								
		
								// for(var i=0; i<sections.length; i++){
								// 	var e = sections[i];
								// 	e.parentNode.parentNode.style.display = "block";
								// }
		
								// var sections = document.querySelectorAll("h2");
								// console.log(sections, sections.length);
								
								if (filterComponent != null) {
									filterComponent.style.display = "block";
								}
		
							}
							if (sectionName != null) {
								if (sectionName.toLowerCase() == "filter") {
									if (filterComponent != null) {
										filterComponent.style.display = "block";
									}
								}
							}
		
						}
						// console.log(itemsRes.items.length);
					}else{
						var linkadmin = document.querySelectorAll(".admin-sidebar-item, .admin-sidebar-current");
						if(isIEBrowser){
							for(var i=0; i< linkadmin.length; i++){
								var e = linkadmin[i];
								// console.log(e);
								listedMenuAdmin.push(e.href);
								e.removeAttribute("style");
								if (e.nextSibling != null) {
									// console.log(e.nextSibling.nextSibling);
									if (e.nextSibling.nextSibling != null) {
										if( e.nextSibling.nextSibling.style != null ){
											e.nextSibling.nextSibling.removeAttribute("style");
										}
									}
								}
							}
						}else{

							linkadmin.forEach(function(e){

									listedMenuAdmin.push(e.href);
									e.removeAttribute("style");
									if (e.nextSibling != null) {
										// console.log(e.nextSibling.nextSibling);
										if (e.nextSibling.nextSibling != null) {
											if( e.nextSibling.nextSibling.style != null ){
												e.nextSibling.nextSibling.removeAttribute("style");
											}
										}
									}

							})

							// [].forEach.call(linkadmin, (e) => {
							// 	listedMenuAdmin.push(e.href);
							// 	e.removeAttribute("style");
							// 	if (e.nextSibling != null) {
							// 		// console.log(e.nextSibling.nextSibling);
							// 		if (e.nextSibling.nextSibling != null) {
							// 			if( e.nextSibling.nextSibling.style != null ){
							// 				e.nextSibling.nextSibling.removeAttribute("style");
							// 			}
							// 		}
							// 	}
							// });
						}
					}
				};
				xhttp.open("GET", "https://" + sub + ".bigmachines.com/rest/v6/customAdmin_Links_Access?q={$or:[{'username':{$eq:'" + _BM_USER_LOGIN + "'}},{'username':{$eq:'All'}}]}", true);
				//xhttp.setRequestHeader("Authorization", "Basic c3VyZXNoLnlhZ25hbUBvcmFjbGUuY29tOlN1cmVzaDcxMTY1JA==");
				xhttp.send();
			}
			var t0 = performance.now();
			getAccessMenu();
			var t1 = performance.now();
			console.log("Call to getAccessMenu took " + (t1 - t0) + " milliseconds.");


			if (fullUrl.indexOf("edit_tables.jsp") != -1) {
				// return true;
				var t0 = performance.now();
				console.log("execute edit_table spesific function");
				var addClassParentTreepanel = function () {
					var listParentTreePanel = document.getElementById("_treePanel");
					for (var i = 0; i < listParentTreePanel.childElementCount; i++) {
		
						childTree = listParentTreePanel.childNodes[i].querySelector(".x-tree3-el");
						spandChild = childTree.querySelector(".x-tree3-node-text");
						// console.log(spandChild.textContent, "added class");
						if (spandChild != null) {
							spandChild.classList.add("parent-treepanel");
						}
		
					}
				}
		
				setTimeout(function () {
		
					var hideParentTreeView = function(){
						var aTags = document.querySelectorAll("span.x-tree3-node-text");
						for (var i = 0; i < aTags.length; i++) {
							// console.log( closestOfClass(aTags[i], "x-tree3-node") );
							if(isIEBrowser){
								// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
								closestOfClass(aTags[i], ".x-tree3-node").style.visibility = "hidden";
							}else{
								aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
							}
							// aTags[i].closest(".x-tree3-node").style.height = "0px";
							addClassParentTreepanel();
							// aTags[i].closest(".x-tree3-node").classList.add("parent-treepanel");
						}
					}
		
					hideParentTreeView();
		
					var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
		
							var itemsRes = JSON.parse(this.responseText);
							var items = itemsRes.items;
							// var listedFoldername = ["[Default]"];
							var listedFoldername = [];
							var listedTablename = [];
							var isShowAll = false;
		
							// Select the node that will be observed for mutations
							var targetNodeTreePanel = document.getElementById('_treePanel');
							// var targetNode = document.getElementsByTagName('body')[0];
		
							// Options for the observer (which mutations to observe)
							var config = {
								attributes: true,
								childList: true,
								subtree: true
							};
		
							var showTreePanelFromList = function () {
								var aTags = document.querySelectorAll("span.parent-treepanel");
								// console.log(aTags);
								for (var i = 0; i < aTags.length; i++) {
									// console.log( aTags[i], aTags[i].textContent, listedFoldername, listedFoldername.indexOf(aTags[i].textContent) );
									console.log(aTags[i].textContent.replace(/[^\w\s]/gi, ''), listedFoldername);
									if (listedFoldername.indexOf(aTags[i].textContent.replace(/[^\w\s]/gi, '')) == -1) {
										if(isIEBrowser){
											// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
											closestOfClass(aTags[i], ".x-tree3-node").style.visibility = "hidden";
										}else{
											aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
										}
										
										// aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
										// aTags[i].closest(".x-tree3-node").style.height = "0px";
									} else {
										if(isIEBrowser){
											// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
											var nodeATags = closestOfClass(aTags[i], ".x-tree3-node");
											nodeATags.removeAttribute("style");
											nodeATags.style.visibility = "visible";

										}else{
											aTags[i].closest(".x-tree3-node").removeAttribute("style");
											aTags[i].closest(".x-tree3-node").style.visibility = "visible";
										}
										// aTags[i].closest(".x-tree3-node").removeAttribute("style");
										// aTags[i].closest(".x-tree3-node").style.visibility = "visible";
									}
								}
							}

							var reStructureTreeView = function(){
								var aTags = document.querySelectorAll("span.x-tree3-node-text.parent-treepanel");
								for (var i = 0; i < aTags.length; i++) {
									var nodeATags = null;
									if(isIEBrowser){
										// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
										nodeATags = closestOfClass(aTags[i], ".x-tree3-node");
										
									}else{
										nodeATags = aTags[i].closest(".x-tree3-node");

									}
									
									if(nodeATags.style.visibility == "hidden"){
										document.getElementById("_treePanelContainer").appendChild(nodeATags);
									}
								}
							}
		
							// Callback function to execute when mutations are observed
							var callback = function (mutationsList, observer) {
								for (var j=0; j < mutationsList.length; j++) {
									var mutation = mutationsList[j];
									// console.log(mutation);
									if (mutation.type == 'childList') {
										addClassParentTreepanel();
										showTreePanelFromList();
										// reStructureTreeView();
									}
								}
							};
		
							// Create an observer instance linked to the callback function
							var observerTreePanel = new MutationObserver(callback);
		
							var filterTreepanel = function () {
		
								addClassParentTreepanel();
		
								var aTags = document.querySelectorAll("span.parent-treepanel");
								for (var i = 0; i < aTags.length; i++) {
									if(isIEBrowser){
										// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
										closestOfClass(aTags[i], ".x-tree3-node").style.visibility = "hidden";
									}else{
										aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
									}
									// aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
									// aTags[i].closest(".x-tree3-node").style.height = "0px";
								}
								// Start observing the target node for configured mutations
								observerTreePanel.observe(targetNodeTreePanel, config);
		
							}
		
		
							for (var i = 0; i < items.length; i++) {
								var foldername = items[i].foldername;
								if (foldername != null) {
									console.log(foldername);
									listedFoldername.push(foldername);
								} else {
									var tablename = items[i].tablename;
									if (!isShowAll) {
										if (tablename.toLowerCase() == "all") {
											isShowAll = true;
										} else {
											listedTablename.push(tablename);
										}
									}
								}
		
							}
							console.log(listedFoldername, listedTablename);
		
							var hideItemCombo = function () {
		
								setTimeout(function () {
									
									console.log("hide item combo", isShowAll);
									var itemComboList = document.getElementsByClassName("x-combo-list-item");
									if (!isShowAll) {
			
										for (var i = 0; i < itemComboList.length; i++) {
											console.log(itemComboList[i].textContent, listedTablename.indexOf(itemComboList[i].textContent));
											if (listedTablename.indexOf(itemComboList[i].textContent) == -1) {
												itemComboList[i].style.display = "none";
											}
										}
			
									}
		
								}, 1000);
							}
		
							var hideItemComboNewTable = function () {
		
								// setTimeout(function () {
		
								var itemComboList = document.getElementsByClassName("x-combo-list-item");
								if (!isShowAll) {
									for (var i = 0; i < itemComboList.length; i++) {
										if (listedFoldername.indexOf(itemComboList[i].textContent) == -1) {
											itemComboList[i].style.display = "none";
											
										}
									}
								} else {
									for (var i = 0; i < itemComboList.length; i++) {
										itemComboList[i].style.display = "block";
									}
								}
		
								// }, 500);
		
							}
							
							var showParentTreeView = function(){
								var aTags = document.querySelectorAll("span.x-tree3-node-text.parent-treepanel");
								if (!isShowAll) {
									for (var i = 0; i < aTags.length; i++) {
										console.log( aTags[i].textContent, listedFoldername.indexOf(aTags[i].textContent.replace(/[^\w\s]/gi, '')) )
										if (listedFoldername.indexOf(aTags[i].textContent.replace(/[^\w\s]/gi, '')) != -1) {
											if(isIEBrowser){
												// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
												var nodeATags = closestOfClass(aTags[i], ".x-tree3-node");
												nodeATags.removeAttribute("style");
												nodeATags.style.visibility = "visible";
											}else{
												aTags[i].closest(".x-tree3-node").removeAttribute("style");
												aTags[i].closest(".x-tree3-node").style.visibility = "visible";
											}
											// aTags[i].closest(".x-tree3-node").removeAttribute("style");
											// aTags[i].closest(".x-tree3-node").style.visibility = "visible";
										}
									}
								} else {
									for (var i = 0; i < aTags.length; i++) {
										if(isIEBrowser){
											// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
											var nodeATags = closestOfClass(aTags[i], ".x-tree3-node");
											nodeATags.removeAttribute("style");
											nodeATags.style.visibility = "visible";
										}else{
											aTags[i].closest(".x-tree3-node").removeAttribute("style");
											aTags[i].closest(".x-tree3-node").style.visibility = "visible";
										}
										// aTags[i].closest(".x-tree3-node").removeAttribute("style");
										// aTags[i].closest(".x-tree3-node").style.visibility = "visible";
									}
								}
							}
		
							// var hideUnusedTreeView = function(){
							// 	var aTags = document.querySelectorAll("span.x-tree3-node-text.parent-treepanel");
							// 	for (var i = 0; i < aTags.length; i++) {
							// 		console.log(listedFoldername);
							// 		console.log( aTags[i].textContent, listedFoldername.indexOf(aTags[i].textContent.replace(/[^\w\s]/gi, '')) )
							// 		if (listedFoldername.indexOf(aTags[i].textContent.replace(/[^\w\s]/gi, '')) == -1) {
							// 			aTags[i].closest(".x-tree3-node").style.visibility = "hidden";
							// 		}
							// 	}
							// }
		
							showParentTreeView();
							// reStructureTreeView();
		
							var docFilter = document.getElementById("x-auto-16-input");
							docFilter.addEventListener("keyup", filterTreepanel);
		
							// var expandCollapseTree = document.getElementsByClassName("x-tree3-node-joint");
							// for(var i = 0; i < expandCollapseTree.length; i++){
							// 	expandCollapseTree[i].addEventListener("click", function(){
							// 		console.log("expand clicked");
							// 		var aTags = document.querySelectorAll("span.x-tree3-node-text");
							// 		for (var i = 0; i < aTags.length; i++) {
							// 			aTags[i].closest(".x-tree3-node").style.visibility = "visible";
							// 		}
							// 		setTimeout(function(){
							// 			hideUnusedTreeView();
							// 		}, 1000);
									
							// 	});
							// }
		
							var targetBody = document.getElementsByTagName('body')[0];
							// Callback function to execute when mutations are observed
							var callbackBody = function (mutationsList, observer) {
								for ( var j=0; j < mutationsList.length; j++) {
									var mutation = mutationsList[j];
									if (mutation.type == 'childList') {
										// console.log(mutation);
		
										var elePopUp = document.getElementsByClassName("x-window-header-text");
										if (elePopUp != null && elePopUp.length > 0) {
											elePopUp = elePopUp[0];
											labelPopUp = elePopUp.innerText.toLowerCase();
											if (labelPopUp == "new table") {
												
												var formCombobox = null;
												if(isIEBrowser){
													// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
													formCombobox = closestOfClass(elePopUp, ".x-window").getElementsByClassName("x-form-element");
												}else{
													formCombobox = elePopUp.closest(".x-window").getElementsByClassName("x-form-element");
												}
												for (var i = 0; i < formCombobox.length; i++) {
													if (formCombobox[i].previousSibling.innerText.toLowerCase() == "parent folder:") {
														var componentCombobox = formCombobox[i];
														componentCombobox.addEventListener("click", hideItemComboNewTable);
													}
												}
		
											} else if (labelPopUp == "import table data") {
		
												var formCombobox = null;
												if(isIEBrowser){
													// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
													formCombobox = closestOfClass(elePopUp, ".x-window").getElementsByClassName("x-form-element");
												}else{
													formCombobox = elePopUp.closest(".x-window").getElementsByClassName("x-form-element");
												}
												for (var i = 0; i < formCombobox.length; i++) {
													if (formCombobox[i].previousSibling.innerText.toLowerCase() == "destination folder") {
														var componentCombobox = formCombobox[i];
														componentCombobox.addEventListener("click", hideItemComboNewTable);
													}
												}
		
											} else if (labelPopUp == "status log") {
												// console.log("status log");
												// var listTableNameStatus = document.getElementsByClassName("x-grid3-td-name");
												// for (var i = 0; i < listTableNameStatus.length; i++) {
												// 	if (!listTableNameStatus[i].classList.contains("x-grid3-header")) {
												// 		if (listedTablename.indexOf(listTableNameStatus[i].innerText.trim()) == -1) {
												// 			listTableNameStatus[i].closest(".x-grid3-row").style.visibility = "hidden";
												// 		}
												// 	}
												// }
		
											} else if (labelPopUp == "search tables") {
		
												var formCombobox = null;
												if(isIEBrowser){
													// console.log("Result : ", closestOfClass( aTags[i], ".x-tree3-node"));
													formCombobox = closestOfClass(elePopUp, ".x-window").getElementsByClassName("x-form-element");
												}else{
													formCombobox = elePopUp.closest(".x-window").getElementsByClassName("x-form-element");
												}
												for (var i = 0; i < formCombobox.length; i++) {
													if (formCombobox[i].previousSibling.innerText.toLowerCase() == "tables:") {
														var componentCombobox = formCombobox[i];
														componentCombobox.addEventListener("click", hideItemCombo);
														var inputCombobox = componentCombobox.getElementsByTagName("input")[0];
														inputCombobox.addEventListener("change", hideItemCombo);
														inputCombobox.addEventListener("keyup", hideItemCombo);
													}
												}
		
											}
										}
		
									}
								}
							};
		
							var observerBody = new MutationObserver(callbackBody);
		
							observerBody.observe(targetBody, config);
		
						}
					};
					xhttp.open("GET", "https://" + sub + ".bigmachines.com/rest/v6/customBU_Table_Access?q={$or:[{'currency':{$eq:'" + _BM_USER_CURRENCY + "'}},{'applicableforallbus':{$eq:'Yes'}}]}", true);
					//xhttp.setRequestHeader("Authorization", "Basic c3VyZXNoLnlhZ25hbUBvcmFjbGUuY29tOlN1cmVzaDcxMTY1JA==");
					xhttp.send();
		
				}, 2000);
				var t1 = performance.now();
				console.log("Call to edit_table spesific function took " + (t1 - t0) + " milliseconds.");
				
			}

		};
		document.getElementsByTagName("head")[0].appendChild(script);
	})();
	
	}

	

	// var xhttpJquery = new XMLHttpRequest();
	// xhttpJquery.onreadystatechange = function () {
	

		

	// }
	// xhttpJquery.open("GET", "https://code.jquery.com/jquery-1.7.1.min.js", true);
	// xhttpJquery.send();

	if (fullUrl.indexOf("admin/index.jsp") != -1) {

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