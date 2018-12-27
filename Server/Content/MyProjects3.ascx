<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MyProjects3.ascx.vb" Inherits="Page_Sub_Project03" %>

<br />
Мобильное приложение для управления автомобилем. 
Посредством нажатия кнопок на смартфоне отправляет и принимает СМС-команды модулю автозапуска автомобиля.<br />
Приложение написано для ОС Андроид. Установить на смартфон можно через Андроид студию, в магазине пока нет.
Интерфейс подходит для разрешения экрана 1080х1920.<br />
Приложение позволяет:<br />
- отобразить данные о заряде аккумулятора, температуры двигателя и салона<br />
- запустить двигатель на 10 или 15 минут<br />
- остановить двигатель по истечении назначенного времени<br />
- добавить 5 минут к текущему времени<br />
<br />
Исходный код приложения на <a href="https://github.com/Leancher/AL.Software.StartingEngine.AndApp">GitHub</a>
<br /><br />
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/Project03-01.png' />")
%>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
<%
        Response.Write("<img src='../" + Config.ContentPhotoFolder + "/Project03-02.png' />")
%>
