// YouTube IFrame API ////////////////////////////////////////////////////////////////
// https://developers.google.com/youtube/iframe_api_reference ////////////////////////
var player;
var _curClick = 0; // click array
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
//		height: '390',
//		width: '640',
		videoId: bgID[_curClick],
		playerVars: {
			'controls': 0,
			'showinfo': 0,
			'wmode': "opaque"
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
var done = false;
function onPlayerReady(event) {
	event.target.getPlaybackQuality('default');
	event.target.setVolume(80);
	event.target.playVideo();
}
function onPlayerStateChange(event) {
	if (event.data === 0) {
		_curClick++;
		if(parseInt(_curClick) > ($(".control li").size() - 1)) {
			_curClick = 0;
			$(".control li.on").removeClass("on");
			$(".control li:eq(0)").addClass("on");
			event.target.loadVideoById(bgID[parseInt(_curClick)]);
		} else {
			$(".control li.on").removeClass("on").next("li").addClass("on");
			event.target.loadVideoById(bgID[parseInt(_curClick)]);
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////

// YouTube Resize
function ytResize() {
	var x_percent = $(window).width() / 1280,
		y_percent = $(window).height() / 720;
	var x_num = parseInt(1280 * y_percent),
		y_num = parseInt(720 * y_percent);
	if(x_num >= $(window).width()){
		$(".yt_wrap").css({"height" : y_num});
		$(".yt_box").css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
	}else{
		var x_num = parseInt(1280 * x_percent);
		var y_num = parseInt(720 * x_percent);
		$(".yt_wrap").css({"height" : y_num});
		$(".yt_box").css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
	}
}

$(function(){
	// click event
	$(".control li").each(function(){
		$(this).live("click",function() {
			_curClick = $(this).index();
			$(".control li").removeClass("on");
			$(this).addClass("on");
			player.loadVideoById(bgID[parseInt(_curClick)]);
		});
	});

	$(".btn_pop").live("click",function() {
		player.pauseVideo();
		$(".pop_yt iframe").attr("src", "https://www.youtube.com/embed/"+ popID[_curClick] +"?rel=0&amp;autoplay=1;&amp;wmode=opaque");
		$(".pop_yt").show();
		$(".pop_overlay").show();
	});

	$(".pop_yt .close").live("click",function() {
		$(".pop_yt").hide();
		$(".pop_overlay").hide();
		$(".pop_yt iframe").attr("src", "");
		player.playVideo();
	});

	$(".btn_vol").live("click",function() {
		if($(this).hasClass("on")) {
			player.mute();
			$(this).removeClass("on").addClass("off");
		} else {
			player.unMute();
			$(this).removeClass("off").addClass("on");
		}
	});

	// start YouTube resize
	ytResize();

	// check height
	if(location.href.indexOf("?h=600") > -1) {
		$(".top_box").css("height","600");
	}
});

$(window).resize(function() {
	ytResize();
});
