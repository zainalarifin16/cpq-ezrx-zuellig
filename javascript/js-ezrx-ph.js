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

    var isMobile = function () {
      return (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) ? true : false;

    }

    var isLoadingDone = function () {
      return $("#jg-overlay").css("display") == "none" ? true : false;
    }

    //config dynamic variable
    var var_qty = ($("td.cell-qty_text").length > 0) ? "td.cell-qty_text" : "td.cell-qty";
    var var_netpricedisc = ($("td.cell-netPriceDiscount").length > 0) ? "td.cell-netPriceDiscount" : "td.cell-netPriceDiscount";
    var var_overrideprice = ($("td.cell-overridePrice").length > 0) ? "td.cell-overridePrice" : "td.cell-overridePrice_currency";
    var var_comments = ($("td.cell-comments").length > 0) ? "td.cell-comments" : "td.cell-comments";
    var var_qtyBonus = ($("td.cell-additionalMaterialQty").length > 0) ? "td.cell-additionalMaterialQty" : "td.cell-additionalMaterialQty";
    var var_bonusOverride = ($("td.cell-overrideBonusQty").length > 0) ? "td.cell-overrideBonusQty" : "td.cell-overrideBonusQty";

     /* TW-05 and TW-13 Override Invoice Price */
    /* function override_redcolor(){
        var redColor = "rgb(255, 0, 0)";
        var blackColor = "#000000";
        
        $(var_netpricedisc.replace("td", "")).find(".text-field").off();        
        $(var_netpricedisc.replace("td", "")).find(".text-field").map(function(index, data){
            if( $(data).val() != "0.0" ){
                // $(data).css("color", redColor); //remove logic for Highlight QTY in case of PH. 7 March 2018
            }
        });

        $(var_netpricedisc.replace("td", "")).find(".text-field").on("keyup click", function(){
            
            // $(this).css("color", redColor); //remove logic for Highlight QTY in case of PH. 7 March 2018
            
        });

        $(var_netpricedisc.replace("td", "")).find(".text-field").blur( function(){
            
            if( $(this).val() == "0.0" ){
                $(this).css("color", blackColor);
            }

        });

        $( var_overrideprice.replace("td", "") ).map(function(index, data){
            var overridePrice = $(data).find(".text-field");

            if( $(overridePrice).length > 0  ){

              if($(overridePrice).val() != "0.0"){
                overridePrice.css("color", redColor);
                $(data).attr("style", "color: "+redColor+" !important;");
                var rowMaterial = $(overridePrice).attr("id").replace("overridePrice-", "");
                // $( "#qty_text-"+rowMaterial ).css("color", redColor); //remove logic for Highlight QTY in case of PH. 7 March 2018
              }
              
            }
        });

        $("input[name='"+var_bonusOverride.replace("td.cell-")+"'][type='checkbox']").map(function(index, data){
          isChecked = (typeof $(this).attr("checked") == 'undefined') ? false : true;
          var rowMaterial = $(this).val();
          if( isChecked ){
            $( "#qty_text-"+rowMaterial ).css("color", redColor);
          }else{
            $( "#qty_text-"+rowMaterial ).css("color", blackColor);
          }

        });        

        $("input[name='"+var_bonusOverride.replace("td.cell-")+"'][type='checkbox']").on("change", function(){
          
          isChecked = (typeof $(this).attr("checked") == 'undefined') ? false : true;
          var rowMaterial = $(this).val();
          if( isChecked ){
            $( "#qty_text-"+rowMaterial ).css("color", redColor);
          }else{
            $( "#qty_text-"+rowMaterial ).css("color", blackColor);
          }

        });

    } */

    function disabled_btn_save_show_alert()
    {
      if( $("#update-alert").length == 0 ){
          var updateMsg = "<div id='update-alert' class='updateMsg'>Please click 'update' to proceed.</div>";
          $('#materialArrayset').after(updateMsg);
          $("#update-alert").css("padding-bottom", "30px");
          if ($("#btn-cart-save").length > 0){
            $("#btn-cart-save").attr("disabled", true).css({ "background-color": "grey"});
          }else{
            $("#btn-cart-addtoorder").attr("disabled", true).css({ "background-color": "grey"});
          }
      }
    }

    function enabled_btn_save_remove_alert()
    {
      $("#update-alert").remove();
      if ($("#btn-cart-save").length > 0) {
        $("#btn-cart-save").attr("disabled", false).css({ "background-color": "#0C727A" });
      }else{
        $("#btn-cart-addtoorder").attr("disabled", false).css({ "background-color": "#0C727A" });
      }      
    }

    /*
        SUMMARY : Listen user change the value of QTY, OVerride Invoice and Override Price,
                  Show Alert if the value has been changed
    */
    var redColor = "rgb(255, 0, 0)";
    var blackColor = "rgb(255, 255, 0)";

    function check_user_change_value(isMobile){
        var listEditedField = {};
        console.log("APPLY check_user_change_value");
        var var_find_text = (isMobile) ? ".form-field" : ".text-field";
        
        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).on("click focus", function(){

          var id = "";
          if ($(this).closest(var_qty.replace("td", "")).length > 0 ){
            id = "qty_" + $(this).attr("id").replace(var_qty.replace("td.cell-", "")+"-", "");
            $(this).css("color", redColor);
          }

          if ($(this).closest( var_overrideprice.replace("td", "") ).length > 0){
            id = "op_" + $(this).attr("data-value-attr").replace(var_overrideprice.replace("td.cell-", "")+ "-", "");
            $(this).css("color", redColor);            
          }

          if( $(this).closest( var_netpricedisc.replace("td", "") ).length > 0 ){
            id = "oip_" + $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", "")+"-", "");
            $(this).css("color", redColor);            
          }
          
          if ($(this).closest(var_comments.replace("td", "") ).length > 0 ){
            id = "cmt_" + $(this).attr("id").replace(var_comments.replace("td.cell-", "")+"-", "");
            $(this).css("color", redColor);                        
          }

          if ($(this).closest(var_qtyBonus.replace("td", "") ).length > 0 ){
            id = "cmt_" + $(this).attr("id").replace(var_qtyBonus.replace("td.cell-", "")+"-", "");
            $(this).css("color", redColor);                        
          }

          if(!listEditedField.hasOwnProperty(id))
          {
              listEditedField[id] = { before : $(this).val() };
          }

        });

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).on("keyup blur", function(){
          
          var id = "";
          if ($(this).closest(var_qty.replace("td", "")).length > 0) {
            id = "qty_" + $(this).attr("id").replace(var_qty.replace("td.cell-", "") + "-", "");
          }

          if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
            id = "op_" + $(this).attr("data-value-attr").replace(var_overrideprice.replace("td.cell-", "") + "-", "");
          }

          if ($(this).closest(var_netpricedisc.replace("td", "")).length > 0) {
            id = "oip_" + $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", "") + "-", "");
          }

          if ($(this).closest(var_comments.replace("td", "")).length > 0) {
            id = "cmt_" + $(this).attr("id").replace(var_comments.replace("td.cell-", "") + "-", "");
          }

          if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {
            id = "cmt_" + $(this).attr("id").replace(var_qtyBonus.replace("td.cell-", "") + "-", "");
          }

          listEditedField[id]["after"] = $(this).val();

          var isShowMessage = false;
          $.each(listEditedField, function(index, data){
            if(!isShowMessage){
              if(data.before != data.after){
                isShowMessage = true;
              }
            }else{
              $(this).css("color", blackColor);                          
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

    function hide_recommended_material(){
      var tabelFavFreqReq = $("#attribute-pastOrders").parent().parent().parent().parent().parent().parent('.column-1');
      $(tabelFavFreqReq.children()[1]).hide();
    }
    
    /* 
      Created By    :- Created By Zainal Arifin, Date : 27 March 2018
      Task          :- Give Higlight red color if comment not empty
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
      Layout        :- Desktop
    */
    function redColorCommentOrder() {
      $("input[name*='_comment_l']").map(function (index, data) {
        if ($(this).val().length > 0) {
          $(this).css("color", "red");
        }
      });
    }

    /* 
      Created By    :- Created By Zainal Arifin, Date : 27 March 2018
      Task          :- Give Higlight red color if comment not empty
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
      Layout        :- Desktop
    */

    /* 
      Created By    :- Created By Zainal Arifin, Date : 29 March 2018
      Task          :- Mobile Align Sold to address and Ship to address section
      Page          :- Mobile
      File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
      Layout        :- Desktop
    */

    function reAlignSoldShipAddressSection(){
      $("#attribute-customerSoldToId_t").css({"width":"100%"});
      $("#attribute-customerShipToId_t").css({ "width": "100%" });
      var parent_group = $("#attribute-customerSoldToId_t").closest(".group-content");
      $("#attribute-customerSoldToId_t").prependTo(parent_group);
    }

    /* 
      Created By    :- Created By Zainal Arifin, Date : 29 March 2018
      Task          :- Mobile Align Sold to address and Ship to address section
      Page          :- Mobile
      File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
      Layout        :- Desktop
    */
    
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
          $('#attr_wrapper_1__soldTo_t_address_2').parent().before('<div id="soldToAddress88"><span style="padding-right: 1px;width: 100%;">Sold To Address</span></div>');
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

                        $("#attr_wrapper_1_soldToAddress_html_t").remove();// remove duplicate sold to address header.

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

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 15 March 2018
                          Task          :- Remove Duplicate input field
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        //remove duplicate of frequentlyAccessedCustomers_t
                        $("textarea[name='frequentlyAccessedCustomers_t']")[1].remove();

                        //remove duplicate of saveQuoteRequired_t
                        $($("input[name='saveQuoteRequired_t']")[1]).remove();

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 15 March 2018
                          Task          :- Remove Duplicate input field
                          Page          :- Global
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        redColorCommentOrder();

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
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        $("#attribute-enableOldMaterialSearch").hide();

                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
                          Task          :- Hide Feature "Enable Old Material"
                          Page          :- Model Configuration
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */

                        /* TW-05 and TW-13 Override Invoice Price */
                        // override_redcolor();
                        /* TW-05 and TW-13 Override Invoice Price */

                        check_user_change_value(false);


                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 7 Mar 2018
                          Task          :- Hide Feature Recomended Material
                          Page          :- Model Configuration
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */
                        hide_recommended_material();
                        /* 
                          Created By    :- Created By Zainal Arifin, Date : 7 Mar 2018
                          Task          :- Hide Feature Recomended Material
                          Page          :- Model Configuration
                          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
                          Layout        :- Desktop
                        */


                    }

                }else{
                    check_if_page_isready();
                }
            }, 1000);
        }

        check_if_page_isready();

        var reset_color_lineitemgrid = function(){
          $("#line-item-grid").find(".readonly-wrapper").css({ "color": "rgb(0,0,0)" });
        }

        var order_page_stock_color = function(){
          
          /* $("td[id*='qty_int_l']").each(function (i, data) {
            var isQtyOverride = parseInt( $(this).find("span[id*='qty_int_l']").text().trim().toLowerCase() );
            if (isQtyOverride > 0) {
              // var parent = $(this).closest(".line-item");
              // var qty_span = $(parent).find("span[id*='qty_int_l']");
              $(this).find("span[id*='qty_int_l']").css("color", "rgb(255,0,0)");
            }
          }); */
          
          $("td[id*='bonusOverideFlag_l']").each(function (i, data) {
            var parent = $(this).closest(".line-item");
            var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
            if(type_material != "bonus"){
              var isBonusOverride = $(this).find("span[id*='bonusOverideFlag_l']").text().trim().toLowerCase();
              if (isBonusOverride == "true") {
                var qty_span = $(parent).find("span[id*='qty_int_l']");
                $(qty_span).css("color", "red");
              }
            }
          });


          $("td[id*='isPriceOverride']").each(function(i, data){
            var parent = $(this).closest(".line-item");
            var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
            if(type_material != "bonus"){
              var isPriceOverrideVal = $(this).find("span[id*='isPriceOverride']").text().trim().toLowerCase();
              if(isPriceOverrideVal.length > 0){
                if(isPriceOverrideVal == 'true'){
                  var totalPriceSpan = $(parent).find("span[id*='totalPrice_currency']");
                  $(totalPriceSpan).css("color", "red");
                  var unitPriceSpan = $(parent).find("span[id*='unitPrice_currency']");
                  $(unitPriceSpan).css("color", "red");
                }
              }
            }
          });

          $("td[id*='netPriceDiscount_t']").each(function(i, data){
            var parent = $(this).closest(".line-item");
            var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
            if(type_material != "bonus"){
              var priceDiscount_tVal = $(this).find("span[id*='netPriceDiscount_t']").text().trim().toLowerCase();
              if(priceDiscount_tVal.length > 0){
                if (priceDiscount_tVal != '0.0'){
                  var parent = $(this).closest(".line-item");
                  var totalPriceSpan = $(parent).find("span[id*='totalPrice_currency']");
                  $(totalPriceSpan).css("color", "red");
                  var unitPriceSpan = $(parent).find("span[id*='unitPrice_currency']");
                  $(unitPriceSpan).css("color", "red");
                }
              }
            }
          });

        }

      function textColorQty() {
        console.log('textColorQty');

        /* 
            Created By    :- Created By Zainal Arifin, Date : 30 March 2018
            Task          :- highlight on Shopping Cart
            Page          :- Shopping Cart
            File Location :- $BASE_PATH$/javascript/js-ezrx.js
            Layout        :- Global
        */

        function disabled_btn_save_show_alert() {
          if ($("#update-alert").length == 0) {
            var updateMsg = "<div id='update-alert' class='updateMsg'>Please click 'update' to proceed.</div>";
            $('#materialArrayset').after(updateMsg);
            $("#update-alert").css("padding-bottom", "30px");
            if ($("#btn-cart-save").length > 0) {
              $("#btn-cart-save").attr("disabled", true).css({ "background-color": "grey" });
            } else {
              $("#btn-cart-addtoorder").attr("disabled", true).css({ "background-color": "grey" });
            }
          }
        }

        function enabled_btn_save_remove_alert() {
          $("#update-alert").remove();
          if ($("#btn-cart-save").length > 0) {
            $("#btn-cart-save").attr("disabled", false).css({ "background-color": "#0C727A" });
          } else {
            $("#btn-cart-addtoorder").attr("disabled", false).css({ "background-color": "#0C727A" });
          }
        }

        var var_qty = ($("td.cell-qty_text").length > 0) ? "td.cell-qty_text" : "td.cell-qty";
        var var_netpricedisc = ($("td.cell-netPriceDiscount").length > 0) ? "td.cell-netPriceDiscount" : "td.cell-netPriceDiscount";
        var var_Invoiceoverrideprice = ($("td.cell-overrideInvoicePrice").length > 0) ? "td.cell-overrideInvoicePrice" : "td.cell-overrideInvoicePrice";
        var var_overrideprice = ($("td.cell-overridePrice").length > 0) ? "td.cell-overridePrice" : "td.cell-overridePrice_currency";
        var var_comments = ($("td.cell-comments").length > 0) ? "td.cell-comments" : "td.cell-comments";
        var var_qtyBonus = ($("td.cell-additionalMaterialQty").length > 0) ? "td.cell-additionalMaterialQty" : "td.cell-additionalMaterialQty";
        var var_bonusOverride = ($("td.cell-overrideBonusQty").length > 0) ? "td.cell-overrideBonusQty" : "td.cell-overrideBonusQty";

        var redColor = "rgb(255, 0, 0)";
        var blackColor = "rgb(0, 0, 0)";

        var basic_value = "0.0";
        var basic_value_price = "0.00";
        var listEditedField = {};
        var var_find_text = (isMobile()) ? ".form-field" : ".text-field";
        
        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus + ", " + var_bonusOverride).off();

        function isOverridePrice(id) {
          id = Math.abs(id);
          var overridePriceVal = $("#overridePrice_currency-" + id + "-display").val();
          var overridePriceValue = (overridePriceVal != "") ? overridePriceVal.slice(1) : 0.0;
          if (overridePriceValue != basic_value_price) {
            $("#overridePrice_currency-" + id + "-display").css("color", redColor);
            $("#totalPrice_currency-" + id).css("color", redColor);
            // $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);                
          } else {
            $("#overridePrice_currency-" + id + "-display").css("color", blackColor);
          }

        }

        function isOverrideDiscount(id) {
          console.log("isOverrideDiscount", id);
          id = Math.abs(id);
          var overrideDiscountVal = $("#netPriceDiscount-" + id).val();
          var overrideDiscountValue = (overrideDiscountVal != "") ? overrideDiscountVal : 0.0;
          if (overrideDiscountValue != basic_value) {
            $("#netPriceDiscount-" + id).css("color", redColor);
            $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
          } else {
            $("#netPriceDiscount-" + id).css("color", blackColor);
            isOverridePrice(id);
          }
        }
        
        function override_price(data, id) {
          var overridePriceValue = ($(data).val() != "") ? $(data).val().slice(1) : 0.0;
          console.log(overridePriceValue, "==", basic_value, overridePriceValue != basic_value_price);          
          if (overridePriceValue != basic_value_price) {
            $(data).css("color", redColor);
            $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
          }
        }

        function netprice_disc(data, id) {
          var var_netpricediscValue = ($(data).val() != "") ? $(data).val() : 0.0;
          console.log(var_netpricediscValue, "==", basic_value, var_netpricediscValue != basic_value);
          if (var_netpricediscValue != basic_value) {
            $(data).css("color", redColor);
            $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
          }
        }

        $(var_bonusOverride).find("input[type='checkbox']").map(function (index, data) {
          id = $(data).attr("id").replace("overrideBonusQty_", "");
          console.log("overrideBonusQty_", id, $(data).is("checked"));
          if ($(data).is(":checked")) {
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).removeAttr("readonly");
            //set value 0.0 for override price + total price
            $("#netPriceDiscount-"+id).val("0.0").css({"color" : blackColor});
            $("#netPriceDiscount-"+id).attr("readonly", "readonly");
            $("#overridePrice_currency-" + id + "-display").val("P0.00").css({"color" : blackColor});
            $("#overridePrice_currency-" + id + "-display").attr("readonly", "readonly");
            $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").text("0.0").css({ "color": blackColor });
          } else {
            console.log("#" + var_qty.replace("td.cell-", "") + "-" + id);
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", blackColor);
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).attr("readonly", "readonly");
          }

          $(data).on("click change", function () {
            console.log("click change", $(this).is(":checked"));
            if ($(this).is(":checked")) {
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).removeAttr("readonly");
              //set value 0.0 for override price + total price
              $("#netPriceDiscount-" + id).val("0.0").css({ "color": blackColor });              
              $("#netPriceDiscount-" + id).attr("readonly", "readonly");              
              $("#overridePrice_currency-" + id + "-display").val("P0.00").css({ "color": blackColor });   
              $("#overridePrice_currency-" + id + "-display").attr("readonly", "readonly");                         
              $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").text("0.0").css({ "color": blackColor });              
            } else {
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).attr("readonly", "readonly");
            }
          });
        });

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).map(function (index, data) {

          if (!isMobile()) {
            if ($(this).closest(var_qty.replace("td", "")).length > 0) {
              id = $(this).attr("id").replace(var_qty.replace("td.cell-", "") + "-", "");
            }

            if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
              id = $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
              override_price($(this), id);
            }

            if ($(this).closest(var_netpricedisc.replace("td", "")).length > 0) {
              id = $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", "") + "-", "").replace("-display", "");
              netprice_disc($(this), id);
            }
            
            if ($(this).closest(var_qtyBonus.replace("td","")).length > 0 ){
              
              if($(this).val() > 0){
                $(this).css("color", redColor);
              }
              
            }

          }

        });

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).on("click focus focusin", function () {

          var id = "";
          if ($(this).closest(var_qty.replace("td", "")).length > 0) {
            id = "qty_" + $(this).attr("id").replace(var_qty.replace("td.cell-", ""), "");
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
            if (isMobile()) {
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
            } else {
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
            }
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_Invoiceoverrideprice.replace("td", "")).length > 0) {
            id = "iop_" + $(this).attr("id").replace(var_Invoiceoverrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_netpricedisc.replace("td", "")).length > 0) {
            id = "oip_" + $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", ""), "");
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_comments.replace("td", "")).length > 0) {
            id = "cmt_" + $(this).attr("id").replace(var_comments.replace("td.cell-", ""), "");
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {
            id = "qtyb_" + $(this).attr("id").replace(var_qtyBonus.replace("td.cell-", ""), "");
            $(this).css("color", redColor);
          }



          if (!listEditedField.hasOwnProperty(id)) {
            listEditedField[id] = { before: $(this).val() };
          }

        });

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).on("keyup blur", function () {

          var id = "";
          if ($(this).closest(var_qty.replace("td", "")).length > 0) {
            id = "qty_" + $(this).attr("id").replace(var_qty.replace("td.cell-", ""), "");
          }

          if (isMobile()) {
            if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
            }
          }
          else {
            if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
            }
          }

          if ($(this).closest(var_Invoiceoverrideprice.replace("td", "")).length > 0) {
            id = "iop_" + $(this).attr("id").replace(var_Invoiceoverrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
          }

          if ($(this).closest(var_netpricedisc.replace("td", "")).length > 0) {
            id = "oip_" + $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", ""), "");
          }

          if ($(this).closest(var_comments.replace("td", "")).length > 0) {
            id = "cmt_" + $(this).attr("id").replace(var_comments.replace("td.cell-", ""), "");
          }

          if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {
            id = "qtyb_" + $(this).attr("id").replace(var_qtyBonus.replace("td.cell-", ""), "");
          }

          listEditedField[id]["after"] = $(this).val();
          var currentObject = $(this);
          // var isShowMessage = false;
          // console.log(listEditedField);
          $.each(listEditedField, function (index, data) {

            if (index == id) {
              if (data.before == data.after) {
                $(currentObject).css("color", blackColor);

                if (id.indexOf("op_") != -1) {
                  current_id = parseInt(id.replace("op_", ""));
                  // $("#qty-" + id.replace("op_", "") ).css("color", blackColor);
                  isOverridePrice(current_id);
                  isOverrideDiscount(current_id);
                }

                if (id.indexOf("oip_") != -1) {
                  current_id = parseInt(id.replace("oip_", ""));
                  isOverrideDiscount(current_id);
                }

              } else {
                $(currentObject).css("color", redColor);

                if (id.indexOf("op_") != -1) {
                  current_id = parseInt(id.replace("op_", ""));
                  // $("#qty-" + id.replace("op_", "")).css("color", redColor);
                  isOverridePrice(current_id);
                  isOverrideDiscount(current_id);
                }
              }
            }

          });

          var isShowMessage = false;
          $.each(listEditedField, function (index, data) {
            if (!isShowMessage) {
              if (data.before != data.after) {
                isShowMessage = true;
              }
            } else {
              return false;
            }
          });

          if (isShowMessage) {
            disabled_btn_save_show_alert();
          } else {
            enabled_btn_save_remove_alert();
          }

        });

      }

        /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
        // tw_tooltip_modelconfiguration();
        /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price. */


        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {

          var pageTitle = "";
          if ($("#materialArrayset").length > 0) {
            pageTitle = "model configuration";
          }
          if ($("#line-item-grid").length > 0) {
            pageTitle = "order page";
          }

          if(pageTitle == "order page"){

            function loadOderPageScript() {
              setTimeout(function () {
                if (isLoadingDone) {
                  reAlignSoldShipAddressSection();
                  reset_color_lineitemgrid();
                  order_page_stock_color();
                } else {
                  loadOderPageScript();
                }
              }, 1000);
            }

            loadOderPageScript();

          }else{
            function loadShoppingCartScript(){
              setTimeout(function(){
                if (isLoadingDone) {
                  // check_user_change_value(true);
                  textColorQty();                  
                } else {
                  loadShoppingCartScript();
                }
              }, 1000);
            }

            loadShoppingCartScript();
                        
          }

        } else {

          if (pagetitle == 'commerce management' || pagetitle == 'transaction' || pagetitle == 'model configuration' || pagetitle == "report manager") {
            
            if (pagetitle == 'commerce management') {

            } else if (pagetitle == 'transaction') {

              function loadOderPageScript() {
                setTimeout(function () {
                  if (isLoadingDone) {
                    reset_color_lineitemgrid();
                    order_page_stock_color();
                  } else {
                    loadOderPageScript();
                  }
                }, 1000);
              }

              loadOderPageScript();

            } else if (pagetitle == 'model configuration') {
              function loadShoppingCartScript() {
                setTimeout(function () {
                  if (isLoadingDone) {
                    textColorQty();
                  } else {
                    loadShoppingCartScript();
                  }
                }, 1000);
              }

              loadShoppingCartScript();
            } else if (pagetitle == "report manager") {

            }

          } else if (pagetitle == 'folders'){

          } else if (pagetitle == 'my profile'){
            
          }
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