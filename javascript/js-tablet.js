console.log("js-tablet1");
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
		var valid = false;
		if (nationality == countryCode) {
			valid = true;
		}

		return valid;
	}

	var isLoadingDone = function(){
		return $("#jg-overlay").css("display") == "none"? true : false;
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
				$(".config-array #attribute-materialAndDesc").css("width", "120px");
				$(".config-array #attribute-inStock").css("width", "40px");
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
			}else{
				/* 
						Created By    :- Created By Zainal Arifin, Date : 26 March 2018
						Task          :- SG-02 Show Material Desc next to Contract Bonus – After Swipe section
						Page          :- Model Configuration
						File Location :- $BASE_PATH$/javascript/js-tablet.js
						Layout        :- Tablet
					*/

				if (sg_nationalty) {

					if ($("#attribute-materialDescription").hasClass("hidden")){
						$("#attribute-promotion").addClass("hidden");
						$(".cell-promotion").addClass("hidden");
					}else{
						$("#attribute-promotion").removeClass("hidden");
						$(".cell-promotion").removeClass("hidden");
					}

				}

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
				
			}
		

			//$("#materialArrayset").prepend("<span>"+$(document).width()+"===="+$(window).width()+"</span>");
			//$("#materialArrayset").prepend("&nbsp;<span>"+$(document).height()+"===="+$(window).height()+"</span>");
			//$("#materialArrayset").prepend("<span>"+colSpan+"</span>");
			
			
			
			//$("#materialArrayset").css("width",($(document).width()-50)+"px");
			//$("#materialArrayset").css("width","100%");
			//$("#materialArrayset table").css("width","100%");
			/*$("#materialArrayset").css("width","auto");
			$("#materialArrayset table").css("width","auto");*/
			
		
		},500);
	};

	var moveDescriptionBeforeContractPrice = function(){
		//move header after contractBonus
		$("#attribute-materialDescription").insertAfter($("#attribute-contractBonus"));
		$("#attribute-materialDescription").addClass("hidden");
		//move coloumn 
		$(".cell-materialDescription").map(function (index, data) {
			var id = $(data).attr("id").replace("cell-materialDescription-", "");
			$("#cell-materialDescription-" + id).insertAfter($("#cell-contractBonus-" + id));
			$("#cell-materialDescription-" + id).addClass("hidden");
		});

		$("#attribute-promotion").addClass("hidden");
		$(".cell-promotion").addClass("hidden");

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

	var userSalesOrg_t = (($("#userSalesOrg_t").length == 0) ? false : true);
	var userSalesOrg_PL = (($('input[name="userSalesOrg_PL"]').length == 0) ? false : true);
	var redColor = "rgb(255, 0, 0)";
	var blackColor = "#000000";
	var sg_nationalty = false;

	if (!userSalesOrg_t && !userSalesOrg_PL) {
		//if it's from SG check validy true
		sg_nationalty = true;
	} else {
		sg_nationalty = check_nationality(2600)
	}

	 setTimeout(function() {
		  if( navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
             || navigator.userAgent.match(/Windows Phone/i)
             ){
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
						},500);
						$("body").on("click tochend swipeleft swiperight","#materialArrayset",function(e){
							 console.log("=======+++++=============2");
							//if($("#showDetailedView").val() == "false"){
								 console.log("=======+++++=============3");
								alignMatArraySet();
								showDetailedView();
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

					 	if (sg_nationalty) {
							moveDescriptionBeforeContractPrice();
						}						
						
						// START UPDATE 19-01-2018
						// START SLIDER CONTENT

						$("#swipe-sidebar-content").css("display", "block");

						//$("#swipe-sidebar-content").html("");					
						function reposition_content(){
							// $('#jg-overlay').show();
							setTimeout(function() {
								$("#price-section").hide();
								$("#recommended-parts").hide();
								
								var elementToMove = $(".ui-collapsible-inset");
								
								$( $(elementToMove[1]) ).appendTo("#swipe-sidebar-content");

								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide Recomended Material in SG
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/
								var userSalesOrg_t = (($("#userSalesOrg_t").length == 0) ? false : true);
								var userSalesOrg_PL = (($('input[name="userSalesOrg_PL"]').length == 0) ? false : true);

								var sg_nationalty = false;
								if (!userSalesOrg_t && !userSalesOrg_PL) {
									//if it's from SG check validy true
									sg_nationalty = true;
								} else {
									sg_nationalty = check_nationality(2600)
								}

								if (sg_nationalty) {
									$(elementToMove[2]).hide();
								}else{
									$( $(elementToMove[2]) ).appendTo("#swipe-sidebar-content");
								}
								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide Recomended Material in SG
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

								$( $(elementToMove[3]) ).appendTo("#swipe-sidebar-content");
								
								$("#swipe-sidebar-content").find(".ui-collapsible-heading-toggle").each(function(index, data){
									$(data).css({ "background-color": "#afc008","border-radius": "0","color": "#fff", "border-color": "transparent"});
								});
								
								/* 8-03-2018 move button add and delete in My Favourite */
								$("#AddCustFav").closest("span").css({"position":"fixed","bottom": "9%"});
								var parent = $("#AddCustFav").closest(".ui-field-contain");
								$("#AddCustFav").closest("span").appendTo( $(parent).find(".messages") );
								/* 8-03-2018 move button add and delete in My Favourite */

								$("#swipe-sidebar-content").siblings(".sidebar-handle").show();	
								// END SLIDER CONTENT
								
								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide button bar if slide shown up
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/

								$(".sidebar-handle").on("click", function(){
									var isSliderShow = $("#swipe-sidebar").hasClass("sidebar-state-1");
									if (isSliderShow){
										$("#button-bar").show();
									}else{
										$("#button-bar").hide();
									}
								});

								/* 
									Created By    :- Created By Zainal Arifin, Date : 19 March 2018
									Task          :- Hide button bar if slide shown up
									Page          :- Global
									File Location :- $BASE_PATH$/javascript/js-tablet.js
									Layout        :- Desktop
								*/
								
								if($("#swipe-sidebar-content").html().length == 0){
									reposition_content();
								}
							}, 1000);
						}
						
						reposition_content();

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

						$("input[name='additionalMaterialQty']:not(input[type='hidden'])").map(function (index, data) {
							if( $(data).length > 0 ){
								var id = $(data).attr("id").replace("additionalMaterialQty", "");
								if ($(data).val() != 0) {
									$("#additionalMaterialQty" + id).css("color", redColor);
								}
							}
						});

						$("input[name='additionalMaterialQty']").on("click focus starttouch", function () {

							var id = $(this).attr("id").replace("additionalMaterialQty", "");
							if (!listEditedField.hasOwnProperty(id)) {
								listEditedField[id] = { before: $(this).val(), after : 0 };
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
								console.log("LISTEN OVERRIDE PRICE");
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
						
				}else if(pageTitle == "order page"){
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
					
						var theMessage = "PopupMessage";
						var htmlPopupMessage = '<div id="dialog" title="Popup Message">'+theMessage+'</div >';
						$("body").prepend($(htmlPopupMessage));
						$("#dialog").dialog({ autoOpen: false, modal: true, show: "blind", hide: "blind" });

						$($(".action.action-type-modify:contains('Submit Order')")[0]).on("click", function (e) {
							$("#dialog").dialog("open");
							e.preventDefault();
						});
						
						if(isPageError){
							$("#duplicatefooter").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button>");

						}else{
							
							$("#sticky-actions").append("<button class='ui-btn ui-btn-inline' id='order-allorders'>All Orders</button><button class='ui-btn ui-btn-inline' id='order-showshoppingcart'>Show Shopping Cart</button><button class='ui-btn ui-btn-inline' id='order-neworder'>New Order</button>");
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
								var selectedSearchId = '-1';
								var token = $("input[name=token]").val();
								var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id="+selectedSearchId;
								window.location.href=url;
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
						$("body").on("click touchend","#order-showorderdetails",function(e){
									e.preventDefault();			
									$(".sidebar-handle").trigger("click");		
									//$(".sidebar-handle-icon").trigger("swiperight");
						});
						
						$("body").on("click touchend","#tab-orderAudit",function(e){
							

							/* 8-03-2018 | restyling Audit Table */
							function auditTableTab(){

								setTimeout(function(){

									if( $(".ui-loader.ui-corner-all").css("display") == "none" ){

										$( $("#auditTable table").closest(".ui-corner-all") ).children()[0].remove();
										$($( $("#auditTable table").closest(".ui-corner-all") ).children()[0]).css("width", "100%");
										$('#auditTable table').attr("style","width: 98%;");

									}else{

										auditTableTab();

									}
				
								}, 1000);
								
							}

							auditTableTab();
							
							/* 8-03-2018 | restyling Audit Table */

						});
						
						
				 }
				
			 }
			 
	}, 2500);
});