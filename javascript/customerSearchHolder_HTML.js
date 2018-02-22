var customer_master_string = "";
var js2 = jQuery.noConflict();
var pagetitle;
 
$(document).ready(function(js2){


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
				$("#edit_shopping_cart").click();
			}
			
		}, 1000);

	});

	$('input[name="customerPORef_t"], textarea[name="orderingRequestNoMoreThan90Characters_t"], input[name*="comment_l"]').bind('change', function(){
		$('input[name="saveQuoteRequired_t"]').val('Yes');
		console.log('saveQuoteRequired_t');

	});
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
		var topCustomerWrapper = '<div class="customer-search-holder"><div class="search-input-wrapper"><p>Search all customers</p><input type="text" id="searchCustomerInput" autocomplete="off" placeholder="Please enter minimum 3 character"></div><div class="search-cust_wrapper"><table id="searchCustomer" width="100%"></table></div><div class="top-cust_wrapper"><p>Top 10 Frequent customers</p><table id="topCustomerList" class="display" width="100%"></table></div></div>';

		$("#attr_wrapper_1_customerSearchHolder_HTML").html(topCustomerWrapper);

		var zPUserType = $('#zPUserType').val();
		if (zPUserType === 'CSTeam') {
			//loadAjax();
			searchCustomerList();

		} else {

			if( $('#customerMasterString_t').length ){
				//var customerDetails = $("#actualMasterString").html();
				var customerDetails = $("#customerMasterString_t").val();
                 //console.log('customerDetails  PR 1.0  =====>>>>>>> ', customerDetails);
				if(customerDetails === "" && $('#fileAttachmentBSID_t').val() == "") {
					return true;
				} else {
						
					//var transactionId = $("input[name='id']","form[name='bmDocForm']").val();
					//setCookie(transactionId+"custData",customerDetails);
					//var custData = getCookie(transactionId+"custData");
					//if(custData !=undefined || custData !=null || custData != ""){
					//}
					var seachCustomer;
					customer_master_string = customerDetails;
					//$("#customerMasterString_t").val("");

					// searchCustomerList();

					searchCustList(customerDetails, seachCustomer);
				    searchCustomerList(seachCustomer);
					/*if($('#fileAttachmentBSID_t').length > 0){
						if($('#fileAttachmentBSID_t').val() != ""){
							$.ajax({
								
								type: "GET",
								url: "/rest/v1/commerceProcesses/oraclecpqo/transactions/"+$('#fileAttachmentBSID_t').val()+"/attachments/importMaterials?docId=36244074&docNum=1",
								dataType: "text"
								
							}).done(function(response) {
								//$("#customerMasterString_t").val(data);
								//$("#document-form").append("<div id ='ajaxdata'>"+data+"</div>");
								customerDetails = response;
								console.log("--------executed-----------"+response);
							}).always(function(response){
								searchCustList(customerDetails, seachCustomer);
								searchCustomerList(seachCustomer);

							});
						}else{
							searchCustList(customerDetails, seachCustomer);
							searchCustomerList(seachCustomer);
						}
						
					}else{
							searchCustList(customerDetails, seachCustomer);
							searchCustomerList(seachCustomer);
					}*/
					
					
					$('.search-cust_wrapper').hide();
					// console.log('customerDetails', customerDetails);
				}

			}
		}


		//showCustomerList();
		//if( $('#actualMasterString').length ) {

		if( $('#frequentlyAccessedCustomers_t').length ) {
			var customerDetails = $("#frequentlyAccessedCustomers_t").val();
			//console.log('frequentlyAccessedCustomers_t customerDetails  PR 1.0  =====>>>>>>> ', customerDetails);
			if(customerDetails == ""){
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
		sessionStorage.setItem('selectedCustShipID', null);
		$("#selectedCustomerDetail").val(newCustId);
		$("#customerMasterString_t").val("");
		setTimeout(function(){
				$("#save").click();
		}, 500);
	}
};
var delete_line_item_func = function(selectedCustShipID){

	//console.error('userDetectFunc',userDetectFunc());

	if(userDetectFunc() === 'TW'){
		var selectedCustShipID_TW = selectedCustShipID;
	}
	
	//VMLSINOZP-61 START
	var selectedCustShipID = parseInt(selectedCustShipID);
	
	//parseInt($("span[id*=customerSoldToId_t]").text())
	var currentCust = parseInt($("span[id*=customerShipToId]").text());
	var line_items_no = $('input[type="checkbox"][name="_line_item_list"]').length;
	//console.log('selectedCustShipID',selectedCustShipID);
	//console.log('currentCust',currentCust);
	if(userDetectFunc() === 'TW'){
		console.log('selectedCustShipID_TW',selectedCustShipID_TW);
		//return false;
	}
	if((selectedCustShipID != currentCust) && (selectedCustShipID>0) && (currentCust>0) && (line_items_no>0)) {
		
		if(confirm('The line items will be deleted from order on change of customer. Do you want to proceed?.')){

			//document.cookie = "selectedCustShipID="+selectedCustShipID;	
			sessionStorage.setItem('selectedCustShipID', selectedCustShipID);
			if(userDetectFunc() === 'TW'){
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
		if(userDetectFunc() === 'TW'){
			$("#selectedCustomerDetail").val(selectedCustShipID_TW);
			//return false;
		}
		// console.log('showCustomerList selectedCustomerDetail value', $("#selectedCustomerDetail").val());
		$("#customerMasterString_t").val("");
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
	var dataSet = [];
	var ajaxUrl = "https://"+sub+".bigmachines.com/rest/v3/customCustomer_Master";
	//NEW AJAX URL FOR TAIWAN CSTEAM START
	if(userCountry === 'TW'){
		ajaxUrl = "https://"+sub+".bigmachines.com/rest/v3/customCustomer_Master_2800";
	}
	//NEW AJAX URL FOR TAIWAN CSTEAM END
	var param = 'q={"custmasterstring":{$regex:"/' + encodeURIComponent($("#searchCustomerInput").val()) + '/i"}}&orderby=customer_name:asc';
	var ua = window.navigator.userAgent;
   //	console.log("ua====="+ua);
    if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0){ // If Internet Explorer, return version number
		
		param = 'q={%22custmasterstring%22:{$regex:%22/' + encodeURIComponent($("#searchCustomerInput").val()) + '/i%22}}&orderby=customer_name:asc';
	}
	//console.log("param====="+param);
	$.ajax({
	   //url: 'https://zuelligpharmatest1.bigmachines.com/rest/v3/customCustomer_Master?q={"contact_firstname":"Biomedical Science Institutes"}',
		url: ajaxUrl,
		data:param
		//data:'q={"custmasterstring":{$regex:"/' + encodeURIComponent($("#searchCustomerInput").val()) + '/i"}}&orderby=customer_name:asc'
	  //data:"q={'custmasterstring':{$regex:'/" + encodeURIComponent($('#searchCustomerInput').val()) + "/i'}}&orderby=customer_name:asc"		
//		data:"q={'custmasterstring':{$regex:'/^"+$('#searchCustomerInput').val()+"$/i'}}"
	}).done(function( response ) {

			var data = response.items;
			//console.log('data', data);
			$.each(data, function(i, item) {
				var subDataSet = [ "", item.customer_soldto_id, item.customer_shipto_id, item.customer_name, item.customer_corp_group, item.cust_shpto_add1, item.cust_shpto_addr2, item.customer_ship_phone, item.customer_shpto_pcode ];

				/*if(userCountry === 'PH'){
					 subDataSet = [ "", item.customer_soldto_id, item.customer_name, item.customer_corp_group, item.cust_shpto_add1, item.cust_shpto_addr2, item.customer_ship_phone, item.customer_shpto_pcode];
				}*/
				if(userCountry === 'TW'){
					//console.log(item);
					subDataSet = [ "", item.customer_sold_to_id , item.customer_name, item.customer_shipto_id, item.cust_name_shipto, item.customer_bill_to_id, item.cust_name_billto];
				}

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
				//console.log(' colArr value 2.0 colArr[14] =====>>>>>> ', colArr[14])
				//console.dir(colArr);
				var subDataSet = null;
				if(userCountry === 'TW'){
					subDataSet = ['', colArr[0], colArr[1], colArr[3], colArr[2], colArr[14], colArr[15], colArr[16]];
					if (zPUserType !== 'Principal') {
						subDataSet.splice(1,1)
					}
				}else if(userCountry === 'PH'){
					subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4], colArr[5], colArr[6], colArr[7],colArr[14]];
				}
				else{
					subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4], colArr[5], colArr[6], colArr[7]];
				}
				
				dataSet.push(subDataSet);
			}

			js2('#searchCustomerInput').keyup(function(){
				var inputLength = js2('#searchCustomerInput').val().length;
				if( inputLength === 3 || inputLength > 3 ) {
					// console.log('show table');
					/*
					    Start : 15 Nov 2017
					    Task  : Customer Type-ahead Search
					    Page  : shopping cart 
					    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
					    Layout : Tablet
					*/
					seachCustomer.search(js2(this).val()).draw();
					/*
					    End : 15 Nov 2017
					    Task  : Customer Type-ahead Search
					    Page  : shopping cart 
					    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
					    Layout : Tablet
					*/
					js2('.search-cust_wrapper').show();
				} else {
					js2('.search-cust_wrapper').hide();
				}
			});
		}
		var userColumn = null;
		
        if(userCountry === 'TW'){
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
			
		}
			
		
		//console.error(userCountry);
		/*if(userCountry === 'PH'){
			console.log('removed ship to id');
			userColumn.splice(2,1);
		}*/
		seachCustomer = js2('#searchCustomer').DataTable({
		destroy: true,
		scrollY: "400px",
		scrollCollapse: true,
		data: dataSet,
		deferRender: true,
		order: [[3, 'asc']],
		columnDefs: [
			{
				targets: 0,
				searchable: true,
				orderable: false,
				render: function(data, type, full, meta){

					//console.log(' selected CUSTOMER =====>>>>>>>>', full[2]+ '$$' + full[4] + '$$' +full[6]);
					//console.warn('full',full);
					//console.dir(full);
					 if(type === 'display'){
						if(userCountry === 'PH'){
							var disabled = '';
							if(full[9]=='Y'){
								disabled = 'disabled';
							}
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1] + '" data-suspended="' + full[9] + '" '+disabled+'>';
						} 
						else if(userCountry === 'TW'){
							//alert(' 222 =====>>>> TW TW', full[2]+ '$$' + full[4] + '$$' +full[6]);
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2]+ '$$' + full[4] + '$$' +full[6] +'">';
						
							//data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[2] + '$$' +full[15] +'">';
							if (zPUserType !== 'Principal') {
								data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[5] +'">';
							}
							
						}else{
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
						}
					 }

					 return data;
				}
			}
		],
		
		"fnDrawCallback": function (oSettings) {
			if(userCountry === 'PH'){
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
			}
		},
		columns: userColumn

	});

	js2('#searchCustomer_wrapper').on('click', 'input[name="searchCust"]', function() {
		   //console.log('777 ===>>> ',$(this).val());
			delete_line_item_func($(this).val());
	});
	//var searchCust99 = seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).order([3, 'asc']).draw();

	// var searchCust99 = seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).order([3, 'asc']).draw();
	var searchCust99 = seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).draw();
	var info = searchCust99.page.info();
	//console.dir(info.recordsDisplay);//recordsTotal
	if(info.recordsDisplay===0){
		//console.error('zero result');
		//var allsearch = seachCustomer.destroy().search($('#searchCustomerInput').val()).draw();
		//$('.search-cust_wrapper').show();
		//console.info(allsearch);
		seachCustomer2 = js2('#searchCustomer').DataTable({
		destroy: true,
		scrollY: "400px",
		scrollCollapse: true,
		data: dataSet,
		deferRender: true,
		// order: [[1, 'asc']],
		columnDefs: [
			{
				targets: 0,
				searchable: true,
				orderable: false,
				render: function(data, type, full, meta){
					//console.warn('full',full);
					
					//console.dir(full);
					// console.log('full', full[2]);
					//console.log(' selected CUSTOMER 22 =====>>>>>>>>', full[2]+ '$$' + full[4] + '$$' +full[6]);
					 if(type === 'display'){
						if(userCountry === 'PH'){
							var disabled = '';
							if(full[9]=='Y'){
								disabled = 'disabled';
							}
							//data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1] + '" '+disabled+'>';
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1] + '" data-suspended="' + full[9] + '" '+disabled+'>';
						}else if(userCountry === 'TW'){
							 //console.log(' 88 TW ======>>>> ',full[2]+ '$$' + full[4] + '$$' +full[6]);
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2]+ '$$' + full[4] + '$$' +full[6] +'">';	
							//data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[2] + '$$' +full[15] +'">';								
							if (zPUserType !== 'Principal') {
								data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[5] +'">';
							}							
						}else{
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
						}
					 }

					 return data;
				}
			}
		],
		columns: userColumn

	});
		//changeCust();
		$("input[name='searchCust']").on('click', function() {
             //console.log('777.111111 ===>>> ',$(this).val());
			delete_line_item_func($(this).val());
			
		});
	}
	//console.warn(searchCust99.data().count());
	/*if(searchCust99.data().count()>0){
		seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).draw();
	}*/
	//console.dir(seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).data().count());


};

