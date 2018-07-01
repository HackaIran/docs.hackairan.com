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
    const name = document.getElementsByName('name')[0].value
    const uniqueUrl = document.getElementsByName('uniqueUrl')[0].value
    const category = document.getElementsByName('category')[0].value
    const text = document.getElementsByName('text')[0].value
    const summary = document.getElementsByName('summary')[0].value

    xhr.send("name="+name+"&uniqueUrl="+uniqueUrl+"&category="+category+"&text="+editor.getValue()+"&summary="+summary); 
}

let themeBtn = document.querySelector('.theme'); 
themeBtn.onclick= function(){
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
