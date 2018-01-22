var pendingConfig = function(){
	if ( $(".jg-box-sidenav").length ){	
		console.log("pendingConfig.js 1122");		
		$.ajax({
			 url: "https://zuelligpharmatest1.bigmachines.com/commerce/buyside/config_drafts_list.jsp",
			 type: 'GET',
			 data: "_bm_trail_refresh_=true",
			 dataType : "html",
			 success: function (respData) {			
				var draftid =  $( respData ).find("input[name='ids']").val();
				if(draftid!= "" and draftid!= undefined){
					$("li:nth-child(4)").html("<a href=\"https://zuelligpharmatest1.bigmachines.com/commerce/new_equipment/products/model_configs.jsp?_first_time=false&_needUpdate=false&_fromConfigDrafts=true&_variable_name_punchin=false&model=zuelligPharmaProducts&segment_id=10&displayedWizards=36345549&_bm_search_flow_config_atts=&pline_id=36345322&model_id=36345325&bm_search_result=&_current_rule_id=36345549&wizardIndex=0&_currentTab=material\" id=\"jg-submenu-pending\" class=\"jg-linkbtn  active\" data-description=\"Pending Configurations\" style=\"background-image: url('/bmfsweb/zuelligpharmatest1/image/images/pendingconfigurations.png');\"></a>");
				}		
			  
			},
			 error: function(){	   
			   console.log("Cannot get data");
			 }
		});
	 }
}
console.log("1111111111111.js");
$(document).ready(function(){
  console.log("pendingConfig.js");
   setTimeout(function() {
		   console.log("pendingConfig.js 11");
		
	}, 2000);
	 
});

