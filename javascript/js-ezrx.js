(function($) {
    /*
        Start : -
        Task  : -
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

        @url        : get full path url.
        @pagetitle  : get page title of CPQ page.
        @rootFolder : set root folder for CPQ test or production
    */
    var url, pagetitle, rootFolder,currentModelNumber;
	var isMobileVersion = false;
    /*
        End   : -
        Task  : -
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */
    var fullUrl = window.location.host; //window.location.host is subdomain.domain.com

    var parts = fullUrl.split('.');
    var instanceName = parts[0];
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
        console.log('ezrx file ===>>> countryCode --->> ',countryCode);

        if(countryCode === 2500){
            userCountry = 'PH';
        } 
		if(countryCode === 2800){
			userCountry = 'TW';
		}
        
        console.log(' ezrx file ===>>> userCountry --->> ',userCountry);
        
    }
    /*
        End   : -
        Task  : - Detect User
        Page  : Global
        File Location : $BASE_PATH$/javascript/js-ezrx.js
        Layout : Both
    */

    /*
        Start : 13 Nov 2017
        Task  : Buttoons Panel is not in fixed position while scrolling in the order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop

    */


    var $stripParent;
    var resizeHandler = null,
        scrollHandler = null;
    StickyActions = function() {
        $stripParent = $('#sticky-actions');
        resizeHandler && $(window).unbind('resize', resizeHandler);
        scrollHandler && $(window).unbind('scroll', scrollHandler);
        if ($stripParent[0]) {
            var $strip = $stripParent.contents();
            var stripHeight = $strip[0].offsetHeight;
            var stickyTop = $stripParent.offset().top;
            $stripParent.css('height', stripHeight);
            $(window).resize(resizeHandler = function() {
                stripHeight = $strip[0].offsetHeight;
                stickyTop = $stripParent.offset().top;
                $stripParent.css('height', stripHeight);
            });
            var wasFloating = null;
            scrollHandler = function() {
                //console.log('eeeee');
                var pageTop = $(window).scrollTop();
                var floating = (stickyTop - pageTop < 0);
                if (floating != wasFloating) {
                    $strip.toggleClass('floating', floating);
                    $strip.toggleClass('fixed', !floating);
                    $strip.trigger('stickyStatusChanged');
                    wasFloating = floating;
                }
            };
            $(window).scroll(scrollHandler);
            scrollHandler();
        }
    };

    /*
        End : 14 Nov 2017
        Task  : Buttoons Panel is not in fixed position while scrolling in the order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop

    */




    $(document).ready(function() {
        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Get Url of appliction, and get page title of Application.
        */
        url = window.location.href;
        pagetitle = $('title').text().toLowerCase();
		
        /*
            End   : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */

        /*
            Start : 24 March 2017
            Task  : Change all link to dynamic url.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            get full url split it to get subdomain, and generate url of assets.
        */
        /* call abstract function jquery for checking the selector variable is exists */
        $.fn.exists = function() {
            return this.length !== 0;
        };

        var fullUrl = window.location.host;
        var parts = fullUrl.split('.');
        var sub = parts[0];
        rootFolder = '/bmfsweb/' + sub;
        /*
            End   : 24 March 2017
            Task  : Change all link to dynamic url.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both
        */

         /*
            Start : 06 Nov 2017
            Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

        */

        $(window).load(function() {
            $('body.jg-page-shoppingcart #line-item-grid tr.line-item').each(function() {

                var order_type = $(this).find('td:nth-child(3)').find('input').val();
                console.log(order_type);

                if (order_type == 'Bonus') {
                    $(this).css('background-color', '#eee');
                } else if (order_type == 'Comm') {
                    $(this).css('background-color', '#fff');
                }


            });
        });

        /*
            End : 06 Nov 2017
            Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

        */


        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

            Checking user access application from Mobile or Desktop.
        */


        setTimeout(function() {
            /*
                if User access application from mobile, then application call function mobile_newlayout().
            */
            if (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/Windows Phone/i)
            ) {
				isMobileVersion = true;
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
                        url: "https://" + instanceName + ".bigmachines.com/mobile/pending-configurations",
                        type: 'GET',
                        data: "bm_trail_refresh=true",
                        dataType: "html",
                        success: function(respData) {

                            if (respData.indexOf('select-button') === -1) {
                                $('.jg-linkbtn.shoppingcart').hide(800);
                            } else {
                                $('.jg-linkbtn.shoppingcart').show();
                                if (!$('#shoppingCartHolder').length) {
                                    $(".jg-box-maincontent").append("<div id='shoppingCartHolder' style='display:none;'></div>");
                                    $("#shoppingCartHolder").html($(respData).find("div[id='main-content']"));

                                }
                            }
                        },
                        error: function() {
                            console.log("Cannot get data");
                        }
                    }).done(function() {
                        draftId = $(".config").attr("data-draft-id");
                        //console.log("*******11111111*********"+$(".config"));
                        console.log("*******11111111*********" + draftId);
                        if (draftId && draftId != undefined) {
                            bmSubmitForm('/commerce/buyside/config_drafts_list.jsp?draftId=' + draftId, document.drafts_list_view, null, 'resumeConfiguration');
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
            } else {
                /*
                    else if user access application from desktop, then application call function desktop_newlayout().
                */
                /*
                    Start : 5 April 2017
                    Task  : Replace variable _loadingImage for new Loading.
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Dekstop

                    Replace loading animation.
                */
                _loadingImage = rootFolder + "/image/images/loading-icon.gif";
               // closeLoadingDialog();
                $('#jg-overlay').hide();
                $("#loading-mask").children("#loading-dialog").children('img').attr("src", rootFolder + "/image/images/loading-icon.gif");
                desktop_newlayout();
                hide_navigation();
                desktop_checkItemOnCart();
                desktop_rowBgColor();
                textColorQty();

                StickyActions();

                var pageTitle = $('#tab-material-content #group-39792374 .group-header span').text(); //commented by suresh
                var materialHTML = '<div class="materialSearchWrapper"> <div class="normalPopupCont flLeft" id="leftPanel"> <table id="resultsTable" style="width: 100%;"></table> </div><div class="normalPopupCont1 flRight" id="rightPanel"> <div class="popupHeader1 bigHeader">Selected Materials</div><div class="accountstable" id="selectedResultsTable"> <div class="accountstable" id="selectedMatTableDiv" style="overflow-y: auto;height: 400px;"> <table id="selectedMatTable" style="background-color: white !important;"> <thead> <tr> <th style="width:5%">Qty</th><th style="width:18%">Material Number</th> <th style="width:50%">Material Description</th><th style="width:22%">Comm. Item for Bonus</th> <th style="width:5%"></th> </tr></thead> <tbody id="selectedMatTableBody"> </tbody> </table> <a href="#" id="addMaterialBtn" name="addMaterialBtn" class="jg-btn addMat-btn" style="width: auto; margin-top: 50px; display: inline-block;">Add</a> </div></div></div></div>';
                var userType = $('input[name="zPUserType"]').val();


                if ($('#tab-material-content').length > 0) {
                    pageTitle = "model configuration";
                }
                if (($("#actualMasterString").text() !== "") || (userType === 'CSTeam' && pageTitle == "model configuration")) {
					$("#materialResults").parent().parent().parent().parent().hide();
					$("#attribute-material_s").parent().parent().hide();
					$("#attribute-enableOldMaterialSearch").hide();
                    $('#attribute-materialSearch').append().html(materialHTML);
                    console.log("pageTitle=================" + pageTitle)
                    materialSearch();


                }
                materialAddItem();
                // bonusQtyOverride();
                updateErrorMsg();
                $('.updateMsg').hide();

                $('.cell-overrideBonusQty input[type="checkbox"]').each(function() {
                    var $this = $(this);
                    bonusQtyOverride($this);
                    bonusQtyTooltip($this);
                });

                $('.cell-overrideBonusQty input[type="checkbox"]').on('change', function() {
                    var $this = $(this);
                    bonusQtyOverride($this);
                });
                // Toggle TopCustomer Collapse/expand
                toggleTopCustomer();

                // Hide DEsktop attribute under add material page
                $('#attribute-previous_res').parent().parent().parent().parent().parent().hide();
                // Add select all label on Shopping cart
                $(".line-item-grid-header input[name = _line_item_list_all]").parent().append('<label>Select All</label>');

                // Delete Line Item Action
                $("table[onclick*=36244180]").click(function(e) {
                    e.preventDefault();

                    if (!$(".line-item-grid-header input[name = _line_item_list_all]").is(':checked')) {
                        $(".parent-line-item input[name = _line_item_list]").prop("checked", false); //unchecks model check box
                    }

                    //below functions will recall the button default functionality
                    setDocFormIds(36244074, 1, 36244180);
                    submitFormActionEvent('/commerce/buyside/document.jsp', true);
                    bmCancelBubble(event);
                });

                // Check if select any Item have bonus
                $("input[name = _line_item_list]").change(function() {
                    itemCheckBonus($(this));
                });

                // AUDIT LOG
                $('div[name = materialAuditTableDiv]').each(function() {
                    var auditTab = $($(this).children('table')[0]);
                    auditTab.addClass('audit-tab');

                    auditTab.find('tr').prepend('<td width="3%"><img src="https://' + instanceName + '.bigmachines.com/bmfsweb/zuelligpharmatest1/image/Icons/minus.gif" /></td>');
                });

                $("div[name = materialAuditTableDiv]").click(function() {
                    auditLogAccordion($(this));
                });

                // shoppingcart favourite button
                //Code for Frequently Order products
                /*
                    Start : 04 Nov 2017
                    Task  : Top frequently order items in shopping cart
                    Page  : Shopping Cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                $("#AddFav").click(function() { //looping through all selected favourite items and storing into CPQ attribute
                    var checkedFavString = "";
                    $("input[name='selectFav']:checked").each(function() {
                        var data = $(this).attr("data");
                        if (checkedFavString == "") {
                            checkedFavString = data;
                        } else {
                            checkedFavString = checkedFavString + "###" + data;
                        }
                        $(this).prop('checked', false); // Unchecks it
                    });
                    $("input[name='selectedFavouriteItems']:hidden").val(checkedFavString);
                    if (checkedFavString != "") {
                        $("form[name='configurationForm']").submit(); //auto update
                    }

                    console.log("Handler for .click() called.");
                });
                /*
                    End : 04 Nov 2017
                    Task  : Top frequently order items in shopping cart
                    Page  : Shopping Cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                //End of code for Frequently Order products
                //Code for Principal Favourite
                /*
                    Start : 02 Nov 2017
                    Task  : Recommended Materials and My Favorites
                    Page  : Shopping Cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                $("#AddPrincipalFav").click(function() { //looping through all selected Principal Favourite items and storing into CPQ attribute
                    var checkedFavString1 = "";
                    $("input[name='selectPrincipalFav']:checked").each(function() {
                        var data = $(this).attr("data");
                        if (checkedFavString1 == "") {
                            checkedFavString1 = data;
                        } else {
                            checkedFavString1 = checkedFavString1 + "###" + data;
                        }
                        $(this).prop('checked', false); // Unchecks it
                    });
                    $("input[name='selectedPrincipalFavoriteItems']:hidden").val(checkedFavString1);
                    if (checkedFavString1 != "") {
                        $("form[name='configurationForm']").submit();
                    }

                    console.log("Handler for .click() called.");
                });
                /*
                    End : 02 Nov 2017
                    Task  : Recommended Materials and My Favorites
                    Page  : Shopping Cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                //End of code for Principal Favourite
                //Code for Current Customer Favourite
                $("#AddCustFav").click(function() { //looping through all selected Customer Favourite items and storing into CPQ attribute
                    var checkedFavString2 = "";
                    $("input[name='selectCustFav']:checked").each(function() {
                        var data = $(this).attr("data");
                        if (checkedFavString2 == "") {
                            checkedFavString2 = data;
                        } else {
                            checkedFavString2 = checkedFavString2 + "###" + data;
                        }
                        $(this).prop('checked', false); // Unchecks it
                    });
                    $("input[name='selectedFavouriteItems']:hidden").val(checkedFavString2);
                    if (checkedFavString2 != "") {
                        $("form[name='configurationForm']").submit();
                    }

                    console.log("Handler for .click() called.");
                });
                //delete fav items
                $("#DeleteCustFav").click(function() { //looping through all selected Customer Favourite items and storing into CPQ attribute
                    var checkedFavString2 = "";
                    $("input[name='selectCustFav']:checked").each(function() {
                        var data = $(this).attr("data");
                        if (checkedFavString2 == "") {
                            checkedFavString2 = data;
                        } else {
                            checkedFavString2 = checkedFavString2 + "###" + data;
                        }
                        $(this).prop('checked', false); // Unchecks it
                    });
                    $("input[name='deletedMyFavItems']:hidden").val(checkedFavString2);
                    if (checkedFavString2 != "") {
                        $("form[name='configurationForm']").submit();
                    }

                    console.log("Handler for .click() called.");
                });
                $('input[name="overridePrice"], input[name="qty_text"], input[name="comments"], input[name="additionalMaterialQty"]').on('change', function() {
                    $('input[name="_needUpdate"]').val('yes');
                    console.log(' == overridePrice setting YES to need update ==>> overridePrice');
                });

                // shoppingcart Remove item
                $("#materialArrayset .array-remove").click(function() { //auto update when material is deleted
                    // alert('REMOVE MOBILE');
                    //set all materials tab to collapse
                    localStorage.setItem('allMaterialsTabState', 'collapsed');
                    setTimeout(function() {
                        $('#update')[0].click();
                        // alert('UPDATE IS CLICK');
                    }, 3000);
                });
                $("#additionalMaterialArrayset .array-remove").click(function() { //auto update when material is deleted
                    //set all materials tab to collapse
                    localStorage.setItem('allMaterialsTabState', 'collapsed');
                    setTimeout(function() {
                        $('#update')[0].click();
                    }, 3000);
                });


                // shoppingcart button
                $(".jg-linkbtn.shoppingcart").on('click', function() {
                    var draftId;
                    //set all materials tab to expand
                    localStorage.setItem('allMaterialsTabState', 'expand');
                    $.ajax({
                        url: "https://" + instanceName + ".bigmachines.com/commerce/buyside/config_drafts_list.jsp",
                        type: 'GET',
                        data: "_bm_trail_refresh_=true",
                        dataType: "html",
                        success: function(respData) {

                            $(respData).find("input[type='checkbox']").each(function() {
                                if ($(this).prop("name") == "ids") {
                                    draftId = $(this).val();
                                }

                            });

                            if (!$('#shoppingCartHolder').length) {
                                $(".jg-box-footer").append("<div id='shoppingCartHolder' style='display:none;'></div>");
                                $("#shoppingCartHolder").html($(respData).filter("div[id='breadcrumbs']").next());
                            }

                        },
                        error: function() {
                            console.log("Cannot get data");
                        }
                    }).done(function() {
                        bmSubmitForm('/commerce/buyside/config_drafts_list.jsp?draftId=' + draftId, document.drafts_list_view, null, 'resumeConfiguration');
                    });
                });
                /*
                    End   : 5 April 2017
                    Task  : Replace variable _loadingImage for new Loading.
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Dekstop
                */
            }
        }, 1000);

    });

    var imageObj = new Image();
    imageObj.src = "/bmfsweb/" + instanceName + "/image/Icons/loading-animation.gif";
    var timeOut;



    /*
        Start : 01 Nov 2017
        Task  : Collapse top 10 frequent customers in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : tablet
    */
    var toggleTopCustomer = function() {

        if ($('#field_wrapper_1_customerShipToId_t span').html() !== "&nbsp;") {
            $('#topCustomerList').hide().removeClass('show');
        } else if ($('#field_wrapper_1_customerShipToId_t span').html() === "&nbsp;") {
            $('#topCustomerList').show().addClass('show');
        }

        $('.top-cust_wrapper p').click(function() {
            if ($('#topCustomerList').hasClass('show')) {
                $('#topCustomerList').hide().removeClass('show');
            } else {
                $('#topCustomerList').show().addClass('show');
            }
        });
    };
    /*
        End : 01 Nov 2017
        Task  : Collapse top 10 frequent customers in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : tablet
    */
    var auditLogAccordion = function(currentAuditTab) {
        // console.log('currentAuditTab', currentAuditTab);
        var allTab = $('div[name = materialAuditTableDiv]');
        var expandAutdit = currentAuditTab.find('#materialAuditTable');
        var idVal = $(this).attr("id");
        var clickedState = $("#" + idVal).attr("clickedState");

        if (currentAuditTab.hasClass('show')) {
            $(currentAuditTab.children('table')[0]).find('tr td img').attr('src', 'https://' + instanceName + '.bigmachines.com/bmfsweb/zuelligpharmatest1/image/Icons/minus.gif');
            currentAuditTab.removeClass('show');
            expandAutdit.hide();
        } else {
            // allTab.removeClass('show');
            // allTab.children().next().hide();
            $(currentAuditTab.children('table')[0]).find('tr td img').attr('src', 'https://' + instanceName + '.bigmachines.com/bmfsweb/zuelligpharmatest1/image/Icons/plus.gif');
            currentAuditTab.addClass('show');
            expandAutdit.show();
        }
        console.log(" clickedState === " + clickedState);
        if (clickedState && clickedState !== undefined) { // second click onwards
            if (clickedState == "collapse") {
                //hide tables here
                $("#" + idVal).attr("clickedState", "expand");
            } else {
                //show tables here
                $("#" + idVal).attr("clickedState", "collapse");
            }
        } else { //first time click
            $("#" + idVal).attr("clickedState", "collapse");
            //show tables here
        }
    };
    /*
        Start : 08 Nov 2017
        Task  : Select/Unselect of commercial/bonus is not working properly.
        Page  : Order page
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    var itemCheckBonus = function(currentItem) {

        var currTr = currentItem.parent().parent();
        var checked = currentItem.is(":checked");
        //console.log('checked',checked);
        var type = currTr.find('[name*=bonusType_l]').val();
        var type2 = currTr.find('td:nth-child(3)').find('input').val();
        //console.log(type,type2);
        if (type2 === 'Comm') {
            var childTr = currTr.nextUntil("tr.child-line-item").find('td:first-child').find('input[name*=_line_item_list]');
            if (checked === true) {
                childTr.prop('checked', true);
            } else {
                childTr.prop('checked', false);
            }
        } else if (type2 == 'Bonus') {

            //var siblingTr = currTr.prevUntil('tr.child-line-item');
            //var siblingCheckbox = siblingTr.find('input[name*=_line_item_list]');
            // var parentTr = siblingTr.prev();
            //var parentCheckbox = parentTr.find('input[name*=_line_item_list]');
            var parentCheckbox = currTr.prevAll('tr.child-line-item').eq(0).find('input[name*=_line_item_list]');

            if (type == 'System Bonus') {
                //console.warn(type);
                /* if(checked===true){ //commented by suresh
                     //siblingCheckbox.prop('checked', true);
                     parentCheckbox.prop('checked', true);
                 } else{
                    // siblingCheckbox.prop('checked', false);
                     parentCheckbox.prop('checked', false);
                 }*/

            } else if (type == 'Additional Bonus') {
                console.warn(type);
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////

    };
    /*
        End : 08 Nov 2017
        Task  : Select/Unselect of commercial/bonus is not working properly.
        Page  : Order page
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    var dumpSelectedRow = function(obj) {
        console.log("I am here====");
        var trObj = obj.parentNode.parentNode; //selected row
        var currentId = $($(trObj).find('td')[1]).text(); //selected value

        function hideError() {
            $('.error-msg').hide();
        }

        function showError() {
            $('.error-msg').show();
        }
        // console.log('currentId', currentId);
        var selectedRow = $('#selectedMatTable #selectedMatTableBody tr');
        var selectedRowLength = $(selectedRow).length;
        var cartRow = $('#materialArrayset table tbody tr');
        var cartRowLength = $(cartRow).length;
        var addItem;
        var tabNum = (tabNum == NaN || tabNum == undefined || tabNum == null) ? 0 : tabNum;
        var optionHtml = [];
        var cartID = [];
        var currentCart = [];
        if (selectedRowLength > 0 || cartRowLength > 0) {
            // check slected material list
            for (var i = 0; i < selectedRowLength; i++) {

                var selectedId = $($(selectedRow[i]).find('td')[1]).text();
                // console.log('selectedId', currentId, selectedId);
                if (currentId === selectedId) {
                    showError();
                    // console.log('same item!', currentId, selectedId);
                    return;
                    // addItem = false;
                }
            }

            // check shopping cart list
            for (var j = 0; j < cartRowLength; j++) {
                var cartId = $($(cartRow[j]).find('td.cell-material input[name="material"]')).val();
                var matDesc = $($(cartRow[j]).find('td.cell-materialDescription input[name="materialDescription"]')).val();
                cartID.push(cartId);
                currentCart.push({
                    'cartId': cartId,
                    'matDesc': matDesc
                });
                if (currentId === cartId) {
                    showError();
                    return;
                }
            }

            for (var k = 0; k < cartID.length; k++) {
                var html = "";
                // console.log( cartID, currentCart );
                if (cartID[k + 1] !== cartID[k]) {
                    if (cartID[k] !== undefined) {
                        html += '<option value="' + currentCart[k].cartId + '">' + currentCart[k].cartId + ' ' + currentCart[k].matDesc + '</option>';
                    }
                }

                optionHtml.push(html);
            }

            // console.log(optionHtml);

            addItem = true;
            if (addItem) {
                hideError();
                cloneItem();
            }

        } else {
            // console.log('both empty');
            cloneItem();
        }

        function cloneItem() {
           // debugger;
            var tableObj = document.getElementById("selectedMatTableBody"); //Selected Materials Table
            var clonedTrObj = trObj.cloneNode(true); //Clone ROW
            var zPUserType = js2('#zPUserType').val();

            console.log('clonedTrObj', clonedTrObj);

            var itemBonusObj = clonedTrObj.insertCell(-1);
            var removeObj = clonedTrObj.insertCell(-1); //dustnin icon remove button
            var quantityObj = clonedTrObj.insertCell(1);

            tabNum++;

            // console.log('tabNum', tabNum);
            clonedTrObj.deleteCell(0); //Delete 1st column
            clonedTrObj.deleteCell(3);
            if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                console.log('taiwan only ,delete last 2 column');
                clonedTrObj.deleteCell(3);
                clonedTrObj.deleteCell(3);
                if(zPUserType=='Principal'){
                    clonedTrObj.deleteCell(3);
                }
                
            }
            tableObj.appendChild(clonedTrObj);
            itemBonusObj.innerHTML = '<select name="itemBonus" id="itemBonus" style="width:100%"><option value=""></option>' + optionHtml + '</select>';
            removeObj.innerHTML = "<a href='#' class = 'selected-remove'><a>";
            quantityObj.innerHTML = '<input style="width: 40px;" class="text-field attribute-field" name="selectedQty" tabindex=" ' + tabNum + ' " value="" type="text">';

            // DELETE item
            removeObj.onclick = function(event) {
                event.preventDefault();
                var tableObj1 = document.getElementById("selectedMatTableBody");
                var rowIndex = this.parentNode.rowIndex;
                tableObj1.deleteRow(rowIndex - 1);
            };
        }

    };
    /*
        Start : 28 Nov 2017
        Task  :  Incomplete order button
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet

    */
    var incompleteOrder = function() {
        // INCOMPLETE ORDER
        console.log('INCOMPLETE ORDER');
        $.ajax({
            url: "https://" + instanceName + ".bigmachines.com/commerce/buyside/config_drafts_list.jsp",
            type: 'GET',
            data: "_bm_trail_refresh_=true",
            dataType: "html",
            success: function(respData) {
                //   console.log('respData', respData);
                var n = respData.indexOf("No&#32;pending&#32;configurations");
                if (n == -1) {
                    //If there is no text "No pending configurations"
                    console.log("show");
                    $(".jg-linkbtn.shoppingcart").css("display", "block");
                } else {
                    //If text "No pending configurations" is found
                    console.log("hide");
                    $(".jg-linkbtn.shoppingcart").css("display", "none");
                }
            },
            error: function() {
                console.log("Cannot get data of pending configuration");
            }
        });

        $(".jg-linkbtn.shoppingcart").on('click', function() {
            //debugger;
            console.log('click incomplete order');
            var draftId;
            //set all materials tab to expand
            localStorage.setItem('allMaterialsTabState', 'expand');
            $.ajax({
                url: "https://" + instanceName + ".bigmachines.com/commerce/buyside/config_drafts_list.jsp",
                type: 'GET',
                data: "_bm_trail_refresh_=true",
                dataType: "html",
                success: function(respData) {
                    //   console.log('respData', respData);
                    $(respData).find("input[type='checkbox']").each(function() {
                        if ($(this).prop("name") == "ids") {
                            draftId = $(this).val();
                        }

                    });

                    if (!$('#shoppingCartHolder').length) {
                        $(".jg-box-footer").append("<div id='shoppingCartHolder' style='display:none;'></div>");
                        $("#shoppingCartHolder").html($(respData).filter("div[id='breadcrumbs']").next());
                    }

                },
                error: function() {
                    console.log("Cannot get data");
                }
            }).done(function() {
                bmSubmitForm('/commerce/buyside/config_drafts_list.jsp?draftId=' + draftId, document.drafts_list_view, null, 'resumeConfiguration');
            });
        });
    };
    /*
        End : 28 Nov 2017
        Task  : Incomplete order button
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet

    */
    var bonusQtyTooltip = function($this) {
        var qtyWrapper = $this.parent().parent().parent().parent().prev(),
            qtyField = $this.parent().parent().parent().parent().prev().find('input[name="qty_text"]'),
            tooltips = '<div class="bonus-qty-tooltip">Please click the checkbox to override the standard bonus</div>';

        qtyWrapper.append(tooltips);
        $('.bonus-qty-tooltip').hide();

        qtyField.on('mouseenter', function() {
            currentTooltip = $(this).parent().next().next();

            if ($this.prop("checked") === false) {
                // console.log('unchecked');
                currentTooltip.show();
            }
        }).on('mouseleave', function() {
            currentTooltip.hide();
            // console.log('mouseleave');
        });

    };
    /*
        Start : 07 Nov 2017
        Task  : Select/Unselect of commercial/bonus is not working properly.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop

    */
    var bonusQtyOverride = function($this) {
        // var $this = $(this);
        var qtyField = $this.parent().parent().parent().parent().prev().find('input[name="qty_text"]');

        // console.log( '$this', qtyField );
        if ($this.prop("checked") === true) {
            // console.log('checked');
            qtyField.prop('readonly', false);
        } else {
            // console.log('unchecked');
            qtyField.prop('readonly', true);
        }
    };
    /*
        End : 10 Nov 2017
        Task  : Select/Unselect of commercial/bonus is not working properly.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */

    var materialAddItem = function() {
        console.log('materialAddItem');
        var error = '<div class="error-msg">This item have been selected.</div>';
        $('.materialSearchWrapper .dataTables_scroll').prepend(error);
        $('.error-msg').hide();

        $('.addMat-btn').on('click', function(e) {
            console.log('addMat-btn click');
            e.preventDefault();
            var row = $('#selectedMatTable tr');
            var rowLength = $('#selectedMatTable tr').length;
            //var materialList = [];
            var matNoBonusString = "";
            var maHvBonusString = "";
            var existingVal = $("input[name='selectedMaterial']").val();
            var existingValModelLevel = $("input[name='selectedMaterials_M_Lvl']").val();
            var selectedCrossBonusItems = $("input[name = selectedCrossBonusItems]").val();


            for (var i = 1; i < rowLength; i++) {
                var matQty = $($(row[i]).find('input[name="selectedQty"]')).val();
                var matItemBonus = $($(row[i]).find('select[name = itemBonus]')).val();
                var matNo = $($(row[i]).find('td')[1]).text();
                var matDesc = $($(row[i]).find('td')[2]).text();
                var selectedData = "";

                console.log('matItemBonus', matItemBonus);
                if (matItemBonus !== "") {
                    selectedData = matNo + "$$" + matQty + "$$" + matItemBonus + "$$" + matDesc;
                    maHvBonusString = (maHvBonusString === "") ? maHvBonusString = selectedData : maHvBonusString + "##" + selectedData;
                    console.log('maHvBonusString', maHvBonusString);
                } else {
                    selectedData = matNo + "##" + matDesc + "##" + matQty;
                    matNoBonusString = (matNoBonusString === "") ? matNoBonusString = selectedData : matNoBonusString + "$$" + selectedData;
                    console.log('matNoBonusString', matNoBonusString);
                }

                //materialList.push(orderNo + '##' + prodctName);

            }

            if (existingVal !== "" && matNoBonusString !== "") {
                //appending newely selected materials to existing materials
                existingVal = existingVal + "$$" + matNoBonusString;
            } else if (existingVal === "" && matNoBonusString !== "") {
                //newely selected materials and no existing materials
                existingVal = matNoBonusString;
            }
            if (existingValModelLevel !== "" && matNoBonusString !== "") {
                //appending newely selected materials to existing materials
                existingValModelLevel = existingValModelLevel + "$$" + matNoBonusString;
            } else if (existingValModelLevel === "" && matNoBonusString !== "") { //newely selected materials and no existing materials
                existingValModelLevel = matNoBonusString;
            }

            $("input[name='selectedCrossBonusItems']").val(maHvBonusString);
            $("input[name='selectedMaterial']").val(existingVal); //setting to CPQ attribute
            $("input[name='selectedMaterials_M_Lvl']").val(existingValModelLevel); //setting to CPQ attribute

            $("input[name='addMaterialsFlag']").prop('checked', true); //sets addMaterialsFlag to true
            $("input[name='addMaterialsFlag']").val(true);
            $("input[name='addMaterialFlag']").prop('checked', true);
            $("input[name='addMaterialFlag']").val(true);

            console.log('selectedCrossBonusItems', $("input[name='selectedCrossBonusItems']").val());
            console.log('selectedMaterials_M_Lvl', $("input[name='selectedMaterials_M_Lvl']").val());

            if (matNoBonusString !== "" || maHvBonusString !== "") {
                $("form[name='configurationForm']").submit(); //auto update
                $("#config-form").submit(); //auto update
            }


            // focus on cart item

            //set all materials tab to collapse
            localStorage.setItem('allMaterialsTabState', 'collapsed');
        });
        /*
            Start : 22 Dec 2017
            Task  : Add Materials to selected materials section on click of material number
            Page  : Shopping Cart
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

        */
        $('#resultsTable').on('click', 'td:nth-child(2)', function() {
            $('input[type="radio"][name="selectMat"]').prop("checked",false);
            $(this).parent().find('input[type="radio"]').prop("checked", true).trigger('click');
            console.log($(this).html());
        });
        /*
            End : 22 Dec 2017
            Task  : Add Materials to selected materials section on click of material number
            Page  : Shopping Cart
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Both

        */
        $('#resultsTable').on('click', 'input[type="radio"]', function() {
            if ($(this).parent().hasClass('ui-radio')) {
                console.log('check radio button');
                var td = $('.materialSearchWrapper input[name=selectMat]').parent().parent();
                td.html('<input type="radio" name="selectMat" id="selectMat">');
                dumpSelectedRow(this);
            } else {
                console.log('check radio button2');
                dumpSelectedRow(this);
            }

        });
    };
    /*
        Start : 29 Nov 2017
        Task  : Ajax based material search for CSteam user
        Page  : Shopping Cart
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */

    var searchMaterialAjax = function(materialSearchStr, materialList) {

        //console.info(materialSearchStr);
        var searchStr = materialSearchStr.trim();
        var dataSet2 = [];
        var ajaxURL = "https://" + instanceName + ".bigmachines.com/rest/v4/customParts_Master_SG";
        var ajaxData = "q=\{'masterstring':{$regex:'/" + encodeURIComponent(searchStr) + "/i'}}&orderby=material_desc:asc";

        if($('input[name="userSalesOrg_PL"]').val()=="2800"){
            ajaxURL = "https://" + instanceName + ".bigmachines.com/rest/v3/customMaterial_Master";
            var ajaxData = "q=\{'masterstring':{$regex:'/" + encodeURIComponent(searchStr) + "/i'}}&orderby=material:asc";
        }
        if (searchStr.slice(-1) === '%') {
            //console.log(searchStr);
            searchStr = searchStr.substring(0, searchStr.length - 1);
            //console.log(searchStr);
        }
        //console.info(ajaxData);

        if (searchStr.indexOf("%") !== -1 || searchStr.indexOf(" ") !== -1) {

            wildcard = true;
            ajaxData = "q={$and:[";

            searchStr = searchStr.replace(/%/g, '%');
			searchStr = searchStr.replace(/\s/g, "%");
            //materialSearchArr = searchStr.split(/[\s%]+/);
            var materialSearchArr = searchStr.split('%');
            var arrlen = materialSearchArr.length;

            for (var i = 0; i < arrlen; i++) {
                ajaxData += "\{'masterstring':\{$regex:'/" + encodeURIComponent(materialSearchArr[i]) + "/i'}},";

            }
            ajaxData = ajaxData.substring(0, ajaxData.length - 1) + "]}&orderby=material_desc:asc";
            if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                ajaxData = ajaxData.substring(0, ajaxData.length - 1) + "]}&orderby=material:asc";
            }
            console.warn(ajaxData);

        }
        //console.warn('searchMaterialAjax');

        $.ajax({
            url: ajaxURL,
            data: ajaxData,


        }).done(function(response) {
            //console.dir(response);
            var data = response.items;

            $.each(data, function(i, item) {
                // console.log(item.material_number, item.material_desc, item.principal_name);
               // console.log(item);
                var subDataSet2 = ["", item.material_number, item.material_desc, item.principal_name];
                if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                    if(item.material_group_5 == 500 && item.materialgroup != "ZGM"){
                        var promo = "P";
                    } else {
                        var promo = "";
                    }
                    subDataSet2 = ["", item.material, item.description, promo, item.principal_code, item.principal_name];
                }
                dataSet2.push(subDataSet2);
                //console.log(subDataSet2);
            });
            //console.dir(dataSet2);



        }).always(function() {
            materialList.clear().draw();
            materialList.rows.add(dataSet2);
            if (searchStr.indexOf("%") !== -1) {
                searchStr = searchStr.replace(/%/g, ' ');
                materialList.search(searchStr).order([2, 'asc']).draw();
                $('.dataTables_scrollBody .loader-material').hide();
                $('.dataTables_scrollBody #resultsTable').show();
                //var materialResult = materialList.search(searchStr).order([2, 'asc']);


            } else {
                //materialList.columns.adjust().draw();
                materialList.search(searchStr).order([2, 'asc']).draw();
                $('.dataTables_scrollBody .loader-material').hide();
                $('.dataTables_scrollBody #resultsTable').show();
                //var materialResult = materialList.search(searchStr).order([2, 'asc']);
            }

        });

    };
    /*
        End : 05 Dec 2017
        Task  : Ajax based material search for CSteam user
        Page  : Shopping Cart
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */

    var materialSearch = function() {
        console.log('materialSearch function');
        var userCountryMS = null;
        if($('input[name="userSalesOrg_PL"]').val()=="2800"){
        var userCountryMS = null;
            userCountryMS = 'TW'; 
        }
		var customerDetails = null;
		var custArr = null;
		var totalRecs = null;
		var userType = $('input[name="zPUserType"]').val();
		if (userType !== 'CSTeam'){
			customerDetails = $("#actualMasterString").html();
            custArr = customerDetails.split("##");
			totalRecs = custArr.length;
		}
                
        var fromIndex = 0;
        var toIndex = totalRecs;
        var dataSet = [];
        
        // Added loading message in data table
        var loading = '<p class="loader-material" style="text-align: center; margin: 10px 0; display: none;">Loading...</p>';
		var enableOldMaterialSearch = "false";
		if($("input[name=enableOldMaterialSearch]").length > 0){
			 enableOldMaterialSearch = $("input[name=enableOldMaterialSearch]").prop("checked").toString();
		}else{
			 enableOldMaterialSearch = $("select[name=enableOldMaterialSearch]").val();
			 console.log(">>>>>>>>>>"+enableOldMaterialSearch+">>>"+(enableOldMaterialSearch == "false"));
		}

        //userType = null;

        console.warn('materialSearch');
        if (userType !== 'CSTeam' ||  enableOldMaterialSearch == "true") {
            for (var i = fromIndex; i < toIndex; i++) {
                colArr = custArr[i].split("$$");
                console.dir(colArr);
                for (var t = 0; t < 3; t++) {
                    if (typeof colArr[t] === 'undefined') {
                        colArr[t] = '';
                    }
                }
                var subDataSet = ["", colArr[0], colArr[1], colArr[2]];
                if(userCountryMS === 'TW'){
                     subDataSet = ["", colArr[0], colArr[1], colArr[2], colArr[3], colArr[4]];
                     //debugger;
                     console.log('userType',userType);
                    if(userType == 'Principal'){
                        subDataSet = ["", colArr[0], colArr[1], colArr[5], colArr[2], colArr[3], colArr[4]]; 
                    }
                }
                dataSet.push(subDataSet);
            }
        }
        var material_column = [{
            title: ""
        },
        {
            title: "Material Number"
        },
        {
            title: "Material Description"
        },
        {
            title: "Principal Name"
        }];

        if(userCountryMS === 'TW'){
            material_column = [{
                title: ""
            },
            {
                title: "Material Number"
            },
            {
                title: "Material Description"
            },
            {
                title: "Promo"
            },
            {
                title: "Principal Code"
            },
            {
                title: "Principal Name"
            }];

            if(userType == 'Principal'){
                material_column.splice(3, 0, {title: "Principal Material Code"}); 
            }
        }
		
		var pageLen = 10;
		var lenMenu = [ 10, 25, 50, 75, 100];
		if(isMobileVersion){//added for mobile version
			pageLen = 5;
			lenMenu = [3,5, 10, 25, 50, 75, 100];
		}
        var materialList = $('#resultsTable').DataTable({
            scrollY: "400px",
            scrollCollapse: true,
            data: dataSet,
            deferRender: true,
			pageLength:pageLen,
			lengthMenu: lenMenu,
            order: [
                [1, 'asc']
            ],
            columnDefs: [{
                targets: 0,
                searchable: false,
                orderable: false,
                render: function(data, type, full, meta) {
                    if (type === 'display') {
                        data = '<input type="radio" name="selectMat" id= "selectMat">';
                    }

                    return data;
                }
            }],
            columns: material_column
        });

        // append loading message after initialised datatable.
        $('.dataTables_scrollBody').prepend(loading);

        if (userType === 'CSTeam' && enableOldMaterialSearch == "false") {
            //console.info('material search ajax call');

            var ajaxURL = "https://" + instanceName + ".bigmachines.com/rest/v4/customParts_Master_SG";
            var ajaxData = "orderby=material_desc:asc";
            if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                ajaxURL = "https://" + instanceName + ".bigmachines.com/rest/v3/customMaterial_Master";
                ajaxData = "orderby=material:asc";
            }    

            $.ajax({
                url: ajaxURL,
                data: ajaxData,


            }).done(function(response) {
                //console.dir(response);
                var data = response.items;

                $.each(data, function(i, item) {
                    //console.log(item.material_number, item.material_desc, item.principal_name);
                    //console.log(item);
                    var subDataSet = ["", item.material_number, item.material_desc, item.principal_name];
                    if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                        if(item.material_group_5 == 500 && item.materialgroup != "ZGM"){
                            var promo = "P";
                        } else {
                            var promo = "";
                        }
                        subDataSet = ["", item.material, item.description, promo, item.principal_code, item.principal_name];
                    }
                    dataSet.push(subDataSet);
                    //console.log(subDataSet);
                });

                //console.log('ajax data loaded');

            }).always(function() {
                materialList.clear().draw();
                materialList.rows.add(dataSet);
                materialList.columns.adjust().draw();
            });

        }

        //console.dir(dataSet);

        $('#resultsTable_filter').find('input').on('keyup', function() {
            //console.info('desktop ss');
            var materialSearch = $(this).val();

            //console.log('materialSearch',materialSearch);

            if ((userType === 'CSTeam') && (materialSearch.length > 2) && enableOldMaterialSearch == "false") {

                if (materialSearch.slice(-1) === '%') {
                    materialSearch = materialSearch.substring(0, materialSearch.length - 1);
                    materialSearch = materialSearch.replace(/%/g, ' ');
                    materialList.search(materialSearch).order([2, 'asc']).draw();
                } else {
                    $('.dataTables_scrollBody .loader-material').show();
                    $('.dataTables_scrollBody #resultsTable').hide();
                    searchMaterialAjax(materialSearch, materialList);
                }

            } else {
                /*
                    Start : 10 Nov 2017
                    Task  : Wildcard material search
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Both
                */
                if (materialSearch.indexOf("%") !== -1) {

                    materialSearch = materialSearch.replace(/%/g, ' ');

                }
                /*
                    end : 12 Nov 2017
                    Task  : Wildcard material search
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Both
                */
                /*
                    Start : 06 Nov 2017
                    Task  : Material Type-ahead Search: Sorting should be in Alphabetical Order
                    Page  : Material
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop
                */
                materialSearch.trim();
                materialList.search(materialSearch).order([2, 'asc']).draw();
                /*
                    Start : 10 Nov 2017
                    Task  : Material Type-ahead Search: Sorting should be in Alphabetical Order
                    Page  : Material
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop
                */
            }


        });


        var searchInput = setInterval(findSearchInput, 1000);

        function findSearchInput() {
            //console.log('findSearchInput');

            // console.log('start searchiing');
            if ($('#resultsTable_filter .ui-input-search input').length > 0) {
                //console.log('tablet ajax material search');
                // console.log('found ui-input-search');
                $('#resultsTable_filter .ui-input-search input').on('keyup', function() {

                    var materialSearch = $(this).val() || '';


                    if ((userType === 'CSTeam') && (materialSearch.length > 2)) {
                        /*
                            Start : 10 Nov 2017
                            Task  : Wildcard material search
                            Page  : Shopping Cart
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Both
                        */
                        if (materialSearch.slice(-1) === '%') {
                            materialSearch = materialSearch.substring(0, materialSearch.length - 1);
                            materialSearch = materialSearch.replace(/%/g, ' ');
                            materialList.search(materialSearch).order([2, 'asc']).draw();

                         /*
                            End : 10 Nov 2017
                            Task  : Wildcard material search
                            Page  : Shopping Cart
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Both
                        */
                        } else {
                            $('.dataTables_scrollBody .loader-material').show();
                            $('.dataTables_scrollBody #resultsTable').hide();
                            searchMaterialAjax(materialSearch, materialList);
                        }

                    } else {

                        if (materialSearch.indexOf("%") !== -1) {
                            materialSearch = materialSearch.replace(/%/g, ' ');
                        }
                        materialSearch.trim();
                        materialList.search(materialSearch).order([2, 'asc']).draw();
                    }



                });
                clearInterval(searchInput);
            }


        }

    };


    var updateErrorMsg = function() {
        var updateMsg = "<div class='updateMsg'>Please click 'update' to proceed.</div>";
        $('#tab-material-content .jg-box-toolbar').parent().parent().parent().append(updateMsg);
    };
    var searchCustomerList = function(seachCustomer) {
        console.log('searchCustomerList func');
        var timer;

        $("#searchCustomerInput").click(function() {
            console.log('#searchCustomerInput click');
            var inputLength = $('#searchCustomerInput').val().length;
            if (inputLength === 3 || inputLength > 3) {
                console.log('click');
                $('.search-cust_wrapper').show();
            }
        });


        var zPUserType = $('#zPUserType').val();
        if (zPUserType === 'CSTeam') {
            $('#searchCustomerInput').keyup(function() {

                var inputLength = $('#searchCustomerInput').val().length;

                console.log('keyup', inputLength);
                clearTimeout(timer);
                timer = setTimeout(function() { //then give it a second to see if the user is finished
                    if (inputLength === 3 || inputLength > 3) {
                        //ajax
                        loadAjax();
                        setTimeout(function() {
                            $('.search-cust_wrapper').show();
                        }, 1000);
                        // seachCustomer.search($(this).val()).draw();

                    } else {
                        console.log('hide table');
                        $('.search-cust_wrapper').hide();

                    }
                }, 1000);


            });

        }

        $(document).mouseup(function(e) {
            var searchInput = $("#searchCustomerInput");
            var searchResult = $(".search-cust_wrapper");

            if ((!searchInput.is(e.target) && searchInput.has(e.target).length === 0) && (!searchResult.is(e.target) && searchResult.has(e.target).length === 0)) {
                // console.log('can hide');
                $('.search-cust_wrapper').hide();
            }
        });

    };
    var loadAjax = function() {
        console.log('send ajax');
        var fullUrl = window.location.host;
        var parts = fullUrl.split('.');
        var sub = parts[0];
        var dataSet = [];
        $.ajax({
            //url: 'https://zuelligpharmatest1.bigmachines.com/rest/v3/customCustomer_Master?q={"contact_firstname":"Biomedical Science Institutes"}',
            url: "https://" + sub + ".bigmachines.com/rest/v3/customCustomer_Master",
          //data: "q={'custmasterstring':{$regex:'/" + encodeURIComponent($('#searchCustomerInput').val()) + "/i'}}&orderby=customer_name:asc"
            data: 'q={"custmasterstring":{$regex:"/' + encodeURIComponent($("#searchCustomerInput").val()) + '/i"}}&orderby=customer_name:asc'
        }).done(function(response) {
            console.log('jquery done');
            var data = response.items;
            $.each(data, function(i, item) {
                var subDataSet = ["", item.customer_soldto_id, item.customer_shipto_id, item.customer_name, item.customer_corp_group, item.cust_shpto_add1, item.cust_shpto_addr2, item.customer_ship_phone, item.customer_shpto_pcode];

                /*if(userCountry === 'PH'){
                    subDataSet = ["", item.customer_soldto_id, item.customer_name, item.customer_corp_group, item.cust_shpto_add1, item.cust_shpto_addr2, item.customer_ship_phone, item.customer_shpto_pcode];
                }*/

                dataSet.push(subDataSet);
            });

            // searchCustList(dataSet);
        }).always(function(response) {
            searchCustList(dataSet);
        });
    };
    var searchCustList = function(dataSet, seachCustomer) {
        console.log('searchCustList');

        var zPUserType = $('#zPUserType').val();

        if (zPUserType !== 'CSTeam') {
            // console.log('split table');
            var custArr = dataSet.split("##");
            var totalRecs = custArr.length;
            var fromIndex = 0;
            var toIndex = totalRecs;
            var dataSet = [];

            for (var i = fromIndex; i < toIndex; i++) {
                colArr = custArr[i].split("$$");
                var subDataSet = ['', colArr[0], colArr[1], colArr[2], colArr[3], colArr[4], colArr[5], colArr[6], colArr[7]];
                dataSet.push(subDataSet);
            }

            $('#searchCustomerInput').keyup(function() {
                var inputLength = $('#searchCustomerInput').val().length;
                if (inputLength === 3 || inputLength > 3) {
                    seachCustomer.search($(this).val()).draw();
                    $('.search-cust_wrapper').show();
                } else {
                    $('.search-cust_wrapper').hide();
                }
            });
        }
        var userColumn = [{
                title: ""
            },
            {
                title: "Sold To ID"
            },
            {
                title: "Ship To ID"
            },
            {
                title: "Customer Name"
            },
            {
                title: "Corp. Group"
            },
            {
                title: "Address1."
            },
            {
                title: "Address2."
            },
            {
                title: "Phone"
            },
            {
                title: "Postal Code"
            },
        ];
        /*if(userCountry === 'PH'){
			userColumn.splice(2,1);
        }*/

        seachCustomer = $('#searchCustomer').DataTable({
            destroy: true,
            scrollY: "400px",
            scrollCollapse: true,
            data: dataSet,
            deferRender: true,
            order: [
                [3, 'asc']
            ],
            columnDefs: [{
                targets: 0,
                searchable: false,
                orderable: false,
                render: function(data, type, full, meta) {

                    // console.log('full', full[2]);
                    if (type === 'display') {
                        //data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
                        if(userCountry === 'PH'){
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1] + '">';
						} else{
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
						}
                    }

                    return data;
                }
            }],
            columns: userColumn

        });

        $("#searchCustomer").on('click',"input[name='searchCust']", function() {
        //$("input[name='searchCust']").on('click', function() {
            mobile_delete_line_item_func($(this).val());

            /*var selectedCustShipID = $(this).val();
            $("#selectedCustomerDetail").val(selectedCustShipID);
            setTimeout(function(){
                $("#save").click();
                //$("#sticky-actions .action-type-modify").click();
                if($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length>0){
                    $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                } else {
                    $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                }
            }, 500);*/
        });
        /*
            Start : 10 Nov 2017
            Task  : Customer Type-ahead Search
            Page  : Shopping cart
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Tablet
        */
        var searchCust99 = seachCustomer.column(3).search($('#searchCustomerInput').val(), true, true).draw();
        var info = searchCust99.page.info();
        if (info.recordsDisplay === 0) {
            seachCustomer2 = seachCustomer = $('#searchCustomer').DataTable({
                destroy: true,
                scrollY: "400px",
                scrollCollapse: true,
                data: dataSet,
                deferRender: true,
                order: [
                    [3, 'asc']
                ],
                columnDefs: [{
                    targets: 0,
                    searchable: false,
                    orderable: false,
                    render: function(data, type, full, meta) {

                        // console.log('full', full[2]);
                        if (type === 'display') {
                           // data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
                           if(userCountry === 'PH'){
							data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[1] + '">';
                            } else{
                                data = '<input type="radio" name="searchCust" id= "searchCust" value="' + full[2] + '">';
                            }
                        }

                        return data;
                    }
                }],
                columns: userColumn

            });
            $("input[name='searchCust']").on('click', function() {

                mobile_delete_line_item_func($(this).val());
                /*var selectedCustShipID = $(this).val();
                $("#selectedCustomerDetail").val(selectedCustShipID);
                setTimeout(function(){
                    $("#save").click();
                    //$("#sticky-actions .action-type-modify").click();
                    $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();

                }, 500);*/
            });
        }
    };
        /*
            End : 10 Nov 2017
            Task  : Customer Type-ahead Search
            Page  : Shopping cart
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Tablet
        */
    // MOBILE JS PART
    /*
        Start : 11 Dec 2017
        Task  : Delete line items if customer is changed.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */
    var mobile_delete_line_item_func = function(selectedCustShipID) {

        ///checking existing order items start
        var exitingDataItems = $('th.lig-attribute:contains("Material Description")').attr('data-properties');
        var exitingDataItemsObj = JSON.parse(exitingDataItems);
        var line_items_no = exitingDataItemsObj.children.length;
        //console.log('line_items_no',line_items_no);
        ///checking existing order items end
        var selectedCustShipID = parseInt(selectedCustShipID);
        var currentCust = parseInt($('input[name="customerShipToId_t"]').val());


        if ((selectedCustShipID != currentCust) && (selectedCustShipID > 0) && (currentCust > 0) && (line_items_no > 0)) {

            if (confirm('The line items will be deleted from order on change of customer. Do you want to proceed?.')) {

                //document.cookie = "selectedCustShipID="+selectedCustShipID;
                if (sessionStorage.getItem('selectedCustShipID') == 'null' || sessionStorage.getItem('selectedCustShipID') == null) {
                    sessionStorage.setItem('selectedCustShipID', selectedCustShipID);
                }

                $('.sidebar-handle').click();

                var showFooter = setInterval(showFooterFunc, 500);
                var delItemBtnClicked;
                var confirmBtnClicked;

                function showFooterFunc() {
                    if ($("#swipe-sidebar").hasClass("sidebar-state-1")) {
                        $('footer.ui-footer.ui-bar-b.ui-footer-fixed').removeClass('ui-fixed-hidden');
                    }
                    if (!delItemBtnClicked) {
                        console.count('delItemBtnClicked');
                        delItemBtnClicked = setInterval(delItemBtnFunc, 500);
                    }
                }

                function delItemBtnFunc() {
                    console.log('delItemBtnFunc');
                    $('input[type="checkbox"][name="_line_item_list_all"]').prop("checked", true);
                    $('input[type="checkbox"][name="_line_item_list"]').prop("checked", true);

                    var ebtn = $('footer.ui-footer.ui-bar-b.ui-footer-fixed #button-bar #lig-sticky-actions button.action-type-remove');
                    var ebtn2 = $('#popup-moreBtns-lig-popup li a.ui-btn:contains("Delete Line Items")');

                    if (ebtn.length > 0) {
                        ebtn[0].click();

                    } else {
                        ebtn2[0].click();
                    }
                    clearInterval(delItemBtnClicked);

                    if (!confirmBtnClicked) {
                        console.count('confirmBtnClicked');
                        confirmBtnClicked = setInterval(confirmBtnClickedFunc, 500);
                    }

                }

                function confirmBtnClickedFunc() {
                    console.dir('confirmBtnClickedFunc');
                    clearInterval(showFooter);
                    clearInterval(delItemBtnClicked);
                    clearInterval(confirmBtnClicked);

                    if ($("button.lig-confirm").length > 0) {
                        console.dir('delete confirm');
                        $("button.lig-confirm")[0].click();
                    } else {
                        alert('else delete confirm');
                        $('#popup-moreBtns-lig-popup li a.ui-btn:contains("Confirm Delete")')[0].click();
                    }


                }
            }

        } else {
            $("#selectedCustomerDetail").val(selectedCustShipID);
            $("#customerMasterString_t").val("");
            setTimeout(function() {
                console.log('save button clicked');
                $("#save").click();
                if ($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length > 0) {
                    console.log('36246153 clicked');
                    $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                } else {
                    console.log('popup-list li:first-child clicked');
                    $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                }
            }, 500);
        }
    }
    /*
        End : 20 Dec 2017
        Task  : Delete line items if customer is changed.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */
    /*
        Start : 17 Nov 2017
        Task  : Edited fields should be in red font in both Order page and Shopping cart
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */
    var mobile_overRidePriceRed = function() {
        $('.cell-price').each(function() {
            var priceVal = $(this).find('input[name=price]').val();
            var overridePrice = $(this).next().find('input[name=overridePrice]');
            var overridePriceVal = overridePrice.val();
            //console.log('priceVal', priceVal, 'overridePriceVal', overridePriceVal);
            if ((priceVal != overridePriceVal) && (overridePriceVal != 0.0)) {
                overridePrice.css({
                    color: '#ff0000'
                });
            } else {
                overridePrice.css({
                    color: '#000000'
                });
            }
        });
        //mobile_qty_outofstock_color
    };
    /*
        End : 21 Nov 2017
        Task  : Edited fields should be in red font in both Order page and Shopping cart
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both

    */

    var mobile_deleteLineItem = function() {
        $(".action-type-remove").click(function(e) {
            e.preventDefault();

            if (!$('.lig-headers input[name=_line_item_list_all]').is(':checked')) {
                $('.lig-row.parent td input[name=_line_item_list] ').prop('checked', false);
            }

            //below functions will recall the button default functionality
            // setDocFormIds(36244074, 1, 36244180);
            // submitFormActionEvent('/commerce/buyside/document.jsp', true);
            // bmCancelBubble(event);
        });
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
		console.log($this.parent().attr("id"));
		if($this.parent().attr("id")){
			var curRowIndex = $this.parent().attr("id").split("-")[2];
			var isOverrideBonusQty = $("#overrideBonusQty"+curRowIndex).val();
			console.log('22 mobile_bonusQtyOverride =====>>>> ', isOverrideBonusQty);
			if(isOverrideBonusQty == "true"){				 
				  $("#qty_text"+curRowIndex).prop('readonly', false);
				  $("#qty_text"+curRowIndex).css('color', 'red');
				  
			}else{
				  console.log('33 mobile_bonusQtyOverride =====>>>> ');
				  $("#qty_text"+curRowIndex).prop('readonly', true);
				   if ($("#qty_text"+curRowIndex).val() == 0) {
						$("#qty_text"+curRowIndex).css('color', 'red');
				   }			    
				   if($("#stockQty"+curRowIndex).val() == 0){
						$("#qty_text"+curRowIndex).css('color', 'red');
				   }else{
					   $("#qty_text"+curRowIndex).css('color', '#333');
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
    var mobile_updateMsg = function() {
        var updateMsg = "<div class='updateMsg'>Please click 'Update' to proceed.</div>";
        $('footer').prepend(updateMsg);
		console.log(' === mobile_updateMsg ===>>>');
    };
	
	/*
	  @pratap Production Issue : Rename Button
	*/
	var mobile_renameButton = function() {
		console.log(' === mobile_renameButton ===>>>'); 
		$("#button-bar .button-invoke-add").text('Add to Order');
		$("#button-bar .button-invoke-return").text('Cancel Shopping');
		
    };
	
    var mobile_onChangeUpdateMsg = function() {
		$('input[name="overridePrice"], input[name="qty_text"], input[name="comments"], input[name="additionalMaterialQty"]').off();
		//var ovrrideprice = $('input[name="overridePrice"]').val();
		//console.log(' mobile_updateMsg === overridePrice ==>',ovrrideprice);
		//var qtyText = $('input[name="overridePrice"]').val();		
        //$('input[name="overridePrice"], input[name="qty_text"], input[name="comments"], input[name="additionalMaterialQty"]').on('change blur keyup', function() {
		$('input[name="overridePrice"], input[name="qty_text"], input[name="comments"], input[name="additionalMaterialQty"]').on('change', function() {	
			//var changed_ovrrideprice = $('input[name="overridePrice"]').val();
			//console.log(' mobile_updateMsg === changed_ovrrideprice ==>',changed_ovrrideprice);
            $('input[name="_needUpdate"]').val('yes');
            console.log(' === setting YES 2222 overridePrice');
        });
    };
    var mobile_pricingChange = function() {
		$('input[name="customerPORef_t"], textarea[name="orderingRequestNoMoreThan90Characters_t"], input[name*="comment_l"]').off();
        $('input[name="customerPORef_t"], textarea[name="orderingRequestNoMoreThan90Characters_t"], input[name*="comment_l"]').bind('change', function() {
            $('input[name="saveQuoteRequired_t"]').val('Yes');
            console.log('saveQuoteRequired_t change');
        });
    };
    /*
        Start : 05 Nov 2017
        Task  : task
        Page  : Shopping cart
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */
    var mobile_hide_unwanted_arrow = function() {
        console.log('mobile_hide_unwanted_arrow');
        $('#swipe-sidebar-content,.sidebar-handle').hide();
    };
    /*
        End : 05 Nov 2017
        Task  : task
        Page  : Shopping cart
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */
    var mobile_shoppingCart_msg = function() {
        console.log('mobile_shoppingCart_msg');
        var msg = '*Please click the checkbox to override the standard bonus';
        $('#materialArrayset table.config-array').after('<p id="overrideMsg" style="display:none;font-style: italic; color: red;">' + msg + '</p>');

        $('select[name=overrideBonusQty]').on('change', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $('.cell-overrideBonusQty').has('div').prev().find('input').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            $qtyVal = $(this).parent().parent().next().find('select[name=overrideBonusQty]').val();
            if ($qtyVal == 'false') {
                $('#overrideMsg').show(600);
            } else {
                $('#overrideMsg').hide(600);
            }
        });
    };
    /*
        Start : 06 Nov 2017
        Task  : Hide check box in line item grid in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */
    var mobile_checkItemOnCart = function() {
        console.log('mobile_checkItemOnCart');
		$("#line-item-grid table tr.parent").find("input[name=_line_item_list]").prop("checked",true);
        $('.action-type-reconfigure').on('click', function(e) {
			e.preventDefault();
            if ($('.lig-side-scroller table .content tr').length > 1) {
                //$($('.lig-side-scroller table .content tr')[0]).find('td.lig-select input').prop('checked', true);

                $('.lig-row.child').each(function() {
                    $(this).find('input[name=_line_item_list]').prop('checked', false);
                });
            }
			var bs_id = $("#cmdata_id").val();
			var destURL = "https://"+instanceName +".bigmachines.com/commerce/buyside/reconfig_form.jsp?action_id=36245411&doc_number=1&document_id=36244074&id="+bs_id+"&proxy_submit_url=%2Fcommerce%2Fnew_equipment%2Fproducts%2Fmodel_configs.jsp&_line_item_list="+currentModelNumber;
			console.log("destURL === "+destURL);
			window.location = destURL;
        });

        if ($('.lig-side-scroller table .content tr') !== '') {
            setTimeout(function() {
                // console.log('check', $('.lig-side-scroller table .content tr').length);
                /*
                    Start : 02 Nov 2017
                    Task  : Hide/enable add material/Edit shopping cart based on items in line item grid
                    Page  : Shopping cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                if ($('.lig-side-scroller table .content tr').length > 1) {
                    // console.log('more than 1 tr');
                    //$($('.lig-side-scroller table .content tr')[0]).find('td.lig-select input').prop('checked', true);
                    $('.action-type-add-from-catalog').hide();
                }
                /*
                    End : 02 Nov 2017
                    Task  : Hide/enable add material/Edit shopping cart based on items in line item grid
                    Page  : Shopping cart
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                /*
                    Start : 01 Nov 2017
                    Task  : Hide check box in line item grid in order page
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                /*if ($('.lig-side-scroller table .content tr.lig-row.child').length > 0) {
                    // console.log('more than 1 tr');
					function checkOnlyTheKey(){
						
						setTimeout(function(){
							var $theKey = $("input[name='_line_item_list'][value='2']");
							if($theKey.length > 0){
								$theKey.prop("checked", true);
							}else{
								checkOnlyTheKey();								
							}
						}, 500);
						
					}
					checkOnlyTheKey();

                }*/
                /*
                    End : 01 Nov 2017
                    Task  : Hide check box in line item grid in order page
                    Page  : Global
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Tablet
                */
                order_page_stock_color();
                mobile_rowBgColor();
                $("input[name = _line_item_list]").change(function() {
                    console.log('mobile_itemCheckBonus');
                    mobile_itemCheckBonus($(this));
                });

            }, 1000);


        }
    };
    /*
        End : 06 Nov 2017
        Task  : Hide check box in line item grid in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */

    /*
        Start : 06 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Order
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */
    function order_page_stock_color() {
        console.log('order_page_stock_color');
        $('#line-item-grid .lig-side-scroller>table tr.lig-row.child').each(function() {
            var $child = $(this).children('td');
            var $stock = $child.find('input[name*="inStock_l"]');
            var stockval = $stock.val();
            
            var $qty_text = $child.find('input[name*="qty_l"]');

            if (stockval == 'No') {
                $child.eq(5).css('color', 'red');
                // $child.eq(6).css('color','red');
                $stock.parent().parent().parent().css('color', 'red');
                $qty_text.parent().parent().parent().css('color', 'red');
            }

            var $overridePrice = $child.find('input[name*="isPriceOverride"]');

            if ($overridePrice.val() == 'true') {
                $child.eq(6).css('color', 'red');
            }

            var $overrideBonusQty = $child.find('input[name*="bonusOverideFlag_l"]');
            if( $overrideBonusQty.val() == "true" ){
                // Qty Text in row of bonus
                $qty_text.parent().parent().parent().css('color', 'red');
            }

        });

    }
    /*
        End : 07 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Order
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */
    /*
        Start : 06 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Order
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */
    function mobile_rowBgColor() {
        console.log('mobile_rowBgColor');

        $('#swipe-sidebar #line-item-grid tr.lig-row.child').each(function() {

            var order_type = $(this).find('td:nth-child(3)').find('input').val();
            console.log(order_type);

            if (order_type == 'Bonus') {
                $(this).css('background-color', '#eee');
                $(this).addClass('bonus');
            } else if (order_type == 'Comm') {
                $(this).css('background-color', '#fff');
                $(this).addClass('comm');
            }


        });

        mobile_iframe_height();
    }
    /*
        End : 06 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Order
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */

    function mobile_qty_outofstock_color() {

        console.log('mobile_qty_outofstock_color');
        $('td.cell-stockQty').each(function() {
            var stock = $(this).find('input[name="stockQty"]').val();
            //console.warn(stock);
            if (stock == 0) {
                $parent = $(this).parent();
                // console.log($parent.html());
                $parent.children('td.cell-qty_text').find('input[name="qty_text"]').css('color', 'red');
                $parent.children('td.cell-overridePrice').find('input[name="overridePrice"]').css('color', 'red');
                $parent.children('td.cell-inStock').find('span').css('color', 'red');
            }
        });

        //bonus quantity start
        /*$('#additionalMaterialArrayset table.config-array>tbody.content>tr').each(function(){
            var stockStatus = $(this).find('.cell-inStockAdditional').find('input[type="hidden"][name="inStockAdditional"]').val();
            if(stockStatus=='No'){
                $(this).find('input[name="additionalMaterialQty"]').css('color','red');
            }
        });*/
        //bonus quantity end

    }
/*
    Start : 21 Nov 2017
    Task  : Copy Order should redirect to Add Materials
    Page  : Global
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/
    function mobile_redirect_materialpage() {
        var url = window.location.href;
        var urlarr = url.split('/');
        var filterPage = urlarr[urlarr.length - 1];
        if (filterPage.search("copy_processing.jsp") != -1) {

            var timeInterval = setInterval(function() {
                if ($("#swipe-sidebar").hasClass("sidebar-state-0")) {
                    $('.sidebar-handle').click();
                    redirectConfigPage();
                }
            }, 100);

            function redirectConfigPage() {
                //   alert('redirectConfigPage');
                if ($("#swipe-sidebar").hasClass("sidebar-state-1")) {
                    clearInterval(timeInterval);

                    // if have item on cart
                    var sliderOut = setInterval(function() {
                        if ($('.sidebar-state-1').attr('style').includes('right: 0px;')) {
                            clearInterval(sliderOut);

                            setTimeout(function() {
                                if ($('#swipe-sidebar .lig-row').hasClass('parent')) {
                                    //    alert('have checkbox');
                                    var checkbox = $('.lig-row.parent td.lig-select .ui-checkbox input[name="_line_item_list"]');
                                    var ebtn = $('#button-bar #lig-sticky-actions button:contains("Edit Shopping Cart")');
                                    var ebtn2 = $('#popup-moreBtns-lig-popup li a.ui-btn:contains("Edit Shopping Cart")');
                                    checkbox.prop('checked', true);

                                    var checkboxInterval = setInterval(function() {

                                        var checkFirstChild = checkbox.is(':checked');
                                        //    alert(checkbox.is(':checked'));
                                        if (checkFirstChild === true) {
                                            clearInterval(checkboxInterval);

                                            if (ebtn.length == 1) {
                                                //    alert('click ebtn');
                                                ebtn.click();
                                            } else {
                                                // alert('click ebtn2');
                                                ebtn2.click();
                                            }

                                        }

                                    }, 100);

                                } else {

                                    $('#lig-sticky-actions button:visible').click();

                                }
                            }, 1000);
                        }
                    }, 100);


                    //

                }
            }
        }

    }
/*
    Start : 07 Dec 2017
    Task  : Copy Order should redirect to Add Materials
    Page  : Global
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/
    var mobile_actionButtonFavItem = function() {
        // shoppingcart favourite button
        //Code for Frequently Order products
        $("#AddFav").click(function() {
            console.log('#AddFav click');
            //looping through all selected favourite items and storing into CPQ attribute
            var checkedFavString = "";
            $("input[name='selectFav']:checked").each(function() {
                var data = $(this).attr("data");
                if (checkedFavString == "") {
                    checkedFavString = data;
                } else {
                    checkedFavString = checkedFavString + "###" + data;
                }
                $(this).prop('checked', false); // Unchecks it
            });
            $("input[name='selectedFavouriteItems']:hidden").val(checkedFavString);
            if (checkedFavString != "") {
                $("form#config-form").submit(); //auto update
            }

            /*
                Start : 27 Dec 2017
                Task  : https://jira.uhub.biz/browse/VMLSINOZP-71 Auto collappse  My Fav Items on click of respective Add button
                Page  : Global
                File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                Layout : Tablet

            */
            console.log("Handler for .click() called.");
        });
        //End of code for Frequently Order products
        //Code for Principal Favourite
        $("#AddPrincipalFav").click(function() {
            console.log('#AddPrincipalFav click');
            //looping through all selected Principal Favourite items and storing into CPQ attribute
            var checkedFavString1 = "";
            $("input[name='selectPrincipalFav']:checked").each(function() {
                var data = $(this).attr("data");
                if (checkedFavString1 == "") {
                    checkedFavString1 = data;
                } else {
                    checkedFavString1 = checkedFavString1 + "###" + data;
                }
                $(this).prop('checked', false); // Unchecks it
            });
            $("input[name='selectedPrincipalFavoriteItems']:hidden").val(checkedFavString1);
            if (checkedFavString1 != "") {
                $("form#config-form").submit();
            }

            console.log("Handler for .click() called.");
        });
        //End of code for Principal Favourite
        //Code for Current Customer Favourite
        $("#AddCustFav").click(function() {
            //looping through all selected Customer Favourite items and storing into CPQ attribute
            console.log('#AddCustFav click');
            var checkedFavString2 = "";
            $("input[name='selectCustFav']:checked").each(function() {
                var data = $(this).attr("data");
                if (checkedFavString2 == "") {
                    checkedFavString2 = data;
                } else {
                    checkedFavString2 = checkedFavString2 + "###" + data;
                }
                $(this).prop('checked', false); // Unchecks it
            });
            $("input[name='selectedFavouriteItems']:hidden").val(checkedFavString2);
            if (checkedFavString2 != "") {
                $("form#config-form").submit();
            }

            /*
                Start : 27 Dec 2017
                Task  : https://jira.uhub.biz/browse/VMLSINOZP-71 Auto collappse  My Fav Items on click of respective Add button
                Page  : Global
                File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                Layout : Tablet

            */
            console.log("Handler for .click() called.");
        });
        //delete fav items
        $("#DeleteCustFav").click(function() { //looping through all selected Customer Favourite items and storing into CPQ attribute
            var checkedFavString2 = "";
            $("input[name='selectCustFav']:checked").each(function() {
                var data = $(this).attr("data");
                if (checkedFavString2 == "") {
                    checkedFavString2 = data;
                } else {
                    checkedFavString2 = checkedFavString2 + "###" + data;
                }
                $(this).prop('checked', false); // Unchecks it
            });
            $("input[name='deletedMyFavItems']:hidden").val(checkedFavString2);
            if (checkedFavString2 != "") {
                $("form#config-form").submit();
            }

            console.log("Handler for .click() called.");
        });
    };
     /*
        Start : 01 Nov 2017
        Task  : Collapse top 10 frequent customers in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : tablet
    */
    var mobile_toggleTopCustomer = function() {

        if ($('input[name=_shipTo_t_company_name]').val() !== "") {
            // console.log('have value', $('#topCustomerList_wrapper'));
            $('#topCustomerList_wrapper').hide();
            // .removeClass('show');
        } else {
            // console.log('no value');
            $('#topCustomerList_wrapper').show();
            // .addClass('show');
        }

        $('.top-cust_wrapper p').on('click', function() {
            // console.log('click toggle');
            if ($('#topCustomerList_wrapper').hasClass('show')) {
                $('#topCustomerList_wrapper').hide().removeClass('show');
            } else {
                $('#topCustomerList_wrapper').show().addClass('show');
            }
        });


    };
    /*
        End : 01 Nov 2017
        Task  : Collapse top 10 frequent customers in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : tablet
    */
    var mobile_materialSearch = function() {
        console.log('start mobile_materialSearch');
        var materialHTML = '<div class="materialSearchWrapper"> <div class="normalPopupCont flLeft" id="leftPanel"> <table id="resultsTable" style="width: 100%;"></table> </div><div class="normalPopupCont1 flRight" id="rightPanel"> <div class="popupHeader1 bigHeader">Selected Materials</div><div class="accountstable" id="selectedResultsTable"> <div class="accountstable" id="selectedMatTableDiv" style="overflow-y: auto;height: 400px;"> <table id="selectedMatTable" style="background-color: white !important;"> <thead> <tr> <th style="width:5%">Qty</th><th style="width:20%">Material Number</th> <th style="width:50%">Material Description</th><th style="width:20%">Comm. Item for Bonus</th> <th style="width:5%"></th> </tr></thead> <tbody id="selectedMatTableBody"> </tbody> </table> <a href="#" id="addMaterialBtn" name="addMaterialBtn" class="jg-btn addMat-btn" style="width: auto; margin-top: 50px; display: inline-block;">Add</a> </div></div></div></div>';
        var userType = $('input[name="zPUserType"]').val();
        if (($("#actualMasterString").text() !== "") || (userType === 'CSTeam')) {
            $('#attribute-materialSearch').append().html(materialHTML);
            console.log('mobile_materialSearch');
            materialSearch();

        }


        //mobile_hide_unwanted_arrow();
        materialAddItem();
    };
    var mobile_topCustomerList = function(customerDetails) {
        var custArr = customerDetails.split("##");
        var totalRecs = custArr.length;
        var fromIndex = 0;
        var toIndex = totalRecs;
        var dataSet = [];

        for (var i = fromIndex; i < toIndex; i++) {
            colArr = custArr[i].split("$$");
            var subDataSet;
            if (custArr.length > 2) {
                subDataSet = ['', colArr[2], colArr[0], colArr[1], colArr[3]];
            } else {
                subDataSet = ['', colArr[0], colArr[1], "", ""];
            }

            dataSet.push(subDataSet);
        }
        // console.log('mobile_topCustomerList', dataSet);
        var topCustomerList = $('#topCustomerList').DataTable({
            scrollY: "400px",
            scrollCollapse: true,
            data: dataSet,
            deferRender: true,
            order: [
                [1, 'asc']
            ],
            columnDefs: [{
                targets: 0,
                searchable: false,
                orderable: false,
                render: function(data, type, full, meta) {
                    // console.log('full', full[1]);
                    if (type === 'display') {
                       // data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2] + '">';
                       if(userCountry === 'PH'){
                        data = '<input type="radio" name="topCust" id= "topCust" value="' + full[1] + '">';
                        } else{
                            data = '<input type="radio" name="topCust" id= "topCust" value="' + full[2] + '">';
                        }
                    }

                    return data;
                }
            }],
            columns: [{
                    title: ""
                },
                {
                    title: "Sold to ID"
                },
                {
                    title: "Ship to ID"
                },
                {
                    title: "Customer Name"
                },
                {
                    title: "Address1"
                }
            ]

        });

        $("input[name='topCust']").on('click', function() {

            mobile_delete_line_item_func($(this).val());

            /*var selectedCustShipID = $(this).val();
            var currentCust = $('input[name="customerShipToId_t"]').val();
            console.log('selectedCustShipID',selectedCustShipID);
            console.log('currentCust',currentCust);

                $("#selectedCustomerDetail").val(selectedCustShipID);
                 $("#customerMasterString_t").val("");
                setTimeout(function(){
                        $("#save").click();
                        if($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length>0){
                            $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                        } else {
                            $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                        }
                }, 500);*/



        });
    };
    var mobile_customerSearch = function() {
        // Customer Search
        console.log('mobile_customerSearch func');
        var searchCustomerWrapper = '<div class="customer-search-holder"><div class="search-input-wrapper"><p>Search all customers</p><input type="text" id="searchCustomerInput" autocomplete="off" placeholder="Please enter minimum 3 character"></div><div class="search-cust_wrapper"><table id="searchCustomer" width="100%"></table></div><div class="top-cust_wrapper"><p>Top 10 Frequent customers</p><table id="topCustomerList" class="display" width="100%"></table></div></div>';

        $("#attribute-customerSearchHolder_HTML").html(searchCustomerWrapper);

        var zPUserType = $('#zPUserType').val();
        if (zPUserType === 'CSTeam') {
            searchCustomerList();

        } else {

            if ($('#customerMasterString_t').length) {
                var customerDetails = $("#customerMasterString_t").val();

                if (customerDetails === "") {
                    return true;
                } else {

                    var seachCustomer;
                    customer_master_string = customerDetails;
                    $("#customerMasterString_t").val("");

                    searchCustList(customerDetails, seachCustomer);
                    searchCustomerList(seachCustomer);

                    $('.search-cust_wrapper').hide();
                }

            }
        }
    }

    var mobile_itemCheckBonus = function(currentItem) {

        var currTr = currentItem.parent().parent().parent();
        var checked = currentItem.is(":checked");
        console.log('  ==== mobile_itemCheckBonus 11.11 ====>>>> checked', checked);
        var type = currTr.find('[name*=bonusType_l]').val();
        var type2 = currTr.find('td:nth-child(3)').find('input').val();
        console.log(type, type2);
        if (type2 === 'Comm') {
            console.log('comm clicked');
            var childTr = currTr.nextUntil("tr.comm").find('td:nth-child(2)').find('input[name*=_line_item_list]');
            if (checked === true) {
                childTr.prop('checked', true);
            } else {
                childTr.prop('checked', false);
            }
        } else if (type2 == 'Bonus') {

            var parentCheckbox = currTr.prevAll('tr.comm').eq(0).find('input[name*=_line_item_list]');

            if (type == 'System Bonus') { //commented by suresh
                //console.warn(type);
                /*if(checked===true){
                    parentCheckbox.prop('checked', true);
                } else{
                    parentCheckbox.prop('checked', false);
                }*/

            } else if (type == 'Additional Bonus') {
                console.warn(type);
            }
        }
    };


    function showLoadingDialog() {
        if ($('#loading-dialog').length < 1) {

            var strContent = '<div id="loading-dialog">';


            if (_loadingImage != '') {
                strContent += '<img src="' + _loadingImage + '" />';
            }
            strContent += '</div>';
            $(strContent).appendTo($('body'));
        } else {
            $('#loading-dialog').show();
        }


        if ($('#overlay').length < 1) {
            var overlayContent = '<div id="overlay"></div>';
            $(overlayContent).appendTo($('body'));
        } else {
            $('#overlay').show();
        }

        // var loadingDelay = parseInt('1000',10);
        // if(loadingDelay){
        // $('#loading-dialog').hide();
        // $('#overlay').hide();
        // if(timeOut){
        //     clearTimeout(timeOut);
        // }
        // timeOut = setTimeout(function(){
        //     $('#loading-dialog').show();
        //     $('#overlay').show();
        // },loadingDelay);
        // }

    }
    /*
        Start : 04 Nov 2017
        Task  : Hide check box in line item grid in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    function desktop_checkItemOnCart() {

        $('#edit_shopping_cart').on('click', function() {
            if ($('#line-item-grid tr').length > 0) {
                $('#line-item-grid tr:first-child').find('input[name="_line_item_list"]').prop("checked", true);
            }
        });

    }
    /*
        End : 04 Nov 2017
        Task  : Hide check box in line item grid in order page
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    function desktop_newlayout() {
        /* UI */
        /*
            Start : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            Checking if user access login page, then access function transform_loginpage()
        */
        if ($('.-out').length == 1 || $('#login').length == 1 || $('#login-form-wrap').length > 0) {
            transform_loginpage();
        } else {
            /*
                if user access commerce management / transaction / model configuration / report manager page.
            */
            console.log(pagetitle);
            if (pagetitle == 'commerce management' || pagetitle == 'transaction' || pagetitle == 'model configuration' || pagetitle == "report manager") {
                transform_mainlayout();
                /*
                    if user access commerce management page, element of id=jg-mainmenu-orders add class active, and call function transfrom_orderspage()
                */
                if (pagetitle == 'commerce management') {
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myorders').addClass('active');
                    transform_orderspage();
                } else if (pagetitle == 'transaction') {
                    /*
                        if user access transaction page, set element id of readonly_1_visualWorkflow has child image to vi_shoppping_cart_ready_active.png
                        then add class active to element id of jg-mainmenu-orders then, remove element of jg-mainmenu-neworder and jg-mainmenu-copyorder
                    */
                    $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_shoppping_cart_ready_active.png');
                    $('#jg-mainmenu-orders').addClass('active');
                    // $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-copyorder').parent().remove();
                    $('#jg-submenu-neworder').click(function(e) {
                        e.preventDefault();
                        var selectedSearchId = '-1';
                        var token = $("input[name=token]").val();
                        var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id=" + selectedSearchId;
                        window.location.href = url;
                        showLoadingDialog();
                    });
                    //set all materials tab to expand
                    localStorage.setItem('allMaterialsTabState', 'expand');

                    if (url.indexOf('copy_processing') != -1) {
                        /*
                            if position element of copy_processing in url is none, then add class jg-page-copyorder, then add class jg-page-copyorder
                            add text "Copy Order" to element id is jg-topbar-title, give text "Copy Order" to element title
                            and add class active to element id is jg-submenu-copyorder
                        */
                        console.log('copy order page.');
                        $('body').addClass('jg-page-copyorder');
                        $('#jg-topbar-title').text("Copy Order");
                        $('title').text("Copy Order");
                        // $('.sidebar-handle').click();
                        $('#jg-submenu-copyorder').addClass('active');
                    } else if ($('#readonly_1_visualWorkflow').length > 0) {
                        /*
                            get image src from child element image of element readonly_1_visualWorkflow
                        */
                        var imgsrc = $('#readonly_1_visualWorkflow img').attr('src');

                        if (imgsrc.indexOf('vi_order_created_active.png') != -1 || imgsrc.indexOf('vi_customer_selected_active.png') != -1) {
                            /*
                                if image src is vi_order_created_active.png or vi_customer_selected_active.png
                                add class jg-page-neworder to body element
                                set text "New Order" to title element
                                add class active to element jg-submenu-neworder
                            */
                            $('body').addClass('jg-page-neworder');
                            $('#jg-topbar-title').text("New Order");
                            $('title').text("New Order");

                            $('#jg-submenu-neworder').addClass('active');
                        } else if (imgsrc.indexOf('vi_shoppping_cart_ready_active.png')) {
                            /*
                                if image src is vi_shoppping_cart_ready_active.png then add class jg-page-shoppingcart to body element.
                                add text "Shopping Cart" to jg-topbar-title element
                                add text "Shopping Cart" to title element.
                            */
                            $('body').addClass('jg-page-shoppingcart');
                            $('#jg-topbar-title').text("Shopping Cart");
                            $('title').text("Shopping Cart");
                        } else {
                            /*
                                set text "(Page title hasn't been set for this page.)" to jg-topbar-title element
                            */
                            $('#jg-topbar-title').text("(Page title hasn't been set for this page.)");
                        }

                        /*
                            Start : 20 March 2017
                            Task  : Order in Submitted Status the Logo(to guide the shopping stages) is missing
                            Page  : Order Page
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Desktop

                            if order created set src image child from readonly_1_visualWorkflow element to 'vi_order_created_active.png'
                        */
                        $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_order_created_active.png');
                        //user click customer input form
                        /*
                            if user click element of customersNew_t then set readonly_1_visualWorkflow to vi_customer_selected_active.png
                        */
                        $("#customersNew_t").on("click", function() {
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_customer_selected_active.png');
                        });
                        /*
                            if element of readonly_1_status_t hasnt text "submitted" or customersNew_t val is not null then
                            set readonly_1_visualWorkflow to vi_customer_selected_active.png
                        */
                        if (($("#readonly_1_status_t").text().toLowerCase() != 'submitted') && $("#customersNew_t").val() != '') {
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_customer_selected_active.png');
                        }
                        /*
                            if user has add material, check it from table of line-item-grid has row with id emptyRow or not
                            set readonly_1_visualWorkflow to vi_shoppping_cart_ready_active.png
                        */
                        if ($("#line-item-grid tbody.line-item-grid-body").children('tr').attr('id') != 'emptyRow') {
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_shoppping_cart_ready_active.png');
                        }
                        /*
                            if element of readonly_1_status_t has text "submitted"
                            set readonly_1_visualWorkflow to vi_order_submitted_active.png
                        */
                        if ($("#readonly_1_status_t").text().toLowerCase() == 'submitted') {
                            $('#readonly_1_visualWorkflow img').attr('src', rootFolder + '/image/images/vi_order_submitted_active.png');
                        }



                        /*
                            End   : 20 March 2017
                            Task  : Order in Submitted Status the Logo(to guide the shopping stages) is missing
                            Page  : Order Page
                            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                            Layout : Desktop
                        */

                    }

                    transform_newcopypage();
                } else if (pagetitle == 'model configuration') {
                    /*
                        if user access model configuration page, add class active to jg-mainmenu-orders element.
                        remove jg-submenu-neworder and jg-submenu-copyorder element
                        and call function transform_modelconfig
                    */
                    $('#jg-mainmenu-orders').addClass('active');
                    // $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-neworder').click(function(e) {
                        e.preventDefault();
                        var selectedSearchId = '-1';
                        var token = $("input[name=token]").val();
                        var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id=" + selectedSearchId;
                        window.location.href = url;
                        showLoadingDialog();
                    });
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_modelconfig();
                } else if (pagetitle == "report manager") {
                    /*
                        if user access report manager page, add class jg-page-orders to body element.
                        add class active to jg-mainmenu-orders element, add class active to jg-submenu-myreports
                        remove jg-submenu-neworder and jg-submenu-copyorder element.
                        and call function transfrm_reportpage.
                    */
                    $('body').addClass('jg-page-orders');
                    $('#jg-mainmenu-orders').addClass('active');
                    $('#jg-submenu-myreports').addClass('active');
                    // $('#jg-submenu-neworder').parent().remove();
                    $('#jg-submenu-neworder').click(function(e) {
                        e.preventDefault();
                        var selectedSearchId = '-1';
                        var token = $("input[name=token]").val();
                        var url = "/commerce/buyside/document.jsp?token=" + token + "&process=oraclecpqo&formaction=create&search_id=" + selectedSearchId;
                        window.location.href = url;
                        showLoadingDialog();
                    });
                    $('#jg-submenu-copyorder').parent().remove();

                    transform_reportpage();
                }

                transform_newfooter();
            } else if (pagetitle == 'folders') {
                /*
                    if user access folders page then redirect to root url location of application.
                */
                window.location = 'https://' + window.location.host;
            } else if (pagetitle == 'my profile') {
                /*
                    Start : 23 March 2017
                    Task  : Hide user profile details by typeUser
                    Page  : my profile
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop

                    Checking if user access login page, then access function transform_loginpage()
                */
                var selectorRows = $("input[name='email']").closest('.bgcolor-form').next();
                var typeUser = $(selectorRows).children('.form-input').text().replace(/\s/g, '');
                if (typeUser.toLowerCase() != 'fullaccess') {
                    var listTable = $("table.dashed-table");
                    listTable.each(function(i, data) {
                        if (i != 0) {
                            $(data).hide();
                        } else {
                            $(data).children().children('tr.bgcolor-form').each(function(e, row) {
                                $(row).hide();
                                $("input[name='password']").closest('tr.bgcolor-form').show();
                            });
                        }
                    });
                }
                /*
                    End : 23 March 2017
                    Task  : Hide user profile details by typeUser.
                    Page  : my profile
                    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                    Layout : Desktop
                */
            }
        }

        // remove white overlay
        $('#jg-overlay').hide();
        /*
            End : -
            Task  : -
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
    }
    /*
        Start : 04 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    function desktop_rowBgColor() {
        $('body.jg-page-shoppingcart #line-item-grid tr.line-item').each(function() {

            var order_type = $(this).find('td:nth-child(3)').find('input').val();
            console.log(order_type);

            if (order_type == 'Bonus') {
                $(this).css('background-color', '#eee');
            } else if (order_type == 'Comm') {
                $(this).css('background-color', '#fff');
            }


        });
    }
    /*
        End : 04 Nov 2017
        Task  : Highlight the commercial items in white color and bonus items in grey color in order page.
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    function transform_loginpage() {
        var newlayout = $("<div class='jg-box-login'>")
            .append($("<div class='jg-box-login-inner'>")
                .append($("<img src='" + rootFolder + "/image/images/ezrx.png' class='jg-login-logo' />"))
                .append($("<span class='jg-login-welcome'>Welcome</span>"))
            )
            .append($("<div class='jg-box-login-bottom'>")
                .append($("<img src='" + rootFolder + "/image/images/zuellig.png' class='jg-login-logo' />"))
            )

            .prependTo('body');

        $('form[name=loginform]').appendTo('.jg-box-login-inner');
        $('input[name=username]').attr("placeholder", "Username");
        $('input[name=psword]').attr("placeholder", "Password");
        $('#login-form-head').remove();
        $('.login-links').insertBefore($('.login-button'));

        $('.extra-panes, .main-pane, #footer').hide();
    }

    function transform_mainlayout() {
        // Add new layout
        /*
            Start : 19 March 2017
            Task  : Edit left side menu design.
            Page  : All Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            if user login from zuelligpharma.com then show report menu page else dont show report menu.
        */
        if (/@zuelligpharma.com\s*$/.test(_BM_USER_LOGIN)) {
            var newlayout = $("<div class='jg-box-mainlayout'>")
                .append($("<div class='jg-box-sidenav'></div>")
                    .append($("<ul class='jg-list-mainmenu'>")
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile' data-description='Profile' >Profile</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home' data-description='Home' >Home</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports' class='jg-linkbtn my_report' data-description='My Reports' >My Reports</a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders' class='jg-linkbtn my_order' data-description='All Orders' >All Orders</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-neworder' class='jg-linkbtn new_order' data-description='New Order' >New Order</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-copyorder' class='jg-linkbtn copy_order' data-description='Copy Order' >Copy Order</a></li>"))
                        /*.append($("<li class='jg-item-mainmenu'><a id='jg-mainmenu-arrow' class='jg-linkbtn arrow'></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        */
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings' data-description='Settings' >Settings</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout' data-description='Logout' >Logout</a></li>"))
                    )
                )
                .append($("<div class='jg-box-rightpanel'></div>")
                    // .append($("<div class='jg-box-submenu'></div>"))
                    .append($("<div class='jg-box-mainarea'>")
                        .append($("<div class='jg-box-topbar'></div>")
                            .append($("<h2 id='jg-topbar-title'></h2>"))
                        )
                        .append($("<div class='jg-box-toolbar'></div>")
                            .append($("<ul class='jg-list-tool'>"))
                            .append($("<ul class='jg-list-tool-right'>"))
                        )
                        .append($("<div class='jg-box-maincontent'></div>"))
                    )
                )
                .prependTo('body');
        } else {
            var newlayout = $("<div class='jg-box-mainlayout'>")
                .append($("<div class='jg-box-sidenav'></div>")
                    .append($("<ul class='jg-list-mainmenu'>")
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile' data-description='Profile' >Profile</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home' data-description='Home' >Home</a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders' class='jg-linkbtn my_order' data-description='All Orders' >All Orders</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-neworder' class='jg-linkbtn new_order' data-description='New Order' >New Order</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='#' id='jg-submenu-copyorder' class='jg-linkbtn copy_order' data-description='Copy Order' >Copy Order</a></li>"))
                        /*.append($("<li class='jg-item-mainmenu'><a id='jg-mainmenu-arrow' class='jg-linkbtn arrow'></a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        */
                        .append($("<li class='jg-item-mainmenu jg-separator'></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings' data-description='Settings' >Settings</a></li>"))
                        .append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout' data-description='Logout' >Logout</a></li>"))
                    )
                )
                .append($("<div class='jg-box-rightpanel'></div>")
                    // .append($("<div class='jg-box-submenu'></div>"))
                    .append($("<div class='jg-box-mainarea'>")
                        .append($("<div class='jg-box-topbar'></div>")
                            .append($("<h2 id='jg-topbar-title'></h2>"))
                        )
                        .append($("<div class='jg-box-toolbar'></div>")
                            .append($("<ul class='jg-list-tool'>"))
                            .append($("<ul class='jg-list-tool-right'>"))
                        )
                        .append($("<div class='jg-box-maincontent'></div>"))
                    )
                )
                .prependTo('body');
        }

        /*  add description on hover menu   */
        $("li.jg-item-mainmenu:not('.jg-separator')").each(function(i, data) {
            var button = $(data).children();
            var description = $(button).data('description');
            $(this).mouseenter(function() {
                var spanDescription = '<div>' + description + '</div>';
                $('#myMenuModal').css({
                    "background": "#FFFFFF",
                    "box-shadow": "0 2px 4px 0 rgba(0,0,0,0.30)",
                    "border-radius": "4px",
                    "width": "100px",
                    "text-align": "center",
                });
                $('#myMenuModal').addClass("hover-modal-content").html(spanDescription);
                $('#myMenuModal').css("display", "block");
                $(this).mouseleave(function() {
                    $('#myMenuModal').css("display", "none");
                });
            });
        });

        /*
            Show modal Description of left side menu.
        */
        $("li.jg-item-mainmenu:not('.jg-separator')").mousemove(function(e) {
            $('#myMenuModal').css('top', e.pageY - $(document).scrollTop() + 'px').css('left', e.pageX - $(document).scrollLeft() + 50 + 'px');
        })

        /*
            End   : 19 March 2017
            Task  : Edit left side menu design.
            Page  : All Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // mainmenu status
        var page = $('.commerce-sidebar-current').text().toLowerCase();

        // adjust rightpanel to submenu width
        // $('.jg-box-mainarea').css('paddingLeft', $('.jg-box-submenu').outerWidth());

        // remove table padding
        $('.jg-box-maincontent table').attr('cellspacing', '0').attr('cellpadding', '0');

        // header & footer
        $('.header-bordercolor, .commerce-bordercolor, #footer').hide();

        // errors box
        var errorsbox = $("<div class='column-layout clearfix'>").insertAfter($('#attr_wrapper_1_visualWorkflow').closest('.column-layout'));
        $('#actionErrorMessagesBox').appendTo(errorsbox);

        if ($('#actionErrorMessagesBox ul li').text() !== "") {
            $('#actionErrorMessagesBox').show();
        }

        // modal box
        $('<div id="myModal" >').appendTo('.jg-box-mainlayout');
        $('<div id="myMenuModal" >').appendTo('.jg-box-mainlayout');

        //check "No pending configuration"
        $.ajax({
            url: "https://" + instanceName + ".bigmachines.com/commerce/buyside/config_drafts_list.jsp",
            type: 'GET',
            data: "_bm_trail_refresh_=true",
            dataType: "html",
            success: function(respData) {
                var n = respData.indexOf("No&#32;pending&#32;configurations");
                if (n == -1) {
                    //If there is no text "No pending configurations"
                    //console.log("show");
                    $(".jg-linkbtn.shoppingcart").css("display", "block");
                } else {
                    //If text "No pending configurations" is found
                    //console.log("hide");
                    $(".jg-linkbtn.shoppingcart").css("display", "none");
                }
            },
            error: function() {
                console.log("Cannot get data of pending configuration");
            }
        });




        /* EVENTS */

        //always hide menu
        // $('.jg-box-submenu').css('paddingLeft', '-100px');
        // $('.jg-box-submenu').show();

        $('#jg-submenu-neworder').click(function(e) {
            e.preventDefault();
            $('#new_order').click();
            showLoadingDialog();

            // newTransaction();
        });

        // $('.jg-box-toolbar').toggle();
        // $('.jg-box-mainarea').css('paddingLeft', '150px');

        /*var status_hover_menu = true;

        var show_menu = function(){
            $('.jg-box-submenu').fadeIn();
            // $('.jg-box-submenu').animate({paddingLeft: '150px'}, 2000);
            // $('.jg-box-mainarea').css('paddingLeft', '150px');
            $('.jg-box-mainarea').animate({paddingLeft: '150px'},1500);
            // $('.jg-box-toolbar').slideDown(1500);

        }

        var hide_menu = function(){
            $('.jg-box-submenu').fadeOut();
            // $('.jg-box-submenu').animate({paddingLeft: '0px'}, 2000);
            // $('.jg-box-mainarea').css('paddingLeft', '0');
            $('.jg-box-mainarea').animate({paddingLeft: '0'},1500);
            $('.jg-box-toolbar').slideUp(1500);
        }*/

        /*var show_manage_folder = function(){

        }

        var hide_manage_folder = function(){

        }*/

        //show menu on hover
        /*$('#jg-mainmenu-orders').mouseenter(function(e) {
            show_menu();
        });*/
        //hide menu when mouse leave
        /*$('.jg-box-maincontent').mouseenter(function(e) {
            if(status_hover_menu){
                hide_menu();
            }
        });*/

        /*function AnimateRotate(id_element,d){
            var first = 180;
            if(d == 180){
                first = 0;
            }
            $({deg: first}).animate({deg: d}, {
                step: function(now, fx){
                    $("#"+id_element).css({
                         transform: "rotate(" + now + "deg)"
                    });
                }
            });
        }

        var showOrHide = function(condition){
            if(condition){
                //show
                $('.jg-box-submenu').animate({left: "50px"},1000);
                AnimateRotate('jg-mainmenu-arrow', 360);

            }else{
                //hide
                $('.jg-box-submenu').animate({left: "-150px"},1000);
                AnimateRotate('jg-mainmenu-arrow', 180);
            }
        }
        var hide = false;
        $('#jg-mainmenu-orders').bind('click', function(e) {
            e.preventDefault();
            hide = !hide;
            showOrHide(hide);

        });*/
    }

    function transform_newfooter() {
        // new footer
        $('.jg-box-mainarea').append($("<div class='jg-box-footer'>")
            .append($("<img src='" + rootFolder + "/image/images/dk-img-footer.png' class='jg-img-footer' />"))
        );
    }

    function tranform_ordersubmenu() {
        // orders submenu
        if (/@zuelligpharma.com\s*$/.test(_BM_USER_LOGIN)) {
            $('.jg-box-submenu')
                .append($("<img src='" + rootFolder + "/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
                .append($("<ul class='jg-list-submenu'>")
                    .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
                    .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports'>My Reports</a></li>"))
                    .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
                    .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
                    // .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
                );
        } else {
            $('.jg-box-submenu')
                .append($("<img src='" + rootFolder + "/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
                .append($("<ul class='jg-list-submenu'>")
                    .append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
                    .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
                    .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
                    // .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
                );
        }

        // new order
        $('#jg-submenu-neworder').click(function(e) {
            e.preventDefault();
            $('#new_order').click();
            //newTransaction();
        });
    }

    function transform_orderspage() {
        // toolbar
        /*
            add menu on top commerce management.
        */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool'>")
                /* .append($("<input type='text' class='jg-txt-search' />")) */
                .append($("<a href='#' id='jg-tool-search' class='jg-linkbtn search'>Search</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            .append($("<li class='jg-item-tool'>")
                .append($("<select id='jg-tool-select' class='jg-tool-select'>")
                    // .append($("<option>View</option>"))
                )
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-manage' class='jg-linkbtn manage'>Manage</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-refine' class='jg-linkbtn refine'>Refine</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            /*.append($("<li class='jg-item-tool'>")
                .append($("<a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' class='jg-linkbtn jg-tool-refresh'></a>"))
            );*/
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-default' class='jg-linkbtn default'>Default</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-fav' class='jg-linkbtn fav'>Favorite</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-trash' class='jg-linkbtn trash'>Trash</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-edit' class='jg-linkbtn edit'>Edit</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-shoppingcart' style='display:none;' class='jg-linkbtn shoppingcart'>Incomplete Order</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='/commerce/buyside/document.jsp?token=" + _BM_CSRF_TOKEN + "&process=oraclecpqo&formaction=create&search_id=-1' id='jg-tool-folder-neworder' class='jg-linkbtn new_order'>New Order</a>"))
            )
			.append($("<li class='jg-item-tool'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders' class='jg-linkbtn my_order' data-description='All Orders' >All Orders</a></li>"))
            .append($("<li class='jg-item-tool'><a href='#' id='jg-submenu-copyorder' class='jg-linkbtn new_order'>Copy Order</a></li>"));

        // dropdown
        $('#jg-tool-select').html($('select[name=new_search_id]').html());
        $('#jg-tool-select').change(function() {
            var selectval = $(this).val();
            $('select[name=new_search_id]').val(selectval);

            $('a.list-field')[0].click();
        });

        /*
            Start : 8 March 2017
            Task  : Create Management Folder
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this function for check create name folder isn't default or trash.
        */
        function addFolder(form) {
            if (form.name.value == "[Default]" || form.name.value == "[Trash]") {
                bmErrorString += "[Default] and [Trash] folders already exist";
            }
            bmCheckString(form.name, "Folder Name");
        }
        /*
            this function for check rename folder isn't default or trash.
        */
        function renameFolder(form) {
            for (var i = 0; i < form.id.length; i++) {
                if (form.id.options[i].selected) {
                    if (form.id.options[i].text == "[Default]" || form.id.options[i].text == "[Trash]") {
                        bmErrorString += "[Default] and [Trash] folders are mandatory and cannot be renamed";
                    }
                }
            }
            if (form.name.value == "[Default]" || form.name.value == "[Trash]") {
                bmErrorString += "[Default] and [Trash] folders already exist";
            }

            bmCheckString(form.name, "New Name");
        }
        /*
            this function for check delete folder name isnt default or trash.
        */
        function deleteFolder(form) {
            for (var i = 0; i < form.id.length; i++) {
                if (form.id.options[i].selected) {
                    if (form.id.options[i].text == "[Default]" || form.id.options[i].text == "[Trash]") {
                        bmErrorString += "[Default] and [Trash] folders are mandatory and cannot be deleted";
                        return false;
                    }
                    if (form.id.options[i].value == form.folder_id.value) {
                        form.folder_id.value = -1;
                    }
                }
            }
        }
        /*
            fetch list of folder from CPQ and give some icon.
            when the folder isnt default / trash / favourites then add some function to manage folder
            add button rename, remove, save and close.
        */
        var listFolder = [];
        var list_folder = "<table style='background-color:#0C727A;' >";
        var optionsFolder = "";
        $('#dropzone .dropTarget td[title]').each(function(i, target) {
            var nama_folder = $(target).attr('title').replace(/[^\w\s]/gi, '');
            var id_folder = $(target).parent().attr("id");
            var button_folder = "<tr><td>";
            var link_folder = $(target).prev().find('a').attr('href');
            if (nama_folder.toLowerCase() == "default") {
                /* add icon and name folder default */
                button_folder += "<a href='" + link_folder + "' id='jg-tool-folder-default' class='jg-linkbtn list-folder default'>" + nama_folder + "</a>";
                $("#jg-tool-folder-default").attr("href", link_folder);
            } else if (nama_folder.toLowerCase() == "trash") {
                /* add icon and name folder trash */
                button_folder += "<a href='" + link_folder + "' id='jg-tool-folder-trash' class='jg-linkbtn list-folder trash'>" + nama_folder + "</a>";
                $("#jg-tool-folder-trash").attr("href", link_folder);
            } else if (nama_folder.toLowerCase() == "favourites") {
                /* add icon and name favourites */
                button_folder += "<a href='" + link_folder + "' id='jg-tool-folder-fav' class='jg-linkbtn list-folder fav'>" + nama_folder + "</a>";
                $("#jg-tool-folder-fav").attr("href", link_folder);
            } else {
                /* add icon and name folder other name */
                button_folder += "<a href='" + link_folder + "' id='display_folder_" + id_folder + "' class='jg-linkbtn list-folder default'>" + nama_folder + "</a><input id='input_" + id_folder + "' name='name' class='input-folder' style='display:none;' />";
                button_folder_toolbar = "<li class='jg-item-tool' ><a href='" + link_folder + "' class='jg-linkbtn default'>" + nama_folder + "</a></li>";
                $(".jg-list-tool").append($(button_folder_toolbar));
                optionsFolder += "<option value=" + id_folder + " ></option>";
                button_folder += "</td><td style='padding-top:30px;' >";
                /*
                    add button rename, remove, save for management folder.
                */
                button_folder += "<a href='#' class='tmp-folder tmp-folder-rename' id='btn_rename_" + id_folder + "' data-id='" + id_folder + "' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-remove' id='btn_remove_" + id_folder + "' data-id='" + id_folder + "' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-save' style='display:none;' id='btn_save_" + id_folder + "' data-id='" + id_folder + "' ></a>";
                button_folder += "<a href='#' class='tmp-folder tmp-folder-close' style='display:none;' id='btn_close_" + id_folder + "' data-id='" + id_folder + "' ></a>";
                button_folder += "</td></tr>";
            }
            list_folder += button_folder;
            listFolder.push(nama_folder);
        });
        list_folder += "</table>";
        /* get folder id */
        var bm_cm_process_id_val = $("input[name='bm_cm_process_id']").val();
        var folder_id_val = $("input[name='folder_id']").val();
        $('.jg-list-tool-right')
            .append($("<li class='jg-item-tool'>")
                // .append($("<a href='#' id='browse_folder' class='jg-linkbtn browse'>Browse</a>"))
                .append($("<div class='jg-box-foldermenu'>" +
                    "<p class='jg-linkbtn' >Create New Folder<br/><br/>" +
                    "Folder Name : </p>" +
                    "<form name='templateFolder1' method='post' action='admin_folder.jsp' >" +
                    "<input type='hidden' name='formaction' value='addCmFolder' >" +
                    "<input type='hidden' name='bm_cm_process_id' value='" + bm_cm_process_id_val + "' >" +
                    "<input type='hidden' name='folder_id' value='" + folder_id_val + "' >" +
                    "<input type='text' style='padding:5px;width:83%;margin-bottom:10px;' name='name' size='20' maxlength='30' >" +
                    "<button style='padding:5px;border-radius:20px;width:70px;height:30px;color:white;background-color:#0C727A;border:2px solid white;margin-left:160px;' onclick='javascript:bmSubmitForm('admin_folder.jsp', document.templateFolder1, addFolder);bmCancelBubble(event)' >Create</button>" +
                    "</form>" +
                    "<form name='templateFolder2' method='post' action='admin_folder.jsp' >" +
                    "<input type='hidden' name='formaction' value='addCmFolder' >" +
                    "<input type='hidden' name='bm_cm_process_id' value='" + bm_cm_process_id_val + "' >" +
                    "<input type='hidden' name='folder_id' value='" + folder_id_val + "' >" +
                    "<input type='hidden' name='name' id='hidden_name_folder2' >" +
                    "<select name='id' id='folder' style='display:none;' >" +
                    optionsFolder +
                    "</select>" +
                    "</form>" +
                    "<hr/>" + list_folder +
                    "</div>"))
            );
        /* listen folder remove clicked, set option id folder value, and give alert if continue to delete. */
        $(".tmp-folder-remove").on("click", function() {
            var id = $(this).data('id');
            $("#folder option[value='" + id + "']").attr("selected", "");
            bmSubmitFormConfirm('Deleting this folder will send all of its contents to the trash.  Do you wish to continue?', 'admin_folder.jsp', document.templateFolder2, deleteFolder, 'deleteCmFolder');
            bmCancelBubble(event);
        });
        /* listen folder rename show form input name folder, hide icon and folder name */
        var isAnotherRenameToo = false;
        $(".tmp-folder-rename").on("click", function() {
            if (!isAnotherRenameToo) {
                isAnotherRenameToo = true;
                var id = $(this).data('id');
                $("#folder option[value='" + id + "']").attr("selected", "");
                //hide element
                $("#display_folder_" + id).hide();
                $("#btn_rename_" + id).hide();
                $("#btn_remove_" + id).hide();
                //show element
                $("#input_" + id).show();
                $("#btn_save_" + id).show();
                $("#btn_close_" + id).show();
            } else {
                alert("Please save / close another rename");
            }
        });

        /* listen folder rename close, hide form input name folder, show icon and folder name */

        $(".tmp-folder-close").on("click", function() {
            isAnotherRenameToo = false;
            var id = $(this).data('id');
            //hide element
            $("#input_" + id).hide();
            $("#btn_save_" + id).hide();
            $("#btn_close_" + id).hide();
            //show element
            $("#display_folder_" + id).show();
            $("#btn_rename_" + id).show();
            $("#btn_remove_" + id).show();
        });

        /* listen folder rename save, hide form input name folder, show icon and folder name and call function save folder name. */

        $(".tmp-folder-save").on("click", function() {
            isAnotherRenameToo = false;
            var id = $(this).data('id');
            $("#hidden_name_folder2").val($("#input_" + id).val());
            bmSubmitForm('admin_folder.jsp', document.templateFolder2, renameFolder);
            bmCancelBubble(event);
            //hide element
            $("#input_" + id).hide();
            $("#btn_save_" + id).hide();
            $("#btn_close_" + id).hide();
            //show element
            $("#display_folder_" + id).show();
            $("#btn_rename_" + id).show();
            $("#btn_remove_" + id).show();
        });

        $(".jg-box-foldermenu").css("right", "-400px");

        //show or hide menu folder on click
        var hide = false;
        $("#jg-tool-folder-edit").on("click", function() {
            if (!hide) {
                hide = true;
                $('.jg-box-foldermenu').animate({
                    right: '0px'
                }, 1000);
            } else {
                hide = false;
                $('.jg-box-foldermenu').animate({
                    right: '-400px'
                }, 1000);
            }

        });
        /*
            End   : 8 March 2017
            Task  : Create Management Folder
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // page title
        pagetitle = $('#cm-manager-content').closest('table').prev().find('td').text().trim();
        $('#jg-topbar-title').text(pagetitle);

        // content
        $('form[name=bmDocForm]').appendTo('.jg-box-maincontent');

        // tweaks original
        $('.jg-box-maincontent .tabular-data-container > br').eq(0).remove();
        $('.jg-box-maincontent .tabular-data-container > table').eq(0).hide();
        $('.jg-box-maincontent .tabular-data-container > table').eq(1).hide();
        $('.jg-box-maincontent .tabular-data-container > table').eq(5).hide();
        $('#move').closest('table').parent().css('paddingBottom', '4px');


        /* EVENTS */
        // search
        /* custom search button */
        $('#jg-tool-search').click(function(e) {
            e.preventDefault();

            $('#search').click();
        });

        // manage
        /* custom search and refine list order. */
        $('.commerce-sidebar-item').each(function(i, sbitem) {
            if ($(sbitem).text().toLowerCase().indexOf('manage') != -1) {
                $('#jg-tool-manage').attr('href', $(sbitem).attr('href'));
            } else if ($(sbitem).text().toLowerCase().indexOf('refine') != -1) {
                $('#jg-tool-refine').attr('href', $(sbitem).attr('href'));
            }
        });

        // folders


        /*$('#dropzone .dropTarget td[title]').each(function(i, target) {
            if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
                $('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
                $('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
            }
            else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
                $('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
            }
        });*/

        // custome edit folder
        /*$('#jg-tool-folder-edit').click(function(e) {
            e.preventDefault();

            // $('#edit').click();
        });*/

        // custom button copy order
        $('#jg-submenu-copyorder').click(function(e) {
            e.preventDefault();
			console.log("%%%%%%%%111111%%%%%");
            $('#copy_order').click();
        });
        $("body").on("click touchend","#jg-submenu-copyorder",function(e){
            e.preventDefault();
			console.log("%%%%%%%%%%%%%");

            $('#copy_order').trigger("click");
        });
        /* custom button export */
        $('#jg-submenu-export').click(function(e) {
            e.preventDefault();

            $('#export').click();
        });
    }

    function transform_newcopypage() {
        // toolbar
        // $('.jg-box-toolbar').addClass('invert');
        /*
         $('.jg-list-tool')
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-update' class='jg-linkbtn update'>Update</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-startover' class='jg-linkbtn startover'>Start Over</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-createtrans' class='jg-linkbtn createtrans'>Create Transaction</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-addtofav' class='jg-linkbtn addtofav'>Add to Favorite</a>"))
         )
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-pipelineviewer' class='jg-linkbtn pipelineviewer'>Pipeline Viewer</a>"))
         )
         .append($("<li class='jg-item-tool jg-separator'>"))

         if ($('#save').length > 0) {
         $('.jg-list-tool').append($("<li class='jg-item-tool'>")
         .append($("<button id='btn-neworder-save' class='jg-btn'>Save</button>"))
         )
         }

         // refresh button
         $('.jg-list-tool-right')
         .append($("<li class='jg-item-tool jg-separator'>"))
         .append($("<li class='jg-item-tool'>")
         .append($("<a href='#' id='jg-tool-troubleshooting' class='jg-linkbtn troubleshooting'>Troubleshooting</a>"))
         )
         */
        /* hide class jg-box-toolbar */
        $('.jg-box-toolbar').hide();
        /* move element document-form to class jg-box-maincontent */
        $('#document-form').appendTo('.jg-box-maincontent');

        // tweak originals
        // $('#sticky-actions').hide();

        /* styling on add material */
        $('select[name=orderType_t]').css('width', 'auto');
        $('#field_wrapper_1_visualWorkflow').css('paddingLeft', '0');
        $('#add_material').closest('.column').prev().remove();
        $('#add_material').closest('.column').css('width', 'auto');
        $('#add_material').closest('.form-element').css('paddingLeft', '6px');
        $('#add_material').closest('.form-element').prev().remove();

        // styling on cust & address area
        var newcontainer = $("<div class='column label-left' style='width:70%'>");
        var custcol = $("<div class='jg-order-box-cust'>").appendTo(newcontainer);
        var addresscol = $("<div class='jg-order-box-address'>").appendTo(newcontainer);
        var custleft = $('#attr_wrapper_1_customersNew_t').closest('.column');
        var rowbox = custleft.closest('.column-layout');
        var custright = $(custleft).next();
        custleft.css('width', '50%');
        custright.css('width', '50%');
        $('label[for=customerId__t]').css('width', '135px');
        $('#field_wrapper_1_customerId__t').css('paddingLeft', '135px');
        rowbox.append(newcontainer);
        custcol.append($('#attr_wrapper_1_customersNew_t'));
        addresscol.append(custleft).append(custright);
        $('#attr_wrapper_1_shipToAddress_html_t').css('marginTop', '10px').prependTo('.jg-order-box-address');
        custleft.find('.attr-spacer').remove();
        custright.find('.attr-spacer').remove();

        // styling on Summary area
        $('#content36594406 .form-element').css('paddingLeft', '200px');
        $('#custom_transaction_manager').closest('.form-element').css('paddingLeft', '0');
        $('#custom_transaction_manager').closest('.form-element').prev().remove();
        $('#custom_transaction_manager').closest('.form-item').css('margin', '10px 0');

        var totalcol = $('#attr_wrapper_1_totalContractValue_t').closest('.column');
        totalcol.css('width', '50%');
        totalcol.prev().prev().remove();
        var custpocol = totalcol.prev();
        custpocol.css('width', '50%').removeClass('spacer-column');
        custpocol.find('.attr-spacer').remove();
        $('#attr_wrapper_1_customerPORef_t').appendTo(custpocol);
        $('label[for=customerPORef_t]').css('width', 'auto');
        $('label[for=orderingRequestNoMoreThan90Characters_t]').addClass('blocklabel').css('width', 'auto');
        $('#customerPORef_t').closest('.text-wrapper').css('width', 'auto');
        $('#field_wrapper_1_customerPORef_t').css('width', '50%').css('float', 'left').css('paddingLeft', '0').css('marginLeft', '5px');
        $('#field_wrapper_1_orderingRequestNoMoreThan90Characters_t').css('paddingLeft', '0');
        $('#1_totalContractValue_t').closest('.form-element').addClass('inlinevalue');
        $('#attr_wrapper_1_totalContractValue_t .form-label').css('width', 'auto');
        $('#field_wrapper_1_note_t').css('paddingLeft', '60px');
        $('#attr_wrapper_1_note_t').parent().css('width', 'auto');
        $('#content36267614 .column-layout .spacer-column').remove();
        $('label[for=customerPORef_t], label[for=totalContractValue_t]').addClass('jg-textheader');
        $('label[for=importMaterials]').addClass('jg-buttonheader');
        $('#_file_importMaterials').closest('.form-element').css('paddingLeft', '120px');

        // page buttons
        var buttonbox = $("<div class='jg-box-buttons'>")
            // .append($("<button id='jg-btn-addtofav' class='jg-btn'>Add to Favorite</button>"))
            .append($("<button id='jg-btn-pipelineviewer' class='jg-btn'>Pipeline Viewer</button>"))
            .appendTo('.jg-box-maincontent');

        adjust_tooltip();

        $("#pipeline_viewer").closest('.button-middle').hide();

        /*
            Start : 22 March 2017
            Task  : Need to Move this Field above customer field. We kept the Customer Search Field above the Customer in the design layout. Some CSS changes Pushing the field down.
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

        */
        /* clone class jg-order-box-cust for the result of moving element customerSearchFilter  */
        $('.jg-order-box-cust').parent().prepend($('.jg-order-box-cust').clone().html($("select[name='customerSearchFilter']").closest('div.column')));

        /* remove class clearfix for stable styling */
        $("#attr_wrapper_1_owner_t").parent().parent().removeClass('clearfix');

        /* hide element of class spacer-column */
        $($("#attr_wrapper_1_customerShipToId_t").parent().siblings('.spacer-column')).hide();
        /*var kolom_customer_sold = $("#attr_wrapper_1_customerSoldToId_t").parent();
        $( kolom_customer_sold ).css({
            "position" : "absolute",
            "margin-top" : "35px",
        });*/
        /* sales rep name dll */
        // $("#attr_wrapper_1_owner_t").css("width","35%");

        /*$("select[name='orderType_t']").closest('.column-layout').removeClass('clearfix').append( $("#attr_wrapper_1_customerSoldToId_t").parent() );
        $( $("#attr_wrapper_1_customerSoldToId_t").parent().parent() ).next().removeClass('clearfix');
        $("#panel_36350863").css({ "padding-top":"150px" });*/
        /*
            End   : 22 March 2017
            Task  : Need to Move this Field above customer field. We kept the Customer Search Field above the Customer in the design layout. Some CSS changes Pushing the field down.
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 6-4-2017
            Task  : address is not completely shown
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        /* add styling wordwrap on address coloumn */
        $("div[id*='shipTo_t_address']").each(function(e, dataAddress) {
            if (/attr_wrapper/i.test($(dataAddress).attr('id'))) {
                $("#" + $(dataAddress).attr('id')).find('.readonly-wrapper').css({
                    "white-space": "normal"
                })
            }
        });
        /* add styling wordwrap on address coloumn */
        $("div[id*='customerAddressLine']").each(function(e, dataAddress) {
            if (/attr_wrapper/i.test($(dataAddress).attr('id'))) {
                $("#" + $(dataAddress).attr('id')).find('.readonly-wrapper').css({
                    "white-space": "normal"
                })
            }
        });
        // remove spacer in Draft Ship to address, Order Details, and Customer Search
        $("#attr_wrapper_1_customerSearchHolder_HTML").parent().find('.attr-spacer').remove();
        $("#attr_wrapper_1_shipToAddress_html_t").parent().find('.attr-spacer').remove();
        /*
            End   : 6-4-2017
            Task  : address is not completely shown
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 11-3-2017
            Task  : if isPriceOverride give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        // data with color red
        // find column with id is isPriceOverride when the value is True then give red color
        $("td[id*='isPriceOverride']").each(function(i, data) {
            if ($(data).text() !== "False") {
                var line = $(data).parent();
                var unitPrice = $(line).find("td[id*='unitPrice']")
                var remove_attr = $(unitPrice).attr("id").split("attr_wrapper");
                var object_span = $("#readonly" + remove_attr[1]);
                object_span.css("color", "red");
            }
        });
        /*
            Start : 13-3-2017
            Task  : if Type Bonus Change row collor with grey #EEE
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // find column with id is refNo_text when the value is bonus then give background color row with #EEE
        $("td[id*='refNO_text']").each(function(i, data) {
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly" + refNo[1]);
            // console.log(object_span.text());
            if (object_span.text().toLowerCase() == "bonus") {
                // console.log("bonus");
                $(this).parent().css("background-color", "#EEE").removeClass('child-line-item');
            }
        });
        /*
            End   : 13-3-2017
            Task  : if Type Bonus Change row collor with grey #EEE
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 8-3-2017
            Task  : if Type Bonus Overide Flag is true then give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        /* find column with id is bonusOverideFlag_l when the value is True then give red color on text  */
        $("td[id*='bonusOverideFlag_l']").each(function(i, data) {
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly" + refNo[1]);
            if (object_span.text() == "True") {
                var line = $(this).parent();
                var qty = $(line).find("td[id*='qty_l']");
                var remove_attr = $(qty).attr("id").split("attr_wrapper");
                var qty_span = $("#readonly" + remove_attr[1]);
                qty_span.css("color", "red");
            }
        });
        /*
            End   : 8-3-2017
            Task  : if Type Bonus Overide Flag is true then give red color
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 21 March 2017
            Task  : - Highlight "In Stock" No In commerce to Red and Qty to Red for Commercial Material Line (Comm)
                    - Highlight "In Stock" No In commerce to Red for Bonus Material Line (Bonus).
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        /* find column with id is inStock when value is no then give red color text inStock, then check type of material, if comm then give text red color on qty coloumn */
        $("td[id*='inStock']").each(function(i, data) {
            var refNo = $(this).attr("id").split("attr_wrapper");
            var object_span = $("#readonly" + refNo[1]);
            if (object_span.text().toLowerCase() == 'no') {
                // object_span.addClass('sc-no-stock');
                object_span.css("color", "red");
                var line = $(this).parent();
                var type = $(line).find("td[id*='refNO_text']");
                var remove_attr = $(type).attr("id").split("attr_wrapper");
                var type_span = $("#readonly" + remove_attr[1]);
                if (type_span.text().toLowerCase() == 'comm') {
                    var qty = $(line).find("td[id*='qty_l']");
                    var remove_attr = $(qty).attr("id").split("attr_wrapper");
                    var qty_span = $("#readonly" + remove_attr[1]);
                    qty_span.css("color", "red");
                }
            }
        });

        /*
            End   : 21 March 2017
            Task  : - Highlight "In Stock" No In commerce to Red and Qty to Red for Commercial Material Line (Comm)
                    - Highlight "In Stock" No In commerce to Red for Bonus Material Line (Bonus).
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 20 March 2017
            Task  : Bonus Override Flag Should be hidden using CSS
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        var bonusOverride = 0;
        /* find coloumn th which had bonus override then give class rule-hide and set temp id bonusOverride */
        $("th").each(function(i, data) {

            if ($(data).children().text().toLowerCase() == "bonus overide") {
                bonusOverride = $(data).data("colid");
                $(data).addClass("rule-hide");
            }

            if (bonusOverride != 0) {
                if ($(data).data("colid") == bonusOverride) {
                    $(data).addClass('rule-hide');
                }
            }

        });

        /* find coloumn which had id bonusOverride and add class rule-hide */
        $("col").each(function(i, data) {
            if (this.id == bonusOverride) {
                $(this).addClass('rule-hide');
            }
        });
        /* find coloumn has id bonusOverride and add class rule-hide */
        $("td[id*='" + bonusOverride + "']").each(function(i, data) {
            $(this).addClass('rule-hide');
        });

        /*
            End : 20 March 2017
            Task  : Bonus Override Flag Should be hidden using CSS
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // global_searchCustomer('desktop');

        /* EVENTS */
        /* custom button for add to fav */
        $('#jg-tool-addtofav, #jg-btn-addtofav').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        /* custome button for pipeline viewer */
        $('#jg-tool-pipelineviewer, #jg-btn-pipelineviewer').click(function(e) {
            e.preventDefault();

            $('#').click();
        });

        $('#btn-neworder-save').click(function(e) {
            e.preventDefault();

            $('#save').click();
        });
    }

    function transform_modelconfig() {
        /* add class jg-page-cartpage to body */
        $('body').addClass('jg-page-cartpage');
        /*$('#jg-topbar-title').text("Shopping Cart");
        $('title').text("Shopping Cart");*/

        // console.log($('.cell-promotion').html());

        /* form has class configuration-form move to element has class jg-box-maincontent */
        $('form[class=configuration-form]').appendTo('.jg-box-maincontent');

        $('#config-header').hide();

        var flowimg = $("<div class='column-layout clearfix '><div class='column label-left last' style='width:100%'><div class='form-item clearfix null' id='attr_wrapper_1_visualWorkflow'><label class='form-label' for='visualWorkflow' style='width: 100px;visibility:hidden'><span style='padding-right: 5px'>Visual Workflow</span></label><div class='form-element field-wrapper' id='field_wrapper_1_visualWorkflow' style='padding-left: 0px;'><div id='readonly_1_visualWorkflow'><img width='70%' src='" + rootFolder + "/image/images/vi_shoppping_cart_ready_active.png' alt='Broken Visual Workflow'></div><div id='msg_1_visualWorkflow' class='error-hover' data-action-message='' message=''></div></div></div></div></div>")
            .insertBefore('.page-tabs');

        // toolbar
        /* add button Update */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool'>")
                .append($("<button id='btn-cart-update' class='jg-btn jg-btn-icon cart-update'></span>Update</button>"))
            )

        if ($('#start_over').length == 1) {
            /* add button Start over when add material page has element start_over */
            /* add button add to order when add material page has element start over */
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-startover' class='jg-btn jg-btn-icon cart-startover'>Start Over</button>"))
                )
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-addtoorder' class='jg-btn jg-btn-icon cart-addtoorder'>Add to Order</button>"))
                );
        } else if ($('#save').length == 1) {
            /* add button Save when add material page has element save */
            $('.jg-list-tool')
                .append($("<li class='jg-item-tool'>")
                    .append($("<button id='btn-cart-save' class='jg-btn jg-btn-icon cart-save'>Save</button>"))
                );
        }

        /* add button Cancel Shopping */
        $('.jg-list-tool').append($("<li class='jg-item-tool'>")
            .append($("<button id='btn-cart-cancelshopping' class='jg-btn jg-btn-icon cart-cancelshopping'>Cancel Shopping</button>"))
        );

        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop

           This function override element of attribute-overidePrice with <br/> to make 2 line display.

        */
        $("#attribute-overridePrice").children('.attribute-label').html($("#attribute-overridePrice").children('.attribute-label').text().replace(" ", "<br/>"));

        /* End   : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /*
           Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /* Start : 18 March 2017 */
        /* Task  : Change width of material code */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop

           this function override styling width of input element
        */
        $('td.cell-material').children('.attribute-field-container').children('input').css("width", "75px");
        /* End   : 18 March 2017 */
        /* Task  : Change width of material code */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /* Start : 17 March 2017 */
        /* Task  : Change header of Material Description to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop

           this function override element of attibute-materialDescription with <br> to make 2 line display
        */
        $("#attribute-materialDescription").children('.attribute-label').html($("#attribute-materialDescription").children('.attribute-label').text().replace(" ", "<br/>"));
        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /* Start : 17 March 2017 */
        /* Task  : hide icon for first row on additional bonus table */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */
        $("#additionalMaterialArrayset tbody tr:first").children('.array-remove-cell').children('.array-remove').hide();
        /*
            needs to hide delete button for the first row of table additional bonus.
            first we need to find id additionalMaterialArrayset and then select tbody and then select the :first of tr.
            and then find children of this selector who have class array-remove-cell,
            and then find element who have class array-remove and then hide it.
        */
        /* End  : 17 March 2017 */
        /* Task : hide icon for first row on additional bonus table */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /*
            Start : 6 April 2017
            Task  : align customer information
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            override styling on customer information
        */
        var parentOfCustomerInfo = $("#attribute-duplicateMaterialsPresentMessageHTML");
        $(parentOfCustomerInfo).next().css({
            "margin-top": "20px"
        });
        var customerSoldtoID = $($(parentOfCustomerInfo).next().children()[0]).children()[1];
        var row2 = $(parentOfCustomerInfo).next().children()[1];
        $(parentOfCustomerInfo).next().children().each(function() {
            var $this = $(this);
            $(this).children().each(function(e, customerData) {
                // $( customerData ).css({"width":"30%"});
                $(customerData).find('.attribute-label-container').css({
                    "width": "100%",
                    "padding-bottom": "8px"
                }).children('.attribute-label').css("cssText", "color: #a90b0b!important");
                $(customerData).find('.attribute-field-container').css({
                    "width": "100%"
                });
            });
        });
        // $( customerSoldtoID ).appendTo( $(row2) );

        // $( row2 ).children().each( function(e, customerData){
        //     $( customerData ).css({"width":"30%"});
        //     $( customerData ).find('.attribute-label-container').css({"width":"100%"}).children('.attribute-label').css("cssText", "color: #00575d!important");
        //     $( customerData ).find('.attribute-field-container').css({"width":"100%"});
        // });

        /*
            End   : 6 April 2017
            Task  : align customer information
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 6 April 2017
            Task  : Auto scroll to result search material
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this function trigger auto scroll to materal result when material Search text or material desc searcg text is not null
        */

        var materialSearchText = $("#material_s").val();
        var materialDescSearchText = $("#materialDescription_s").val();

        if (materialSearchText.length > 0 || materialDescSearchText.length > 0) {
            console.log($("#materialResults").offset().top)
            $('html, body').animate({
                scrollTop: $("#materialResults").offset().top - 250
            }, 2000);
        }

        /*
            End   : 6 April 2017
            Task  : Auto scroll to result search material
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 5 April 2017
            Task  : replace style width for handle low resolution
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            override styling width for every row in child of search_html
        */

        $("#search_html").closest('.row').children().each(function(e, dataColumn) {
            $(dataColumn).css({
                "width": "30%"
            });
        });

        /*
            End   : 5 April 2017
            Task  : replace style width for handle low resolution
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 4 April 2017
            Task : remove button delete
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this functions earch row type of bonus then set last coloumn element of delete button.
        */
        $(".cell-type").each(function(e, dataType) {
            if ($(dataType).text().toLowerCase() == "bonus") {
                $(dataType).parent().find("td:last").children().hide();
            }
        });
        /*
            End : 4 April 2017
            Task : remove button delete
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*
            Start : 23 March 2017
            Task  : hide + button in additional bonus table.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this function hide button array-add on additional bonus tabel.
        */
        $('#additionalMaterialArrayset thead tr th:first').children('a.array-add').hide();
        /*
            End   : 23 March 2017
            Task  : hide + button in additional bonus table.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        // tweak originals
        $('#sticky-actions').hide();
        $('#tab-material').closest('ul').hide();
        /* change width override price */
        /* Start : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop

           override styling display.
        */
        $("td.cell-overridePrice").children().children('input').each(function() {
            $(this).css("width", "60px");
        });
        /* End   : 17 March 2017 */
        /* Task  : Change header of override price to 2 lines display */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /*
            Task  : Make material description long text without scrolling.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        var MaterialSize = $("#materialArrayset").data("size");
        var oldMaterialSize = 0;
        setInterval(function() {
            oldMaterialSize = $("#materialArrayset").data("size");
            if (MaterialSize != oldMaterialSize) {
                MaterialSize = $("#materialArrayset").data("size");
                $("td.cell-overridePrice").children().children('input').each(function() {
                    $(this).css("width", "110px");
                });

                $("td.cell-materialDescription").children().children('input').each(function() {
                    var id_input = this.id;
                    textbox = $(document.createElement('textarea')).attr({
                        id: "area_" + id_input,
                        name: "area_" + this.name,
                        value: $(this).val(),
                        style: ($(this).attr("style") != 'undefined') ? $(this).attr("style") : '',
                        "class": $(this).attr("class") + " textarea-listen ",
                        cols: 25
                    });
                    // $(this).replaceWith(textbox);
                    $(this).hide();
                    $(this).parent().parent().append(textbox);
                    /* Start : 17 March 2017 */
                    /* Task  : Reduce height of material description textarea */
                    $("#area_" + id_input).css("height", (document.getElementById("area_" + id_input).scrollHeight) + "px");
                    /* End   : 17 March 2017 */
                    /* Task  : Reduce height of material description textarea */
                });
            }
        }, 50);
        /* change input in material description to textarea */
        $("td.cell-materialDescription").children().children('input').each(function() {
            var id_input = this.id;
            textbox = $(document.createElement('textarea')).attr({
                id: "area_" + id_input,
                name: "area_" + this.name,
                value: $(this).val(),
                style: ($(this).attr("style") != 'undefined') ? $(this).attr("style") : '',
                "class": $(this).attr("class") + " textarea-listen ",
                cols: 25
            });
            // $(this).replaceWith(textbox);
            $(this).hide();
            $(this).parent().parent().append(textbox);
            /* Start : 17 March 2017 */
            /* Task  : Reduce height of material description textarea */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
            */
            $("#area_" + id_input).css("height", (document.getElementById("area_" + id_input).scrollHeight) + "px");
            /* End   : 17 March 2017 */
            /* Task  : Reduce height of material description textarea */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
            */
        });
        $(".textarea-listen").keydown(function() {
            this.style.height = "1px";
            this.style.height = (this.scrollHeight) + "px";
            $("#" + this.id.replace("area_", "")).val($(this).val());
        });

        $("#tab-material-content").css({
            "width": "98%"
        });

        /* Task  : Make material description long text without scrolling. */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /*
            Start : 10 March 2017
            Task  : Make content Fav Freq Req on right side, and give animation for show and hide.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        var tabelMaterial = $("#tab-material-content").children('.grid.clearfix').children().children('.column-0');
        /*
            Start : 26 December 2017
            Task  : https://jira.uhub.biz/browse/VMLSINOZP-30
            [Desktop] Top 10 frequently order items and my favourites section distorted some times
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        // var tabelFavFreqReq = $("#tab-material-content").children('.grid.clearfix').children().children('.column-1');
        var tabelFavFreqReq = $("#attribute-pastOrders").parent().parent().parent().parent().parent().parent('.column-1');
        console.log(tabelFavFreqReq.length);


        /* total price on top table material */
        var rowGrid = $(tabelMaterial).children().children('.grid.clearfix');
        var totalPriceTop = rowGrid[0];
        $(totalPriceTop).css('marginBottom', '10px');
        // $('#grid-36595617').css('marginBottom', '10px');

        $('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table small');
        $('.tab-content button').addClass('jg-btn');
        $('.attribute-label[for=principalCode]').parent().css('marginTop', '5px');
        $('.attribute-label[for=showPrincipalFavorites]').parent().css('marginTop', '5px');
        /* Toolbar on bottom table. */
        /*
            Start : 22 March 2017
            Task  : Remove all the icons in top row
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        $("#materialArrayset").after($(".jg-box-toolbar")); //for bottom
        /*
            End   : 22 March 2017
            Task  : Remove all the icons in top row
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */
        /* override styling width 100% */
        $(tabelMaterial).css({
            "width": "100%"
        });
        // $("#grid-36397039").children('.row').children('.column-0').css({width: "100%"});
        /* Right Panel Content */
        /* add element class column into new element class jg-inner-column */
        $(totalPriceTop).closest('.column').wrapInner($("<div class='jg-inner-column'>"));
        // $('#grid-36595617').closest('.column').wrapInner($("<div class='jg-inner-column'>"));
        /* override styling margin of tabel Fav Freq and Req */
        $(tabelFavFreqReq).css({
            "margin-top": "8px"
        });
        // $('#grid-36561838').closest('.column').css('marginTop', '8px');
        //transisi right side
        /* override min height of material table */
        $('.jg-box-maincontent').css({
            "overflow": "hidden",
            "min-height": "800px"
        });

        /* this function give new element img to each row tabel fav freq dan req */
        var listRightSideMenu = $(tabelFavFreqReq).children();
        listRightSideMenu.each(function(i, data) {
            var iconRightSideBar = "";
            $(data).addClass("collapsed");
            if (i == 0) {
                //frequently
                // $( data ).addClass("collapsed");
                iconRightSideBar = "<img src='" + rootFolder + "/image/images/rsm-frequently.png' >"
            } else if (i == 1) {
                //recomended
                iconRightSideBar = "<img src='" + rootFolder + "/image/images/rsm-recommended.png' >"
            } else if (i == 2) {
                //favourite
                iconRightSideBar = "<img src='" + rootFolder + "/image/images/rsm-favourite.png' >"
            }
            $(data).children('.group-content')
                .css('margin', '0px')
                .children('.group-header').children('span').prepend(iconRightSideBar);
        });
        // $('#grid-36561838').addClass("collapsed");

        // var rightPanel = $('#grid-36397039').children('.row').children('.column-1');
        /*$('#grid-36561838').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-frequently.png' >");
        $('#grid-36565572').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-recommended.png' >");
        $('#grid-36701507').children('.group-content')
                           .css('margin','0px')
                           .children('.group-header').children('span').prepend("<img src='"+rootFolder+"/image/images/rsm-favourite.png' >");*/
        /* set value of right position on different display */
        var mainContentWidth = $(".jg-box-maincontent").width();
        var rightValue = -(mainContentWidth / 4);

        /* override style of table Fav Freq and Req */
        $(tabelFavFreqReq).css({
            'position': 'fixed',
            'right': rightValue + 'px',
            'height': '800px'
        });
        // $(rightPanel).css({'position': 'absolute', 'right': rightValue+'px', 'height': '800px'});

        /* Show or Hide right panel content */
        $(tabelFavFreqReq).mouseenter(
            function(e) {
                $(tabelFavFreqReq).stop().animate({
                    right: '0px'
                }, 2000);

                listRightSideMenu.each(function(i, data) {
                    //mouse enter
                    $(data).click(function() {
                        if ($(data).hasClass("collapsed")) {
                            $(data).removeClass("collapsed");
                        } else {
                            $(data).addClass("collapsed");
                            $(data).removeClass("collapsed");
                        }
                    });
                    //mouse leave
                    // $( data ).mouseleave(function(e){
                    //     $( data ).addClass("collapsed");
                    // });
                });

            }
        );

        /* this function listen if mouse leave table fav freq and req */
        $(tabelFavFreqReq).mouseleave(
            function(e) {
                listRightSideMenu.each(function(i, data) {
                    $(data).addClass("collapsed");
                });
                /*$('#grid-365618381').addClass("collapsed");
                $('#group-36565572').addClass("collapsed");
                $('#group-36701507').addClass("collapsed");*/
                $(tabelFavFreqReq).stop().animate({
                    right: rightValue + 'px'
                }, 2000);
            }
        );

        /*
            End   : 10 March 2017
            Task  : Make content Fav Freq Req on right side, and give animation for show and hide.
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /*  Start : 1 April 2017
            Task  : Change style of content material search
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop

            this function override styling and re-position button on search material.
            and add custom button next and previous on search material.
        */
        // allign search button
        $("#search_html").parents('.attribute-inner').css({
            "padding": "0px"
        });
        // remove add material flag
        $("#attribute-previous_res").hide();
        $("#attribute-next_res").hide();
        $("#attribute-addMaterialsFlag").hide();
        //add bottom menu
        $("<div id='menu_bottom' width='100%' ></div>").insertAfter("#materialResults")
        //move to bottom menu
        // $("#menu_bottom").append($("<div id='area_add' style='float:left;' ></div>"));
        /* add bottom menu area */
        $("#menu_bottom").append($("<div id='area_paging' style='float:right;width:400px;' ></div>"));
        /* styling add material button */
        $("#attribute-addMaterials").css({
            "float": "left"
        });
        /* styling add material button */
        $("#addMaterials").children('p').children().css("width", "100px");
        /* mobing add material button on area paging */
        $("#area_paging").append($("#attribute-addMaterials"));
        /* create custom previous and next button and append after add material */
        $("#area_paging").append($('<div class="attribute-inner clearfix" style="float:left;padding-left:0px;" ><div class="attribute-label-container"></div><div class="attribute-field-container"><div class="unreset read-only-html" id="prev_custom"><p><button class="jg-btn">Previous</button></p></div></div></div>'))
            .append($('<div class="attribute-inner clearfix" style="float:left;padding-left:0px;" ><div class="attribute-label-container"></div><div class="attribute-field-container"><div class="unreset read-only-html" id="next_custom" ><p><button class="jg-btn" style="width:100px;" >Next</button></p></div></div></div>'));
        /* trigger previous button to original button click */
        $("#prev_custom").on("click", function() {
            $("#previous_res_true").click();
        });

        /* trigger next button to original button click */
        $("#next_custom").on("click", function() {
            $("#next_res_true").click();
        });


        /*  End   : 1 April 2017
            Task  : Change style of content material search
            Page  : Add Material Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Desktop
        */

        /* Events */

        /* Start : 18 March 2017 */
        /* Task  : When button array-add clicked, it trigger update button too */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop

           this function listen array-add in tabel material, triggered update function.
        */
        $('.array-add').bind('click', function(e) {
            $(".textarea-listen").remove();
            setTimeout(function() {
                $('#update')[0].click();
            }, 4000);
        });
        /* Start : 18 March 2017 */
        /* Task  : When button array-add clicked, it trigger update button too */
        /* Page  : Add Material Page
           File Location : $BASE_PATH$/image/javascript/js-ezrx.js
           Layout : Desktop
        */

        /* custom update button */
        $('.cart-update').bind('click', function(e) {
            e.preventDefault();
            //set all materials tab to collapse
            localStorage.setItem('allMaterialsTabState', 'collapsed');
            $('#update')[0].click();
        });

        /* custom button add to cart */
        $('.cart-addtoorder').bind('click', function(e) {
            e.preventDefault();
            var needupdate = $('input[name="_needUpdate"]').val();
            if (needupdate === 'yes') {
                $('.updateMsg').show();
            } else {
                $('.updateMsg').hide();
                $('#add_to_cart')[0].click();
            }

        });

        /* custom button start over */
        $('.cart-startover').bind('click', function(e) {
            e.preventDefault();

            $('#start_over')[0].click();
        });

        /* custom button save */
        $('.cart-save').bind('click', function(e) {
            e.preventDefault();
            var needupdate = $('input[name="_needUpdate"]').val();
            if (needupdate === 'yes') {
                $('.updateMsg').show();
            } else {
                $('.updateMsg').hide();
                $('#save')[0].click();
            }

        });

        /* custom button cancel shopping */
        $('.cart-cancelshopping').bind('click', function(e) {
            e.preventDefault();

            if ($('#cancel_shopping_cart').length) {
                $('#cancel_shopping_cart')[0].click();
            } else {
                $('#cancel')[0].click()
            }
        });

        var allMaterialState = localStorage.getItem('allMaterialsTabState');
        if (allMaterialState == 'collapsed') {
            $('#attribute-materialSearch').parent().parent().parent().parent().addClass('collapsed');
        } else {
            $('#attribute-materialSearch').parent().parent().parent().parent().removeClass('collapsed');
        }
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        adjust_tooltip();

    }

    function transform_reportpage() {
        /* add class jg-pg-reportpage */
        $('body').addClass('jg-page-reportpage');
        /* add text 'Report Manager' on element jg-topbar-title */
        $('#jg-topbar-title').text("Report Manager");
        /* move element class extra-panes to jg-box-maincontent */
        $('.extra-panes').appendTo('.jg-box-maincontent');
        /* move element class main-pane to jg-box-maincontent */
        $('.main-pane').appendTo('.jg-box-maincontent');

        // toolbar
        /* add custom button add, update, stylsheet, refresh, default, favorite, trash, edit */
        $('.jg-list-tool')
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-add' class='jg-linkbtn report-add'>Add</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-update' class='jg-linkbtn report-update'>Update</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-stylesheet' class='jg-linkbtn report-stylesheet'>Stylesheet</a>"))
            )
            .append($("<li class='jg-item-tool report'>")
                .append($("<a href='#' id='jg-tool-report-refresh' class='jg-linkbtn report-refresh'>Refresh</a>"))
            )
            .append($("<li class='jg-item-tool jg-separator'>"))
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-default' class='jg-linkbtn default'>Default</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-fav' class='jg-linkbtn fav'>Favorite</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-trash' class='jg-linkbtn trash'>Trash</a>"))
            )
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' id='jg-tool-folder-edit' class='jg-linkbtn edit'>Edit</a>"))
            );

        // refresh button
        $('.jg-list-tool-right')
            .append($("<li class='jg-item-tool'>")
                .append($("<a href='#' class='jg-linkbtn jg-tool-refresh'></a>"))
            );

        // get list folder and override href to default link
        $('#foders .dropTarget td[title]').each(function(i, target) {
            if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
                $('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
            } else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
                $('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
            } else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
                $('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
            }
        });

        /* hide element of form-label has class .toolbar */
        $('.form-label.toolbar').hide();
        /* hide element table in element of class .refresh-date */
        $('.refresh-date').closest('table').hide();
        /* remove element of br in element has id reportManager */
        $('#reportManager br').eq(0).remove();

        /* EVENTS */
        /* custom report add button */
        $('#jg-tool-report-add').click(function(e) {
            e.preventDefault();

            $('#add')[0].click();
        });

        /* custom report stylesheet button */
        $('#jg-tool-report-stylesheet').click(function(e) {
            e.preventDefault();

            $('#stylesheet')[0].click();
        });

        /* custom update button */
        $('#jg-tool-report-update').click(function(e) {
            e.preventDefault();

            $('#update')[0].click();
        });

        /* custom refresh button */
        $('.jg-tool-refresh').click(function(e) {
            e.preventDefault();

            $('#refresh_reporting_data')[0].click();
        });
    }

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
            url: "https://" + instanceName + ".bigmachines.com/mobile/pending-configurations",
            type: 'GET',
            data: "bm_trail_refresh=true",
            dataType: "html",
            success: function(respData) {
                // console.log(respData);
                //console.error(respData.indexOf('select-button'));
                // console.warn(respData.search('select-button'));
                if (respData.indexOf('select-button') === -1) {
                    $('.jg-linkbtn.shoppingcart').parent().hide(800);
                } else {
                    $('.jg-linkbtn.shoppingcart').parent().show();

                }
            },
            error: function() {
                console.log("Cannot get data tablet");
            }
        })
    }
    /*
        End : 20 Nov 2017
        Task  : ajax call on last incomplete order
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Tablet
    */
    /*
        Start : 09 Jan 2018
        Task  :  Hiding the Menu navigation bars under the condition where URL parameter flag=rightnow is present. 
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : BOTH
    */

    function getQueryVariableUrl(variable)
    {
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == variable){return pair[1];}
           }
           return(false);
    }

    var hide_navigation = function(layout){
        console.log('hide_navigation');
        var siteUrl = window.location.href;
        console.warn(siteUrl);
        layout = layout || 'Desktop';//Tablet
        console.log('layout',layout);

        if( getQueryVariableUrl("flag") == "rightnow" ){
            console.log("LOCALSTORAGE DONE");
            localStorage.setItem("flag", "rightnow");
        }
        var flag = localStorage.getItem("flag");

        if( flag == "rightnow" ){
            //debugger;
           console.log('URL parameter flag=rightnow ,  EXIST');
           var desktopMenu =  document.querySelector('.jg-box-sidenav');
           if(desktopMenu !== null){
              desktopMenu.style.display = "none";
           }
           if(layout == 'Desktop'){

            $("#close").closest(".button-middle").show();

            $("#close").on("click", function(){
                localStorage.removeItem("flag");
                window.close();
            });

             var jg_box_mainarea = document.querySelector('.jg-box-mainarea');
             if(jg_box_mainarea !== null){
                jg_box_mainarea.style.paddingLeft = 0;
             }
           }
           if(layout == 'Tablet'){
                if($($(".action.action-type-modify")[1]).text().trim().toLowerCase() == "close"){

                    $( $(".action.action-type-modify")[1] ).on("click", function(){
                        localStorage.removeItem("flag");
                        window.close();
                    });

                }else{

                    $($(".action.action-type-modify")[2]).show();

                    $( $(".action.action-type-modify")[2] ).on("click", function(){
                        localStorage.removeItem("flag");
                        window.close();
                    });

                }



                var menu_mobile = document.querySelector('#menu_mobile');
                if(menu_mobile !== null){
                    menu_mobile.style.display = "none";
                }

                var topMenuModified = document.querySelector('.topMenuModified');
                if(topMenuModified !== null){
                    topMenuModified.style.display = "none";
                }    
                $('#header').css('background-color','#00575D');
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
                if(layout == 'Desktop'){
                    $('a.button-text#close').parent().parent().hide();
                } else {
                    $('button.action-type-modify:contains("Close")').hide()
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
                    if($('#actionErrorMessagesBox').length > 0){
                        console.log('#actionErrorMessagesBox 2');
                        $('#actionErrorMessagesBox').find('a').each(function(){
                            console.log('#actionErrorMessagesBox 3');                                
                            $(this).removeAttr('target')
                        });
                    }
            /*
                End : 10 Jan 2018
                Task  :  Load CPQ within iFrame instead of new tab when user clicks on link on error message. 
                Page  : Global
                File Location : $BASE_PATH$/image/javascript/js-ezrx.js
                Layout : BOTH
            */

    }
    /*
        End : 09 Jan 2018
        Task  :  Hiding the Menu navigation bars under the condition where URL parameter flag=rightnow is present. 
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : BOTH
    */

    /*
        Start : 09 Feb 2018
        Task  :  Restyling table shopping cart if it loaded
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : BOTH
    */

    function style_shoppingcart_table(){
        console.log("======STYLE SHOPPING CART TABLE======");

        //hide material and description
        setTimeout(function(){
            $("#attribute-materialAndDesc").hide();
            $(".cell-materialAndDesc").hide();
        }, 1000);

        $("#attribute-materialDescription").css("width", "200px");
		$(".config-array #attribute-materialAndDesc").hide();
        //$("#attribute-materialAndDesc").css("width", "275px");
        $("#attribute-additionalMaterialDescription").css("width", "275px");
        $("#attribute-pPAApprovalNo").css("width","50px");

        //set width QTY Coloumn
        $("#attribute-qty_text").css("width", "30px");
        $("#attribute-additionalMaterialQty").css("width", "30px");
        
        // Type, Material, Bonus and price
        $("#attribute-type").css("width", "60px");
        $("#attribute-overridePrice").css("width", "50px");
        $("#attribute-totalPrice").css("width", "50px");	
        $("#attribute-price").css("width", "50px");
        $("#attribute-material").css("width", "80px");
        $("#attribute-overrideBonusQty").css("width", "70px");
		$("#attribute-contractBonus").css("width", "125px");
		$("#attribute-promotion").css("width", "100px");

        $("input[name='qty_text']").css({"text-align": "center", "font-size":"14px"});
        $("input[name='additionalMaterialQty']").css({"text-align": "center", "font-size":"14px"});
        $("input[name='overridePrice']").css({"text-align": "center", "font-size":"14px"});
		$("#attribute-totalPrice [class*=array-attribute]").each(function(){//enable all columns in the arrayset
					$(this).removeClass("hidden");
				});

    }

    function hide_detail_coloumn(){
        console.log("======HIDE COLOUMN SHOPPING CART TABLE======");
        $(".cell-type").hide();
        $("#attribute-type").hide();
        $("#attribute-material").hide();            
        $("#attribute-materialDescription").hide();
		$(".config-array #attribute-materialAndDesc").hide();
        $(".cell-material").hide();
        $(".cell-materialDescription").hide();
        $(".config-array td, .config-array th ,.config-array td  .ui-controlgroup-controls .read-only .form-field, .rec-item-table.sidebar-table td, .rec-item-table.sidebar-table th").css("font-size","0.70rem");
        $(".config-array tr.messages.constrained td ul li h3").css("line-height","5px");    
        $(".config-array tr.messages.constrained td ul li h3").css("font-size","0.70rem");  
        $("#materialArrayset .ui-flipswitch a").css("font-size","0.70rem"); 
        $("#materialArrayset  .ui-flipswitch span").css("font-size","0.70rem"); 
        $("#attribute-overrideBonusQty div:contains('Override Bonus Qty')").html("Overr. Bonus Qty");
        $(".config-array .attr-right-arrow").hide();
        $("#materialArrayset [class*=array-attribute]").each(function(){//enable all columns in the arrayset
            $(this).removeClass("hidden");
        });
        
        $("#attribute-promotion").hide();
        $(".cell-promotion").hide();
        $("#attribute-contractBonus").hide();
        $(".cell-contractBonus").hide();
        $("#attribute-comments").hide();
        $(".cell-comments").hide();
        $("#attribute-stockQty").hide();
        $(".cell-stockQty").hide(); 

        $(".config-array .array-index").css("width", "2px");
        
        //$(".config-array #attribute-materialAndDesc").css("width", "120px");
        $(".config-array #attribute-inStock").css("width", "40px");
        $(".config-array #attribute-price").css("width", "40px");
    }

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
        if ((urlarr[3].match("mobile") !== null) && (urlarr.length == 4)) {
            location.href = "/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
            return false;
        }

        /* get title text */
        pagetitle = $('title').text().toLowerCase();
        console.log(pagetitle);

        /*
        $('.tab-link').bind("tap", function() {
            console.log($(this));
        });*/
        /* if if pagetitle is empty then call functoon mobile_newlayout() */

        /* comment this function for showing page without checkin page title */
        /*if (pagetitle == '') {
            setTimeout(function() {
                mobile_newlayout();
            }, 2000);

            return;
        }*/

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
                if (pagetitle == 'commerce management') {
                    console.log('commerce management');
                    $('html').addClass('jg-mobilelayout');
                    transform_mainlayout();
                    transform_orderspage();
                    mobile_commerce_management();
                    mobile_modifyMenu();
                } else if (pagetitle == "zuellig pharma products" || pagetitle == "zuellig pharma order processData") {
                    console.log('zuellig pharma products');
                } else if (pagetitle == 'zuellig pharma order process') {
                    console.log('zuellig pharma order process');
                }

                mobile_adjustcontenttop();
            }

        } else {
            /* if oagetitle is null call custom filter from URL */
            /* create filterPage get last string of URL */
            var filterPage = urlarr[urlarr.length - 1];
            /* if filterPage contains with commerce */
            console.log('filterPage', filterPage);
			if($("#line-item-grid").length > 0){
				filterPage = "commerce";
			}
			if($("#materialArrayset").length > 0){
				filterPage = "config";
			}

            if (filterPage.search("commerce") != -1) {
                //[new] order & material page
                // var checkVariable = filterPage.split("?");
                if ($("#tab-draftOrder").exists()) {
                    //[new] order
                    console.log("New order");
                    mobile_orderpage();
                    mobile_customerSearch();
                    if ($('#frequentlyAccessedCustomers_t').length) {
                        var customerDetails = $("#frequentlyAccessedCustomers_t").val();
                        if (customerDetails == "") {
                            return true;
                        } else {
                            mobile_topCustomerList(customerDetails);
                            mobile_toggleTopCustomer();
                        }
                    }

                    //VMLSINOZP-61 start
                    //console.log('VMLSINOZP-61',1);
                    //setTimeout(function(){
                        console.log('VMLSINOZP-61',1);
                        var _61 = setInterval(function(){
                            console.log('VMLSINOZP-61',2);
                            if(document.readyState === 'complete') {
                                console.log('VMLSINOZP-61',3);
                                //save_to_newuser();
                                //document.addEventListener("DOMContentLoaded", function(){
                                    console.log('VMLSINOZP-61',4);
                                    newCustId = sessionStorage.getItem('selectedCustShipID');
                                    console.log('newCustId',newCustId);
                                    clearInterval(_61);
                                    if(newCustId != "null" && newCustId != null){
                                        console.log('VMLSINOZP-61',5);
                                        //document.cookie = "selectedCustShipID="+null;
                                        sessionStorage.setItem('selectedCustShipID', null);
                                        $("#selectedCustomerDetail").val(newCustId);
                                        $("#customerMasterString_t").val("");
                                        setTimeout(function(){
                                            if($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length>0){
                                                $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                                                console.log('VMLSINOZP-61','6-1');

                                            } else if($('#popup-moreBtns-popup ul.popup-list li:first-child').length>0) {
                                                $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                                                console.log('VMLSINOZP-61','6-2');

                                            }
                                        },1500);

                                    }
                                //});
                            }
                        },500);
                        function save_to_newuser(){
                            newCustId = sessionStorage.getItem('selectedCustShipID');
                                console.log('newCustId',newCustId);
                                clearInterval(_61);
                                if(newCustId !="null" && newCustId != null ){
                                    console.log('VMLSINOZP-61',5);
                                    //document.cookie = "selectedCustShipID="+null;
                                    sessionStorage.setItem('selectedCustShipID', null);
                                    $("#selectedCustomerDetail").val(newCustId);
                                    $("#customerMasterString_t").val("");
                                    setTimeout(function(){
                                        if($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length>0){
                                            $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                                            console.log('VMLSINOZP-61','6-1');

                                        } else if($('#popup-moreBtns-popup ul.popup-list li:first-child').length>0) {
                                            $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                                            console.log('VMLSINOZP-61','6-2');

                                        }
                                    },1000);

                                }
                        }
                    //},1500);
                    //VMLSINOZP-61 end

                } else {
                    console.log("material page");
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

                            $('.cell-overrideBonusQty .ui-flipswitch').on('click', function() {
                                var $this = $(this);
                                mobile_bonusQtyOverride($this);
                            });
                            clearInterval(OverrideBonusQty);
                        }
                    };



                    mobile_actionButtonFavItem();
                }
            } else if (filterPage.search("config") != -1) {
                console.log(' ====>>>> config page');
				
				/* replace messages on top table shopping cart */
				//$("#attribute-showDetailedView").html("<div id='detailMessages' style=color:darkred;float:left;width:100%;margin-top:-10px;margin-bottom:10px;'>Please swipe to see additional details in the shopping cart</div>");
				
				//$("#detailMessages").css({"color:darkred;float:left;width:100%;margin-top:4px;margin-bottom:4px;"});
				
				
				
                //* quantity color change on focus START*//
                textColorQty();

                //* quantity color change on focus END*//
                //**//
                // material page.
               setTimeout(function(){					
					textColorQty();
					// material page.
					mobile_materialpage();
					mobile_materialSearch();
					mobile_adjust_tooltip();
					mobile_pricingChange();
					mobile_onChangeUpdateMsg();
					mobile_shoppingCart_msg();
					//mobile_hide_unwanted_arrow();
					mobile_customerSearch();
				}, 2000);
				
				$("body").on("click touchend",".pagination .ui-radio",function(e){
					waitUntilTableDataLoad();
				});
				
				//checking with timeOut 500ms if load data table is done.
                function waitUntilTableDataLoad(){
                    setTimeout(function(){
                        if($('#jg-overlay').css("display") == "none"){
                            
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
                        }else{
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
				
				$(window).on("orientationchange", function(){
					waitUntilTableDataLoad();
				});

                //waitUntilPageLoad();

                $("body").on("click touchend", ".button-save", function(e) {
                    e.preventDefault();
                    console.log(" ===>>> clicked on button-save");
                    var _needUpdate = $("input[name=_needUpdate]").val();
                    console.log(" ===>>> clicked on button-save --> ", _needUpdate);
                    if (_needUpdate == "yes") {
                        $(".updateMsg").show();
                        return false;
                    } else {
                        $(".updateMsg").hide();
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
                };

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

                console.log('allMaterialState', allMaterialState, 'allTopTenFavState', allTopTenFavState, 'allFavCustItemState', allFavCustItemState );

                if (allTopTenFavState == 'collapsed') {
                    $('#attribute-pastOrders').parent().parent().addClass('ui-collapsible-content-collapsed');
                    $('#attribute-pastOrders').parent().parent().prev().addClass('ui-collapsible-heading-collapsed');
                    $('#attribute-pastOrders').parent().parent().prev().children().removeClass('ui-icon-minus').addClass('ui-icon-plus');
                    $('#attribute-pastOrders').parent().parent().parent().addClass('ui-collapsible-collapsed');
                } else {
                    $('#attribute-pastOrders').parent().parent().removeClass('ui-collapsible-content-collapsed');
                    $('#attribute-pastOrders').parent().parent().prev().removeClass('ui-collapsible-heading-collapsed');
                    $('#attribute-pastOrders').parent().parent().prev().children().removeClass('ui-icon-plus').addClass('ui-icon-minus');
                    $('#attribute-pastOrders').parent().parent().parent().removeClass('ui-collapsible-collapsed');
                }

                if (allrecomItemState == 'collapsed') {
                    $('#attribute-currentUserCompanyName').parent().parent().addClass('ui-collapsible-content-collapsed');
                    $('#attribute-currentUserCompanyName').parent().parent().prev().addClass('ui-collapsible-heading-collapsed');
                    $('#attribute-currentUserCompanyName').parent().parent().prev().children().removeClass('ui-icon-minus').addClass('ui-icon-plus');
                    $('#attribute-currentUserCompanyName').parent().parent().parent().addClass('ui-collapsible-collapsed');
                } else {
                    $('#attribute-currentUserCompanyName').parent().parent().removeClass('ui-collapsible-content-collapsed');
                    $('#attribute-currentUserCompanyName').parent().parent().prev().removeClass('ui-collapsible-heading-collapsed');
                    $('#attribute-currentUserCompanyName').parent().parent().prev().children().removeClass('ui-icon-plus').addClass('ui-icon-minus');
                    $('#attribute-currentUserCompanyName').parent().parent().parent().removeClass('ui-collapsible-collapsed');
                }

                if (allFavCustItemState == 'collapsed') {
                    $('#attribute-currentCustFav').parent().parent().addClass('ui-collapsible-content-collapsed');
                    $('#attribute-currentCustFav').parent().parent().prev().addClass('ui-collapsible-heading-collapsed');
                    $('#attribute-currentCustFav').parent().parent().prev().children().removeClass('ui-icon-minus').addClass('ui-icon-plus');
                    $('#attribute-currentCustFav').parent().parent().parent().addClass('ui-collapsible-collapsed');
                } else {
                    $('#attribute-currentCustFav').parent().parent().removeClass('ui-collapsible-content-collapsed');
                    $('#attribute-currentCustFav').parent().parent().prev().removeClass('ui-collapsible-heading-collapsed');
                    $('#attribute-currentCustFav').parent().parent().prev().children().removeClass('ui-icon-plus').addClass('ui-icon-minus');
                    $('#attribute-currentCustFav').parent().parent().parent().removeClass('ui-collapsible-collapsed');
                }
				//commented by suresh as the all materials should be expanded always for mobile version
                /*if (allMaterialState ==='collapsed') {
                    console.log('collapse material', $('#attribute-materialSearch').parent().parent());
                    $('#attribute-materialSearch').parent().parent().addClass('ui-collapsible-content-collapsed');
                    $('#attribute-materialSearch').parent().parent().prev().addClass('ui-collapsible-heading-collapsed');
                    $('#attribute-materialSearch').parent().parent().prev().children().removeClass('ui-icon-minus').addClass('ui-icon-plus');
                    $('#attribute-materialSearch').parent().parent().parent().addClass('ui-collapsible-collapsed');
                } else {
                    $('#attribute-materialSearch').parent().parent().removeClass('ui-collapsible-content-collapsed');
                    $('#attribute-materialSearch').parent().parent().prev().removeClass('ui-collapsible-heading-collapsed');
                    $('#attribute-materialSearch').parent().parent().prev().children().removeClass('ui-icon-plus').addClass('ui-icon-minus');
                    $('#attribute-materialSearch').parent().parent().parent().removeClass('ui-collapsible-collapsed');
                }*/
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
            }
            /* if filterPage contains with copy_processing.jsp */
            else if (filterPage.search("copy_processing.jsp") != -1) {
                //[copy] order
                mobile_orderpage();
                mobile_materialSearch();
                mobile_actionButtonFavItem();
                mobile_redirect_materialpage();

                /* if filterPage contains with document.jsp */
            } else if (filterPage.search("document.jsp") != -1) {
                //[process] order
                console.log("Proses Order page");

                mobile_orderpage();
                mobile_customerSearch();

                if ($('#frequentlyAccessedCustomers_t').length) {
                    var customerDetails = $("#frequentlyAccessedCustomers_t").val();
                    if (customerDetails == "") {
                        return true;
                    } else {
                        mobile_topCustomerList(customerDetails);
                        mobile_toggleTopCustomer();
                    }
                }


                /* if filterPage contains with commerce_manager.jsp */
            } else if (filterPage.search("commerce_manager.jsp") != -1) {
                //Commerce Management
                console.log("Commerce page");
                incompleteOrder();

                /* if filterPage contains with edit_profile.jsp */
            } else if (filterPage.search("edit_profile.jsp") != -1) {
                //Profile
                console.log("Profile page");
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

    function mobile_iframe_height(){
        console.log('mobile_iframe_height');
        

        //$('iframe#cpq').find('#commerce').css('min-height','1000px');
        setTimeout(function(){
            console.log('mobile_iframe_height inside');
            //var cpq = document.getElementById("cpq");
            //console.log('cpq',cpq);
            //if(cpq !== null){
            //    cpq.style.maxHeight = '1100px';
            //}
            $('.rn_PageContent ').find('iframe#cpq').css('max-height','1100px');
            
            
        },2000);
        
    }
    function mobile_loginpage() {

        /*
            give image for logo, and styling for login form.
        */
        /*
            Start : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            change logo for mobile, change position and styling.
        */
        var imglogin = $("<img src='" + rootFolder + "/image/images/logo-ezrx-mobile.png' class='jg-login-logo'>")
            .prependTo('#login-form')
            .after("<span class='jg-login-welcome'>Hello,<br/>Please Login</span>");
        /*.append($("<div class='jg-box-login-bottom'>")
            .append($("<img src='"+rootFolder+"/image/images/zuellig.png' class='jg-login-logo' />"))
        );*/
        /* add class login-mobile-box on main-content element */
        /*
            Start : 3 Mei 2017
            Task  : Repair login animation and view.
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            Hide header from new style.

        */
        $("#header").css("display", "none");
        /*
            End   : 3 Mei 2017
            Task  : Repair login animation and view.
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

        */

        $("#main-content").addClass('login-mobile-box');
        /* hide element of label username and psword */
        $('label[for=username], label[for=psword]').hide();
        /* add element forgot password */
        $('#forgotpassword').insertAfter($('label[for=psword]').next().next());
        /* hide element footer */
        $('footer').hide();
        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        /*
            Start : 18 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            give animation on mobile login page, focus on username and password.
        */
        $("#login-form").attr("autocomplete", "off");

        $("<div id='mobile-login-animation' style='position:fixed;top:0;right:0;bottom:0;left:0;background-color:#fff;z-index:2;display:none;' ></div>").insertBefore("#jg-overlay");
        $("#mobile-login-animation").append("<div id='form-login-animation' style='position:fixed;top:20px;bottom:auto;right:0;left:0;width:auto;padding:0px 100px 20px 100px;' ></div>");
        var textHeaderLogo = "<div style='height:70px!important;' ><span class='jg-login-welcome' style='float:left!important;margin:25px 0px 0px 0px!important;' >Hello, Please Login</span><img src='" +
            rootFolder + "/image/images/logo-ezrx-mobile.png' class='jg-login-logo'></div>";
        var loginForm = "<div style='width:100%;float:left;' ><input type='text' name='focus_username' id='id_focus_username' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;' autocomplete='off' placeholder='Username' >" +
            "<input type='password' name='focus_password' id='id_focus_password' class='focus-item' style='padding:10px 20px;font-size:18px;border-radius:5px;width:40%;float:right;' autocomplete='off' placeholder='password' ></div>";
        var loginButton = "<div style='width: 100%;float:left;margin-top:15px;height:40px;' ><div style='margin:0px auto; width:200px;background:#B8C942;border-radius:5px;' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-disabled='false' class='ui-submit ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all' aria-disabled='false'>" +
            "<span class='ui-btn-inner'>" +
            "<span class='ui-btn-text'>Log In</span>" +
            "</span>" +
            "<button class='ui-block-b ui-btn-hidden' style='display:none;' id='login_mobile_animation' data-disabled='false'>Log In</button>" +
            "</div>" +
            "<div id='forgotpassword' style='position:relative;right:0px;bottom:45px;' >" +
            "<a href='/mobile/reset-password' data-transition='slide' class='ui-link'>Forgot password?</a>" +
            "</div>";
        "</div>";

        // $("#mobile-login-animation").append("<>")

        $("#form-login-animation").append($(textHeaderLogo))
            .append($(loginForm))
            .append($(loginButton));

        var _originalSize = $(window).width() + $(window).height();
        var statusOpen = false;

        function keyboardShow() {
            setTimeout(function() {
                console.log(statusOpen);

                if ($(window).width() + $(window).height() != _originalSize) {
                    if (!statusOpen) {
                        statusOpen = true;
                        console.log("keyboard show up");
                        $("#mobile-login-animation").show();
                        $("#id_focus_username").focus();
                    }
                }
            }, 1000);
        }

        function keyboardHide() {
            setTimeout(function() {
                statusOpen = false;
                console.log("keyboard closed");
                $("#mobile-login-animation").hide();
            }, 1000);
        }

        console.log(_originalSize);
        $(".ui-input-text > input").on("click", function() {
            console.log("on tap");
            keyboardShow();
        });

        $($("#login_mobile_animation").siblings()).on("click", function() {
            $("#username").val($("#id_focus_username").val());
            $("#password").val($("#id_focus_password").val());
            console.log($("#username").val());
            console.log($("#password").val());
            $("#login-form").children('button[type="submit"]').click();
        });

        /*
            End : 17 April 2017
            Task  : Custom Login page on mobile
            Page  : Login Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */

    }
    /*
    Start : 22 Dec 2017
    Task  : Align the buttons in the all orders page
    Page  : All Order
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/

    function mobile_modifyMenu(){
        console.log('modifyMenu 1');
        var topMenu1 = '<ul class="topMenuModified"> <li class="jg-item-mainmenu"><a href="/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&amp;navType=1" id="jg-mainmenu-profile" class="jg-linkbtn profile" data-description="Profile">Profile</a></li><li class="jg-item-mainmenu"><a href="/commerce/display_company_profile.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-home" class="jg-linkbtn home" data-description="Home">Home</a></li><li class="jg-item-mainmenu"><a href="/admin/index.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-settings" class="jg-linkbtn settings" data-description="Settings">Settings</a></li><li class="jg-item-mainmenu"><a href="/logout.jsp?_bm_trail_refresh_=true" id="jg-mainmenu-logout" class="jg-linkbtn logout" data-description="Logout">Logout</a></li></ul>';
       // var topMenu2 = '';
        $('h2#jg-topbar-title').addClass('modified').after(topMenu1);
       /* $('.jg-list-tool')
        .append($('<li class="jg-item-tool">')
        .append('<a href="/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&amp;from_hp=true&amp;_bm_trail_refresh_=true" id="jg-submenu-myorders" class="my_order jg-linkbtn">All Orders</a>'))
        .append($('<li class="jg-item-tool">')
        .append('<a href="#" id="jg-submenu-copyorder" class="copy_order jg-linkbtn" data-description="Copy Order">Copy Order</a>'));
		*/
    }

/*
    End : 22 Dec 2017
    Task  : Align the buttons in the all orders page
    Page  : All Order
    File Location : $BASE_PATH$/image/javascript/js-ezrx.js
    Layout : Tablet

*/
    function mobile_commerce_management() {
        /*
            Start : 24 April 2017
            Task  : Show and hide menu side bar
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

            set default hide side nav and give style to mainarea, when user clicked bar menu, show sidenav.
        */
        $(".jg-box-sidenav").css("display", "none");
        $(".jg-box-mainarea").css("padding-left", "0px");
        $(".jg-box-topbar").prepend("<a href='#' id='menu_mobile' ><img src='" + rootFolder + "/image/images/bars-icon.png' style='width:40px;float:left;padding:5px;' ></a");
        $("#menu_mobile").click(function() {
            var timeAnimation = 1000;
            if ($(".jg-box-sidenav").css("display") == "none") {
                $(".jg-box-sidenav").show(timeAnimation);
                $(".jg-box-mainarea").animate({
                    "padding-left": "50px"
                }, timeAnimation);
            } else {
                $(".jg-box-sidenav").hide(timeAnimation);
                $(".jg-box-mainarea").animate({
                    "padding-left": "0px"
                }, timeAnimation);
            }
        });
        /*
            End   : 24 April 2017
            Task  : Show and hide menu side bar
            Page  : Commerce Management
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile

        */

    }

    function mobile_orderpage() {

        /*
            Start : 5 Mei 2017
            Task  : Create script for handle view on Order Page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        console.log("Order Page Controller");
        // var hasExecute = false;
        //re-align struktur
        localStorage.setItem('topTenFavTab', 'collapsed');
        localStorage.setItem('custFavItemTab', 'collapsed');
        localStorage.setItem('recomItemTab', 'collapsed');
		/*
		 Task  : Replace MutationObserver and handle the Arrow click on the Order page
		 Page  : Order Page
		 Author: Pratap Rudra
		*/
        var documentNumber2 = "";

        //checking with timeOut 500ms if load data table is done.
        function waitShoppingCartLoad(){
            setTimeout(function(){
				
                if( $('.ui-loader').css("display") == "none"){
					 console.log("documentNumber2=*********===");
                    console.log(documentNumber2);
                   // setTimeout(function(){
                        var currentPage = $(".pagination").find(".ui-btn.current").html().trim();
                        if(currentPage != "1"){
                            $(".content").prepend($(documentNumber2));
                        }
                        
                        mobile_checkItemOnCart();
                        order_page_stock_color();
                        mobile_rowBgColor();
                       // listen_pagination_shopingcart();
                        $('#jg-overlay').css("display", "none");
						
						mobile_pricingChange();
						//mobile_checkItemOnCart();
						$("label[for='customerPORef_t']").css("color", "red");

                        // $("#lig-sticky-actions").find(".action-type-reconfigure").prop("disabled", false);
                    //}, 2000);
                }else{
                    //recursive checking table has load data
                    waitShoppingCartLoad();
                }
				var docNum = $("#line-item-grid table tr.parent").find("input[name=_line_item_list]").val();
				if(docNum != undefined){
					currentModelNumber = docNum;
				}
				$("#line-item-grid table tr.parent").find("input[name=_line_item_list]").hide();
				console.log("docNum===="+currentModelNumber+"----"+docNum);
            }, 1000);
        }
		function tabPricingChanges(){
            setTimeout(function(){				
               if( $('.ui-loader').css("display") == "none"){		
					console.log("======Replace MutationO*******bserver CLICK 111 =======");				
						mobile_pricingChange();
						$("label[for='customerPORef_t']").css("color", "red");
						
                }else{
                    //recursive checking table has load data
                    tabPricingChanges();
               }
				
            }, 1000);
        }
        /*var listen_pagination_shopingcart = function(){
            //listen shopping chart changing page.
            console.log("listen to change page on table");
            $(".pagination").find(".ui-btn").off();
            $(".pagination").find(".ui-btn").bind("click touchstart touchend", function(){
                console.log("Change Page on table");
                $('#jg-overlay').css("display", "block");
                // $("#lig-sticky-actions").find(".action-type-reconfigure").prop("disabled", true);
                waitShoppingCartLoad();
            });
        }*/
		tabPricingChanges();
		$("body").on("click touchend","#tab-pricing",function(e){
			console.log("======Replace MutationObserver CLICK 111 =======");
			tabPricingChanges();
			
		});
		 $("body").on("click touchend","#line-item-grid .pagination a.page",function(e){
			   $('#jg-overlay').css("display", "block");
			 waitShoppingCartLoad();
		 });
		$("body").on("click tochend swipeleft swiperight","#swipe-sidebar",function(e){
			console.log("======Replace MutationObserver CLICK 222=======");
			var isLineGirdOpen = $(this).hasClass("sidebar-state-1");
			
			setTimeout(function(){
				console.log(">>>>"+isLineGirdOpen);
				if(isLineGirdOpen){
					//if( $("#line-item-grid table tr.parent").legth > 0){
						//documentNumber2 = $("#line-item-grid table tr.parent").clone();//$("tr[data-document-number='2']").clone();
						currentModelNumber = $("#line-item-grid table tr.parent").find("input[name=_line_item_list]").val();
						$("#line-item-grid table tr.parent").find("input[name=_line_item_list]").hide();
						console.log(">>>>"+currentModelNumber);
					//}
					mobile_checkItemOnCart();
					order_page_stock_color();
					mobile_rowBgColor();
					// Delete Line Item Action
					mobile_deleteLineItem();
					mobile_redirect_materialpage();
				}
			},1500);
		});
		/*console.log("======Replace MutationObserver CLICK 111 =======");
		$("body").on("click tochend swipeleft swiperight","#swipe-sidebar",function(e){
			console.log("======Replace MutationObserver CLICK 222=======");
			if($(this).hasClass("sidebar-state-1")){
				console.log("======Replace MutationObserver CLICK 333=======");
				$(".tab-link").each(function(i, data) {
					console.log("======Replace MutationObserver CLICK 444=======");
					if ($(data).hasClass("active") == true) {
					  console.log("======Replace MutationObserver CLICK 555=======");	
					  var hrefData = $(data).attr("href");
						  if (hrefData == "#tab-draftOrder") {
								console.log('======Replace MutationObserver CLICK 666======= draftOrder');
								mobile_checkItemOnCart();
								order_page_stock_color();
								mobile_rowBgColor();
								// Delete Line Item Action
								mobile_deleteLineItem();
								mobile_redirect_materialpage();
								
								if( $("#line-item-grid table tr.parent").legth > 0){
									documentNumber2 = $("#line-item-grid table tr.parent").clone();//$("tr[data-document-number='2']").clone();
								}
								

								listen_pagination_shopingcart();


								// Check if select any Item have bonus
								$("input[name = _line_item_list]").change(function() {
									console.log(' ===== 777 ==== mobile_itemCheckBonus');
									mobile_itemCheckBonus($(this));
								});
								//draftOrder
							}else if (hrefData == "#tab-pricing") {
								console.log(" ===== 8888 ====>>>>> tab-pricing");
								mobile_pricingChange();
								mobile_checkItemOnCart();
								$("label[for='customerPORef_t']").css("color", "red");
							}
					  
					}
				});
				console.log("======Replace MutationObserver LAST 333.111=======");
			}
		});*/

        /*var $div = $("html").addClass('ui-loading');
        var hasExecute = false;
        var firstExecute = true;
        var countChange = 1;
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    countChange++;
                    if ((attributeValue.search("ui-loading") != -1) || (countChange == 4)) {
                        hasExecute = true;
                    }
                    if (attributeValue.search("ui-loading") == -1) {
                        $(".ui-controlgroup-controls").parent().css("width", "100%");
                        // $(".ui-controlgroup-label").css("width","17%");
                        $(".ui-controlgroup-label").next().css({
                            "width": "auto",
                            "margin-top": "0px"
                        });
                        // $("label[for='orderType_t']").css({ "padding-left":"15px", "width":"19%" });
                        // $("label[for='orderType_t']").next().css("width","75%");
                        if (hasExecute) {
                            hasExecute = false;
                            if ($("#swipe-sidebar").hasClass("sidebar-state-1") == false) {
                                // global_searchCustomer('mobile');
                                // $("#tab-customerSearch").children("a").click();
                                // $("button.action.action-type-browse").click();

                            }

                            $(".tab-link").each(function(i, data) {
                                if ($(data).hasClass("active") == true) {
                                    var hrefData = $(data).attr("href");
                                    if (hrefData == "#tab-draftOrder") {
                                        console.log('draftOrder');
                                        mobile_checkItemOnCart();
                                        order_page_stock_color();
                                        mobile_rowBgColor();
                                        // Delete Line Item Action
                                        mobile_deleteLineItem();
                                        mobile_redirect_materialpage();

                                        // Check if select any Item have bonus
                                        $("input[name = _line_item_list]").change(function() {
                                            console.log('mobile_itemCheckBonus');
                                            mobile_itemCheckBonus($(this));
                                        });
                                        //draftOrder
                                    } else if (hrefData == "#tab-customerSearch") {



                                    } else if (hrefData == "#tab-pricing") {
                                        console.log("tab-pricing");
                                        mobile_pricingChange();
                                        mobile_checkItemOnCart();
                                        $("label[for='customerPORef_t']").css("color", "red");
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });

        observer.observe($div[0], {
            attributes: true
        });*/
		 /* console.log(" LAST 11 ====>>>>> tab-pricing");
		  mobile_pricingChange();
		  mobile_checkItemOnCart();
		  $("label[for='customerPORef_t']").css("color", "red");*/

		  /*$("body").on("click touchend","a.ui-btn-inline",function(e){
			 console.log("======= PAGE NUMBER CLICKED JS-EZRX 111 ========");
            // listen_pagination_shopingcart();
			 mobile_checkItemOnCart();
			 order_page_stock_color();
			 mobile_rowBgColor();
			 // Delete Line Item Action
			 mobile_deleteLineItem();
			 mobile_redirect_materialpage();
			 mobile_itemCheckBonus($(this));
			});*/
			
		  
        /*
            Start : 07 Nov 2017
            Task  : Show message if the customer is already selected in another order
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Tablet
        */
         

        if ($('.jg-mobilelayout #error-messages ul').hasClass('page-messages')) {
            $('ul.page-messages').find('li.error').hide();
            setTimeout(function() {
                //$('ul.page-messages').find('li.error').html($('ul.page-messages').find('li.error').text()).show();
                var errarr = $('ul.page-messages').find('li.error').text().split(/\n/);
                
                var msg1 = errarr[0];
                errarr.splice(0, 1);
                var msg2 = errarr.join('');
                if(window.self != window.top){
                    //errarr.replace('target="_blank"','');
                    console.log('msg2-',msg2);
                    msg2 = msg2.replace('_blank','_self');
                }
                var errmsg = '<ul class="error-text"><li class="error-text">' + msg1 + '</li><li class="error-text">' + msg2 + '</li></ul>';
                $('#commerce #main-content #tab-content fieldset:first-of-type').before('<div id="actionErrorMessagesBox" class="box-collapsed" style="display:block">' + errmsg + '</div>');

            }, 1000);
        }

        /*
            End : 15 Nov 2017
            Task  : Show message if the customer is already selected in another order
            Page  : Global
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Tablet

        */



        /*$( document ).ajaxComplete(function(){
            console.log("ajax complete")
            if(hasExecute == false){
                hasExecute = true;
                console.log("do each");
                global_searchCustomer('mobile');
                $(".tab-link").each(function(i, data){
                    if( $(data).hasClass("active") == true ){
                        var hrefData = $(data).attr("href");
                        if( hrefData == "#tab-draftOrder" ){
                            //draftOrder
                        }else if( hrefData == "#tab-customerSearch" ){

                        }else if( hrefData == "#tab-pricing" ){
                            console.log("tab-pricing");
                            $("label[for='customerPORef_t']").css("color","red");
                        }
                    }
                });
            }
        });

        $( document ).ajaxStart(function() {
          console.log("Listen Ajax Start");
          hasExecute = false;
        });*/

        /*
            End   : 5 Mei 2017
            Task  : Create script for handle view on Order Page
            Page  : Order Page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */

    }
    /*
        Start : 06 Nov 2017
        Task  : Edited fields should be in red font in both Order page and Shopping cart
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
    */
    function textColorQty() {
        console.log('textColorQty');
        $qtySel = $('.cell-qty_text input[name="qty_text"] , .cell-overridePrice input[name="overridePrice"]');


        /*
        Start : 22 Jan 2018
        Task  : [TW] Highlight "Override Invoice Price" to red #102
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
         */
        
            var $overrideInvPrice = $('.cell-overrideInvoicePrice input[name="overrideInvoicePrice-display"]');
			$overrideInvPrice.off();
            $overrideInvPrice.bind('keydown keyup change focus',function(){
                if($('input[name="userSalesOrg_PL"]').val()=="2800"){
                    //parseFloat($('.cell-overrideInvoicePrice input[name="overrideInvoicePrice-display"]').val().replace(/\D/g,''));
                    $ovp = parseFloat($(this).val().replace(/[^0-9.]/g, ''));
                    if($ovp>0){
                        $(this).css('color', '#ff0000');
                    } else{
                        $(this).css('color', 'inherit');
                    }
                }
            });
        
        /*
        End : 22 Jan 2018
        Task  : [TW] Highlight "Override Invoice Price" to red #102
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Desktop
         */

        $outofstock = false;
		
		$qtySel.off();
        $qtySel.bind('focus keydown', function() {

            $(this).css('color', '#ff0000');

            var oldVal = $(this).val();
            var modify = $(this).attr('data-oldVal-changed');

            if (modify == undefined) {
                $(this).attr('data-oldVal', oldVal);
            }
        });

        $qtySel.bind('change', function() {
            $(this).attr('data-oldVal-changed', 1);
        });

        $qtySel.bind('blur', function() {

            var oldVal = $(this).attr('data-oldVal');
            var newVal = $(this).val();
            var modify = $(this).attr('data-oldVal-changed');

            ///check mobile out of stock start
            // $('.cell-qty_text input[name="qty_text"]').length
            if ($('html').hasClass('jg-mobilelayout')) {
                var stock = $(this).parent().parent().parent().find('input[name="stockQty"]').val();
                if (stock == 0) {
                    $outofstock = true;
                    console.log(stock);
                } else {
                    if (oldVal === newVal) {
                        $(this).css('color', 'inherit');
                    }
                }
            }
            ///check mobile out of stock end

            if (oldVal === newVal && ($outofstock === false)) {
                $(this).css('color', 'inherit');
            } else {

            }



        });
    }
    /*
        End : 06 Nov 2017
        Task  : Edited fields should be in red font in both Order page and Shopping cart
        Page  : Global
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Both
    */

    function mobile_incomplete_order() {
        var urlParam = window.location.search.split('&');
        if ((urlParam[0] == '?_first_time=false') && urlParam[1] == "_needUpdate=false") {
            console.warn(' ===>>> only work for incompleteOrder');
            //textColorQty();
            //mobile_qty_outofstock_color();

            mobile_rowBgColor();
            mobile_qty_outofstock_color();
            textColorQty();
            mobile_overRidePriceRed();
            $('.cell-overrideBonusQty .ui-flipswitch').each(function() {
                var $this = $(this);
                mobile_bonusQtyOverride($this);
            });

            $('.cell-overrideBonusQty .ui-flipswitch').on('click', function() {
                var $this = $(this);
                mobile_bonusQtyOverride($this);
            });
            mobile_adjust_tooltip();
        }
    }

    /*
        Start : 23 Jan 2018
        Task  : Add text next to Show Detailed View button #106
        Page  : Global Material page
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Mobile
    */
    function materialPageText(){
        console.count('materialPageText');
		if($("#usermsg1").length == 0){
			 $('#attribute-showDetailedView .ui-flipswitch').css('margin-right','10px').after('<span id="usermsg1" style="color:darkred">Please select "Yes" to see detailed view. Swipe the screen to see additional details.</span>');
		}
       	if($("#usermsg2").length == 0){
			$('#resultsTable_filter').after('<div id="usermsg2" style="color:darkred;float:left;width:100%;margin-top:-10px;margin-bottom:10px;">Please scroll down to see the selected material</div>');
		}
    }
    
        /*
        End : 23 Jan 2018
        Task  : Add text next to Show Detailed View button #106
        Page  : Global Material page
        File Location : $BASE_PATH$/image/javascript/js-ezrx.js
        Layout : Mobile
    */
    function mobile_materialpage() {
        /*
            End   : 6 Mei 2017
            Task  : Hide testing fields from the layout
            Page  : Material page / product page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
        console.log('mobile_materialpage');
        /* hide testing fields */
        $("#attribute-firstLoad").hide();
        $("#attribute-typeHeadScriptTagHolder").hide();
        $("#attribute-masterString").hide();
        $("#attribute-applicableProducts").hide();
        $("#attribute-materialResultsString").hide();

        setTimeout(function() {
            /* align all component on material page */
            $(".ui-controlgroup-controls").parent().css("width", "100%");
            $(".ui-controlgroup-label").css("width", "auto");
            $(".ui-controlgroup-label").next().css({
                "width": "auto",
                "margin-top": "9px"
            });
            /* align material search*/
            $("#attribute-addMaterials").children('.ui-controlgroup').children().children('.ui-controlgroup-label').css("display", "none", "important");
            $("#attribute-addMaterials").children('.ui-controlgroup').children().children('.ui-controlgroup-controls').css("width", "130px", "important");
            // $( $( $("#tab-content").children()[1] ).children('.ui-body-inherit').children()[0] ).parent().css("padding-bottom","100px", "important");
            $($($("#tab-content").children()[1]).children('.ui-body-inherit').children()[0]).parent().css("padding-bottom", "30px", "important");
            // $("<div id='form_controlsearchmaterial' ></div>").insertBefore("#attribute-addMaterials");
            // $("#form_controlsearchmaterial").css({"width":"400px", "min-height":"90px", "float":"right"});
            $("#attribute-addMaterials").css({
                "padding": "0px",
                "margin": "0px",
                "float": "left"
            });
            // $("#attribute-addMaterials").appendTo("#form_controlsearchmaterial");

            if ($("#attribute-previous_res").hasClass("hidden") == false) {
                $("#attribute-previous_res").hide();
                $("#form_controlsearchmaterial").append("<div class='ui-controlgroup-controls ' style='width: 100px; float:left; margin-top: 15px;'>" +
                    "<div class='html-attr form-field'>" +
                    "<p><button id='cust_prevResult' class='ui-btn ui-shadow ui-corner-all ui-first-child ui-last-child'>Previous</button></p>" +
                    "</div>" +
                    "</div>");
                $("#cust_prevResult").on("click", function() {
                    $($("#attribute-previous_res").children()[1]).click();
                });
            }

            if ($("#attribute-next_res").hasClass("hidden") == false) {
                $("#attribute-next_res").hide();
                $("#form_controlsearchmaterial").append("<div class='ui-controlgroup-controls ' style='width: 100px; float:left; margin-top: 15px;margin-left:30px;'>" +
                    "<div class='html-attr form-field'>" +
                    "<p><button id='cust_nextResult' class='ui-btn ui-shadow ui-corner-all ui-first-child ui-last-child'>Next</button></p>" +
                    "</div>" +
                    "</div>");
                $("#cust_nextResult").on("click", function() {
                    $($("#attribute-next_res").children()[1]).click();
                });
            }
            /* display white if material page still loading */
            var $div = $("html");
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === "class") {
                        var attributeValue = $(mutation.target).prop(mutation.attributeName);
                        if ((attributeValue.search("ui-loading") != -1)) {
                            $("#jg-overlay").show();
                            $("footer.slideup").css("z-index", "999999");
                        } else {
                            $("#jg-overlay").hide();
                        }
                    }
                });
            });

            observer.observe($div[0], {
                attributes: true
            });

            //incomplete order function start
            mobile_incomplete_order();
            //incomplete order function end
            materialPageText();
			mobile_renameButton();
        }, 2000);

        $("input[name = _line_item_list]").change(function() {
            console.log('mobile_itemCheckBonus');
            mobile_itemCheckBonus($(this));
        });


        /*
            End   : 6 Mei 2017
            Task  : Hide testing fields from the layout
            Page  : Material page / product page
            File Location : $BASE_PATH$/image/javascript/js-ezrx.js
            Layout : Mobile
        */
    }

    function mobile_adjustcontenttop() {
        /* give styling on mobile view, and call it after 500 milisecond */
        setTimeout(function() {
            $('#header').parent().css('paddingTop', $('#header').outerHeight()).css('margin', '0');
        }, 500);
    }

    /* monic's script */
    function adjust_tooltip() {
        /* prepare tooltip for cell-promotion */

        if(countryEle == null){ //this is for material page.
            countryEle = $('input[name="userSalesOrg_PL"]').val();
            countryCode = countryEle;
        }else{
            var countryCode = parseInt(countryEle.value);
        }

        if(countryCode != 2800){
            //NON TW

            $('td.cell-promotion').attr('tooltip', function() {
                var button_helper;
                var valueOfPromotion = $(this).find('input[name=promotion]').val();

                if (valueOfPromotion != '') {
                    button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
                    $(this).find('input[name=promotion]').attr('type', 'text');
                    $(this).find('input[name=promotion]').css('display', 'block !important');
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

                var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Ordered Quantity</th><th style="border: 1px solid #999;padding:5px;">Contract Price</th></tr></thead>';

                var x = $(this).attr('tooltip').trim();
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

                if ($(this).attr('tooltip').trim() != '') {
                    $('#myModal').addClass('hover-modal-content').html(table);
                    $('#myModal').css("display", "block");
                }
                $('.cell-promotion').mouseleave(function() {
                    $('#myModal').css("display", "none");
                });
            });

        }



        /* create tootip for contract bonus */
        $('td.cell-contractBonus').attr('tooltip', function() {
            var button_helper;

            var valueOfBonus = $(this).find('input[name="contractBonus"]').val();
            // console.log('valueOfBonus', $(this).find('input[name="contractBonus"]').val());

            if (valueOfBonus != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            // $(this).children('.attribute-field-container').children('span').html(button_helper);
            $($(this).children().children()).hide();
            $($(this).children().children()).parent().append(button_helper);
            return valueOfBonus;
        }).mouseenter(function() {
            /* Start : 17 March 2017 */
            /* Task  : Add header column Product Description
               Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop

               if mouse hover on element contractBonus (lens icon) then showing table of ordered qty, bonus material, material desc, material qty

            */
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;">' +
                '<thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;">' +
                '<th style="border: 1px solid #999;padding:5px;">Ordered Qty</th>' +
                '<th style="border: 1px solid #999;padding:5px;">Bonus Material</th>' +
                '<th style="border: 1px solid #999;padding:5px;">Material  Desc</th>' +
                '<th style="border: 1px solid #999;padding:5px;">Bonus Qty</th></tr></thead>';
            /* End : 17 March 2017 */
            /* Task  : Add header column Product Description */
            /* Page  : Add Material Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
           */
            /*
                 Set element of row and coloumn in hover table.
             */
            var x = $(this).attr('tooltip').trim();
            if (x != "") {
                var col = x.trim().split(",");
                if (col.length > 0) {
                    table += "<tbody>";
                    col.forEach(function(row) {
                        table += '<tr>';
                        // row = row.trim().split('#@#');
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
            if ($(this).attr('tooltip').trim() != '') {
                $('#myModal').addClass('hover-modal-content').html(table);
                $('#myModal').css("display", "block");
            }
            $('.cell-contractBonus').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        $("td.cell-material").mouseenter(function() {
            /* get text of material desciption */
            var materialId = $(this).find("input[name=material]").attr("id");
            if (materialId) {
                var index = materialId.split("-")[1];
                var netPricing = $("#netPricing-" + index).val();
                var price = parseFloat($("#price-" + index).val());
                var overridePrice = parseFloat($("#overridePrice-" + index).val());
                console.log(netPricing + "===" + price + "===" + overridePrice);
                if (netPricing == "Y" && price >= overridePrice) {
                    /* if mouse hover on element then showing table of Net pricing. */
                    var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Net Pricing</th></thead>';
                    table += "<tbody>";
                    table += "<tr><td>Net Pricing applied. Please override the price to give the bonus.</td></tr>";
                    table += "</tbody></table>";

                    /* always showing table of material description */
                    $('#myModal').addClass('hover-modal-content').html(table);
                    $('#myModal').css("display", "block");
                }

            }

            $('.cell-material').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });
        //material description
        //for add material page.
        var input_val;
        /* prepare for tooltip on material description */
        $('td.cell-materialDescription').attr("tooltip", function() {
            var input_text = $(this).find(".attribute-field-container span").text();
            // console.log('input_text',input_text);
            $('textarea[name="area_materialDescription"]').hide();
            // console.log('materialDescription', input_text, input_val);
            return input_text;
        }).mouseenter(function() {
            /* get text of material desciption */
            var input_text = $(this).find(".attribute-field-container span").text();
            if($('input[name="userSalesOrg_PL"]').val()=="2800" || (userCountry === 'TW')){
                var chineseTxt = '#chineseDescription-'+(parseInt($(this).parent().children().eq(0).html())-1);
                console.log(chineseTxt);
                input_text = $(chineseTxt).val();
            }
            console.info(input_text);
            /* if mouse hover on element material description then showing table of Material Description. */
            var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
            table += "<tbody>";
            table += "<tr><td>" + input_text + "</td></tr>";
            table += "</tbody></table>";
            // if ($(this).attr('tooltip') != '') {
            /* always showing table of material description */
            $('#myModal').addClass('hover-modal-content').html(table);
            $('#myModal').css("display", "block");
            // }
            $('.cell-materialDescription').mouseleave(function() {
                $('#myModal').css("display", "none");
            });
        });

        //for order page.
        /* prepare tootip for material description in order page */
        $("td[id*='part_desc']").each(function(i, data) {
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop

               replace css for displaying material description, this need word wrap view text.
            */
            $(data).css("white-space", "normal");
            /* add css white-space then give value normal */
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
            */
            /* get material description on table material in order page */
            var remove_attr = data.id.split("attr_wrapper");
            var object_span = $("#readonly" + remove_attr[1]);
            var input_val = object_span.text();
            object_span.attr("tooltip", function() {
                    return input_val;
                })
                .html('<i class="material-lens" aria-hidden="true" ></i>' + input_val)
                .mouseenter(function() {
                    /*
                        if mouse hover on element material description then showing table of Material Description.
                    */

                    if($('input[name="userSalesOrg_PL"]').val()=="2800" || (document.getElementById('userSalesOrg_t').value == '2800')){
                        var trNo = parseInt($(this).parent().parent().parent().parent().attr('data-sequence-number-field-index'));
                        console.log(trNo);
                        var chineseTxt = $('span[data-varname="chineseDescription_l"]').eq(trNo).text().trim();
                        console.warn(chineseTxt.length);
                        if(chineseTxt.length > 0){
                            input_val = chineseTxt;
                            console.log(input_val);
                        }
                    }
                    var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
                    table += "<tbody>";
                    table += "<tr><td>" + input_val + "</td></tr>";
                    table += "</tbody></table>";
                    /* if the content is not null then show the table. */
                    if ($(this).attr('tooltip') != '') {
                        $('#myModal').addClass("hover-modal-content").html(table);
                        $('#myModal').css("display", "block");
                    }
                    $(this).mouseleave(function() {
                        $('#myModal').css("display", "none");
                    });
                });
        });

        /* listen all class in the list, for following position above all code of modal table  */
        $('td.cell-contractBonus, td.cell-promotion, td[id*="part_desc"], td.cell-materialDescription')
            .hover(function(e) {
                e.preventDefault();
            })
            .mousemove(function(e) {
                $('#myModal').css('top', e.pageY - $(document).scrollTop() + 10 + 'px').css('left', e.pageX - $(document).scrollLeft() + 10 + 'px');
            });
    }

    function mobile_adjust_tooltip() {
        /* prepare tooltip for cell-promotion */
		$("td.cell-material").off();
        $("td.cell-material").click(function() {
            /* get text of material desciption */
            console.log(' mobile_adjust_tooltip 111 =====>>>> cell-material click');
            var materialId = $(this).find("input[name=material]").parent().parent().parent().parent().attr("id");
            console.log('mobile_adjust_tooltip cell-material click materialId =====>>>> 111.111 ', materialId); //cell-material-0
            if (materialId) {
                var index = materialId.split("-")[2];
                var netPricing = $("#netPricing-" + index).val(); //id="netPricing-0"
                var price = parseFloat($("#price-" + index).val()); //id="price-0"
                var overridePrice = parseFloat($("#overridePrice-" + index).val()); //id="overridePrice-0"
                if (netPricing == "Y" && price >= overridePrice) {
                    /* if mouse hover on element then showing table of Net pricing. */
                    var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Net Pricing</th></thead>';
                    table += "<tbody>";
                    table += "<tr><td>Net Pricing applied. Please override the price to give the bonus.</td></tr>";
                    table += "</tbody></table>";

                    /* always showing table of material description */
                    $('#myModal').addClass('hover-modal-content').html(table);
                }

            }
           console.log(' mobile_adjust_tooltip cell-material click 111.222 =====>>>> ');
            if ($(this).hasClass('show')) {
                $(this).removeClass('show');
                $('#myModal').css("display", "none");
            } else {
                $(this).addClass('show');
                $('#myModal').css("display", "block");
            }

        });

		$('td.cell-promotion').off();
        $('td.cell-promotion').attr('tooltip', function() {
			//console.log(' mobile_adjust_tooltip cell-promotion click 222 =====>>>> ');
            var button_helper;
            var valueOfPromotion = $(this).find('input[name=promotion]').val();
            //console.log(' mobile_adjust_tooltip cell-promotion click 222.111 =====>>>> ', valueOfPromotion);
            if (valueOfPromotion != '') {
				 //console.log(' mobile_adjust_tooltip cell-promotion click 222.111.111 =====>>>> ');
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
                $(this).find('input[name=promotion]').attr('type', 'text');
                $(this).find('input[name=promotion]').css('display', 'block !important');
            } else {
                button_helper = '-';
            }
			//console.log(' mobile_adjust_tooltip cell-promotion click 222.111.222 =====>>>> ');
            // $(this).children('.attribute-field-container').children('span').html(button_helper);
            $($(this).children().children()).hide();
			//console.log(' mobile_adjust_tooltip cell-promotion click 222.111.333 =====>>>> ');
            $($(this).children().children()).parent().append(button_helper);
			//console.log(' mobile_adjust_tooltip cell-promotion click 222.111.444 =====>>>> ');
            return valueOfPromotion;
        }).click(function() {
            if ($(this).attr('tooltip').trim() != '') {
                if ($(this).hasClass('open')) {

                    $(this).removeClass('open');
                    $('.table-tooltip').remove();

                } else {
                    //console.log(' mobile_adjust_tooltip 222.222 =====>>>> ');
                    $(this).addClass('open');
                    $('.table-tooltip').remove();

                    var table = '<table class="table-tooltip"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Ordered Quantity</th><th style="border: 1px solid #999;padding:5px;">Contract Price</th></tr></thead>';
                    //console.log(' mobile_adjust_tooltip 333 =====>>>> ');
                    var x = $(this).attr('tooltip').trim();
                    if (x != "") {
						 //console.log(' mobile_adjust_tooltip 444 =====>>>> ');
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
					//console.log(' mobile_adjust_tooltip 555 =====>>>> ');
                    $(this).parent().parent().parent().parent().append(table);
                    $('.table-tooltip').css({
                        right: '50%',
                        position: 'absolute',
                        transform: 'translate(50%, -50%)',
                        top: '50%',
                        width: '500px'
                    });
                    // var tooltipPosX = document.querySelector( ".table-tooltip" ).getBoundingClientRect().x;
                    // var tooltipWidth = document.querySelector( ".table-tooltip" ).getBoundingClientRect().width;
                    // if ( ( tooltipPosX + tooltipWidth ) > $( window ).width() ) {
                    //     $('.table-tooltip').css({
                    //         left: - ((( tooltipPosX + tooltipWidth ) / 2) - 60)
                    //     });
                    // }
                }
            }

        });


        /* create tootip for contract bonus */
		$('td.cell-contractBonus').off();
        $('td.cell-contractBonus').attr('tooltip', function() {
            var button_helper;

            var valueOfBonus = $(this).find('input[name="contractBonus"]').val();
            // console.log('valueOfBonus', $(this).find('input[name="contractBonus"]').val());

            if (valueOfBonus != '') {
                button_helper = '<i class="material-lens" aria-hidden="true" ></i>';
            } else {
                button_helper = '-';
            }
            // $(this).children('.attribute-field-container').children('span').html(button_helper);
            $($(this).children().children()).hide();
            $($(this).children().children()).parent().append(button_helper);
            return valueOfBonus;
        }).click(function() {

            if ($(this).attr('tooltip').trim() != '') {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $('.table-tooltip').remove();
                } else {
                    $(this).addClass('open');
                    $('.table-tooltip').remove();
                    var table = '<table class="table-tooltip">' +
                        '<thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;">' +
                        '<th style="border: 1px solid #999;padding:5px;">Ordered Qty</th>' +
                        '<th style="border: 1px solid #999;padding:5px;">Bonus Material</th>' +
                        '<th style="border: 1px solid #999;padding:5px;">Material  Desc</th>' +
                        '<th style="border: 1px solid #999;padding:5px;">Bonus Qty</th></tr></thead>';

                    var x = $(this).attr('tooltip').trim();
                    if (x != "") {
                        var col = x.trim().split(",");
                        if (col.length > 0) {
                            table += "<tbody>";
                            col.forEach(function(row) {
                                table += '<tr>';
                                // row = row.trim().split('#@#');
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

                    // $(this).find('.ui-controlgroup').append(table);
                    $(this).parent().parent().parent().parent().append(table);
                    $('.table-tooltip').css({
                        right: '50%',
                        position: 'absolute',
                        transform: 'translate(50%, -50%)',
                        top: '50%',
                        width: '500px'
                    });
                    // var tooltipPosX = document.querySelector( ".table-tooltip" ).getBoundingClientRect().x;
                    // var tooltipWidth = document.querySelector( ".table-tooltip" ).getBoundingClientRect().width;
                    // if ( ( tooltipPosX + tooltipWidth ) > $( window ).width() ) {
                    //     $('.table-tooltip').css({
                    //         left: - ((( tooltipPosX + tooltipWidth ) / 2) - 60)
                    //     });
                    // }
                }
            }

        });

        //material description//

        // var input_val;
        // $('td.cell-materialDescription').attr("tooltip", function(){
        //     var input_text = $(this).find(".attribute-field-container span").text();
        //     $('textarea[name="area_materialDescription"]').hide();
        //     return input_text;
        // }).click(function(){
        //
        //     if ( $(this).hasClass('open') ) {
        //         $(this).removeClass('open');
        //         $('.table-tooltip').remove();
        //     } else {
        //         $(this).addClass('open');
        //         $('.table-tooltip').remove();
        //
        //         var input_text = $(this).find(".attribute-field-container span").text();
        //
        //         var table = '<table class="table-tooltip"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
        //         table += "<tbody>";
        //         table += "<tr><td>"+input_text+"</td></tr>";
        //         table += "</tbody></table>";
        //     }
        // });

        //for order page.
        /* prepare tootip for material description in order page */
		
        $("td[id*='part_desc']").each(function(i, data) {
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop

               replace css for displaying material description, this need word wrap view text.
            */
            $(data).css("white-space", "normal");
            /* add css white-space then give value normal */
            /* Start : 17 March 2017 */
            /* Task  : Make 2 or more line, for descripton material */
            /* Page  : Order Page
               File Location : $BASE_PATH$/image/javascript/js-ezrx.js
               Layout : Desktop
            */
            /* get material description on table material in order page */
            var remove_attr = data.id.split("attr_wrapper");
            var object_span = $("#readonly" + remove_attr[1]);
            var input_val = object_span.text();
			object_span.off();
            object_span.attr("tooltip", function() {
                    return input_val;
                })
                .html('<i class="material-lens" aria-hidden="true" ></i>' + input_val)
                .mouseenter(function() {
                    /*
                        if mouse hover on element material desvdcription then showing table of Material Description.
                    */
                    var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Material Description</th></thead>';
                    table += "<tbody>";
                    table += "<tr><td>" + input_val + "</td></tr>";
                    table += "</tbody></table>";
                    /* if the content is not null then show the table. */
                    if ($(this).attr('tooltip') != '') {
                        $('#myModal').addClass("hover-modal-content").html(table);
                        $('#myModal').css("display", "block");
                    }
                    $(this).mouseleave(function() {
                        $('#myModal').css("display", "none");
                    });
                });
        });

    }
	
	

    /*$(window).load(function(){
        //VMLSINOZP-61 start
        if($('html').hasClass('jg-mobilelayout')){
            console.log('window.load');
            setTimeout(function(){
                newCustId = sessionStorage.getItem('selectedCustShipID');
                console.log('newCustId',newCustId);
                if(newCustId!="null"){
            //document.cookie = "selectedCustShipID="+null;
            sessionStorage.setItem('selectedCustShipID', null);
            $("#selectedCustomerDetail").val(newCustId);
            $("#customerMasterString_t").val("");

            if($('#sticky-actions button.action-type-modify[data-properties*="36246153"]').length>0){
                $('#sticky-actions button.action-type-modify[data-properties*="36246153"]').click();
                console.error('loaded4');

            } else if($('#popup-moreBtns-popup ul.popup-list li:first-child').length>0) {
                $('#popup-moreBtns-popup ul.popup-list li:first-child').click();
                console.error('loaded5');

            }


        }
    },1500);

        }
        //VMLSINOZP-61 end
    });*/

})(jQuery);