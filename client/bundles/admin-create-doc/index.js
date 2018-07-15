var editor = monaco.editor.create(document.getElementById('container'), {
    value: [
        '',
        '# Paste or write your md here.',
        ''
    ].join('\n'),
    language: 'markdown',
    // theme: 'vs-dark'
});

var submitBtn = document.querySelector('.submit')
submitBtn.onclick = function(event){
    submitBtn.style.background = 'orange';
    submitBtn.style.color = 'black';
    submitBtn.innerHTML = 'loading...';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/doCreateDocument', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            if(JSON.parse(xhr.response).status == 200){
                submitBtn.style.background = 'green';
                submitBtn.style.color = 'white';
                submitBtn.innerHTML = 'Done :)';
                setTimeout(()=>{
                    window.location.replace('/user')
                },2000);
            }else{
                let errorHolder = document.querySelector('.error-holder')
                submitBtn.style.background = 'red';
                submitBtn.style.color = 'white';
                submitBtn.innerHTML = 'We are sorry. faild to do your request :(';
                const errors = JSON.parse(xhr.response).text.errors;
                for (let field in errors) {
                    let el = document.querySelector(`[name=${field}]`);
                    el.classList.add('wrong-input');
                    //el.setAttribute('data-error', errors[field].message);
                    document.querySelector(`[name=${field}]+label`).innerHTML = errors[field].message
                }
            }
        }
    }
    const name = document.getElementsByName('name')[0].value.split('&').join(':-a-:');
    const uniqueUrl = document.getElementsByName('uniqueUrl')[0].value.split('&').join(':-a-:');
    const category = document.getElementsByName('category')[0].value.split('&').join(':-a-:');
    const text = editor.getValue().split('&').join(':-a-:');
    const summary = document.getElementsByName('summary')[0].value.split('&').join(':-a-:');

    xhr.send("name="+name+"&uniqueUrl="+uniqueUrl+"&category="+category+"&text="+text+"&summary="+summary); 
}

let themeBtn = document.querySelector('.theme'); 
themeBtn.onclick = function(){
    if (themeBtn.getAttribute('data-current')== 'vs'){
        monaco.editor.setTheme('vs-dark');
        themeBtn.setAttribute('data-current', 'vs-dark');
        themeBtn.childNodes[0].setAttribute('src','/icons/white.svg')
    }else{
        monaco.editor.setTheme('vs');
        themeBtn.childNodes[0].setAttribute('src','/icons/black.svg')
        themeBtn.setAttribute('data-current', 'vs')
    }
}

var newEditor;
let expandBtn = document.querySelector('.resizer')
expandBtn.onclick = function(){
    let container = document.getElementById('container');
    if (expandBtn.getAttribute('data-current') == 0){
        expandBtn.setAttribute('data-current', 1);
        expandBtn.childNodes[0].setAttribute('src','/icons/unexpand.svg')
        container.style.margin = '0';
        container.innerHTML = '';
        container.style.height = '100%';
        let editorContainer = document.querySelector('.content-container');
        editorContainer.style.position = 'fixed';
        editorContainer.style.width = '100%';
        editorContainer.style.height = '100%';
        editorContainer.style.top = '0';
        editorContainer.style.left = '0';
        newEditor = monaco.editor.create(container, {
            value: editor.getValue(),
            language: 'markdown',
            theme: themeBtn.getAttribute('data-current')
        });
    }else{
        expandBtn.childNodes[0].setAttribute('src','/icons/expand.svg')
        expandBtn.setAttribute('data-current', 0)
        container.style.margin = '10px';
        container.style.marginTop = '30px';
        container.innerHTML = '';
        container.style.height = '400px';
        let editorContainer = document.querySelector('.content-container');
        editorContainer.style.position = 'relative';
        editorContainer.style.width = '100%';
        editorContainer.style.height = '400px';
        editor = monaco.editor.create(container, {
            value: newEditor.getValue(),
            language: 'markdown',
            theme: themeBtn.getAttribute('data-current')
        });
    }
}
