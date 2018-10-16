var customer_master_string = "";
var js2 = jQuery.noConflict();
var pagetitle;
 
$(document).ready(function(js2){

	// window.check_country = function(country){
	// 	var countryEle = document.getElementById('userSalesOrg_t');
	// 	if (countryEle == null) { //this is for material page.
	// 		countryEle = $('input[name="userSalesOrg_PL"]').val();
	// 		countryCode = countryEle;
	// 	} else {
	// 		var countryCode = parseInt(countryEle.value);
	// 	}
	
	// 	if (typeof countryCode == "undefined" || countryCode == "" || isNaN(countryCode) ){
	// 		countryCode = "2601";
	// 	}
	
	// 	// IF Application add new country please add this array.
	// 	var SG = [ 2600, 2601 ];
	// 	var TW = [ 2800 ];
	// 	var PH = [ 2500 ];
	// 	var TH = [ 2900, 2902 ];
	// 	var MY = [ 2001 ];
	// 	var VN = [ 3000, 3001, 3050, 3070, 3072, 3090 ];
	// 	valid = false;


	
	// 	if( country == "SG" ){
	// 		if( SG.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	// 	else if( country == "TW" ){
	// 		if( TW.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	// 	else if( country == "PH" ){
	// 		if( PH.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	// 	else if( country == "TH" ){
	// 		console.log( TH.indexOf( countryCode ) );
	// 		if( TH.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	// 	else if( country = "MY" ){
	// 		if( MY.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	// 	else if( country == "VN" ){
	// 		if( VN.indexOf( countryCode ) != -1 ){
	// 			valid = true;
	// 		}
	// 	}
	
	// 	return valid;
		
	// }
	
	window.getZPUserType = function () {
		if ($("#zPUserType").length > 0 || $("input[name='zPUserType']").length > 0) {
			return ($("#zPUserType").length > 0) ? $("#zPUserType").val().toLowerCase() : $("input[name='zPUserType']").val().toLowerCase();
		} else {
			return "";
		}
	}

	// debugger;
	// $.noConflict();
	// console.log('inside', $.noConflict() );
	/*$("#edit_shopping_cart").on('click', function(){
		console.log('click and load');
	});commented by suresh*/
	//if($('title')){
		pagetitle = $('title').text().toLowerCase();
	//}
	var fullUrl = window.location.host;
	//window.location.host is subdomain.domain.com
	var parts = fullUrl.split('.');
	var sub = parts[0];
	$(window).load(function () {

		setTimeout(function () {
			if(window.location.href.indexOf("copy_processing.jsp")!= -1 && $('#edit_shopping_cart').length >0){
				
				$('#line-item-grid tr:first-child').find('input[name="_line_item_list"]').prop("checked", true);				
				$("#edit_shopping_cart").click();

			}
			
		}, 1000);

	});

	// $("#orderingRequestNoMoreThan90Characters_t").off();
	// $('input[name="customerPORef_t"], textarea[name="orderingRequestNoMoreThan90Characters_t"], input[name*="comment_l"]').bind('change', function(){
	// 	$('input[name="saveQuoteRequired_t"]').val('Yes');
	// 	console.log('saveQuoteRequired_t');

	// });
	if(pagetitle == "commerce management"){//validation message for duplicate customer
		console.log("duplicate customer");
		if($("ul.error-text").length > 0){
			var paramsStr = $("li:contains('Duplicate Quote')").text();//Duplicate Quote$$ZPSG -6631$$41702583
			console.log("duplicate customer=="+paramsStr);
			if(paramsStr != "" && paramsStr != undefined && paramsStr != null){
				var params = paramsStr.split("$$");
				var siteUrl = window.location.href;
				console.info(siteUrl);
        		if(siteUrl.indexOf('flag=rightnow')!== -1){
					var targetUrl = "https://"+sub+".bigmachines.com/commerce/buyside/document.jsp?formaction=performAction&action_id=36244076&bs_id="+params[2]+"&bm_cm_process_id=36244034&document_id=36244074&flag=rightnow";
					var errorMsg = "<li class='error-text'>An order is already present with selected Customer Id. Please click on <a href='"+targetUrl+"' >"+params[1]+"</a></li>";
					
				} else {
					var targetUrl = "https://"+sub+".bigmachines.com/commerce/buyside/document.jsp?formaction=performAction&action_id=36244076&bs_id="+params[2]+"&bm_cm_process_id=36244034&document_id=36244074";
					var errorMsg = "<li class='error-text'>An order is already present with selected Customer Id. Please click on <a target='_blank' href='"+targetUrl+"' >"+params[1]+"</a></li>";
					
				}
				$("li:contains('Duplicate Quote')").hide();
				$("li:contains('Copy Order Validation')").hide();
				$("li:contains('Duplicate Quote')").parent().append(errorMsg);
			}

		}
	}

	if(pagetitle == "transaction" || pagetitle == "Shopping Cart"){

		//added by suresh
		if($("#actionErrorMessagesBox").length > 0 && pagetitle == "transaction"){

			$("li:contains('An order is already')").hide();
			var errorText = "<li class='error-text'>"+$("li:contains('An order is already')").text()+"</li>";
			$("li:contains('An order is already')").parent().append(errorText);
		}

		//end

		var globalTemplateFlag = ($("span[id*='globalTemplateFlag']").html().toLowerCase() == 'true')? true : false;

		var topCustomerWrapper = '<div class="customer-search-holder"><div class="search-input-wrapper"><p>Search all customers</p><input type="text" id="searchCustomerInput" autocomplete="off" placeholder="Please enter minimum 3 character"></div><div class="search-cust_wrapper"><table id="searchCustomer" width="100%"></table></div><div class="top-cust_wrapper"><p>Top 10 Frequent customers</p><table id="topCustomerList" class="display" width="100%"></table></div></div>';

		if( globalTemplateFlag && window.getZPUserType() == "csteam" && (window.check_country("TH") || window.check_country("VN") || window.check_country("MY")) ){

			if( window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
				topCustomerWrapper = '<div class="customer-search-holder"><div class="search-input-wrapper" style="float:left;    margin: 0px 50px 0px 0px;" ><p>Search all customers(Sold To/Ship To/Bill To Id/Name)</p><input type="text" id="searchCustomerInput" autocomplete="off" placeholder="Please enter minimum 3 character" style="width:90%;" ></div><div class="search-input-wrapper"><p>Search all customers(District/City/Pin Code)</p><input type="text" id="searchCustomerInputNew" autocomplete="off" placeholder="Please enter minimum 3 character" style="width:80%;" ></div><div class="search-cust_wrapper"><table id="searchCustomer" width="100%"></table></div><div class="top-cust_wrapper"><p>Top 10 Frequent customers</p><table id="topCustomerList" class="display" width="100%"></table></div></div>';
			}
			
		}

		var statusOrder = $("#readonly_1_status_t").html().toLowerCase();
		
		if( !window.getZPUserType() == "salesrep" || statusOrder != "cs team review" ){

			$("#attr_wrapper_1_customerSearchHolder_HTML").html(topCustomerWrapper);

		}

		/* 
			Created By    :- Created By Zainal Arifin, Date : 14 March 2018
			Task          :- remove rule-hide for search customer
			Page          :- Global
			File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
			Layout        :- Desktop
		*/
		$("#attr_wrapper_1_customerSearchHolder_HTML").removeClass("rule-hide");
		$("#attr_wrapper_1_customerSearchHolder_HTML").parent().removeClass("rule-hide");
		/* 
			Created By    :- Created By Zainal Arifin, Date : 14 March 2018
			Task          :- remove rule-hide for search customer
			Page          :- Global
			File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
			Layout        :- Desktop
		*/

		var zPUserType = $('#zPUserType').val();
		var fileAttachmentBSID_t = $('#fileAttachmentBSID_t').val();
		// localStorage.setItem("fileAttachmentBSID_t", fileAttachmentBSID_t);

		if (window.getZPUserType() == "customer"){
			return true;
		}

		if (zPUserType === 'CSTeam') {
			//loadAjax();
			searchCustomerList();

		} else {

			/* 
				Created By    :- Created By Zainal Arifin, Date : 18 March 2018
				Task          :- Search Customer from customerDetails.txt From URL
				Page          :- Shopping Cart
				File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
				Layout        :- Global
			*/

			// var isPHCountry = check_nationality(2500);
			// var isSGCountry = check_nationality(2600);
			/* var usernameGetCustomer = "CPQAPIUser";
			var passwordGetCustomer = "csC(#15^14"; */

			var fileAttachmentBSID_t = $("input[name='fileAttachmentBSID_t']").val();
			var ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v1/commerceProcesses/oraclecpqo/transactions/" + fileAttachmentBSID_t + "/attachments/customerDetails?docId=36244074&docNum=1";

			$.ajax({
				// header: { "Authorization": "Basic " + btoa(usernameGetCustomer + ":" + passwordGetCustomer) },
				type: "GET",
				url: ajaxUrl,
				dataType: "text",
				success: function (customerDetails) {
					// console.log(response);
					var seachCustomer;
					searchCustList(customerDetails, seachCustomer);
					searchCustomerList(seachCustomer);
					$('.search-cust_wrapper').hide();

				}
			});

			/* if (isPHCountry){

				// var isCPQAPIUSER = (window._BM_USER_LOGIN == "CPQAPIUser")? true : false;

				// if (isCPQAPIUSER){
				setTimeout(function(){
					$.ajax({
						header: { "Authorization": "Basic " + btoa(usernameGetCustomer + ":" + passwordGetCustomer) },
						type: "GET",
						url: "/rest/v1/commerceProcesses/oraclecpqo/transactions/" + fileAttachmentBSID_t + "/attachments/customerDetails?docId=36244074&docNum=1",
						dataType: "text",
						success: function (customerDetails) {
							// console.log(response);
							searchCustList(customerDetails, seachCustomer);
							searchCustomerList(seachCustomer);
							$('.search-cust_wrapper').hide();

						}
						// ,
						// beforeSend: function (xhr) {
						// 	xhr.setRequestHeader("Authorization", "Basic " + btoa(usernameGetCustomer + ":" + passwordGetCustomer));
						// }
					});
				}, 5000);

			}else{ */
				/* 
					if ($('#customerMasterString_t').length > 0) {
					var customerDetails = $("#customerMasterString_t").val();
					// if (customerDetails === "" && $('#fileAttachmentBSID_t').val() == "") {
					if (customerDetails === "") {
						return true;
					} else {
						var seachCustomer;
						customer_master_string = customerDetails;
						searchCustList(customerDetails, seachCustomer);
						searchCustomerList(seachCustomer);

						$('.search-cust_wrapper').hide();
					}

				} 
				*/
			// }

			/* 
				Created By    :- Created By Zainal Arifin, Date : 18 March 2018
				Task          :- Search Customer from customerDetails.txt From URL
				Page          :- Shopping Cart
				File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
				Layout        :- Global
			*/

		}


		//showCustomerList();
		//if( $('#actualMasterString').length ) {

		if( $('#frequentlyAccessedCustomers_t').length ) {
			var customerDetails = $("#frequentlyAccessedCustomers_t").val().replace(/~/gi, "");
			console.log("frequentlyAccessedCustomers_t is", (customerDetails.length > 0) ? "Not Empty" : "Empty", "The data is : " + customerDetails );
			if (customerDetails.length > 0) {
				localStorage.setItem("frequentlyAccessedCustomers_t", customerDetails);
			} else {
				customerDetails = (typeof localStorage.getItem("frequentlyAccessedCustomers_t") != 'undefined' ? localStorage.getItem("frequentlyAccessedCustomers_t") : "" );
			}
			$("#frequentlyAccessedCustomers_t").val("");
			//console.log('frequentlyAccessedCustomers_t customerDetails  PR 1.0  =====>>>>>>> ', customerDetails);
			if ( customerDetails == null || customerDetails.length == 0 ){
				return true;
			} else {
				showCustomerList(customerDetails);
			}
		}

	}



});
/* 
		Start : -
		Task  : - Detect User
		Page  : Global
		File Location : $BASE_PATH$/javascript/js-ezrx-ph.js
		Layout : Both
	*/	
