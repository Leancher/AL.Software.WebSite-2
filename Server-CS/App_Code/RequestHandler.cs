using System.Collections;
using System.Collections.Specialized;

public class RequestHandler
{
    string RequestCommand = "";

    public RequestHandler(NameValueCollection QueryString)
    {
        //Парсим строку запроса в массив (ключ: значение)
        Hashtable QueryStringProps = Utilites.QueryStringParser(QueryString);
    }
}