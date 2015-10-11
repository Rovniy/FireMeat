//Функция контроля положения блоков главной страницы
function centerBox() {
	var wHeight = $(window).height() ;
	$(".maindiv").each(function() {
		var paddingTop =  $(this).height() ;
		if ( paddingTop < wHeight ) {
			paddingTop = ( wHeight - paddingTop ) / 2;
			$(this).css("padding-top",paddingTop);
		} else {
			$(this).css("padding-top","0");
		}
	});
};

$(document).ready(function() {
	centerBox();
});

/* отображение всплывающих окон для блоков главной страницы*/
$(document).ready(function(){
    $('#folio').popover({placement:'top'});
    $('#web').popover({placement:'top'});
    $('#ads').popover({placement:'top'});
    $('#sale').popover({placement:'top'});
    $('#bonus').popover({placement:'bottom'});
    $('#source').popover({placement:'bottom'});
    $('#blog').popover({placement:'bottom'});
    $('#contacts').popover({placement:'bottom'});
	
	$('#furniture').popover({placement:'top'});
	$('#motor').popover({placement:'top'});
	$('#karetu').popover({placement:'top'});
	$('#banu').popover({placement:'bottom'});
	$('#electro').popover({placement:'bottom'});
	$('#metall').popover({placement:'bottom'});
	$('#projects').popover({placement:'bottom'});
	
	$('#SelectTypeFurn1').popover({placement:'top'});
	$('#SelectTypeFurn2').popover({placement:'top'});
	$('#SelectTypeFurn3').popover({placement:'top'});
	$('#SelectTypeFurn4').popover({placement:'top'});
	$('#SelectTypeFurn5').popover({placement:'top'});
	$('#SelectTypeFurn6').popover({placement:'top'});
	$('#SelectTypeFurn7').popover({placement:'top'});
	$('#SelectTypeFurn8').popover({placement:'top'});
		
	
	$('#SelectVaterialFurn1').popover({placement:'bottom'});
	$('#SelectVaterialFurn2').popover({placement:'bottom'});
	$('#SelectVaterialFurn3').popover({placement:'bottom'});
	$('#SelectVaterialFurn4').popover({placement:'bottom'});
	$('#SelectVaterialFurn5').popover({placement:'bottom'});
	$('#SelectVaterialFurn6').popover({placement:'bottom'});
	$('#SelectVaterialFurn7').popover({placement:'bottom'});
	$('#SelectVaterialFurn8').popover({placement:'bottom'});
	
	
	$('#SelectHaddOrAuto1').popover({placement:'left'});
	$('#SelectHaddOrAuto2').popover({placement:'right'});
	
	var videobackground = new $.backgroundVideo($('#indexbody'), {
        "align": "centerXY",
        "width": 1280,
        "height": 720,
        "path": "images/",
        "filename": "backcloud",
        "types": ["mp4","ogg","webm"]
    });
	
	
	
	
});

