<%@ Control Language="VB" AutoEventWireup="false" CodeFile="PhotoViewer.ascx.vb" Inherits="Page_ViewerPhotoAlbum" %>
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', ShowContent);

    var PhotoPlace, SinglePhoto, LinkFullSize;
    var CurrentDocument;
    var ListPhotos, ListDescPhoto, DescrAlbum;
    var BtNext, BtPrev, ReturnBack, CurrentNumberPhoto, DescBlock;
    let pageValue = { category: '', ID: '' };
    
    function ShowContent() {
        CurrentDocument = document;
        Content = document.getElementById("Content");
        BtNext = document.getElementById("BtNext");
        BtPrev = document.getElementById("BtPrev");
        ReturnBack = document.getElementById("ReturnBack");
        DescBlock = document.getElementById("DescBlock");
        DescBlock.innerText = "";
        DescrAlbum = "";
        ListDescPhoto = 0;
        GetQueryString();
        GetListPhoto();
    }

    const GetQueryString = () => {
        const queryString = location.search.substring(1).split("&");
        queryString.map(item => {
            const objItem = item.split('=');
            pageValue[objItem[0]] = objItem[1];
        });
    };
   
    function GetListPhoto() {
        var Request = new XMLHttpRequest();
        Request.open('GET', 'Page/RequestProcessor.aspx?Command=ListPhoto&Category=' + pageValue.category + '&Album=' + pageValue.ID, true);
        Request.onreadystatechange = function () {
            if (Request.readyState === 4) {
                var ResponseString = Request.responseText;
                ListPhotos = ResponseString.split(";");
                //Если файлов нет и строка пустая, список равен нулю
                if (ResponseString === '') ListPhotos = 0;
                //SetPhotoGrid();
                if (pageValue.ID === 6) {
                    GetDescription();
                }
                else {
                    SetPhotoGrid();
                }
            }
        };
        Request.send();
    }

    function GetDescription() {
        var Request = new XMLHttpRequest();
        Request.open('GET', 'Page/RequestProcessor.aspx?Command=DescriptionPhoto&Category=' + pageValue.category + '&Album=' + pageValue.ID, true);
        Request.onreadystatechange = function () {
            if (Request.readyState === 4) {
                var ResponseString = Request.responseText;
                ListDescPhoto = ResponseString.split(";");
                //Если данных нет и строка пустая, список равен нулю
                if (ResponseString === '') ListDescPhoto = 0;
                GetDescriptionAlbum();
            }
        };
        Request.send();
    }

    function GetDescriptionAlbum() {
        var Request = new XMLHttpRequest();
        Request.open('GET', 'Page/PhotoProcessor.aspx?Command=DescriptionAlbum&Category=' + pageValue.category + '&Album=' + pageValue.ID, true);
        Request.onreadystatechange = function () {
            if (Request.readyState === 4) {
                var ResponseString = Request.responseText;
                DescrAlbum = ResponseString;
                SetPhotoGrid();
            }
        };
        Request.send();
    }

    function SetPhotoGrid(event) {
        DescBlock.style.display = 'block';
        DescBlock.innerText = DescrAlbum;
        BtPrev.style.display = 'none';
        BtNext.style.display = 'none';
        ReturnBack.style.display = 'none';
        //Если блок с фотками уже существует, то удаляем его
        if (PhotoPlace != undefined) Content.removeChild(PhotoPlace);
        //Создаем пустой блок
        PhotoPlace = CurrentDocument.createElement('div');
        //Если список фоток пуст, то пишем, что нет картинок
        if (ListPhotos === 0)
        {
            PhotoPlace.innerText = "В этом альбоме нет картинок";
        }
        else
        {
            //Если картинки есть, то создаем сетку с фотками
            for (var i = 0; i < ListPhotos.length; i++) {
                var PhotoCell = CurrentDocument.createElement('div');
                PhotoCell.className = 'PhotoCell';
                var img = CurrentDocument.createElement('img');
                img.src = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + 'Preview/' + ListPhotos[i];
                var lnk = CurrentDocument.createElement('a');
                //Через хэш в адресной строке передаем номер картинки
                lnk.href = '#' + i;
                lnk.onclick = function () {
                    var PhotoNumber = this.hash.substring(1);
                    ShowPhoto(event,PhotoNumber);
                    event.preventDefault();
                }
                lnk.appendChild(img);       
                PhotoCell.appendChild(lnk);
                if (ListDescPhoto !== 0) {
                    var DescPhoto = CurrentDocument.createElement('span');
                    DescPhoto.innerText = ListDescPhoto[i];
                    PhotoCell.appendChild(DescPhoto);
                }
                PhotoPlace.appendChild(PhotoCell);
            }
        }
        Content.appendChild(PhotoPlace);
        event.preventDefault();        
    }

    function ShowPhoto(event, PhotoNumber) {
        DescBlock.style.display = 'none';
        BtPrev.style.display = 'block';
        BtNext.style.display = 'block';
        ReturnBack.style.display = 'block';
        CurrentNumberPhoto = +PhotoNumber; // + означет, что переменная число
        Content.removeChild(PhotoPlace);
        PhotoPlace = CurrentDocument.createElement('div');
        //Создаем ссылку на картинку в полном размере
        LinkFullSize = CurrentDocument.createElement('a');
        LinkFullSize.href = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[PhotoNumber];
        //Создаем картинку
        SinglePhoto = CurrentDocument.createElement('img');
        SinglePhoto.className = 'CurrentPhoto';
        SinglePhoto.src = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[PhotoNumber];
        //Добавляем в тело ссылки картинку
        LinkFullSize.appendChild(SinglePhoto);
        PhotoPlace.appendChild(LinkFullSize);
        Content.appendChild(PhotoPlace);
        event.preventDefault();
    }

    function BtNext_Click(event) {
        CurrentNumberPhoto = CurrentNumberPhoto + 1;  
        if (CurrentNumberPhoto > ListPhotos.length - 1) CurrentNumberPhoto = ListPhotos.length - 1;
        LinkFullSize.href = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[CurrentNumberPhoto];
        SinglePhoto.src = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[CurrentNumberPhoto];
        event.preventDefault();        
    }
    function BtPrev_Click(event) {
        CurrentNumberPhoto = CurrentNumberPhoto - 1;
        if (CurrentNumberPhoto < 0) CurrentNumberPhoto = 0;
        LinkFullSize.href = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[CurrentNumberPhoto];
        SinglePhoto.src = 'Pictures/' + pageValue.category + '/album' + pageValue.ID + '/' + ListPhotos[CurrentNumberPhoto];
        event.preventDefault();
    }
</script>
<span id="DescBlock" style="display:block" class="ContentColumn"></span>
<a href ="/" id="ReturnBack" onclick="SetPhotoGrid(event)" style="display:none" class="HeaderMenu">Вернуться в галлерею</a>         
<div style ="display:flex">
    <div class="Button">
        <a href ="/" id="BtPrev" onclick ="BtPrev_Click(event)" style="display:block">         
            <img src="Pictures/Util/ArrowLDis.png" onmousemove="this.src='Pictures/Util/ArrowLEn.png'" onmouseout="this.src='Pictures/Util/ArrowLDis.png'" />
        </a>
    </div>
    <div id="Content" class="PhotoPlace">
        
    </div>
    <div class="Button">
        <a href ="/" id="BtNext" onclick ="BtNext_Click(event)" style="display:block">         
            <img src="Pictures/Util/ArrowRDis.png" onmousemove="this.src='Pictures/Util/ArrowREn.png'" onmouseout="this.src='Pictures/Util/ArrowRDis.png'" />
        </a>
    </div>
</div>