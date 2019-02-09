Imports System.Windows.Media.Imaging
Imports System.IO
Imports System.Diagnostics

Partial Class Page_PhotoProcessor
    Inherits Page
    Private Database As New DatabaseConnect()
    Private AlbumID As String
    Private Category As String
    Private Command As String
    Private CatNumber As String
    Private Sub Page_GetPhotos_Load(sender As Object, e As EventArgs) Handles Me.Load
        Command = Request.QueryString("Command")
        CatNumber = Request.QueryString("cat")
        AlbumID = Request.QueryString("album")
        'Category = Request.QueryString("Category")
        Dim ResponseString As String = ""
        'Для возможности отправки с другого сайта
        Response.AppendHeader("Access-Control-Allow-Origin", "*")

        Select Case Command
            Case "TestCommand"
                ResponseString = "TestResponse"
            Case "getCategoriesList"
                ResponseString = GetCategoriesList()
            Case "getCurrentCategory"
                ResponseString = GetCategory()
            Case "getPhotosList"
                ResponseString = GetPhotosList()
            Case "DescriptionPhoto"
                ResponseString = GetDataFromExif()
            Case "DescriptionAlbum"
                ResponseString = GetDescriptionAlbum()
            Case "GetCountView"
                ResponseString = GetCountView()
            Case "getNotesPreview"
                ResponseString = GetNotesPreview()
            Case "getSingleNote"
                ResponseString = GetSingleNote()
        End Select
        Response.Write(ResponseString)
    End Sub
    Private Function GetCategoriesList() As String
        Database.DatabaseOpen()
        Dim CountCategory = Database.GetCountItem(Config.CategoryTable)
        Dim ArrayCats(CountCategory - 1) As String
        For index = 1 To CountCategory
            Dim Name = Database.GetItemByID(Config.CategoryTable, index, "Name")
            Dim Caption = Database.GetItemByID(Config.CategoryTable, index, "Caption")
            Dim IsTileGrid = Database.GetItemByID(Config.CategoryTable, index, "IsTileGrid")
            Dim IsPhotoAlbum = Database.GetItemByID(Config.CategoryTable, index, "IsPhotoAlbum")
            Dim Description = Database.GetItemByID(Config.CategoryTable, index, "Description")
            ArrayCats(index - 1) = Name + ";" + Caption + ";" + Description + ";" + IsPhotoAlbum + ";" + IsTileGrid
        Next index
        Database.DatabaseClose()
        Return String.Join("&", ArrayCats)
    End Function
    Private Function GetCategory() As String
        Database.DatabaseOpen()
        If CatNumber = "" Then Return ""
        CatNumber = Val(CatNumber) + 1
        Dim CatName As String = Database.GetItemByID(Config.CategoryTable, CatNumber, "Name")
        Dim CatCaption As String = Database.GetItemByID(Config.CategoryTable, CatNumber, "Caption")
        Dim CatIsTileGrid = Database.GetItemByID(Config.CategoryTable, CatNumber, "IsTileGrid")
        Dim CountItems = Database.GetCountItem(CatName)
        Dim ArrayItems(CountItems) As String
        ArrayItems(0) = CatName + ";" + CatCaption + ";;;" + CatIsTileGrid
        For index = 1 To CountItems
            Dim Caption = Database.GetItemByID(CatName, index, "Caption")
            Dim Description = Database.GetItemByID(CatName, index, "Description")
            Dim IsPhotoAlbum = Database.GetItemByID(CatName, index, "IsPhotoAlbum")
            Dim IsArticle = Database.GetItemByID(CatName, index, "IsArticle")
            ArrayItems(index) = CatName + ";" + Caption + ";" + Description + ";" + IsPhotoAlbum + ";" + IsArticle
        Next index
        Database.DatabaseClose()
        Return String.Join("&", ArrayItems)
    End Function
    Private Function GetNotesPreview() As String
        Database.DatabaseOpen()
        Dim TableName = "MyNotes"
        Dim CountItems = Database.GetCountItem(TableName)
        Dim ArrayItems(CountItems) As String
        For Index = 1 To CountItems
            Dim Path = Config.GetAppPath() + "\src\Content" + "\" + "MyNote" + Index.ToString + ".txt"
            Dim FileInfo As New FileInfo(Path)
            If FileInfo.Exists = True Then
                Dim Caption = Database.GetItemByID(TableName, Index, "Caption")
                Using reader As New StreamReader(Path)
                    ArrayItems(Index) = Caption + ";" + Left(reader.ReadToEnd(), 300)
                End Using
            End If
        Next Index
        Database.DatabaseClose()
        Return String.Join("&", ArrayItems)
    End Function
    Private Function GetSingleNote() As String
        Dim NumNote = Request.QueryString("note")
        Dim Path = Config.GetAppPath() + "\src\Content" + "\" + "MyNote" + NumNote.ToString + ".txt"
        Dim FileInfo As New FileInfo(Path)
        If FileInfo.Exists = True Then
            Using reader As New StreamReader(Path)
                Return reader.ReadToEnd()
            End Using
        End If
        Return ""
    End Function
    Private Function GetPhotosList() As String
        Database.DatabaseOpen()
        CatNumber = Val(CatNumber) + 1
        Dim NameCategory As String = Database.GetItemByID(Config.CategoryTable, CatNumber, "Name")
        Database.DatabaseClose()
        Dim Path As String = Config.GetAppPath() + "\public\Pictures\" + NameCategory + "\Album" + AlbumID + "Preview"
        Try
            Dim ListPhoto As String() = Directory.GetFiles(Path)
            For i = 0 To ListPhoto.Length - 1
                Dim FileInfo As New FileInfo(Path)
                ListPhoto(i) = IO.Path.GetFileName(ListPhoto(i))
            Next i
            Return String.Join("&", ListPhoto)
        Catch ex As Exception
            Return ""
        End Try
    End Function
    Private Function GetCountView() As String
        Dim Index As Integer = 0
        Dim ResponseString As String = ""
        Dim CountCategory As Integer
        Dim CountItemCategory As Integer
        Dim CountView As String
        Database.DatabaseOpen()
        CountCategory = Database.GetCountItem(Config.CategoryTable)
        For Index = 1 To CountCategory
            Dim CategoryName = Database.GetItemByID(Config.CategoryTable, CatNumber, "Name")
            CountItemCategory = Database.GetCountItem(CategoryName)
            Dim NumberItem As Integer
            For NumberItem = 1 To CountItemCategory
                CountView = Database.GetItemByID(CategoryName, NumberItem, "Viewed")
                If CountView <> "0" Then
                    Dim Caption = Database.GetItemByID(CategoryName, NumberItem, "Caption")
                    Dim item = CategoryName + ";" + NumberItem.ToString + ";" + Caption + ";" + CountView
                    ResponseString = ResponseString + "|" + item
                End If
            Next NumberItem
        Next Index
        ResponseString = Right(ResponseString, ResponseString.Length - 1)
        Database.DatabaseClose()
        Return ResponseString
    End Function
    Private Function GetDescFromDB() As String
        Dim ResponseString As String = ""
        Database.DatabaseOpen()
        Dim NameTable As String = Category + AlbumID
        Dim CountIten = Database.GetCountItem(NameTable)
        Dim Item As String
        For index = 1 To CountIten
            Item = Database.GetItemByID(NameTable, index, "Adresse")
            If Item = Nothing Then Item = "Нет данных"
            ResponseString = ResponseString + ";" + Item
        Next index
        ResponseString = Right(ResponseString, ResponseString.Length - 1)
        Database.DatabaseClose()
        Return ResponseString
    End Function
    Private Function GetDataFromExif() As String
        Dim Path As String = Config.AppPath + "Pictures\" + Category + "\Album" + AlbumID
        Dim ResponseString As String = ""
        Try
            Dim ListPhoto As String() = Directory.GetFiles(Path)
            For Each Photo In ListPhoto
                Dim FStream As New FileStream(Photo, FileMode.Open, FileAccess.Read)
                Dim FDecoder As New JpegBitmapDecoder(FStream, BitmapCreateOptions.IgnoreColorProfile, BitmapCacheOption.Default)
                Dim Metadata As New BitmapMetadata("jpg")
                Metadata = FDecoder.Frames(0).Metadata.Clone()
                ResponseString = ResponseString + ";" + Metadata.Comment
                FStream.Close()
            Next Photo
        Catch ex As Exception

        End Try
        ResponseString = Right(ResponseString, ResponseString.Length - 1)
        Return ResponseString
    End Function
    Private Function GetDescriptionAlbum() As String
        Dim Path = Config.AppPath + "Content" + "\" + Category + AlbumID + ".txt"
        Dim txt As String
        Dim FileInfo As New FileInfo(Path)
        If FileInfo.Exists = True Then
            Using reader As New StreamReader(Path)
                txt = reader.ReadToEnd()
            End Using
        Else
            txt = ""
        End If
        Return txt
    End Function
End Class