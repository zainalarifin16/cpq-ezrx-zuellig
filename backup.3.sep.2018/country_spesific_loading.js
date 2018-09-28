$(document).ready(function() {
    console.log("SCRIPT FOOTER");
    var countryEle = document.getElementById('userSalesOrg_t');

    if(countryEle == null){ //this is for material page.
        countryEle = $('input[name="userSalesOrg_PL"]').val();
        countryCode = countryEle;
    }else{
        var countryCode = parseInt(countryEle.value);
    }

    if(countryEle !== null && (countryEle != 2601 || countryEle != 2601) ){    
        
        var url_script;

        console.log(countryCode);
        if(countryCode == 2800){
            url_script = script_spesific_tw;
        }
        if(countryCode == 2500){
            url_script = script_spesific_ph;
        }

        var isEmpty = (url_script == "");
        var isUndefined = (typeof url_script == "undefined");
        // if( !isEmpty == false || !isUndefined == false ){
          //we call script
          url_script.forEach(function(dataUrl, index){
            $.ajax({
                url: dataUrl,
                dataType: "script",
                async: false,
                success: function( data, textStatus, jqxhr ) {
                    console.log( data ); // Data returned
                    console.log( textStatus ); // Success
                    console.log( jqxhr.status ); // 200
                    console.log( "Script TW / PH was performed." );
                }//end of success aja response.
              });//end of ajax function
          });//end of foreach script
        // }

    }//end of if countryEle

});