/* ==============================================Google Map=============================================== */
function initialize() {
	var mapProp = {
  		center:new google.maps.LatLng(45.065700, 39.005361),
  		zoom:14,
		scrollwheel: true,
  		mapTypeId:google.maps.MapTypeId.ROADMAP
  	};
	var map = new google.maps.Map(document.getElementById("map"),mapProp);
	var marker = new google.maps.Marker({
		map: map,
		position:new google.maps.LatLng(45.072837, 38.977570)
	});
	
	var infowindow = new google.maps.InfoWindow();
	infowindow.setContent('<center>Краснодар, пр.Репина 40<br/>цоколь 2 офис 7</center>');
    infowindow.open(map, marker);
};

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function () {
	$("#about-carousel").carousel({interval: 2000});
	// portfolio
	$("#grid").mixitup();
	
	// portfolio hover
	$("#grid li a ").each(function() { 
		$(this).hoverdir(); 
	});
});
/* Обработчики форм */
$(document).ready(function ($) {
		$('#formSubmit').click(function(){ 
			var error = false;

			var name = $('input#formName').val(); 
			if(name == "" || name == " ") {
				$('#error-name').fadeIn('slow');
				error = true;
			}else{
				$('#error-name').fadeOut('slow');
			}

			var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
			var email = $('input#formEmail').val();
			if (email == "" || email == " ") {
				$('#error-email').fadeIn('slow');
				error = true;
			}else if (!email_compare.test(email)) {
				$('#error-email').fadeIn('slow');
				error = true;
			}else{
				$('#error-email').fadeOut('slow');
			}

			var message = $('textarea#message').val();
			if(message == "" || message == " ") {
				$('#error-sms').fadeIn('slow');
				error = true;
			}else{
				$('#error-sms').fadeOut('slow');
			}
			
			if(error == false){
			$.post("../sys/mail.php", $("#contactForm").serialize(), function(){
			$('#contactForm').slideUp('slow');
			$('#modal-header').slideUp('slow');
			$('#success-forms').slideDown('slow');
			});
			}
		return false;
		});

	$('#CommentFormSubmit').click(function(){ 
			var error = false;

			var name = $('input#InputNameComm').val(); 
			if(name == "" || name == " ") {
				$('#error-name-comm').fadeIn('slow');
				error = true;
			}else{
				$('#error-name-comm').fadeOut('slow');
			}

			var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
			var email = $('input#InputEmailComm').val();
			if (email == "" || email == " ") {
				$('#error-email-comm').fadeIn('slow');
				error = true;
			}else if (!email_compare.test(email)) {
				$('#error-email-comm').fadeIn('slow');
				error = true;
			}else{
				$('#error-email-comm').fadeOut('slow');
			}

			var message = $('textarea#InputTextComm').val();
			if(message == "" || message == " ") {
				$('#error-sms-comm').fadeIn('slow');
				error = true;
			}else{
				$('#error-sms-comm').fadeOut('slow');
			}
				
		
			if(error == false){
			$.post("../modules/blog/processor/comments.php?", $("#CommentForm").serialize(), function(){
				$('#CommentForm').slideUp('slow');
				$('#success').slideDown('slow');
			});
			}
			return false;
		});
		
	
	$('#RegisterNewUser').click(function(){ 
			var error = false;
			
			var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
			var email = $('input#InputEmailUser').val();
			if (email == "" || email == " ") {
				$('#error-email-reguser').fadeIn('slow');
				error = true;
			}else if (!email_compare.test(email)) {
				$('#error-email-reguser').fadeIn('slow');
				error = true;
			}else{
				$('#error-email-reguser').fadeOut('slow');
			}
			
			var name = $('input#InputNameUser').val(); 
			if(name == "" || name == " ") {
				$('#error-login-reguser').fadeIn('slow');
				error = true;
			}else{
				$('#error-login-reguser').fadeOut('slow');
			}
			
			var pass = $('input#InputPasswordUser').val(); 
			var repeat = $('input#RepeatPasswordUser').val(); 
			if(pass == "" || pass == " ") {
				$('#error-pass-reguser').fadeIn('slow');
				error = true;
			}else{
				if(repeat == "" || repeat == " ") {
					$('#error-repeat-reguser').fadeIn('slow');
					error = true;
					}
				else{
					if(pass == repeat) {
					$('#error-pass-reguser').fadeOut('slow');
					$('#error-repeat-reguser').fadeOut('slow');
					}
					else{
						$('#error-pass-reguser').fadeIn('slow');
						$('#error-repeat-reguser').fadeIn('slow');
						error = true;
						}
					}
			}
						
			var summ = $('input#InputSummUser').val(); 
			if(summ == "" || summ == " ") {
				$('#error-summa-reguser').fadeIn('slow');
				error = true;
			}else{
				$('#error-summa-reguser').fadeOut('slow');
			}
			
			if(error == false){
			$.post("../modules/users/processor/register.php", $("#RegisterNewUserForm").serialize(), function(){
				$('#RegisterNewUserForm').slideUp('slow');
				$('#RegisterFormOK').slideDown('slow');
			});
			}
			return false;
		});
/* Слайдер меню на главной странице */
		$('#hideindexdiv').click(function(){ 
				$('#indexdiv').slideUp('fast');
				$('#seconddiv').slideDown('fast');
			});		
			
		$('#hideseconddiv').click(function(){ 
			$('#seconddiv').slideUp('fast');
			$('#indexdiv').slideDown('fast');
		});
		
/************************* Калькулятор цен для мебели *******************************/
/* Кнопки выбора товара */
		var SelectTypeFurn;
		$('#SelectTypeFurn1').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn1').css('opacity', '1');
				SelectTypeFurn = 10000;
				SummFurn();				
				$('#SelectTypeFurn2, #SelectTypeFurn3, #SelectTypeFurn4, #SelectTypeFurn5, #SelectTypeFurn6, #SelectTypeFurn7, #SelectTypeFurn8').css('opacity', '0.3');
		});

		$('#SelectTypeFurn2').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn2').css('opacity', '1');
				SelectTypeFurn = 20000;	
				SummFurn();				
				$('#SelectTypeFurn1, #SelectTypeFurn3, #SelectTypeFurn4, #SelectTypeFurn5, #SelectTypeFurn6, #SelectTypeFurn7, #SelectTypeFurn8').css('opacity', '0.3');
		});	
		
		$('#SelectTypeFurn3').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn3').css('opacity', '1');	
				SelectTypeFurn = 15000;		
				SummFurn();				
				$('#SelectTypeFurn2,#SelectTypeFurn1,#SelectTypeFurn4,#SelectTypeFurn5,#SelectTypeFurn6,#SelectTypeFurn7,#SelectTypeFurn8').css('opacity', '0.3');
		});	
		$('#SelectTypeFurn4').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn4').css('opacity', '1');	
				SelectTypeFurn = 5000;
				SummFurn();
				$('#SelectTypeFurn2,#SelectTypeFurn3,#SelectTypeFurn1,#SelectTypeFurn5,#SelectTypeFurn6,#SelectTypeFurn7,#SelectTypeFurn8').css('opacity', '0.3');
		});				
		$('#SelectTypeFurn5').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn5').css('opacity', '1');
				SelectTypeFurn = 15000;
				SummFurn();
		$('#SelectTypeFurn2,#SelectTypeFurn3,#SelectTypeFurn4,#SelectTypeFurn1,#SelectTypeFurn6,#SelectTypeFurn7,#SelectTypeFurn8').css('opacity', '0.3');
		});				
		$('#SelectTypeFurn6').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn6').css('opacity', '1');
				SelectTypeFurn = 15000;
				SummFurn();
		$('#SelectTypeFurn2,#SelectTypeFurn3,#SelectTypeFurn4,#SelectTypeFurn5,#SelectTypeFurn1,#SelectTypeFurn7,#SelectTypeFurn8').css('opacity', '0.3');
		});				
		$('#SelectTypeFurn7').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn7').css('opacity', '1');
				SelectTypeFurn = 30000;
				SummFurn();
				$('#SelectTypeFurn2,#SelectTypeFurn3,#SelectTypeFurn4,#SelectTypeFurn5,#SelectTypeFurn6,#SelectTypeFurn1,#SelectTypeFurn8').css('opacity', '0.3');
		});				
		$('#SelectTypeFurn8').click(function(){ 
				$('#SelectVaterialFurn').slideDown('fast');
				$('#SelectTypeFurn8').css('opacity', '1');
				SelectTypeFurn = 50000;
				SummFurn();
				$('#SelectTypeFurn2,#SelectTypeFurn3,#SelectTypeFurn4,#SelectTypeFurn5,#SelectTypeFurn6,#SelectTypeFurn7,#SelectTypeFurn1').css('opacity', '0.3');
		});	
			