var userDetectFunc = function(){
	var userCountry = null;
	//userCountry = 'PH';
	var countryEle = document.getElementById('userSalesOrg_t');

	if(countryEle !== null){
		var countryCode = parseInt(countryEle.value);
		//console.log('=== userDetectFunc countryCode =====>>>> ',countryCode);

		if(countryCode === 2500){
			userCountry = 'PH';
		} 
		if(countryCode === 2800){
			userCountry = 'TW';
		}
				
		//console.log('=== userCountry ===>>>> ',userCountry);

		return userCountry;
		
	}

}
var userCountry =  userDetectFunc();	
	/*
	End   : -
	Task  : - Detect User
	Page  : Global
	File Location : $BASE_PATH$/javascript/js-ezrx.js
	Layout : Both
	*/
/*
    Start : 11 Dec 2017
    Task  : Delete line items if customer is changed.
    Page  : Shopping cart 
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Both
*/



var changeCust = function(){
	newCustId = sessionStorage.getItem('selectedCustShipID');
	//console.error(newCustId);
	//console.warn(typeof newCustId);
	if((newCustId != null) ){
		//document.cookie = "selectedCustShipID="+null;	
		/* 
			Created By    :- Created By Zainal Arifin, Date : 14 March 2018
			Task          :- remove localStorage for checking
			Page          :- Global
			File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
			Layout        :- Desktop
		*/
		sessionStorage.removeItem('selectedCustShipID');
		/* 
			Created By    :- Created By Zainal Arifin, Date : 14 March 2018
			Task          :- remove localStorage for checking
			Page          :- Global
			File Location :- $BASE_PATH$/javascript/customerSearchHolder_HTML.js
			Layout        :- Desktop
		*/
		$("#selectedCustomerDetail").val(newCustId);
		//PH-47 : Only once to change customer 6/4/2018, Zainal Arifin
		if(!window.check_country("PH")){
			$("#customerMasterString_t").val("");
		}
		setTimeout(function(){
				$("#save").click();
		}, 500);
	}
};
var delete_line_item_func = function(selectedCustShipID){

	//console.error('userDetectFunc',userDetectFunc());
	
	if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
		var selectedCustShipID_TW = selectedCustShipID;
	}
	
	//VMLSINOZP-61 START
	var selectedCustShipID = parseInt(selectedCustShipID);
	
	//parseInt($("span[id*=customerSoldToId_t]").text())
	var currentCust = parseInt($("span[id*=customerShipToId]").text());
	var line_items_no = $('input[type="checkbox"][name="_line_item_list"]').length;
	//console.log('selectedCustShipID',selectedCustShipID);
	//console.log('currentCust',currentCust);
	if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
		console.log('selectedCustShipID_TW',selectedCustShipID_TW);
		//return false;
	}
	if((selectedCustShipID != currentCust) && (selectedCustShipID>0) && (currentCust>0) && (line_items_no>0)) {
		
		if(confirm('The line items will be deleted from order on change of customer. Do you want to proceed?.')){

			//document.cookie = "selectedCustShipID="+selectedCustShipID;	
			sessionStorage.setItem('selectedCustShipID', selectedCustShipID);
			if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
				sessionStorage.setItem('selectedCustShipID', selectedCustShipID_TW);
			}
			$('input[type="checkbox"][name="_line_item_list"]').prop("checked","checked");
			$('#delete_line_items').on("click",function(){
				//console.info('delete_line_items clicked 2');
			}).click();
		}

	} else {
		//var selectedCustShipID = $(this).val();
		// console.log("showCustomerList selectedCustShipID", selectedCustShipID);
		$("#selectedCustomerDetail").val(selectedCustShipID);
		if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
			$("#selectedCustomerDetail").val(selectedCustShipID_TW);
			//return false;
		}
		// console.log('showCustomerList selectedCustomerDetail value', $("#selectedCustomerDetail").val());
		//PH-47 : Only once to change customer 6/4/2018, Zainal Arifin
		if(!window.check_country("PH")){
			$("#customerMasterString_t").val("");
		}
		setTimeout(function(){
			$("#save").click();
		}, 500);
	}    

};
	
	
	
	/*
    End : 11 Dec 2017
    Task  : Delete line items if customer is changed.
    Page  : Shopping cart 
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Both
*/
var loadAjax = function() {

	var userCountry = userDetectFunc();

	var fullUrl = window.location.host;
	//window.location.host is subdomain.domain.com
	var parts = fullUrl.split('.');
	var sub = parts[0];
	searchKeyword = $("#searchCustomerInput").val().replace(/ /gi, "%");

	var dataSet = [];
	var param = "";

	if( window.check_country("TH") || window.check_country("MY") || window.check_country("VN") ){
		
		var customerMasterTable_t = $("input[name='customerMasterTable_t']").val();

        ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v3/custom"+customerMasterTable_t;
		param = 'q={"custmasterstring":{$regex:"/' + encodeURIComponent( searchKeyword ) + '/i"}}&{RecrdFlag:{eq:{A}}&{Control_Flag:{ne:{N}}&orderby=customer_name:asc';

		var globalTemplateFlag = ($("span[id*='globalTemplateFlag']").html().toLowerCase() == 'true')? true : false;

		if( globalTemplateFlag ){

			var oldSearchField = encodeURIComponent( searchKeyword );
			var countryCodeURL = window.check_country();
			if( window.check_country("TH") ){
				countryCodeURL = "2900";
			}else if( window.check_country("VN") ){
				countryCodeURL = "3000";
			}
    
			ajaxUrl = 'https://' + sub + '.bigmachines.com/rest/v5/customCustomer_Master_'+countryCodeURL;
			param = 'q={$and:[{"custmasterstring":{$regex:"/'+ oldSearchField +'/i"}},{$or:[{"recrdflag":{$eq:"A"}},{"recrdflag":{$exists:false}}]},{$or:[{"control_flag":{$eq:"Y"}},{"control_flag":{$exists:false}}]}]}&orderby=customer_name:asc';

			var newSearchField = encodeURIComponent( $("#searchCustomerInputNew").val().trim() );

			if( newSearchField.length > 0 ){
				param = 'q={$and:[{"ref_field_1":{$regex:"/'+ newSearchField +'/i"}},{$or:[{"recrdflag":{$eq:"A"}},{"recrdflag":{$exists:false}}]},{$or:[{"control_flag":{$eq:"Y"}},{"control_flag":{$exists:false}}]}]}&orderby=customer_name:asc';
			}
			
			if( oldSearchField.length > 0 && newSearchField.length > 0 ){
				param = 'q={$and:[{"custmasterstring":{$regex:"/'+ oldSearchField +'/i"}},{"ref_field_1":{$regex:"/'+ newSearchField +'/i"}},{$or:[{"recrdflag":{$eq:"A"}},{"recrdflag":{$exists:false}}]},{$or:[{"control_flag":{$eq:"Y"}},{"control_flag":{$exists:false}}]}]}&orderby=customer_name:asc';
			}

		}
		
		ua = window.navigator.userAgent;
		if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0){ // If Internet Explorer, return version number
			param = 'q={%22custmasterstring%22:{$regex:%22/' + encodeURIComponent( searchKeyword ) + '/i%22}}&{RecrdFlag:{eq:{A}}&{Control_Flag:{ne:{N}}&orderby=customer_name:asc';
		}
	
	}else{
		var ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v3/customCustomer_Master";
		//NEW AJAX URL FOR TAIWAN CSTEAM START
		if (userCountry === 'TW') {
			ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v3/customCustomer_Master_2800";
		} else if (userCountry == "PH") {
			ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v3/customCustomer_Master_2500";
		}

		//NEW AJAX URL FOR TAIWAN CSTEAM END
		param = 'q={$and:[{"custmasterstring":{$regex:"/' + encodeURIComponent( searchKeyword ) + '/i"}},{$or:[{"recrdflag":{$eq:"A"}},{"recrdflag":{$exists:false}}]},{$or:[{"control_flag":{$eq:"Y"}},{"control_flag":{$exists:false}}]}]}&orderby=customer_name:asc';

		ua = window.navigator.userAgent;
		if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0){ // If Internet Explorer, return version number
			param = 'q={$and:[{%22custmasterstring%22:{$regex:%22/' + encodeURIComponent( searchKeyword ) + '/i%22}},{$or:[{%22recrdflag%22:{$eq:%22A%22}},{%22recrdflag%22:{$exists:false}}]},{$or:[{%22control_flag%22:{$eq:%22Y%22}},{%22control_flag%22:{$exists:false}}]}]}&orderby=customer_name:asc';			
		}
		
	}

	$.ajax({
		url: ajaxUrl,
		data:param
	}).done(function( response ) {

			var data = response.items;
			$.each(data, function(i, item) {
				var subDataSet = [ 
									"", 
									item.customer_soldto_id, 
									item.customer_shipto_id, 
									item.customer_name, 
									item.customer_corp_group, 
									item.cust_shpto_add1, 
									item.cust_shpto_addr2, 
									item.customer_ship_phone,
									item.customer_shpto_pcode 
								];

								if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
					subDataSet = [
									"", //number
									item.customer_sold_to_id, 	//1 SOLD TO ID
									item.customer_name, 		//2 SOLD TO NAME
									item.customer_shipto_id,	//3 SHIP TO ID
									item.cust_name_shipto,		//4 SHIP TO NAME
									item.address_1_shipto,		//5 SHIP TO ADDRESS 1
									item.address_2_shipto,		//6 SHIP TO ADDRESS 2
									item.address_4_shipto,		//7 SHIP TO DISTRICT
									item.city_shipto,			//8 SHIP TO CITY
									item.postalcode_shipto,		//9 SHIP TO POSTAL Code
									item.customer_bill_to_id,	//10 BILL TO ID
									item.cust_name_billto,		//11 BILL TO NAME
								];
				}else if( window.check_country("PH") ){
					subDataSet = [
									"", //number
									item.customer_soldto_id, 	//SOLD TO ID
									item.customer_shipto_id, 	//SHIP TO ID
									item.customer_name, 		//CUSTOMER NAME
									item.customer_corp_group, 	//CORP. GROUP
									item.address_1, 			//SOLD TO ADDRESS1
									item.address_2, 			//SOLD TO ADDRESS2
									item.phone, 				//SOLD TO PHONE
									item.postal_code, 			//SOLD TO POSTAL CODE
									item.address_1_shipto, 		//SHIP TO ADDRESS1
									item.address_2_shipto, 		//SHIP TO ADDRESS2
									"", 						//SHIP TO NAME
									item.PostalCode_ShipTo, 	//SHIP TO POSTAL CODE
								];
				}

				/*if(userCountry === 'PH'){
					 subDataSet = [ "", item.customer_soldto_id, item.customer_name, item.customer_corp_group, item.cust_shpto_add1, item.cust_shpto_addr2, item.customer_ship_phone, item.customer_shpto_pcode];
				}*/
				/*if(userCountry === 'TW'){
					//console.log(item);
					subDataSet = [ "", item.customer_sold_to_id , item.customer_name, item.customer_shipto_id, item.cust_name_shipto, item.customer_bill_to_id, item.cust_name_billto];
				}*/

				dataSet.push(subDataSet);

			});

			// searchCustList(dataSet);
	}).always(function(response){
            searchCustList(dataSet);
    });

};

