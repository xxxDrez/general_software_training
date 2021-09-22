document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        if(document.getElementsByClassName('body__title')[0].innerHTML == 'Sign Up'){
            onRegistration();
        } else if(document.getElementsByClassName('body__title')[0].innerHTML == 'Sign In'){
            onAuthorization();
        }
    }
});