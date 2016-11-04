var  weboCommanMethod = function(){	
	this.maxWidth=  function(ele){
		var max = -1;
		$(ele).each(function(){
			var h = $(this).width();
			max = h > max ? h : max;
		});
		return max;
	}, 	
	this.setWidth= function(ele){
			if($(ele).length !=0 && $(ele)!= null){
			var ht = this.maxWidth(ele);
			$(ele).each(function(){
				$(this).css("height",ht);
			});	
		}
	},
	this.setWindowHeight= function (ele){
		var wHt = $(window).outerHeight(true);
		$(ele).css("height",wHt);
		if(ele == ".videoWrap"){
			$(ele).find(".dispTable").css("height",wHt);
		}		
	},	
	this.setProportionalHeight= function (ele){
		var wt = $(ele).width();
		var per = (wt*100/428);
		var ht =  (284*per/100);
		$(ele).each(function(){
				$(this).css("height",ht);
		});			
	}
}	

$(document).ready(function(e){
	//setTeamHeight();
    // function used to test IE browser
    function iedetect(v) {
        var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
        return r.test(navigator.userAgent);
    }

	var weboniseApp = new weboCommanMethod() || {};
    
	weboniseApp.setWidth(".workList li");
	
	$(window).on("resize",function(){
		weboniseApp.setWidth(".workList li");
		//setTeamHeight();		
	});	

	/**
	 * Function used to scroll window 
	 */

    
    if (window.location.pathname == '/drupal8/contact') {
          $(".navbar-default").css('background', '#000')
          $(".navbar-default").css('z-index', '100')
            //do something
      } else {
          
          	$(window).scroll(function(){	
		if($(this).scrollTop() > "300"){
			$("header").addClass("fixedHeader").css("background-color","rgba(37,41,46,0.4)");
		}if($(".fixedHeader").scrollTop() > "400"){
			$(".fixedHeader").css("background-color","rgba(37,41,46,0.6)");
		}if($(this).scrollTop() > "500"){
			$(".fixedHeader").css("background-color","rgba(37,41,46,0.8)");
		}if($(this).scrollTop() > "550"){
			$(".fixedHeader").css("background-color","rgba(37,41,46,1)");
		}if($(this).scrollTop() <= "200"){			
			$(".fixedHeader").css("background","none").removeClass("fixedHeader");
		}
	});
          
           }
    
       var bgimage = $(".img-responsive").attr('src');
    
    $('.views-field-field-hero-image').css('background', 'url(' + bgimage + ')');
    $('.views-field-field-hero-image').css('background-size', 'cover');
    $('.views-field-field-hero-image').css('background-position', 'center');
    $('.view-blog-hero .views-field-field-hero-image .img-responsive').css('display', 'none');
    $('.view-landing-page-hero .views-field-field-hero-image .img-responsive').css('display', 'none');


	if($('select').length == 1){
		$('select').selectric({
			disableOnMobile: false,
			onChange:function(element) {
				var _this = $(this);
				checkSelectedIndex(element,_this);	
				$("#helpList").change();	  	  						
			},
			onOpen:function(element){	
				var _this = $(this);
				checkSelectedIndex(element);
				$("#helpList").change();							
			}
		});
	}	

	/**
	 * Function used for showing tooltip on image when hover on adderess list
	 */
	$(".addressList li").hover(
		function(){
			var tooltip = $(this).data("target-tooltip");
			$("."+tooltip).addClass("active");					
		},
		function(){
			var tooltip = $(this).data("target-tooltip");			
			$("."+tooltip).removeClass("active");
		}
	);

	/**
	 * function used for showing tooltip when hover on image map icon
	 */
	$(".toolTipWrapper").hover(function(){
		$(this).addClass("active");		
	},function(){
		$(this).removeClass("active");		
	});

	/**
	 * Used to show uploaded file name 
	 */
	$(".customFileLabel input[type='file']").on("change",function(e){
		var $this = $(this);
		var curInput = ($this.val()) ? $(this).val() : "No file chosen";
		var objRE = new RegExp(/([^\/\\]+)$/);    
		var strName = objRE.exec(curInput); 
		$(this).parents(".controls").find(".inputFileStatus")(strName[0]);
	});	

	/**
	 * Used to show active list category.
	 */
	$(".blogListCat ul li ").on("click",function(e){
		if(! ($(this).hasClass("listTitle") && $(this).hasClass("caseStudyCat"))){
			$(this).parent().find("li").removeClass("active");
			$(this).addClass("active");
		}		
	});

	/**
	 * function used to advanced slideshow when click on current active slide
	*/
	$(document).on("click",".cycle-slide-active",function(){    	
    	$(this).parents('.cycle-slideshow').cycle('next');
    });


    /**
     * Used to show and hide menu on mobile
     */
	$(".menuBtn").on("click",function(){
		if($(this).hasClass("menuActive")){
			$("body").removeClass("headerMenuActive");
			$(this).removeClass("menuActive");
			$($(this).data("target")).fadeOut();
		}else{
			$("body").addClass("headerMenuActive");
			$(this).addClass("menuActive");
			$($(this).data("target")).fadeIn();
		}
	});

    /**
     * Used to show on home page on mobile view
     */

    $(".serviceType li a").on("click",function(e){
        if(!$(this).parents(".serviceTab").hasClass("serviceTab")){
            var dest = $(this).attr("href");
            $('html,body').animate({
                scrollTop: $(dest).offset().top - 80
            },1000);
        }else{
            $(this).parents("ul").find("li").removeClass("active");
            $(this).parent().addClass("active");
            $(".tabContent").removeClass("activeTab");
            $($(this).attr("href")).addClass("activeTab");
            weboniseApp.setWidth(".workList li");
        }
        e.preventDefault();
    });

    if($(".fancybox-media").length >= 1){
    	$('.fancybox-media').fancybox({
           openEffect  : 'none',
           closeBtn: 'true',
           autoSize: 'true',  
           width: '100%',
           height: '100%',         
           helpers : {
               media : {}
           }
       });
    } 	

	/** For maintaing video ratio with respect to the width of window.
	  *	mobile screens < 800, just show an image. Mobile screens don't support autoplaying videos, or for IE.
	  */	
	if('ontouchstart' in window){
		$("body").addClass("touchDevice");
	} 
	if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {
		(adjSize = function() { 			
			$width = $(window).width();
			$height = $(".videoWrap").height(); 			
			var vdoPoster = $('.videoWrap').data("video-poster");
			
			// set background image on mobile devices
			$('.videoWrap .videoContainer').css({
				'background-image' : 'url('+vdoPoster+')',
				'background-size' : 'cover',
				'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+vdoPoster+'",sizingMethod="scale")',
				'-ms-filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+vdoPoster+"',sizingMethod='scale')"
			});
			
			// Hide video
			$('.videoWrap video').hide();			
		})(); 		
		$(window).resize(adjSize);
	}
	else {
		// Wait until the video meta data has loaded
		$('.videoWrap video').on('loadedmetadata', function() {			
			var $width, $height, 
				$vidwidth = this.videoWidth, 
				$vidheight = this.videoHeight, 
				$aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width 
			(adjSize = function() { 						

				$width = $(window).width(); 
				$height = $(".videoWrap").height(); 
							
				var $boxRatio = $width / $height; // The ratio the screen
							
				var $adjRatio = $aspectRatio / $boxRatio; // The ratio of the video divided by the screen size
											
				// Set the container to be the width and height of the screen
				$('.videoWrap').css({'width' : $width+'px', 'height' : $height+'px'}); 
							
				if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
					// Set the width of the video to the screen size multiplied by $adjRatio
					var $vid = $('.videoWrap video').css({'width' : $width*$adjRatio+'px'});
				} else {
					// Else just set the video to the width of the screen/container
					var $vid = $('.videoWrap video').css({'width' : $width+'px'});
				}								 
			})(); 		
			$(window).resize(adjSize);						
		});
	}

    $(document).on("click",".playBtn",function(e){
        var htmlStr , iframeWrap, customFrame;
        htmlStr = "<div class='currentVideoWrap'>" +
                  "<a class='closeVimeoVideo' href='javascript:void(0)' title='close video'></a> " +
                  "</div>";
        iframeWrap =  "<div class='vimeoIframeWrap'></div>";
        var link = $(this).attr("href")+"?autoplay=1";
        customFrame =  '<iframe src='+link+' width="100%" height="100%" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
        iframeWrap = $(iframeWrap).append(customFrame);
        htmlStr = $(htmlStr).append(iframeWrap);
        $("body").append(htmlStr);
        $("body").scrollTop(0).addClass("OverflowHide");
        $(window).scrollTop(0);
        e.preventDefault();
        $(".closeVimeoVideo").on("click",function(e){
            $(htmlStr).remove();
            $("body").removeClass("OverflowHide");
        });
    });

	$.getJSON('http://blog.webonise.com/?json=get_recent_posts', function(data) { 
    	var posts = data.posts;
      	for (var i = 0; i < 6; i++) {
		    var removeTime = posts[i].date.split(" ");
			var date = removeTime[0]
		  	var postDate = new Date(date);
          	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
          	var month = month[postDate.getMonth()];
      		$('ul.blogListing').append(
      			'<li>'+
					'<div class="blogImgWrap">'+
							'<div class="imgOverlay"></div>'+
							'<img src="'+ posts[i].thumbnail_images.full.url +'" alt="'+ posts[i].title_plain +'"/>'+
					'</div>'+
					'<a href="'+ posts[i].url +'" title="'+ posts[i].title_plain +'">'+
						'<div class="dispTable">'+
							'<div class="tableCell">'+
								'<div class="overlayText">'+
									'<h4>'+ posts[i].title_plain +'</h4>'+
									'<p>'+ month+ ' ' + postDate.getDate() + ', ' + postDate.getFullYear()  +'</p>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</a>'+
				'</li>'
			);
      	}      //do the same exact thing with entry
    });

    /**
     * Used to play audio
     */
    $(".sayWebonise ").on("click",function(){
        $(this).addClass("active");
        var url = $(this).data("url");
        var sound = new Audio(url);
        sound.play();
        sound.currentTime = 0;
        setTimeout(function(){
            $(this).removeClass("active");
        },1000)
    });
});

