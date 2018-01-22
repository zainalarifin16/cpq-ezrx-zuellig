//created by suresh yagnam.
$(document).on( "click","#swipe-sidebar", function() {
	console.log("yeeeeeeeeeeeeeeeeeeeeeeeee23332") ;	
	var jsonObj = $("#line-item-grid").attr("data-properties");
	jsonObj = JSON.stringify(jsonObj);	
	jsonObj = eval(jsonObj);
	var data = JSON.parse(jsonObj);
	console.log(data.numRows);
	if(data.numRows > 0){
		console.log("-------------1");
		$(".action-type-add-from-catalog").hide();		
	}else{
		$(".action-type-add-from-catalog").show();
		console.log("yeeeeeeeeeeeeeeeeeeeeeeeee2222") ;
	}
	setTimeout(function(){ $("input[name='_line_item_list'][value='2']").attr("checked","true");}, 2000);			
	//$("input[name='_line_item_list'][value='2']", $("#commerce-form")).attr("checked","true");
	//$("input[name='_line_item_list'][value='2']").attr("checked","true");
	//console.log($("input[name='_line_item_list'][value='2']").val());
	//$(".lig-row.parent.active").addClass("selected");
	
	
}); 
/*$(document).on('keyup', '#customersNew_t', function(event){ 
	if($(this).val().length <2){
				return false;
	}
	var autoLen = 3;
	if(isNaN($(this).val())){
		autoLen = 3;//text
	}else if(!isNaN($(this).val())){
		autoLen = 5;//number
	}
	console.log("yeeeeeeeeeeeeeeeeeeeeeeeee2222") ;
	var CustString = $( "#customerMasterString_t",$("#commerce-form")).val();
	var jsonObjCusts = [];
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
	var jsonObjCustsString = JSON.stringify(jsonObjCusts);	
	var jsonCustString = eval(jsonObjCustsString);
	
	var selectedFlag = false;
	$(this).autocomplete({		
		minLength: autoLen,
		source: jsonCustString,
		select: function( event, ui){			
			console.log("yessssssssssssssssssssssss");
			var selectedDetails = ui.item.value +"##"+ui.item.soldId+"##"+"dummy"+"##"+ui.item.CustSihpId;			
			console.log(selectedDetails);						
			$(this).val(ui.item.value);	
			$( "#selectedCustomerDetail",$("#commerce-form")).val(selectedDetails);	
			
			setTimeout(function(){ $("button:contains('Save')").click(); }, 1000);			
			
		  return false;
		}
	});
});*/ 
