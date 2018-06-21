var submitBtn = document.querySelector('.submit')
submitBtn.onclick = function(event){
    submitBtn.style.background = 'orange';
    submitBtn.style.color = 'black';
    submitBtn.innerHTML = 'loading...';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/doEditDocument', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            if(JSON.parse(xhr.response).status == 200){
                submitBtn.style.background = 'green';
                submitBtn.style.color = 'white';
                submitBtn.innerHTML = 'Done :)';
                setTimeout(()=>{
                    window.location.reload();
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
    const text = document.getElementsByName('text')[0].value
    const summary = document.getElementsByName('summary')[0].value

    xhr.send("name="+name+"&uniqueUrl="+uniqueUrl+"&text="+text+"&summary="+summary); 
}