/**
  * Function used to set video size accoutding to window height and width
**/
var setVideoSize = function (){
	var $window = $(window),
		windowWidth = $window.width(),
		windowHeight = $window.height(),
		$videoWrap = $(".homepage-video");
	if($videoWrap.height() <= windowHeight && $videoWrap.width() >= windowWidth){
		$videoWrap.css("height","100%");
		$videoWrap.css("width","auto");
	}else
	{
		$videoWrap.css("height","auto");
		$videoWrap.css("width","100%");
	}
	var overflowHt = $videoWrap.height()-windowHeight
	var overflowWt = $videoWrap.width()-windowWidth
	if( overflowHt>=0 && overflowWt >=0){
		$videoWrap.css("margin-left",-overflowWt/2);
		$videoWrap.css("margin-top",-overflowHt/2);
	}
}

/** used to set team list height **/
var setTeamHeight = function(){
	$(".list-team li").each(function(){		
		if($(".list-team")){
	        var eHt = $(this).find("img").outerHeight();
	        $(this).css("height",eHt);
	   	}
    });
};

/**
 * Function used to convert select box into custom select box	
 */
var checkSelectedIndex = function (element,_this){
 	if(element.selectedIndex != 0)	
 			$(_this).parents(".control-select").find("label").addClass("stay").show();
 		else 
 			$(_this).parents(".control-select").find("label").removeClass("stay").hide();
}



