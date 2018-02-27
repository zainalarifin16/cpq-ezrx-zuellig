$(document).ready(function(){
    /* 
        Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
        Task          :- 
        Page          :- Model Configuration
        File Location :- $BASE_PATH$/javascript/model-configuration-tw.js
        Layout        :- Desktop
    */
    var userCountry = null;
    var countryCode = null;

    var countryEle = document.getElementById('userSalesOrg_t');

    if(countryEle == null){ //this is for material page.
        countryEle = $('input[name="userSalesOrg_PL"]').val();
        countryCode = countryEle;
    }else{
        countryCode = parseInt(countryEle.value);
    }

    if(countryEle !== null){
        console.log('countryCode - ',countryCode);

        if(countryCode == 2800){
            userCountry = 'TW';
        } else {}
        
        console.log('userCountry - ',userCountry);
        
    }

    if(userCountry === 'TW'){

        /* 
            Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
            Task          :- Hide Feature "Enable Old Material"
            Page          :- Model Configuration
            File Location :- $BASE_PATH$/javascript/model-configuration-tw.js
            Layout        :- Desktop
        */

        $("#attribute-enableOldMaterialSearch").hide();

        /* 
            Created By    :- Created By Zainal Arifin, Date : 27 Feb 2018
            Task          :- Hide Feature "Enable Old Material"
            Page          :- Model Configuration
            File Location :- $BASE_PATH$/javascript/model-configuration-tw.js
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
            
        } else {
            


        }
    }
});