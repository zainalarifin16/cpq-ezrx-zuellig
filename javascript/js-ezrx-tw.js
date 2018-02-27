/* 
        Created By    :- Created By Pratap Rudra, Date : 13 Feb 2018
        Task          :- Customization Related to Taiwan(TW)
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
*/
$(document).ready(function(){
    console.log(' <===== Loded TW =====>');  
    

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
              Created By    :- Created By Zainal Arifin, Date : 21 Feb 2018
              Task          :- remove existing bonus item in Bonus select
              Page          :- Global
              File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
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