// COMMERCE JS START
var searchCustomerList = function(seachCustomer) {
	// console.log('searchCustomerList', js2);
	var timer;

	$("#searchCustomerInput").click(function() {
		var inputLength = $('#searchCustomerInput').val().length;
		if( inputLength === 3 || inputLength > 3 ) {
			//console.log('click');
			$('.search-cust_wrapper').show();

		}
	});

	var zPUserType = $('#zPUserType').val();
	if (zPUserType === 'CSTeam') {
		$('#searchCustomerInput').keyup(function(){

			var inputLength = $('#searchCustomerInput').val().length;

			// console.log('keyup', inputLength);
			clearTimeout(timer);
			timer = setTimeout(function() { //then give it a second to see if the user is finished
				if( inputLength === 3 || inputLength > 3 ) {
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
		//console.dir(colArr);
		var subDataSet;
		if(custArr.length > 2){
			//console.log("  IF part 2222 ====>>>>> ", dataSet);
			if(userDetectFunc() === 'TW'){
				subDataSet = ['', colArr[0], colArr[1],colArr[2], colArr[3]];
			}else{
				subDataSet = ['', colArr[2], colArr[0], colArr[1], colArr[3]];
			}
		}else{
			//console.log("  else part 333====>>>>> ", dataSet);
			subDataSet = ['', colArr[0], colArr[1],"",""];
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

	if(userDetectFunc() === 'TW'){
		columnTopCustList = [
			{title: "" },
			{ title: "Sold to ID" },
			{ title: "Sold to Name" },
			{ title: "Ship to ID" },
			{ title: "Ship to Name" }
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
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[1] + '>';
						}else if(userCountry === 'TW'){
							 //console.log(' 88 TW ======>>>> ',full[2]+ '$$' + full[4] + '$$' +full[6]);
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2]+ '$$' + full[4] + '$$' +full[6] +'">';			
														
						}else{
							data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2] + '">';
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