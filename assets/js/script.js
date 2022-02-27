// ハンバーガーメニューの設定
$(function(){
	let state = false;
	let pos;
	$("#toggle").click(function(){
		$(this).toggleClass("open");
		$("nav").toggleClass("sp_open");
		$("nav").css("display","flex");
		//背景を固定させる
		if (state == false) {
			pos = $(window).scrollTop();
			$("body").addClass("fixed").css({"top": -pos});
			state = true;
		} else {
			$("body").removeClass("fixed").css({"top": 0});
			window.scrollTo(0, pos);
			state = false;
		}
	});
});

// スライドショーの設定
$(function(){
	$(".slider").slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		speed: 1000,
		fade: true
	});
});

// メインビジュアルの差し替え
$(function() {
	let elem = $('.imageReplace');
	let sp = '-sp.';
	let pc = '-pc.';
	let replaceWidth = 767;

	function imageSwitch() {
		let windowWidth = parseInt($(window).width());
		$(elem).each(function() {
			let thisItem = $(this);
			if(windowWidth >= replaceWidth) {
				thisItem.attr('src', thisItem.attr('src').replace(sp, pc));
			} else {
				thisItem.attr('src', thisItem.attr('src').replace(pc, sp));
			}
		});
	}
	imageSwitch();

	let resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			imageSwitch();
		}, 200);
	});
});

// ページトップの設定
$(function () {
	let topBtn = $("#pagetop");
	topBtn.hide();
	$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		topBtn.fadeIn();
	} else {
		topBtn.fadeOut();
	}
	});
	topBtn.click(function () {
	$("body,html").animate(
		{
		scrollTop: 0,
		},
		500
	);
	return false;
	});
});

// フッター手前でストップ
$(document).ready(function () {
	$("#pagetop").hide();
	$(window).on("scroll", function () {
	scrollHeight = $(document).height();
	scrollPosition = $(window).height() + $(window).scrollTop();
	footHeight = $("footer").innerHeight();
	if (scrollHeight - scrollPosition <= footHeight) {
		$("#pagetop").css({
		position: "absolute",
		bottom: footHeight + 0,
		});
	} else {
		$("#pagetop").css({
		position: "fixed",
		bottom: "30px",
		});
	}
	});
});

// よくある質問のアコーディオン
$(function(){
	$(".faq-list dt").on("click", function(){
		$(this).next().slideToggle(); //回答がスライドしてきて表示・非表示を切り替え
		$(this).toggleClass("open");
	});
});

//ボタン制御
$(function(){
    $("#submit").prop('disabled', true).css({"opacity":0.6, "cursor": "not-allowed"});

    $('#agree').click(function(){
    if($("#agree").prop('checked')) {
            $("#submit").prop('disabled', false).css({"opacity":1, "cursor": "pointer"});
        }
        else {
            $("#submit").prop('disabled', true).css({"opacity":0.6, "cursor": "not-allowed"});
        }
    })
});

//ニュース画像拡大
$(function(){
	$(".flex-photo a").click(function(){
		$("body").append('<div id="bg">');
		$("body").append('<div id="photo">');

		$("#bg").hide();
		$("#photo").hide();

		$("#photo").html("<img> <p id='close'>");
		$("#photo img").attr("src", $(this).attr("href"));

		$("#bg").fadeIn();
		$("#photo").fadeIn();

		$("#close").click(function(){
			$("#bg").fadeOut(function(){
				$(this).remove();
			});
			$("#photo").fadeOut(function(){
				$(this).remove();
			});
		});
		return false
	});
});

//フォームバリデーション
$(function(){
	$(".alert").hide();

	$("#submit").click(function(){
		let sendFlag = true; //チェック用

		if(!$("#kanji").val()){
			$("#form-kanji .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-kanji .alert").hide();
		}

		if(!$("#kana").val()){
			$("#form-kana .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-kana .alert").hide();
		}

		if(!$("#birthday").val()){
			$("#form-birthday .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-birthday .alert").hide();
		}

		if(!$("#tel").val()){
			$("#form-tel .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-tel .alert").hide();
		}

		if(!$("#mail").val()){
			$("#form-mail .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-mail .alert").hide();
		}

		//ラジオボタン
		let radioChk = $('input[type="radio"]:checked').length;
		if(radioChk == 0){
			$("#form-radio .alert").show();
			sendFlag =  false; 
		} else {
			$("#form-radio .alert").hide();
		}

		if(sendFlag ==  false ){
			return false;
		}
	});
});

//アニメーションに挑戦だ
function delayScrollAnime() {
	var time = 0.2;//遅延時間を増やす秒数の値
	var value = time;
	$('.delayScroll').each(function () {
		var parent = this;					//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素を取得
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		}else {
			$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
			value = time;//delay初期値の数値に戻す
		}
	})
}

// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
		delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
