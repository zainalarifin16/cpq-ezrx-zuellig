$(document).ready(function() {
  if (!window.isMobile()) return;

  /*
    Start : 09 Feb 2018
    Task  :  Restyling table shopping cart if it loaded
    Page  : Global
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : BOTH
  */

  function mobile_newlayout() {
    /* get url string */
    var urlarr = url.split('/');
    // console.log(urlarr);
    /* check if url have mobile and have 4 element data then redirect to the string link */
    if (urlarr[3].match('mobile') !== null && urlarr.length == 4) {
      location.href =
        '/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true';
      return false;
    }

    /* get title text */
    pagetitle = $('title')
      .text()
      .toLowerCase();

    /* hide element if jg-overlay */
    $('#jg-overlay').hide();

    /*
      Start : 4 Mei 2017
      Task  : Debug order page + create filter page mobile with URL.
      Page  : Global mobile page
      File Location : $BASE_PATH$/image/javascript/js-ezrx.js
      Layout : Mobile
      if pagetile not null call default function
    */

    $('html').addClass('jg-mobilelayout');
    if (pagetitle != '') {
      /* add class jg-mobilelayout */
      if (pagetitle == 'login') {
        /* if pagetitle login then call function mobile_loginpage */
        // mobile_loginpage();
        // transform_loginpage();
      } else {
        /* if pagetitle commerce then call transform_mainlayout and transform_orderspage */
        clearStorageOrderItem();
        if (pagetitle == 'commerce management') {
          console.log('commerce management');
          localStorage.removeItem('frequentlyAccessedCustomers_t');
          $('html').addClass('jg-mobilelayout');
          transform_mainlayout();
          transform_orderspage();
          mobile_commerce_management();
          mobile_modifyMenu();
          $('.topMenuModified').css('float', 'none');
          $('.jg-item-mainmenu').css('width', '70px');
          $('.jg-box-topbar').append(
            "<div style='float:right; font-size: 14px; padding: 10px;word-break: break-word;max-width: 150px;' >" +
              window._BM_USER_LOGIN +
              '</div>'
          );

          if (getQueryVariableUrl('flag') == 'rightnow') {
            window.sessionStorage.setItem('flag', 'rightnow');
          }

          var flag = window.sessionStorage.getItem('flag');
          if (flag == 'rightnow') {
            dss_view();
          }

          /*
                        Start : 12 Juli 2018
                        Task  : New Order & Copy Order action to be hidden For Credit Control Rep.
                        Page  : Commerce Management
                        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                        Layout : Mobile
                    */

          var hideMenuForCreditControlUser = function() {
            if ($("table[onclick*='newTransaction']").length == 0) {
              $('.jg-linkbtn.new_order').hide();
              $('.jg-linkbtn.copy_order').hide();
            }
          };
          hideMenuForCreditControlUser();

          /*
                        Start : 12 Juli 2018
                        Task  : New Order & Copy Order action to be hidden For Credit Control Rep.
                        Page  : Commerce Management
                        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                        Layout : Mobile
                    */

          window.localStorage.setItem('delete_transaction', false);
        } else if (
          pagetitle == 'zuellig pharma products' ||
          pagetitle == 'zuellig pharma order processData'
        ) {
          console.log('zuellig pharma products');
          $("div[id*='addBundleFlag']").hide();
        } else if (pagetitle == 'zuellig pharma order process') {
          console.log('zuellig pharma order process');
        } else if (pagetitle == 'my profile') {
          /* 
                      Created By    :- Created By Zainal Arifin, Date : 08-03-2018
                      Task          :- Restyling Profile Page
                      Page          :- Profile Page
                      File Location :- $BASE_PATH$/javascript/js-ezrx.js
                      Layout        :- Desktop
                    */
          // Remove Width 100% on class .jg-mobilelayout .form-input
          $('.jg-mobilelayout .form-input').attr(
            'style',
            'width:auto!important;'
          );
          // Give Padding
          $('table.dashed-table')
            .find('td')
            .map(function(index, data) {
              $(data).css('padding', '5px 15px 5px 20px');
            });
          // Give 100% width in every Input and Select
          $('input.form-input, select.form-input').css('width', '100%');
          // give text align center for checkbox label
          $("input[type='checkbox'].form-input")
            .parent()
            .css('text-align', 'center');

          /* 
                      Created By    :- Created By Zainal Arifin, Date : 08-03-2018
                      Task          :- Restyling Profile Page
                      Page          :- Profile Page
                      File Location :- $BASE_PATH$/javascript/js-ezrx.js
                      Layout        :- Desktop
                    */
        } else if (pagetitle == 'change password') {
          /* 
                        Created By    :- Created By Zainal Arifin, Date : 27 April 2018
                        Task          :- SG-40 Change Password for mobile
                        Page          :- Model Configuration
                        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                        Layout        :- Desktop
                    */

          console.log('change password script');

          var readyChangePasswordPage = function() {
            setTimeout(function() {
              if (isLoadingDone()) {
                $('h1.ui-title').css({
                  background: '#00575d',
                  color: '#ffffff'
                });
                $('#main-content').attr('style', 'margin-top: 70px!important');
                $('#change-pw-form').css('height', '550px');
                $('#errors').after(
                  $(
                    "<div id='error_js' style='width: 41%;margin: auto auto 10px;' ></div>"
                  )
                );
                $('#submit').attr(
                  'style',
                  'background: #005E63!important;color: #ffffff;padding: 5px 10px;font-size: 20px;'
                );
                var html_password_restriction =
                  '<fieldset style="margin-left: 5px;margin-top: 100px;position:relative;border-top-width: 2px;border-right-width: 2px;border-bottom-width: 2px;border-left-width: 2px;border-top-style: groove;border-right-style: groove;border-bottom-style: groove;border-left-style: groove;padding: 10px;">\
                                                                    <legend class="form-label" style="font-weight: bold;" >&nbsp;Password Restrictions&nbsp;</legend>\
                                                                    Password must be between 8 to 30 characters long and it should start with a letter. Password must have at least one upper case letter, at least one number and at least one special character.\
                                                                </fieldset>';
                $('#submit').after(html_password_restriction);

                $('#change-pw-form').on('submit', function(e) {
                  // e.preventDefault();
                  var oldPassword = $("input[name='_oldPassword']").val();
                  var newPassword = $("input[name='_newPassword']").val();
                  var newPassword2 = $("input[name='_retypedPassword']").val();
                  var divError = $('#error_js');
                  $(divError).html('');
                  if (newPassword.length > 0 && oldPassword.length > 0) {
                    if (newPassword == newPassword2) {
                      if (newPassword.length >= 8 && newPassword.length <= 30) {
                        if (
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,30}$/.test(
                            newPassword
                          ) == false
                        ) {
                          console.log(
                            'Password must have at least one upper case letter, at least one number and at least one special character.'
                          );
                          $(divError).append(
                            "<div class='error'>Password must have at least one upper case letter, at least one number and at least one special character.</div>"
                          );
                        } else {
                          console.log('Submitted to system');
                          return true;
                        }
                      } else {
                        console.log(
                          'Password must be between 8 and 30 characters.'
                        );
                        $(divError).append(
                          "<div class='error'>Password must be between 8 and 30 characters.</div>"
                        );
                      }
                    }

                    /* if (newPassword != newPassword2) {
                                            console.log("New Password and Retype New Password not match");
                                            $(divError).append("<div class='error'>New Password and Retype New Password not match</div>");
                                        } else {
                                            
                                        } */
                  }
                  e.preventDefault();
                });
              } else {
                readyChangePasswordPage();
              }
            }, 500);
          };

          readyChangePasswordPage();

          /* 
                        Created By    :- Created By Zainal Arifin, Date : 27 April 2018
                        Task          :- SG-40 Change Password for mobile
                        Page          :- Model Configuration
                        File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                        Layout        :- Desktop
                    */
        }

        mobile_adjustcontenttop();
      }
    } else {
      /* if oagetitle is null call custom filter from URL */
      /* create filterPage get last string of URL */
      var filterPage = urlarr[urlarr.length - 1];
      /* if filterPage contains with commerce */
      console.log('filterPage', filterPage);
      if (
        $('#line-item-grid').length > 0 &&
        filterPage.search('copy_processing.jsp') == -1
      ) {
        filterPage = 'commerce';
      }
      if ($('#materialArrayset').length > 0) {
        filterPage = 'config';
      }
      console.log('filterPage', filterPage);
      mobile_deleteMessage();
      if (filterPage.search('commerce') != -1) {
        //[new] order & material page
        // var checkVariable = filterPage.split("?");
        if ($('#tab-draftOrder').length > 0) {
          //[new] order
          console.log('New order');

          var customer_selection = function() {
            mobile_orderpage();
            mobile_customerSearch();
            if ($('#frequentlyAccessedCustomers_t').length) {
              var customerDetails = $('#frequentlyAccessedCustomers_t')
                .val()
                .replace(/~/gi, '');
              console.log(
                'frequentlyAccessedCustomers_t is',
                customerDetails.length > 0 ? 'Not Empty' : 'Empty',
                'The data is : ' + customerDetails
              );
              if (customerDetails.length > 0) {
                window.localStorage.setItem(
                  'frequentlyAccessedCustomers_t',
                  customerDetails
                );
              } else {
                customerDetails =
                  window.localStorage.getItem(
                    'frequentlyAccessedCustomers_t'
                  ) != null
                    ? window.localStorage.getItem(
                        'frequentlyAccessedCustomers_t'
                      )
                    : '';
              }
              $('#frequentlyAccessedCustomers_t').val('');
              if (customerDetails.length == 0) {
                return true;
              } else {
                mobile_topCustomerList(customerDetails);
                mobile_toggleTopCustomer();
              }
            }
          };

          $('body').on('click touchend', '#tab-draftOrder', function(e) {
            function draftOrder() {
              setTimeout(function() {
                if ($('.ui-loader.ui-corner-all').css('display') == 'none') {
                  customer_selection();
                } else {
                  draftOrder();
                }
              }, 1000);
            }
            draftOrder();
          });

          customer_selection();

          var automatic_save = function() {
            setTimeout(function() {
              if (document.readyState == 'complete') {
                var flag = window.sessionStorage.getItem('flag');
                if (
                  $("input[name='status_t']")
                    .val()
                    .toLowerCase() == 'order initiated' &&
                  flag == 'rightnow' &&
                  window.getZPUserType() == 'customer'
                ) {
                  var isExist = false;
                  if ($('li.error-text').length > 0) {
                    $('li.error-text').each(function(i, data) {
                      if (
                        $(data)
                          .text()
                          .toLowerCase()
                          .indexOf('an order is already present') != -1
                      ) {
                        isExist = true;
                      }
                    });
                  }

                  if (isExist == false) {
                    // console.log( $("button:contains('Save')") );
                    setTimeout($("button:contains('Save')").click(), 3000);
                    console.log('order initiated and flag is not null');
                  }
                }
              } else {
                automatic_save();
              }
            }, 1000);
          };

          automatic_save();
          // setTimeout(automatic_save(), 1000);

          //VMLSINOZP-61 start
          //console.log('VMLSINOZP-61',1);
          //setTimeout(function(){
          console.log('VMLSINOZP-61', 1);
          var _61 = setInterval(function() {
            console.log('VMLSINOZP-61', 2);
            if (document.readyState === 'complete') {
              console.log('VMLSINOZP-61', 3);
              //save_to_newuser();
              //document.addEventListener("DOMContentLoaded", function(){
              console.log('VMLSINOZP-61', 4);
              newCustId = sessionStorage.getItem('selectedCustShipID');
              console.log('newCustId', newCustId);
              clearInterval(_61);
              if (newCustId != 'null' && newCustId != null) {
                console.log('VMLSINOZP-61', 5);
                //document.cookie = "selectedCustShipID="+null;
                sessionStorage.setItem('selectedCustShipID', null);
                $('#selectedCustomerDetail').val(newCustId);
                $('#customerMasterString_t').val('');
                setTimeout(function() {
                  if (
                    $(
                      '#sticky-actions button.action-type-modify[data-properties*="36246153"]'
                    ).length > 0
                  ) {
                    $(
                      '#sticky-actions button.action-type-modify[data-properties*="36246153"]'
                    ).click();
                    console.log('VMLSINOZP-61', '6-1');
                  } else if (
                    $('#popup-moreBtns-popup ul.popup-list li:first-child')
                      .length > 0
                  ) {
                    $(
                      '#popup-moreBtns-popup ul.popup-list li:first-child'
                    ).click();
                    console.log('VMLSINOZP-61', '6-2');
                  }
                }, 1500);
              }
              //});
            }
          }, 500);

          function save_to_newuser() {
            newCustId = sessionStorage.getItem('selectedCustShipID');
            console.log('newCustId', newCustId);
            clearInterval(_61);
            if (newCustId != 'null' && newCustId != null) {
              console.log('VMLSINOZP-61', 5);
              //document.cookie = "selectedCustShipID="+null;
              sessionStorage.setItem('selectedCustShipID', null);
              $('#selectedCustomerDetail').val(newCustId);
              $('#customerMasterString_t').val('');
              setTimeout(function() {
                if (
                  $(
                    '#sticky-actions button.action-type-modify[data-properties*="36246153"]'
                  ).length > 0
                ) {
                  $(
                    '#sticky-actions button.action-type-modify[data-properties*="36246153"]'
                  ).click();
                  console.log('VMLSINOZP-61', '6-1');
                } else if (
                  $('#popup-moreBtns-popup ul.popup-list li:first-child')
                    .length > 0
                ) {
                  $(
                    '#popup-moreBtns-popup ul.popup-list li:first-child'
                  ).click();
                  console.log('VMLSINOZP-61', '6-2');
                }
              }, 1000);
            }
          }
          //},1500);
          //VMLSINOZP-61 end
        } else {
          console.log('material page');
          // material page.
          mobile_materialpage();
          mobile_materialSearch();

          var OverrideBonusQty = setInterval(findOverrideBonusQty, 1000);

          function findOverrideBonusQty() {
            if ($('.cell-overrideBonusQty .ui-flipswitch').length > 0) {
              $('.cell-overrideBonusQty .ui-flipswitch').each(function() {
                var $this = $(this);
                mobile_bonusQtyOverride($this);
              });

              $('.cell-overrideBonusQty .ui-flipswitch').on(
                'click',
                function() {
                  var $this = $(this);
                  mobile_bonusQtyOverride($this);
                }
              );
              clearInterval(OverrideBonusQty);
            }
          }

          mobile_actionButtonFavItem();
        }
      } else if (filterPage.search('config') != -1) {
        console.log(' ====>>>> config page');

        /* replace messages on top table shopping cart */
        //$("#attribute-showDetailedView").html("<div id='detailMessages' style=color:darkred;float:left;width:100%;margin-top:-10px;margin-bottom:10px;'>Please swipe to see additional details in the shopping cart</div>");

        //$("#detailMessages").css({"color:darkred;float:left;width:100%;margin-top:4px;margin-bottom:4px;"});

        //* quantity color change on focus START*//
        textColorQty();

        //* quantity color change on focus END*//
        //**//
        // material page.
        setTimeout(function() {
          textColorQty();
          // material page.
          mobile_materialpage();
          mobile_materialSearch();
          mobile_adjust_tooltip();
          mobile_pricingChange();
          mobile_onChangeUpdateMsg();
          mobile_shoppingCart_msg();
          //mobile_hide_unwanted_arrow();
          // mobile_customerSearch();
        }, 2000);

        $('body').on('click touchend', '.pagination .ui-radio', function(e) {
          waitUntilTableDataLoad();
        });

        //checking with timeOut 500ms if load data table is done.
        function waitUntilTableDataLoad() {
          setTimeout(function() {
            if ($('#jg-overlay').css('display') == 'none') {
              textColorQty();
              mobile_qty_outofstock_color();
              mobile_adjust_tooltip();
              mobile_pricingChange();
              mobile_onChangeUpdateMsg();
              //re-assign listen touch pagination on mobile
              // listen_touch_pagination();

              /*setTimeout(function(){
							    //re-styling when table changes page
    							if($("#showDetailedView").val() == "false" ){
    								
                                    hide_detail_coloumn();
    							}

                                style_shoppingcart_table();

							}, 1000);*/
            } else {
              //recursive checking table has load data
              waitUntilTableDataLoad();
            }
          }, 1000);
        }

        /* function listen_touch_pagination(){
                    //listen shopping chart changing page.
                    console.log("Start listen touch pagination");
					setTimeout(function(){
						$(".pagination").find(".ui-radio").off();
						$(".pagination").find(".ui-radio").bind("click touchstart touchend", function(){
							console.log("Change Page on table 1");
							waitUntilTableDataLoad();
						});
					}, 500);
                }

                var waitUntilPageLoad = function(){
                    setTimeout(function(){
                        
                        if($('#jg-overlay').css("display") == "none"){
                            style_shoppingcart_table();
                            setTimeout(function(){
                                listen_touch_pagination();
                            }, 500);
                        }else{
                            waitUntilPageLoad();
                        }

                    }, 500);
                }*/

        $(window).on('orientationchange', function() {
          waitUntilTableDataLoad();
        });

        //waitUntilPageLoad();

        $('body').on('click touchend', '.button-save', function(e) {
          e.preventDefault();
          console.log(' ===>>> clicked on button-save');
          var _needUpdate = $('input[name=_needUpdate]').val();
          console.log(' ===>>> clicked on button-save --> ', _needUpdate);
          if (_needUpdate == 'yes') {
            $('.updateMsg').show();
            return false;
          } else {
            $('.updateMsg').hide();
          }
        });
        mobile_deleteLineItem();
        // Check if select any Item have bonus

        var OverrideBonusQty = setInterval(findOverrideBonusQty, 1000);

        function findOverrideBonusQty() {
          if ($('.cell-overrideBonusQty .ui-flipswitch').length > 0) {
            $('.cell-overrideBonusQty .ui-flipswitch').each(function() {
              var $this = $(this);
              mobile_bonusQtyOverride($this);
            });

            $('.cell-overrideBonusQty .ui-flipswitch').on('click', function() {
              var $this = $(this);
              mobile_bonusQtyOverride($this);
            });
            clearInterval(OverrideBonusQty);
          }
        }

        $('.sidebar-handle').on('click', function() {
          mobile_checkItemOnCart();
        });
        mobile_actionButtonFavItem();
        mobile_checkItemOnCart();
        mobile_qty_outofstock_color();
        mobile_overRidePriceRed();

        /*
                    End   : 27 Dec 2017
                    Task  : https://jira.uhub.biz/browse/VMLSINOZP-70 [[Desktop/Tablet]Auto Collapse of All Materials is not workin]
                    Page  : Material page / product page
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Mobile
                */
        var allMaterialState = localStorage.getItem('allMaterialsTabState');
        var allTopTenFavState = localStorage.getItem('topTenFavTab');
        var allFavCustItemState = localStorage.getItem('custFavItemTab');
        var allrecomItemState = localStorage.getItem('recomItemTab');

        console.log(
          'allMaterialState',
          allMaterialState,
          'allTopTenFavState',
          allTopTenFavState,
          'allFavCustItemState',
          allFavCustItemState
        );

        if (allTopTenFavState == 'collapsed') {
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .addClass('ui-collapsible-content-collapsed');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .prev()
            .addClass('ui-collapsible-heading-collapsed');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-minus')
            .addClass('ui-icon-plus');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .parent()
            .addClass('ui-collapsible-collapsed');
        } else {
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .removeClass('ui-collapsible-content-collapsed');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .prev()
            .removeClass('ui-collapsible-heading-collapsed');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-plus')
            .addClass('ui-icon-minus');
          $('#attribute-pastOrders')
            .parent()
            .parent()
            .parent()
            .removeClass('ui-collapsible-collapsed');
        }

        if (allrecomItemState == 'collapsed') {
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .addClass('ui-collapsible-content-collapsed');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .prev()
            .addClass('ui-collapsible-heading-collapsed');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-minus')
            .addClass('ui-icon-plus');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .parent()
            .addClass('ui-collapsible-collapsed');
        } else {
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .removeClass('ui-collapsible-content-collapsed');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .prev()
            .removeClass('ui-collapsible-heading-collapsed');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-plus')
            .addClass('ui-icon-minus');
          $('#attribute-currentUserCompanyName')
            .parent()
            .parent()
            .parent()
            .removeClass('ui-collapsible-collapsed');
        }

        if (allFavCustItemState == 'collapsed') {
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .addClass('ui-collapsible-content-collapsed');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .prev()
            .addClass('ui-collapsible-heading-collapsed');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-minus')
            .addClass('ui-icon-plus');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .parent()
            .addClass('ui-collapsible-collapsed');
        } else {
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .removeClass('ui-collapsible-content-collapsed');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .prev()
            .removeClass('ui-collapsible-heading-collapsed');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-plus')
            .addClass('ui-icon-minus');
          $('#attribute-currentCustFav')
            .parent()
            .parent()
            .parent()
            .removeClass('ui-collapsible-collapsed');
        }
        //commented by suresh as the all materials should be expanded always for mobile version
        // uncommented by pratap as per sakthi requirement that for mobile also it will colapse
        if (allMaterialState === 'collapsed') {
          console.log(
            'collapse material',
            $('#attribute-materialSearch')
              .parent()
              .parent()
          );
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .addClass('ui-collapsible-content-collapsed');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .prev()
            .addClass('ui-collapsible-heading-collapsed');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-minus')
            .addClass('ui-icon-plus');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .parent()
            .addClass('ui-collapsible-collapsed');
        } else {
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .removeClass('ui-collapsible-content-collapsed');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .prev()
            .removeClass('ui-collapsible-heading-collapsed');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .prev()
            .children()
            .removeClass('ui-icon-plus')
            .addClass('ui-icon-minus');
          $('#attribute-materialSearch')
            .parent()
            .parent()
            .parent()
            .removeClass('ui-collapsible-collapsed');
        }
        //end
        /*if ($('.jg-mobilelayout #error-messages ul.constraint-messages').is(':visible')) {
                    $("#config footer").append("<div id='duplicatefooter'><button class='updateButton'>Update</button><button class='saveButton'>Save</button></div>");
                }
                $("body").on("click touchend", "#duplicatefooter .updateButton", function(e) {

                    console.log("clicked on custom create transaction");
                    e.preventDefault();
                    if ($("#button-bar .button-update").length != 0) {
                        $("#button-bar .button-update").trigger('click');
                    } else {
                        console.log("clicked on custom create transaction1");
                        $("#popup-moreBtns-popup .popup-nested-inner ul li").each(function() {

                            var liButtonText = $(this).find("a").text().trim();
                            console.log("clicked on custom create transaction==" + liButtonText);
                            if (liButtonText == "Update") {
                                console.log("clicked on Update");
                                $(this).find("a").trigger("tap");
                            }
                        });

                        //$("#popup-moreBtns-popup").find(".button-update").trigger('touchend');
                        /*$("#popup-moreBtns-popup .button-update").trigger('tap');
                        console.log("clicked on custom create transaction21");
                        $("#popup-moreBtns-popup .button-update").trigger('click');
                        console.log("clicked on custom create transaction2");
                        */
        /*}
                });*/

        /*$("#customUpdate").on('click touchend', function(){
                        console.log("customUpdate customUpdate customUpdate");
                        $("#popup-moreBtns-popup").find(".button-update").trigger('tap');
                        $("div#popup-moreBtns ul.popup-list li a.button-update").trigger("tap");
                        $("div#popup-moreBtns ul.popup-list li a.button-update").trigger("click");
                });
                $("#customCancel").on('click touchend', function(){
                        console.log("customCancelcustomCancelcustomCancel");
                        $(".button-invoke-return").trigger("click");
                        $(".button-invoke-return").trigger("tap");
                });*/

        /* VMLSINOZP-50 BOF */
        /* var remove_constrained_msg = setInterval(mobile_constrained_msg, 1000);
                 function mobile_constrained_msg(){

                         console.error('.constrained class applied');

                             if($('.jg-mobilelayout #error-messages ul.constraint-messages').is(':visible')){
                                 console.warn('remove constraint msg');

                                 var btnHtml = '<button class="button-update ui-btn ui-btn-inline">Update</button>';

                                 if($('div#popup-moreBtns ul.popup-list li a.button-invoke-return').length>0){
                                     btnHtml+='<button class="invocation-button button-invoke-return ui-btn ui-btn-inline cancelButton">Cancel</button> ';
                                 } else {
                                     btnHtml+='<button class="button-cancel ui-btn ui-btn-inline cancelButton">Cancel</button>';
                                 }

                                 if(btnHtml.length!==0){
                                     $('.jg-mobilelayout footer  #button-bar').html(btnHtml).undelegate();
                                     //$( "body" ).undelegate( "#button-bar", "scroll");
                                 }

                                 clearInterval(remove_constrained_msg);
                             }


                 }
                 $("body").on("click touchend tap","#button-bar .cancelButton",function(e){
                     if($('div#popup-moreBtns ul.popup-list li a.button-invoke-return').length>0){
                         console.warn('clicked 1');


                     }else{
                         console.warn('clicked 2');

                     }
                 });



                 setTimeout(function(){
                     console.log('remove_constrained_msg - settimeout');
                     clearInterval(remove_constrained_msg);
                 },15000);*/

        /* VMLSINOZP-50 EOF */
      } else if (filterPage.search('copy_processing.jsp') != -1) {
        /* if filterPage contains with copy_processing.jsp */
        //[copy] order
        // mobile_orderpage();
        // mobile_materialSearch();
        // mobile_actionButtonFavItem();
        mobile_redirect_materialpage();

        /* if filterPage contains with document.jsp */
      } else if (filterPage.search('document.jsp') != -1) {
        //[process] order
        console.log('Proses Order page');

        var customer_selection = function() {
          mobile_orderpage();
          mobile_customerSearch();

          if ($('#frequentlyAccessedCustomers_t').length > 0) {
            var customerDetails = $('#frequentlyAccessedCustomers_t')
              .val()
              .replace(/~/gi, '');
            console.log(
              'frequentlyAccessedCustomers_t is',
              customerDetails.length > 0 ? 'Not Empty' : 'Empty',
              'The data is : ' + customerDetails
            );
            if (customerDetails.length > 0) {
              localStorage.setItem(
                'frequentlyAccessedCustomers_t',
                customerDetails
              );
            } else {
              customerDetails =
                localStorage.getItem('frequentlyAccessedCustomers_t') != null
                  ? localStorage.getItem('frequentlyAccessedCustomers_t')
                  : '';
            }
            $('#frequentlyAccessedCustomers_t').val('');
            if (customerDetails.length == 0) {
              return true;
            } else {
              mobile_topCustomerList(customerDetails);
              mobile_toggleTopCustomer();
            }
          }
        };

        $('body').on('click touchend', '#tab-draftOrder', function(e) {
          function draftOrder() {
            setTimeout(function() {
              if ($('.ui-loader.ui-corner-all').css('display') == 'none') {
                customer_selection();
              } else {
                draftOrder();
              }
            }, 1000);
          }
          draftOrder();
        });

        customer_selection();

        /* if filterPage contains with commerce_manager.jsp */
      } else if (filterPage.search('commerce_manager.jsp') != -1) {
        //Commerce Management
        console.log('Commerce page');
        localStorage.removeItem('frequentlyAccessedCustomers_t');
        incompleteOrder();

        /* if filterPage contains with edit_profile.jsp */
      } else if (filterPage.search('edit_profile.jsp') != -1) {
        //Profile
        console.log('Profile page');
      } else if (filterPage.search('change-password') != -1) {
        /* 
                    Created By    :- Created By Zainal Arifin, Date : 27 April 2018
                    Task          :- SG-40 Change Password for mobile
                    Page          :- Model Configuration
                    File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                    Layout        :- Desktop
                */

        console.log('change password script');

        var readyChangePasswordPage = function() {
          setTimeout(function() {
            if (isLoadingDone()) {
              $('h1.ui-title').css({
                background: '#00575d',
                color: '#ffffff'
              });
              $('#main-content').attr('style', 'margin-top: 70px!important');
              $('#change-pw-form').css('height', '550px');
              $('#errors').after(
                $(
                  "<div id='error_js' style='width: 41%;margin: auto auto 10px;' ></div>"
                )
              );
              $('#submit').attr(
                'style',
                'background: #005E63!important;color: #ffffff;padding: 5px 10px;font-size: 20px;'
              );

              var html_password_restriction =
                '<fieldset style="margin-left: 5px;margin-top: 100px;position:relative;border-top-width: 2px;border-right-width: 2px;border-bottom-width: 2px;border-left-width: 2px;border-top-style: groove;border-right-style: groove;border-bottom-style: groove;border-left-style: groove;padding: 10px;">\
                                                                    <legend class="form-label" style="font-weight: bold;" >&nbsp;Password Restrictions&nbsp;</legend>\
                                                                    Password must be between 8 to 30 characters long and it should start with a letter. Password must have at least one upper case letter, at least one number and at least one special character.\
                                                                </fieldset>';
              $('#submit').after(html_password_restriction);

              $('#change-pw-form').on('submit', function(e) {
                // e.preventDefault();
                var oldPassword = $("input[name='_oldPassword']").val();
                var newPassword = $("input[name='_newPassword']").val();
                var newPassword2 = $("input[name='_retypedPassword']").val();
                var divError = $('#error_js');
                $(divError).html('');
                if (newPassword.length > 0 && oldPassword.length > 0) {
                  if (newPassword == newPassword2) {
                    if (newPassword.length >= 8 && newPassword.length <= 30) {
                      if (
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,30}$/.test(
                          newPassword
                        ) == false
                      ) {
                        console.log(
                          'Password must have at least one upper case letter, at least one number and at least one special character.'
                        );
                        $(divError).append(
                          "<div class='error'>Password must have at least one upper case letter, at least one number and at least one special character.</div>"
                        );
                      } else {
                        console.log('Submitted to system');
                        return true;
                      }
                    } else {
                      console.log(
                        'Password must be between 8 and 30 characters.'
                      );
                      $(divError).append(
                        "<div class='error'>Password must be between 8 and 30 characters.</div>"
                      );
                    }
                  }

                  /* if (newPassword != newPassword2) {
                                        console.log("New Password and Retype New Password not match");
                                        $(divError).append("<div class='error'>New Password and Retype New Password not match</div>");
                                    } else {
                                        
                                    } */
                }
                e.preventDefault();
              });
            } else {
              readyChangePasswordPage();
            }
          }, 500);
        };

        readyChangePasswordPage();

        /* 
                    Created By    :- Created By Zainal Arifin, Date : 27 April 2018
                    Task          :- SG-40 Change Password for mobile
                    Page          :- Model Configuration
                    File Location :- $BASE_PATH$/javascript/js-ezrx-tw.js
                    Layout        :- Desktop
                */
      }
    }
    /*
            End : 4 Mei 2017
            Task  : Debug order page + create filter page mobile with URL.
            Page  : Global mobile page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
  }

  /*
        Start : 09 Jan 2018
        Task  :  Hiding the Menu navigation bars under the condition where URL parameter flag=rightnow is present. 
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : BOTH
    */

  var hide_navigation = function(layout) {
    var siteUrl = window.location.href;
    layout = layout || 'Desktop'; //Tablet

    if (getQueryVariableUrl('flag') == 'rightnow') {
      window.sessionStorage.setItem('flag', 'rightnow');
    }
    var flag = window.sessionStorage.getItem('flag');
    console.log('FLAG', flag);
    if (flag == 'rightnow') {
      var desktopMenu = document.querySelector('.jg-box-sidenav');
      var target_button = 'home';
      if (desktopMenu !== null) {
        desktopMenu.style.display = 'none';
      }
      if (layout == 'Desktop') {
        $('#' + target_button).off();
        $('#home')
          .closest('table')
          .removeAttr('onclick')
          .css('margin', '0px 10px');
        $('#' + target_button)
          .closest('table')
          .show();
        $('#' + target_button)
          .closest('table')
          .css({
            float: 'right'
          });
        $('#' + target_button).on('click', function(e) {
          e.preventDefault();
          // window.sessionStorage.removeItem("flag");
          setTimeout(function() {
            window.open('', '_self', '');
            window.close();
          }, 1000);
        });

        if (
          $('#readonly_1_status_t')
            .text()
            .toLowerCase() == 'in process'
        ) {
          var table_home = $('#' + target_button).closest('table');
          var href_create_order =
            'https://' +
            instanceName +
            '.bigmachines.com/commerce/buyside/document.jsp?formaction=create&process=oraclecpqo&sso=Post&flag=rightnow#';
          var html_create_order =
            '<table class="form-action" cellspacing="0" cellpadding="0" style="margin: 0px 10px; cursor: pointer;">\
                                        <tbody>\
                                            <tr>\
                                                <td class="button-left">&nbsp;</td>\
                                                <td class="button-middle" nowrap="true">\
                                                    <div style="margin:0px 0px 1px 0px;">\
                                                        <a class="button-text" name="create_order" id="create_order" href="' +
            href_create_order +
            '">Create Order</a>\
                                                    </div>\
                                                </td>\
                                                <td class="button-right">&nbsp;</td>\
                                            </tr>\
                                        </tbody>\
                                    </table>';
          $(table_home).after(html_create_order);
        }

        var jg_box_mainarea = document.querySelector('.jg-box-mainarea');
        if (jg_box_mainarea !== null) {
          jg_box_mainarea.style.paddingLeft = 0;
        }
      }
      console.log('Rightnownow', layout);
      if (layout == 'Tablet') {
        $('.action.action-type-modify').each(function(index, data) {
          if (
            $(data)
              .text()
              .trim()
              .toLowerCase() == 'home'
          ) {
            $(data).show();
            $(data).on('click', function() {
              //    localStorage.removeItem("flag");
              window.close();
            });
          }
        });

        var menu_mobile = document.querySelector('#menu_mobile');
        if (menu_mobile !== null) {
          menu_mobile.style.display = 'none';
        }

        var topMenuModified = document.querySelector('.topMenuModified');
        if (topMenuModified !== null) {
          topMenuModified.style.display = 'none';
        }
        $('#header').css('background-color', '#00575D');
        $('#header>a[href*="nav-menu-popup"]').hide();
      }
    } else {
      console.log('URL parameter flag=rightnow, NOT EXIST');
      /*
                 Start : 09 Jan 2018
                 Task  :  Show the Close button on Customer Search Page 
                 Page  : Global
                 File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                 Layout : Both
             */
      if (layout == 'Desktop') {
        $('a.button-text#close')
          .parent()
          .parent()
          .hide();
      } else {
        $('button.action-type-modify:contains("Close")').hide();
      }
      /*
            End : 09 Jan 2018
            Task  :  Show the Close button on Customer Search Page
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */
    }
    /*
            Start : 10 Jan 2018
            Task  :  Load CPQ within iFrame instead of new tab when user clicks on link on error message. 
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : BOTH
        */
    console.log('#actionErrorMessagesBox');
    if ($('#actionErrorMessagesBox').length > 0) {
      console.log('#actionErrorMessagesBox 2');
      $('#actionErrorMessagesBox')
        .find('a')
        .each(function() {
          console.log('#actionErrorMessagesBox 3');
          $(this).removeAttr('target');
        });
    }
    /*
        End : 10 Jan 2018
        Task  :  Load CPQ within iFrame instead of new tab when user clicks on link on error message. 
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : BOTH
    */
  };
  /*
    End : 09 Jan 2018
    Task  :  Hiding the Menu navigation bars under the condition where URL parameter flag=rightnow is present. 
    Page  : Global
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : BOTH
  */

  /*
        Start : 15 Nov 2017
        Task  : ajax call on last incomplete order
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */
  function mobile_incomplete_order_status_pageload() {
    // debugger;
    console.log('check incomplete order status');
    $.ajax({
      url:
        'https://' +
        instanceName +
        '.bigmachines.com/mobile/pending-configurations',
      type: 'GET',
      data: 'bm_trail_refresh=true',
      dataType: 'html',
      success: function(respData) {
        // console.log(respData);
        //console.error(respData.indexOf('select-button'));
        // console.warn(respData.search('select-button'));
        if (respData.indexOf('select-button') === -1) {
          $('.jg-linkbtn.shoppingcart')
            .parent()
            .hide(800);
        } else {
          $('.jg-linkbtn.shoppingcart')
            .parent()
            .show();
        }
      },
      error: function() {
        console.log('Cannot get data tablet');
      }
    });
  }
  /*
    End : 20 Nov 2017
    Task  : ajax call on last incomplete order
    Page  : Global
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet
  */

  var mobile_updateMsg = function() {
    var updateMsg =
      "<div class='updateMsg'>Please click 'Update' to proceed.</div>";
    $('footer').prepend(updateMsg);
    console.log(' === mobile_updateMsg ===>>>');
  };

  /*
    Start : 07 Nov 2017
    Task  : Select/Unselect of commercial/bonus is not working properly.
    Page  : Shopping cart
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Desktop
  */
  var mobile_bonusQtyOverride = function($this) {
    console.log(' 11 mobile_bonusQtyOverride =====>>>>> ');
    console.log($this.parent().attr('id'));
    if ($this.parent().attr('id')) {
      var curRowIndex = $this
        .parent()
        .attr('id')
        .split('-')[2];
      var isOverrideBonusQty = $('#overrideBonusQty' + curRowIndex).val();
      console.log('22 mobile_bonusQtyOverride =====>>>> ', isOverrideBonusQty);
      if (isOverrideBonusQty == 'true') {
        $('#qty_text' + curRowIndex).prop('readonly', false);
        $('#qty_text' + curRowIndex).css('color', 'red');
      } else {
        console.log('33 mobile_bonusQtyOverride =====>>>> ');
        $('#qty_text' + curRowIndex).prop('readonly', true);
        if ($('#qty_text' + curRowIndex).val() == 0) {
          $('#qty_text' + curRowIndex).css('color', 'red');
        }
        if ($('#stockQty' + curRowIndex).val() == 0) {
          $('#qty_text' + curRowIndex).css('color', 'red');
        } else {
          $('#qty_text' + curRowIndex).css('color', '#333');
        }
      }
    }

    /* var qtyField = $this.parent().prev().find('input[name="qty_text"]');
console.log("%%%%%%%%%%%%%%"+$this)
    if ($this.hasClass('ui-flipswitch-active')) {
        // console.log('it is Yes', qtyField.css('color', 'red'));
        qtyField.prop('readonly', false);
        qtyField.css('color', 'red');
    } else {
        // console.log('it is NO');
        qtyField.prop('readonly', true);
        //if (qtyField.val() > 0) {
        if (qtyField.val() == 0) {
            qtyField.css('color', 'red');
        } else {
    console.log("$(this).parent().parent().find('input[name=stockQty]').val()"+$(this).parent().parent().find('input[name="stockQty"]').val());
            if ($(this).parent().parent().find('input[name="stockQty"]').val() == 0) {
                qtyField.css('color', 'red');
            } else {
                qtyField.css('color', '#333');
            }
        }
    }*/
  };
  /*
    End : 10 Nov 2017
    Task  : Select/Unselect of commercial/bonus is not working properly.
    Page  : Shopping cart
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Desktop
  */

  function mobile_iframe_height() {
    console.log('mobile_iframe_height');

    //$('iframe#cpq').find('#commerce').css('min-height','1000px');
    setTimeout(function() {
      console.log('mobile_iframe_height inside');
      //var cpq = document.getElementById("cpq");
      //console.log('cpq',cpq);
      //if(cpq !== null){
      //    cpq.style.maxHeight = '1100px';
      //}
      $('.rn_PageContent ')
        .find('iframe#cpq')
        .css('max-height', '1100px');
    }, 2000);
  }

  var mobileScript = function() {
    currentModelNumber = 2;
    mobile_newlayout();
    hide_navigation('Tablet');
    mobile_incomplete_order_status_pageload();
    mobile_updateMsg();
    //mobile_changeCust();

    //mobile_rowBgColor();
    $('.updateMsg').hide();
    //Hide Pipeline Button
    $('.button-pipeline').hide();

    $('.cell-overrideBonusQty .ui-flipswitch').each(function() {
      var $this = $(this);
      mobile_bonusQtyOverride($this);
    });

    $('.cell-overrideBonusQty .ui-flipswitch').on('click', function() {
      var $this = $(this);
      mobile_bonusQtyOverride($this);
    });

    $('.jg-linkbtn.shoppingcart').click(function() {
      console.log('click incomplete order');
      /*
      Start : 27 Nov 2017
      Task  : Incomplete order button
      Page  : Global
      File Location : $BASE_PATH$/image/javascript/js-ezrx.js
      Layout : Tablet
    */

      var draftId;
      $.ajax({
        url:
          'https://' +
          instanceName +
          '.bigmachines.com/mobile/pending-configurations',
        type: 'GET',
        data: 'bm_trail_refresh=true',
        dataType: 'html',
        success: function(respData) {
          if (respData.indexOf('select-button') === -1) {
            $('.jg-linkbtn.shoppingcart').hide(800);
          } else {
            $('.jg-linkbtn.shoppingcart').show();
            if (!$('#shoppingCartHolder').length) {
              $('.jg-box-maincontent').append(
                "<div id='shoppingCartHolder' style='display:none;'></div>"
              );
              $('#shoppingCartHolder').html(
                $(respData).find("div[id='main-content']")
              );
            }
          }
        },
        error: function() {
          console.log('Cannot get data');
        }
      }).done(function() {
        draftId = $('.config').attr('data-draft-id');
        //console.log("*******11111111*********"+$(".config"));
        console.log('*******11111111*********' + draftId);
        if (draftId && draftId != undefined) {
          bmSubmitForm(
            '/commerce/buyside/config_drafts_list.jsp?draftId=' + draftId,
            document.drafts_list_view,
            null,
            'resumeConfiguration'
          );
        }
      });

      /*
      End : 28 Nov 2017
      Task  : Incomplete order button
      Page  : Global
      File Location : $BASE_PATH$/image/javascript/js-ezrx.js
      Layout : Tablet
    */
    });
    //mobile_changeCust();
    mobile_iframe_height();
  };
  
  mobileScript();
});
