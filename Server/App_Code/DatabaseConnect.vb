Imports System.Data.SQLite

Public Class DatabaseConnect
    Public Item As String = ""
    Public CountRecords As Integer
    Dim Database As SQLiteConnection
    Dim Command As New SQLiteCommand
    Dim ReadItem As SQLiteDataReader

    Public Sub DatabaseOpen()
        Try
            Database = New SQLiteConnection("Data Source=" + Config.GetAppPath() + "\Server\Database.db; Version=3;")
            Database.Open()
        Catch ex As Exception
            Item = ex.ToString
        End Try
    End Sub

    Public Sub UpdateViewValue(TableName As String, ItemID As String, Count As String)
        Try
            Command = Database.CreateCommand()
            Command.CommandText = "UPDATE " + TableName + " SET Viewed='" + Count + "' WHERE ID=" + ItemID
            Command.ExecuteNonQuery()
            Item = "Ok"
        Catch ex As Exception
            Item = ex.ToString
        End Try
    End Sub

    Public Function GetCountItems(NameTable As String) As Integer
        DatabaseOpen()
        Try
            Command = Database.CreateCommand()
            Command.CommandText = "SELECT Count (*) From " + NameTable
            ReadItem = Command.ExecuteReader()
            ReadItem.Read()
            Item = ReadItem(0)
            ReadItem.Close()
            DatabaseClose()
            Return CInt(Item)
        Catch ex As Exception
            DatabaseClose()
            Return 0
        End Try
    End Function
    Public Function GetItemID(NameTable As String, ItemName As String) As String
        Try
            Command = Database.CreateCommand()
            Command.CommandText = "SELECT * FROM " + Config.CategoryTable + " WHERE Name LIKE '" + ItemName + "'"
            ReadItem = Command.ExecuteReader()
            While ReadItem.Read()
                Item = ReadItem.Item("ID").ToString
                ReadItem.Close()
                Return Item
            End While
        Catch ex As Exception
            Return ex.ToString
        End Try
        Return ""
    End Function

    Public Function GetItemByName(NameTable As String, ItemName As String, ItemProperty As String) As String
        Try
            Command = Database.CreateCommand()
            Command.CommandText = "SELECT * FROM " + NameTable + " WHERE Name LIKE '" + ItemName + "'"
            ReadItem = Command.ExecuteReader()
            While ReadItem.Read()
                Item = ReadItem.Item(ItemProperty).ToString
                ReadItem.Close()
                Return Item
            End While
        Catch ex As Exception
            Return ex.ToString
        End Try
        Return ""
    End Function
    Public Function GetItemByID(NameTable As String, ItemID As String, ItemProperty As String) As String
        DatabaseOpen()
        Try
            Command = Database.CreateCommand()
            Command.CommandText = "SELECT * FROM " + NameTable + " WHERE ID=" + ItemID
            ReadItem = Command.ExecuteReader()
            While ReadItem.Read()
                Item = ReadItem.Item(ItemProperty).ToString
                ReadItem.Close()
                DatabaseClose()
                Return Item
            End While
        Catch ex As Exception
            DatabaseClose()
            Return ex.ToString
        End Try
        Return ""
    End Function

    Public Sub DatabaseClose()
        Database.Dispose()
    End Sub
End Class

