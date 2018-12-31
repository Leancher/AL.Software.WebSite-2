Partial Class Page_ContentPage
    Inherits UserControl
    Private CategoryModule As String = ""
    Private ArticleModule As String = ""
    Private PhotoModule As String = ""
    Private Database As New DatabaseConnect()
    Private CategoryName As String = ""
    Shadows ID As String = ""
    Private TableName As String = ""
    Private Sub Page_ContentPage_Load(sender As Object, e As EventArgs) Handles Me.Load
        ErrorMessage.Text = ""
        Database.DatabaseOpen()
        SetMenu()
        'Получаем данные из адресной строки
        CategoryName = Request.QueryString("category")
        ID = Request.QueryString("ID")
        'Если значения ID нет, то показываем категорию, если есть, то - подкатегорию 
        If CInt(ID) > 0 Then ShowArticle()
        If ID = Nothing Then ShowCategory()
        SetModule()
        Database.DatabaseClose()
    End Sub
    Private Sub SetModule()
        If CategoryModule = Nothing Then CategoryModule = Config.PageFolder + "Empty.ascx"
        If ArticleModule = Nothing Then ArticleModule = Config.PageFolder + "Empty.ascx"
        If PhotoModule = Nothing Then PhotoModule = Config.PageFolder + "Empty.ascx"
        Try
            PhotoBlock.Controls.Add(Page.LoadControl(PhotoModule))
            ArticleBlock.Controls.Add(Page.LoadControl(ArticleModule))
            CategoryBlock.Controls.Add(Page.LoadControl(CategoryModule))
        Catch ex As Exception
            ErrorMessage.Text = "Такой страницы не существует"
        End Try
    End Sub
    Private Sub ShowCategory()
        'Если октрыта Статистика, то больше ничего не делаем
        If CategoryName = "statistics" Then
            Caption.Text = "Статистика"
            CategoryModule = Config.PageFolder + "Statistics.ascx"
            Exit Sub
        End If
        If CategoryName = "about" Then
            Caption.Text = "О сайте"
            CategoryModule = Config.PageFolder + "About.ascx"
            Exit Sub
        End If       'Сначала считаем, что для каждой категории есть своя страница
        CategoryModule = Config.PageFolder + CategoryName + ".ascx"
        TableName = Config.CategoryTable
        'Если страницу нужно показать в виде плитки, то открываем страницу-шаблон
        If Database.GetItemByName(TableName, CategoryName, "IsTileGrid") = "1" Then CategoryModule = Config.PageFolder + "CategoryTileGrid.ascx"
        ID = Database.GetItemByName(TableName, CategoryName, "ID")
        Caption.Text = Database.GetItemByName(TableName, CategoryName, "Caption")
        Page.Title = Caption.Text + " - " + Config.SiteTitle
        Page.MetaDescription = Database.GetItemByName(TableName, CategoryName, "Description")
    End Sub
    Private Sub ShowArticle()
        TableName = CategoryName
        ArticleModule = "Content/" + CategoryName + ID + ".ascx"
        If Database.GetItemByID(TableName, ID, "IsPhotoAlbum") = "1" Then
            PhotoModule = Config.PageFolder + "PhotoViewer.ascx"
            Dim FileInfo As New IO.FileInfo(Config.AppPath + "/" + ArticleModule)
            If FileInfo.Exists = False Then ArticleModule = Config.PageFolder + "Empty.ascx"
        End If
        Caption.Text = Database.GetItemByID(TableName, ID, "Caption")
        Page.Title = Caption.Text + " - " + Config.SiteTitle
        Page.MetaDescription = Database.GetItemByID(TableName, ID, "Description")
    End Sub
    Private Sub SetMenu()
        For NumberCategory = 1 To Database.GetCountItem(Config.CategoryTable)
            Dim ItemLink As New HyperLink With {
                .NavigateUrl = Config.DefaultPage + "?category=" + Database.GetItemByID(Config.CategoryTable, NumberCategory, "Name"),
                .Text = Database.GetItemByID(Config.CategoryTable, NumberCategory, "Caption")
            }
            MenuBlock.Controls.Add(ItemLink)
        Next NumberCategory
    End Sub
End Class