/* Кнопки выбора материала */
		var SelectVaterialFurn;
		$('#SelectVaterialFurn1').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn1').css('opacity', '1');
			SelectVaterialFurn = 10000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn8').css('opacity', '0.3');
		});
	
		$('#SelectVaterialFurn2').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn2').css('opacity', '1');
			SelectVaterialFurn = 50000;
			SummFurn();
			$('#SelectVaterialFurn1, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn3').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn3').css('opacity', '1');
			SelectVaterialFurn = 43000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn1, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn4').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn4').css('opacity', '1');
			SelectVaterialFurn = 52000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn1, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn5').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn5').css('opacity', '1');
			SelectVaterialFurn = 22000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn1, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn6').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn6').css('opacity', '1');
			SelectVaterialFurn = 25000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn1, #SelectVaterialFurn7, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn7').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn7').css('opacity', '1');
			SelectVaterialFurn = 30000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn1, #SelectVaterialFurn8, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		$('#SelectVaterialFurn8').click(function(){ 
			$('#SelectHaddOrAuto').slideDown('fast');
			$('#SelectVaterialFurn8').css('opacity', '1');
			$('#SelectVaterialFurn2').css('opacity', '0.3');
			SelectVaterialFurn = 28000;
			SummFurn();
			$('#SelectVaterialFurn2, #SelectVaterialFurn3, #SelectVaterialFurn4, #SelectVaterialFurn5, #SelectVaterialFurn6, #SelectVaterialFurn7, #SelectVaterialFurn1, #SelectVaterialFurn9').css('opacity', '0.3');
		});
		
/* Выбор способа обработки */
		var SelectHaddOrAuto;
		$('#SelectHaddOrAuto1').click(function(){ 
			$('#CountTotalPriseFurn').slideDown('fast');
			$('#SelectHaddOrAuto1').css('opacity', '1');
			SelectHaddOrAuto = 1.4;
			SummFurn();
			$('#SelectHaddOrAuto2').css('opacity', '0.3');
		});
		
		$('#SelectHaddOrAuto2').click(function(){ 
			$('#CountTotalPriseFurn').slideDown('fast');
			$('#SelectHaddOrAuto2').css('opacity', '1');
			SelectHaddOrAuto = 1;
			SummFurn();
			$('#SelectHaddOrAuto1').css('opacity', '0.3');
		});			
/* Обработчик подсчета цены */		
		function SummFurn() {
			count = Math.round((SelectTypeFurn + SelectVaterialFurn) * SelectHaddOrAuto);
			$('#CountSummFurn').html(count+' руб.');
		};
	
			
			
});




/* ==============================================
Loading
=============================================== */
/*$(window).load(function(){
	jQuery('#loading').fadeOut(1000);
});*/