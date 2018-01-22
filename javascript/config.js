/**
 * @param dependencies {Array} name of modules this code depends on. Can exclude ".js"
 * @param callback {Function} function containing this module's functionality.
 * @version Fri Feb 25 18:44:56 2011
 */
 /*created by suresh yagnam*/
var full = window.location.host;
//window.location.host is subdomain.domain.com
var parts = full.split('.');
var sub = parts[0];
var subpath = "/bmfsweb/"+sub+"/image/";//"javascript/jquery.dataTables.min.js"
require([], function(rtq) {
  /*
   * Put all functions for homepage here
   */


  var checkOrUncheckMaterial = function(){
	  //var existingVal = $( "textarea[name='selectedMaterial']" ).val();
	  $("input[name='select_res']").each(function (){//unchecks all selected materials
			var attrId =  $(this).attr("id");
			if(attrId && attrId != undefined){
				/*var matId = attrId.replace("select_res_","material_res-");
				var matDescId = attrId.replace("select_res_","materialDescription_res-");
				var matNo = $("#"+matId).val();
				var matDesc = $("#"+matDescId).val();
				if(existingVal.indexOf(matNo) != -1){
					//console.log("item exist select it =="+matNo);
					$(this).prop('checked', false); // selects it

				}else{
					//console.log("item not exist unselect it =="+matNo);
					$(this).prop('checked', false); // unselects it
				}
				*/
				$(this).prop('checked', false); // unselects it
			}
			//console.log("attrId==="+attrId);
	  });
  }
  var getSelectedMaterial = function(unselectObjName){
		if(unselectObjName != ""){
			$( "input[name='"+unselectObjName+"']").prop('checked', false);
		}
		 // Unchecks it
		var checkedMatString = "";
		var existingVal = $( "input[name='selectedMaterial']" ).val();
		var existingValModelLevel = $( "input[name='selectedMaterials_M_Lvl']" ).val();



		/*var matArr = [];
		var matDescArr = [];
		if(existingVal != ""){
			var existingMatArr = existingVal.split("$$");
			for(var i=0;i<existingMatArr.length;i++){
				var tempDataArr = existingMatArr[i].split("##");
				matArr.push(tempDataArr[0]);
				matDescArr.push(tempDataArr[1]);
			}

		}*/
		//var isItemRemoved = false;
		$("input[name='select_res']").each(function (){//looping through all search results and get all selected materials and description
			var attrId =  $(this).attr("id");
			//console.log(attrId);
			if(attrId && attrId != undefined){
				var isChecked = $(this).prop("checked");
				var matId = attrId.replace("select_res_","material_res-");
				var matDescId = attrId.replace("select_res_","materialDescription_res-");
				var matNo = $("#"+matId).val();
				var matDesc = $("#"+matDescId).val();
				//if(existingVal.indexOf(matNo) == -1 && isChecked){
				if(isChecked){
					//console.log("item not exist=="+matNo);
					var selectedData = matNo+"##"+matDesc;
					if(checkedMatString == ""){
						checkedMatString = selectedData;
					}else{
						checkedMatString = checkedMatString +"$$"+selectedData;
					}
				}/*else{
					if(!isChecked){
						isItemRemoved =  true;
						var matPos = $.inArray(matNo,matArr);
						matArr.splice( matPos ,1 );
						matDescArr.splice( matPos ,1 );
						//console.log("item exist=="+matNo);
					}

				}*/
			}
		});

		if(existingVal != "" && checkedMatString != ""){//appending newely selected materials to existing materials
			/*if(isItemRemoved){
				console.log(matArr);
				existingVal = "";
				for(var i = 0;i < matArr.length;i++){//for removed items
					if(existingVal == ""){
						existingVal = matArr[i]+"##"+matDescArr[i];
					}else{
						existingVal = existingVal +"$$"+matArr[i]+"##"+matDescArr[i];
					}
				}
				//console.log("inside removed==="+existingVal);
			}*/

			existingVal = existingVal + "$$" + checkedMatString;
		}else if(existingVal == "" && checkedMatString != "" ){//newely selected materials and no existing materials
			existingVal = checkedMatString;
		}


		if(existingValModelLevel != "" && checkedMatString != ""){//appending newely selected materials to existing materials

			existingValModelLevel = existingValModelLevel + "$$" + checkedMatString;
		}else if(existingValModelLevel == "" && checkedMatString != "" ){//newely selected materials and no existing materials
			existingValModelLevel = checkedMatString;
		}

			//$( "textarea[name='selectedMaterial']" ).val(existingVal);//setting to CPQ attribute
			//$( "textarea[name='selectedMaterials_M_Lvl']" ).val(existingValModelLevel);//setting to CPQ attribute

			$( "input[name='selectedMaterial']" ).val(existingVal);//setting to CPQ attribute
			$( "input[name='selectedMaterials_M_Lvl']" ).val(existingValModelLevel);//setting to CPQ attribute

		if(unselectObjName != ""){
			$("form[name='configurationForm']").submit();//auto update
		}
		/*if(checkedMatString != ""){
			$("form[name='configurationForm']").submit();
		}*/
  }
  var loginBoxClose = function(){
	$("#dropShadowPopUp").hide();
  }
  // var dumpSelectedRow = function(obj){

	// 	var trObj = obj.parentNode.parentNode; //selected row
	// 	var currentId = $( $(trObj).find('td')[1] ).text(); //selected value
	//
	// 	// console.log('currentId', currentId);
	// 	var selectedRow = $('#selectedMatTable #selectedMatTableBody tr');
	// 	var selectedRowLength = $(selectedRow).length;
	// 	var cartRow = $('#materialArrayset table tbody tr');
	// 	var cartRowLength = $(cartRow).length;
	// 	var addItem;
	//
	// 	if (selectedRowLength > 0 || cartRowLength > 0) {
	//
	// 		// check slected material list
	// 		for (var i = 0; i < selectedRowLength; i++) {
	//
	// 			var selectedId = $( $(selectedRow[i]).find('td')[0] ).text();
	// 			// console.log('selectedId', currentId, selectedId);
	// 			if (currentId === selectedId) {
	// 				// console.log('same item!', currentId, selectedId);
	// 				return;
	// 				// addItem = false;
	// 			}
	// 		}
	//
	// 		// check shopping cart list
	// 		for (var j = 0; j < cartRowLength; j++) {
	// 			var cartId = $( $(cartRow[j]).find('td.cell-material .attribute-field') ).text();
	// 			// console.log('cartId', currentId, cartId);
	// 			if (currentId === cartId) {
	// 				// console.log('same item!', currentId, cartId);
	// 				return;
	// 			}
	// 		}
	//
	// 		addItem = true;
	// 		if (addItem) {
	// 			cloneItem();
	// 		}
	//
	// 	} else {
	// 		// console.log('both empty');
	// 		cloneItem();
	// 	}
	//
	// 	function cloneItem () {
	// 		var tableObj = document.getElementById("selectedMatTableBody"); //Selected Materials Table
	// 		var clonedTrObj =  trObj.cloneNode(true); //Clone ROW
	// 		var colObj = clonedTrObj.insertCell(-1); //dustin icon remove button
	//
	// 		clonedTrObj.deleteCell(0); //Delete 1st column
	// 		tableObj.appendChild(clonedTrObj);
	// 		colObj.innerHTML = "<a href='#' class = 'selected-remove'> <a>";
	//
	// 		// DELETE item
	// 		colObj.onclick = function(event){
	// 			event.preventDefault();
	// 			var tableObj1 = document.getElementById("selectedMatTableBody");
	// 			var rowIndex = this.parentNode.rowIndex;
	// 			tableObj1.deleteRow(rowIndex-1);
	// 		};
	// 	}
	//
  // }
  var showMaterialPopup = function(){
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
				var subDataSet = ["",colArr[0],colArr[1]];
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
					{ title: "Material Number" },
					{ title: "Material Description" }

				]
			} );


		}catch(e){
			alert(e.message);
		}

	};

	// var materialSearch = function() {
		// var customerDetails = $("#attribute-allMaterialsString").html();
	// 	var customerDetails = $("#actualMasterString").html();
	// 	var custArr = customerDetails.split("##");
	// 	var totalRecs = custArr.length;
	// 	var fromIndex = 0;
	// 	var toIndex = totalRecs;
	// 	var dataSet = [];
	// 	// console.log('customerDetails', customerDetails);
	// 	for(var i = fromIndex; i< toIndex;i++){
	// 		colArr = custArr[i].split("$$");
	// 		var subDataSet = ["",colArr[0],colArr[1]];
	// 		dataSet.push(subDataSet);
	//
	// 	}
	// 	$('#resultsTable').DataTable( {
	// 		scrollY: "400px",
	// 		scrollCollapse: true,
	// 		data: dataSet,
	// 		order: [[1, 'asc']],
	// 		columnDefs: [
	// 			{
	// 				targets: 0,
	// 				searchable: false,
	// 				orderable: false,
	// 				render: function(data, type, full, meta){
	// 					 if(type === 'display'){
	// 						data = '<input type="radio" name="selectMat" id= "selectMat">';
	// 					 }
	//
	// 					 return data;
	// 				}
	// 			}
	// 		],
	// 		columns: [
	// 			{ title: "" },
	// 			{ title: "Material Number" },
	// 			{ title: "Material Description" }
	//
	// 		]
	// 	} );
	// };

   //this function runs when the page loads
  require.ready(function() {
	  console.log( "require.ready called." );
	  $.noConflict();
	  // $("#showMaterialPopup").click(function(){
		//   showMaterialPopup();
	  // });

		// console.log('materialSearch');
		// var materialHTML = '<div class="materialSearchWrapper"> <div class="normalPopupCont flLeft" id="leftPanel"> <table id="resultsTable" style="width: 100%;"></table> </div><div class="normalPopupCont1 flRight" id="rightPanel"> <div class="popupHeader1 bigHeader">Selected Materials</div><div class="accountstable" id="selectedResultsTable"> <div class="accountstable" id="selectedMatTableDiv" style="overflow-y: auto;height: 400px;"> <table id="selectedMatTable" style="background-color: white !important;"> <thead> <tr> <th style="width:20%">Material Number</th> <th style="width:70%">Material Description</th> <th style="width:6%"></th> </tr></thead> <tbody id="selectedMatTableBody"> </tbody> </table> <a href="#" id="addMaterialBtn" name="addMaterialBtn" class="jg-btn addMat-btn" style="width: auto; margin-top: 50px; display: inline-block;">Add</a> </div></div></div></div>';
		// // $('#attribute-materialPopupHolder').html(materialHTML);
		// $('#attribute-materialSearch .messages').html(materialHTML);
		//
		// if ( $("#actualMasterString") ) {
		//   materialSearch();
		// } else {
		//   console.log(' no data ');
		// }


	  /*$("#loginBoxClose").click(function(){
		  loginBoxClose();
	  });*/

	  // $('.addMat-btn').on('click', function(e){
		// 	e.preventDefault();
		// 	var row = $('#selectedMatTable tr');
		// 	var rowLength = $('#selectedMatTable tr').length;
		// 	//var materialList = [];
		// 	var checkedMatString = "";
		// 	var existingVal = $( "input[name='selectedMaterial']" ).val();
		// 	var existingValModelLevel = $( "input[name='selectedMaterials_M_Lvl']" ).val();
		//
		// 	for (var i = 1; i < rowLength; i++) {
		// 		var matNo = $($(row[i]).find('td')[0]).text();
		// 		var matDesc = $($(row[i]).find('td')[1]).text();
		// 		var selectedData = matNo+"##"+matDesc;
		// 		if(checkedMatString == ""){
		// 			checkedMatString = selectedData;
		// 		}else{
		// 			checkedMatString = checkedMatString +"$$"+selectedData;
		// 		}
		// 		//materialList.push(orderNo + '##' + prodctName);
		//
		// 	}

			/*var materialListStr = materialList.join("$$");
			console.log('materialList', materialListStr);
			$("#attribute-selectedMaterial").val(materialListStr);
			console.log($("#attribute-selectedMaterial").val());
			$("#attribute-addMaterialFlag").prop('checked', true);
			$("#attribute-addMaterialFlag").val("true");
			*/
		// 	if(existingVal != "" && checkedMatString != ""){//appending newely selected materials to existing materials
		// 		existingVal = existingVal + "$$" + checkedMatString;
		// 	}else if(existingVal == "" && checkedMatString != "" ){//newely selected materials and no existing materials
		// 		existingVal = checkedMatString;
		// 	}
		// 	if(existingValModelLevel != "" && checkedMatString != ""){//appending newely selected materials to existing materials
		//
		// 		existingValModelLevel = existingValModelLevel + "$$" + checkedMatString;
		// 	}else if(existingValModelLevel == "" && checkedMatString != "" ){//newely selected materials and no existing materials
		// 		existingValModelLevel = checkedMatString;
		// 	}
		//
		// 	$( "input[name='selectedMaterial']" ).val(existingVal);//setting to CPQ attribute
		// 	$( "input[name='selectedMaterials_M_Lvl']" ).val(existingValModelLevel);//setting to CPQ attribute
		//
		// 	$( "input[name='addMaterialsFlag']").prop('checked', true);	//sets addMaterialsFlag to true
		// 	$( "input[name='addMaterialsFlag']").val(true);
		// 	$( "input[name='addMaterialFlag']").prop('checked', true);
		// 	$( "input[name='addMaterialFlag']").val(true);
		// 	if(checkedMatString != ""){
		// 		$("form[name='configurationForm']").submit();//auto update
		// 	}
		// 	// console.log('materialList', materialList );
	  // });
	  // $('#resultsTable').on('click','input[type="radio"]', function() {
		// //console.log('suggested-in-comment', 'click');
		//
		// 	dumpSelectedRow(this);
	  // });
	  var jsonPartDescString ;
	  /*var checkFirstLoad =   window.location.href.indexOf;
	  console.log(checkFirstLoad);
	  if($('#btn-cart-addtoorder').length == 0 && checkFirstLoad == undefined){//reconfig models
		  $("#selectedMaterial").text("");
		  $("#selectedMaterial").attr("firstload","yes");
		    console.log( "checkFirstLoad==="+checkFirstLoad );
	  }*/
	  checkOrUncheckMaterial();//uncheck all selected materials
	  $( "input[name='addMaterialsFlag']").prop('checked', false);	//sets addMaterialsFlag to false
	  $( "input[name='addMaterialFlag']").prop('checked', false);
	  console.log( "require.ready called.111" );
	/*var jsonObjParts = [];//added var before variable name on 18/03/2017 by suresh yagnam to fix IE issues
	var jsonObjPartsDesc = [];//added var before variable name on 18/03/2017 by suresh yagnam to fix IE issues
	var partsString = $( "input[name='masterString']" ).val();
	var partsStringArr = partsString.split("$$$");
	var partsArr= partsStringArr[0].split("@@");
	var partsDescArr= partsStringArr[1].split("@@");
	for(var i = 0; i<partsArr.length;i++){
		if(!partsArr[i] && partsArr[i] == ""){
			continue;
		}
		var tempPartsArr = partsArr[i].split("##");
		var tempPartsDescArr = partsDescArr[i].split("##");

		for(var j=0;j<tempPartsArr.length;j++){
			var item = {};
			item ["value"] = tempPartsArr[j];
			item ["label"] = tempPartsArr[j];
			item ["desc"] = tempPartsDescArr[j];
			jsonObjParts.push(item);
			var item = {};
			item ["value"] = tempPartsDescArr[j];
			item ["label"] = tempPartsDescArr[j];
			item ["part"] = tempPartsArr[j];
			jsonObjPartsDesc.push(item);
		}

	}
	//console.log(jsonObjParts);
	var jsonPartString = JSON.stringify(jsonObjParts);
	jsonPartString = eval(jsonPartString);
	//console.log(jsonPartString);
	var jsonPartDescString = JSON.stringify(jsonObjPartsDesc);
	jsonPartDescString = eval(jsonPartDescString);
	$( "input[name='material']" ).blur(function() {
		if ( $(this).val().length > 7){
			setTimeout(function(){
				console.log("yessss");
				$('#update')[0].click();
			}, 900);
		}


	});
    $( "input[name='material']" ).autocomplete({
		minLength: 5,
        source: jsonPartString,
        focus: function( event, ui ){
			$(this).val( ui.item.label);
            //return false;
        },
        select: function( event, ui){
		   var descAttrIdPos =  $(this).attr("id").split("-")[1];
		   //console.log("descAttrIdPos"+descAttrIdPos);
		   $( "#materialDescription-"+descAttrIdPos).val(ui.item.desc);
			//console.log(ui.item.label);
           $(this).val( ui.item.label );
         //  return false;
        }
    });
	$(document).on('keyup', 'textarea[name=materialDescription]', function(event){//added by suresh yagnam on 18/03/2017 as attribute name got changed.
		console.log("yessssssssssss");
		$(this).autocomplete({
			minLength: 3,
			source: jsonPartDescString,
			select: function( event, ui){
				var descAttrIdPos =  $(this).attr("id").split("-")[1];
			   //console.log("descAttrIdPos"+descAttrIdPos);
			   $( "#material-"+descAttrIdPos).val(ui.item.part);
			  // $( "#area_materialDescription-"+descAttrIdPos).val(ui.item.label);
				$(this).val( ui.item.label );
			  //  return false;
			}
		});
	});
	//$( "input[name='materialDescription']" ).autocomplete({//commented by suresh yagnam on 18/03/2017 as attribute name got changed.
	/*$( "textarea[name='area_materialDescription']" ).autocomplete({
		minLength: 0,
        source: jsonPartDescString,
        focus: function( event, ui ){
			$(this).val( ui.item.label);
            //return false;
        },
        select: function( event, ui){
			var descAttrIdPos =  $(this).attr("id").split("-")[1];
		   //console.log("descAttrIdPos"+descAttrIdPos);
		   $( "#material-"+descAttrIdPos).val(ui.item.value);
           $(this).val( ui.item.label );
          //  return false;
        }
    });*/
	/*
	// start of auto complete for additonal material arrayset
	  $( "input[name='additionalMaterial']" ).autocomplete({
		minLength: 5,
        source: jsonPartString,
        focus: function( event, ui ){
			$(this).val( ui.item.label);
           // return false;
        },
        select: function( event, ui){
		   var descAttrIdPos =  $(this).attr("id").split("-")[1];
		   //console.log("descAttrIdPos"+descAttrIdPos);
		   $( "#additionalMaterialDescription-"+descAttrIdPos).val(ui.item.desc);
           $(this).val( ui.item.label );
           //return false;
        }
    });
	$( "input[name='additionalMaterialDescription']" ).autocomplete({
		minLength: 3,
        source: jsonPartDescString,
        focus: function( event, ui ){
			$(this).val( ui.item.label);
            //return false;
        },
        select: function( event, ui){
			var descAttrIdPos =  $(this).attr("id").split("-")[1];
		   //console.log("descAttrIdPos"+descAttrIdPos);
		   $( "#additionalMaterial-"+descAttrIdPos).val(ui.item.part);
           $(this).val( ui.item.label );
            //return false;
        }
    });
	*/
	// end of auto complete for additonal material arrayset
	//Code for Frequently Order products
	// $( "#AddFav" ).click(function() {//looping through all selected favourite items and storing into CPQ attribute
	// 	var checkedFavString = "";
	// 	$("input[name='selectFav']:checked").each(function (){
	// 		var data =  $(this).attr("data");
	// 		if(checkedFavString == ""){
	// 			checkedFavString = data;
	// 		}else{
	// 			checkedFavString = checkedFavString +"###"+data;
	// 		}
	// 		$(this).prop('checked', false); // Unchecks it
	// 	});
	// 	$( "input[name='selectedFavouriteItems']:hidden" ).val(checkedFavString);
	// 	if(checkedFavString != ""){
	// 		$("form[name='configurationForm']").submit();//auto update
	// 	}
	//
	// 	console.log( "Handler for .click() called." );
	// });
	//End of code for Frequently Order products
	//Code for Principal Favourite
	// $( "#AddPrincipalFav" ).click(function() {//looping through all selected Principal Favourite items and storing into CPQ attribute
	// 	var checkedFavString1 = "";
	// 	$("input[name='selectPrincipalFav']:checked").each(function (){
	// 		var data =  $(this).attr("data");
	// 		if(checkedFavString1 == ""){
	// 			checkedFavString1 = data;
	// 		}else{
	// 			checkedFavString1 = checkedFavString1 +"###"+data;
	// 		}
	// 		$(this).prop('checked', false); // Unchecks it
	// 	});
	// 	$( "input[name='selectedPrincipalFavoriteItems']:hidden" ).val(checkedFavString1);
	// 	if(checkedFavString1 != ""){
	// 		$("form[name='configurationForm']").submit();
	// 	}
	//
	// 	console.log( "Handler for .click() called." );
	// });
	//End of code for Principal Favourite
	//Code for Current Customer Favourite
	// $( "#AddCustFav" ).click(function() {//looping through all selected Customer Favourite items and storing into CPQ attribute
	// 	var checkedFavString2 = "";
	// 	$("input[name='selectCustFav']:checked").each(function (){
	// 		var data =  $(this).attr("data");
	// 		if(checkedFavString2 == ""){
	// 			checkedFavString2 = data;
	// 		}else{
	// 			checkedFavString2 = checkedFavString2 +"###"+data;
	// 		}
	// 		$(this).prop('checked', false); // Unchecks it
	// 	});
	// 	$( "input[name='selectedFavouriteItems']:hidden" ).val(checkedFavString2);
	// 	if(checkedFavString2 != ""){
	// 		$("form[name='configurationForm']").submit();
	// 	}
	//
	// 	console.log( "Handler for .click() called." );
	// });
	//End of code for Current Customer Favourite
	//highlight override price if > 0
	/*$("input[name='overridePrice']").each(function() {
			console.log("inside");
			if(!isNaN(this.value)){
				var qty = parseFloat(this.value);
				console.log(qty);
				if(qty > 0){
					console.log("inside2");
					this.parent.css("background-color","red");
				}
			}

	});*/

	//$( "input[name='next_res']" ).click(function() {//next buton
	// $( "input[name='next_res']" ).click(function() {//next buton
	// 		console.log( "Handler for .click() called." );
	//
	// 		getSelectedMaterial("previous_res");//gets all selcted materials
	//
	//
	// });
	// $( "input[name='previous_res']" ).click(function() {//previous buton
	// 		console.log( "Handler for .click() called." );
	// 		getSelectedMaterial("next_res");//gets all selcted materials
	// });
	// $("#addMaterials").click(function() {//add button
	// 		console.log( "Handler for .click() called." );
	// 		$( "input[name='addMaterialsFlag']").prop('checked', true);	//sets addMaterialsFlag to true
	// 		$( "input[name='addMaterialsFlag']").val(true);
	// 		$( "input[name='addMaterialFlag']").prop('checked', true);
	// 		$( "input[name='addMaterialFlag']").val(true);
	//
	// 		getSelectedMaterial("");//gets all selcted materials
	// 		//selectedMaterials_M_Lvl
	// });
	// $("#materialArrayset .array-remove").click(function(){//auto update when material is deleted
	// 		// alert('REMOVE MOBILE');
	// 		setTimeout(function(){
	// 			$('#update')[0].click();
	// 			// alert('UPDATE IS CLICK');
	// 		}, 1000);
	// });
	// $("#additionalMaterialArrayset .array-remove").click(function(){//auto update when material is deleted
	//
	// 		setTimeout(function(){
	// 			$('#update')[0].click();
	// 		}, 1000);
	// });

  });
});
