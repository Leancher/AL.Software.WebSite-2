<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>
<!DOCTYPE html>

<html>
<head runat="server">
    <title></title>   
    <link rel="stylesheet" href="../Style.css" />
    <asp:Literal ID="MetaString" runat="server" />
    <script type="text/javascript" src="Page/YandexCounter.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="header">
            <div class="HeaderTitle">
                <a href ="Default.aspx">
                    <asp:Image ID="LogoPic" runat="server" />
                    LEANCHER 
                </a>
            </div>
            <div style="margin-left:auto;margin-right:18px;text-align:right">
                <!-- Yandex.Metrika informer --> 
                <a href="https://metrika.yandex.ru/stat/?id=48946694&amp;from=informer" target="_blank" rel="nofollow">
                    <img src="https://informer.yandex.ru/informer/48946694/3_0_FFFFFFFF_EFEFEFFF_0_pageviews" 
                        style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" 
                        title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" 
                        class="ym-advanced-informer" data-cid="48946694" data-lang="ru" />
                </a>
                <!-- /Yandex.Metrika informer -->
                <br />
                <asp:HyperLink id="lbStat" runat="server" CssClass ="HeaderMenu" Text="Статистика" /><br />
                <asp:HyperLink id="lbAbout" runat="server" CssClass ="HeaderMenu" Text="О сайте" />
            </div>          
        </div>
        <div class="Body">
            <asp:PlaceHolder runat="server" ID="SiteBody" />
        </div>
    </form>
</body>
</html>