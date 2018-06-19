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