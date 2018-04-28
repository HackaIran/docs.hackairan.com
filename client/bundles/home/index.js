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
                this.columnsPreview(digits.indexOf(e.code) + 1)
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