import React from 'react';

export default function RepairCar4() {
  return (
    <React.Fragment>
      <br />
      Подарили диагностический кабель
      <br />
      VAG K+CAN Commander
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-01.jpg' alt="pic" />
      <br />
      На моем Матизе используется диагностический разъем с 12 контактами, а на кабеле с 16 контактами. Поэтому пришлось
      переделать.
      <br />
      Берем любой 4 контактный разъем и подключаем его к контактам разъема в Матизе как на рисунке. На 4 контакт подаем
      12 В из любого места в машине.
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-02.jpg' alt="pic" />
      <br />
      Ответную часть 4-контактного разъема подключаем к контактам диагностического кабеля в соответствии с уже
      подлючеными контактами. Вид сзади разъема.
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-03.jpg' alt="pic" />
      <br />
      Получается так.
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-04.jpg' alt="pic" />
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-05.jpg' alt="pic" />
      <br />
      Далее подключаем кабель к компьютеру, устанавливаем драйвер FT232.
      <br />
      Скачал разные программы, удалось получить данные только с помощью этой.
      <a href="https://vagcom.com.ua/programmy/programmy-dlya-lanos-sens-daewoo-chevrolet/cascade/">Скачать здесь</a>
      <br />
      Запускаем программу, устанавливаем связь, получаем данные. Можно посмотреть параметры в реальном времени,
      прочитать ошибки.
      <br />
      <img src='../" + Config.ContentPhotoFolder + "/RepairCar04-06.jpg' alt="pic" />
      <br />
    </React.Fragment>
  );
}
