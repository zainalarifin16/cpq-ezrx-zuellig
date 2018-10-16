/* 
    Created By    :- Created By Zainal Arifin
    Task          :- Call script by specific country
    Page          :- Global
    File Location :- $BASE_PATH$/javascript/country_spesific_loading.js
    Layout        :- Both (Desktop/Mobile)
*/
$(document).ready(function() {

    if( !window.check_country("SG") ){
        
        var url_script = "";
        console.log( "TH ?", window.check_country("TH") );
        console.log( "VN ?", window.check_country("VN") );
        console.log( "MY ?", window.check_country("MY") );
        if( window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") ){
            console.log( "SPESIFIC GLOBAL TEMPLATE", window.check_country("TW") || window.check_country("TH") || window.check_country("VN") || window.check_country("MY") );
            url_script = script_global_template;
        }
        if( window.check_country("PH") ){
            url_script = script_spesific_ph;
        }

          //we call script
        if( url_script.length > 0 ){
            url_script.forEach(function(dataUrl, index){
              $.ajax({
                  url: dataUrl,
                  dataType: "script",
                  async: false,
                  success: function( data, textStatus, jqxhr ) {
                      console.log( data ); // Data returned
                    //   console.log( textStatus ); // Success
                    //   console.log( jqxhr.status ); // 200
                      console.log( "Script TW / PH was performed." );
                  }//end of success aja response.
                });//end of ajax function
            });//end of foreach script
        }
        // }

    }//end of if countryEle

});