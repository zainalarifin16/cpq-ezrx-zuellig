/* 
        Created By    :- Created By Pratap Rudra, Date : 13 Feb 2018
        Task          :- Customization Related to Taiwan(TW)
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
*/
$(document).ready(function(){
    console.log(' <===== Loded TW =====>');  
    
    var fullUrl = window.location.host;
    //window.location.host is subdomain.domain.com
    var parts = fullUrl.split('.');
    var sub = parts[0];

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

    var getZPUserType = function() {
      if ($("#zPUserType").length > 0 || $("input[name='zPUserType']").length > 0 ){
          return ($("#zPUserType").length > 0) ? $("#zPUserType").val().toLowerCase() : $("input[name='zPUserType']").val().toLowerCase();
      }else{
          return "";
      }
  }

    /* 
      Created By    :- Created By Zainal Arifin, Date : 21 Feb 2018
      Task          :- remove existing bonus item in Bonus select
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
      Layout        :- Desktop
    */
    /* 
    function remove_exisiting_bonus(){
      if(isMobile()){
        console.log("implement on click");
        $('#resultsTable').on('click', 'input[type="radio"]', function () {
          console.log("User click this item");
          $("#materialArrayset").find("input[name='materialAndDesc']").map( function(index, data){
            var materialDesc = $(data).closest("tr").find("input[name='materialDescription']").val();
            var typeMaterialandCode = $(data).val().replace( materialDesc, "" ).split("-");
            console.log(typeMaterialandCode);
            if(typeMaterialandCode[0].toLowerCase() == "bonus"){
              $("select[name='itemBonus']").find("option[value='" + typeMaterialandCode[1] + "']").remove();
            }
          });

        });
      }else{
        $('#resultsTable').on('click', 'input[type="radio"]', function () {
          $("#materialArrayset").find("input[name='type']").map(function (index, data) {
            if ($(data).val().toLowerCase() == "bonus") {
              var id = $(data).attr("id").replace("type-", "");
              var code_material = $("#material-" + id).val();
              $("select[name='itemBonus']").find("option[value='" + code_material + "']").remove();
            }
          });

        });
      }
    }
    */    

    /* 
        Created By    :- Created By Zainal Arifin, Date : 02 May 2018
        Task          :- New Search Customer for TW
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
    */

    function search_customer()
    {
      if(isMobile()){

      }else{
        var fileAttachmentBSID_t = $("input[name='fileAttachmentBSID_t']").val();
        var ajaxUrl = "https://" + sub + ".bigmachines.com/rest/v1/commerceProcesses/oraclecpqo/transactions/" + fileAttachmentBSID_t + "/attachments/customerDetails?docId=36244074&docNum=1";

        $.ajax({
          // header: { "Authorization": "Basic " + btoa(usernameGetCustomer + ":" + passwordGetCustomer) },
          type: "GET",
          url: ajaxUrl,
          dataType: "text",
          success: function (customerDetails) {
            // console.log(response);
            /* var seachCustomer;
            searchCustList(customerDetails, seachCustomer);
            searchCustomerList(seachCustomer);
            $('.search-cust_wrapper').hide(); */
            data_table_customer(customerDetails);
          }
        });
      }
    }

    function data_table_customer(dataSet){
      if(isMobile()){

      }else{

          var userCountry =  userDetectFunc();
          var firstDrawData = true;

          dataSet = dataSet.replace("null","");
          var custArr = dataSet.split("##");
          
          var totalRecs = custArr.length;
          var fromIndex = 0;
          var toIndex = totalRecs;
          var dataSet = [];
    
          for(var i = fromIndex; i< toIndex;i++){
            colArr = custArr[i].split("$$");
            
            if(typeof colArr != 'undefined' ){
              var subDataSet = [ 	'',
                        colArr[0],  //1 SOLD TO ID
                        colArr[2],  //2 SOLD TO NAME
                        colArr[1],  //3 SHIP TO ID
                        colArr[13], //4 SHIP TO NAME
                        colArr[17], //5 SHIP TO ADDRESS 1
                        colArr[18], //6 SHIP TO ADDRESS 2
                        colArr[20], //7 SHIP TO DISTRICT
                        colArr[22], //8 SHIP TO CITY
                        colArr[21], //9 SHIP TO POSTAL CODE
                        colArr[14], //10 BILL TO ID
                        colArr[15], //11 BIILL TO NAME
                      ];

              dataSet.push(subDataSet);
            }
    
          }
          var userColumn = [];
      
          userColumn.push( { title: "" } );
  
          coloumn = $("#applicableColumnsForCustomerSearch").val().split("$$");
  
          coloumn.forEach(function(nameColoumn, index){
            if(typeof nameColoumn != 'undefined' ){
              userColumn.push( {title: nameColoumn} );
            }
          });
          
          seachCustomer = js2('#searchCustomer').DataTable({
          destroy: true,
          scrollY: "400px",
          scrollCollapse: true,
          data: dataSet,
          deferRender: true,
          order: [[3, 'asc']],
          columnDefs: [
            {
              targets: 0,
              searchable: true,
              orderable: false,
              render: function(data, type, full, meta){
                
                data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[10] +'">'; 
                return data;

              }
            }
          ],
          
          "fnDrawCallback": function (oSettings) {
            $( $("#searchCustomer_wrapper").find(".dataTable")[0] ).css("table-layout", "fixed");
          },
          columns: userColumn
      
          });
      
          seachCustomer.on( 'draw', function () {
              console.log("draw dt");
              $("input[name='searchCust']").off();
              $("input[name='searchCust']").on('click', function() {
                delete_line_item_func($(this).val());
              });
          });
      
          js2('#searchCustomerInput').keyup(function(){
            var inputLength = js2('#searchCustomerInput').val().length;
            if( inputLength === 3 || inputLength > 3 ) {
              // console.log('show table');
              /*
                  Start : 15 Nov 2017
                  Task  : Customer Type-ahead Search
                  Page  : shopping cart 
                  File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                  Layout : Tablet
              */
      
              var keywordCustomer = js2(this).val();
              if(keywordCustomer.indexOf("%") != -1){
                keywordCustomer = keywordCustomer.replace(/%/g, " ");
                seachCustomer.search( keywordCustomer, true, true).draw();
              }else{
                seachCustomer.search(keywordCustomer).draw();
              }
              /*
                  End : 15 Nov 2017
                  Task  : Customer Type-ahead Search
                  Page  : shopping cart 
                  File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                  Layout : Tablet
              */
              js2('.search-cust_wrapper').show();
      
              var customerName = $($(".dataTables_scroll").find("thead")[0]).find("th")[3]; // for trigger customer name sorting
                
              if(firstDrawData){
                $(customerName).click();
                firstDrawData = false;
              }
      
            } else {
              js2('.search-cust_wrapper').hide();
            }
          });
      
          var searchCust99 = seachCustomer.column(3).search($('#searchCustomerInput').val(),true,true).draw();
          var info = searchCust99.page.info();
          
          if(info.recordsDisplay===0){
            
            seachCustomer2 = js2('#searchCustomer').DataTable({
              destroy: true,
              scrollY: "400px",
              scrollCollapse: true,
              data: dataSet,
              deferRender: true,
              columnDefs: [
                {
                  targets: 0,
                  searchable: true,
                  orderable: false,
                  render: function(data, type, full, meta){

                    if(type === 'display'){
                      data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1]+ '$$' + full[3] + '$$' +full[10] +'">';
                    }
        
                    return data;
                  }
                }
              ],
              columns: userColumn
        
            });
          }
      }
    }

    var delete_line_item_func = function(selectedCustShipID){

      var selectedCustShipID_TW = selectedCustShipID;
      var selectedCustShipID = parseInt(selectedCustShipID);
      var currentCust = parseInt($("span[id*=customerShipToId]").text());
      var line_items_no = $('input[type="checkbox"][name="_line_item_list"]').length;

      if((selectedCustShipID != currentCust) && (selectedCustShipID>0) && (currentCust>0) && (line_items_no>0)) {
        
        if(confirm('The line items will be deleted from order on change of customer. Do you want to proceed?.')){
    
          sessionStorage.setItem('selectedCustShipID', selectedCustShipID);
          sessionStorage.setItem('selectedCustShipID', selectedCustShipID_TW);
          $('input[type="checkbox"][name="_line_item_list"]').prop("checked","checked");
          $('#delete_line_items').on("click",function(){
          }).click();
        }
    
      } else {
        
        $("#selectedCustomerDetail").val(selectedCustShipID);
        $("#selectedCustomerDetail").val(selectedCustShipID_TW);
        var check_nationality = function (nationality) {
          var countryEle = document.getElementById('userSalesOrg_t');
          if (countryEle == null) { //this is for material page.
            countryEle = $('input[name="userSalesOrg_PL"]').val();
            countryCode = countryEle;
          } else {
            var countryCode = parseInt(countryEle.value);
          }
          
          if (typeof countryCode == "undefined") {
            countryCode = "2601";
          }
          if (nationality == 2600) {
            nationality = 2601;
          }
    
          var valid = false;
          if (nationality == countryCode || countryCode == 2601) {
            valid = true;
          }
    
          return valid;
        }
        if(!check_nationality(2500)){
          $("#customerMasterString_t").val("");
        }
        setTimeout(function(){
          $("#save").click();
        }, 500);
      }    
    
    };

    /* 
        Created By    :- Created By Zainal Arifin, Date : 02 May 2018
        Task          :- New Search Customer for TW
        Page          :- Global
        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
        Layout        :- Both (Desktop/Mobile)
    */

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

      if(isMobile()){

        setTimeout(function(){
          $("td.cell-promotion").off();
          $("td.cell-promotion").each(function(index, data){
            var button_helper;
            var valueOfPromotion = $(this).find('input[name="promotion"]').val();

            $($(this).children().children()).hide();

            if (valueOfPromotion != '') {
              button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
              $(this).find('input[name=promotion]').prop('type', 'text');
              $(this).find('input[name=promotion]').css('display', 'block !important');
              if($($(this).children().children()).parent().html().indexOf("material-lens") == -1){
                $($(this).children().children()).parent().append(button_helper); 
              }
            } else {
              button_helper = '-';
              if($($(this).children().children()).parent().text().indexOf("-") == -1){
                $($(this).children().children()).parent().append(button_helper); 
              }
            }

            $(this).prop("tooltip", valueOfPromotion);

            $(this).on("click", function(){
              var valueOfPromotion = $(this).find('input[name="promotion"]').val();
              if(valueOfPromotion.trim() != '') {
                if ($(this).hasClass('open')) {

                  $(this).removeClass('open');
                  $('.table-tooltip').remove();

                } else {
                  $(this).addClass('open');
                  $('.table-tooltip').remove();

                  var table = '<table class="table-tooltip" >\
                              <thead style="padding:5px;font-weight:bold">\
                                <tr style="background-color:#EEE;">\
                                  <th style="border: 1px solid #999;padding:5px;">Quantity</th>\
                                  <th style="border: 1px solid #999;padding:5px;">Invoice Price</th>\
                                  <th style="border: 1px solid #999;padding:5px;">Unit Price</th>\
                                </tr>\
                              </thead>';
                  var x = $(this).prop('tooltip').trim();
                  if (x != "") {
                    //console.log(' mobile_adjust_tooltip 444 =====>>>> ');
                    var col = x.trim().split(",");
                    if (col.length > 0) {
                      table += "<tbody>";
                      col.forEach(function (row) {
                        table += '<tr>';
                        //row = row.trim().split('#@#');
                        row = row.trim().split('**');
                        if (row.length > 0) {
                          row.forEach(function (item) {
                            table = table + '<td style="border: 1px solid #999;padding:5px;">' + item + '</td>';
                          });
                        }
                        table += '</tr>';
                      });
                      table += '</tbody>';

                    }
                  }
                  table += '</table>';
                  
                  $(this).parent().parent().parent().parent().append(table);
                  $('.table-tooltip').css({
                    right: '50%',
                    position: 'absolute',
                    transform: 'translate(50%, -50%)',
                    top: '50%',
                    width: '500px'
                  });
                }
              }
            });
          });
          
          
          $("td.cell-additionalMaterialDescription").off();
          $("td.cell-additionalMaterialDescription").each(function (index, data) {
            var button_helper;
            var valueOfPromotion = $(this).find('input[name="promotion"]').val();
            $($(this).children().children()).hide();
            if (valueOfPromotion != '') {
              button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
              $(this).find('input[name=promotion]').prop('type', 'text');
              $(this).find('input[name=promotion]').css('display', 'block !important');
              if($($(this).children().children()).parent().html().indexOf("material-lens") == -1){
                $($(this).children().children()).parent().append(button_helper); 
              }
            } else {
              button_helper = '-';
              if($($(this).children().children()).parent().text().indexOf("-") == -1){
                $($(this).children().children()).parent().append(button_helper); 
              }
            }
            $(this).prop("tooltip", valueOfPromotion);

            $(this).on("click", function () {
              var additionalMaterialDescription = $(this).find('input[name="additionalMaterialDescription"]').val();
              if (additionalMaterialDescription.trim() != '') {
                if ($(this).hasClass('open')) {

                  $(this).removeClass('open');
                  $('.table-tooltip').remove();

                } else {
                  $(this).addClass('open');
                  $('.table-tooltip').remove();

                  /* if mouse hover on element material description then showing table of Material Description. */
                  var table = '<table class="table-tooltip" >\
                              <thead style="padding:5px;font-weight:bold">\
                                <tr style="background-color:#007077;">\
                                  <th style="border: 1px solid #999;padding:5px;color:#fff;text-shadow:none;">Material Description</th>\
                                </tr>\
                              </thead>';
                  table += "<tbody>";
                  table += "<tr><td>" + additionalMaterialDescription + "</td></tr>";
                  table += "</tbody></table>";

                  $(this).parent().parent().parent().parent().append(table);
                  $('.table-tooltip').css({
                    right: '50%',
                    position: 'absolute',
                    transform: 'translate(50%, -50%)',
                    top: '50%',
                    width: '500px',
                    border: "1px solid !important"
                  });
                }
              }
            });
          });

        }, 1000);
      
      }else{

        $('td.cell-promotion').off();      
        $('td.cell-promotion').prop('tooltip', function() {
            var button_helper;
            var valueOfPromotion = $(this).find('input[name="promotion"]').val();
  
            if (valueOfPromotion != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
                $(this).find('input[name="promotion"]').prop('type', 'text');
                $(this).find('input[name="promotion"]').css('display', 'block !important');
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
            var valueOfPromotion = $(this).find('input[name="promotion"]').val();            
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">\
                            <thead style="padding:5px;font-weight:bold">\
                              <tr style="background-color:#EEE;">\
                                <th style="border: 1px solid #999;padding:5px;">Quantity</th>\
                                <th style="border: 1px solid #999;padding:5px;">Invoice Price</th>\
                                <th style="border: 1px solid #999;padding:5px;">Unit Price</th>\
                              </tr>\
                            </thead>';
  
            var x = valueOfPromotion.trim();
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
  
            if (valueOfPromotion.trim() != '') {
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
        $('td.cell-additionalMaterialDescription').prop("tooltip", function () {
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
          var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">\
                        <thead style="padding:5px;font-weight:bold">\
                          <tr style="background-color:#EEE;">\
                            <th style="border: 1px solid #999;padding:5px;">Material Description</th>\
                          <tr></thead>';
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


    }

    function hide_recommended_material(){
      var tabelFavFreqReq = $("#attribute-pastOrders").parent().parent().parent().parent().parent().parent('.column-1');
      $(tabelFavFreqReq.children()[1]).hide();
    }

    function remove_NT_currency(){
      
      $("td.cell-overrideInvoicePrice").find("input.form-field").each(function(index, data){
        var overrideInvoicePriceVal = $(data).val();
        if(overrideInvoicePriceVal.indexOf("NT$") != -1){
          overrideInvoicePriceVal = overrideInvoicePriceVal.replace("NT$", "");
          $(data).val( overrideInvoicePriceVal );
        }
      });
      
      $("td.cell-overridePrice_currency").find("input.form-field").each(function(index, data){
        var overridePriceVal = $(data).val();
        if(overridePriceVal.indexOf("NT$") != -1){
          overridePriceVal = overridePriceVal.replace("NT$", "");
          $(data).val( overridePriceVal );
        }
      });

    }

    /* 
      Created By    :- Created By Zainal Arifin, Date : 16 Feb 2018
      Task          :- TW-01 & TW-02 Persist Payment term selection
      Page          :- Global
      File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
      Layout        :- Both (Desktop/Mobile)
    */

    var defaultPaymentTerm = function(){
      if(isMobile()){
        var paymentTermLabel = $("input[name='status_t']").val().trim().toLowerCase();
        var defaultPaymentTermComponent = $("#attribute-paymentTerm_TW_t").find("select");

        var currentDefaultPaymentTerm =  $( defaultPaymentTermComponent ).val();
        $("#defaultPaymentTerm_TW_t").prop("value", currentDefaultPaymentTerm );

        setTimeout(function () {
          $( defaultPaymentTermComponent ).on("change", function () {
            currentDefaultPaymentTerm =  $( this ).val();
            $("#defaultPaymentTerm_TW_t").prop("value", currentDefaultPaymentTerm );
            $(".action-type-modify")[0].click();
          });

          if (paymentTermLabel != "not submitted" &&
            paymentTermLabel != "failed" &&
            paymentTermLabel != "transmission failed" &&
            paymentTermLabel != "order initiated") {

            $(defaultPaymentTermComponent).attr("disabled", true).hide();
            $(defaultPaymentTermComponent).parent().css({
              "background": "transparent",
              "border": "0px",
              "text-align": "left",
              "padding-left": "0px",
            }).removeClass("ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow");

          }

        }, 2000);
      }else{

        var paymentTermLabel = $("#readonly_1_status_t").text().trim().toLowerCase();
        if (paymentTermLabel != "not submitted" && 
            paymentTermLabel != "failed" && 
            paymentTermLabel != "transmission failed" && 
            paymentTermLabel != "order initiated" ){
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

            $( $("#attr_wrapper_1_customerSoldToId_New").closest(".column-layout").children()[0] ).remove(); //remove spacer from element

            $( $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").children()[0] ).remove(); //remove element Draft order detail on cloned
            $("#attr_wrapper_1_shipToAddress_html_t").closest(".column-layout").prepend( $($(".spacer-column")[0]).clone() ); //clone spacer to element
            $( $("#attr_wrapper_1_shipToAddress_html_t").closest(".column").children()[0] ).remove(); //remove label Ship To Address

            $($("#field_wrapper_1_customerShipToId_t").closest(".column-layout").children()[0]).css("display", "block"); //clone spacer to element

            $("#readonly_1__soldTo_t_address_2").css("white-space", "normal");

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
            $( $("textarea[name='frequentlyAccessedCustomers_t']")[1] ).remove();

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
          }

          if($('title').text().toLowerCase() == "model configuration"){
            /* 
              Remove Existing Bonus Material.
            */ 

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

            hide_recommended_material();

          }

        }else{
          check_if_page_isready();
        }

      }, 1000);
    }

    check_if_page_isready();

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
          if (isMobile()) {
            $(".button-save").attr("disabled", true);
          } else {
            $("#btn-cart-save").attr("disabled", true).css({ "background-color": "grey" });
          }
        } else {
          $("#btn-cart-addtoorder").attr("disabled", true).css({ "background-color": "grey" });
        }
      }
    }

    function enabled_btn_save_remove_alert() {
      $("#update-alert").remove();
      if ($("#btn-cart-save").length > 0) {
        if (isMobile()) {
          $(".button-save").removeAttr("disabled");
        } else {
          $("#btn-cart-save").attr("disabled", false).css({ "background-color": "#0C727A" });
        }
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
    var var_totalPrice_Currency = "td.cell-totalPrice_currency";

    var redColor = "rgb(255, 0, 0)";
    var blackColor = "rgb(0, 0, 0)";

    var basic_value = "0.0";
    var basic_value_price = "0.00";
    var listEditedField = {};
    var var_find_text = (isMobile()) ? ".form-field" : ".text-field";

    $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus + ", " + var_bonusOverride).off();
    $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus + ", " + var_bonusOverride).find(var_find_text).map(function(index, data){
      $(data).css("color", blackColor);
    });

    $(var_totalPrice_Currency).find("span.attribute-field").map(function(index, data){
      $(data).css("color", blackColor);
    });

    function check_qty_and_stock(data, id) {
      if ($(data).val() > $("#stockQty-" + id).val()) {
        // qty color become red highlight if val is greater than stock
        $(data).css("color", redColor);
      }
    }

    function isOverridePrice(currentObject) {
      // console.log(id);
      // id = Math.abs(id);
      var overridePriceVal = $( currentObject ).val();
      var overridePriceValue = (overridePriceVal != "") ? overridePriceVal.replace("NT$", "") : "0.00";
      if (overridePriceValue != basic_value_price) {
        $(currentObject ).css("color", redColor);
        /* var totalPrice_currency = $(currentObject).closest("tr").find(".cell-totalPrice_currency").find("span.form-field");
        $( totalPrice_currency ).css("color", redColor); */
      } else {
        $( currentObject ).css("color", blackColor);
      }

    }

    function isOverrideInvoicePrice(currentObject){
      var overrideInvoicePriceVal = $( currentObject ).val();
      var overrideInvoicePriceValue = (overrideInvoicePriceVal != "") ? overrideInvoicePriceVal.replace("NT$", "") : "0.00";
      if (overrideInvoicePriceValue != basic_value_price){
        $(currentObject).css("color", redColor);
      }else{
        $(currentObject).css("color", blackColor);
      }
    }

    function override_price(data, id) {
      var overridePriceValue = ($(data).val() != "") ? $(data).val().replace("NT$", "") : "0.00";
      // console.log(overridePriceValue, "==", basic_value, overridePriceValue != basic_value_price);
      if (overridePriceValue != basic_value_price) {
        $(data).css("color", redColor);
        /* var totalPrice_currency = $(data).closest("tr").find(".cell-totalPrice_currency").find("span.form-field");
        $( totalPrice_currency ).css("color", redColor); */
        // $("#totalPrice_currency-" + id).parent().find(".attribute-field.read-only").css("color", redColor);
      }
    }

    function override_invoicePrice(data){
      var override_invoicePriceVal = ($(data).val() != "") ? $(data).val().replace("NT$", "") : "0.00";
      if(override_invoicePriceVal != basic_value_price){
        $(data).css("color", redColor);        
      }
    }

    $(var_netpricedisc + ", " + var_qty + ", " + var_overrideprice + ", " + var_Invoiceoverrideprice + ", " + var_comments + ", " + var_qtyBonus).find(var_find_text).map(function (index, data) {

      if (!isMobile()) {
        if ($(this).closest(var_qty.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_qty.replace("td.cell-", "") + "-", "");
          check_qty_and_stock(this, id);
        }

        if ($(this).closest(var_Invoiceoverrideprice.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_Invoiceoverrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
          override_price($(this), id);
        }
        
        if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
          override_price($(this), id);
        }

        if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {

          if ($(this).val() > 0) {
            $(this).css("color", redColor);
          }

        }

        if ($(this).closest(var_comments.replace("td", "")).length > 0){

          if($(this).val().trim().length > 0){
            $(this).css("color", redColor);
          }

        }

      }else{
        if ($(this).closest(var_qty.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_qty.replace("td.cell-", "") + "-", "");
          check_qty_and_stock(this, id);
        }

        if ($(this).closest(var_Invoiceoverrideprice.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_Invoiceoverrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
          override_price($(this), id);
        }

        if ($(this).closest(var_overrideprice.replace("td", "")).length > 0) {
          id = $(this).attr("id").replace(var_overrideprice.replace("td.cell-", "") + "-", "").replace("-display", "");
          override_price($(this), id);
        }

        if ($(this).closest(var_qtyBonus.replace("td", "")).length > 0) {

          if ($(this).val() > 0) {
            $(this).css("color", redColor);
          }

        }

        if ($(this).closest(var_comments.replace("td", "")).length > 0) {

          if ($(this).val().trim().length > 0) {
            $(this).css("color", redColor);
          }

        }
      }

    });


    var typeBnsOverride = (isMobile()) ? "select" : "input[type='checkbox']";    
    $(var_bonusOverride).find(typeBnsOverride).map(function (index, data) {
      
      var parentTR = $(data).closest("tr");
      // var qty = $(parentTR).find(".cell-qty").find(".form-field");
      var qty = $(parentTR).find(".cell-qty").find(".text-field");
      var overridePrice = $(parentTR).find(".cell-overridePrice_currency").find(".form-field");
      
      if (isMobile()) {
        isChecked = $(data).val();
        if (isChecked.toLowerCase() == "true") {
          isChecked = true;
        } else {
          isChecked = false;
        }
      } else {
        isChecked = $(data).is(":checked");
      }

      if(isChecked){
        $(qty).removeAttr("readonly");
        $(qty).css("color", redColor);
      }else{
        $(qty).attr("readonly", "readonly");
        $(qty).css("color", blackColor);
      }

      $(data).on("click change", function(){

        if (isMobile()) {
          isChecked = $(data).val();
          if (isChecked.toLowerCase() == "true") {
            isChecked = true;
          } else {
            isChecked = false;
          }
        } else {
          isChecked = $(data).is(":checked");
        }

        if (isChecked) {
          $(qty).removeAttr("readonly");
          $(qty).css("color", redColor);

        } else {
          $(qty).attr("readonly", "readonly");
          $(qty).css("color", blackColor);

        }

      });
      

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
      
      $.each(listEditedField, function (index, data) {

        if (index == id) {
          if (data.before == data.after) {
            $(currentObject).css("color", blackColor);

            if (id.indexOf("op_") != -1) {
              isOverridePrice(currentObject);
            }

          } else {
            $(currentObject).css("color", redColor);
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
    
    setTimeout(function(){
      $("td.cell-overrideInvoicePrice").find(".text-field").each(function (index, fieldText) {
        $(fieldText).css({ "max-width": "80px", "min-width": "80px" });
      });

      $("td.cell-overridePrice_currency").find(".text-field").each(function (index, fieldText) {
        $(fieldText).css({ "max-width": "80px", "min-width": "80px" });
      });

      $("td.cell-pPAApprovalNo").find(".text-field").each(function (index, fieldText) {
        $(fieldText).css({ "width": "60px" });
      });

      $("td.cell-comments").find(".text-field").each(function (index, fieldText) {
        $(fieldText).css({ "width": "80px" });
      });
    }, 1000);

  }
   
  var resizeTableMaterial = function(){
    $("td[id*='comment_l']").each(function (i, data) {
      $(this).find("span[id*='comment_l']").css({"white-space":"normal"});
    });
  }
    
  var orderPageRestyle = function(){
    
    $("#zPUserType").prop("disabled", true).parent().css({ "background": "transparent", "border": "0px" });

    $("input[name='_line_item_list']").change(function () {
      
      var currTr = $(this).parent().parent();
      var checked = $(this).is(":checked");
      var type = currTr.find('[name*=bonusType_l]').val();
      var type2 = currTr.find('td:nth-child(3)').find('input').val();

      if (type2 === 'Comm') {
        var childTr = currTr.nextUntil("tr.child-line-item").find('td:first-child').find('input[name*=_line_item_list]');
        if (checked === true) {
          childTr.prop('checked', true);
          childTr.prop('disabled', true);
        } else {
          childTr.prop('checked', false);
          childTr.prop('disabled', false);          
        }
      } else if (type2 == 'Bonus') {
        /* var parentCheckbox = currTr.prevAll('tr.child-line-item').eq(0).find('input[name*=_line_item_list]');
        if (type == 'System Bonus') {
        } else if (type == 'Additional Bonus') {
          console.warn(type);
        } */
      }

    });

    $("a[name='delete_line_items']").on("click", function(){
      $("input[name='_line_item_list']:checked:disabled").attr("disabled", false);
    });

    $("#attribute-customerAddressLine3").css("width", "100%");
    $("#attribute-_shipTo_t_city").css("width", "100%");

  }

  var reset_color_lineitemgrid = function () {
    $("#line-item-grid").find(".readonly-wrapper").css({ "color": "rgb(0,0,0)" });
  }

  var order_page_stock_color = function () {

    if(isMobile()){
      console.log("order_page_stock_color mobile");
      var redColor = "rgb(255, 0, 0)";
      var blackColor = "rgb(0, 0, 0)";
      var waitingTableLoaded = function(){
        console.log("waitingTableLoaded");
        setTimeout(function(){
          if ($('.ui-loader').css("display") == "none" ){
            $('#line-item-grid .lig-side-scroller>table tr.lig-row.child').each(function () {
              var $child = $(this).children('td');
              var isBonusOverride = $($child).find('input[name*="bonusOverideFlag_l"]').val().trim().toLowerCase();
              var isPriceOverride = $($child).find('input[name*="isPriceOverride"]').val();
              var isInvoiceOverridePrice = $($child).find('input[name*="invoicePriceFlag_l"]');
              var InvoiceOverridePrice = $($child).find('input[name*="invoicePrice_l"]');
              // var isInStockMaterial = $($child).find('input[name*="inStock_l"]').val().trim().toLowerCase();

              var qty_text = $($child).find('input[name*="qty_int_l"]');
              var totalPrice_text = $($child).find('input[name*="totalPrice_currency"]');
              var unitPrice_text = $($child).find('input[name*="unitPrice_currency"]');
              var type_material = $($child).find('input[name*="refNO_text"]').val().trim().toLowerCase();

              if (isPriceOverride.toLowerCase() == "true") {
                $($(unitPrice_text).siblings()[0]).css("color", redColor);
              }

              /* if (isInStockMaterial == "no") {
                $($(qty_text).siblings()[0]).css("color", redColor);
              } */

              if (isInvoiceOverridePrice.val().toLowerCase() == "true") {              
                $($(InvoiceOverridePrice).siblings()[0]).css("color", redColor);
              }

              if (type_material == "bonus") {
                if (isBonusOverride == "true") {
                  var typeBonus = $($child).find('input[name*="bonusType_l"]').val().trim().toLowerCase();
                  if (typeBonus == "system bonus") {
                    $($(qty_text).siblings()[0]).css("color", redColor);
                  }
                }
                $($(unitPrice_text).siblings()[0]).css("color", blackColor);
                $($(totalPrice_text).siblings()[0]).css("color", blackColor);
              }

            });
          }else{
            waitingTableLoaded();
          }
        }, 500);
      }

      $("body").on("click touchend", "#line-item-grid .pagination a.page", function (e) {
        waitingTableLoaded();
      });

      $("body").on("click tochend swipeleft swiperight", "#swipe-sidebar", function (e) {
        var isLineGirdOpen = $(this).hasClass("sidebar-state-1");
        if (isLineGirdOpen) {
          setTimeout(function () {
            waitingTableLoaded();
          }, 1000);
        }
      });
      

    }else{
      $("td[id*='qty_int_l']").each(function (i, data) {
        var parent = $(this).closest(".line-item");
        // var isInStock = $(parent).find("span[id*='inStock_l']").text().trim().toLowerCase();
        var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
        if(type_material != "bonus"){
          /* if (isInStock == "no") {
            $(this).find("span[id*='qty_int_l']").css("color", "rgb(255,0,0)");
          } */
        }
      });

      $("td[id*='bonusOverideFlag_l']").each(function (i, data) {
        var parent = $(this).closest(".line-item");
        var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
        if (type_material == "bonus") {
          var isBonusOverride = $(this).find("span[id*='bonusOverideFlag_l']").text().trim().toLowerCase();
          if (isBonusOverride == "true") {
            var typeBonus = $(parent).find("span[id*='bonusType_l']").text().trim().toLowerCase();
            if (typeBonus == "system bonus") {
              var qty_span = $(parent).find("span[id*='qty_int_l']");
              $(qty_span).css("color", "red");
            }
          }
        }
      });


      $("td[id*='isPriceOverride']").each(function (i, data) {
        var parent = $(this).closest(".line-item");
        var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
        if (type_material != "bonus") {
          var isPriceOverrideVal = $(this).find("span[id*='isPriceOverride']").text().trim().toLowerCase();
          if (isPriceOverrideVal.length > 0) {
            if (isPriceOverrideVal == 'true') {
              var unitPriceSpan = $(parent).find("span[id*='unitPrice_currency']");
              $(unitPriceSpan).css("color", "red");
            }
          }
        }
      });

      $("td[id*='invoicePriceFlag_l']").each(function (i, data) {
        var parent = $(this).closest(".line-item");
        var type_material = $(parent).find("span[id*='refNO_text']").text().trim().toLowerCase();
        if (type_material != "bonus") {
          var invoicepriceflag_lVal = $(this).find("span[id*='invoicePriceFlag_l']").text().trim().toLowerCase();
          if (invoicepriceflag_lVal.length > 0) {
            if (invoicepriceflag_lVal == "true") {
              var unitPriceSpan = $(parent).find("span[id*='invoicePrice_l']");
              $(unitPriceSpan).css("color", "red");
            }
          }
        }
      });

      /* $("td[id*='refNO_text']").each(function(i, data){
        var parent = $(this).closest(".line-item");        
        var type_material = $(this).find("span[id*='refNO_text']").text().trim().toLowerCase();

        if(type_material == "bonus"){
          var checkbox_action = $(parent).find("td[data-colid='checker']").find("input[type='checkbox']");
          $(checkbox_action).attr("disabled", true);
        }

      }); */

    }

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
              orderPageRestyle();
              reset_color_lineitemgrid();
              order_page_stock_color();

            } else {
              loadOrderPageScript();
            }
          }, 1000);
        }

        loadOrderPageScript();

      }else{

        function loadShoppingCartScript() {
          setTimeout(function () {
            if (isLoadingDone()) {
              setTimeout(function(){
                console.log("loadShoppingCartScript");
                textColorQty();
                /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price.  */
                tw_tooltip_modelconfiguration();
                /* TW-03 Price hover table columns to be corrected for TW - Quantity, Invoice Price, Unit Price. */
                setTimeout(function(){
                  remove_NT_currency();
                }, 1000);
                
                $("#materialArrayset").find(".pagination").find(".ui-btn").off();
                $("#materialArrayset").find(".pagination").find(".ui-btn").on("click touchend", function () {
                  loadShoppingCartScript();
                });

                $("#materialArrayset").find(".pagination").find("input[type='radio']").off();
                $("#materialArrayset").find(".pagination").find("input[type='radio']").on("click touchend", function () {
                  loadShoppingCartScript();
                });
              }, 3000);

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
              if (isLoadingDone()) {
                
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
                orderPageRestyle();
                reset_color_lineitemgrid();
                order_page_stock_color();
                /* if(getZPUserType() == "csteam"){
                  search_customer();
                } */

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
                textColorQty();
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