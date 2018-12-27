<%@ Control Language="VB" AutoEventWireup="false" CodeFile="PageContent.ascx.vb" Inherits="Page_ContentPage" %>
<asp:Panel runat="server" CssClass="MainMenuLocate">
    <asp:Panel runat="server" CssClass="MenuList" ID="MenuBlock"/>
</asp:Panel>
<asp:Panel id="ContentBlock" class="ContentBlock" runat="server" >
    <asp:Label class="ContentCaption" runat="server" id="Caption" Text=""/>
    <asp:PlaceHolder ID="CategoryBlock" runat="server" />
    <div class="ContentColumn">     
        <asp:PlaceHolder ID="ArticleBlock" runat="server" /> 
    </div>
    <asp:PlaceHolder ID="PhotoBlock" runat="server" />
    <asp:Label runat="server" id="ErrorMessage" Text=""/>
</asp:Panel>