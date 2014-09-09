var SideBarMenu = {
	settings: {
		selected: 0,
		slideSpeed: 100,
		menuRoot: '#side-bar-menu',
	},
	init: function (settings) {
		if(typeof settings !== 'undefined'){
			for(var key in settings)
			{
				if(this.settings.hasOwnProperty(key))
					this.settings[key] = settings[key];
			}
		}
		var menuRootSelector = $(this.settings.menuRoot);
		//menuRootSelector.children('li').children('a').append();
		var selectedParentMenuItem = menuRootSelector.children('li:eq('+ this.settings.selected +')');
		selectedParentMenuItem.addClass('active');

		$('#side-bar-menu > li').click(function () {
			if(!$(this).hasClass('open')){
				$('#side-bar-menu li.open').removeClass('open').children('a').find('i').removeClass('icon-chevron-down').parent().siblings('ul').slideUp('fast');
				$(this).addClass('open').children('a').find('i').addClass('icon-chevron-down').parent().siblings('ul').slideDown('fast');
			}
		});
	}
};

$(document).ready(function () {

		var barChartData = {
			labels : ["January","February","March","April","May","June","July","August","September","October","November","December"],
			datasets : [
				{
					fillColor : "rgba(102, 153, 51, 0.7)",
					strokeColor : "rgba(220,220,220,1)",
					data : [2100,1340,2443,2340,905,3432,4010,1604]
				}
			]
			
		};

		var options = {
			scaleOverlay : true

		};


	setTimeout(function(){
		$('.badge').velocity({  opacity: 1 }, { duration: 200, display: 'block' }).velocity(
  {  left: 2 }, 
  { loop: 5, duration: 100 }
);
	}, 1000);

	$('#messages').click(function () {
		if($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
			$(this).parent().find('.marker').velocity({  height: 0 }, { duration: 200, display: 'none' }); 
			//$('#hidden-content').velocity("transition.perspectiveRightOut"); 
			$('#hidden-content').velocity({  right: -300 }, { duration: 200, display: 'none'}); 
		}else{
			$(this).parent().addClass('open');
			$(this).parent().find('.marker').velocity({  height: 10 }, { duration: 200, display: 'block' }); 
			//$('#hidden-content').velocity({ right: 0 }, { duration: 200, display: 'block'  }); 
			$('#hidden-content').css({right: '0px'});
			$('#hidden-content').velocity("transition.perspectiveRightIn"); 
			$(this).find('.badge').velocity({  opacity: 0 }, { duration: 200, display: 'none' }); 
		}

	});

	$('#alerts').click(function () {
		if($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
			$(this).parent().find('.marker').velocity({  height: 0 }, { duration: 200, display: 'none' });
			//$(this).parent().find('.header-dropdown').velocity("fadeOut", 150);
			$(this).parent().find('.header-dropdown').velocity("transition.flipXOut", {stagger:false});
		}else{
			$(this).parent().addClass('open');
			$(this).parent().find('.marker').velocity({  height: 10 }, { duration: 200, display: 'block' }); 
			//$(this).parent().find('.header-dropdown').velocity("fadeIn", 350);
			$(this).parent().find('.header-dropdown').velocity("transition.flipBounceXIn", {stagger:false});
			$(this).find('.badge').velocity({  opacity: 0 }, { duration: 200, display: 'none' }); 
		}

	});	

	$('.collapse-control').click(function () {
		var self = this;
		if($(this).parent().hasClass('closed')){
			$(this).parent().parent().find('.section-body').velocity("slideDown",
				function() {
					$(self).parent().removeClass('closed');
					$(self).find('i').removeClass('icon-chevron-down');
				  $(self).closest('.section').find('.panel').velocity("fadeIn", 150);
				},
				 { duration: 200, easing: "linear" }); 
		}else{
			//$(this).parent().find('.section-body').velocity({  height: 0 }, { duration: 200, display: 'none' }); 
			$(this).parent().parent().find('.section-body').velocity("slideUp", 
				function() {
					$(self).parent().addClass('closed');
					$(self).find('i').addClass('icon-chevron-down');
				  $(self).closest('.section').find('.panel').velocity("fadeOut", 100);
				},
				{ duration: 500, easing: "linear" });


			}		
	});

	$("#logout").colorbox({inline:true, width:"300px"});
	$("#terminate").colorbox({inline:true});
	$(".datepicker").datepicker();

	//SideBarMenu.init({selected: 0});

		var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData, options);

});