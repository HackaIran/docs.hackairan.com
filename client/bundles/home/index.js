class App {

    constructor () {
        this.initializeSearchBox();
        this.initializeDocumentsList();
        this.initializeHotKeys();
    }

    initializeHotKeys () {
        window.addEventListener('keydown', (e) => {
            const digits = ['Digit1', 'Digit2', 'Digit3'];
            if (e.altKey && digits.includes(e.code)) {
                this.columnsPreview(parseInt(digits.indexOf(e.code)) + 1)
            }
        })
    }

    columnsPreview (type) {
        for (let i = 1; i <= 3; i++) $('body').classList.remove('divide-' + i);
        $('body').classList.add('divide-' + type);
    }

    initializeDocumentsList () {
        const allListItems = $$('body > div.column.titles > ul > li');
        const that = this;
        for (let item of allListItems) {
            item.onclick = function () {

                let uniqueUrl = this.getAttribute('data-id');
                document.querySelector('.article-loading').style.display = 'block';
                that.selectDocument(uniqueUrl)
                that.loadDocument(uniqueUrl)
            }
        }
        let categories = document.querySelectorAll('.categories > li')
        for(let item of categories){
            item.onclick = function(){
                let _id = this.getAttribute('data-id');
                document.querySelector('.articles-loading').style.display = 'block';
                that.filterByCategory(_id)
            }
        }
    }

    selectDocument (id) {
        const allListItems = $$('body > div.column.titles > ul > li');
        for (let item of allListItems) {
            if (item.getAttribute('data-id') === id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active')
            }
        }
    }

    initializeSearchBox () {
        this.searchBox = $('.search-documents');
        this.searchBox.onchange = this.searchBox.onkeyup = this.doSearch.bind(this);
    }

    doSearch () {
        const query = this.searchBox.value.toLowerCase();
        const allListItems = $$('body > div.column.titles > ul > li');
        for (let item of allListItems) item.classList.remove('hidden');
        for (let item of allListItems) {
            if (!item.innerText.toLowerCase().includes(query)) item.classList.add('hidden');
        }
    }

    loadDocument(uniqueUrl) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                document.querySelector('.article-loading').style.display = 'none';
                document.querySelector('.article-title').innerHTML = res.title;
                document.querySelector('.article-content').innerHTML = res.text;
            }
        };
        xhttp.open("GET", "/getTextByUniqueUrl/" + uniqueUrl, true);
        xhttp.send();
    }

    filterByCategory(_id){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                document.querySelector('.column.titles > ul').innerHTML = '';

                for(let item of res){

                    let newDoc = document.createElement('li');

                    let newDocTitle = document.createElement('h3')
                    let newDocTitleText = document.createTextNode(item.name)
                    newDocTitle.appendChild(newDocTitleText);

                    let newDocDetails = document.createElement('span')

                    let newDocDateTime = document.createElement('time')
                    let newDocDateTimeData = document.createTextNode(item.modifiedAt)
                    newDocDateTime.appendChild(newDocDateTimeData);

                    let newDocDetailSeprator = document.createElement('span')
                    let newDocDSData = document.createTextNode(' | ')
                    newDocDetailSeprator.appendChild(newDocDSData);

                    let newDocAuthor = document.createElement('span')
                    let newDocAuthorData = document.createTextNode(item.author)
                    newDocAuthor.appendChild(newDocAuthorData);

                    newDocDetails.appendChild(newDocDateTime);
                    newDocDetails.appendChild(newDocDetailSeprator);
                    newDocDetails.appendChild(newDocAuthor);

                    let newDocSummary = document.createElement('p');
                    let newDocSummaryData = document.createTextNode(item.summary);
                    newDocSummary.appendChild(newDocSummaryData);

                    newDoc.appendChild(newDocTitle)
                    newDoc.appendChild(newDocDetails)
                    newDoc.appendChild(newDocSummary)
                    newDoc.setAttribute('data-id', item.uniqueUrl)

                    document.querySelector('.column.titles > ul').appendChild(newDoc);

                    

                }
                
                document.querySelector('.articles-loading').style.display = 'none';

                // - for (let document of documents) {
                //     li(data-id=document.uniqueUrl)
                //       h3= document.name
                //       span
                //         time= document.modifiedAt
                //         span  | 
                //         span= document.author
                //       p= document.summary
                //   - }


            }
        };
        xhttp.open("GET", "/category/" + _id, true);
        xhttp.send();
    }

}

const app = new App