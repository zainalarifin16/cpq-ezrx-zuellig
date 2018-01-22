/*Custom JavaScript
* Author : Monica
* Date : 13 Feb 2017
*/

/*Order page left pane */
$('.extra-panes').not("table").click(function(e){
	var target = $(e.target);
	if(target.is("div") && e.target.hasAttribute("class"))
	{
		var x = $('.extra-panes').css("margin-left");
		x = x.replace("px","");
		if(x<0)
		{
			$('.extra-panes').css("margin-left","0px");
			$('div.main-pane').css("width","80%");
		}
		else
		{
			$('.extra-panes').css("margin-left","-150px");
			$('div.main-pane').css("width","95%");
		}
	}
});