var searchCustList = function(dataSet, seachCustomer) {

		var zPUserType = js2('#zPUserType').val();

		var userCountry =  userDetectFunc();

		var firstDrawData = true;
		
		if (zPUserType !== 'CSTeam') {
			// console.log('split table');
			dataSet = dataSet.replace("null","");
			var custArr = dataSet.split("##");
			
			var totalRecs = custArr.length;
			var fromIndex = 0;
			var toIndex = totalRecs;
			var dataSet = [];

			for(var i = fromIndex; i< toIndex;i++){
				colArr = custArr[i].split("$$");
				
				if(typeof colArr != 'undefined' ){
					//console.log(' colArr value 2.0 colArr[14] =====>>>>>> ', colArr[14])
					//console.dir(colArr);
					var subDataSet = null;

					if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
						if( zPUserType.toLowerCase() == "principal" ){
							subDataSet = [ 	'',
											colArr[0],  //1 PRINCIPAL CUST CODE
											colArr[1],  //2 SOLD TO ID
											colArr[3],  //3 SOLD TO NAME
											colArr[2],  //4 SHIP TO ID
											colArr[14], //5 SHIP TO NAME
											colArr[18], //6 SHIP TO ADDRESS 1
											colArr[19], //7 SHIP TO ADDRESS 2
											colArr[21], //8 SHIP TO DISTRICT
											colArr[23], //9 SHIP TO CITY
											colArr[22], //10 SHIP TO POSTAL CODE
											colArr[15], //11 BILL TO ID
											colArr[16], //12 BIILL TO NAME
										];
						}
						if( zPUserType.toLowerCase() == "salesrep" ){
							subDataSet = [ 	'',
											colArr[0],  //1 SOLD TO ID
											colArr[2],  //2 SOLD TO NAME
											colArr[1],  //3 SHIP TO ID
											colArr[13], //4 SHIP TO NAME
											colArr[17], //5 SHIP TO ADDRESS 1
											colArr[18], //6 SHIP TO ADDRESS 2
											colArr[20], //7 SHIP TO DISTRICT
											colArr[22], //8 SHIP TO CITY
											colArr[21], //9 SHIP TO POSTAL CODE
											colArr[14], //10 BILL TO ID
											colArr[15], //11 BIILL TO NAME
										];
						}
					} else if( window.check_country("PH") ){
						// console.log(colArr);
						subDataSet = [ 	'',
											colArr[0],  //SOLD TO ID
											colArr[1],  //SHIP TO ID
											colArr[2],  //CUSTOMER NAME
											colArr[3],  //CORP.NAME
											colArr[4],  //SOLD TO ADDRESS1
											colArr[5],  //SOLD TO ADDRESS2
											colArr[6],  //SOLD TO PHONE
											colArr[7],  //SOLD TO POSTAL CODE
											colArr[15], //SHIP TO ADDRESS1
											colArr[16], //SHIP TO ADDRESS2
											'', //SHIP TO PHONE
											colArr[19],  //SHIP TO POSTAL CODE
											colArr[14],
										];
					}else{
						subDataSet = [
										'', 
										(colArr[0] != null)? colArr[0] : "", 
										(colArr[1] != null)? colArr[1] : "", 
										(colArr[2])? colArr[2] : "", 
										(colArr[3])? colArr[3] : "", 
										(colArr[4])? colArr[4] : "", 
										(colArr[5])? colArr[5] : "", 
										(colArr[6])? colArr[6] : "", 
										(colArr[7])? colArr[7] : ""
									];
					}

					/*if(userCountry === 'TW'){
						subDataSet = ['', colArr[0], colArr[1], colArr[3], colArr[2], colArr[14], colArr[15], colArr[16]];
						if (zPUserType !== 'Principal') {
							subDataSet.splice(1,1)
						}
					}else if(userCountry === 'PH'){
						subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4], colArr[5], colArr[6], colArr[7],colArr[14]];
					}
					else{
						subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4], colArr[5], colArr[6], colArr[7]];
					}*/
					
					dataSet.push(subDataSet);
				}

			}
		}
		var userColumn = [];

		// userColumn = [];
		if( window.check_country("TW") || window.check_country("PH") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
	    	userColumn.push( { title: "" } );

	    	coloumn = $("#applicableColumnsForCustomerSearch").val().split("$$");

	    	coloumn.forEach(function(nameColoumn, index){
	    		if(typeof nameColoumn != 'undefined' ){
	    			userColumn.push( {title: nameColoumn} );
	    		}
	    	});
		}else{
			userColumn = [
				{ title: "" },
				{ title: "Sold To ID" },
				{ title: "Ship To ID" },
				{ title: "Customer Name" },
				{ title: "Corp. Group" },
				{ title: "Address1." },
				{ title: "Address2." },
				{ title: "Phone" },
				{ title: "Postal Code" },
			];
		}
		
        /*if(userCountry === 'TW'){
        	
			userColumn = [
				{ title: "" },
				{ title: "CCR Code" },
				{ title: "Sold To Id" },
				{ title: "Sold To Name" },
				{ title: "Ship To Id" },
				{ title: "Ship To Name" },
				{ title: "Bill To Id" },
				{ title: "Bill To Name" },			
			];
			if (zPUserType !== 'Principal') {
				userColumn.splice(1,1)
			}
			
		}else{
			userColumn = [
				{ title: "" },
				{ title: "Sold To ID" },
				{ title: "Ship To ID" },
				{ title: "Customer Name" },
				{ title: "Corp. Group" },
				{ title: "Address1." },
				{ title: "Address2." },
				{ title: "Phone" },
				{ title: "Postal Code" },
			];
			
		}*/	
		
		//console.error(userCountry);
		/*if(userCountry === 'PH'){
			console.log('removed ship to id');
			userColumn.splice(2,1);
		}*/
		var i = 0;
		seachCustomer = js2('#searchCustomer').DataTable({
		destroy: true,
		scrollY: "400px",
		scrollCollapse: true,
		data: dataSet,
		deferRender: true,
		order: [[3, 'asc']],
		columns: userColumn,
		columnDefs: [
			{
				targets: 0,
				searchable: true,
				orderable: false,
				render: function(data, type, full, meta){

					//console.log(' selected CUSTOMER =====>>>>>>>>', full[2]+ '$$' + full[4] + '$$' +full[6]);
					//console.warn('full',full);
					// console.dir(full);
					if(full != null){
						if(type === 'display'){
							if( window.check_country("PH") ){
								var disabled = '';
								/*if(full[9]=='Y'){
									disabled = 'disabled';
								}*/
								if(full[13] == "Y"){
									disabled = "disabled";
								}
								data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '" data-suspended="' + full[13] + '" data-customersold="'+full[1]+'" '+disabled+'>';
							} 
							else if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){

								//FORMAT soldtoid$$shiptoid$$billtoid
								if( zPUserType == "Principal" ){
									data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2]+ '$$' + full[4] + '$$' +full[11] +'">';
								}else{
									data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[10] +'">';
								}
								//data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[2] + '$$' +full[15] +'">';
								// if (zPUserType !== 'Principal') {
								// 	data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[8] + '$$' +full[10] +'">';
								// }
								
							}else{
								data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
							}
						}

					}

					 return data;
				}
			}
		],
		
		"fnDrawCallback": function (oSettings) {

			$( $("#searchCustomer_wrapper").find(".dataTable")[0] ).css("table-layout", "fixed");

			if(userCountry == "PH"){
				$($("#searchCustomer").find("tbody").children("tr")).each(function(index, data){
				  var isDisabled = $(data).find("input[type='radio']").attr("disabled");
				  if(isDisabled == "disabled"){
					$(data).css("background-color", "#C7C7C7");
				  }
				});
			}

			console.log("draw dt");
			$("input[name='searchCust']").off();
		    $("input[name='searchCust']").on('click', function() {

				var selectCustomerSoldID = function(customersold){
					// console.log( "input[name='searchCust']", customersold);
					$("#selectedCustomerSoldtoID").val( customersold );
					// console.log("#selectedCustomerSoldtoID", $("#selectedCustomerSoldtoID").val() );
				}

				if(userCountry == "PH"){
					selectCustomerSoldID( $(this).data("customersold") );
				}
				// alert("Debugger on going, please dont make an issue");
	             //console.log('777.111111 ===>>> ',$(this).val());
				delete_line_item_func($(this).val());

			});

			/*if(userCountry === 'PH'){
				$('.dataTables_scrollHeadInner').css('width','125%').find('table.dataTable').css('width','100%').find('th').css('text-align','left');
				$('.dataTables_scrollBody').css('width','125%');
				$('#searchCustomer tr').each(function(){					
					if($(this).find('td:eq(0) input[type="radio"]').prop('disabled')){
						$(this).css('background-color','#DCDCDC');
					} 
				});
			} else if(userCountry === 'TW'){
				$('.dataTables_scrollHeadInner').css('width','125%').find('table.dataTable').css('width','100%').find('th').css('text-align','left');
				$('.dataTables_scrollBody').css('width','125%');
				if (zPUserType == 'Principal') {
					$('.dataTables_scrollHeadInner').css('width','140%').find('table.dataTable').css('width','100%').css('text-align','left');
					$('.dataTables_scrollBody').css('width','140%');
				}
			}*/
		},

		});

		// seachCustomer.on( 'draw', function () {

		// 	console.log("draw dt");
		// 	$("input[name='searchCust']").off();
		//     $("input[name='searchCust']").on('click', function() {
		// 		 //console.log('777.111111 ===>>> ',$(this).val());
		// 		var selectCustomerSoldID = function(){
		// 			//FORMAT soldtoid$$shiptoid$$billtoid
		// 			console.log( $(this) );
		// 			console.log( "input[name='searchCust']", $(this).data("customersold"), $(this).val() );					
		// 			$("#selectedCustomerSoldtoID").val( $(this).data("customersold") );
		// 			console.log("#selectedCustomerSoldtoID", $("#selectedCustomerSoldtoID").val() );
		// 		}

		// 		console.log(userCountry);
				
		// 		if(userCountry == "PH"){
		// 			selectCustomerSoldID();
		// 		}
		// 		alert("Debugger on going, please dont make an issue");
		// 		return true;
		// 		delete_line_item_func($(this).val());
				
		// 	});

		// } );

		js2('#searchCustomerInput').keyup(function(){
			var inputLength = js2('#searchCustomerInput').val().length;
			
			var ruleMaxChar = ( !window.check_country("TW") )? 3 : 2;

			if( inputLength === ruleMaxChar || inputLength > ruleMaxChar ) {
				// console.log('show table');
				/*
				    Start : 15 Nov 2017
				    Task  : Customer Type-ahead Search
				    Page  : shopping cart 
				    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
				    Layout : Tablet
				*/
				
				var keywordCustomer = js2(this).val().replace(/%/gi, " ").trim();
				seachCustomer.search('');
				seachCustomer.search(keywordCustomer, true, true).order([3, 'asc']).draw();
				/*
				    End : 15 Nov 2017
				    Task  : Customer Type-ahead Search
				    Page  : shopping cart 
				    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
				    Layout : Tablet
				*/
				js2('.search-cust_wrapper').show();

				var customerName = $($(".dataTables_scroll").find("thead")[0]).find("th")[3]; // for trigger customer name sorting
					
				if(firstDrawData){
					$(customerName).click();
					firstDrawData = false;
				}

			} else {
				js2('.search-cust_wrapper').hide();
			}
		});
		
};

