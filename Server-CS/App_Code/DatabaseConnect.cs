using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SQLite;

public class DatabaseConnect
{
    SQLiteConnection Database = new SQLiteConnection();
    SQLiteCommand Command = new SQLiteCommand ();
    public DatabaseConnect()
    {
        string DBPath = Utilites.GetAppPath() + @"\" + "Server" + @"\" + "Database.db";        
        Database = new SQLiteConnection("Data Source=" + DBPath + "; Version=3;");
    }
    public int GetCountItems(string NameTable)
    {
        Database.Open();
        Command = Database.CreateCommand();
        Command.CommandText = "SELECT Count (*) From " + NameTable;
        SQLiteDataReader ReadItem = Command.ExecuteReader();
        ReadItem.Read();
        int Item = (int)ReadItem[0];
        ReadItem.Close();
        Database.Dispose();
        return Item;
    }
    public string GetItemByID(string NameTable, int ItemID, string Prop)
    {
        Database.Open();
        Command = Database.CreateCommand();
        Command.CommandText = "SELECT * FROM " + NameTable + " WHERE ID=" + ItemID.ToString();
        SQLiteDataReader ReadItem = Command.ExecuteReader();
        while(ReadItem.Read())
            {
                string Item = (string)ReadItem.GetValue(0);
                ReadItem.Close();
                Database.Dispose();
                return Item;
            }
        return "";
    }
}