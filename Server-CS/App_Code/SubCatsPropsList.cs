using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class SubCatsPropsList : Category
{
    int CategoryNumber = 0;

    public SubCatsPropsList(int Number) : base (Number)
    {
        CategoryNumber = Number;
    }

    public string GetSubCatsPropsList()
    {
        string[] PropsList = new string[EntriesCount];
        PropsList[0] = GetCategoryProps(CategoryNumber);
        for (int Index = 1; Index < EntriesCount; Index++)
        {
            PropsList[Index] = GetCategoryProps(Index);
        }
        return string.Join("&", PropsList);
    }
}