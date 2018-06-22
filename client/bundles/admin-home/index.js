var deleteBtn = document.querySelectorAll('.delete')
var submitBtn = document.querySelector('.action-container > .submit');
var cancelBtn = document.querySelector('.action-container > .cancel');

for(let item of deleteBtn){
    item.onclick = function(){
        const uniqueUrl = item.getAttribute('data-url');
        submitBtn.setAttribute('data-url', uniqueUrl);
        document.querySelector('.delete-submit').classList.add('active');
    } 
}

cancelBtn.onclick = function(){
    document.querySelector('.delete-submit').classList.remove('active');
}

submitBtn.onclick = function(){
    const uniqueUrl = submitBtn.getAttribute('data-url');

    submitBtn.innerHTML = 'loading...';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/deleteDocument', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            if(JSON.parse(xhr.response).status == 200){
                submitBtn.innerHTML = 'Done :)';
                window.location.reload();
            }else{

                submitBtn.style.background = 'red';
                submitBtn.style.color = 'white';
                submitBtn.innerHTML = 'Faild!';
                let errorMessage = document.querySelector('.delete-error');
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = 'Sorry we have got an error.';

            }
        }
    }

    xhr.send("uniqueUrl="+uniqueUrl);

}
