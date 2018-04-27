const searchBox = $('.search-documents');
searchBox.onchange = searchBox.onkeyup = () => {
    const query = searchBox.value.toLowerCase();
    const allListItems = $$('body > div.column.titles > ul > li');
    for (let item of allListItems) item.classList.remove('hidden');
    for (let item of allListItems) {
        if (!item.innerText.toLowerCase().includes(query)) item.classList.add('hidden');
    }
}