/** * @version Fri Dec  2 14:43:33 2011  **/
/*created by suresh yagnam*/

require(["/bmfsweb/zuelligpharmatest1/image/javascript/jquery-ui.min.js",
  "/bmfsweb/zuelligpharmatest1/image/javascript/jquery-ui.js"], function() {
	//this function runs when the page loads
	require.ready(function() {
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
		var hideAddMaterial = $("#line-item-grid").children('tbody').children('tr:first');	
		//console.log(hideAddMaterial);
		if(hideAddMaterial.attr("id") && hideAddMaterial.attr("id").indexOf("emptyRow") != -1){//if contains id
			  $("#add_material").parent().parent().parent().parent().parent().show();
		}else{//as of now rows doesn't contain id, if line items are present
			 $("#add_material").parent().parent().parent().parent().parent().hide();
		}
		/*$("input[name='_line_item_list']").each(function() {//checks model by default
			console.log("inside");
			if ($(this).siblings('.collapsible').length) {
				$(this).attr("checked",true);
			}
			
		});*/
		$("input[name='_line_item_list'][value=2]").prop("checked",true);
		$(".line-item-reconfigure").hide();//hides model level reconfigure action
		/*$( "select[name='customerSearchFilter']").change(function() {
		  $("#save").click();//auto updates the quote
		});*/
		
	});
	
});