// COMMERCE JS START
var searchCustomerList = function(seachCustomer) {
	// console.log('searchCustomerList', js2);
	var timer;

	$("#searchCustomerInput").click(function() {
		var inputLength = $('#searchCustomerInput').val().length;
		
		clearTimeout(timer);
		timer = setTimeout(function() { //then give it a second to see if the user is finished

			var ruleMaxChar = 3;
				
				if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
					ruleMaxChar = 2;
				}

			if (inputLength === ruleMaxChar || inputLength > ruleMaxChar ) {
				//ajax
				// if(!check_nationality(2800)){
					// loadAjax();						
				// }
				setTimeout( function(){
					$('.search-cust_wrapper').show();
				}, 1000);
				// seachCustomer.search($(this).val()).draw();

			} else {
				//console.log('hide table');
				$('.search-cust_wrapper').hide();

			}
		}, 1000);
			
			/* if( inputLength === 3 || inputLength > 3 ) {
				//console.log('click');
				$('.search-cust_wrapper').show();
			} */
	});

	var zPUserType = $('#zPUserType').val();

	if (zPUserType === 'CSTeam') {

		var globalTemplateFlag = ($("span[id*='globalTemplateFlag']").html().toLowerCase() == 'true')? true : false;
		
		$('#searchCustomerInput').keyup(function(){

			var inputLength = $('#searchCustomerInput').val().length;

			// console.log('keyup', inputLength);
			clearTimeout(timer);
			timer = setTimeout(function() { //then give it a second to see if the user is finished

				var ruleMaxChar = 3;
				
				if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
					ruleMaxChar = 2;
				}

				if (inputLength === ruleMaxChar || inputLength > ruleMaxChar ) {
					//ajax
						loadAjax();
					setTimeout( function(){
						$('.search-cust_wrapper').show();
					}, 1000);
					// seachCustomer.search($(this).val()).draw();

				} else {
					//console.log('hide table');
					$('.search-cust_wrapper').hide();

				}
	    	}, 1000);

			
		});

		if(globalTemplateFlag && (window.check_country("TH") || window.check_country("VN") || window.check_country("MY")) ){
			$('#searchCustomerInputNew').keyup(function(){

				var inputLength = $('#searchCustomerInputNew').val().length;
	
				// console.log('keyup', inputLength);
				clearTimeout(timer);
				timer = setTimeout(function() { //then give it a second to see if the user is finished
	
					var ruleMaxChar = 3;
					
					if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
						ruleMaxChar = 2;
					}
	
					if (inputLength === ruleMaxChar || inputLength > ruleMaxChar ) {
						//ajax
							loadAjax();
						setTimeout( function(){
							$('.search-cust_wrapper').show();
						}, 1000);
						// seachCustomer.search($(this).val()).draw();
	
					} else {
						//console.log('hide table');
						$('.search-cust_wrapper').hide();
	
					}
				}, 1000);
	
			});
		}

	}

	$(document).mouseup(function(e) {
		var searchInput = $("#searchCustomerInput");
		var searchResult = $(".search-cust_wrapper");

		if ( (!searchInput.is(e.target) && searchInput.has(e.target).length === 0) && (!searchResult.is(e.target) && searchResult.has(e.target).length === 0) ) {
					// console.log('can hide');
			$('.search-cust_wrapper').hide();
		}
	});

};

