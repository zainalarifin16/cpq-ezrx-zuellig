$(document).ready(function(){
    //console.error('ph lorem ipsum .......');
    /* 
        Start : -
        Task  : - Detect User
        Page  : Global
        File Location : $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout : Both
    */
    var userCountry = null;
    var countryCode = null;
    //userCountry = 'PH';
    var countryEle = document.getElementById('userSalesOrg_t');

    if(countryEle == null){ //this is for material page.
        countryEle = $('input[name="userSalesOrg_PL"]').val();
        countryCode = countryEle;
    }else{
        countryCode = parseInt(countryEle.value);
    }

    if(countryEle !== null){
        console.log('countryCode - ',countryCode);

        if(countryCode == 2500){
            userCountry = 'PH';
        } else {}
        
        console.log('userCountry - ',userCountry);
        
    }

     /* TW-05 and TW-13 Override Invoice Price */
    function override_redcolor(){
        var redColor = "rgb(255, 0, 0)";
        
        $(".cell-netPriceDiscount").find(".text-field").map(function(index, data){
            if( $(data).val() != "0.0" ){
                $(data).css("color", redColor);
            }
        });

        $(".cell-netPriceDiscount").find(".text-field").on("keyup click", function(){
            
            $(this).css("color", redColor);
            
        });

        $(".cell-netPriceDiscount").find(".text-field").blur( function(){
            
            if( $(this).val() == "0.0" ){
                $(this).css("color", "#000000");
            }

        });

        $("td.cell-overridePrice").map(function(index, data){
            var overridePrice = $(data).find(".text-field");
            overridePrice.css("color", redColor);
            console.log( $(overridePrice).val().length );
            if($(overridePrice).val().length > 0){
              var rowMaterial = $(overridePrice).attr("id").replace("overridePrice-", "");
              $( "#qty_text-"+rowMaterial ).css("color", redColor);
            }
        });

    }

    function disabled_btn_save_show_alert()
    {
      if( $("#update-alert").length == 0 ){
          var updateMsg = "<div id='update-alert' class='updateMsg'>Please click 'update' to proceed.</div>";
          $('#materialArrayset').after(updateMsg);
          $("#update-alert").css("padding-bottom", "30px");
          $("#btn-cart-save").attr("disabled", true).css({ "background-color": "grey"});
      }
    }

    function enabled_btn_save_remove_alert()
    {
      $("#update-alert").remove();
      $("#btn-cart-save").attr("disabled", false).css({ "background-color": "#0C727A" });
    }

    /*
        SUMMARY : Listen user change the value of QTY, OVerride Invoice and Override Price,
                  Show Alert if the value has been changed
    */

    function check_user_change_value(){
        var listEditedField = {};

        $("td.cell-netPriceDiscount, td.cell-qty_text, td.cell-overridePrice").find(".text-field").on("click focus", function(){

          var id = "";
          if( $(this).closest(".cell-qty_text").length > 0 ){
            id = "qty_"+$(this).attr("id").replace("qty_text-", "");
          }

          if( $(this).closest(".cell-overridePrice").length > 0){
            id = "op_"+$(this).attr("id").replace("overridePrice-", "");
          }

          if( $(this).closest(".cell-netPriceDiscount").length > 0 ){
            id = "oip_"+$(this).attr("id").replace("netPriceDiscount-", "");
          }

          if(!listEditedField.hasOwnProperty(id))
          {
              listEditedField[id] = { before : $(this).val() };
          }

        });

        $("td.cell-netPriceDiscount, td.cell-qty_text, td.cell-overridePrice").find(".text-field").blur(function(){
          
          var id = "";
          if( $(this).closest(".cell-qty_text").length > 0 ){
            id = "qty_"+$(this).attr("id").replace("qty_text-", "");
          }

          if( $(this).closest(".cell-overridePrice").length > 0){
            id = "op_"+$(this).attr("id").replace("overridePrice-", "");
          }

          if( $(this).closest(".cell-netPriceDiscount").length > 0 ){
            id = "oip_"+$(this).attr("id").replace("netPriceDiscount-", "");
          }

          listEditedField[id]["after"] = $(this).val();

          var isShowMessage = false;
          $.each(listEditedField, function(index, data){
            if(!isShowMessage){
              if(data.before != data.after){
                isShowMessage = true;
              }
            }else{
              return false;
            }
          });

          if(isShowMessage){
            disabled_btn_save_show_alert();
          }else{
            enabled_btn_save_remove_alert();
          }

        });

    }

    check_user_change_value();

    /*
        End   : -
        Task  : - Detect User
        Page  : Global
        File Location : $BASE_PATH$/javascript/js-ezrx.js
        Layout : Both
    */
    if(userCountry === 'PH'){
        /*
            Start : 03 Jan 2018
            Task  : Ship To Address header name to Sold to Address for PH.
            Page  : Global
            File Location : $BASE_PATH$/javascript/js-ezrx-ph.js
            Layout : Both
        */

        var sold_to_address = function(){
        
            //$('label[for="shipToAddress_html_t"]').find('span').text('Sold To Address');
            //$('#attr_wrapper_1__soldTo_t_address').parent().before('<div id="soldToAddress88"><span>Sold To Address TEST </span></div><div class="column spacer-column label-left" style="width:30%"><div class="form-item clearfix attr-spacer" style="height: 30px;"></div></div>');
			$('#attr_wrapper_1__soldTo_t_address_2').parent().before('<div id="soldToAddress88"><span style="padding-right: 1px;width: 100%;">Sold To Address</span></div>');
			//$('#attr_wrapper_1__soldTo_t_zip').before('<div id="soldToAddress88"><span>&nbsp</span></div><div class="column spacer-column label-left" style="width:100%"><div class="form-item clearfix attr-spacer" style="height: 30px;"></div></div>');
			//$('#attr_wrapper_1__soldTo_t_zip').parent()('<div id="soldToAddress88"><span style="padding-right: 5px;width: 100%;">Sold To Address</span></div>');
			$('#attr_wrapper_1__soldTo_t_address').parent().attr("style","margin-left: 30%; width: 40%;");
			$('#attr_wrapper_1__soldTo_t_zip').parent().attr("style","margin-left: 0%; width: 30%;");
        }

        /*
            End   : 03 Jan 2018
            Task  : Ship To Address header name to Sold to Address for PH.
            Page  : Global
            File Location : $BASE_PATH$/javascript/js-ezrx.js
            Layout : Both
        */

        var check_if_page_isready = function(){
            setTimeout(function(){
                console.log("TITLE", $('title').text().toLowerCase());
                if($("#jg-overlay").css("display") == "none"){

                    if($('title').text().toLowerCase() == "shopping cart"){

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 19 Feb 2018
                          Task          :- TW-07 Address set layout correction.
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        //copy to correct row.
                        var element_column_layout = $("#attr_wrapper_1_soldToAddress_html_t").closest(".column-layout");
                        $("#attr_wrapper_1_customerShipToId_t").closest(".column-layout").before( element_column_layout.clone() ); //move cloned a row Label to correct row
                        $("#attr_wrapper_1_shipToAddress_html_t").remove(); //remove first element Ship To Address

                        $("#attr_wrapper_1_customerSoldToId_New").closest(".column-layout").children()[0].remove(); //remove spacer from element

                        $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").children()[0].remove(); //remove element Draft order detail on cloned
                        $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").prepend( $($(".spacer-column")[0]).clone() ); //clone spacer to element
                        $("#attr_wrapper_1_shipToAddress_html_t").closest(".column").children()[0].remove(); //remove label Ship To Address

                        $("#attr_wrapper_1_customerSoldToId_New").closest(".column").css("margin-left", "0px");
                        $($("#field_wrapper_1_customerShipToId_t").closest(".column-layout").children()[0]).css("display", "block"); //clone spacer to element

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 19 Feb 2018
                          Task          :- TW-07 Address set layout correction.
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        $("#readonly_1__shipTo_t_company_name").css({ "white-space": "normal" });
                        $("#readonly_1__soldTo_t_address").css({ "white-space": "normal" });
                        $("#readonly_1__soldTo_t_address_2").css({ "white-space": "normal" });
                        $("#readonly_1_soldToAddress3").css({ "white-space": "normal" });
                        $("#readonly_1_soldToAddress4").css({ "white-space": "normal" });
                        //ship to address
                        $("#readonly_1__shipTo_t_address_2").css({ "white-space": "normal" });
                        $("#readonly_1_customerAddressLine4").css({ "white-space": "normal" });

                    }

                    if($('title').text().toLowerCase() == "model configuration"){
                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 21 Feb 2018
                          Task          :- remove existing bonus item in Bonus select
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */
                        $('#resultsTable').on('click', 'input[type="radio"]', function() {
                            $("#materialArrayset").find("input[name='type']").map(function(index, data){
                              if($(data).val().toLowerCase() == "bonus"){
                                var id = $(data).attr("id").replace("type-","");
                                var code_material = $("#material-"+id).val();
                                $("select[name='itemBonus']").find("option[value='"+code_material+"']").remove();
                              }
                            }); 
                          
                        });
                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 21 Feb 2018
                          Task          :- remove existing bonus item in Bonus select
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */   

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
                          Task          :- Hide Feature "Enable Old Material"
                          Page          :- Model Configuration
                          File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                          Layout        :- Desktop
                        */

                        $("#attribute-enableOldMaterialSearch").hide();

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
                          Task          :- Hide Feature "Enable Old Material"
                          Page          :- Model Configuration
                          File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                          Layout        :- Desktop
                        */

                    }

                }else{
                    check_if_page_isready();
                }
            }, 1000);
        }

        check_if_page_isready();

        /* TW-05 and TW-13 Override Invoice Price */
        override_redcolor();
        /* TW-05 and TW-13 Override Invoice Price */

        /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
        tw_tooltip_modelconfiguration();
        /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price. */


        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            
        } else {
            /*
                Start : 03 Jan 2018
                Task  : Ship To Address header name to Sold to Address for PH.
                Page  : Global
                File Location : $BASE_PATH$/javascript/js-ezrx-ph.js
                Layout : Both

                get full url split it to get subdomain, and generate url of assets.
            */

            sold_to_address();  
            /*
                End   : 03 Jan 2018
                Task  : Ship To Address header name to Sold to Address for PH.
                Page  : Global
                File Location : $BASE_PATH$/javascript/js-ezrx.js
                Layout : Both
            */
        }
    }
});