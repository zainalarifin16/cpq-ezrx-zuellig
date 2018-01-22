(function($) {

var url, pagetitle;

$(document).ready(function() {
	url = window.location.href;
	pagetitle = $('title').text().toLowerCase();
	
	setTimeout(function() {
		if (!$('html').hasClass('ui-mobile')) {
			$('#jg-overlay').hide();
			desktop_newlayout();
		}
		else {
			mobile_newlayout();
		}
	}, 1000);
});

function desktop_newlayout() {
	/* UI */
	if ($('.logged-out').length == 1 || $('#login').length == 1) {
		transform_loginpage();
	}
	else {
		// if ($('input[name=pageName][value=commerce_manager]').length == 1) {
		if (pagetitle == 'commerce management' || pagetitle == 'transaction' || pagetitle == 'model configuration' || pagetitle == "report manager") {
			transform_mainlayout();
			tranform_ordersubmenu();
			
			if (pagetitle == 'commerce management') {
				$('body').addClass('jg-page-orders');
				$('#jg-mainmenu-orders').addClass('active');
				$('#jg-submenu-myorders').addClass('active');
		
				transform_orderspage();
			}
			else if (pagetitle == 'transaction') {
				$('#jg-mainmenu-orders').addClass('active');
				$('#jg-submenu-neworder').parent().remove();
				$('#jg-submenu-copyorder').parent().remove();
				
				if (url.indexOf('copy_processing') != -1) {
					$('body').addClass('jg-page-copyorder');
					$('#jg-topbar-title').text("Copy Order");
					$('title').text("Copy Order");
					
					$('#jg-submenu-copyorder').addClass('active');
				}
				else if ($('#readonly_1_visualWorkflow').length > 0) {
					var imgsrc = $('#readonly_1_visualWorkflow img').attr('src');
					
					if (imgsrc.indexOf('order_created_active.png') != -1 || imgsrc.indexOf('customer_selected_active.png') != -1) {
						$('body').addClass('jg-page-neworder');
						$('#jg-topbar-title').text("New Order");
						$('title').text("New Order");
						
						$('#jg-submenu-neworder').addClass('active');
					}
					else if (imgsrc.indexOf('shoppping_cart_ready_active.png')) {
						$('body').addClass('jg-page-shoppingcart');
						$('#jg-topbar-title').text("Shopping Cart");
						$('title').text("Shopping Cart");
					}
					else {
						$('#jg-topbar-title').text("(Page title hasn't been set for this page.)");
					}
				}
				
				transform_newcopypage();
			}
			else if (pagetitle == 'model configuration') {
				$('#jg-mainmenu-orders').addClass('active');
				$('#jg-submenu-neworder').parent().remove();
				$('#jg-submenu-copyorder').parent().remove();
				
				transform_modelconfig();
			}
			else if (pagetitle == "report manager") {
				$('body').addClass('jg-page-orders');
				$('#jg-mainmenu-orders').addClass('active');
				$('#jg-submenu-myreports').addClass('active');
				$('#jg-submenu-neworder').parent().remove();
				$('#jg-submenu-copyorder').parent().remove();
				
				transform_reportpage();
			}
			
			transform_newfooter();
		}
	}
	
	// remove white overlay
	$('#jg-overlay').hide();
}

function transform_loginpage() {
	var newlayout = $("<div class='jg-box-login'>")
		.append($("<div class='jg-box-login-inner'>")
			.append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-login-logo.png' class='jg-login-logo' />"))
			.append($("<span class='jg-login-welcome'>Welcome</span>"))
		)
		.prependTo('body');
	
	$('form[name=loginform]').appendTo('.jg-box-login-inner');
	$('#login-form-head').remove();
	$('.login-links').insertBefore($('.login-button'));
	
	$('.extra-panes, .main-pane, #footer').hide();
}

function transform_mainlayout() {
	// Add new layout
	var newlayout = $("<div class='jg-box-mainlayout'>")
		.append($("<div class='jg-box-sidenav'></div>")
			.append($("<ul class='jg-list-mainmenu'>")
				.append($("<li class='jg-item-mainmenu'><a href='/commerce/profile/edit_profile.jsp?_bm_trail_refresh_=true&navType=1' id='jg-mainmenu-profile' class='jg-linkbtn profile'></a></li>"))
				.append($("<li class='jg-item-mainmenu'><a href='/commerce/display_company_profile.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-home' class='jg-linkbtn home'></a></li>"))
				.append($("<li class='jg-item-mainmenu jg-separator'></li>"))
				.append($("<li class='jg-item-mainmenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-mainmenu-orders' class='jg-linkbtn orders'></a></li>"))
				.append($("<li class='jg-item-mainmenu jg-separator'></li>"))
				.append($("<li class='jg-item-mainmenu jg-separator'></li>"))
				.append($("<li class='jg-item-mainmenu'><a href='/admin/index.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-settings' class='jg-linkbtn settings'></a></li>"))
				.append($("<li class='jg-item-mainmenu'><a href='/logout.jsp?_bm_trail_refresh_=true' id='jg-mainmenu-logout' class='jg-linkbtn logout'></a></li>"))
			)
		)
		.append($("<div class='jg-box-rightpanel'></div>")
			.append($("<div class='jg-box-submenu'></div>"))
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
	
	// mainmenu status
	var page = $('.commerce-sidebar-current').text().toLowerCase();
	
	// adjust rightpanel to submenu width
	$('.jg-box-mainarea').css('paddingLeft', $('.jg-box-submenu').outerWidth());
	
	// remove table padding
	$('.jg-box-maincontent table').attr('cellspacing', '0').attr('cellpadding', '0');
	
	// header & footer
	$('.header-bordercolor, .commerce-bordercolor, #footer').hide();
	
	// errors box
	var errorsbox = $("<div class='column-layout clearfix'>").insertAfter($('#attr_wrapper_1_visualWorkflow').closest('.column-layout'));	
	$('#actionErrorMessagesBox').appendTo(errorsbox);
	
	// modal box
	$('#myModal').appendTo('.jg-box-mainlayout');
	
	/* EVENTS */
	$('#jg-mainmenu-orders').bind('click', function(e) {
		e.preventDefault();
		
		$('.jg-box-submenu').toggle();
		$('.jg-box-toolbar').toggle();
		
		$('.jg-box-mainarea').css('paddingLeft', $('.jg-box-submenu').is(':visible') ? '150px' : '0');
	});
}

function transform_newfooter() {
	// new footer
	$('.jg-box-mainarea').append($("<div class='jg-box-footer'>")
		.append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-img-footer.png' class='jg-img-footer' />"))
	);
}

function tranform_ordersubmenu() {
	// orders submenu
	$('.jg-box-submenu')
		.append($("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-submenu-icon-orders.png' class='jg-img-submenu-icon' />"))
		.append($("<ul class='jg-list-submenu'>")
			.append($("<li class='jg-item-submenu'><a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myorders'>My Orders</a></li>"))
			.append($("<li class='jg-item-submenu'><a href='/commerce/buyside/reports/report_manager.jsp?process_id=36244034&from_hp=true&_bm_trail_refresh_=true' id='jg-submenu-myreports'>My Reports</a></li>"))
			.append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-neworder'>New Order</a></li>"))
			.append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-copyorder'>Copy Order</a></li>"))
			// .append($("<li class='jg-item-submenu'><a href='#' id='jg-submenu-export'>Export</a></li>"))
		);
	
	// new order
	$('#jg-submenu-neworder').click(function(e) {
		e.preventDefault();
		
		newTransaction();
	});
}

function transform_orderspage() {
	// toolbar
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
	
	// dropdown
	$('#jg-tool-select').html($('select[name=new_search_id]').html());
	$('#jg-tool-select').change(function() {
		var selectval = $(this).val();
		$('select[name=new_search_id]').val(selectval);
		
		$('a.list-field')[0].click();
	});
	
	// refresh button
	$('.jg-list-tool-right')
		.append($("<li class='jg-item-tool'>")
			.append($("<a href='/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true' class='jg-linkbtn jg-tool-refresh'></a>"))
		);
	
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
	$('#jg-tool-search').click(function(e) {
		e.preventDefault();
		
		$('#search').click();
	});
	
	// manage
	$('.commerce-sidebar-item').each(function(i, sbitem) {
		if ($(sbitem).text().toLowerCase().indexOf('manage') != -1) {
			$('#jg-tool-manage').attr('href', $(sbitem).attr('href'));
		}
		else if ($(sbitem).text().toLowerCase().indexOf('refine') != -1) {
			$('#jg-tool-refine').attr('href', $(sbitem).attr('href'));
		}
	});
	
	// folders
	$('#dropzone .dropTarget td[title]').each(function(i, target) {
		if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
			$('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
		}
		else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
			$('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
		}
		else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
			$('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
		}
	});
	
	// edit
	$('#jg-tool-folder-edit').click(function(e) {
		e.preventDefault();
		
		$('#edit').click();
	});
	
	// copy order
	$('#jg-submenu-copyorder').click(function(e) {
		e.preventDefault();
		
		$('#copy_order').click();
	});
	
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
	$('.jg-box-toolbar').hide();
	
	$('#document-form').appendTo('.jg-box-maincontent');
	
	// tweak originals
	// $('#sticky-actions').hide();
	$('select[name=orderType_t]').css('width', 'auto');
	$('#field_wrapper_1_visualWorkflow').css('paddingLeft', '0');
	$('#add_material').closest('.column').prev().remove();
	$('#add_material').closest('.column').css('width', 'auto');
	$('#add_material').closest('.form-element').css('paddingLeft', '6px');
	$('#add_material').closest('.form-element').prev().remove();
	
	// cust & address area
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
	$('#attr_wrapper_1_shipToAddress_html_t').css('marginTop', '35px').prependTo('.jg-order-box-address');
	custleft.find('.attr-spacer').remove();
	custright.find('.attr-spacer').remove();
	
	// Summary area
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
	
	/* EVENTS */
	$('#jg-tool-addtofav, #jg-btn-addtofav').click(function(e) {
		e.preventDefault();
		
		$('#').click();
	});
	
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
	$('body').addClass('jg-page-cartpage');
	$('#jg-topbar-title').text("Shopping Cart");
	$('title').text("Shopping Cart");					
	
	// console.log($('.cell-promotion').html());
	
	
	$('form[class=configuration-form]').appendTo('.jg-box-maincontent');
	
	$('#config-header').hide();
	
	var flowimg = $("<div class='column-layout clearfix '><div class='column label-left last' style='width:100%'><div class='form-item clearfix null' id='attr_wrapper_1_visualWorkflow'><label class='form-label' for='visualWorkflow' style='width: 100px;visibility:hidden'><span style='padding-right: 5px'>Visual Workflow</span></label><div class='form-element field-wrapper' id='field_wrapper_1_visualWorkflow' style='padding-left: 0px;'><div id='readonly_1_visualWorkflow'><img width='70%' src='/bmfsweb/zuelligpharmatest1/image/images/shoppping_cart_ready_active.png' alt='Broken Visual Workflow'></div><div id='msg_1_visualWorkflow' class='error-hover' data-action-message='' message=''></div></div></div></div></div>")
		.insertBefore('.page-tabs');
	
	// toolbar
	$('.jg-list-tool')
		.append($("<li class='jg-item-tool'>")
			.append($("<button id='btn-cart-update' class='jg-btn jg-btn-icon cart-update'></span>Update</button>"))
		)
		
	if ($('#start_over').length == 1) {
		$('.jg-list-tool')
			.append($("<li class='jg-item-tool'>")
				.append($("<button id='btn-cart-startover' class='jg-btn jg-btn-icon cart-startover'>Start Over</button>"))
			)
			.append($("<li class='jg-item-tool'>")
				.append($("<button id='btn-cart-addtoorder' class='jg-btn jg-btn-icon cart-addtoorder'>Add to Order</button>"))
			);
	}
	else if ($('#save').length == 1) {
		$('.jg-list-tool')
			.append($("<li class='jg-item-tool'>")
				.append($("<button id='btn-cart-save' class='jg-btn jg-btn-icon cart-save'>Save</button>"))
			);
	}
	
	$('.jg-list-tool').append($("<li class='jg-item-tool'>")
		.append($("<button id='btn-cart-cancelshopping' class='jg-btn jg-btn-icon cart-cancelshopping'>Cancel Shopping</button>"))
	);
	
	// tweak originals
	$('#sticky-actions').hide();
	$('#tab-material').closest('ul').hide();
	
	// add row button
	// $('#materialArrayset table').append($("<tfoot><tr><td colspan=100><button class='jg-btn-transparent addrow jg-btn-addrow'>Add Row</button></td></tr></tfoot>"));
	$('label[for=materialArraySize]').before($("<button id='jg-btn-addrow' class='jg-btn jg-btn-transparent jg-btn-icononly addrow'></button>"));
	$('#materialArraySize').parent().css('position', 'relative');
	$('#materialArraySize').closest('.attribute-label-container').css('top', '-3px').css('width', '150px');
	$('#jg-btn-addrow').closest('.attribute-label-container').css('top', '-3px').css('width', '150px');
	$('#grid-36595617').css('marginBottom', '10px');
	
	$('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table small');
	$('.tab-content button').addClass('jg-btn');
	$('.attribute-label[for=principalCode]').parent().css('marginTop', '5px');
	$('.attribute-label[for=showPrincipalFavorites]').parent().css('marginTop', '5px');
	
	// collapsible boxes
	/* var newrow = $("<div class='row row-1 clearfix'>").appendTo('#grid-36397039');
	$('#grid-36561838').closest('.column').appendTo(newrow).removeClass('column-1 column');
	$('#grid-36595617').closest('.column').removeClass('column-0 column');
	*/ 
	$('#grid-36595617').closest('.column').wrapInner($("<div class='jg-inner-column'>"));
	$('#grid-36561838').closest('.column').css('marginTop', '8px');
	
	/* EVENTS */
	$('.jg-btn-addrow').bind('click', function(e) {
		e.preventDefault();
		
		$(this).closest('table').find('a.array-add')[0].click();
	});
	$('#jg-btn-addrow').bind('click', function(e) {
		e.preventDefault();
		
		$('#materialArrayset').find('a.array-add')[0].click();
	});
	
	$('#btn-cart-update').bind('click', function(e) {
		e.preventDefault();
		
		$('#update')[0].click();
	});
	
	$('#btn-cart-addtoorder').bind('click', function(e) {
		e.preventDefault();
		
		$('#add_to_order')[0].click();
	});
	
	$('#btn-cart-startover').bind('click', function(e) {
		e.preventDefault();
		
		$('#start_over')[0].click();
	});
	
	$('#btn-cart-save').bind('click', function(e) {
		e.preventDefault();
		
		$('#save')[0].click();
	});
	
	$('#btn-cart-cancelshopping').bind('click', function(e) {
		e.preventDefault();
		
		if ($('#cancel_shopping_cart').length) {
			$('#cancel_shopping_cart')[0].click();
		}
		else {
			$('#cancel')[0].click()
		}
	});
	
	// tooltip
	adjust_tooltip();
}

function transform_reportpage() {
	$('body').addClass('jg-page-reportpage');
	$('#jg-topbar-title').text("Report Manager");
	
	$('.extra-panes').appendTo('.jg-box-maincontent');
	$('.main-pane').appendTo('.jg-box-maincontent');
	
	// toolbar
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
	
	// folders
	$('#foders .dropTarget td[title]').each(function(i, target) {
		if ($(target).attr('title').toLowerCase().indexOf('default') != -1) {
			$('#jg-tool-folder-default').attr('href', $(target).prev().find('a').attr('href'));
		}
		else if ($(target).attr('title').toLowerCase().indexOf('trash') != -1) {
			$('#jg-tool-folder-trash').attr('href', $(target).prev().find('a').attr('href'));
		}
		else if ($(target).attr('title').toLowerCase().indexOf('fav') != -1) {
			$('#jg-tool-folder-fav').attr('href', $(target).prev().find('a').attr('href'));
		}
	});
	
	$('.form-label.toolbar').hide();
	$('.refresh-date').closest('table').hide();
	$('#reportManager br').eq(0).remove();
	
	/* EVENTS */
	$('#jg-tool-report-add').click(function(e) {
		e.preventDefault();
		
		$('#add')[0].click();
	});
	$('#jg-tool-report-stylesheet').click(function(e) {
		e.preventDefault();
		
		$('#stylesheet')[0].click();
	});
	$('#jg-tool-report-update').click(function(e) {
		e.preventDefault();
		
		$('#update')[0].click();
	});
	$('.jg-tool-refresh').click(function(e) {
		e.preventDefault();
		
		$('#refresh_reporting_data')[0].click();
	});
}

/* mobile */

function mobile_newlayout() {
	var urlarr = url.split('/');
	if (urlarr[3] == "mobile" && urlarr.length == 4) {
		// $('#jg-overlay').hide();
		location.href = "/commerce/buyside/commerce_manager.jsp?bm_cm_process_id=36244034&from_hp=true&_bm_trail_refresh_=true";
		return false;
	}
	
	pagetitle = $('title').text().toLowerCase().trim();
	
	if (pagetitle == '') {
		setTimeout(function() {
			mobile_newlayout();
		}, 1000);
		
		return;
	}
	
	$('#jg-overlay').hide();
	$('html').addClass('jg-mobilelayout');
	
	if (pagetitle == 'login') {
		mobile_loginpage();
	}
	else if (pagetitle == 'zuellig pharma order process' || pagetitle == 'zuellig pharma products') {
		$('#tabs').before($("<div class='jg-box-workflow'>")
			.append($("<img src='' class='jg-img-workflow' />"))
		);
		
		if (pagetitle == 'zuellig pharma order process') {
			if ($('a[href=#tab-draftOrder]').hasClass('active')) {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/order_created_active.png');
			}
			else if ($('a[href=#tab-customerSearch]').hasClass('active')) {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/customer_selected_active.png');
			}
			else if ($('a[href=#tab-pricing]').hasClass('active')) {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/order_submitted_active.png');
			}
		}
		else if (pagetitle == 'zuellig pharma products') {
			$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/shoppping_cart_ready_active.png');
			
			$('#PastOrders, #CurrentCustFav').parent().addClass('jg-box-table');
		}
		
		// events
		$('.tab-link').click(function() {
			if ($(this).attr('href') == '#tab-draftOrder') {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/order_created_active.png');
			}
			else if ($(this).attr('href') == '#tab-customerSearch') {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/customer_selected_active.png');
			}
			else if ($(this).attr('href') == '#tab-pricing') {
				$('.jg-img-workflow').attr('src', '/bmfsweb/zuelligpharmatest1/image/images/order_submitted_active.png');
			}
			
			mobile_adjustcontenttop();
		});
		
		mobile_adjustcontenttop();
	}
}

function mobile_loginpage() {
	var imglogin = $("<img src='https://zuelligpharmatest1.bigmachines.com/bmfsweb/zuelligpharmatest1/image/images/dk-login-logo.png' class='jg-login-logo'>")
		.prependTo('#login-form')
		.after("<span class='jg-login-welcome'>Welcome</span>");
	
	$('label[for=username], label[for=psword]').hide();
	$('#forgotpassword').insertAfter($('label[for=psword]').next());
	$('footer').hide();
}

function mobile_adjustcontenttop() {
	setTimeout(function() {
		$('#header').parent().css('paddingTop', $('#header').outerHeight()).css('margin', '0');
	}, 500);
}

/* monic's script */
function adjust_tooltip() {
	$('td.cell-contractBonus').attr('tooltip', function() {
		return $(this).text()
	}).html(function() {
		if ($(this).text().trim() != '') {
			return '<i class="fa fa-search" aria-hidden="true" style="padding:15px"></i>';
		} else {
			return '';
		}
	
	}).mouseenter(function() {
		var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Ordered Qty</th><th style="border: 1px solid #999;padding:5px;">Bonus Material</th><th style="border: 1px solid #999;padding:5px;">Material Desc</th></tr></thead>';
		var x = $(this).attr('tooltip').trim();
		if (x != "") {
			var col = x.trim().split(",");
			if (col.length > 0) {
				table += "<tbody>";
				col.forEach(function(row) {
					table += '<tr>';
					row = row.trim().split('-');
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
		if ($(this).attr('tooltip').trim() != '') {
			$('#myModal .hover-modal-content').html(table);
			$('#myModal').css("display", "block");
		}
		$('.cell-contractBonus').mouseleave(function() {
			$('#myModal').css("display", "none");
		});
	});
	
	$('td.cell-promotion').attr('tooltip', function() {
		return $(this).text()
	}).html(function() {
		if ($(this).text().trim() != '') {
			return '<i class="fa fa-search" aria-hidden="true" style="padding:15px"></i>';
		} else {
			return '';
		}
	
	}).mouseenter(function() {
		var table = '<table style="text-align:center;width:100%;border-collapse: collapse;"><thead style="padding:5px;font-weight:bold"><tr style="background-color:#EEE;"><th style="border: 1px solid #999;padding:5px;">Ordered Quantity</th><th style="border: 1px solid #999;padding:5px;">Contract Price</th></tr></thead>';
		var x = $(this).attr('tooltip').trim();
		if (x != "") {
			var col = x.trim().split(",");
			if (col.length > 0) {
				table += "<tbody>";
				col.forEach(function(row) {
					table += '<tr>';
					row = row.trim().split('-');
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
		if ($(this).attr('tooltip').trim() != '') {
			$('#myModal .hover-modal-content').html(table);
			$('#myModal').css("display", "block");
		}
		$('.cell-promotion').mouseleave(function() {
			$('#myModal').css("display", "none");
		});
	});
	
	$('td.cell-contractBonus, td.cell-promotion')
		.hover(function(e) {
		   e.preventDefault();
	   	})
	   .mousemove(function(e) {
			$('#myModal').css('top', e.pageY - $(document).scrollTop() + 10 + 'px').css('left', e.pageX - $(document).scrollLeft() + 10 + 'px');
		});
}
	
})( jQuery );