<?php
    $adress='smart.fz@mail.ru'; //куда отправлять почту?
    $adressMagaz='aleks.grinewa2012@yandex.ru'; //куда отправлять почту?
    $theme='Отзыв посетителя с сайта "Огонь-шашлык!"';
    $headers='Content-type: text/html; charset="utf-8"';

    //Обработка JSON запроса
    $all=$_GET["f"];
    $JSONdata = json_decode($all);

    /*формируем вид сообщения*/

    $messages = "Сообщение: ".$JSONdata;

    /*отправляем сообщение на e-mail*/
    mail($adress,$theme,$messages,$headers);
    mail($adressMagaz,$theme,$messages,$headers);
?>