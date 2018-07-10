const axios = require('axios');
const pageTitle = document.title;

class App {

    constructor () {
        this.filters = {
            category: '-',
            tag: '-'
        }
        this.initializeSearchBox();
        this.initializeDocumentsList();
        this.initializeHotKeys();
        this.initializeCategories();
        this.initializeTags();
        this.initializeOptions();
        this.selectedDocument = document.querySelector('.selectedDocument').value;
        if(this.selectedDocument){
            this.selectDocument(this.selectedDocument);
            this.loadDocument(this.selectedDocument);
        }
        this.rememberColumnsPreview();
    }

    initializeOptions () {
        const hours = (new Date()).getHours();
        if (hours > 19 || hours < 7) {
            document.body.classList.add('is-night');
        }
        document.querySelector('.option.day-night').onclick = () => {
            document.body.classList.toggle('is-night');
        }
    }

    rememberColumnsPreview () {
        const type = localStorage['docs-columns'];
        if (type) this.columnsPreview(type);
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
        localStorage['docs-columns'] = type;
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
    }

    initializeCategories(){
        const that = this;
        let categories = document.querySelectorAll('.categories > li')
        let tags = document.querySelectorAll('.hashtags > li')

        for(let item of categories){
            item.onclick = function(){

                for(let tag of tags){
                    tag.classList.remove('active');
                    if (tag.getAttribute('data-all') === 'true') {
                        tag.classList.add('active');
                    }
                }
                
                for(let cat of categories){
                    cat.classList.remove('active');
                }

                item.classList.add('active')

                let _id = this.getAttribute('data-id');
                document.querySelector('.articles-loading').style.display = 'block';
                if (item.getAttribute('data-all') === 'true') _id = '-';
                that.filters.category = _id;
                that.filters.tags = '-';
                that.filter()
            }
        }
    }

    initializeTags(){
        const that = this;
        let categories = document.querySelectorAll('.categories > li')
        let tags = document.querySelectorAll('.hashtags > li')
        for(let item of tags){
            item.onclick = function(){
                for(let tag of tags){
                    tag.classList.remove('active');
                }
                item.classList.add('active')
                let name = this.innerHTML;
                if (item.getAttribute('data-all') === 'true') name = '-'; 
                document.querySelector('.articles-loading').style.display = 'block';
                that.filters.tags = name;
                that.filter()
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
                let newTitle = pageTitle + ' | '+res.title;
                window.history.pushState("", newTitle, "/doc/"+uniqueUrl);
                setTimeout(()=>{
                    document.querySelector('.article-loading').style.display = 'none';
                    document.querySelector('.article-title').innerHTML = res.title;
                    document.querySelector('.article-content').innerHTML = res.text;
                },300)
            }
        };
        xhttp.open("GET", "/getTextByUniqueUrl/" + uniqueUrl, true);
        xhttp.send();
    }

    async filter (filters = {}) {
        if (filters.category) this.filters.category = filters.category;
        if (filters.tags) this.filters.tags = filters.tags;

        const res = await axios(`/filter/${this.filters.category}/${this.filters.tags}`);
        document.querySelector('.column.titles > ul').innerHTML = '';

        for(let item of res.data){

            let newDoc = document.createElement('li');
            if (item.uniqueUrl === this.selectedDocument) {
                newDoc.classList.add('active');
            }

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
        
        setTimeout(()=>{
            document.querySelector('.articles-loading').style.display = 'none';
        },300)

        this.initializeDocumentsList();
    }

}

const app = new App