//Add
var addBtn = document.querySelector('.add-category > a')
var addSubmit = document.querySelector('.add-action-container > .submit');
var cancelSubmit = document.querySelector('.add-action-container > .cancel');

addBtn.onclick = function(){
    document.querySelector('nav').style.filter = 'blur(3px)';
    document.querySelector('.container').style.filter = 'blur(3px)';
    document.querySelector('.add-category-modal').style.display = 'block';
} 

cancelSubmit.onclick = function(){
    document.querySelector('nav').style.filter = '';
    document.querySelector('.container').style.filter = '';
    document.querySelector('.add-category-modal').style.display = 'none';
}

addSubmit.onclick = function(){
    addSubmit.innerHTML = 'loading...';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/doAddCategory', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            if(JSON.parse(xhr.response).status == 200){
                
                addSubmit.innerHTML = 'Done :)';
                window.location.reload();

            }else{

                addSubmit.style.background = 'red';
                addSubmit.style.color = 'white';
                addSubmit.innerHTML = 'Faild!';
                let errorMessage = document.querySelector('.add-error');
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = 'Sorry we have got an error.';

            }
        }
    }

    var title = document.querySelector('.add-category-title').value

    xhr.send("title="+title);

}


//Delete
var deleteBtn = document.querySelectorAll('.categoryDelete')
var submitBtn = document.querySelector('.action-container > .submit');
var cancelBtn = document.querySelector('.action-container > .cancel');

for(let item of deleteBtn){
    item.onclick = function(){
        const _id = item.getAttribute('data-id');
        submitBtn.setAttribute('data-id', _id);
        document.querySelector('nav').style.filter = 'blur(3px)';
        document.querySelector('.container').style.filter = 'blur(3px)';
        document.querySelector('.delete-submit').style.display = 'block';
    } 
}

cancelBtn.onclick = function(){
    document.querySelector('nav').style.filter = '';
    document.querySelector('.container').style.filter = '';
    document.querySelector('.delete-submit').style.display = 'none';
}

submitBtn.onclick = function(){
    const _id = submitBtn.getAttribute('data-id');

    submitBtn.innerHTML = 'loading...';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/deleteCategory', true);

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

    xhr.send("_id="+_id);

}

