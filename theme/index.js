var pageIndex = 0;
define([ './common/wlib/w_shower_plugin', './common/share_0/share_0',
		'./common/loading_0/loading_0', './common/audio_0/audio_0',
		'./common/wxbridge_0/wxbridge_0', 'zepto', 'swiper','wutil','touch' ], function(
		wplugin, share, loading, audio, wxbridge, $, Swiper,WUtil) {
	var hideAni = function(mySwiper) {
		$(mySwiper.slides[mySwiper.activeIndex]).find('.wf_can_anim')
				.removeClass('wf_block');
	};
	var showAni = function(mySwiper) {
		$(mySwiper.slides[mySwiper.activeIndex]).find('.wf_can_anim').addClass(
				'wf_block');
	};

	var changeSlideEvent = function(){
			//转场动画
			var obj = $("div.content-slide-active + div.content-slide").attr("id");
			if(obj===undefined){
				obj = $($("div.content-slide").get(0)).attr("id");
			}
			$(".content-slide-prev").removeClass("content-slide-prev");
			$(".content-slide-active").addClass("content-slide-prev").removeClass("content-slide-active");
			$("#"+obj).addClass("content-slide-active");
			$(".daub-page").removeClass("change-anim");
	}

	var changeSlideNext = function(){
		var $daubPage = $(".content-slide-active .daub-page");
		if($daubPage.length>0){
			$daubPage.addClass("change-anim");
		}else{
			changeSlideEvent();
		}
	}
	var changeSlidePrev = function(){
		var $daubPage = $(".content-slide-active .daub-page");
		if($daubPage.length>0){
			$daubPage.addClass("change-anim");
		}else{
			changeSlidePrevEvent();
		}
	}

	var changeSlidePrevEvent = function(){
		var obj_prev = $(".content-slide-prev").attr("id");
		if(obj_prev === undefined){
			var len = $(".content-slide").length;
			len = parseInt(len)-1;
			obj_prev = $($("div.content-slide").get(len)).attr("id");
		}

		$(".content-slide-prev").removeClass("content-slide-prev");
		$(".content-slide-active").removeClass("content-slide-active");
		$("#"+obj_prev).addClass("content-slide-active");
		$("#"+obj_prev).prev().addClass("content-slide-prev");
		$(".daub-page-box").removeClass("change-anim");
	}

	return {
		run : function() {
			wplugin.init();
			wplugin.trigger('on_start_init');
			this.init(_.bind(function() {
				loading.finish();
				this._run();
			}, this));
		},
		init : function(callback) {
			loading.init();
			share.init();
			audio.init();
			wxbridge.init();
			// resloader.init();
			callback();
		},
		_run : function() {
			audio.run();
			// showAni();

			// document.addEventListener('touchmove', function (event) {
			// 	event.preventDefault();
			// }, false);
			var swipeDirection = 'next';
			$(".daub-page-long").on("webkitAnimationEnd",function(){
				// console.log("END");
				if(swipeDirection==='next'){
					changeSlideEvent();
				}else{
					changeSlidePrevEvent();
				}
			});
			$(".content-slide").swipe(function(){
				// console.log("swipe");
				audio.playerKeeper();
			});
			$(".content-slide").swipeLeft(function(){
				// console.log("swipeLeft");
				swipeDirection="next";
				changeSlideNext();
			});
			$(".content-slide").swipeRight(function(){
				// console.log("swipeRight");
				swipeDirection="prev";
				changeSlidePrev();
			});
			$(".content-slide").swipeUp(function(){
				// console.log("swipeUp");
				changeSlideEvent();
			});
			$(".content-slide").swipeDown(function(){
				// console.log("swipeDown");
				changeSlidePrev();
			});

			$("#follow-share").on("click",function(){
				var source = WUtil.getUrlParam('utm_source');
				if(source != null && source != "wow"){
					var href_val = $("#download_url").val();
					window.location.href=href_val;
				}
			});

			$("#arrow-left").on("click",function(){
				swipeDirection="prev";
				changeSlidePrev();
			});
			$("#arrow-right").on("click",function(){
				swipeDirection="next";
				changeSlideNext();
			});
		},

	};
});
