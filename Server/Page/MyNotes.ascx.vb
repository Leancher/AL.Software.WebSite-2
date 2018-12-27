Imports System.IO
Partial Class Page_MyNote
    Inherits UserControl
    Dim Database As New DatabaseConnect()
    Private Sub Page_MyNote_Load(sender As Object, e As EventArgs) Handles Me.Load
        Database.DatabaseOpen()
        If CInt(Request.QueryString("Note")) > 0 Then
            LoadSingleNote()
            Exit Sub
        End If
        For index = 1 To Database.GetCountItem("MyNotes")
            Dim NoteCaption As New Label With {
                .Text = Database.GetItemByID("MyNotes", index, "Caption")
            }
            NoteCaption.Font.Bold = True
            NoteCaption.Font.Size = 13
            Dim NotePreview As New Label()
            NotePreview.Text = GetPreviewNotes(index)
            Dim lnk As New HyperLink With {
                .NavigateUrl = Config.DefaultPage + "?category=MyNotes&Note=" + index.ToString,
                .Text = "Показать полностью...",
                .CssClass = "TextLink"
            }
            Dim br As New Literal With {
                .Text = "<br>"
            }
            Dim p As New Literal With {
                .Text = "<p>"
            }
            NotesPlace.Controls.Add(p)
            NotesPlace.Controls.Add(NoteCaption)
            NotesPlace.Controls.Add(br)
            NotesPlace.Controls.Add(NotePreview)
            NotesPlace.Controls.Add(lnk)
        Next
        Database.DatabaseClose()
    End Sub
    Private Function GetPreviewNotes(NoteNumber As Integer) As String
        Dim Path = Config.AppPath + "Content" + "\" + "MyNote" + NoteNumber.ToString + ".txt"
        Dim FileInfo As New FileInfo(Path)
        If FileInfo.Exists = True Then
            Using reader As New StreamReader(Path)
                Return Left(reader.ReadToEnd(), 300) + "&nbsp;&nbsp;&nbsp;"
            End Using
        End If
        Return ""
    End Function
    Private Sub LoadSingleNote()
        Dim NumberNote As Integer = CInt(Request.QueryString("Note"))
        Dim NoteCaption As New Label With {
            .Text = Database.GetItemByID("MyNotes", NumberNote, "Caption")
        }
        NoteCaption.Font.Bold = True
        NoteCaption.Font.Size = 16
        Dim Note As New Label()
        Dim Path = Config.AppPath + "Content" + "\" + "MyNote" + NumberNote.ToString + ".txt"
        Dim FileInfo As New FileInfo(Path)
        If FileInfo.Exists = True Then
            Using reader As New StreamReader(Path)
                Note.Text = reader.ReadToEnd()
            End Using
        Else
            Note.Text = "Такой заметки не существует"
        End If
        Dim p As New Literal With {
                .Text = "<p>"
            }
        NotesPlace.Controls.Add(NoteCaption)
        NotesPlace.Controls.Add(p)
        NotesPlace.Controls.Add(Note)
    End Sub
End Class
