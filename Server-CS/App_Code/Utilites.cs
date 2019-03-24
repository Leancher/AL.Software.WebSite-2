using System;
using System.IO;
using System.Collections.Specialized;
using System.Collections;

public class Utilites
{
    public static string CategoryTable  = "CategoryList";
    public Utilites()
    {

    }
    public static string GetAppPath()
    {
        string Path = AppDomain.CurrentDomain.BaseDirectory;
        DirectoryInfo DirInfo = new DirectoryInfo(Path);
        return DirInfo.Parent.FullName;
    }

    public static Hashtable QueryStringParser(NameValueCollection QueryString)
    {
        return new Hashtable
        {
            { "Command", QueryString.Get("Command") },
            { "CatNumber", QueryString.Get("cat") },
            { "SubCatNumber", QueryString.Get("subCat") }
        };
    }
}