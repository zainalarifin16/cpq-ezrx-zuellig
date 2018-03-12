/* 
        Created By    :- Created By Pratap Rudra, Date : 13 Feb 2018
        Task          :- Customization Related to Taiwan(TW)
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
*/
$(document).ready(function(){
    console.log(' <===== Loded TW =====>');  
    
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
        overrideInvoicePrice.css("color", redColor);
        if($(data).find(".text-field").val().length > 0){
          var rowMaterial = $(overrideInvoicePrice).data("value-attr").replace("overrideInvoicePrice-", "");
          $( "#overridePrice-"+rowMaterial ).css("color", redColor);
          $( "#qty_text-"+rowMaterial ).css("color", redColor);
        }
      });
    }

    /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
    function tw_tooltip_modelconfiguration(){

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

      $('td.cell-promotion')
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

        $("td.cell-overrideInvoicePrice, td.cell-qty_text, td.cell-overridePrice").find(".text-field").on("click focus", function(){

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

          if(!listEditedField.hasOwnProperty(id))
          {
              listEditedField[id] = { before : $(this).val() };
          }

        });

        $("td.cell-overrideInvoicePrice, td.cell-qty_text, td.cell-overridePrice").find(".text-field").on("keyup blur", function(){
          
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

    $("#readonly_1_paymentTerm_TW_t").on("change", function(){
      // when user change value of readonly_1_paymentTerm_TW_t, then get the value of readonly_1_paymentTerm_TW_t and save it
      $("#defaultPaymentTerm_TW_t").prop("value", $("#readonly_1_paymentTerm_TW_t option:selected").val());
      $("#save").click();
    });

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

            //remove duplicate of saveQuoteRequired_t
            $($("input[name='saveQuoteRequired_t']")[1]).remove();

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

            /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
            tw_tooltip_modelconfiguration();
            /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price. */

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

      var check_btn_payment_term = function(){
        //need settimeout because element not ready
        setTimeout(function(){
        // when user change value of readonly_1_paymentTerm_TW_t, then get the value of readonly_1_paymentTerm_TW_t and save it
          console.log("waiting doc ready");
          $("#select-38-button").find("select").prop("disabled", true);
          if($("#jg-overlay").css("display") == "none"){
            setTimeout(function(){
              console.log("implementation listen button 38");
              console.log($("#select-38-button").find("select"));
              $("#select-38-button").find("select").prop("disabled", false);
              $("#select-38-button").find("select").on("change", function(){
                console.log("on save select");
                $("#defaultPaymentTerm_TW_t").prop("value", $("#select-38-button option:selected").val() );
                $(".action-type-modify")[0].click();
              });
            }, 3000);
          }else{
            check_btn_payment_term();
          }

        }, 1000);// settimeout 
      }

      check_btn_payment_term();

      /* 
        Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
        Task          :- TW-01 & TW-02 Persist Payment term selection
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
      */

    } else {
       
    }

});