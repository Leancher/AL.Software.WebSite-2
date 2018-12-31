Partial Class Page_MainPage
    Inherits UserControl
    Private Sub Page_MainPage_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim NumberCategory As Integer
        Dim Database As New DatabaseConnect()
        Dim Category As String
        Database.DatabaseOpen()
        Dim CountItem As Integer = Database.GetCountItem(Config.CategoryTable)
        For NumberCategory = 2 To CountItem
            Category = Database.GetItemByID(Config.CategoryTable, NumberCategory, "Name")
            Dim TileCell As New Panel()
            Dim PageLink As New HyperLink()
            PageLink.NavigateUrl = Config.DefaultPage + "?category=" + Category
            Dim TileCellPic As New Panel()
            Dim Picture As New Image()
            Picture.ImageUrl = GetPhotoPath(Category, NumberCategory)
            TileCellPic.CssClass = "TileCellPic"
            TileCellPic.Controls.Add(Picture)
            Dim TileCellCaption As New Panel()
            TileCellCaption.CssClass = "TileCellCaption"
            Dim CaptionLabel As New Label()
            CaptionLabel.Text = Database.GetItemByID(Config.CategoryTable, NumberCategory, "Caption")
            TileCellCaption.Controls.Add(CaptionLabel)
            TileCell.CssClass = "TileCell"
            PageLink.Controls.Add(TileCellPic)
            PageLink.Controls.Add(TileCellCaption)
            TileCell.Controls.Add(PageLink)
            TileGrid.Controls.Add(TileCell)
        Next NumberCategory
        Database.DatabaseClose()
    End Sub

    Function GetPhotoPath(Category As String, NumberCategory As Integer) As String
        'Получаем полный путь для проверки наличия файла
        Dim PhotoPath As String = Config.AppPath + "Pictures\Main\" + Category + ".png"
        Dim FileInfo As New System.IO.FileInfo(PhotoPath)
        'Пока считаем, что файла не существует
        PhotoPath = "../" + Config.PicturesFolder + "/Noimage.jpg"
        'Если файл существует, то делаем относительный путь к файлу, полный путь не загружает картинки
        If FileInfo.Exists = True Then PhotoPath = "../Pictures/Main/" + Category + ".png"
        Return PhotoPath
    End Function
End Class