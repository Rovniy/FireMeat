<?php
    $adress='smart.fz@mail.ru'; //куда отправлять почту?
    $adressMagaz='aleks.grinewa2012@yandex.ru'; //куда отправлять почту?
    $theme='Заказ с сайта "Огонь-шашлык!"';
    $headers='Content-type: text/html; charset="utf-8"';

    //Обработка JSON запроса
    $all=$_GET["f"];
    $JSONdata = json_decode($all);
    $rowsall = count($JSONdata->rows);
    $g = $JSONdata->rows;
    $tablica;
	$nazvanie = 'Название не определено';
    for ($i=0; $i < $rowsall; $i++) {
        $k = $g[$i];
        if ($k->id == '1') {
            $nazvanie = 'Шашлык из баранины';
        } elseif ($k->id == '2') {
            $nazvanie = 'Баранина маринованная';
         } elseif ($k->id == '3') {
			$nazvanie = 'Люля-кебаб из баранины';
         } elseif ($k->id == '4') {
			$nazvanie = 'Картофель запеченный';
         } elseif ($k->id == '5') {
			$nazvanie = 'Лук примаринованый';
         } elseif ($k->id == '6') {
			$nazvanie = 'Овощи-гриль';
         } elseif ($k->id == '7') {
			$nazvanie = 'Овощи свежие';
         } elseif ($k->id == '8') {
			$nazvanie = 'Кинза, петрушка, базилик';
         } elseif ($k->id == '9') {
			$nazvanie = 'Кныш с зеленью';
         } elseif ($k->id == '10') {
			$nazvanie = 'Соус отсрый';
         } elseif ($k->id == '11') {
			$nazvanie = 'Соус загадочный';
         } elseif ($k->id == '12') {
			$nazvanie = 'Соус удивительный';
         } elseif ($k->id == '13') {
			$nazvanie = 'Айран';
         } elseif ($k->id == '14') {
			$nazvanie = 'Бургер по-фермерски';
         } elseif ($k->id == '15') {
			$nazvanie = 'Ассорти мясное на мангале';
         } elseif ($k->id == '16') {
			$nazvanie = 'Соленья оригинальные';
         } elseif ($k->id == '17') {
			$nazvanie = 'Пироги по-домашнему с картошкой';
         } elseif ($k->id == '18') {
			$nazvanie = 'Пироги по-домашнему с мясом';
         } elseif ($k->id == '19') {
			$nazvanie = 'Пироги по-домашнему с зеленью';
         } elseif ($k->id == '20') {
			$nazvanie = 'Пироги по-домашнему с ягодой';
         } elseif ($k->id == '21') {
			$nazvanie = 'Самса с бараниной';
         } elseif ($k->id == '22') {
			$nazvanie = 'Сок натуральный яблочный';
         } elseif ($k->id == '23') {
			$nazvanie = 'Сок натуральный виноградный';
         } elseif ($k->id == '24') {
			$nazvanie = 'Сок натуральный апельсоновый';
         } elseif ($k->id == '25') {
			$nazvanie = 'Мин. вода Алтая Касламинская с газом';
         } elseif ($k->id == '26') {
			$nazvanie = 'Мин. вода Алтая Касламинская без газа';
         } elseif ($k->id == '27') {
			$nazvanie = 'Напиток Алтая Тархун';
         } elseif ($k->id == '28') {
			$nazvanie = 'Напиток Алтая Лимонад';
         } elseif ($k->id == '29') {
			$nazvanie = 'Напиток Алтая Грушевый';
         }

        $tablica = $tablica.($i+1).') '.$nazvanie.','.$k->count.' шт., '.$k->mass.' гр., '.$k->cost.' руб.<br/>';
    }

    /*формируем вид сообщения*/

    $messages = $tablica."<br/><br/>".
    "Адрес: ".$JSONdata->address."<br/>".
    "Контактный телефон: ".$JSONdata->phone."<br/>".
    'Общий вес: '.$JSONdata->allmass.'<br/>'.
    'Общая стоимость: '.$JSONdata->allcost.'<br/>'.
    'Способ оплаты: '.$JSONdata->allmoney.'<br/>'.
    'Комментарии к заказу: '.$JSONdata->message.'<br/>'.
    'ID заказа: '.$JSONdata->userIDD.'<br/>';


    /*отправляем сообщение на e-mail*/
    mail($adress,$theme,$messages,$headers);
    mail($adressMagaz,$theme,$messages,$headers);
?>