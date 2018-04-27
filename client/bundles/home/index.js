class App {

    constructor () {
        this.initializeSearchBox();
        this.initializeDocumentsList();
        this.initializeHotKeys();
    }

    initializeHotKeys () {
        window.addEventListener('keydown', (e) => {
            if (e.altKey && ['Digit1', 'Digit2', 'Digit3'].includes(e.code)) {
                document.body.classList.remove('one')
                document.body.classList.remove('two')
                if (e.code === 'Digit1') document.body.classList.add('one');
                if (e.code === 'Digit2') document.body.classList.add('two');
            }
        })
    }

    initializeDocumentsList () {
        const allListItems = $$('body > div.column.titles > ul > li');
        const that = this;
        for (let item of allListItems) {
            item.onclick = function () {
                that.selectDocument(this.getAttribute('data-id'))
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

}

const app = new App