using System.Collections.Specialized;
using System.Collections.Generic;

public class RequestHandler
{
    string Command = "";
    int CatNumber = 0;
    int SubCatNumber = 0;
    delegate string DelegateCommandHandler(int Number);
    NameValueCollection QueryString;

    Dictionary<string, DelegateCommandHandler> Commands = new Dictionary<string, DelegateCommandHandler>
    {
        {"getCategoriesList", GetCategoriesList },
        {"getCurrentCategory", GetCurrentCategory }
    };

    public RequestHandler(NameValueCollection QueryString)
    {      
        this.QueryString = QueryString;
    }

    void QueryStringParser()
    {
        Command = QueryString.Get("Command");
        CatNumber = int.Parse(QueryString.Get("cat"));
        SubCatNumber = int.Parse(QueryString.Get("subCat"));
    }

    public string GetResponseString()
    {
        QueryStringParser();
        DelegateCommandHandler CommandHandler;
        CommandHandler = Commands[Command];
        string Result = CommandHandler(CatNumber);
        return Result;
    }

    private static string GetCategoriesList(int Number)
    {
        return "";
    }

    private static string GetCurrentCategory(int Number)
    {
        return "";
    }
}