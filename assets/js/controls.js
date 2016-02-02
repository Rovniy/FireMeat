$(document).ready(function ($) {
	
	var heightlogo = $('#mobileheight').height();
	$('#mobileheightlogo').height(heightlogo);
	//Центрирование кнопки оформления
	var wHeight = $(window).height()/2 ;
	var fromtop = wHeight - 227;
	$('.pagebutton').css("top",fromtop);
	
	//Плавный переход по якорям
	$("a.ancLinks").click(function () { 
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      $('html,body').animate( { scrollTop: destination }, 500 );
      return false;
    });


	//Интервал смены баннеров в хедере
	$('.carousel').carousel({
		interval: 4000
	})
	
	//Определение цен на продукты
	var endCheck = 0;
	var endMass = 0;
	var Zakaz = [];
	var Shaslik = {name:"Шашлык из баранины",cost:250,mass:100,id:1};
	var BaraninaMar = {name:"Баранина маринованная",cost:1000,mass:1000,id:2};
	var Lulya = {name:"Люля-кебаб из баранины",cost:200,mass:100,id:3};;
	var Popatus = {name:"Картофель запеченный",cost:80,mass:100,id:4};
	var Luuuk = {name:"Лук примаринованый",cost:50,mass:100,id:5};
	var OvoshGril = {name:"Овощи-гриль",cost:150,mass:100,id:6};
	var OvoshFresh = {name:"Овощи свежие",cost:80,mass:100,id:7};
	var Kinza = {name:"Кинза, петрушка, базилик",cost:100,mass:100,id:8};
	var Knishxz = {name:"Кныш с зеленью",cost:45,mass:100,id:9};
	var SousOstr = {name:"Соус отсрый",cost:60,mass:50,id:10};
	var SousZagad = {name:"Соус загадочный",cost:60,mass:50,id:11};
	var SousUdiv = {name:"Соус удивительный", cost:60,mass:50,id:12};
	var Airan = {name:'Айран',cost:45,mass:100,id:13};
	
	/*******************************Добавление строки с товаром **********************************/
	function addtr(name,cost,mass,id) {
		$('#maintable').append('<tr id="' + id +'"><td>' + name + '</td><td><i class="pluscost arrows fa fa-arrow-up"></i> </td><td class="counttovar">1</td><td><i class="minuscost fa fa-arrow-down arrows"></i></td><td class="cost' + id + '">' + mass + '</td><td>' + cost + '</td></tr>');
	}
	
	/*********************** удаление строки с товаром ****************************/
	function removetr(id) {
		$('#'+id+'').remove();
	}
	
	/****************************** Вывод и обновление цены и веса *******************************/
	function PrintCheck() {
		$('#EndCost').html(endCheck + ' руб.');
		$('#EndMass').html(endMass + ' г.');
		$('#topPrice').html('Товаров на' + ' ' + endCheck + ' руб.');
	}
	
	/************** Прибавление количества товара **********************/
	$('body').on('click','.pluscost',function () {
		var CurSumm = parseInt(jQuery(jQuery(this).parent().parent().find('.counttovar')).text());
		if (CurSumm < 50) {
		var CurCost = parseInt(jQuery(jQuery(this).parent().parent().find('td')[5]).text());
		var CurMass = parseInt(jQuery(jQuery(this).parent().parent().find('td')[4]).text());
		endCheck += CurCost;
		endMass += CurMass;
		jQuery(jQuery(this).parent().parent().find('.counttovar')).html(parseInt(CurSumm)+1);
		PrintCheck();
		};
	});
	
	/*************** Уменьшение количества товара ************************/
	$('body').on('click','.minuscost',function () {
		var CurSumm = parseInt(jQuery(jQuery(this).parent().parent().find('.counttovar')).text());
		if (CurSumm > 1) {
		var CurCost = parseInt(jQuery(jQuery(this).parent().parent().find('td')[5]).text());
		var CurMass = parseInt(jQuery(jQuery(this).parent().parent().find('td')[4]).text());
		endCheck -= CurCost;
		endMass -= CurMass;
		jQuery(jQuery(this).parent().parent().find('.counttovar')).html(parseInt(CurSumm)-1);
		PrintCheck();
		};
	});

    $('#sumbtn').click(function() {
        var error = false;
        var postCost = endCheck;
        var postMass = endMass;
        var postMoney = null;
		var postPhone = $("#formPhone").val();
		var postStreet = $("#formStreet").val();
		var postHome = $("#formHome").val();
		var postNumberHome = $("#formNumberHome").val();
		var postFlour = $("#formFlour").val();
		var postNumber = $("#formNumber").val();
        if ($("#radio1").prop("checked")) {
            postMoney = "Наличный расчет";
        } else {
            if ($("#radio2").prop("checked")) {
                postMoney = "Безначлиный расчет";
            } else {
                error = true;
            }
        }
        var PostMessage = $("#message").val();

        var myRows = $('table#maintable').find('tr');
        var rows = [];
        var table = jQuery.each(myRows, function (ix, item) {
            var tds = jQuery(item).find('td')
            if (tds.length !== 0) {
                var product = {};
                product.name = jQuery(tds[0]).text();
                product.count = jQuery(tds[2]).text();
                product.weight = jQuery(tds[4]).text();
                product.cost = jQuery(tds[5]).text();
                rows.push(product);
            }
        });

        /*console.log(rows);
        console.log(myRows);

        console.log(JSON.stringify(rows));
        console.log(JSON.stringify(myRows));*/

        for (var i = 1; i < myRows.length; i++) {
            for (var j = 0; j < 6; j++) {
                //alert(
                $(myRows[i]).find('td:eq(' + j + ')').html();
                //    );
            }
        }

        var postData = {};
        postData.rows = rows;
        postData.allcost = postCost;
        postData.allmass = postMass;
        postData.allmoney = postMoney;
        postData.message = PostMessage;
		postData.phone = postPhone; 
		postData.address = 'Адрес: ' + postStreet + ', дом: ' + postHome + ', подъезд:' + postNumberHome + ', этаж: ' + postFlour + ', квартира: ' + postNumber; 

		console.log(postData);
		
		
        $.ajax({
            url: "mail.php",
            data: "f="+JSON.stringify(postData), //JSON.stringify(postData),
            type: 'POST',
            dataType: 'json',
            //contentType: "text/plain",
            success: function() {
                $('#formText').slideUp();
                $('#formSussecc').slideDown();
				
            },
            error: function() {
                $('#formText').slideUp();
                $('#formError').slideDown();
            }
        });

    });
	
	//Управление продлуктами перед столом
	//Шашлык из баранины
	$('#sha-click').click(function () {
		$('div.onhover').css("display","none");
		$('#sha-hover').fadeIn('fast');
	});
	$('#sha-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#sha-hover').fadeIn('fast');
	});
	$('#sha-select').click(function () {
		$('#sha-hover').fadeOut('fast');
		$('#sha-click-img').css("display","none");
		$('.item7').fadeIn('fast');
		if ($('#sha-grey').css("display")=="none") {
			endCheck += Shaslik.cost;
			endMass += Shaslik.mass;
			addtr(Shaslik.name,Shaslik.cost,Shaslik.mass,Shaslik.id);
			PrintCheck();
		}
		$('#sha-grey').fadeIn('fast');
	});
	$('.item7 .close').click(function () {
		$('#sha-click-img').fadeIn('fast');
		$('#sha-grey').css("display","none");
		$('.item7').fadeOut('fast');
		endCheck -= Shaslik.cost;
		endMass -= Shaslik.mass;
		removetr(Shaslik.id);
		PrintCheck();
	});
	
	//Баранина маринованная
	$('#bar-click').click(function () {
		$('div.onhover').css("display","none");
		$('#bar-hover').fadeIn('fast');
	});
	$('#bar-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#bar-hover').fadeIn('fast');
	});
	$('#bar-select').click(function () {
		$('#bar-hover').fadeOut('fast');
		$('#bar-click-img').css("display","none");
		$('.item8').fadeIn('fast');
		if ($('#bar-grey').css("display")=="none") {
			endCheck += BaraninaMar.cost;
			endMass += BaraninaMar.mass;
			addtr(BaraninaMar.name,BaraninaMar.cost,BaraninaMar.mass,BaraninaMar.id);
			PrintCheck();
		}
		$('#bar-grey').fadeIn('fast');
	});
	$('.item8 .close').click(function () {
		$('#bar-click-img').fadeIn('fast');
		$('#bar-grey').css("display","none");
		$('.item8').fadeOut('fast');
		endCheck -= BaraninaMar.cost;
		endMass -= BaraninaMar.mass;
		removetr(BaraninaMar.id);
		PrintCheck();
	});
	
	//Люля-кебаб
	$('#lulya-click').click(function () {
		$('div.onhover').css("display","none");
		$('#lulya-hover').fadeIn('fast');
	});
	$('#lulya-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#lulya-hover').fadeIn('fast');
	});
	$('#lulya-select').click(function () {
		$('#lulya-hover').fadeOut('fast');
		$('#lulya-click-img').css("display","none");
		$('.item9').fadeIn('fast');
		if ($('#lulya-grey').css("display")=="none") {
			endCheck += Lulya.cost;
			endMass += Lulya.mass;
			addtr(Lulya.name,Lulya.cost,Lulya.mass,Lulya.id);
			PrintCheck();
		}
		$('#lulya-grey').fadeIn('fast');
	});
	$('.item9 .close').click(function () {
		$('#lulya-click-img').fadeIn('fast');
		$('#lulya-grey').css("display","none");
		$('.item9').fadeOut('fast');
		endCheck -= Lulya.cost;
		endMass -= Lulya.mass;
		removetr(Lulya.id);
		PrintCheck();
	});
	
	//Картофель запеченый
	$('#cart-click').click(function () {
		$('div.onhover').css("display","none");
		$('#cart-hover').fadeIn('fast');
	});
	$('#cart-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#cart-hover').fadeIn('fast');
	});
	$('#cart-select').click(function () {
		$('#cart-hover').fadeOut('fast');
		$('#cart-click-img').css("display","none");
		$('#item5').fadeIn('fast');
		if ($('#cart-grey').css("display")=="none") {
			endCheck += Popatus.cost;
			endMass += Popatus.mass;
			addtr(Popatus.name,Popatus.cost,Popatus.mass,Popatus.id);
			PrintCheck();
		}
		$('#cart-grey').fadeIn('fast');
	});
	$('.item5 .close').click(function () {
		$('#cart-click-img').fadeIn('fast');
		$('#cart-grey').css("display","none");
		$('.item5').fadeOut('fast');
		endCheck -= Popatus.cost;
		endMass -= Popatus.mass;
		removetr(Popatus.id);
		PrintCheck();
	});
	
	//Лук примаринованный
	$('#luk-click').click(function () {
		$('div.onhover').css("display","none");
		$('#luk-hover').fadeIn('fast');
	});
	$('#luk-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#luk-hover').fadeIn('fast');
	});
	$('#luk-select').click(function () {
		$('#luk-hover').fadeOut('fast');
		$('#luk-click-img').css("display","none");
		$('.item4').fadeIn('fast');
		if ($('#luk-grey').css("display")=="none") {
			endCheck += Luuuk.cost;
			endMass += Luuuk.mass;
			addtr(Luuuk.name,Luuuk.cost,Luuuk.mass,Luuuk.id);
			PrintCheck();
		}
		$('#luk-grey').fadeIn('fast');
	});
	$('.item4 .close').click(function () {
		$('#luk-click-img').fadeIn('fast');
		$('#luk-grey').css("display","none");
		$('.item4').fadeOut('fast');
		endCheck -= Luuuk.cost;
		endMass -= Luuuk.mass;
		removetr(Luuuk.id);
		PrintCheck();
	});
	
	//Овощи гриль
	$('#ovosh-click').click(function () {
		$('div.onhover').css("display","none");
		$('#ovosh-hover').fadeIn('fast');
	});
	$('#ovosh-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#ovosh-hover').fadeIn('fast');
	});
	$('#ovosh-select').click(function () {
		$('#ovosh-hover').fadeOut('fast');
		$('#ovosh-click-img').css("display","none");
		$('.item3').fadeIn('fast');
		if ($('#ovosh-grey').css("display")=="none") {
			endCheck += OvoshGril.cost;
			endMass += OvoshGril.mass;
			addtr(OvoshGril.name,OvoshGril.cost,OvoshGril.mass,OvoshGril.id);
			PrintCheck();
		}
		$('#ovosh-grey').fadeIn('fast');
	});
	$('.item3 .close').click(function () {
		$('#ovosh-click-img').fadeIn('fast');
		$('#ovosh-grey').css("display","none");
		$('.item3').fadeOut('fast');
		endCheck -= OvoshGril.cost;
		endMass -= OvoshGril.mass;
		removetr(OvoshGril.id);
		PrintCheck();
	});
	
	//Овощи свежие
	$('#fresh-click').click(function () {
		$('div.onhover').css("display","none");
		$('#fresh-hover').fadeIn('fast');
	});
	$('#fresh-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#fresh-hover').fadeIn('fast');
	});
	$('#fresh-select').click(function () {
		$('#fresh-hover').fadeOut('fast');
		$('#fresh-click-img').css("display","none");
		$('.item6').fadeIn('fast');
		if ($('#fresh-grey').css("display")=="none") {
			endCheck += OvoshFresh.cost;
			endMass += OvoshFresh.mass;
			addtr(OvoshFresh.name,OvoshFresh.cost,OvoshFresh.mass,OvoshFresh.id);
			PrintCheck();
		}
		$('#fresh-grey').fadeIn('fast');
	});
	$('.item6 .close').click(function () {
		$('#fresh-click-img').fadeIn('fast');
		$('#fresh-grey').css("display","none");
		$('.item6').fadeOut('fast');
		endCheck -= OvoshFresh.cost;
		endMass -= OvoshFresh.mass;
		removetr(OvoshFresh.id);
		PrintCheck();
	});
	
	//Кинза
	$('#kinza-click').click(function () {
		$('div.onhover').css("display","none");
		$('#kinza-hover').fadeIn('fast');
	});
	$('#kinza-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#kinza-hover').fadeIn('fast');
	});
	$('#kinza-select').click(function () {
		$('#kinza-hover').fadeOut('fast');
		$('#kinza-click-img').css("display","none");
		$('.item1').fadeIn('fast');
		if ($('#kinza-grey').css("display")=="none") {
			endCheck += Kinza.cost;
			endMass += Kinza.mass;
			addtr(Kinza.name,Kinza.cost,Kinza.mass,Kinza.id);
			PrintCheck();
		}
		$('#kinza-grey').fadeIn('fast');
	});
	$('.item1 .close').click(function () {
		$('#kinza-click-img').fadeIn('fast');
		$('#kinza-grey').css("display","none");
		$('.item1').fadeOut('fast');
		endCheck -= Kinza.cost;
		endMass -= Kinza.mass;
		removetr(Kinza.id);
		PrintCheck();
	});
	
	//Книш
	$('#knish-click').click(function () {
		$('div.onhover').css("display","none");
		$('#knish-hover').fadeIn('fast');
	});
	$('#knish-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#knish-hover').fadeIn('fast');
	});
	$('#knish-select').click(function () {
		$('#knish-hover').fadeOut('fast');
		$('#knish-click-img').css("display","none");
		$('.item2').fadeIn('fast');
		if ($('#knish-grey').css("display")=="none") {
			endCheck += Knishxz.cost;
			endMass += Knishxz.mass;
			addtr(Knishxz.name,Knishxz.cost,Knishxz.mass,Knishxz.id);
			PrintCheck();
		}
		$('#knish-grey').fadeIn('fast');
	});
	$('.item2 .close').click(function () {
		$('#knish-click-img').fadeIn('fast');
		$('#knish-grey').css("display","none");
		$('.item2').fadeOut('fast');
		endCheck -= Knishxz.cost;
		endMass -= Knishxz.mass;
		removetr(Knishxz.id);
		PrintCheck();
	});
	
	//Соус острый
	$('#ostr-click').click(function () {
		$('div.onhover').css("display","none");
		$('#ostr-hover').fadeIn('fast');
	});
	$('#ostr-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#ostr-hover').fadeIn('fast');
	});
	$('#ostr-select').click(function () {
		$('#ostr-hover').fadeOut('fast');
		$('#ostr-click-img').css("display","none");
		$('.item10').fadeIn('fast');
		if ($('#ostr-grey').css("display")=="none") {
			endCheck += SousOstr.cost;
			endMass += SousOstr.mass;
			addtr(SousOstr.name,SousOstr.cost,SousOstr.mass,SousOstr.id);
			PrintCheck();
		}
		$('#ostr-grey').fadeIn('fast');
	});
	$('.item10 .close').click(function () {
		$('#ostr-click-img').fadeIn('fast');
		$('#ostr-grey').css("display","none");
		$('.item10').fadeOut('fast');
		endCheck -= SousOstr.cost;
		endMass -= SousOstr.mass;
		removetr(SousOstr.id);
		PrintCheck();
	});
	
	//Соус загадочный
	$('#zagad-click').click(function () {
		$('div.onhover').css("display","none");
		$('#zagad-hover').fadeIn('fast');
	});
	$('#zagad-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#zagad-hover').fadeIn('fast');
	});
	$('#zagad-select').click(function () {
		$('#zagad-hover').fadeOut('fast');
		$('#zagad-click-img').css("display","none");
		$('.item11').fadeIn('fast');
		if ($('#zagad-grey').css("display")=="none") {
			endCheck += SousZagad.cost;
			endMass += SousZagad.mass;
			addtr(SousZagad.name,SousZagad.cost,SousZagad.mass,SousZagad.id);
			PrintCheck();
		}
		$('#zagad-grey').fadeIn('fast');
	});
	$('.item11 .close').click(function () {
		$('#zagad-click-img').fadeIn('fast');
		$('#zagad-grey').css("display","none");
		$('.item11').fadeOut('fast');
		endCheck -= SousZagad.cost;
		endMass -= SousZagad.mass;
		removetr(SousZagad.id);
		PrintCheck();
	});
	
	//Соус удивительный
	$('#udiv-click').click(function () {
		$('div.onhover').css("display","none");
		$('#udiv-hover').fadeIn('fast');
	});
	$('#udiv-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#udiv-hover').fadeIn('fast');
	});
	$('#udiv-select').click(function () {
		$('#udiv-hover').fadeOut('fast');
		$('#udiv-click-img').css("display","none");
		$('.item12').fadeIn('fast');
		if ($('#udiv-grey').css("display")=="none") {
			endCheck += SousUdiv.cost;
			endMass += SousUdiv.mass;
			addtr(SousUdiv.name,SousUdiv.cost,SousUdiv.mass,SousUdiv.id);
			PrintCheck();
		}
		$('#udiv-grey').fadeIn('fast');
	});
	$('.item12 .close').click(function () {
		$('#udiv-click-img').fadeIn('fast');
		$('#udiv-grey').css("display","none");
		$('.item12').fadeOut('fast');
		endCheck -= SousUdiv.cost;
		endMass -= SousUdiv.mass;
		removetr(SousUdiv.id);
		PrintCheck();
	});
	
	//Айран
	$('#airan-click').click(function () {
		$('div.onhover').css("display","none");
		$('#airan-hover').fadeIn('fast');
	});
	$('#airan-click-img').click(function () {
		$('div.onhover').css("display","none");
		$('#airan-hover').fadeIn('fast');
	});
	$('#airan-select').click(function () {
		$('#airan-hover').fadeOut('fast');
		$('#airan-click-img').css("display","none");
		$('.item13').fadeIn('fast');
		if ($('#airan-grey').css("display")=="none") {
			endCheck += Airan.cost;
			endMass += Airan.mass;
			addtr(Airan.name,Airan.cost,Airan.mass,Airan.id);
			PrintCheck();
		}
		$('#airan-grey').fadeIn('fast');
	});
	$('.item13 .close').click(function () {
		$('#airan-click-img').fadeIn('fast');
		$('#airan-grey').css("display","none");
		$('.item13').fadeOut('fast');
		endCheck -= Airan.cost;
		endMass -= Airan.mass;
		removetr(Airan.id);
		PrintCheck();
	});
	console.log(endCheck);
	

	
});




$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".onhover");
		var clk = $('.click');// тут указываем ID элемента
		if (!div.is(e.target)) {
			div.fadeOut(); // скрываем его
		}
	});
	

$(".onhover").blur( 
function() {
	alert("Меня кинули!!!"); 
	});
