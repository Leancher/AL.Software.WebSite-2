Imports System.Windows.Media.Imaging
Imports System.IO
Partial Class Page_PhotoProcessor
    Inherits Page
    Private Database As New DatabaseConnect()
    Private NumberAlbum As String
    Private Category As String
    Private Command As String
    Private Sub Page_GetPhotos_Load(sender As Object, e As EventArgs) Handles Me.Load
        Console.Write("Page_GetPhotos_Load")
        Command = Request.QueryString("Command")
        NumberAlbum = Request.QueryString("Album")
        Category = Request.QueryString("Category")
        Dim ResponseString As String = ""
        If Command = "Categories" Then ResponseString = GetCategories()
        If Command = "ListPhoto" Then ResponseString = GetListPhoto()
        If Command = "DescriptionPhoto" Then ResponseString = GetDataFromExif()
        If Command = "DescriptionAlbum" Then ResponseString = GetDescriptionAlbum()
        If Command = "GetCountView" Then ResponseString = GetCountView()
        'Для возможности отправки с другого сайта
        Response.AppendHeader("Access-Control-Allow-Origin", "*")
        Response.Write(ResponseString)
    End Sub
    Private Function GetCategories() As String
        Database.DatabaseOpen()
        Dim CountCategory = Database.GetCountItem(Config.CategoryTable)
        Dim ArrayCats(CountCategory - 1) As String
        For index = 1 To CountCategory
            Dim Category = Database.GetItemByID(Config.CategoryTable, index, "Name")
            Dim Caption = Database.GetItemByID(Config.CategoryTable, index, "Caption")
            ArrayCats(index - 1) = Category + "=" + Caption
        Next index
        Return String.Join("&", ArrayCats)
    End Function
    Private Function GetCountView() As String
        Dim Index As Integer = 0
        Dim ResponseString As String = ""
        Dim CountCategory As Integer
        Dim CountItemCategory As Integer
        Dim CountView As String
        Database.DatabaseOpen()
        CountCategory = Database.GetCountItem(Config.CategoryTable)
        For NumberCategory = 1 To CountCategory
            Dim CategoryName = Database.GetItemByID(Config.CategoryTable, NumberCategory, "Name")
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
        Next NumberCategory
        ResponseString = Right(ResponseString, ResponseString.Length - 1)
        Database.DatabaseClose()
        Return ResponseString
    End Function

    Private Function GetListPhoto() As String
        Dim ResponseString As String = ""
        Dim Index As Integer = 0
        Dim Path As String = Config.AppPath + "Pictures\" + Category + "\Album" + NumberAlbum + "Preview"
        Try
            Dim ListPhoto As String() = Directory.GetFiles(Path)
            'Удаление полного пути к рисункам, рисунок с полным путем не загружается
            For Each CurrentPhoto In ListPhoto
                Dim FileInfo As New FileInfo(Path)
                ListPhoto(Index) = IO.Path.GetFileName(CurrentPhoto)
                ResponseString = ResponseString + ";" + ListPhoto(Index)
                Index = Index + 1
            Next
            ResponseString = Right(ResponseString, ResponseString.Length - 1)
        Catch ex As Exception

        End Try
        Index = 0
        Return ResponseString
    End Function
    Private Function GetDescFromDB() As String
        Dim ResponseString As String = ""
        Database.DatabaseOpen()
        Dim NameTable As String = Category + NumberAlbum
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
        Dim Path As String = Config.AppPath + "Pictures\" + Category + "\Album" + NumberAlbum
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
        Dim Path = Config.AppPath + "Content" + "\" + Category + NumberAlbum + ".txt"
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