var showCustomerList = function(customerDetails) {

	var custArr = customerDetails.split("##");
	var totalRecs = custArr.length;
	var fromIndex = 0;
	var toIndex = totalRecs;
	var dataSet = [];

	for(var i = fromIndex; i< toIndex;i++){
		colArr = custArr[i].split("$$");
		console.dir(colArr);
		var subDataSet;

		if( window.check_country("PH") )
		{
			subDataSet = ['', colArr[2], colArr[0], colArr[1], colArr[3]];
		}else if ( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ) {
			subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4]];
		}else{
			subDataSet = ['', colArr[2], colArr[0], colArr[1], colArr[3]];
		}
		
		dataSet.push(subDataSet);
	}
	//console.log(dataSet);
	var columnTopCustList = [
		{title: "" },
		{ title: "Sold to ID" },
		{ title: "Ship to ID" },
		{ title: "Customer Name" },
		{ title: "Address1" }
	];

	if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
		columnTopCustList = [
			{title: "" },
			{ title: "Sold to ID" },
			{ title: "Sold to Name" },
			{ title: "Ship to ID" },
			{ title: "Ship to Name" },
			{ title: "Bill to ID" }
		];
	}

	if( window.check_country("PH") ){
		columnTopCustList = [
			{title: "" },
			{ title: "Sold to ID" },
			{ title: "Ship to ID" },
			{ title: "Customer Name" }
		];
	}

	var topCustomerList =  js2('#topCustomerList').DataTable({
		//scrollY: "400px",
		//scrollCollapse: true,
		data: dataSet,
		deferRender: true,
		order: [[1, 'asc']],
		columnDefs: [
			{
				targets: 0,
				searchable: false,
				orderable: false,
				render: function(data, type, full, meta){
						 //console.log('full', full);
					 if(type === 'display'){

						var userCountry =  userDetectFunc();

						////////////
						if(userCountry === 'PH'){
							console.log("PH - topCust");
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2] + '" data-customersold="' + full[1] +'" >';
						}else if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
							 //console.log(' 88 TW ======>>>> ',full[2]+ '$$' + full[4] + '$$' +full[6]);
								//FORMAT soldtoid$$shiptoid$$billtoid
							console.log(full);
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[5] +'" >';			
														
						}else{
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2] + '" >';
						}
						////////////
					 }

					 return data;
				}
			}
		],
		columns: columnTopCustList

	});
	/*
    Start : 11 Dec 2017
    Task  : Delete line items if customer is changed.
    Page  : Shopping cart 
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Both
	*/
	
	changeCust();
	/*
	    End : 11 Dec 2017
	    Task  : Delete line items if customer is changed.
	    Page  : Shopping cart 
	    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
	    Layout : Both
	*/
	$("input[name='topCust']").on('click', function(e) {
			

			/*
		    Start : 11 Dec 2017
		    Task  : Delete line items if customer is changed.
		    Page  : Shopping cart 
		    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
		    Layout : Both
			*/

			var selectCustomerSoldID = function (customersold) {
				$("#selectedCustomerSoldtoID").val(customersold);
			}

			if (userCountry === "PH") {
				selectCustomerSoldID($(this).attr("data-customersold"));
			}

            delete_line_item_func($(this).val());
            /*
			    End : 11 Dec 2017
			    Task  : Delete line items if customer is changed.
			    Page  : Shopping cart 
			    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
			    Layout : Both
			*/
            /*
			var selectedCustShipID = $(this).val();
            $("#selectedCustomerDetail").val(selectedCustShipID);
			// console.log('showCustomerList selectedCustomerDetail value', $("#selectedCustomerDetail").val());
			$("#customerMasterString_t").val("");
			setTimeout(function(){
					$("#save").click();
			}, 500);

			*/
            

			// console.log("showCustomerList selectedCustShipID", selectedCustShipID);
			
	});


};

// var setCookie = function(cname, cvalue, exdays) {
       // document.cookie = cname + "=" + cvalue;
// };
// var getCookie = function(cname) {
    // var name = cname + "=";
    // var decodedCookie = decodeURIComponent(document.cookie);
    // var ca = decodedCookie.split(';');
    // for(var i = 0; i <ca.length; i++) {
        // var c = ca[i];
        // while (c.charAt(0) == ' ') {
            // c = c.substring(1);
        // }
        // if (c.indexOf(name) == 0) {
            // return c.substring(name.length, c.length);
        // }
    // }
    // return "";
// };