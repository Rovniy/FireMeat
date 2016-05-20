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
    for ($i=0; $i < $rowsall; $i++) {
        $k = $g[$i];
        $tablica = $tablica.($i+1).') '.$k->name.','.$k->count.' шт., '.$k->mass.' гр., '.$k->cost.' руб.<br/>';
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