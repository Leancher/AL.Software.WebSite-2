using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class CatsPropsList : Category
{
    public CatsPropsList()
    {
        
    }

    public string GetCatsPropsList()
    {
        string[] PropsList = new string[EntriesCount - 1];
        for (int Index=0; Index < EntriesCount; Index++)
        {
            PropsList[Index] = GetCategoryProps(Index);
        }
        return string.Join("&", PropsList);
    }
}