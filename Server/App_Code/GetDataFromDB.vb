Imports System.Diagnostics
Imports Microsoft.VisualBasic

Public Class GetDataFromDB
    Private Database As New DatabaseConnect()
    Sub New()

    End Sub
    Public Function GetCountCategories() As Integer
        Return Database.GetCountItem(Config.CategoryTable)
    End Function
    Public Function GetCategoriesNameList() As String()
        Dim ArrayCategoriesName(GetCountCategories() - 1) As String
        Return ArrayCategoriesName.Select(Function(item, index) GetNameItem(index)).ToArray
    End Function
    Function GetNameItem(Index As Integer) As String
        Return Database.GetItemByID(Config.CategoryTable, Index, "Name")
    End Function
    Public Function GetCaptionCategory(CategoryName As String) As String
        Return Database.GetItemByID(CategoryName, 0, "Caption")
    End Function
    Public Function GetIsTileGridCategory(CategoryName As String) As String
        Return Database.GetItemByID(CategoryName, 0, "IsTileGrid")
    End Function
    Public Function GetIsPhotoAlbumCategory(CategoryName As String) As String
        Return Database.GetItemByID(CategoryName, 0, "IsPhotoAlbum")
    End Function
    Public Function GetDescriptionCategory(CategoryName As String) As String
        Return Database.GetItemByID(CategoryName, 0, "Description")
    End Function
    Public Sub WriteDataToConsole(array As String())
        For Each item In array
            Debug.WriteLine(item)
        Next item
    End Sub
End Class
