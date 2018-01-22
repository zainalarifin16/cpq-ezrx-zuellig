/*created by suresh yagnam*/
console.log("yessssssssssssssssss45");
$(document).on( "pagecreate", function() {
	console.log("pagecreate...");	
	
});


// Frequently Ordered Materials 
$(document).on( "click","a[name='a_selectFav']", function() {
	console.log("clicked");	
	if($(this).hasClass("matselected")){
		$(this).html("Select");
		$(this).removeClass("matselected");
		$(this).css("color", "");
	}else{
		$(this).html("UnSelect");
		$(this).addClass("matselected");
		$(this).css("color", "yellow");
	}
	
});
// Frequently Ordered Materials 
$(document).on( "click","#AddFav", function() {
	var checkedFavString = "";	
	$(".matselected").each(function (){
		
		var matId = $(this).attr("id").replace("selectFav","material");
		var matDescId = $(this).attr("id").replace("selectFav","materialDesc");
		var matQtyId = $(this).attr("id").replace("selectFav","materialQty");
		
		var data = $("#PastOrders #"+matId).html() + "$$"+$("#PastOrders #"+matDescId).html()+ "$$"+ $("#PastOrders #"+matQtyId).html() ;
		if(checkedFavString == ""){
			checkedFavString = data;
		}else{
			checkedFavString = checkedFavString +"###"+data;
		}
		
		
	});
	console.log(checkedFavString);
	$( "input[name='selectedFavouriteItems']" ).val(checkedFavString);
	if(checkedFavString != ""){
		$("#config-form").submit();
	}
	
});

// my favoirites
$(document).on( "click","a[name='a_selectCustFav']", function() {
	console.log("clicked");	
	if($(this).hasClass("matcustselected")){
		$(this).html("Select");
		$(this).removeClass("matcustselected");
		$(this).css("color", "");
	}else{
		$(this).html("UnSelect");
		$(this).addClass("matcustselected");
		$(this).css("color", "yellow");
	}
	
});
// my favoirites
$(document).on( "click","#AddCustFav", function() {
	var checkedFavString = "";	
	$(".matcustselected").each(function (){
		
		var matId = $(this).attr("id").replace("selectCustFav","materialCustFav");
		var matDescId = $(this).attr("id").replace("selectCustFav","materialDescCustFav");
		var matQtyId = $(this).attr("id").replace("selectCustFav","materialQtyCustFav");
		
		var data = $("#CurrentCustFav #"+matId).html() + "$$"+$("#CurrentCustFav #"+matDescId).html()+ "$$"+ $("#CurrentCustFav #"+matQtyId).html() ;
		if(checkedFavString == ""){
			checkedFavString = data;
		}else{
			checkedFavString = checkedFavString +"###"+data;
		}
		
		
	});
	console.log(checkedFavString);
	$( "input[name='selectedFavouriteItems']" ).val(checkedFavString);
	if(checkedFavString != ""){
		$("#config-form").submit();
	}
	
});

// principal favoirites
$(document).on( "click","a[name='a_selectPincipalFav']", function() {
	console.log("clicked");	
	if($(this).hasClass("matprincipalselected")){
		$(this).html("Select");
		$(this).removeClass("matprincipalselected");
		$(this).css("color", "");
	}else{
		$(this).html("UnSelect");
		$(this).addClass("matprincipalselected");
		$(this).css("color", "yellow");
	}
	
});
// principal favoirites
$(document).on( "click","#AddPrincipalFav", function() {
	var checkedFavString = "";	
	$(".matprincipalselected").each(function (){
		
		var matId = $(this).attr("id").replace("selectPincipalFav","materialPincipalFav");
		var matDescId = $(this).attr("id").replace("selectPincipalFav","materialDescPincipalFav");
		
		
		var data = $("#PrincipalFavorite #"+matId).html() + "$$"+$("#PrincipalFavorite #"+matDescId).html() ;
		if(checkedFavString == ""){
			checkedFavString = data;
		}else{
			checkedFavString = checkedFavString +"###"+data;
		}
		
		
	});
	console.log(checkedFavString);
	$( "input[name='selectedFavouriteItems']" ).val(checkedFavString);
	if(checkedFavString != ""){
		$("#config-form").submit();
	}
	
});
$( "input[name='addMaterialFlag']").val("false");
$( "input[name='addMaterialsFlag']").val("false"); 

var getSelectedMaterial = function(unselectObjName){
		if(unselectObjName != ""){
			$( "input[name='"+unselectObjName+"']").val("false");
		}
		 // Unchecks it
		var checkedMatString = "";
		var existingVal = $( "input[name='selectedMaterial']" ).val();
		var existingValModelLevel = $( "input[name='selectedMaterials_M_Lvl']" ).val();
		
		$("select[name='select_res']").each(function (){//looping through all search results and get all selected materials and description
			var attrId =  $(this).attr("id");
			console.log(attrId);
			console.log( $(this).val());
			if(attrId && attrId != undefined && $(this).val() == "true"){
				var matId = attrId.replace("select_res","cell-material_res-");
				var matDescId = attrId.replace("select_res","cell-materialDescription_res-");
				var matNo = $("#"+matId+" span:first").html();
				var matDesc = $("#"+matDescId+" span:first").html();			
				var selectedData = matNo+"##"+matDesc;
				if(checkedMatString == ""){
					checkedMatString = selectedData;
				}else{
					checkedMatString = checkedMatString +"$$"+selectedData;
				}
				$(this).val("false");//rest to false
			}
		});
		
		if(existingVal != "" && checkedMatString != ""){//appending newely selected materials to existing materials
			existingVal = existingVal + "$$" + checkedMatString;
		}else if(existingVal == "" && checkedMatString != "" ){//newely selected materials and no existing materials
			existingVal = checkedMatString;
		}
		
		console.log("=====================");
		console.log(existingVal);
		if(existingValModelLevel != "" && checkedMatString != ""){//appending newely selected materials to existing materials
			
			existingValModelLevel = existingValModelLevel + "$$" + checkedMatString;
		}else if(existingValModelLevel == "" && checkedMatString != "" ){//newely selected materials and no existing materials
			existingValModelLevel = checkedMatString;
		}

			$( "input[name='selectedMaterial']" ).val(existingVal);//setting to CPQ attribute
			$( "input[name='selectedMaterials_M_Lvl']" ).val(existingValModelLevel);//setting to CPQ attribute

		//if(unselectObjName != ""){
			$('.button-update').click();//auto update
		//}
		
 }
 var checkOrUncheckMaterial = function(){	
	  $("select[name='select_res']").each(function (){//unchecks all selected materials
			if($(this).attr("id")){				
				$(this).val("false");
			}
			
	  });
 }
checkOrUncheckMaterial();
$(document).on( "click","#AddMat", function(e){
	e.preventDefault();
	console.log( "Handler for .click() called." );
	$( "input[name='addMaterialsFlag']").val("true");//sets addMaterialsFlag to true		
	$( "input[name='addMaterialFlag']").val("true");
	
	getSelectedMaterial("");//gets all selcted materials		
});
$(document).on( "click","#cust_nextResult", function(e){
	console.log( "Handler for .click() called." );	
	getSelectedMaterial("previous_res");//gets all selcted materials	
			
});
$(document).on( "click","#cust_prevResult", function(e){
	console.log( "Handler for .click() called." );
	getSelectedMaterial("next_res");//gets all selcted materials
});
	
