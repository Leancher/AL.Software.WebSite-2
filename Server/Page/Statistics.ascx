<%@ Control Language="VB" AutoEventWireup="false" CodeFile="Statistics.ascx.vb" Inherits="Page_Statistics" %>
<script type="text/javascript">

    let currentDocument = '';
    let statBlock;

    const showContent = () => {
        currentDocument = document;
        statBlock = document.getElementById("StatBlock");
        statBlock1 = document.getElementById("Column1");
        statBlock2 = document.getElementById("Column2");
        getCountView();
    };

    const getCountView = () => {
        const Request = new XMLHttpRequest();
        Request.open('GET', 'Page/RequestProcessor.aspx?Command=GetCountView', true);
        Request.onreadystatechange = () => {
            if (Request.readyState === 4) {
                const responseString = Request.responseText;
                showData(responseString);
            }
        };
        Request.send();
    };

    const listProcess = (list) => {
        return list.split("|").map((item) => {
            const objItem = item.split(";");
            return { categoryName: objItem[0], numberItem: objItem[1], caption: objItem[2], count: objItem[3] };
        }).sort((a, b) => b.count - a.count);
    };

    const showData = (responseString) => {
        const listCountView = listProcess(responseString);
        const len = listCountView.length;
        for (const index in listCountView) {
            const curItem = currentDocument.createElement('label');
            const navigateUrl = '/Default.aspx?category=' + listCountView[index].categoryName + '&ID=' + listCountView[index].numberItem;
            curItem.innerHTML = '<a href="' + navigateUrl + '">' + listCountView[index].caption + '</a> - ' + listCountView[index].count + '<br>';
            index < len / 2 ? statBlock1.appendChild(curItem) : statBlock2.appendChild(curItem);
        }
    };
    document.addEventListener('DOMContentLoaded', showContent);

</script>
<table style="width:100%">
    <tr>
        <td id="Column1" style="width:50%"/>
        <td id="Column2" style="width:50%"/>
    </tr>
</table>
<div id="StatBlock"/>