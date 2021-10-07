document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        if(document.getElementsByClassName('body__title')[0].innerHTML == 'Sign Up'){
            onRegistration();
        } else if(document.getElementsByClassName('body__title')[0].innerHTML == 'Sign In'){
            onAuthorization();
        }
    }
});

function eventDropDown(element,id){
    let temp = document.getElementsByClassName('dropdown__main')[id].innerHTML;
    let temp_id = document.getElementsByClassName('dropdown__main')[id].id;
    document.getElementsByClassName('dropdown__main')[id].innerHTML = element.innerHTML;
    document.getElementsByClassName('dropdown__main')[id].id = element.id;
    element.id = temp_id;
    element.innerHTML = temp;
}
