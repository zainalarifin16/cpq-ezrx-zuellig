console.log("js-tablet1");
var js2 = jQuery.noConflict();
$(document).ready(function() {
	console.log("js-tablet2");

	var check_nationality = function (nationality) {
		var countryEle = document.getElementById('userSalesOrg_t');
		if (countryEle == null) { //this is for material page.
			countryEle = $('input[name="userSalesOrg_PL"]').val();
			countryCode = countryEle;
		} else {
			var countryCode = parseInt(countryEle.value);
		}
				
		if (typeof countryCode == "undefined" || countryCode == "" || isNaN(countryCode)) {		
			countryCode = "2601";
		}
		if (nationality == 2600) {
			nationality = 2601;
		}

		console.log("countryCode", typeof countryCode, countryCode, typeof countryCode == "undefined");		
		var valid = false;
		if (nationality == countryCode || countryCode == 2601 || countryCode == 2600) {
			valid = true;
		}

		return valid;
	}

	var isLoadingDone = function(){
		return $("#jg-overlay").css("display") == "none"? true : false;
	}

	var getZPUserType = function() {
        if ($("#zPUserType").length > 0 || $("input[name='zPUserType']").length > 0 ){
            return ($("#zPUserType").length > 0) ? $("#zPUserType").val().toLowerCase() : $("input[name='zPUserType']").val().toLowerCase();
        }else{
            return "";
        }
	}

	function showLoadingDialog() {
		if ($('#jg-overlay').length > 1) {
			$('#jg-overlay').show();		
		}
	}

	function hideLoadingDialog() {
		if ($('#jg-overlay').length > 1) {
			$('#jg-overlay').hide();
		}
	}

/*
		Start : 04 Nov 2017
		Task  : Hide check box in line item grid in order page
		Page  : Global
		File Location : $BASE_PATH$/image/javascript/js-ezrx.js
		Layout : Desktop
*/
function desktop_checkItemOnCart() {

		$('#edit_shopping_cart').on('click', function () {
				if ($('#line-item-grid tr').length > 0) {
						$('#line-item-grid tr:first-child').find('input[name="_line_item_list"]').prop("checked", true);
				}
		});

}
	
	// window.isGlobalCountry = ( window.check_country("TH") || window.check_country("MY") || window.check_country("VN") || window.check_country("CB") || window.check_country("MDI") );
	var checkGlobalCountry = function(){
		var globalTemplateFlag = false;
		if( $("span[id*='globalTemplateFlag']").length > 0 ){
				globalTemplateFlag = ($("span[id*='globalTemplateFlag']").html().toLowerCase() == 'true')? true : false;
		}
		return globalTemplateFlag;
	}

	window.isGlobalCountry = checkGlobalCountry();

	function getQueryVariableUrl(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) { return pair[1]; }
		}
		return (false);
	}

	var redColor = "rgb(255, 0, 0)";
	var blackColor = "rgb(0, 0, 0)";
	var userSalesOrg_t = (($("#userSalesOrg_t").length == 0) ? false : true);
	var userSalesOrg_PL = (($('input[name="userSalesOrg_PL"]').length == 0) ? false : true);

	var sg_nationalty = false;
	if (!userSalesOrg_t && !userSalesOrg_PL) {
		//if it's from SG check validy true
		sg_nationalty = true;
	} else {
		sg_nationalty = check_nationality(2600)
	}

	function applyOrderPageChanges(){
		setTimeout(function(){
			if($('#jg-overlay').css("display") == "none"){
				 var exitingDataItems = $("#line-item-grid").attr('data-properties');
				 var linesObj = JSON.parse(exitingDataItems);
				 var noOfLines  = parseInt(linesObj.numRows);
				if(noOfLines > 0){
					$("button:contains('Add Material')").hide();
				}else{
					$("button:contains('Add Material')").show();
				}
				
			}else{
				//recursive checking table has load data
				applyOrderPageChanges();
			}
			
		}, 1000);
	}
	function applyTableChanges(){
		setTimeout(function(){
			if($('#jg-overlay').css("display") == "none"){
				alignMatArraySet();
				
			}else{
				//recursive checking table has load data
				applyTableChanges();
			}
			
		}, 1000);
    }
	var alignMatArraySet = function(){
		setTimeout(function() {
			//$(".array-index").hide();//hide index column in the arrayset
				
			
			/*$("#materialArrayset [class*=array-attribute]").each(function(){//enable all columns in the arrayset
				$(this).removeClass("hidden");
			});*/
			/*var colSpan = -3;
			$("#materialArrayset table.config-array thead tr:first th:visible").each(function(){
				colSpan = colSpan + 1
			});*/
			 /*console.log("window.matchMedia((orientation: portrait)).matches" + window.matchMedia("(orientation: landscape)").matches)
			 $("#attribute-type").removeClass("hidden");//added by Suresh
			 $(".cell-type").removeClass("hidden");//added by Suresh
			 $("#attribute-material").removeClass("hidden");//added by Suresh
			 $(".cell-material").removeClass("hidden");//added by Suresh
			 
			if (window.matchMedia("(orientation: portrait)").matches) {
				var isSecondPage = $("#attribute-promotion").hasClass("hidden");
				var isThirdPage = $("#attribute-addAdditionalMaterial").hasClass("hidden");
				 console.log(" portrait "+ isSecondPage +"=="+ isThirdPage);
				if(isSecondPage && isThirdPage){												
					$("#attribute-price").removeClass("hidden");//added by Suresh
					$(".cell-price").removeClass("hidden");//added by Suresh
					$("#attribute-overridePrice").removeClass("hidden");//added by Suresh
					$(".cell-overridePrice").removeClass("hidden");//added by Suresh
					$("#attribute-totalPrice").removeClass("hidden");//added by Suresh
					$(".cell-totalPrice").removeClass("hidden");//added by Suresh				
				}else{
					$("#attribute-price").addClass("hidden");//added by Suresh
					$("#attribute-price").addClass("hidden");//added by Suresh
					$(".cell-price").addClass("hidden");//added by Suresh
					$("#attribute-overridePrice").addClass("hidden");//added by Suresh
					$(".cell-overridePrice").addClass("hidden");//added by Suresh
					$("#attribute-totalPrice").addClass("hidden");//added by Suresh
					$(".cell-totalPrice").addClass("hidden");//added by Suresh				
				}
				
			}
			if (window.matchMedia("(orientation: landscape)").matches) {
					console.log(" landscape "+ isSecondPage);
					var isSecondPage = $("#attribute-promotion").hasClass("hidden");
					if(isSecondPage){	
						$("#attribute-totalPrice").removeClass("hidden");//added by Suresh
						$(".cell-totalPrice").removeClass("hidden");//added by Suresh			
					}else{
						$("#attribute-totalPrice").addClass("hidden");//added by Suresh
						$(".cell-totalPrice").addClass("hidden");//added by Suresh				
					}
			}
			*/
			
			var errorMsgTdColSpan = $("#materialArrayset table.config-array thead").find("tr:first th").length;
			if($("#showDetailedView").val() == "false" ){
				$(".cell-type").hide();
				$("#attribute-type").hide();
				$("#attribute-material").hide();			
				$("#attribute-materialDescription").hide();
				$(".cell-material").hide();
				$(".cell-materialDescription").hide();
				$(".config-array td, .config-array th ,.config-array td  .ui-controlgroup-controls .read-only .form-field, .rec-item-table.sidebar-table td, .rec-item-table.sidebar-table th").css("font-size","0.70rem");
				$(".config-array tr.messages.constrained td ul li h3").css("line-height","5px");	
				$(".config-array tr.messages.constrained td ul li h3").css("font-size","0.70rem");	
				//$("#materialArrayset .ui-flipswitch").css({"width":"4.875em"});	
				
				$("#materialArrayset .ui-flipswitch a").css("font-size","0.60rem");	
				$("#materialArrayset  .ui-flipswitch span").css("font-size","0.60rem");	
				$("input[name='qty_text']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='additionalMaterialQty']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='overridePrice']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='comments']").css({"text-align": "center", "font-size":"14px"});
				$("#attribute-overrideBonusQty div:contains('Override Bonus Qty')").html("Overr. Bonus Qty");
				$(".config-array .attr-right-arrow").hide();
				$("#materialArrayset [class*=array-attribute]").each(function(){//enable all columns in the arrayset
					$(this).removeClass("hidden");
				});

				
				$("#attribute-promotion").hide();
				$(".cell-promotion").hide();
				$("#attribute-contractBonus").hide();
				$(".cell-contractBonus").hide();
				$("#attribute-comments").hide();
				$(".cell-comments").hide();
				$("#attribute-stockQty").hide();
				$(".cell-stockQty").hide();	


				$(".config-array .array-index").css("width", "2px");
				
				//$(".config-array #attribute-type").css("width", "50px");
				//$(".config-array #attribute-materialDescription").css("width", "300px");
				// $(".config-array #attribute-materialAndDesc").css("width", "120px");
				// $(".config-array #attribute-inStock").css("width", "40px");
				$(".config-array #attribute-price").css("width", "40px");
				
				/*$(".config-array #attribute-materialAndDesc").css("width", "200px");
				$(".config-array #attribute-overridePrice").css("width", "70px");
				
				//$(".config-array #attribute-comments").css("width", "100px");
				$(".config-array #attribute-qty_text").css("width", "70px");
				$(".config-array #attribute-price").css("width", "70px");
				$(".config-array #attribute-totalPrice").css("width", "70px");
				//$(".config-array #attribute-stockQty").css("width", "70px");
				$(".config-array #attribute-inStock").css("width", "70px");
				$(".config-array #attribute-addAdditionalMaterial").css("width", "100px");
				*/
				errorMsgTdColSpan = errorMsgTdColSpan - 6;
				//$("#materialArrayset tr.messages.constrained td").attr("colspan",errorMsgTdColSpan);
				/*$(".config-array .array-index").css("width", "initial");
				$(".config-array #attribute-materialAndDesc").css("width", "initial");
				$(".config-array #attribute-qty_text").css("width", "initial");
				$(".config-array #attribute-price").css("width", "initial");
				$(".config-array #attribute-overridePrice").css("width", "initial");
				$(".config-array #attribute-totalPrice").css("width", "initial");
				$(".config-array #attribute-promotion").css("width", "initial");
				$(".config-array #attribute-contractBonus").css("width", "initial");
				$(".config-array #attribute-inStock").css("width", "initial");
				$(".config-array #attribute-comments").css("width", "initial");
				$(".config-array #attribute-stockQty").css("width", "initial");
				$(".config-array #attribute-addAdditionalMaterial").css("width", "initial");
				*/

				setTimeout(function(){
					console.info("remove class hidden for view detail = no");
					$("#attribute-addAdditionalMaterial").removeClass("hidden");
					$(".cell-addAdditionalMaterial").removeClass("hidden");
				}, 2000);

				if(check_nationality(2800)){
					$("#attribute-pPAApprovalNo").addClass("hidden");
					$(".cell-pPAApprovalNo").addClass("hidden");

					$("#attribute-addAdditionalMaterial").addClass("hidden");
					$(".cell-addAdditionalMaterial").addClass("hidden");

					$("#attribute-invoicePrice").css("width", "75px");

					if( $("#attribute-overrideBonusQty").length > 0 && ($("#attribute-overrideBonusQty").hasClass("hidden") === false) )
					{
						$("#attribute-totalPrice_currency").css("width", "51px");
						$("#attribute-overridePrice_currency").css("width", "60px");
						$("#attribute-overrideInvoicePrice").css("width", "60px");
						$("#attribute-overrideBonusQty").css("width", "65px");
					}

				}

			}else{
				/* 
					Created By    :- Created By Zainal Arifin, Date : 26 March 2018
					Task          :- SG-02 Show Material Desc next to Contract Bonus – After Swipe section
					Page          :- Model Configuration
					File Location :- $BASE_PATH$/javascript/js-tablet.js
					Layout        :- Tablet
				*/

				/* if (sg_nationalty) {

					if ($("#attribute-inStock").hasClass("hidden")){					
						$("#attribute-promotion").addClass("hidden");
						$(".cell-promotion").addClass("hidden");
					}else{
						$("#attribute-promotion").removeClass("hidden");
						$(".cell-promotion").removeClass("hidden");
					}

					$(".config-array #attribute-materialDescription").css("width", "200px");
					$("#attribute-materialDescription").removeClass("hidden");
					if($("#attribute-material").hasClass("hidden") === false){
						$("#attribute-materialDescription").insertAfter($("#attribute-material"));
						$(".cell-materialDescription").map(function (index, data) {
						var id = $(data).attr("id").replace("cell-materialDescription-", "");
						$("#cell-materialDescription-" + id).insertAfter($("#cell-material-" + id));
						});
					}else if($("#attribute-addToFav").hasClass("hidden") === false){
						$("#attribute-materialDescription").insertBefore($("#attribute-addToFav"));
						$(".cell-materialDescription").map(function (index, data) {
						var id = $(data).attr("id").replace("cell-materialDescription-", "");
						$("#cell-materialDescription-" + id).insertBefore($("#cell-addToFav-" + id));
						});
					}
					$(".cell-materialDescription").removeClass("hidden");
					
				} */

				/* 
					Created By    :- Created By Zainal Arifin, Date : 26 March 2018
					Task          :- SG-02 Show Material Desc next to Contract Bonus – After Swipe section
					Page          :- Model Configuration
					File Location :- $BASE_PATH$/javascript/js-tablet.js
					Layout        :- Tablet
				*/

				$("input[name='qty_text']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='additionalMaterialQty']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='overridePrice']").css({"text-align": "center", "font-size":"14px"});
				$("input[name='comments']").css({"text-align": "center", "font-size":"14px"});
				/*if($("#attribute-material").hasClass("hidden")){
					$("#attribute-material").removeClass("hidden");			
					$(".cell-material").removeClass("hidden");	
				}*/

				//$(".config-array .attr-right-arrow").show();
				errorMsgTdColSpan = errorMsgTdColSpan - 2;
							//width adjustment
				/*$(".config-array .array-index").css("width", "2px");
				$(".config-array #attribute-materialDescription").css("width", "10px");
				$(".config-array #attribute-materialAndDesc").css("width", "70px");
				$(".config-array #attribute-qty_text").css("width", "35px");
				$(".config-array #attribute-price").css("width", "40px");
				$(".config-array #attribute-overridePrice").css("width", "40px");
				$(".config-array #attribute-totalPrice").css("width", "40px");
				$(".config-array #attribute-promotion").css("width", "30px");
				$(".config-array #attribute-contractBonus").css("width", "30px");
				$(".config-array #attribute-inStock").css("width", "30px");
				$(".config-array #attribute-comments").css("width", "30px");
				$(".config-array #attribute-stockQty").css("width", "30px");
				$(".config-array #attribute-addAdditionalMaterial").css("width", "40px");
				*/

				//SHOWING MATERIAL DESCRIPTION ON SECOND PAGE
				// console.log("Showing Material Description on second page");
				// if( $("#attribute-addToFav").is(":hidden") == false ){
				
				// 	$("#attribute-materialDescription").removeClass("hidden");
				// 	$(".cell-materialDescription").map(function (index, data) {
				// 		var id = $(data).attr("id").replace("cell-materialDescription-", "");
				// 		$("#cell-materialDescription-" + id).removeClass("hidden");
				// 	});
					
				// }

				
			}
		

			//$("#materialArrayset").prepend("<span>"+$(document).width()+"===="+$(window).width()+"</span>");
			//$("#materialArrayset").prepend("&nbsp;<span>"+$(document).height()+"===="+$(window).height()+"</span>");
			//$("#materialArrayset").prepend("<span>"+colSpan+"</span>");
			
			
			
			//$("#materialArrayset").css("width",($(document).width()-50)+"px");
			//$("#materialArrayset").css("width","100%");
			//$("#materialArrayset table").css("width","100%");
			/*$("#materialArrayset").css("width","auto");
			$("#materialArrayset table").css("width","auto");*/
			
		
		},1000);
	};

	var reArrangeViewColumn = function(page){
		// var isSecondPage = $("#attribute-promotion").hasClass("hidden");
		// var isThirdPage = $("#attribute-addAdditionalMaterial").hasClass("hidden");
		//  console.log(" portrait "+ isSecondPage +"=="+ isThirdPage);

		// console.log(` SHOWING DETAIL IS ${ $("#showDetailedView").val().toLowerCase() } ON PAGE ${ page } `);
		// if(page == 2){
		// 	// moveDescriptionBeforeAddToFav
		// }
		/* $("#materialArrayset").bind("DOMSubtreeModified", function() {
			$("#materialArrayset .array-attribute").addClass("hidden");
			$("#materialArrayset .array-attribute-data").addClass("hidden");

			if($("#showDetailedView").val().toLowerCase() == "true" ){
				if(page == 1){
					//showing column TYPE
					$("#attribute-type").removeClass("hidden");
					$(".cell-type").removeClass("hidden");
					//showing column MATERIAL
					$("#attribute-material").removeClass("hidden");
					$(".cell-material").removeClass("hidden");
					//showing column Description
					$("#attribute-materialDescription").removeClass("hidden");
					$(".cell-materialDescription").removeClass("hidden");
					//showing column qty
					$("#attribute-qty").removeClass("hidden");
					$(".cell-qty").removeClass("hidden");
					//showing column unit price
					$("#attribute-price_Currency").removeClass("hidden");
					$(".cell-price_Currency").removeClass("hidden");
				}else if(page == 2){								
					//showing column Description
					$("#attribute-materialDescription").removeClass("hidden");
					$(".cell-materialDescription").removeClass("hidden");
	
					//showing column override unit price
					$("#attribute-overridePrice_currency").removeClass("hidden");
					$(".cell-overridePrice_currency").removeClass("hidden");
					//showing column total price
					$("#attribute-totalPrice_currency").removeClass("hidden");
					$(".cell-totalPrice_currency").removeClass("hidden");
					//showing column contract price
					$("#attribute-promotion").removeClass("hidden");
					$(".cell-promotion").removeClass("hidden");
					//showing column contract bonus
					$("#attribute-contractBonus").removeClass("hidden");
					$(".cell-contractBonus").removeClass("hidden");
					//showing column PPA Approval No
					$("#attribute-pPAApprovalNo").removeClass("hidden");
					$(".cell-pPAApprovalNo").removeClass("hidden");
		
				}else if(page == 3){
					
					//showing column Description
					$("#attribute-materialDescription").removeClass("hidden");
					$(".cell-materialDescription").removeClass("hidden");
					
					//showing column comment
					$("#attribute-comments").removeClass("hidden");
					$(".cell-comments").removeClass("hidden");
					//showing column inStock
					$("#attribute-inStock").removeClass("hidden");
					$(".cell-inStock").removeClass("hidden");
					//showing column addl. bonus
					$("#attribute-addAdditionalMaterial").removeClass("hidden");
					$(".cell-addAdditionalMaterial").removeClass("hidden");
					//showing column add to fav
					$("#attribute-addToFav").removeClass("hidden");
					$(".cell-addToFav").removeClass("hidden");
		
				}
			}else{
				//show detailed view == NO
				
					//showing column material & desc
					$("#attribute-materialAndDesc").removeClass("hidden");
					$(".cell-materialAndDesc").removeClass("hidden");
					//showing column qty
					$("#attribute-qty").removeClass("hidden");
					$(".cell-qty").removeClass("hidden");
					//showing column unity price
					$("#attribute-price_Currency").removeClass("hidden");
					$(".cell-price_Currency").removeClass("hidden");
					//showing column override unit price
					$("#attribute-overridePrice_currency").removeClass("hidden");
					$(".cell-overridePrice_currency").removeClass("hidden");
					//showing column total price
					$("#attribute-totalPrice_currency").removeClass("hidden");
					$(".cell-totalPrice_currency").removeClass("hidden");
					//showing column PPA approval No
					$("#attribute-pPAApprovalNo").removeClass("hidden");
					$(".cell-pPAApprovalNo").removeClass("hidden");
					//showing column inStock
					$("#attribute-inStock").removeClass("hidden");
					$(".cell-inStock").removeClass("hidden");
					//showing column addl. bonus
					$("#attribute-addAdditionalMaterial").removeClass("hidden");
					$(".cell-addAdditionalMaterial").removeClass("hidden");
			}
		}); */

	}

	var moveDescriptionBeforeAddToFav = function(){	
		//move header after contractBonus
		// $("#attribute-materialDescription").css("width", "180px");
		// $("#attribute-materialDescription").insertBefore($("#attribute-overridePrice_currency"));
		// $("#attribute-materialDescription").removeClass("hidden");
		// //move coloumn 
		// $(".cell-materialDescription").map(function (index, data) {
		// 	var id = $(data).attr("id").replace("cell-materialDescription-", "");
		// 	$("#cell-materialDescription-" + id).insertBefore($("#cell-overridePrice_currency-" + id));
		// 	$("#cell-materialDescription-" + id).removeClass("hidden");
		// });

		// $("#attribute-promotion").addClass("hidden");
		// $(".cell-promotion").addClass("hidden");

	}

	var alignAddtnlArraySet = function(){
		setTimeout(function() {
			 $("#additionalMaterialArrayset [class*=array-attribute]").each(function(){//enable all columns in the arrayset
					$(this).removeClass("hidden");
			});
			var errorMsgTdColSpan = $("#additionalMaterialArrayset table tbody").find("tr:first td").length;
			$("#additionalMaterialArrayset tr.messages.constrained td").attr("colspan",errorMsgTdColSpan);
			$(".config-array .array-index").css("width", "2px");
		},500);
	};
	var showDetailedView = function(){
		setTimeout(function() {
			
			if($("#showDetailedView").val() == "true"){
				/*$("#attribute-promotion").show();
				$(".cell-promotion").show();
				$("#attribute-contractBonus").show();
				$(".cell-contractBonus").show();
				$("#attribute-comments").show();
				$(".cell-comments").show();
				$("#attribute-stockQty").show();
				$(".cell-stockQty").show();								
				*/
				
				console.log("Showing Material Description on second page");
				// if( $("#attribute-addToFav").is(":hidden") == false ){
				
				// 	$("#attribute-materialDescription").removeClass("hidden");
				// 	$(".cell-materialDescription").map(function (index, data) {
				// 		var id = $(data).attr("id").replace("cell-materialDescription-", "");
				// 		$("#cell-materialDescription-" + id).removeClass("hidden");
				// 	});

				// }

			}else{
				/*$("#attribute-promotion").hide();
				$(".cell-promotion").hide();
				$("#attribute-contractBonus").hide();
				$(".cell-contractBonus").hide();
				$("#attribute-comments").hide();
				$(".cell-comments").hide();
				$("#attribute-stockQty").hide();
				$(".cell-stockQty").hide();		
				*/
			}
			
		},500);
	};
	 setTimeout(function() {
		  if( navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
             || navigator.userAgent.match(/Windows Phone/i)
             ){

				var disableScrollUp = function(){
					setTimeout(function(){
						
						if(isLoadingDone()){
							// try to remove auto scroll up, Zainal Arifin 13 May 2018
							if( $("#commerce.ui-page.ui-page-theme-a.ui-page-header-fixed.ui-page-footer-fixed.ui-page-active").length > 0 ){
								$("#commerce.ui-page.ui-page-theme-a.ui-page-header-fixed.ui-page-footer-fixed.ui-page-active").off();
							}
							// try to remove auto scroll up, Zainal Arifin 13 May 2018
						}else{
							disableScrollUp();
						}

					}, 500)
				}

				disableScrollUp();				

				 var pageTitle = "";
				 if($("#materialArrayset").length > 0){
					 pageTitle = "model configuration";
				 }
				 if($("#line-item-grid").length > 0){
					 pageTitle = "order page";

				 }
				 
				 if(pageTitle == "model configuration"){
						 console.log("js-tablet model configuration ====>>>> ");						 
						 var isPageError = false;						
					    
						setTimeout(function() {
							 if($("#config").hasClass("constrained")){
								isPageError = true;
							}
							$('#attribute-materialDescription').attr("style","text-align: center; width: 250px;");
							$("#attribute-enableOldMaterialSearch").hide();
							console.log("======1213===="+isPageError);
							//if($("#button-bar .button-update").length == 0){//#config.constrained #error-messages .constraint-messages	
							if(isPageError){						
								if( $("#duplicatefooter").length == 0){
									$( "#config footer" ).append( "<div id='duplicatefooter'><button class='updateButton ui-btn ui-btn-inline'>Update</button><button class='cancelButton ui-btn ui-btn-inline'>Cancel</button><button id='showFavdetails' class='ui-btn ui-btn-inline'>Show Fav Items</button><button id='showMaterialSearch' class='ui-btn ui-btn-inline' style='display:none'>Show Material Search</button></div>" );
									
								}
								if($("#duplicatefooter").length > 0){
									$("#button-bar").hide();
								}
								$("#button-bar #more-btns").hide();
								
							}else{
								$( "#config footer" ).append( "<div id='duplicatefooter'><button id='showFavdetails' class='ui-btn ui-btn-inline'>Show Fav Items</button><button id='showMaterialSearch' class='ui-btn ui-btn-inline' style='display:none'>Show Material Search</button></div>" );
								$("#button-bar #more-btns").hide();
							}
						},500);
						$("body").on("click touchend","#duplicatefooter .updateButton",function(e){		
							//console.log("clicked on custom create transaction");
							e.preventDefault();			
							console.log("clicked on custom update");	
							if($("#popup-moreBtns-popup .button-update").length > 0){
								$("#popup-moreBtns-popup .button-update").trigger('tap');
							}
							if($("#button-bar .button-update").length > 0){
								$("#button-bar .button-update").trigger('tap');
								$("#button-bar .button-update").trigger('click');
							}

						});
						$("body").on("click touchend",".array-remove",function(e){	
							setTimeout(function() {
								$("#config-form").submit();
							},2000);
						});

					 /* 
								 Created By    :- Created By Zainal Arifin, Date : 27 March 2018
								 Task          :- Hide button bar if slide shown up
								 Page          :- Global
								 File Location :- $BASE_PATH$/javascript/js-tablet.js
								 Layout        :- Desktop
							 */

					 var hideAndShowBtnBottom = function () {
						 setTimeout(function () {
							 var isSliderShow = $("#swipe-sidebar").hasClass("sidebar-state-1");
							 if (!isSliderShow) {
								 $("#button-bar").slideDown();
								 $("#swipe-sidebar").css("height", "auto");
								 $("#swipe-sidebar-header").css("text-shadow", "none");
							 } else {
								 $("#button-bar").slideUp();
								 $("#swipe-sidebar").css("height", "calc( 100% - 54px )");
							 }
						 }, 500);
					 }

					/* 
						Created By    :- Created By Zainal Arifin, Date : 27 March 2018
						Task          :- Hide button bar if slide shown up
						Page          :- Global
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Desktop
					*/
						
						$("body").on("click touchend","#showFavdetails",function(e){
									e.preventDefault();		
									$("#swipe-sidebar-content").css("display", "block");									
									$(".sidebar-handle-icon").trigger("swipeleft");
						});
						$("body").on("click touchend","#showMaterialSearch",function(e){
									e.preventDefault();								
									$(".sidebar-handle-icon").trigger("swiperight");
						});
						$("body").on("click tochend swipeleft swiperight","#swipe-sidebar",function(e){
								if($(this).hasClass("sidebar-state-1")){
									$("#showFavdetails").hide();
									$("#showMaterialSearch").show();
									//$("#attribute-currentCustFav").addClass("myFavMobile");
									$('#attribute-currentCustFav').attr('style', 'height: 400px !important');
								}else{
									$("#showFavdetails").show();
									$("#showMaterialSearch").hide();
								}
								hideAndShowBtnBottom();
						});
						$("body").on("click touchend","#duplicatefooter .cancelButton",function(e){
						
									//console.log("clicked on custom create transaction");
									e.preventDefault();
									 if($('div#popup-moreBtns ul.popup-list li a.button-invoke-return').length > 0){
										  $("#popup-moreBtns-popup .button-invoke-return").trigger('tap');
										
									 }else{
										 console.log("clicked on custom button-cancel");
										 $("#popup-moreBtns-popup .button-cancel").trigger('tap');
									 }
									
									
						});

						$("body").on("click touchend","#resultsTable td:nth-child(2)",function(e){
							console.log("material number cliked");
							$(this).parent().find("input").trigger("click");
						});
						/*var datProp = $("#materialArrayset").attr('data-properties');
						var linesObj = JSON.parse(datProp);
						var noOfLines  = parseInt(linesObj.size);
						if(noOfLines > 1){					
							console.log("====noOfLines====="+noOfLines);
							//$("#attribute-materialSearch").parent().parent().parent().find("a:contains('All Materials')").trigger("click");		
							$("#attribute-materialSearch").parent().parent().parent().find("a:contains('All Materials')").trigger("tap");							
						}else{
							$("input[name=material]").each(function(){
								if($(this).val() != ''){
									//$("#attribute-materialSearch").parent().parent().parent().find("a:contains('All Materials')").trigger("click");		
									$("#attribute-materialSearch").parent().parent().parent().find("a:contains('All Materials')").trigger("tap");
									
								}
								
							});
						}
						*/
						 /*$("td.cell-price").each(function(){
							 
							 if($(this).attr("id") != undefined){
								  var rowIndex = $(this).attr("id").split("-")[2];
								  
								  var x = $("#cell-promotion-"+rowIndex).attr('tooltip').trim();							
								 if (x != "") {									  
									$(this).prepend("<span style='float:left;width:20px;top:20'><i class='material-lens' aria-hidden='true'></i></span>");			 
								 }else{
									 $(this).prepend("<span style='float:left;width:20px;top:20'></span>");		
								 }
								 var valueOfPromotion = $("#cell-promotion-"+rowIndex).find('input[name=promotion]').val();
								$(this).attr('tooltip',valueOfPromotion);
						 }).click(function(){
							 if($(this).attr("id") != undefined){
								  var rowIndex = $(this).attr("id").split("-")[2];
								  $("#cell-promotion-"+rowIndex).trigger("tap");
								  $("#cell-promotion-"+rowIndex).trigger("click");
							 }
						 });*/
						 $("body").on("click touchend",".table-tooltip",function(){//close message box on click of message box							 
							 $(".table-tooltip").remove();
						 });
						setTimeout(function() {
							alignMatArraySet();
							showDetailedView();						
							alignAddtnlArraySet();
							reArrangeViewColumn(1);
						},500);
						var currentPage = 1;
						$("body").on("click tochend swipeleft swiperight","#materialArrayset",function(e){
							 console.log("=======+++++=============2");
							//if($("#showDetailedView").val() == "false"){
								 console.log("=======+++++=============3");
								// if($("#showDetailedView").val() == "true" && e.type != "touchend"){
									alignMatArraySet();
									showDetailedView();
								// }

								// if(!$("#attribute-promotion").hasClass("hidden")){
								// 	moveDescriptionBeforeAddToFav();
								// }

								if(e.type == "swipeleft"){
									currentPage++;
									if(currentPage > 2){
										currentPage = 3;
									}
								}else if(e.type == "swiperight"){
									currentPage--;
									if(currentPage < 2){
										currentPage = 1;
									}
								}
								reArrangeViewColumn(currentPage);
							//}
						});
						$("body").on("click touchend",".pagination .ui-radio",function(e){
							applyTableChanges();
						});
						$("body").on("click tochend swipeleft swiperight","#additionalMaterialArrayset .config-array thead",function(e){
							alignAddtnlArraySet();
							
						});
						$( window ).on( "orientationchange", function( event ) {
						 // $( "#orientation" ).text( "This device is in " + event.orientation + " mode!" );
						  console.log("=======+++++=============4");
							//if($("#showDetailedView").val() == "false"){
								console.log("=======+++++=============5");
								//alignMatArraySet();						  
								//showDetailedView();
								applyTableChanges();
							//}
						  alignAddtnlArraySet();
						});
						//$("#materialArrayset").prepend("<div><input id='showDetailedView' name='showDetailedView' type='checkbox' /> <label for='showDetailedView' class='form-label' style='display:inline !important'>Show Detailed View</label></div>")
						
						$("body").on("click touchend change","#showDetailedView",function(e){
							console.log("--------showDetailedView-----------"+e.type+"-----"+$("#showDetailedView").val());
							$("#config-form").submit();
							//alignMatArraySet();
							//showDetailedView();	
							
							
						});

					 	// if (sg_nationalty) {
						// 	moveDescriptionBeforeAddToFav();							
						// }						
						
						// START UPDATE 19-01-2018
						// START SLIDER CONTENT

						$("#swipe-sidebar-content").css("display", "block");

						//$("#swipe-sidebar-content").html("");
						var isPOTableCreated = false;
						var isFavTableCreated = false;
						function reposition_content(){
							// $('#jg-overlay').show();
							var rootBundleValues = $("textarea[name='bundleValues']").closest(".group-content");
							$(rootBundleValues).children().hide();
							setTimeout(function() {
								$("#tab-content").css({"margin-bottom":"30px"});								
								$("#price-section").hide();
								$("#recommended-parts").hide();
								
								/*commented by suresh on 24/11/2018 - my fav section is not showing
									var elementToMove = $(".ui-collapsible-inset");
								
								$(elementToMove[1]).show();		
								*/
								//added by suresh on 24/11/2018
								$( $("#attribute-pastOrders").closest(".ui-collapsible-inset") ).appendTo("#swipe-sidebar-content");

								$("#attribute-pastOrders").closest(".ui-collapsible-inset").show();
								
								if(!isPOTableCreated){
									
									js2("#PastOrders").DataTable({
										"bLengthChange": false,
										"searching": false,
										"bPaginate": false,
										"bInfo": false,
										"fnDrawCallback": function(){
											isPOTableCreated = true;
										}
									});

								}

								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide Recomended Material in SG
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/
								$("#attribute-showPrincipalFavorites").closest(".ui-collapsible-inset").hide();
								// var maxLimitAttemp = 100;
								// var hide_recomended_material = function( elementRecomendMaterial ){
								// 	setTimeout(function(){
								// 		$($( elementRecomendMaterial )).hide();
								// 		console.log( "Recomend Material", $( elementRecomendMaterial ).css("display") );
								// 		if( $( elementRecomendMaterial ).css("display") != "none" || 
								// 				typeof $( elementRecomendMaterial ).css("display") == "undefined" && 
								// 				maxLimitAttemp > 0){											
								// 			maxLimitAttemp--;
								// 			hide_recomended_material( elementRecomendMaterial );
								// 		}
								// 	}, 500);
								// }

								//hide_recomended_material( elementToMove[3] ); commented by suresh on 24/11/2018
								// hide_recomended_material(  );
								

								/* if (check_nationality(2600) || check_nationality(2500)) {
									
								}else{
									$( $(elementToMove[2]) ).appendTo("#swipe-sidebar-content");
								} */
								
								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide Recomended Material in SG
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

								/* 
									Created By    :- Created By Zainal Arifin, Date : 27 March 2018
									Task          :- Add paggination on favorite table
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

								/*commented by suresh on 24/11/2018 - my fav section is not showing
									$(elementToMove[3]).show();
									$( $(elementToMove[3]) ).appendTo("#swipe-sidebar-content");
								*/
								//added by suresh on 24/11/2018
								$( $("#attribute-currentCustFav").closest(".ui-collapsible-inset") ).appendTo("#swipe-sidebar-content");

								$("#attribute-currentCustFav").closest(".ui-collapsible-inset").show();
								
								if(!isFavTableCreated){
									
									js2("#CurrentCustFav").DataTable({
										"bLengthChange": false,
										"searching": false,
										"pageLength": 5,
										"fnDrawCallback": function () {
											isFavTableCreated = true;
										}
									});

								}

								$("#CurrentCustFav").css({"height":"auto"});

								/* 
									Created By    :- Created By Zainal Arifin, Date : 27 March 2018
									Task          :- Add paggination on favorite table
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/
								
								$("#swipe-sidebar-content").find(".ui-collapsible-heading-toggle").each(function(index, data){
									$(data).css({ "background-color": "#afc008","border-radius": "0","color": "#fff", "border-color": "transparent"});
								});
								
								/* 8-03-2018 move button add and delete in My Favourite */
								$("#AddCustFav").closest("span").css({ "width": "100%", "background": "#ffffff" });
								$("#AddCustFav").css({ "margin": "10px", "float": "right" });
								$("#DeleteCustFav").css({ "margin": "10px", "float": "right" });
								var parent = $("#AddCustFav").closest(".ui-collapsible-inset");
								var buttonAddDelete = $("#AddCustFav").closest("span");
								$("#DeleteCustFav").prependTo($(buttonAddDelete));
								$(buttonAddDelete).appendTo($(parent).find(".ui-collapsible-heading"));
								/* 8-03-2018 move button add and delete in My Favourite */
								if ($(parent).hasClass("ui-collapsible-collapsed")) {
									$(buttonAddDelete).hide();
								}
								$("#AddCustFav").closest("span").css("display", "block");
								var buttonHeadingFav = $("#AddCustFav").closest(".ui-collapsible-inset").find(".ui-collapsible-heading-toggle");
								$(buttonHeadingFav).on("click", function () {
									if ($(parent).hasClass("ui-collapsible-collapsed")) {
										$(buttonAddDelete).show();
									} else {
										$(buttonAddDelete).hide();
									}
								});


								$("#swipe-sidebar-content").siblings(".sidebar-handle").show();	
								// END SLIDER CONTENT

								/* 
									Created By    :- Created By Zainal Arifin, Date : 2 April 2018
									Task          :- SG-05 Auto Collapse customer search
									Page          :- Order Page
									File Location :- $BASE_PATH$/javascript/js-ezrx.js
									Layout        :- Desktop
								*/

								/* $("#tab-content").find(".ui-collapsible-heading-toggle").each(function (index, data) {
									$(data).closest(".ui-collapsible-inset").removeClass("ui-collapsible-collapsed");
									$(data).closest(".ui-collapsible-heading").removeClass("ui-collapsible-heading-collapsed");
									var parent = $(data).closest(".ui-collapsible-inset");
									$(parent).find(".ui-collapsible-content").removeClass("ui-collapsible-content-collapsed").attr("aria-hidden", "false");

									if(  $(data).text().indexOf("All Materials") != -1  ){
										var firstRow = $($(".cell-material").find("input[name='material']")[0]).val();
										if(firstRow != ""){
											$(data).closest(".ui-collapsible-inset").addClass("ui-collapsible-collapsed");
											$(data).closest(".ui-collapsible-heading").addClass("ui-collapsible-heading-collapsed");
											var parent = $(data).closest(".ui-collapsible-inset");
											$(parent).find(".ui-collapsible-content").addClass("ui-collapsible-content-collapsed").attr("aria-hidden", "false");
										}
									}

								}); */

								/* 
									Created By    :- Created By Zainal Arifin, Date : 2 April 2018
									Task          :- SG-05 Auto Collapse customer search
									Page          :- Order Page
									File Location :- $BASE_PATH$/javascript/js-ezrx.js
									Layout        :- Desktop
								*/

								//all section will be expand in first time
								//ui-collapsible-collapsed
								$(".ui-collapsible").removeClass("ui-collapsible-collapsed");
								$(".ui-collapsible .ui-collapsible-heading").removeClass("ui-collapsible-heading-collapsed");
								$(".ui-collapsible .ui-collapsible-heading-toggle").removeClass("ui-icon-plus").addClass("ui-icon-minus");
								$(".ui-collapsible .ui-collapsible-content").removeClass("ui-collapsible-content-collapsed").attr("aria-hidden", "false");
								$(".ui-collapsible input[name*='collapsed-group']").val("false");

								//controlling collapse for materialsearch
								var isUserUpdateShoppingCart = window.localStorage.getItem("isUserUpdateShoppingCart");
								if( isUserUpdateShoppingCart != "false" ){
									$("#attribute-materialSearch").closest(".ui-collapsible").addClass("ui-collapsible-collapsed");
									$("#attribute-materialSearch").closest(".ui-collapsible").find(".ui-collapsible-heading").addClass("ui-collapsible-heading-collapsed");
									$("#attribute-materialSearch").closest(".ui-collapsible").find(".ui-collapsible-heading-toggle").addClass("ui-icon-plus").removeClass("ui-icon-minus");
									$("#attribute-materialSearch").closest(".ui-collapsible").find(".ui-collapsible-content").addClass("ui-collapsible-content-collapsed").attr("aria-hidden", "true");
									$("#attribute-materialSearch").closest(".ui-collapsible").find("input[name*='collapsed-group']").val("true");
								}

								/* 
									Created By    :- Created By Zainal Arifin, Date : 2 January 2019
									Task          :- CPQ-UI-092 | Disable the "Qty" field for material Type = Bonus if "Override Bonus Qty" field is hidden for the material
									Page          :- Model Configuration
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Mobile
								*/

								if( window.isGlobalCountry )
								{
									if($(".cell-overrideBonusQty").length == 0){
										
										var listMaterial = $("#materialArrayset").find("tbody > tr");
										for( var i = 0; i < listMaterial.length; i++ ){
											if( $(listMaterial[i]).hasClass("array-attribute-row") ){
												// console.log(listMaterial[i]);
												var typeMaterial = $( listMaterial[i] ).find("input[name='materialAndDesc']").val().toLowerCase();
												typeMaterial = typeMaterial.split("-");
												typeMaterial = typeMaterial[0];
												if( typeMaterial == "bonus"){
													$(listMaterial[i]).find("input[name='qty']")
															.prop("disabled", true)
															.css({"border": "0px","background": "transparent"})
															.parent()
															.css({"border": "0px","background": "transparent"});
												}	
											}
										}
										
									}
								}

								/* 
									Created By    :- Created By Zainal Arifin, Date : 2 January 2019
									Task          :- CPQ-UI-092 | Disable the "Qty" field for material Type = Bonus if "Override Bonus Qty" field is hidden for the material
									Page          :- Model Configuration
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Mobile
								*/

								/* 
									Zainal 08 July 2019
									Table Bundle
								*/
								
								var addBundleAction = function(){
									showLoadingDialog();
									var valueAddBundle = $("select[name='addBundleFlag']").val();
									var rootBundleValues = $("textarea[name='bundleValues']").closest(".group-content");
									$(rootBundleValues).children().hide();
									if(valueAddBundle == "true"){
										//material search
										$("#attribute-materialSearch").closest("fieldset").hide();
										//fav freq material
										$("#showFavdetails").hide();
										$(".sidebar-handle").hide();
							
										var bundleValues = $("textarea[name='bundleValues']").val();
										// var bundleValues = "Junivia1$$12/03/2022##Junivia2$$12/03/2023##Junivia2$$12/03/2032##";
										$(rootBundleValues).prepend($("<table id='table_bundle' class='config-array array-resizable show_after' style='width: 100%;text-align:center;margin: 0px auto;' ><thead><tr><th style='padding: 10px;width: 5%;' >Select</th><th style='padding: 10px' >Promotion Deal</th><th style='padding: 10px;' >Promotion Expiry Date</th></tr></thead><tbody></tbody></table>"))
										$("#table_bundle").css("text-align", "center");
										$("#table_bundle").find("th").css("text-align", "center");
										// if( $("input[name='selectedBundle']").val().length > 0 ){
										// 	window.sessionStorage.setItem("selectBundle", $("input[name='selectedBundle']").val() );
										// }
										bundleValues.split("##").forEach(function(data){
											if(data.length > 0){
												var rowValues = data.split("$$");
												var selectedBundle = ($("input[name='selectedBundle']").val() === rowValues[0])? "checked" : "";
												$("#table_bundle").find("tbody").append("<tr><td><input type='radio' name='selectBundle' value='"+rowValues[0]+"' "+selectedBundle+"  ></td><td>"+rowValues[0]+"</td><td>"+rowValues[1]+"</td></tr>");
												$("input[name='selectBundle']").on("click", function(){
													// window.sessionStorage.setItem("selectBundle", $(this).val());
													$("input[name='selectedBundle']").val($(this).val());
													var prevBundle = window.sessionStorage.getItem("selectBundle");
													var currentBundle = $(this).val();
													if(prevBundle != currentBundle){
														window.sessionStorage.setItem("selectBundle",currentBundle);
														var noOfRows = parseInt($("input[name='materialArraySize']").val());
														for(var row = 0; row < noOfRows; row++){
															$("#qty-"+row).val("0");
														}
													}
													$(".button-update, .updateButton").click();
												});
												return rowValues;
											}
										});
							
										$(".array-remove").hide();
										$("input[name='overridePrice_currency-display']").attr("disabled", true).css({"background" : "transparent", "border": "0px"});
										
										js2("#table_bundle").DataTable({
											"searching": false,
											"ordering": false,
											"pageLength": 5,
											"lengthChange": false,
										});

										$($($('#table_bundle > thead')[0]).find('th')[0]).css('width', '50px');
										$($($('#table_bundle > thead')[0]).find('th')[1]).css('width', '400px');
										$($($('#table_bundle > thead')[0]).find('th')[2]).css('width', '100px');

									}
								}

								setTimeout(addBundleAction, 2000);
								hideLoadingDialog();
								
								/* 
									Zainal 08 July 2019
									Table Bundle
								*/

								
								
								if ($("#swipe-sidebar-content").children(":not('.sidebar-content-inner')").length == 0){
									reposition_content();
								}
							}, 1000);
						}
						
						reposition_content();

						// Zainal Arifin : 26-11-2018
						// Move description for Search Material
						
						setTimeout(function(){
							var parent = $("#attribute-materialSearch")
										.closest(".ui-collapsible-inset");

							var labelFieldSearchMaterial = $( parent ).find(".ui-collapsible-heading > a");
							console.log(labelFieldSearchMaterial);
							var textSearchMaterial = $(labelFieldSearchMaterial)
																.text()
																.replace("click to collapse contents", "")
																.split(" - ");

							$( labelFieldSearchMaterial ).html( $( labelFieldSearchMaterial ).html().replace( " - " + textSearchMaterial[1].replace(/&/g, '&amp;').trim(), "") );
							var bodySearchMaterial = $( parent ).find(".ui-collapsible-content");
							$( bodySearchMaterial ).prepend("<div style='background-color: #ffff2d9e; padding:10px;' >" + textSearchMaterial[1] +"</div>");
						}, 3000);

						//set align center for text input in coloumn QTY
						$("input[name='qty_text']").css({"text-align": "center", "font-size":"14px"});
						$("input[name='additionalMaterialQty']").css({"text-align": "center", "font-size":"14px"});
						$("input[name='overridePrice']").css({"text-align": "center", "font-size":"14px"});

						// Make all table header is center
						//var stylingHeaderTable = "text-align:center;font-weight:900;font-size:14px!important;";
						var stylingHeaderTable = "text-align:center;";

						$(".array-attribute").attr( "style", stylingHeaderTable );

						//$("#materialArrayset > .ui-flipswitch").attr("style", "font-size:15px !important;");
						
						// END UPDATE 19-01-2018

					 /* 
						Created By    :- Created By Zainal Arifin, Date : 15 March 2018
						Task          :- highlight on QTY material in additional bonus for SG
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Desktop
					*/

					if (sg_nationalty) {
						var listEditedField = {};

						var listenQtyAdditionalBonus = function () {
							setTimeout(function () {
								if (isLoadingDone()) {
									/* $("input[name='additionalMaterialQty']:not(input[type='hidden'])").map(function (index, data) {
										if ($(data).length > 0) {
											var id = $(data).attr("id").replace("additionalMaterialQty", "");
											if ($(data).val() != 0) {
												$("#additionalMaterialQty" + id).css("color", redColor);
											}
										}
									}); */

									$("input[name='additionalMaterialQty']").on("click focus starttouch", function () {

										var id = $(this).attr("id").replace("additionalMaterialQty", "");
										if (!listEditedField.hasOwnProperty(id)) {
											listEditedField[id] = { before: $(this).val(), after: 0 };
										}

										if ($(this).val() != 0) {
											$("#additionalMaterialQty" + id).css("color", redColor);
										}

									});

									$("input[name='additionalMaterialQty']").on("keyup blur change", function () {

										var id = $(this).attr("id").replace("additionalMaterialQty", "");
										listEditedField[id]["after"] = $(this).val();

										var isShowMessage = false;
										$.each(listEditedField, function (index, data) {
											if (!isShowMessage) {
												if (data.before != data.after) {
													$("#additionalMaterialQty" + index).css("color", redColor);
												}
											}
										});

										if (listEditedField[id]["after"] == 0) {
											$("#additionalMaterialQty" + id).css("color", blackColor);
										}

									});
								} else {
									listenQtyAdditionalBonus();
								}
							}, 500);
						}

						listenQtyAdditionalBonus();
					}

					/* 
						Created By    :- Created By Zainal Arifin, Date : 15 March 2018
						Task          :- highlight on QTY material in additional bonus for SG
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Tablet
					*/

					/* 
						Created By    :- Created By Zainal Arifin, Date : 21 March 2018
						Task          :- highlight on Override Price on Mobile Device
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Tablet
					*/

					function setListenOverridePrice(){
						setTimeout(function(){
							if (isLoadingDone()){
								$("input[name='overridePrice']").on("click focus", function () {

									$(this).css("color", redColor);

								});

								$("input[name='overridePrice']").on("blur", function () {

									if ($(this).val() == "0.0") {
										$(this).css("color", blackColor);
									}

								});
							}else{
								setListenOverridePrice();
							}
						}, 1000)
					}

					 setListenOverridePrice();

					 /* 
						Created By    :- Created By Zainal Arifin, Date : 21 March 2018
						Task          :- highlight on Override Price on Mobile Device
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Desktop
					*/
					
					/* 
						Created By    :- Created By Zainal Arifin, Date : 31 March 2018
						Task          :- SG-20 after adding materials focus should go to shopping cart table in shopping cart page
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Desktop
					*/

					 function scrollWindowToShoppingCart(){
						setTimeout(function(){
							if (isLoadingDone()){
								var isScrollToShoppingCart = window.localStorage.getItem("scrollToShoppingCart");
								console.log("status isScrollToShoppingCart : ", isScrollToShoppingCart);
								if (isScrollToShoppingCart == "true") {
									window.localStorage.setItem("scrollToShoppingCart", "false");
									console.log("status isScrollToShoppingCart : ", window.localStorage.getItem("scrollToShoppingCart"));
									$('html, body').animate({
										scrollTop: $("#materialArrayset").offset().top
									}, 1000);
								}
							}else{
								scrollWindowToShoppingCart();
							}
						},1000);
					 }

					 scrollWindowToShoppingCart();

					/* 
						Created By    :- Created By Zainal Arifin, Date : 31 March 2018
						Task          :- SG-20 after adding materials focus should go to shopping cart table in shopping cart page
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Desktop
					*/

					
					 /* 
					 	Created By    :- Created By Zainal Arifin
						Task          :- SG-16 Alignment of my fav section is distorted in shopping cart. Please check screen shot
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Tablet
					 */
					/* function reStylingTableShoppingCart(){
						setTimeout(function(){
							if(isLoadingDone()){ */

								/* 
									Created By    :- Created By Zainal Arifin, Date : 31 March 2018
									Task          :- restyling table shopping cart in mobile
									Page          :- Model Configuration
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

								/* function styleShoppingTableLandscape()
								{
									console.log("Style Shopping Table Landscape");
									$("#attribute-qty").css({ "width": "5%" });									
									$("#attribute-overrideBonusQty").css({ "width": "10%" });
									$("#attribute-price_Currency").css({ "width": "9%" });									
									$("#attribute-overridePrice_currency").css({ "width": "10%" });
									$("#attribute-inStock").css({ "width": "8%" });																

								}

								function styleShoppingTablePotrait(){
									console.log("Style Shopping Table Potrait");									
									$("#attribute-materialAndDesc").css({ "width": "auto" });
									$("#attribute-qty").css({ "width": "10%" });
									$("#attribute-overridePrice_currency").css({ "width": "15%" });
									$("#attribute-price_Currency").css({ "width": "11%" });
									$("#attribute-totalPrice_currency").css({ "width": "10%" });
									$("#attribute-inStock").css({ "width": "10%" });
									$("#attribute-addAdditionalMaterial").css({ "width": "10%" });
								}

								function doOnOrientationChange() {
									setTimeout(function(){
										console.log("WINDOW ORIENTATION",window.orientation);
										switch (window.orientation) {
											case -90:
											case 90:
												// setTimeout(function () {
													styleShoppingTableLandscape();
												// }, 1500);
												break;
											default:
												// setTimeout(function () {
													styleShoppingTablePotrait();
												// }, 1500);
												break;
										}
									},1500)
								} */

								// window.addEventListener('orientationchange', doOnOrientationChange);

								// // Initial execution if needed
								// doOnOrientationChange();

								/* 
									Created By    :- Created By Zainal Arifin, Date : 31 March 2018
									Task          :- restyling table shopping cart in mobile
									Page          :- Model Configuration
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

							/* 		}else{
								reStylingTableShoppingCart();
							}
						}, 1000);
					} */
					
					/* if(!check_nationality(2800)){
						reStylingTableShoppingCart();
					}	 */

					/* 
					 	Created By    :- Created By Zainal Arifin
						Task          :- SG-16 Alignment of my fav section is distorted in shopping cart. Please check screen shot
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Tablet
					 */
					
					 /* Reset State */
					if(check_nationality(2600)){
						var trans_id = $("input[name='orderNumber_ML']").val().replace(" ", "");
						$(".button-save, .button-cancel").on("click", function(){
							window.localStorage.setItem("orderItem_" + trans_id, true);							
						});
					}
				   /* Reset State */

				   //Zainal 27-11-2018
				   //CPQ-UI-082 : remove "delete" icon in aditional bonus section

				   $("#additionalMaterialArrayset .array-button").hide();

				   //Zainal 30-11-2018
				   //CPQ-UI-073 : controlling expand Section
				   	$("#button-bar .button-update").on("click touchend", function(){
						window.localStorage.setItem("isUserUpdateShoppingCart", "true");
						console.log("diklik");
					});

					$("#addMaterialBtn").on("click touchend", function(){
						window.localStorage.setItem("isUserUpdateShoppingCart", "true");
					});


				}else if(pageTitle == "order page"){

						/* 
							Created By    :- Created By Zainal Arifin, Date : 17 April 2018
							Task          :- Disable user submit order repeatly
							Page          :- Order Page
							File Location :- $BASE_PATH$/javascript/js-ezrx.js
							Layout        :- Desktop
						*/
						try {
							
							var handleDisableSubmitBtn = function () {
								setTimeout(function () {
									if (isLoadingDone()) {
										
										if( navigator.userAgent.match(/Android/i) ||
										navigator.userAgent.match(/webOS/i) ||
										navigator.userAgent.match(/iPhone/i) ||
										navigator.userAgent.match(/iPad/i) ||
										navigator.userAgent.match(/iPod/i) ||
										navigator.userAgent.match(/BlackBerry/i) ||
										navigator.userAgent.match(/Windows Phone/i) ){
											var successLoading = false;

											$(".action.action-type-modify:contains('Submit Order')").on("click", function (e) {
											$(this).attr("disabled", true);
											
											var text_order_submission = "<p style='font-size: 30px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 0.87;letter-spacing: normal;text-align: center;color: #005e63;' >Order submission is in progress ...</p>";

											var text_please_wait = "<p style='font-size: 22px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.18;letter-spacing: normal;text-align: center;color: #9b9b9b; margin-bottom: 70px;' >Please wait</p>";

											var loading_bar = "<div style='width: 450px;height: 30px;object-fit: contain;border-radius: 15px;background-color: #d2d2d2;border: solid 1px #898989;margin: 20px auto;' ><div id='loading_moving' style='width: 0px;height: 30px;object-fit: contain;border-radius: 15px;background-color: #005e63;' ></div></div>";

											var text_dont_close = "<p style='font-size: 26px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;text-align: center;color: #005e63;' >Do not close the browser or click back button</p>";

											var popup = $("<div style='width: 632px;height: 250px;border-radius: 8px;background-color: #ffffff;margin: 195px auto;padding:50px;' >" + text_order_submission + text_please_wait + loading_bar + text_dont_close + "</div>");
											$(".ui-loader").css({ "background-color": "transparent", "opacity": "1", "display" : "block" });
											$(".ui-loader").find(".ui-icon-loading").css({"-webkit-transform": "rotateX(0)", "-webkit-transform": "translateZ(0)", "-webkit-perspective": "1000", "-webkit-backface-visibility": " hidden"});
											$(".ui-loader").find("h1").after(popup);

											var bgloading = "<div id='bgloading' style='position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: rgb(250, 255, 189);opacity: 0.35;' ></div>";
											$(".ui-loader").append(bgloading);


											var base_loading_progress = 100;

											var loadingProgressBar = function (loading_progress) {
												loading_progress = (loading_progress == 450) ? loading_progress - 20 : loading_progress;
												$("#loading_moving").animate({
													width: loading_progress + "px"
												}, 2000);
											}
											loadingProgressBar(base_loading_progress);
												var loopUntilComplete = function () {
													console.log("LOOP UNTIL COMPLETE", base_loading_progress);
													setTimeout(function () {
														if (base_loading_progress < 380) {
															base_loading_progress += 70;
															loadingProgressBar(base_loading_progress);
															loopUntilComplete();
														}
													}, 1000);
											}
											loopUntilComplete();
										});
										}else{
												
										}
									} else {
										handleDisableSubmitBtn();
									}
								}, 500);
							}
	
							handleDisableSubmitBtn();

						} catch (error) {
							console.log(error);
						}

						if(window.isGlobalCountry){
							$("#commerce").find(".sidebar-handle").hide();
						}

						/* 
							Created By    :- Created By Zainal Arifin, Date : 17 April 2018
							Task          :- Disable user submit order repeatly
							Page          :- Order Page
							File Location :- $BASE_PATH$/javascript/js-ezrx.js
							Layout        :- Desktop
						*/

						window.localStorage.setItem("isUserUpdateShoppingCart", "false");

						var isPageError = false;
						var exitingDataItems = $("#line-item-grid").attr('data-properties');
						var linesObj = JSON.parse(exitingDataItems);
						var noOfLines  = parseInt(linesObj.numRows);
						$("#sticky-actions .more-btns").hide();
						$("#lig-sticky-actions .more-btns").hide();
						$("#sticky-actions .more-btns").attr("executed","yes");
						applyOrderPageChanges();
						if(noOfLines > 0){
							$('#sticky-actions button.action-type-add-from-catalog[data-properties*="43393148"]').hide();
							$('#sticky-actions button.action-type-add-from-catalog[data-properties*="36393235"]').hide();
						}else{
							$('#sticky-actions button.action-type-add-from-catalog[data-properties*="43393148"]').show();
							$('#sticky-actions button.action-type-add-from-catalog[data-properties*="36393235"]').show();
						}
						$('#sticky-actions button.action-type-modify[data-properties*="47805212"]').click(function(e) {
							e.preventDefault();
							var selectedSearchId = '-1';
							var token = $("input[name=token]").val();
							var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id="+selectedSearchId;
							window.location.href=url;
							showLoadingDialog();
						});
						if($("#commerce footer #sticky-actions").find("button").length == 0){//30033997
							isPageError = true;
							var buttonHTML = "";
							console.log("=============yes");

							$("#commerce #popup-moreBtns-popup .popup-nested-inner li a.ui-btn").each(function(e){
								console.log("=============yes1");
								//if($(this).text().indexOf("Pipeline") == -1){
									buttonHTML = buttonHTML + "<button class='ui-btn'>"+$(this).text()+"</button>";
								//}
								
							});
							console.log("============="+buttonHTML);
							if( $("#duplicatefooter").length == 0 && buttonHTML != ""){
								$( "#commerce footer" ).append( "<div id='duplicatefooter'>"+buttonHTML+"</div>" );
								
							}
							if($("#duplicatefooter").length > 0){
								$("#button-bar").hide();
							}
							$("body").on("click touchend","#duplicatefooter button",function(e){
								e.preventDefault();
								var sourceBtn = $(this).text().trim();
								console.log("sourceBtn===="+sourceBtn);
								console.log("sourceBtn====#commerce #popup-moreBtns-popup .popup-nested-inner li a.ui-btn:contains('"+sourceBtn+"')");
								$("#commerce #popup-moreBtns-popup .popup-nested-inner li a.ui-btn:contains('"+sourceBtn+"')").trigger("tap");
							});
							$("button:contains('Pipeline Viewer')").hide();
						}
						
						// $("button.ui-btn:contains('Delete Order')").hide();
						// $("a.ui-btn:contains('Delete Order')").hide();
						// $("a.ui-btn:contains('Home')").hide();

						// if(isPageError){
						// 	$("#duplicatefooter").append("<button class='ui-btn ui-btn-inline' id='home'>Home</button><button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");

						// }else{
							
						// 	$("#sticky-actions").append("<button class='ui-btn ui-btn-inline' id='home'>Home</button><button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");
						// }

						var flag = window.sessionStorage.getItem("flag");
						
						console.log("rightnow", (flag == "rightnow"));
						var isHomeButtonHidden = $("#popup-moreBtns-popup a.ui-btn:contains('Home')").length > 0? true:false;
						if(isPageError){
							$("#duplicatefooter").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");
							if(flag == "rightnow" && isHomeButtonHidden){
								$("#duplicatefooter").append("<button class='ui-btn ui-btn-inline' id='order-home'>Home</button>");
							}
						}else{
							
							$("#sticky-actions").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");
							var checkCond = (flag == "rightnow" &&isHomeButtonHidden);
							//alert(flag +"==="+isHomeButtonHidden+"====="+checkCond);						
							if(flag == "rightnow" && isHomeButtonHidden){
								$("#sticky-actions").append("<button class='ui-btn ui-btn-inline' id='order-home'>Home</button>");
								//alert(flag +"==="+isHomeButtonHidden);			
							}
						}		
						// if(isPageError){
						// 	$("#duplicatefooter").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");

						// }else{
							
						// 	$("#sticky-actions").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button><button class='ui-btn ui-btn-inline' id='order-delete'>Delete Order</button>");
						// }		

						$("body").on("click touchend","#order-delete",function(e){
							e.preventDefault();
							if(confirm('Are you sure you wish to delete this order?.')){
								window.localStorage.setItem("delete_transaction", true);
								if($("a.ui-btn:contains('Delete Order')").length > 0){
									$("a.ui-btn:contains('Delete Order')")[0].click();
								}
							}
						});

						$("body").off("click touchend","#order-home");
						$("body").on("click touchend","#order-home",function(e){
							e.preventDefault();
							if($("a.ui-btn:contains('Home')").length > 0){
								window.close();
								// $("a.ui-btn:contains('Home')")[0].click();
							}
						
						});
						$("a.ui-btn:contains('Refresh')").on("click touchend", function(){
							window.localStorage.setItem("delete_transaction", true);
						});

						var isOrderInitated = $("input[name='status_t']").val().toLowerCase() == "order initiated";
						var isFailed = $("input[name='status_t']").val().toLowerCase() == "failed";
						var isTransmisionFailed = $("input[name='status_t']").val().toLowerCase() == "transmission failed";
						var isCOmpleted = $("input[name='status_t']").val().toLowerCase() == "completed";
						var isInProcess = $("input[name='status_t']").val().toLowerCase() == "in process";
						var isCSReview = $("input[name='status_t']").val().toLowerCase() == "cs team review";
						var isTemplateOrder = ($("select[name='isATestOrder_t']").length > 0) ? ($("select[name='isATestOrder_t']").val().trim().toLowerCase() == "yes") : false;
						var isButtonDeleteExist = $("a.ui-btn:contains('Delete Order')").length == 1;
						if( isOrderInitated || isFailed || isTransmisionFailed || !isButtonDeleteExist || isCOmpleted || isInProcess || isCSReview ){
							$("#order-delete").hide();
						}
						if(isTemplateOrder){
							$("#order-delete").show();
						}

						$("body").on("click touchend","#order-allorders",function(e){
								e.preventDefault();
								var url = "/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
								window.location.href = url;
						});
						$("body").on("click touchend","#order-showshoppingcart",function(e){
								e.preventDefault();		
								$(".sidebar-handle").trigger("click");		
								//$(".sidebar-handle-icon").trigger("swipeleft");
						});
						$("body").on("click touchend","#order-neworder",function(e){
								e.preventDefault();
								localStorage.removeItem("frequentlyAccessedCustomers_t");
								var selectedSearchId = '-1';
								var token = $("input[name=token]").val();
								var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id="+selectedSearchId;
								window.location.href=url;
								showLoadingDialog();
								showLoadingDialog();
						});
						/*if(isPageError){
							$("#duplicatefooterlig").append("<button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all' style='display:none'>Show Customer Info</button>");
						}*/
						console.log(" JS-TABLET 485  =======add show customer 111 start======");
						$("#lig-sticky-actions").append("<div><button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all' style='display:none'>Show Customer Info</button></div>");
						console.log(" JS-TABLET 487  =======add show customer 111 end ======");
						//if(noOfLines == 0){
							$("body").on("click tochend swipeleft swiperight","#swipe-sidebar",function(e){
								if($(this).hasClass("sidebar-state-1")){
									$("#order-showshoppingcart").hide();
									$("#order-showorderdetails").show();
									console.log("=======isPageError======"+isPageError);
									if(isPageError){
										$("#duplicatefooter").hide();
										$("#duplicatefooterlig").show();
										var  buttonHTML = "";
										$("#commerce #popup-moreBtns-lig-popup .popup-nested-inner li a.ui-btn").each(function(e){
											console.log("======isPageError=======yes1");
											//if($(this).text().indexOf("Pipeline") == -1){
												buttonHTML = buttonHTML + "<button class='ui-btn'>"+$(this).text()+"</button>";
											//}
											
										});
										
										console.log("JS-TABLET 504 ======isPageError======="+buttonHTML);
										if( $("#duplicatefooterlig").length == 0 && buttonHTML != ""){
											$( "#commerce footer" ).append( "<div id='duplicatefooterlig'>"+buttonHTML+"</div>" );
											
										}
										console.log("JS-TABLET 509  ======Show Customer Info add 22 start =======");
										if($('#order-showorderdetails').length){
										console.log("JS-TABLET 513  ======Show Customer Info 22 PRESENT =======");
										}else{
										$("#duplicatefooterlig").append("<button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all'>Show Customer Info</button>");
										}										
										console.log("JS-TABLET 511  ======Show Customer Info add 22 end =======");
										
										if($("#duplicatefooterlig").length > 0){
											$("#button-bar").hide();
										}
										$("body").on("click touchend","#duplicatefooterlig button",function(e){
											e.preventDefault();
											var sourceBtn = $(this).text().trim();
											console.log("JS-TABLET 516  sourceBtn===="+sourceBtn);
											console.log("JS-TABLET 517 sourceBtn====#commerce #popup-moreBtns-popup .popup-nested-inner li a.ui-btn:contains('"+sourceBtn+"')");
											$("#commerce #popup-moreBtns-lig .popup-nested-inner li a.ui-btn:contains('"+sourceBtn+"')").trigger("tap");
										});
										if(noOfLines > 0){
											$("button:contains('Add Material')").hide();
										}else{
											$("button:contains('Add Material')").show();
										}
									}
								}else{
									if(isPageError){
										$("#duplicatefooter").show();
										$("#duplicatefooterlig").hide();
									}
									$("#order-showshoppingcart").show();
									$("#order-showorderdetails").hide();
									
									
								}
								
								console.log("=======swipeleft========"+e.type);
							});
							/*$("body").on("swiperight",".swipe-sidebar",function(e){
								$("#order-showshoppingcart").show();
								$("#order-showorderdetails").hide();
								console.log("=======swiperight========");
							});*/
							/*if(isPageError){
								$("#duplicatefooter").append("<button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all'>Show Order Details</button>");
							}else{
								$("#sticky-actions").append("<button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all'>Show Order Details</button>");
							}*/						
						//}else{
							//$("#lig-sticky-actions").append("<button id='order-showorderdetails' class='ui-btn ui-btn-inline ui-shadow ui-corner-all'>Show Order Details</button>");
							
						//}
						/*if(noOfLines > 0){
							$("button:contains('Add Material')").hide();
						}else{
							$("button:contains('Add Material')").show();
						}*/

						/* 
							Created By    :- Created By Zainal Arifin, Date : 2 April 2018
							Task          :- Hide All Order button on order page for non CSTeam users
							Page          :- Order Page
							File Location :- $BASE_PATH$/javascript/js-ezrx.js
							Layout        :- Desktop
						*/

						var zpUserType = getZPUserType();
						// var zpUserType = ( $("#zPUserType").length > 0 )? $("#zPUserType").val().toLowerCase() : $("input[name='zPUserType']").val().toLowerCase();
						
						if (zpUserType != "csteam") {
							$("#order-allorders").hide();
						}

						/* 
							Created By    :- Created By Zainal Arifin, Date : 2 April 2018
							Task          :- Hide All Order button on order page for non CSTeam users
							Page          :- Order Page
							File Location :- $BASE_PATH$/javascript/js-ezrx.js
							Layout        :- Desktop
						*/

						var select_customer = function(){

							if(check_nationality(2600)){
								/* 
									Created By    :- Created By Zainal Arifin, Date : 17 April 2018
									Task          :- 8000348146 Change Save as template order? attribute value true  to Yes , false to No in order page in Submitted/completed orders
									Page          :- Order Page
									File Location :- $BASE_PATH$/javascript/js-ezrx.js
									Layout        :- Desktop
								*/

								var isCompleteOrSubmitted = $("input[name='status_t']").val().trim().toLowerCase();
								var isSaveAsTemplate = false;
								
								if($("input[name='isATestOrder_t']").length > 0){
									isSaveAsTemplate = $("input[name='isATestOrder_t']").val().trim().toLowerCase();
								}
								
								if (isCompleteOrSubmitted == "completed" || isCompleteOrSubmitted == "submitted" || isCompleteOrSubmitted == "in process") {
									if (isSaveAsTemplate == "true") {
										$($("input[name='isATestOrder_t']").siblings()[0]).text("Yes");
										
									} else {
										$($("input[name='isATestOrder_t']").siblings()[0]).text("No");
									}
								}

								/* 
									Created By    :- Created By Zainal Arifin, Date : 17 April 2018
									Task          :- 8000348146 Change Save as template order? attribute value true  to Yes , false to No in order page in Submitted/completed orders
									Page          :- Order Page
									File Location :- $BASE_PATH$/javascript/js-ezrx.js
									Layout        :- Desktop
								*/
							}

							setTimeout(function(){
								var isCompleteOrSubmitted = $("input[name='status_t']").val().trim().toLowerCase();
								var isSaveAsTemplate = false;
								if($("select[name='isATestOrder_t']").length > 0){
									isSaveAsTemplate = $("select[name='isATestOrder_t']").val().trim().toLowerCase();
								}
	
								if(isCompleteOrSubmitted == "not submitted" && isSaveAsTemplate == "true"){
									$(".action.action-type-modify:contains('Submit Order'), button:contains('Submit Order')").hide();
								}
							}, 2000);

							$("body").on("click touchend","#order-showorderdetails",function(e){
										e.preventDefault();			
										$(".sidebar-handle").trigger("click");		
										//$(".sidebar-handle-icon").trigger("swiperight");
							});

							/* 
								Created By    :- Created By Zainal Arifin, Date : 29 March 2018
								Task          :- Move Field orderingRequestNoMoreThan90Characters_t and customerPORef_t
								Page          :- Model Configuration
								File Location :- $BASE_PATH$/javascript/js-tablet.js
								Layout        :- Desktop
							*/
							var reposisitonFieldOrderingReq = function () {

								setTimeout(function () {
									if (isLoadingDone()) {
										/* $("#attribute-orderingRequestNoMoreThan90Characters_t").closest(".group-content").css({
											"margin-top": "30px",
											"padding-top": "30px",
											"border-top": "solid 2px #ddd"
										}); */

										//remove target for order existing
										$("#actionErrorMessagesBox .error-text a").attr("target", "_parent");

										setTimeout(function () {

											/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- Reorder button in order page
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/
											
											$("#sticky-actions").find(".action-type-modify:contains('Home')").appendTo("#sticky-actions");

											var flag = window.sessionStorage.getItem("flag");											

											if (flag == "rightnow") {
												$("#sticky-actions").find(".action-type-modify:contains('Home')").show();
											}else{
												$("#sticky-actions").find(".action-type-modify:contains('Home')").hide();
											}

											/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- Reorder button in order page
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/

											/* var parent = $("#attribute-orderingRequestNoMoreThan90Characters_t").closest(".ui-collapsible-content");
											$("#attribute-orderingRequestNoMoreThan90Characters_t").prependTo(parent);
											$("#attribute-customerPORef_t").prependTo(parent); */

											/* SG-15 : Customer PO Ref is hiding behing keyboard when typing letters in order page, by Zainal Arifin */
											$("#attribute-orderingRequestNoMoreThan90Characters_t").on("focus click", function(e){
												e.preventDefault();
												e.stopPropagation();
												$(this).closest(".group-content").css("height", "1000px");
											});

											$("#attribute-orderingRequestNoMoreThan90Characters_t").on("blur", function(){
												$(this).closest(".ui-collapsible-content").css("height", "auto");											
											});
											/* SG-15 : Customer PO Ref is hiding behing keyboard when typing letters in order page, by Zainal Arifin */

											/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- SG-05 Auto Collapse customer search
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/

											$("#attribute-customerSearchHolder_HTML").removeClass("hidden");
											function collapsedCustomerSearch(){
												
												setTimeout(function(){
													var parent_customerSearchHolder = $("#attribute-customerSearchHolder_HTML").closest(".ui-collapsible-inset").addClass("ui-collapsible-collapsed");
													if ($(parent_customerSearchHolder).hasClass("ui-collapsible-collapsed")) {
														parent_customerSearchHolder.find(".ui-collapsible-heading").addClass("ui-collapsible-heading-collapsed");
														parent_customerSearchHolder.find(".ui-collapsible-content").addClass("ui-collapsible-content-collapsed");
														if (!$(parent_customerSearchHolder.find(".ui-collapsible-content")).hasClass("ui-collapsible-content-collapsed")) {
															collapsedCustomerSearch();
														}
													} else {
														collapsedCustomerSearch();
													}
												}, 500);

											}

											// if ($("input[name='status_t']").val() != ""){
											if ($("input[name='customerSoldToId_New']").val() != "" || $("input[name='customerShipToId_t']").val() != "" ){
												collapsedCustomerSearch();
											}

											/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- SG-05 Auto Collapse customer search
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/

											//hide sold to id
											if ( !check_nationality(2600) ) {
												$("#attribute-customerSoldToId_t").hide();
											}else{
												$("#attribute-customerSoldToId_t").show();				
											}

																					/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- SG-17 Open Shopping Cart after open order
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/
											/* if (check_nationality(2600)) {

												var trans_id = $("input[name='transactionID_t']").val().replace(" ", "");
												var isUserHaveModifySC = window.localStorage.getItem("orderItem_" + trans_id);
												if (typeof isUserHaveModifySC == 'undefined') {
													isUserHaveModifySC = false;
													window.localStorage.setItem("orderItem_" + trans_id, isUserHaveModifySC);
												}

												if ($("#zPUserType").val().toLowerCase() != "csteam") {
													if ($('#line-item-grid .lig-side-scroller>table tr.lig-row.child').length > 0) {
														if (!isUserHaveModifySC) {

															var autoSwipeIfLoadingDone = function () {
																setTimeout(function () {
																	if (isLoadingDone()) {

																		if ($("#swipe-sidebar").hasClass("sidebar-state-0")) {
																			$('.sidebar-handle').click();
																			autoSwipeIfLoadingDone();
																		} else {
																			redirectConfigPage();
																		}

																		function redirectConfigPage() {

																			if ($("#swipe-sidebar").hasClass("sidebar-state-1")) {

																				// if have item on cart
																				var sliderOut = setInterval(function () {
																					if ($('.sidebar-state-1').attr('style').includes('right: 0px;')) {
																						clearInterval(sliderOut);

																						setTimeout(function () {
																							if ($('#swipe-sidebar .lig-row').hasClass('parent')) {
																								//    alert('have checkbox');
																								var checkbox = $('.lig-row.parent td.lig-select .ui-checkbox input[name="_line_item_list"]');
																								var ebtn = $('#button-bar #lig-sticky-actions button:contains("Edit Shopping Cart")');
																								var ebtn2 = $('#popup-moreBtns-lig-popup li a.ui-btn:contains("Edit Shopping Cart")');
																								checkbox.prop('checked', true);

																								var checkboxInterval = setInterval(function () {

																									var checkFirstChild = checkbox.is(':checked');
																									if (checkFirstChild === true) {
																										clearInterval(checkboxInterval);

																										if (ebtn.length == 1) {
																											ebtn.click();
																										} else {
																											ebtn2.click();
																										}

																									}

																								}, 100);

																							} else {

																								$('#lig-sticky-actions button:visible').click();

																							}
																						}, 1000);
																					}
																				}, 100);
																			}
																		}
																	} else {
																		autoSwipeIfLoadingDone();
																	}
																}, 500);
															}

															autoSwipeIfLoadingDone();

														}
													}
												}
											} */

											/* 
												Created By    :- Created By Zainal Arifin, Date : 2 April 2018
												Task          :- SG-17 Open Shopping Cart after open order
												Page          :- Order Page
												File Location :- $BASE_PATH$/javascript/js-ezrx.js
												Layout        :- Desktop
											*/

											//hide first section if there's dont have information to show
											var isSuspendCustMsgShow = ($("#attribute-suspendedCustomerMessage").find(".form-field").text().trim().length > 0);
											var isOrderSubmitMsgShow = !($("#attribute-orderSubmittedMesssage").hasClass("hidden"));
											var isInsufficientStockMsgShow = ($("#attribute-insufficientStockMessageHTML_t").find(".form-field").text().trim().length > 0);

											if( isSuspendCustMsgShow || isOrderSubmitMsgShow || isInsufficientStockMsgShow ){
												$("#attribute-suspendedCustomerMessage").closest(".ui-collapsible").show();
											}else{
												$("#attribute-suspendedCustomerMessage").closest(".ui-collapsible").hide();
											}

											/* 
													Created By    :- Created By Zainal Arifin, Date : 21 February 2019
													Task          :- set max length for the field
													Page          :- Order Page
													File Location :- $BASE_PATH$/javascript/js-tablet.js
													Layout        :- Mobile
											*/

											$order_request = $("textarea[name='orderingRequestNoMoreThan90Characters_t']");
        							if( $order_request.length > 0 ){
												var ruleMaxLength = 132;
												var maxLength = ruleMaxLength - $order_request.val().length;
												$order_request.prop("maxLength", ruleMaxLength);
												$order_request.parent().append("<div id='remainingchar' >"+maxLength+" characters left</div>");
												$("#remainingchar").css({
														"position": "absolute",
														"margin-right": "15px",
														"margin-top": "-15px",
														"color": "#a9a9a9",
														"font-size": "11px",
												});
											}

											/* 
													Created By    :- Created By Zainal Arifin, Date : 8 March 2019
													Task          :- set flag for delete transaction button
													Page          :- Order Page
													File Location :- $BASE_PATH$/javascript/js-ezrx.js
													Layout        :- Desktop
											*/

        							setTimeout(function(){
												$(".action.action-type-modify:contains('Delete Order'), button:contains('Delete Order'), a.ui-btn:contains('Delete Order')").on("click tap touchend", function(){											
													window.localStorage.setItem("delete_transaction", true);
												});
											}, 1000);
											
											/* 
													Created By    :- Created By Zainal Arifin, Date : 8 March 2019
													Task          :- set flag for delete transaction button
													Page          :- Order Page
													File Location :- $BASE_PATH$/javascript/js-ezrx.js
													Layout        :- Desktop
											*/

											if(window.innerWidth <= 1024 || window.innerWidth <= 425 ){
												$("#remainingchar").css({
													"right": "0",
												});
											}
											
											if(window.innerWidth <= 768){
												$("#remainingchar").css({
													"right": "22%",
												});
											}

											if(window.innerWidth <= 768){
												$("#remainingchar").css({
													"right": "22%",
												});
											}

											$order_request.on("keyup", function () {
													var remainingChar = ruleMaxLength - $(this).val().length;
													// console.log( remainingChar + "characters left" );
													$("#remainingchar").text(remainingChar + " characters left");
											});

											/* 
													Created By    :- Created By Zainal Arifin, Date : 21 February 2019
													Task          :- set max length for the field
													Page          :- Order Page
													File Location :- $BASE_PATH$/javascript/js-tablet.js
													Layout        :- Mobile
											*/

											$('select[name="addBundleFlag"]').closest('.ui-field-contain').hide();

										}, 2000);

									} else {
										reposisitonFieldOrderingReq();
									}
								}, 1000);

							}

							reposisitonFieldOrderingReq();

							/* 
								Created By    :- Created By Zainal Arifin, Date : 29 March 2018
								Task          :- Move Field orderingRequestNoMoreThan90Characters_t and customerPORef_t
								Page          :- Model Configuration
								File Location :- $BASE_PATH$/javascript/js-tablet.js
								Layout        :- Desktop
							*/

						}
						
						$("body").on("click touchend","#tab-orderAudit",function(e){
							

							/* 8-03-2018 | restyling Audit Table */
							function auditTableTab(){

								setTimeout(function(){

									if( $(".ui-loader.ui-corner-all").css("display") == "none" ){

										$( $("#auditTable table").closest(".ui-corner-all") ).children()[0].remove();
										$($( $("#auditTable table").closest(".ui-corner-all") ).children()[0]).css("width", "100%");
										$('#auditTable table').attr("style","width: 98%;");
										select_customer();

									}else{

										auditTableTab();

									}
				
								}, 1000);
								
							}

							auditTableTab();
							
							/* 8-03-2018 | restyling Audit Table */

						});
						
						$("body").on("click touchend","#tab-draftOrder",function(e){
							

							/* restyling for draftorder, 13 May 2018, Zainal Arifin */
							function draftOrder(){

								setTimeout(function(){

									if( $(".ui-loader.ui-corner-all").css("display") == "none" ){

										select_customer();

									}else{

										draftOrder();

									}
				
								}, 1000);
								
							}

							draftOrder();
							
							/* restyling for draftorder, 13 May 2018, Zainal Arifin */

						});



						select_customer();					
						

						

				 }
				
			}
			 
	}, 2500);
});