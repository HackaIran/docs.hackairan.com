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

}

const app = new App