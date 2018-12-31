Partial Class Page_ShowTileGrid
    Inherits UserControl
    Private Sub Page_ShowTileGrid_Load(sender As Object, e As EventArgs) Handles Me.Load
        Dim CurrentTile As Integer
        Dim Database As New DatabaseConnect()
        Dim Category As String = Request.QueryString("category")
        Database.DatabaseOpen()
        For CurrentTile = 1 To Database.GetCountItem(Category)
            Dim TileCell As New Panel()
            Dim PageLink As New HyperLink With {
                .NavigateUrl = Config.DefaultPage + "?category=" + Category + "&ID=" + CurrentTile.ToString
            }
            Dim TileCellPic As New Panel With {
                .CssClass = "TileCellPic"
            }
            TileCellPic.Controls.Add(New Image With {
                .ImageUrl = GetPhotoPath(Category, CurrentTile)
            })
            Dim TileCellCaption As New Panel With {
                .CssClass = "TileCellCaption"
            }
            Dim CaptionLabel As New Label()
            Dim Caption As String = Database.GetItemByID(Category, CurrentTile, "Caption")
            If Len(Caption) < 40 Then Caption = Caption + "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            CaptionLabel.Text = Caption
            TileCellCaption.Controls.Add(CaptionLabel)
            TileCell.CssClass = "TileCell"
            PageLink.Controls.Add(TileCellPic)
            PageLink.Controls.Add(TileCellCaption)
            TileCell.Controls.Add(PageLink)
            TileGrid.Controls.Add(TileCell)
        Next CurrentTile
        Database.DatabaseClose()
    End Sub

    Function GetPhotoPath(Category As String, CurrentTile As Integer) As String
        'Получаем полный путь для проверки наличия файла
        Dim PhotoPath As String = Config.AppPath + "Pictures\Preview\" + Category + CurrentTile.ToString + ".jpg"
        Dim FileInfo As New System.IO.FileInfo(PhotoPath)
        'Пока считаем, что файла не существует
        PhotoPath = "../" + Config.PicturesFolder + "/Noimage.jpg"
        'Если файл существует, то делаем относительный путь к файлу, полный путь не загружает картинки
        If FileInfo.Exists = True Then PhotoPath = "../Pictures/Preview/" + Category + CurrentTile.ToString + ".jpg"
        Return PhotoPath
    End Function
End Class
