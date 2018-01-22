/** * @version Fri Dec  2 14:43:33 2011  **/
/*created by suresh yagnam*/

//require(["/bmfsweb/zuelligpharmatest1/image/javascript/jquery-ui.min.js",
//  "/bmfsweb/zuelligpharmatest1/image/javascript/jquery-ui.js"], function() {
require([], function() {
	//this function runs when the page loads
  /*var loginBoxClose = function(){
	$("#dropShadowPopUp").hide();
  }*/
  /*var dumpSelectedRow = function(obj){
		var trObj = obj.parentNode.parentNode;
		var tableObj = document.getElementById("selectedMatTableBody");
		var clonedTrObj =  trObj.cloneNode(true);
		clonedTrObj.deleteCell(0);
		var colObj = clonedTrObj.insertCell(-1);
		colObj.innerHTML = "<a href='#' class = 'selected-remove'> <a>";
		colObj.onclick = function(){
			var tableObj1 = document.getElementById("selectedMatTableBody");
			var rowIndex = this.parentNode.rowIndex;
			tableObj1.deleteRow(rowIndex-1);
		};
		tableObj.appendChild(clonedTrObj);
  }*/
  /*var showCustomerPopup = function(){
		try{	
			var tableObj = document.getElementById("dropShadowPopUp");
			tableObj.style.display = "block";
			if($("#dropShadowPopUp").attr("clicked") === undefined){
				$("#dropShadowPopUp").attr("clicked","");
			}else{
				return true;
			}
			var customerDetails = $("#actualMasterString").html();
			var custArr = customerDetails.split("##");
			var totalRecs = custArr.length;
			var fromIndex = 0;
			var toIndex = totalRecs;
			var dataSet = [];
			for(var i = fromIndex; i< toIndex;i++){				
				colArr = custArr[i].split("$$");
				var subDataSet = ["",colArr[0],colArr[1],colArr[2],colArr[3],colArr[4],colArr[5],colArr[6],colArr[7],colArr[8],colArr[9],colArr[10],colArr[11],colArr[12],colArr[13]];
				dataSet.push(subDataSet);			
			
			}
			$('#resultsTable').DataTable( {
				scrollY: "400px",
				scrollCollapse: true,
				data: dataSet,
				order: [[1, 'asc']],
				columnDefs: [
					{ 
						targets: 0,
						searchable: false,
						orderable: false,
						render: function(data, type, full, meta){
						   if(type === 'display'){
							  data = '<input type="radio" name="selectMat" id= "selectMat">';      
						   }

						   return data;
						}
					}
				],
				columns: [
					{ title: "" },
					{ title: "Customer Name" },
					{ title: "Sold To ID" },
					{ title: "Ship To ID" },
					{ title: "Address1" },
					{ title: "Phone" },
					{ title: "PinCode" },
					{ title: "Country" },
					{ title: "Fax" },
					{ title: "Corp. Group" },
					{ title: "Sale Org." },
					{ title: "Address2." },
					{ title: "City" },
					{ title: "State" },
					{ title: "Email" }
					
				]
			} );
		
			
		}catch(e){
			alert(e.message);
		}
		
	}*/
	
	require.ready(function() {
	 /* $.noConflict();
	  $("#showCustomerPopup").click(function(){
		  showCustomerPopup();		 
	  });
	 
	  $("#loginBoxClose").click(function(){
		  loginBoxClose();		 
	  });*/
	 /* $('#resultsTable').on('click','input[type="radio"]', function() {
		//console.log('suggested-in-comment', 'click');
		dumpSelectedRow(this);
	  });*/
		/*var CustString = $( "textarea#customerMasterString_t" ).val();
		var jsonObjCusts = [];//added var before variable name on 18/03/2017 by suresh yagnam to fix IE issues
		var CustStringArr = CustString.split("$$");
		
		for(var i = 0; i<CustStringArr.length;i++){
			if(!CustStringArr[i] && CustStringArr[i] == ""){
				continue;
			}
			var tempCustArr= CustStringArr[i].split("###");
			for(var j = 0; j<tempCustArr.length;j++){
				if(!tempCustArr[j] && tempCustArr[j] == ""){
					continue;
				}
				var custArr= tempCustArr[j].split("@@@");
				var item = {};//added var before variable name on 18/03/2017 by suresh yagnam to fix IE issues
				item ["value"] = custArr[0];//name
				item ["soldId"] = custArr[1];//sold to id
				//item ["masterstr"] = custArr[2];//master string
				item ["label"] = custArr[2];
				item ["CustSihpId"] = custArr[3];//ship to id			
				jsonObjCusts.push(item);
			}
			
		}
		
		jsonObjCustsString = JSON.stringify(jsonObjCusts);	
		console.log(jsonObjCustsString);
		jsonCustString = eval(jsonObjCustsString);		
		console.log(jsonCustString);
		$( "input[name='customersNew_t']" ).autocomplete({	//requires jquery-ui.js
			minLength: 0,
			source: jsonCustString,
			select: function( event, ui){
				console.log("yessssssssssssssssssssssss");
				var selectedDetails = ui.item.value +"##"+ui.item.soldId+"##"+"dummy"+"##"+ui.item.CustSihpId;					
				//$( "input[name='selectedCustomerDetail']" ).val(selectedDetails);	
				$( "textarea[name='selectedCustomerDetail']" ).val(selectedDetails);		
				//console.log(ui.item.soldId);				
				//$(this).val(ui.item.label);
			   $(this).val(ui.item.value);
			   $("#save").click();//auto updates the quote
			   
			   return false;
			}
		});
		*/
		//hiding/showing Add Material Action
		var hideAddMaterial = $("#line-item-grid").children('tbody').children('tr:first');	
		//console.log(hideAddMaterial);
		if(hideAddMaterial.attr("id") && hideAddMaterial.attr("id").indexOf("emptyRow") != -1){//if contains id
			  $("#add_material").parent().parent().parent().parent().parent().show();
		}else{//as of now rows doesn't contain id, if line items are present
			 $("#add_material").parent().parent().parent().parent().parent().hide();
		}
		//End of hiding/showing Add Material Action
		/*$("input[name='_line_item_list']").each(function() {//checks model by default
			console.log("inside");
			if ($(this).siblings('.collapsible').length) {
				$(this).attr("checked",true);
			}
			
		});*/
		$("input[name='_line_item_list'][value=2]").prop("checked",true);//checks model by default
		$(".line-item-reconfigure").hide();//hides model level reconfigure action
		/*$( "select[name='customerSearchFilter']").change(function() {
		  $("#save").click();//auto updates the quote
		});*/
		
	});
	
});