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
			$('#attr_wrapper_1__soldTo_t_address').parent().attr("style","width: 40%;");
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

                        $( $("#attr_wrapper_1_customerSoldToId_New").closest(".column-layout").children()[0] ).remove(); //remove spacer from element

                        $( $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").children()[0] ).remove(); //remove element Draft order detail on cloned
                        $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").prepend( $($(".spacer-column")[0]).clone() ); //clone spacer to element
                        $( $("#attr_wrapper_1_shipToAddress_html_t").closest(".column").children()[0] ).remove(); //remove label Ship To Address

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
                        $( $("textarea[name='frequentlyAccessedCustomers_t']")[1] ).remove();

                        //remove duplicate of saveQuoteRequired_t
                        $($("input[name='saveQuoteRequired_t']")[1]).remove();

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
          if (type_material == "bonus") {
            var isBonusOverride = $(this).find("span[id*='bonusOverideFlag_l']").text().trim().toLowerCase();
            if (isBonusOverride == "true") {
              var typeBonus = $(parent).find("span[id*='bonusType_l']").text().trim().toLowerCase();
              if (typeBonus == "system bonus") {
                var qty_span = $(parent).find("span[id*='qty_int_l']");
                $(qty_span).css("color", "red");
              }
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

        var order_page_stock_color_mobile = function () {
          var redColor = "rgb(255, 0, 0)";
          var blackColor = "rgb(0, 0, 0)";
          
          $('#line-item-grid .lig-side-scroller>table tr.lig-row.child').each(function () {
            var $child = $(this).children('td');
            var isBonusOverride = $($child).find('input[name*="bonusOverideFlag_l"]').val().trim().toLowerCase();
            var isPriceOverride = $($child).find('input[name*="isPriceOverride"]').val();
            var isNetPriceDisc = $($child).find('input[name*="netPriceDiscount_t"]').val();
            
            var qty_text = $($child).find('input[name*="qty_l"]');
            var totalPrice_text = $($child).find('input[name*="totalPrice_l"]');
            var unitPrice_text = $($child).find('input[name*="unitPrice_l"]');
            var type_material = $($child).find('input[name*="refNO_text"]').val().trim().toLowerCase();

            if (isPriceOverride.toLowerCase() == "true"){
              $($(unitPrice_text).siblings()[0]).css("color", redColor);
              $($(totalPrice_text).siblings()[0]).css("color", redColor);              
            }
            
            if(isNetPriceDisc.toLowerCase() != "0.0"){
              $($(unitPrice_text).siblings()[0]).css("color", redColor);
              $($(totalPrice_text).siblings()[0]).css("color", redColor); 
            }

            if (type_material == "bonus") {
              if (isBonusOverride == "true") {
                var typeBonus = $($child).find('input[name*="bonusType_l"]').val().trim().toLowerCase();
                if (typeBonus == "system bonus") {
                  $($(qty_text).siblings()[0]).css("color", redColor);
                }
              }
              $($(unitPrice_text).siblings()[0]).css("color", blackColor);
              $($(totalPrice_text).siblings()[0]).css("color", blackColor); 
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
              if (isMobile()) {
                $(".button-save").attr("disabled");
              } else {
                $("#btn-cart-save").attr("disabled", true).css({ "background-color": "grey" });
              }
            } else {
              $("#btn-cart-addtoorder").attr("disabled", true).css({ "background-color": "grey" });
            }
          }
        }

        function enabled_btn_save_remove_alert() {
          $("#update-alert").remove();
          if ($("#btn-cart-save").length > 0) {
            if (isMobile()) {
              $(".button-save").removeAttr("disabled");
            } else {
              $("#btn-cart-save").attr("disabled", false).css({ "background-color": "#0C727A" });
            }
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
        var var_totalPrice_Currency = "td.cell-totalPrice_currency";

        var redColor = "rgb(255, 0, 0)";
        var blackColor = "rgb(0, 0, 0)";

        var basic_value = "0.0";
        var basic_value_price = "0.00";
        var listEditedField = {};
        var var_find_text = (isMobile()) ? ".form-field" : ".text-field";

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus + ", " + var_bonusOverride).off();

        function isOverridePrice(id) {
          id = Math.abs(id);
          var overridePriceString = (isMobile()) ? "overridePrice_currency" : "overridePrice_currency-";
          var overridePriceVal = $("#" + overridePriceString + id + "-display").val();
          if (!isMobile()) {
            var overridePriceValue = (overridePriceVal != "") ? overridePriceVal.slice(1) : 0.0;
          }
          if (overridePriceValue != basic_value_price) {
            $("#" + overridePriceString + id + "-display").css("color", redColor);
            if (!isMobile()) {
              $("#totalPrice_currency-" + id).css("color", redColor);
            } else {
              console.log("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id);
              console.log($("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id));
              $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).find(".form-field").css({ "color": redColor });
            }
            // $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);                
          } else {
            $("#" + overridePriceValue + id + "-display").css("color", blackColor);
          }

        }

        function isOverrideDiscount(id) {
          console.log("isOverrideDiscount", id);
          id = Math.abs(id);
          var overrideDiscountVal = $("#netPriceDiscount-" + id).val();
          var overrideDiscountValue = (overrideDiscountVal != "") ? overrideDiscountVal : 0.0;
          if (overrideDiscountValue != basic_value) {
            $("#netPriceDiscount-" + id).css("color", redColor);
            if (!isMobile()) {
              $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
            } else {
              console.log("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id);
              console.log($("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id));
              $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).find(".form-field").css({ "color": redColor });
            }
          } else {
            $("#netPriceDiscount-" + id).css("color", blackColor);
            isOverridePrice(id);
          }
        }

        function override_price(data, id) {
          if (isMobile()) {
            overridePriceValue = parseFloat($("#" + var_overrideprice.replace("td.cell-", "") + id).val());
          } else {
            overridePriceValue = ($(data).val() != "") ? $(data).val().slice(1) : 0.0;
          }
          console.log(overridePriceValue, "==", basic_value_price, overridePriceValue != basic_value_price);
          if (overridePriceValue != basic_value_price) {
            $(data).css("color", redColor);
            if (!isMobile()) {
              $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
            } else {
              console.log("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id);
              $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).find(".form-field").css({ "color": redColor });
            }
          }
        }

        function netprice_disc(data, id) {
          var var_netpricediscValue = ($(data).val() != "") ? $(data).val() : 0.0;
          console.log(var_netpricediscValue, "==", basic_value, var_netpricediscValue != basic_value);
          if (var_netpricediscValue != basic_value) {
            $(data).css("color", redColor);
            if (!isMobile()) {
              $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
            } else {
              $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).find(".form-field").css({ "color": redColor });
            }
          }
        }


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
          } else {
            if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
              id = $(this).attr("id").replace(var_overrideprice.replace("td.cell-", ""), "").replace("-display", "");
              override_price($(this), id);
            }

            if (typeof $(this).attr("id") != 'undefined') {
              if ($(this).closest(var_netpricedisc.replace("td", "")).length > 0) {
                id = $(this).attr("id").replace(var_netpricedisc.replace("td.cell-", ""), "");
                netprice_disc($(this), id);
              }
            }
          }

        });

        var typeBnsOverride = (isMobile()) ? "select" : "input[type='checkbox']";
        $(var_bonusOverride).find(typeBnsOverride).map(function (index, data) {
          id = (isMobile()) ? $(data).attr("id").replace("overrideBonusQty", "") : $(data).attr("id").replace("overrideBonusQty_", "");

          /* set net price discount and overrideprice to readonly */
          var overridePriceString = (isMobile()) ? "overridePrice_currency" : "overridePrice_currency-";
          $("#netPriceDiscount-" + id).val("0.0").css({ "color": blackColor, "background": "transparent", "border": "0px" });
          $("#netPriceDiscount-" + id).attr("readonly", "readonly");
          //set value 0.0 total price
          if (!isMobile()) {
            $("#" + overridePriceString + id + "-display").val("P0.00").css({ "color": blackColor, "background": "transparent", "border": "0px" });
            $("#" + overridePriceString + id + "-display").attr("readonly", "readonly");
            $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").text("0.0").css({ "color": blackColor });
          } else {
            $("#" + overridePriceString + id + "-display").val("P0.00").css({ "color": blackColor }).parent().css({ "background": "transparent", "border": "0px" });
            $("#" + overridePriceString + id + "-display").attr("readonly", "readonly");
            $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).find(".form-field").css({ "color": blackColor });
            //remove class recommended
            $("#" + overridePriceString + id + "-display").closest(var_overrideprice.replace("td", "")).removeClass("recommended");
            $("#" + var_totalPrice_Currency.replace("td.", "") + "-" + id).closest(var_totalPrice_Currency.replace("td", "")).removeClass("recommended")
          }

          // Check if Checbox is checked

          if (isMobile()) {
            isChecked = $(data).val();
            if (isChecked.toLowerCase() == "true") {
              isChecked = true;
            } else {
              isChecked = false;
            }
          } else {
            isChecked = $(data).is(":checked");
          }
          console.log( $(data).attr("id"), isChecked );          
          if (isChecked) {
            if(isMobile()){
              $("#" + var_qty.replace("td.cell-", "") + id).css("color", redColor);
            }else{
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
            }
            var qty_bns_current = $("#" + var_qty.replace("td.cell-", "") + "-" + id).val();
            var qty_bns_before = $("#prevQty-" + id).val();
            if (qty_bns_before != qty_bns_current) {
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
            }
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).removeAttr("readonly");
          } else {
            console.log("#" + var_qty.replace("td.cell-", "") + "-" + id);
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", blackColor);
            $("#" + var_qty.replace("td.cell-", "") + "-" + id).attr("readonly", "readonly");
          }

          // Listen On CLICK
          $(data).on("click change", function () {
            console.log("click change", $(this).is(":checked"));
            id = $(this).attr("id").replace("overrideBonusQty_", "");
            var overridePriceString = (isMobile()) ? "overridePrice_currency" : "overridePrice_currency-";

            if (isMobile()) {
              isChecked = $(data).val();
              if (isChecked.toLowerCase() == "true") {
                isChecked = true;
              } else {
                isChecked = false;
              }
            } else {
              isChecked = $(data).is(":checked");
            }

            if (isChecked) {
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).removeAttr("readonly");
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
              //set value 0.0 for override price + total price

              var qty_bns_current = $("#" + var_qty.replace("td.cell-", "") + "-" + id).val();
              var qty_bns_before = $("#prevQty-" + id).val();
              if (qty_bns_before != qty_bns_current) {
                $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
              }

            } else {
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).attr("readonly", "readonly");
              $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", blackColor);

            }
          });
        });

        $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).on("click focus focusin", function () {

          var id = "";
          if ($(this).closest(var_qty.replace("td", "")).length > 0) {
            id = "qty_" + $(this).attr("id").replace(var_qty.replace("td.cell-", ""), "");
            $(this).css("color", redColor);
          }

          if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
            if (isMobile()) {
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", ""), "").replace("-display", "");
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

          console.log(id);

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
              id = "op_" + $(this).attr("id").replace(var_overrideprice.replace("td.cell-", ""), "").replace("-display", "");
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

            console.log(id);
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

              if (id.indexOf("qty_") != -1) {
                var var_type_qty = $(this).closest("tr").find("td.cell-type").find(".attribute-field.read-only").text().trim().toLowerCase();
                if (var_type_qty == "bonus") {
                  var qty_bns_current = $("#" + var_qty.replace("td.cell-", "") + "-" + id).val();
                  var qty_bns_before = $("#prevQty-" + id).val();
                  if (qty_bns_before != qty_bns_current) {
                    $("#" + var_qty.replace("td.cell-", "") + "-" + id).css("color", redColor);
                  }
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

        var reposition_order_mobile = function(){
          
          setTimeout(function(){
            var orderNumber = $("#attribute-transactionID_t").find("div[role='heading']")[0];
            $(orderNumber).css({"width":"18%", "float":"left", "min-width": "40%"});
            $( $(orderNumber).siblings()[0]).css("width", "50%");

            var processingStatus = $("#attribute-status_t").find("div[role='heading']")[0];
            $(processingStatus).css("float", "left");
            $($(processingStatus).siblings()[0]).css("width", "50%");

            var paymentTerm = $("#attribute-defaultPaymentTerm_t").find("div[role='heading']")[0];
            $(paymentTerm).css({"width":"18%"});

            var paymentTermDesc = $("#attribute-paymentTermDescription").find("div[role='heading']")[0];
            $(paymentTermDesc).css({"width":"18%"});

            var orderFailureReason = $("#attribute-OrderFailMessage").find("div[role='heading']")[0];
            $(orderFailureReason).css({"width":"18%"});

          },1000);

        }

        var onShoppingCartSwipe = function(){
          $("body").on("click tochend swipeleft swiperight", "#swipe-sidebar", function (e) {

            var waitingShoppingCartShow = function(){
              setTimeout(function(){
                if ($('.ui-loader').css("display") == "none") {
                  order_page_stock_color_mobile();
                } else {
                  waitingShoppingCartShow();
                }
              }, 500);
            }

            waitingShoppingCartShow();

          });
        }

        var orderPageComponent = function(){
            if(isMobile()){
              $("label[for*='pODate']").css("color", "red");
            }else{
              $("label[for*='pODate']").find("span").css("color", "red");
              $("#field_wrapper_1_pODate").css({"padding-left": "130px"});
            }
        }

                /* 
          Created By    :- Created By Zainal Arifin, Date : 17 April 2018
          Task          :- Order View Page: Material description to be shown on hover for  Additional Bonus Materials.
          Page          :- Model Configuration
          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
          Layout        :- Desktop
        */
        var ph_tooltip_modelconfiguration = function(){
          if(isMobile()){
            
            $("td.cell-additionalMaterialDescription").off();
            $("td.cell-additionalMaterialDescription").each(function (index, data) {
              var button_helper;
              var valueOfPromotion = $(this).find('input[name="promotion"]').val();
              if (valueOfPromotion != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
                $(this).find('input[name=promotion]').prop('type', 'text');
                $(this).find('input[name=promotion]').css('display', 'block !important');
              } else {
                button_helper = '-';
              }
              $($(this).children().children()).hide();
              $($(this).children().children()).parent().append(button_helper);
              $(this).prop("tooltip", valueOfPromotion);

              $(this).on("click", function () {
                var additionalMaterialDescription = $(this).find('input[name="additionalMaterialDescription"]').val();
                if (additionalMaterialDescription.trim() != '') {
                  if ($(this).hasClass('open')) {

                    $(this).removeClass('open');
                    $('.table-tooltip').remove();

                  } else {
                    $(this).addClass('open');
                    $('.table-tooltip').remove();

                    /* if mouse hover on element material description then showing table of Material Description. */
                    var table = '<table class="table-tooltip" >\
                              <thead style="padding:5px;font-weight:bold">\
                                <tr style="background-color:#EEE;">\
                                  <th style="border: 1px solid #999;padding:5px;">Material Description</th>\
                                </tr>\
                              </thead>';
                    table += "<tbody>";
                    table += "<tr><td>" + additionalMaterialDescription + "</td></tr>";
                    table += "</tbody></table>";

                    $(this).parent().parent().parent().parent().append(table);
                    $('.table-tooltip').css({
                      right: '50%',
                      position: 'absolute',
                      transform: 'translate(50%, -50%)',
                      top: '50%',
                      width: '500px'
                    });
                  }
                }
              });
            });

          }else{
            var input_val;
            /* prepare for tooltip on material description */
            $('td.cell-additionalMaterialDescription').off();
            $('td.cell-additionalMaterialDescription').prop("tooltip", function () {
              var input_text = $(this).find(".attribute-field-container span").text();
              return input_text;
            }).mouseenter(function () {
              /* get text of material desciption */
              var input_text = $(this).find(".attribute-field-container span").text();
              /* if mouse hover on element material description then showing table of Material Description. */
              var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">\
                        <thead style="padding:5px;font-weight:bold">\
                          <tr style="background-color:#EEE;">\
                            <th style="border: 1px solid #999;padding:5px;">Material Description</th>\
                          <tr></thead>';
              table += "<tbody>";
              table += "<tr><td>" + input_text + "</td></tr>";
              table += "</tbody></table>";
              // if ($(this).attr('tooltip') != '') {
              /* always showing table of material description */
              $('#myModal').addClass('hover-modal-content').html(table);
              $('#myModal').css("display", "block");
              // }
              $('.cell-additionalMaterialDescription').mouseleave(function () {
                $('#myModal').css("display", "none");
              });
            });

            $('td.cell-additionalMaterialDescription')
              .hover(function (e) {
                e.preventDefault();
              })
              .mousemove(function (e) {
                  /* console.log(e.pageY, $(document).scrollTop(), e.pageY - $(document).scrollTop());
                  console.log(e.pageX, $(document).scrollLeft(), e.pageX - $(document).scrollLeft());
                  console.log( $("#myModal").css("width").replace("px", ""), $("#myModal").css("height").replace("px", "") ); */
                  var offSetWidth = 0;
                  var offsetHeight = 0;
                  var diffWidth = (e.pageX - $(document).scrollLeft() + 10) + parseInt($("#myModal").css("width").replace("px", ""));
                  var diffHeight = (e.pageY - $(document).scrollTop() + 10) + parseInt($("#myModal").css("height").replace("px", ""));
                  // console.log( diffWidth , diffHeight );
                  if (diffWidth > window.innerWidth) {
                    offSetWidth = (window.innerWidth - diffWidth);
                    offSetWidth = Math.abs(offSetWidth) + 50;
                  }
                  if (diffHeight > window.innerHeight) {
                    offsetHeight = window.innerHeight - diffHeight;
                    offsetHeight = Math.abs(offsetHeight) + 10 + parseInt($("#myModal").css("height").replace("px", ""));
                  }
                  var currentTop = (e.pageY - $(document).scrollTop() + 10) - offsetHeight;
                  var currentLeft = (e.pageX - $(document).scrollLeft() + 10) - offSetWidth;
                  $('#myModal')
                    .css('top', currentTop + 'px')
                    .css('left', currentLeft + 'px');
              });
          }
        }
        /* 
          Created By    :- Created By Zainal Arifin, Date : 17 April 2018
          Task          :- Order View Page: Material description to be shown on hover for  Additional Bonus Materials.
          Page          :- Model Configuration
          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
          Layout        :- Desktop
        */

        /* 
          Created By    :- Created By Zainal Arifin, Date : 02 May 2018
          Task          :- Change View Datepicker
          Page          :- Model Configuration
          File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
          Layout        :- Desktop
        */
        
      var datetime_picker = function(){
        
        var fullUrl = window.location.host; //window.location.host is subdomain.domain.com
        var parts = fullUrl.split('.');
        var instanceName = parts[0];

        var mobile_datepicker = function(){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();
          if(dd<10){
                  dd='0'+dd
              } 
              if(mm<10){
                  mm='0'+mm
              } 

          today = yyyy+'-'+mm+'-'+dd;
          $("#pODate").prop("max", today);
          if( $("#pODate").val().length == 0 ){
            $("#pODate").val( today );
          }
          $("#pODate").css({"background":'url("https://'+instanceName+'.bigmachines.com/bmfsweb/'+instanceName+'/image/images/calendar_black.png") no-repeat scroll 7px 7px', "background-position": "99%"});
        }

        var mobile_datepicker_jquery = function(){
          var form_date_podate_before = $("#pODate");
          $( form_date_podate_before ).hide();
          
          var valPoDate = $("#pODate").val();
          $.getScript('https://'+instanceName+'.bigmachines.com/bmfsweb/'+instanceName+'/image/javascript/jquery-ui.min.js', function() {
            
            $("#pODate").prop("type", "input");            
            $( form_date_podate_before ).after("<input id='datepickerpodate' type='text' style='float: left;' readonly >");
            jQuery.noConflict(true);
            $( "#datepickerpodate" ).datepicker({
              showOn: "button",
              buttonImage: "https://"+instanceName+".bigmachines.com/bmfsweb/"+instanceName+"/image/images/calendar_black.png",
              buttonImageOnly: true,
              maxDate: '0',
            });

            if(valPoDate.length > 0){
              $("#datepickerpodate").datepicker("setDate", new Date( valPoDate ) );
            }else{
              $("#datepickerpodate").datepicker("setDate", new Date() );
              today = new Date();
              $("#pODate").val((today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear());
            }

            $("#datepickerpodate").css({"width": "95%"});

            $(".ui-datepicker-trigger").css({"width":"20px"});

            $(".ui-datepicker-trigger").on("click", function(){
              $("#ui-datepicker-div").css({"background":"#ffffff"});

              $(".ui-datepicker-calendar").css({"background": "#ffffff"});

              $(".ui-widget-header").css({ "background": "#1d727b","border": "0px", "color": "#ffffff"});
              $(".ui-datepicker-prev").css({"background-color": "#1d727b"});
              $(".ui-datepicker-next").css({"background-color": "#1d727b", "opacity": "1"});

              $(".ui-datepicker-calendar").find("thead").find("tr").css({"color": "#005e63"});

              $(".ui-state-default, .ui-widget-content .ui-state-default").css({"background": "#1d727b", "font-weight": "bold","font-style": "normal","font-stretch": "normal", "line-height": "normal", "letter-spacing": "normal","text-align": "left", "color": "#ffffff"});

              $(".ui-state-highlight, .ui-widget-content .ui-state-highlight").css({ "background": "#c3d500", "font-weight": "bold", "font-style": "normal", "font-stretch": "normal", "line-height": "normal","letter-spacing": "normal", "text-align": "left", "color": "#ffffff", });
            });
            
            $("#datepickerpodate").on("change", function(){
              var selectedDate = new Date( $(this).val() );
              var date = selectedDate.getDate();
              var month = selectedDate.getMonth() + 1;
              var year = selectedDate.getFullYear();
              $("#pODate").val( month+"/"+date+"/"+year );
            });
            
          });
        }

        var desktop_datepicker = function(){
          var form_date_podate_before = $("#attr_wrapper_1_pODate").find(".form-date");                    
          $( form_date_podate_before ).hide();
          
          var valPoDate = $("#pODate").val();
          $.getScript('https://'+instanceName+'.bigmachines.com/bmfsweb/'+instanceName+'/image/javascript/jquery-ui.min.js', function() {
            
            $( form_date_podate_before ).after("<input id='datepickerpodate' type='text' style='float: left;' >");
            $.noConflict(true);
            $( "#datepickerpodate" ).datepicker({
              showOn: "button",
              buttonImage: "https://"+instanceName+".bigmachines.com/bmfsweb/"+instanceName+"/image/images/calendar_black.png",
              buttonImageOnly: true,
              maxDate: '0',
            });

            if(valPoDate.length > 0){
              $("#datepickerpodate").datepicker("setDate", new Date( valPoDate ) );
            }else{
              $("#datepickerpodate").datepicker("setDate", new Date() );
              today = new Date();
              $("#pODate").val( (today.getMonth() + 1)+"/"+ today.getDate() +"/"+ today.getFullYear() );
            }

            $(".ui-datepicker-trigger").css({"width":"20px"});

            $(".ui-datepicker-trigger").on("click", function(){
              $(".ui-widget-header").css({ "background": "#1d727b","border": "0px", "color": "#ffffff"});

              $(".ui-datepicker-calendar").find("thead").find("tr").css({"color": "#005e63"});

              $(".ui-state-default, .ui-widget-content .ui-state-default").css({"background": "#1d727b", "font-weight": "bold","font-style": "normal","font-stretch": "normal", "line-height": "normal", "letter-spacing": "normal","text-align": "left", "color": "#ffffff"});

              $(".ui-state-highlight, .ui-widget-content .ui-state-highlight").css({ "background": "#c3d500", "font-weight": "bold", "font-style": "normal", "font-stretch": "normal", "line-height": "normal","letter-spacing": "normal", "text-align": "left", "color": "#ffffff", });
            });
            
            $("#datepickerpodate").on("change", function(){
              var selectedDate = new Date( $(this).val() );
              var date = selectedDate.getDate();
              var month = selectedDate.getMonth() + 1;
              var year = selectedDate.getFullYear();
              $("#pODate").val( month+"/"+date+"/"+year );
            });
            
          });
        }

        if(isMobile()){
          mobile_datepicker_jquery();          
          /* f(navigator.userAgent.match(/Android/i)){
            mobile_datepicker_jquery();
          }else{
            mobile_datepicker();
          } */
        }else{
          desktop_datepicker();
        }

      }
      
      /* 
        Created By    :- Created By Zainal Arifin, Date : 02 May 2018
        Task          :- Change View Datepicker
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout        :- Desktop
      */
      
      /* 
        Created By    :- Created By Zainal Arifin, Date : 02 May 2018
        Task          :- Trigger Save after user enter value of "Customer PO Ref" and "PO Date"
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout        :- Desktop
      */
      
      /* var trigger_save = function(){

        var typingTimer;                //timer identifier
        var doneTypingInterval = 3000;  //time in ms, 5 second for example
        var input = "#datepickerpodate, #customerPORef_t";

        $( input ).on("keyup", function(){
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        });
        
        $( input ).on("keydown", function(){
          clearTimeout(typingTimer);
        });

        function doneTyping () {
          if( $("#datepickerpodate").val().length > 0 && $("#orderingRequestNoMoreThan90Characters_t").val().length > 0 )
          {
            $("a[name='save']").click();
          }
        }

      } */
      
      /* 
        Created By    :- Created By Zainal Arifin, Date : 02 May 2018
        Task          :- Trigger Save after user enter value of "Customer PO Ref" and "PO Date"
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout        :- Desktop
      */
      
      /* 
        Created By    :- Created By Zainal Arifin, Date : 15 May 2018
        Task          :- set Selected Customer Sold To ID
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout        :- Desktop
      */
      
      var set_selectedCustomerSoldToID = function(){

        

      }
      
      /* 
        Created By    :- Created By Zainal Arifin, Date : 15 May 2018
        Task          :- set Selected Customer Sold To ID
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/js-ezrx-ph.js
        Layout        :- Desktop
      */



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
                  onShoppingCartSwipe();
                  reposition_order_mobile();
                  orderPageComponent();

                  $("body").on("click touchend","#tab-draftOrder",function(e){
                    function draftOrder(){
                      setTimeout(function(){
                        if( $(".ui-loader.ui-corner-all").css("display") == "none" ){
                          datetime_picker();
                        }else{
                          draftOrder();
                        }
                      }, 1000);
                    }
                    draftOrder();
                  });

                  datetime_picker();
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
                  ph_tooltip_modelconfiguration();
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
                    orderPageComponent();        
                    datetime_picker();
                    // trigger_save();           
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
                    ph_tooltip_modelconfiguration();                    
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
        }
    }
});