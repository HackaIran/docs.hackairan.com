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
            }else{
                let errorHolder = document.querySelector('.error-holder')
                submitBtn.style.background = 'red';
                submitBtn.style.color = 'white';
                submitBtn.innerHTML = 'We are sorry. faild to do your request :(';
                errorHolder.style.background = 'white';
                errorHolder.style.color = 'red';
                errorHolder.style.display = 'block'
                errorHolder.innerHTML = JSON.parse(xhr.response).text.message;
            }
        }
    }
    const name = document.getElementsByName('name')[0].value
    const url = document.getElementsByName('url')[0].value
    const category = document.getElementsByName('category')[0].value
    const content = document.getElementsByName('content')[0].value
    const summary = document.getElementsByName('summary')[0].value

    xhr.send("name="+name+"&url="+url+"&category="+category+"&content="+content+"&summary="+summary); 
}
