$( document ).ready(function() {

  /**
   * isMobile  for check if the app loaded from Mobile
   */
  window.isMobile = function(){
    return navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i);
  }
  
  /**
   * check_country for checking which country user is loggin
   */
  window.check_country = function (country) {
    var countryEle = document.getElementById('userSalesOrg_t');
    if (countryEle == null) { //this is for material page.
        countryEle = $('input[name="userSalesOrg_PL"]').val();
        countryCode = countryEle;
    } else {
        var countryCode = parseInt(countryEle.value);
    }
  
    if (typeof countryCode == "undefined" || countryCode == "" || isNaN(countryCode)) {
        countryCode = "2601";
    }
  
    countryCode = parseInt(countryCode);
  
    if (typeof country == 'undefined') {
        return countryCode;
    }
  
    // IF Application add new country please add this array.
    var SG = [2600, 2601];
    var TW = [2800];
    var PH = [2500];
    var TH = [2900, 2902];
    var MY = [2001];
    var VN = [3000, 3001, 3050, 3070, 3072, 3090];
    var CB = [1500];
    var MDI = [2501];
    valid = false;
    // console.log( "CHECK_COUNTRY", country, countryCode );
    if (country == "SG") {
        if (SG.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "TW") {
        if (TW.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "PH") {
        if (PH.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "TH") {
        if (TH.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "MY") {
        // console.log( "CHECK_COUNTRY", country, countryCode, MY, MY.indexOf( countryCode ) );
        if (MY.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "VN") {
        if (VN.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "CB") {
        if (CB.indexOf(countryCode) != -1) {
            valid = true;
        }
    } else if (country == "MDI") {
        if (MDI.indexOf(countryCode) != -1){
            valid = true;
        }
    }
  
    return valid;
  
  }
  
  /**
   * getZPUserType for getting type user is loggin
   */
  window.getZPUserType = function () {
    if ($("#zPUserType").length > 0 || $("input[name='zPUserType']").length > 0) {
        return ($("#zPUserType").length > 0) ? $("#zPUserType").val().toLowerCase() : $("input[name='zPUserType']").val().toLowerCase();
    } else {
        return "";
    }
  }
  
  /**
   * isGlobalCountry get Flag user is from Global Country
   */
  window.isGlobalCountry = function(){
    var globalTemplateFlag = false;
    if( $("span[id*='globalTemplateFlag']").length > 0 ){
      globalTemplateFlag = ($("span[id*='globalTemplateFlag']").html().toLowerCase() == 'true')? true : false;
    }
    return globalTemplateFlag;
  }
  
  /**
   * isLoadingDone get status of loading state
   */
  window.isLoadingDone = function () {
    return $("#jg-overlay").css("display") == "none" ? true : false;
  }

  /**
   * getQueryVaribaleUrl get value of variable in query URI
   */
  window.getQueryVariableUrl = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
  }
  
});
