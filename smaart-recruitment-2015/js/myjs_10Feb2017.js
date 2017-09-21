!(function($){
	// regular js
	var winWt = $(window).width(),
    	winHt = $(window).height();

    function valignMiddle(obj){
	  var objHt = $(obj).innerHeight();
	  var childHt = $(obj).find('img').height();
	  var htDiff = objHt - childHt;
	  if( htDiff>0 ){
	    $(obj).css({
	      'padding-top': htDiff/2
	    })
	  }
	}

	function equalHts(obj){
	  var maxHt = 70;
	  $(obj).each( function(){
	     var ht = $(this).height(); 
	     if( ht>maxHt ){
	      maxHt = ht;
	     }
	  });
	  $(obj).height(maxHt);
	}

	function formatDate( myDate )
	{
		var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
		var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
		var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";

		return myDay + "<br>" + myMonth;
	}

	// jquery
	$(function(){
		
		$('link[href="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();
			
		if ($('#site-topnav .user-loggedIn').length) {
			$('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
		}	

		var currentPage = window.location.pathname.toLowerCase();

		// remove empty li's on the system pages. 
		$("#side-left li:empty").remove();

		// remove empty left side bar
		if ($('#prefix_left-navigation').children().length == 0) {
			$('#prefix_left-navigation').remove();
		}
		if ($('#side-left').children().length == 0) {
			$('#side-left').remove();
		}
		
		/* Adding Bootstrap Classes */
		//$('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
		$('#dynamic-side-right-container, #job-side-column, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
		if ( $.trim($('#dynamic-side-left-container, #side-left').html()).length ) {
			$('#content-container').addClass('container-fluid hs_section');
			$('#dynamic-side-left-container, #side-left').addClass('col-sm-3 hidden-xs');
	    	$('#dynamic-content, #content-container #content').addClass('col-sm-8 col-sm-offset-1 col-md-offset-0 col-xs-12');
	    }else{
	    	$('#content-container').addClass('container-fluid hs_section');
	    }
		$('#job-dynamic-container').addClass('container-fluid hs_section');
		$('#job-dynamic-container #content').addClass('col-xs-12');

		$('.dynamic-content-holder .page-head').appendTo($('.inner-banner .row div.col-md-12'));
  		$('#job-ad-header.page-head').appendTo($('.inner-banner .row div.col-md-12'));

  		$('#content-container #content h1:first').appendTo($('.inner-banner .row div.col-md-12')).wrap('<div class="page-head"/>');
  		$('#CV-content h1.CV-Builder-title').appendTo($('.inner-banner .row div.col-md-12'));

  		if( $('#job-ad-header').length ){
  			$('body').addClass('job-ad-theme');
  			var emptype = $('.employmentType').text() + '-jobtype';
  			var emptype = emptype.replace(/ +/g, "");
  			$('body').addClass( emptype.toLowerCase() );
  		}
  		if( $('.landing-content').length ){
  			$('body').addClass('landing-page');
  		}



		// form elements style
		$('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
		$('input[type=text]').addClass('form-control');
		$('input[type=submit]').addClass('btn btn-primary');
		$('.mini-new-buttons').addClass('btn btn-primary');
		$('input[type=reset]').addClass('btn btn-default');

		// Repsonsive image
		$('.dynamic-content-holder img').addClass('img-responsive');

		// Responsive table
		$('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');

		// Convert top menu to Boostrap Responsive menu
		$('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
		$('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
		$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
		$('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
		$('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle','dropdown').addClass('dropdown-toggle');
		$('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

		// add placeholder for search widget text field
		$('#keywords1').attr('placeholder','Enter Job Keywords');

		// add active class to links.
		$("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
		$("li.active li.active").parent().closest("li.active").removeClass("active");
		
		// add last-child class to navigation 
		$("#prefix_navigation > ul > li:last").addClass("last-child");
		
		// add btn style
		$(".backtoresults a").addClass("btn btn-default");
		$(".apply-now-link a").addClass("btn btn-primary");
		$(".job-navbtns a").addClass("btn btn-default");
		
		//.left-hidden show
			if((document.URL.indexOf("/advancedsearch.aspx") >= 0)){
				$(".left-hidden").css( "display", "block" );
			}
			if((document.URL.indexOf("/advancedsearch.aspx?") >= 0)){
				$(".left-hidden").css( "display", "none" );
			}
			if((document.URL.indexOf("/member/createjobalert.aspx") >= 0)){
				$(".left-hidden").css( "display", "block" );
			}
			if((document.URL.indexOf("/member/login.aspx") >= 0)){
				$(".left-hidden").css( "display", "block" );
			}
			if((document.URL.indexOf("/member/register.aspx") >= 0)){
				$(".left-hidden").css( "display", "block" );
			}

		// Contact - Google map
		$( "#footer" ).prepend( $( "#contact-map" ) );

		
		// generate select navigation from sidebar Dynamic menu
		$("#dynamic-content").convertNavigation({
			title: "Related Pages", 
			links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
		});
		
		// generate actions button on Job Listing page
		$(".job-navbtns").convertButtons({
			buttonTitle: "Actions&hellip;", 
			title: "Please choose&hellip;", 
			links: ".job-navbtns a"
		});
		
		// generate filters button on Job Listing page
		$(".job-navbtns").convertFilters({
			buttonTitle: "Filters&hellip;", 
			filteredTitle: "Applied Filters", 
			title: "Please choose&hellip;", 
			filtered: ".search-query p", 
			list: "ul#side-drop-menu", 
			excludeFromList: "#AdvancedSearchFilter_PnlCompany"
		});

		/* System Page Forms */
		if (currentPage == "/member/createjobalert.aspx") {
			setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
			Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () { 
				$('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
				$('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
			});
			$('body').addClass('fullwidth-formpage');
		}
		$(document).ajaxComplete(function() {
			$('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
			$('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');

			$('#divSalaryFrom > span').text('From');
			$('#divSalaryTo > span').text('To');
		});	
		$('#salaryID').change(function() {
			$(document).ajaxComplete(function() {
				$('#divSalaryFrom > input').addClass('form-control');
				$('#divSalaryTo > input').addClass('form-control');
			});		
		});
		function SalaryFromChange1() {
			$(document).ajaxComplete(function() {
				$('#divSalaryTo1 > input').addClass('form-control');
				$('#divSalaryFrom1 > input').addClass('form-control');
			});		
		}
		
		if (currentPage == "/member/register.aspx") {
			$(".uniForm").addClass("border-container");
		}
		if (currentPage == "/member/createjobalert.aspx") {
			$(".uniForm").addClass("border-container");
		}

		// Adding header tag in job search result		
		$('.switch_options .defaultListingView').click( function(){
			$('.inner-banner .col-md-12').html('<div class="page-head sys-title"><h1>View All Jobs</h1></div>');	
		});
		$('.switch_options .MapListingView').click( function(){
			$('.inner-banner .col-md-12').html('<div class="page-head sys-title"><h1>'+ $('#mapResultsCount').html() +'</h1></div>');	
			$('#mapResultsCount').hide();
		});

		if( $('.defaultListingView.selected').length ){
			$('.inner-banner .col-md-12').html('<div class="page-head sys-title"><h1>View All Jobs</h1></div>');	
		}
		if( $('.MapListingView.selected').length ){
			$('.inner-banner .col-md-12').html('<div class="page-head sys-title"><h1>'+ $('#mapResultsCount').html() +'</h1></div>');	
			$('#mapResultsCount').hide();
		}
		
		//Job search page changes
		if( $('#ctl00_ContentPlaceHolderLeftNav_pnlJobSearchFilter').length ){
			//Adding heading on jobsearch filter sidebar
			$('#ctl00_ContentPlaceHolderLeftNav_pnlJobSearchFilter').prepend('<h3 class="side-heading">Filter Jobs</h3>');

			//adding class on filter head click
			$('#side-drop-menu >li >a').click( function(){
				$(this).toggleClass('closed');	
				return false;
			});
			//adding class to empty filter
			$('#side-drop-menu >li').each( function(){
				if( !$(this).find('a').length ){
					$(this).addClass('empty');	
				}
			});

			//changing the icon in job result page
			$('.switch_options .fa-bars').addClass('icon-list-2').removeClass('fa fa-bars');
			$('.switch_options .fa-map-marker').addClass('icon-map-view').removeClass('fa fa-map-marker');
			

			//on the basis of work type, adding class to change the color theme of job list
			$('.job-holder').each(function(){
				job = $(this);

				var wt_ele = job.find('.jxt-result-worktype').text();
				if( wt_ele == 'Casual' ){
					workTypeClass = 'casual';
				}else if( wt_ele == 'Contract' ){
					workTypeClass = 'contract';	
				}else if( wt_ele == 'Full Time' ){
					workTypeClass = 'fulltime';
				}else if( wt_ele == 'Part Time' ){
					workTypeClass = 'parttime';
				}else{
					workTypeClass = 'temporary';
				}	
				job.addClass(workTypeClass);

				//changing position of job date
				var dt = job.find('.job-rightlinks .dateText').text();
				job.find('.locandsalary').append(job.find('.job-rightlinks .dateText'));
				job.find('.dateText').text('Listed '+ dt.replace(', ', ' '));

				//adding read more link
				job.append('<a href="'+ job.find('.job-toplink a').attr('href') +'" class="more-link">Read More</a>');
			});

			// removing the text and the bracket and replacing with just 'X'
			$('.search-query .red-remove').each( function(){
				var queryRem = $(this);
				var queryRemAnchor = queryRem.find('a');
				queryRem.html('');
				queryRem.append(queryRemAnchor);
				queryRem.find('a').text('X');
			});



			

		}

		//job detail page
		function formatDate2(jobDate){
			var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			var d = jobDate.split(' ')[0];
			var a = d.split('/');
			var job_day = a[0];
			var job_month = monthList[a[1]-1];
			var job_year = a[2];
			var job_date =  "Listed "+ job_day + " " + job_month + " " +job_year;
			
			return job_date;
		}
		if( $('.job-ad-head-meta').length ){
			$('.job-ad-head-meta .datePosted').text(formatDate2($('.job-ad-head-meta .datePosted').text()));
		}

		if( winWt<992 ){
			$('.jobdetail-top').insertAfter('#job-ad-template');
		}

		


		//changing the widget search text
		$('#professionID1 option:contains("- All Classifications -")').text('Category');
		$('#workTypeID1 option:contains("- All Work types -")').text('Job Type');
		$('#locationID1 option:contains("- All Locations - ")').text('Location');

		if( !$('.uniForm select').parent().hasClass('custom-select') ){
			$('.uniForm select').parent().addClass('custom-select');
		}
		if( $('.form-line select').length ){
			$('.form-all select').parent().addClass('custom-select');	
		}
		if( !$('.map-address select').parent().hasClass('custom-select') ){
			$('.map-address select').parent().addClass('custom-select');
		}

		if( $('.form-line').length ){
			$('.form-line').each( function(){
				if( $(this).find('input, select, textarea').length < 1){
					$(this).addClass('noformating');
				}
			});
		}

		$('textarea.form-control, input[type="checkbox"], input[type="radio"]').parents('.form-line, .ctrlHolder').addClass('noformating');
		

		$('input[type="file"]').parent().addClass('fb-button');
		$('input[type="file"]').parent().append('<span class="fb-button-fake">Choose File</span>');
		$('input[type="file"]').change( function(){
			var fileVal = $(this).val();
			$(this).parent().find('.fb-button-fake').text(fileVal);
		});


		//always load the page from the top
		if($(window).scrollTop()>0){
			$("html, body").animate({
				scrollTop: 0
			}, 100);
		}
		
	});
	
	// Resize action
	/*$(window).on('resize', function() {

		var wi = $(this).width();

		// Mobile & Tablet
		if ( wi <= 992 ) {
			//$('#dynamic-side-left-container').before($('#dynamic-content'));
			//$('#side-left').before($('#content'));    		
			$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
		}
		//  Desktop
		else {
			//$('#dynamic-side-left-container').after($('#dynamic-content'));
			//$('#side-left').after($('#content'));
			$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
		} 

	});*/
	
	$(document).ready(function() {

		setTimeout( function(){
			$('#loading-block').fadeOut();
		},800);
		
	    //innerpages
		if( $('.innerpage-header').length ){
		  $('body').addClass('innerpage');
		  if( $(window).width()<992 ){
		   $('#widget-search').addClass('stickyMobile');
		   $('.form-textbox').attr('placeholder','KeyWords');
		  }
		}

		//$('.flat-image .item .image-wrap').css('min-height',$('.flat-image .item .image-wrap').innerWidth());
		$('.flat-image .item .image-wrap img').wrap('<div class="tbc" />');
		
		
		//valignMiddle('.flat-image .item .image-wrap');
  
		if( winWt >= 992 ){
		    equalHts('.item-wrap');
		}
		if( $('.page-head').attr('data-extraClass')!='' ){
		    $('.inner-banner').addClass( $('.page-head').attr('data-extraClass') );
		}

		$('.video-blocks a.icon-play, .tv-smaart a.icon-play').click( function(){
		    $(this).ekkoLightbox();
		    return false;
		});

		/*// Resize action
		var $window = $(window);
			// Function to handle changes to style classes based on window width
			function checkWidth() {
			if ($window.width() < 992) {
				$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');	
				}
		}
			// Execute on load
			checkWidth();			
			// Bind event listener
			$(window).resize(checkWidth);*/
		
      String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
      };
		// Latest Jobs widget
		$("#jobListPermanent").includeFeed({
			baseSettings: { rssURL: ["/job/rss.aspx?search=1&worktypeid=2"] }, 
			templates: { 
				itemTemplate: "<div class='item'><div class='rss-item-title'><strong>{{title}}</strong></div><div class='slide-entry'><p>{{description}}</p></div><a class='more-link' href='{{link}}' title='Read more on {{title}}'>Read more</a></div>"
			},
			complete: function(){
				if ($(this).children().length > 1){ 
					$(this).children().each( function(){
						var itemText = $(this).find('.slide-entry p').text();	
						var truncText = itemText.trunc(130);
						$(this).find('.slide-entry p').html(truncText);
					});

					$(this).owlCarousel({
				        items:1,
				        nav: false,
				        smartSpeed: 500,

				    });
				}
			}
		});
		$("#jobListContract").includeFeed({
			baseSettings: { rssURL: ["/job/rss.aspx?search=1&worktypeid=4"] }, 
			templates: { 
				itemTemplate: "<div class='item'><div class='rss-item-title'><strong>{{title}}</strong></div><div class='slide-entry'><p>{{description}}</p></div><a class='more-link' href='{{link}}' title='Read more on {{title}}'>Read more</a></div>"
			},
			complete: function(){
				if ($(this).children().length > 1){ 
					$(this).owlCarousel({
				        items:1,
				        nav: false,
				        smartSpeed: 500,
				    });
				}
			}
		});


		// newsList
		$('#newsList').includeFeed({
			baseSettings: { rssURL: ["/newsrss.aspx"]}, 
			templates: { 
				itemTemplate: "<div class='item'><h3 class='rss-item-title'>{{title}}</h3><div class='slide-entry'><p>{{description}}</p></div><a class='btn' href='{{link}}' title='Read more on {{title}}'>Read more</a></div>"
			},
			complete: function(){
				if ($(this).children().length > 1){ 
					$(this).owlCarousel({
				        items:1,
				        nav: false,
				        smartSpeed: 500,
				    });
				}
			}
		});


//		$('select.navigation').wrap('<div class="custom-select relNav-wrap"/>');

		
		// Equal Height	
		$.fn.eqHeights = function(options) {
	
			var defaults = {child: false};  
			var options = $.extend(defaults, options); 
			var el = $(this);
			if (el.length > 0 && !el.data('eqHeights')) {
				$(window).bind('resize.eqHeights', function() {
					el.eqHeights();
				});
				el.data('eqHeights', true);
			}
			if( options.child && options.child.length > 0 ){
				var elmtns = $(options.child, this);
			} else {
				var elmtns = $(this).children();
			}
		
			var prevTop = 0;
			var max_height = 0;
			var elements = [];
			elmtns.height('auto').each(function() {
		
				var thisTop = this.offsetTop;
				if (prevTop > 0 && prevTop != thisTop) {
					$(elements).height(max_height);
					max_height = $(this).height();
					elements = [];
				}
				max_height = Math.max(max_height, $(this).height());
				prevTop = this.offsetTop;
				elements.push(this);
			});
	
			$(elements).height(max_height);
		};
	
		// Equal Height - Usage
		$('.service-holder').eqHeights();

		// if there is a hash, scroll down to it. Sticky header covers up top of content.
		if ( $(window.location.hash).length )
		{
			$("html, body").animate({
				scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
			}, 100);
		}
		
				
	});//End of document ready function

	$(window).load(function(){
		var owl = $('.owl-carousel');
	    /*owl.owlCarousel({
	        items:1,
	        loop: true,
	        nav:false,
	        autoplay:true,
	        autoplayTimeout:7000,
	        //animateOut:'fadeOut',
	        onTranslated: function(){
	            var r = owl.find('.active');
	            
	            if( r.find('.item').hasClass('bg-2') ){
	               $('#header').addClass('t2'); 
	            }else{
	               $('#header').removeClass('t2');  
	            }
	        }
	    });*/
		// Homepage banner ramdom slide showing
		var xSlideNo = Math.floor((Math.random() * 3)); // get ramdom number between 1 - 3

	    $('.home_banner .item').eq(xSlideNo).addClass('current');
	    if( xSlideNo > 1 && $('.homepage-header').length ){
	    	$('#header').addClass('t2'); 
	    }
	    
	    $(".owl-responsive").owlCarousel({
	        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
			smartSpeed: 500,
	        responsive:{
	            0:{
	                items:1,
	                nav:true,
	            },
	            992:{
	                items:3,
	                dots:false,
	            }
	        }
	    });

	    $(".owl-responsive-4").owlCarousel({
	        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
			smartSpeed: 500,
	        responsive:{
	            0:{
	                items:1,
	                nav:true,
	                dots:true,
	            },
	            992:{
	                items:4,
	                nav:false,
	                dots:false,
	            }
	        }
	    });
	    $(".owl-responsive-4x").owlCarousel({
	        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
	        dots:false,
	        nav:true,
			smartSpeed: 500,
	        responsive:{
	            0:{
	                items:1
	            },
	            992:{
	                items:4
	            }
	        }
	    });
	    

	    if( $(window).width()>992 ){
	        skrollr.init({
	            forceHeight: false,
	            mobileCheck: function(){
	              return false;
	            }
	        });
	    }	

	    //about page gallery section aligning height of the image
		if( $('.photoset').length ){
			var bHt = $('.xs-big').outerHeight();
		//	console.log(bHt);
			if( bHt>20 ){
				if( winWt>991 ){
					$('.xs-sm').height(bHt/2 - 35);	
				}else{
					$('.xs-sm').height(bHt/2 - 10);	
				}
			}else{
				if( winWt>991 ){
					$('.xs-sm').height(233);	
				}
			}
		}


	}); //End of window load function
	

	$(window).scroll(function(){
	  var st = $(window).scrollTop();
	  
	  if( $('.home_banner').length && $(window).width()>=992 ){

	    if( st > 70 ){
	      $('.homepage-header, #widget-search').addClass('sticky');
	    }else{
	      $('.homepage-header, #widget-search').removeClass('sticky');
	    }

	  }
	  else if( $('.home_banner').length && $(window).width()<992 ){
	    if( st >10 && st<320 ){
	      $('.homepage-header').addClass('stickyMobile');
	      $('#widget-search').removeClass('stickyMobile');
	      $('.form-textbox').attr('placeholder','Enter Job KeyWords');
	      $('#header').css('padding-top',110);
	    }else if( st >=320 ){
	      $('.homepage-header, #widget-search').addClass('stickyMobile');
	      $('.form-textbox').attr('placeholder','KeyWords');
	      $('#header').css('padding-top',223);
	    }else{
	      $('.homepage-header, #widget-search').removeClass('stickyMobile');
	      $('.form-textbox').attr('placeholder','Enter Job KeyWords');
	      $('#header').css('padding-top',110);
	    }
	  }

	  //innerpages
	  if( $('.innerpage-header').length && $(window).width()>=992 ){
	    if( st>0 ){
	      $('.innerpage-header').addClass('sticky-sm'); 
	      $('#header .inner-banner').addClass('less-pad');
	    }else{
	      $('.innerpage-header').removeClass('sticky-sm');
	      $('#header .inner-banner').removeClass('less-pad'); 
	    }
	  }

	}); //End fo window scroll function
	
	// Resize function
	var timer;
	function resizeFunc(){
		//homepage
		if( $('.home_banner').length && $(window).width()>=992 ){
			$('.homepage-header, #widget-search').removeClass('stickyMobile');
	      	$('.form-textbox').attr('placeholder','KeyWords');
		}
		else if( $('.home_banner').length && $(window).width()<992 ){
		  	$('.homepage-header, #widget-search').removeClass('sticky');
		}

		//innerpages
	  if( $('.innerpage-header').length ){
	    if( $(window).width()<992 ){
	      $('#widget-search').addClass('stickyMobile');
	      $('.form-textbox').attr('placeholder','KeyWords');
	    }else{
	      $('#widget-search').removeClass('stickyMobile');
	      $('.form-textbox').attr('placeholder','Enter Job KeyWords'); 
	    }
	  }

	  //about page gallery section aligning height of the image
		if( $('.photoset').length ){
			var bHt = $('.xs-big').outerHeight();
			if( bHt>0 ){
				if( $(window).width()>991 ){
					$('.xs-sm').height(bHt/2 - 35);	
				}else{
					$('.xs-sm').height(bHt/2 - 10);	
				}
			}
		}

	}

	$(window).resize(function(){
	  if(timer) {
	    window.clearTimeout(timer);
	  }

	  timer = window.setTimeout(function() {
	      // actual callback
	      resizeFunc();
	  }, 100);

	});
	
})(jQuery);

