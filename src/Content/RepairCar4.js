<%@ Control Language="VB" AutoEventWireup="false" CodeFile="RepairCar4.ascx.vb" Inherits="Content_RepairCar04" %>
<br />
Подарили диагностический кабель
<br />
VAG K+CAN Commander
<br />
<%
    Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-01.jpg' />")
%>
<br />
На моем Матизе используется диагностический разъем с 12 контактами, а на кабеле с 16 контактами. Поэтому пришлось переделать.
<br />
Берем любой 4 контактный разъем и подключаем его к контактам разъема в Матизе как на рисунке. На 4 контакт подаем 12 В из любого места в машине.
<br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-02.jpg' />")
%>
<br />
Ответную часть 4-контактного разъема подключаем к контактам диагностического кабеля в соответствии с уже подлючеными контактами. Вид сзади разъема.
<br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-03.jpg' />")
%>
<br />
Получается так.
<br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-04.jpg' />")
%>
<br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-05.jpg' />")
%>
<br />
Далее подключаем кабель к компьютеру, устанавливаем драйвер FT232.
<br />
Скачал разные программы, удалось получить данные только с помощью этой.
<a href ="https://vagcom.com.ua/programmy/programmy-dlya-lanos-sens-daewoo-chevrolet/cascade/">Скачать здесь</a>
<br />
Запускаем программу, устанавливаем связь, получаем данные. Можно посмотреть параметры в реальном времени, прочитать ошибки. 
<br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/RepairCar04-06.jpg' />")
%>
<br />