<?php


//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['name'];
$mail = $_POST['mail'];
$message = $_POST['message'];


$token = "1943684879:AAGQdt4zxiYS190FTelTqPl5svTm1mQyXig";

//чат айди (от бота)
$chat_id = "-471302014";

//Массив с нашими данными из index
$arr = array(
  'Имя пользователя: ' => $name,
  'Email' => $mail,
  'Сообщение ' => $message,
);

//При помощи цикла перебираем массив и помещаем в переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
  echo "Thank you";
    header('Location: index.html');
} else {
  echo "Error";
}
?>