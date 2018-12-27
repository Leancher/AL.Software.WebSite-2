Partial Class _Default
    Inherits Page
    Private Database As New DatabaseConnect()
    Private CategoryName As String = ""
    Private SiteBodyPage As String = ""

    Private Sub _Default_Load(sender As Object, e As EventArgs) Handles Me.Load
        MetaString.Text = ""
        Database.DatabaseOpen()
        CategoryName = Request.QueryString("category")
        If CategoryName = Nothing Then CategoryName = Config.CategoryMain
        If CategoryName = Config.CategoryMain Then
            SiteBodyPage = "Page/PageMain.ascx"
        Else
            SiteBodyPage = "Page/PageContent.ascx"
        End If
        SiteBody.Controls.Add(Page.LoadControl(SiteBodyPage))
        lbStat.NavigateUrl = Config.DefaultPage + "?category=statistics"
        lbAbout.NavigateUrl = Config.DefaultPage + "?category=about"
        LogoPic.ImageUrl = Config.PicturesFolder + "/Logo/" + CategoryName + ".png"
        Page.MetaDescription = Database.GetItemByName(Config.CategoryTable, CategoryName, "Description")
        Page.Title = Database.GetItemByName(Config.CategoryTable, CategoryName, "Caption") + " - " + Config.SiteTitle
        If CategoryName = "statistics" Then
            Page.Title = "Статистика" + " - " + Config.SiteTitle
            MetaString.Text = "<meta name='robots' content='noindex'>"
            Page.MetaDescription = ""
        End If
        If CategoryName = "about" Then Page.Title = "О сайте" + " - " + Config.SiteTitle
        'If CategoryName <> "statistics" And CategoryName <> "about" Then UpdateCountView()
        Database.DatabaseClose()
    End Sub
    Private Sub UpdateCountView()
        Dim ID As String = Request.QueryString("ID")
        If ID = Nothing Then
            ID = Database.GetItemByName(Config.CategoryTable, CategoryName, "ID")
            CategoryName = Config.CategoryTable
        End If
        If Request.QueryString("Note") <> Nothing Then ID = Request.QueryString("Note")
        Dim CountView As Integer = CInt(Database.GetItemByID(CategoryName, ID, "Viewed")) + 1
        Database.UpdateViewValue(CategoryName, ID, CountView.ToString)
    End Sub
End Class
