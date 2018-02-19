$(document).ready(function() {
    console.log("SCRIPT FOOTER");
    var countryEle = document.getElementById('userSalesOrg_t');

  if(countryEle !== null){
    var countryCode = parseInt(countryEle.value);
    console.log('Loded Taiwan (TW) countryCode - ',countryCode);

    if(countryCode === 2800){
        url_script = url_script_tw;
    }else if(countryCode === 2500){
        url_script = url_script_ph;
    }

    //we call script
    $.ajax({
      url: url_script,
      dataType: "script",
      async: false,
      success: function( data, textStatus, jqxhr ) {
          console.log( data ); // Data returned
          console.log( textStatus ); // Success
          console.log( jqxhr.status ); // 200
          console.log( "Script TW / PH was performed." );
      }//end of success aja response.
    });//end of ajax function
    
  }//end of if countryEle

});