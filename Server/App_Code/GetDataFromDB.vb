Imports System.Diagnostics
Imports Microsoft.VisualBasic
Public Class GetDataFromDB
    Private Database As New DatabaseConnect()
    Sub New()

    End Sub
    Public Function GetCategoryProp(Name As String, Optional Index As Integer = 0) As String
        Dim Caption = GetCaptionCategory(Name, Index)
        Dim Description = GetDescriptionCategory(Name, Index)
        Dim Viewed = GetViewedCategory(Name, Index)
        Dim IsPhotoAlbum = GetIsPhotoAlbumCategory(Name, Index)
        Dim IsArticle = GetIsArticleCategory(Name, Index)
        Dim IsTileGrid = GetIsTileGridCategory(Name, Index)
        Return Caption + ";" + Description + ";" + Viewed + ";" + IsPhotoAlbum + ";" + IsArticle + ";" + IsTileGrid
    End Function
    Function GetCountItems(CategoryName As String) As Integer
        Return Database.GetCountItems(CategoryName)
    End Function
    Public Function GetSubCategoriesCount(CategoryName As String) As Integer
        Return GetCountItems(CategoryName)
    End Function
    Public Function GetCategoriesNameList() As String()
        Dim ArrayCategoriesName(GetCountItems(Config.CategoryTable) - 1) As String
        Return ArrayCategoriesName.Select(Function(item, index) GetNameItem(index)).ToArray
    End Function
    Function GetNameItem(Index As Integer) As String
        Return Database.GetItemByID(Config.CategoryTable, Index, "Name")
    End Function
    Function GetCaptionCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "Caption")
    End Function
    Function GetIsTileGridCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "IsTileGrid")
    End Function
    Function GetIsPhotoAlbumCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "IsPhotoAlbum")
    End Function
    Function GetDescriptionCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "Description")
    End Function
    Function GetIsArticleCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "IsArticle")
    End Function
    Function GetViewedCategory(CategoryName As String, Index As Integer) As String
        Return Database.GetItemByID(CategoryName, Index, "Viewed")
    End Function
    Sub WriteDataToConsole(array As String())
        For Each item In array
            Debug.WriteLine(item)
        Next item
    End Sub
End Class
