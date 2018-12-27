﻿<%@ Control Language="VB" AutoEventWireup="false" CodeFile="MyProjects1.ascx.vb" Inherits="Page_Sub_Project01" %>
<br />
Модуль автозапуска двигателя. Запуск и остановка двигателя с помощью СМС-команд или кнопкой в салоне.<br />
Версия 2 состоит из двух плат: силовая часть и GSM. Модуль имеет недостаток - большой потребляемый ток в режиме ожидания приема команд, 
поэтому питание осуществаляется от дополнительной батареи, которая заряжается во время работы двигателя автомобиля.<br />
Версия 3 выполнена на одной плате, которая пока не собрана и не проверена.<br />

Схема, плата и прошивка на <a href="https://github.com/Leancher/AL.Car.StartingEngine">GitHub</a><br />

<asp:Image ImageUrl="~/Pictures/Content/Project01-01.jpg" runat="server" />