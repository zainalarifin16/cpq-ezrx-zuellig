/* 
        Created By    :- Created By Pratap Rudra, Date : 13 Feb 2018
        Task          :- Customization Related to Taiwan(TW)
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
*/
$(document).ready(function(){
    console.log(' <===== Loded TW =====>');  
    
    var isLoadingDone = function () {
      return $("#jg-overlay").css("display") == "none" ? true : false;
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

    /* 
      Created By    :- Created By Zainal Arifin, Date : 21 Feb 2018
      Task          :- remove existing bonus item in Bonus select
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
      Layout        :- Desktop
    */
    function remove_exisiting_bonus(){
      $('#resultsTable').on('click', 'input[type="radio"]', function() {
          $("#materialArrayset").find("input[name='type']").map(function(index, data){
            if($(data).val().toLowerCase() == "bonus"){
              var id = $(data).attr("id").replace("type-","");
              var code_material = $("#material-"+id).val();
              $("select[name='itemBonus']").find("option[value='"+code_material+"']").remove();
            }
          }); 
        
      });
    }
    /* TW-05 and TW-13 Override Invoice Price */
    function override_redcolor(){
      var redColor = "rgb(255, 0, 0)";
      $("td.cell-overrideInvoicePrice ").map(function(index, data){
        var overrideInvoicePrice = $(data).find(".text-field");
        if ($(data).find(".text-field").length > 0 ){
          if($(data).find(".text-field").val().length > 0){
            overrideInvoicePrice.css("color", redColor);
            var rowMaterial = $(overrideInvoicePrice).data("value-attr").replace("overrideInvoicePrice-", "");
            $( "#overridePrice-"+rowMaterial ).css("color", redColor);
            $( "#qty_text-"+rowMaterial ).css("color", redColor);
          }
        }
      });

      $("td.cell-overridePrice").map(function (index, data) {
        var overridePrice = $(data).find(".text-field");
        if ($(data).find(".text-field").length > 0 ){
          if ($(data).find(".text-field").val() != "0.0") {
            overridePrice.css("color", redColor);
            var rowMaterial = $(overridePrice).attr("id").replace("overridePrice-", "");
            $("#overrideInvoicePrice-" + rowMaterial).css("color", redColor);
            $("#qty_text-" + rowMaterial).css("color", redColor);
          }
        }
      });

    }

    /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
    function tw_tooltip_modelconfiguration(){

      $('td.cell-promotion').off();      
      $('td.cell-promotion').attr('tooltip', function() {
          var button_helper;
          var valueOfPromotion = $(this).find('input[name=promotion]').val();

          if (valueOfPromotion != '') {
              button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
              $(this).find('input[name=promotion]').prop('type', 'text');
              $(this).find('input[name=promotion]').css('display', 'block !important');
          } else {
              button_helper = '-';
          }
          // $(this).children('.attribute-field-container').children('span').html(button_helper);
          $($(this).children().children()).hide();
          $($(this).children().children()).parent().append(button_helper);
          return valueOfPromotion;
      }).mouseenter(function() {
          /*
              if mouse hover on element promotion (lens icon) then showing table of Ordered Quantity and contract price
          */

          var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">\
                          <thead style="padding:5px;font-weight:bold">\
                            <tr style="background-color:#EEE;">\
                              <th style="border: 1px solid #999;padding:5px;">Quantity</th>\
                              <th style="border: 1px solid #999;padding:5px;">Invoice Price</th>\
                              <th style="border: 1px solid #999;padding:5px;">Unit Price</th>\
                            </tr>\
                          </thead>';

          var x = $(this).attr('tooltip').trim();
          if (x != "") {
              var col = x.trim().split(",");
              if (col.length > 0) {
                  table += "<tbody>";
                  col.forEach(function(row) {
                      table += '<tr>';
                      //row = row.trim().split('#@#');
                      row = row.trim().split('**');
                      if (row.length > 0) {
                          row.forEach(function(item) {
                              table = table + '<td style="border: 1px solid #999;padding:5px;">' + item + '</td>';
                          });
                      }
                      table += '</tr>';
                  });
                  table += '</tbody>';

              }
          }
          table += '</table>';
          /*
              showing element if the content is not null
          */

          if ($(this).attr('tooltip').trim() != '') {
              $('#myModal').addClass('hover-modal-content').html(table);
              $('#myModal').css("display", "block");
          }
          $('.cell-promotion').mouseleave(function() {
              $('#myModal').css("display", "none");
          });
      });

      var input_val;
      /* prepare for tooltip on material description */
      $('td.cell-additionalMaterialDescription').off();
      $('td.cell-additionalMaterialDescription').attr("tooltip", function () {
        var input_text = $(this).find(".attribute-field-container span").text();
        // console.log('input_text',input_text);
        // $('textarea[name="area_materialDescription"]').hide();
        // console.log('materialDescription', input_text, input_val);
        return input_text;
      }).mouseenter(function () {
        /* get text of material desciption */
        var input_text = $(this).find(".attribute-field-container span").text();
        if ($('input[name="userSalesOrg_PL"]').val() == "2800" || (userCountry === 'TW')) {
          var chineseTxt = '#additionalBonusChineseDescription-' + (parseInt($(this).parent().children().eq(0).html()) - 1);
          console.log(chineseTxt);
          input_text = $(chineseTxt).val();
        }
        console.info(input_text);
        /* if mouse hover on element material description then showing table of Material Description. */
        var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
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

      $('td.cell-promotion, td.cell-additionalMaterialDescription')
        .hover(function(e) {
            e.preventDefault();
        })
        .mousemove(function(e) {
            $('#myModal').css('top', e.pageY - $(document).scrollTop() + 10 + 'px').css('left', e.pageX - $(document).scrollLeft() + 10 + 'px');
        });

    }

    function disabled_btn_save_show_alert()
    {
      if($("#update-alert").length == 0){
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

      $("td.cell-overrideInvoicePrice, td.cell-qty_text, td.cell-overridePrice, td.cell-comments").find(".text-field").on("click focus", function(){

          var id = "";
          if( $(this).closest(".cell-qty_text").length > 0 ){
            id = "qty_"+$(this).attr("id").replace("qty_text-", "");
          }

          if( $(this).closest(".cell-overridePrice").length > 0){
            id = "op_"+$(this).attr("id").replace("overridePrice-", "");
          }

          if( $(this).closest(".cell-overrideInvoicePrice").length > 0 ){
            id = "oip_"+$(this).data("value-attr").replace("overrideInvoicePrice-", "");
          }

          if ($(this).closest(".cell-comments").length > 0 ){
            id = "comment_" + $(this).attr("id").replace("comments-", "");
          }

          if(!listEditedField.hasOwnProperty(id))
          {
              listEditedField[id] = { before : $(this).val() };
          }

        });

        $("td.cell-overrideInvoicePrice, td.cell-qty_text, td.cell-overridePrice, td.cell-comments").find(".text-field").on("keyup blur", function(){
          
          var id = "";
          if( $(this).closest(".cell-qty_text").length > 0 ){
            id = "qty_"+$(this).attr("id").replace("qty_text-", "");
          }

          if( $(this).closest(".cell-overridePrice").length > 0){
            id = "op_"+$(this).attr("id").replace("overridePrice-", "");
          }

          if( $(this).closest(".cell-overrideInvoicePrice").length > 0 ){
            id = "oip_"+$(this).data("value-attr").replace("overrideInvoicePrice-", "");
          }

          if ($(this).closest(".cell-comments").length > 0) {
            id = "comment_" + $(this).attr("id").replace("comments-", "");
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

    function hide_recommended_material(){
      var tabelFavFreqReq = $("#attribute-pastOrders").parent().parent().parent().parent().parent().parent('.column-1');
      $(tabelFavFreqReq.children()[1]).hide();
    }

    $("#zPUserType").prop("disabled", true).parent().css({"background":"transparent", "border": "0px"});

    /* 
      Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
      Task          :- TW-01 & TW-02 Persist Payment term selection
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
      Layout        :- Both (Desktop/Mobile)
    */

    var defaultPaymentTerm = function(){
      if(isMobile()){

        $("#defaultPaymentTerm_TW_t").prop("value", $("#select-38-button option:selected").val());        

        $("#select-38-button").find("select").prop("disabled", true);
        setTimeout(function () {
          console.log("implementation listen button 38");
          console.log($("#select-38-button").find("select"));
          $("#select-38-button").find("select").prop("disabled", false);
          $("#select-38-button").find("select").on("change", function () {
            console.log("on save select");
            $("#defaultPaymentTerm_TW_t").prop("value", $("#select-38-button option:selected").val());
            $(".action-type-modify")[0].click();
          });
        }, 3000);
      }else{

        var paymentTermLabel = $("#readonly_1_status_t").text().trim().toLowerCase();
        if (paymentTermLabel != "not submitted" || paymentTermLabel != "failed" || paymentTermLabel != "transmission failed" ){
          $("#readonly_1_paymentTerm_TW_t select").prop("disabled", "disabled");
          $("#readonly_1_paymentTerm_TW_t select").css({ "background": "transparent", "border": "0px", "-webkit-appearance":"none"});
        }

        $("#defaultPaymentTerm_TW_t").prop("value", $("#readonly_1_paymentTerm_TW_t option:selected").val());
        
        $("#readonly_1_paymentTerm_TW_t").on("change", function () {
          // when user change value of readonly_1_paymentTerm_TW_t, then get the value of readonly_1_paymentTerm_TW_t and save it
          $("#defaultPaymentTerm_TW_t").prop("value", $("#readonly_1_paymentTerm_TW_t option:selected").val());
          $("#save").click();
        });
      }
    }

    /* 
      Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
      Task          :- TW-01 & TW-02 Persist Payment term selection
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
      Layout        :- Both (Desktop/Mobile)
    */

    var check_if_page_isready = function(){
      setTimeout(function(){

        if($("#jg-overlay").css("display") == "none"){

          if($('title').text().toLowerCase() == "shopping cart"){
            /* 
              Created By    :- Created By Zainal Arifin, Date : 19 Feb 2018
              Task          :- TW-07 Address set layout correction.
              Page          :- Global
              File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
              Layout        :- Both (Desktop/Mobile)
            */

            //copy to correct row.

            var element_column_layout = $("#attr_wrapper_1_soldToAddress_html_t").closest(".column-layout");
            $("#attr_wrapper_1_customerShipToId_t").closest(".column-layout").before( element_column_layout.clone() ); //move cloned a row Label to correct row
            $("#attr_wrapper_1_shipToAddress_html_t").remove(); //remove first element Ship To Address

            $("#attr_wrapper_1_customerSoldToId_New").closest(".column-layout").children()[0].remove(); //remove spacer from element

            $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").children()[0].remove(); //remove element Draft order detail on cloned
            $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").prepend( $($(".spacer-column")[0]).clone() ); //clone spacer to element
            $("#attr_wrapper_1_shipToAddress_html_t").closest(".column").children()[0].remove(); //remove label Ship To Address

            $($("#field_wrapper_1_customerShipToId_t").closest(".column-layout").children()[0]).css("display", "block"); //clone spacer to element

            /* 
              Created By    :- Created By Zainal Arifin, Date : 19 Feb 2018
              Task          :- TW-07 Address set layout correction.
              Page          :- Global
              File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
              Layout        :- Both (Desktop/Mobile)
            */

            /* OFFSET ALIGNMENT submitted order detail */

            $("#readonly_1_paymentTerm_TW_t").find("select").css("max-width", "190px");

            /* 
              Created By    :- Created By Zainal Arifin, Date : 15 March 2018
              Task          :- Remove Duplicate input field
              Page          :- Global
              File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
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
              File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
              Layout        :- Desktop
            */

            /* OFFSET ALIGNMENT submitted order detail */

            var api_url_search_customer = "https://oc-129-150-115-223.compute.oraclecloud.com/CPQ_To_DB_Connector/restservices/searchdb/search/name/";
            var query_search = "TN3";

            $.ajax({
                url: api_url_search_customer+query_search,
                headers: {  'Access-Control-Allow-Origin': '*' },
                crossDomain: true,
                dataType: "jsonp",
                contentType: "application/json; charset=utf-8",
                type: 'GET',
                // jsonpCallback: "getCustomerData",
                success: function(result){
                  console.log(result);
                }
            });

            function getCustomerData(jsonp){

              console.log(jsonp);

            }



          }

          if($('title').text().toLowerCase() == "model configuration"){
            /* 
              Remove Existing Bonus Material.
            */  
            remove_exisiting_bonus();

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

            /* TW-05 and TW-13 Override Invoice Price */
            override_redcolor();
            /* TW-05 and TW-13 Override Invoice Price */

            check_user_change_value();

            hide_recommended_material();

          }

        }else{
          check_if_page_isready();
        }

      }, 1000);
    }

    check_if_page_isready();

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", api_url_search_customer+query_search, true);
    // xhr.onload = function () {
    //     console.log(xhr.responseText);
    // };
    // xhr.send();

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
        $("#netPriceDiscount-" + id).val("0.0").css({ "color": blackColor });
        $("#netPriceDiscount-" + id).attr("readonly", "readonly");
        $("#overridePrice_currency-" + id + "-display").val("P0.00").css({ "color": blackColor });
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

        if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {

          if ($(this).val() > 0) {
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

  var resizeTableShoppingCart = function(){
    $("td.cell-overrideInvoicePrice").find(".text-field").each(function(index, fieldText){
      $(fieldText).css({"width": "60px"});
    });
    
    $("td.cell-pPAApprovalNo").find(".text-field").each(function(index, fieldText){
      $(fieldText).css({"width": "60px"});
    });
    
    $("td.cell-comments").find(".text-field").each(function(index, fieldText){
      $(fieldText).css({"width": "80px"});
    });

  }
   
  var resizeTableMaterial = function(){
    $("td[id*='comment_l']").each(function (i, data) {
      $(this).find("span[id*='comment_l']").css({"white-space":"normal"});
    });
  }
    if (navigator.userAgent.match(/Android/i)  ||
          navigator.userAgent.match(/webOS/i)  ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPad/i)   ||
          navigator.userAgent.match(/iPod/i)   ||
          navigator.userAgent.match(/BlackBerry/i) ||
          navigator.userAgent.match(/Windows Phone/i)
    ) {
	     //Mobile Related Code
      console.log("Mobile code attachment");

      /* 
        Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
        Task          :- TW-01 & TW-02 Persist Payment term selection
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
      */

      var pageTitle = "";
      if ($("#materialArrayset").length > 0) {
        pageTitle = "model configuration";
      }
      if ($("#line-item-grid").length > 0) {
        pageTitle = "order page";
      }

      if (pageTitle == "order page") {

        function loadOrderPageScript() {
          setTimeout(function () {
            if (isLoadingDone) {

              /* 
                Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
                Task          :- TW-01 & TW-02 Persist Payment term selection
                Page          :- Global
                File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                Layout        :- Both (Desktop/Mobile)
              */
              defaultPaymentTerm();
              /* 
                Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
                Task          :- TW-01 & TW-02 Persist Payment term selection
                Page          :- Global
                File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                Layout        :- Both (Desktop/Mobile)
              */

            } else {
              loadOrderPageScript();
            }
          }, 1000);
        }

        loadOrderPageScript();

      }else{

        function loadShoppingCartScript() {
          setTimeout(function () {
            if (isLoadingDone) {
              textColorQty();
              /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
              tw_tooltip_modelconfiguration();
              /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price. */
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

          function loadScriptOrderPage() {
            setTimeout(function () {
              if (isLoadingDone) {
                
                /* 
                  Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
                  Task          :- TW-01 & TW-02 Persist Payment term selection
                  Page          :- Global
                  File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                  Layout        :- Both (Desktop/Mobile)
                */
                defaultPaymentTerm();
                /* 
                  Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
                  Task          :- TW-01 & TW-02 Persist Payment term selection
                  Page          :- Global
                  File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                  Layout        :- Both (Desktop/Mobile)
                */
                resizeTableMaterial();

              } else {
                loadScriptOrderPage();
              }
            }, 1000);
          }

          loadScriptOrderPage();

        } else if (pagetitle == 'model configuration') {
          function loadShoppingCartScript() {
            setTimeout(function () {
              if (isLoadingDone) {
                /* TW-17 Scroll bar adjustment in the Shopping cart page and the Commerce Page., Created By Zainal Arifin, Date : 13 April 2018 */
                resizeTableShoppingCart();
                /* TW-17 Scroll bar adjustment in the Shopping cart page and the Commerce Page., Created By Zainal Arifin, Date : 13 April 2018 */
                tw_tooltip_modelconfiguration();
                
              } else {
                loadShoppingCartScript();
              }
            }, 1000);
          }

          loadShoppingCartScript();

        } else if (pagetitle == "report manager") {
          
        }

      } else if (pagetitle == 'folders') {

      } else if (pagetitle == 'my profile') {

      }

    }

});