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
    //userCountry = 'PH';
    var countryEle = document.getElementById('userSalesOrg_t');

    if(countryEle !== null){
        var countryCode = parseInt(countryEle.value);
        console.log('countryCode - ',countryCode);

        if(countryCode === 2500){
            userCountry = 'PH';
        } else {}
        
        console.log('userCountry - ',userCountry);
        
    }
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

        var check_field_address_ready = function(){
          setTimeout(function(){

            if($("#jg-overlay").css("display") == "none"){
              
              $("#attr_wrapper_1_customerSoldToId_New").closest(".column").css("margin-left", "0px");
              $($("#field_wrapper_1_customerShipToId_t").closest(".column-layout").children()[0]).css("display", "block"); //clone spacer to element
            
            }else{
              check_field_address_ready();
            }

          }, 1000);
        }

        check_field_address_ready();

        /* 
          Created By    :- Created By Zainal Arifin, Date : 19 Feb 2018
          Task          :- TW-07 Address set layout correction.
          Page          :- Global
          File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
          Layout        :- Both (Desktop/Mobile)
        */

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