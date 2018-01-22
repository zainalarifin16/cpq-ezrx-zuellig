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
            $('#attr_wrapper_1__soldTo_t_address').parent().before('<div id="soldToAddress88"><span>Sold To Address</span></div><div class="column spacer-column label-left" style="width:30%"><div class="form-item clearfix attr-spacer" style="height: 30px;"></div></div>');

        }

        /*
            End   : 03 Jan 2018
            Task  : Ship To Address header name to Sold to Address for PH.
            Page  : Global
            File Location : $BASE_PATH$/javascript/js-ezrx.js
            Layout : Both
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