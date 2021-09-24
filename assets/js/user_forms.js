/*
    These are custom forms -> Registation and Authorization
*/

const lowerCaseLatters = /[a-z]/g;
const upperCaseLatters = /[A-Z]/g;
const numbers = /[0-9]/g;
const validate_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const database = new Database();

let user_login = {
    "login": '',
    "password": '',
    "validate_data": function(){
        if(this.login == '' || this.password == '' || this.email == '' && this.email != null){
            return 'field is empty';
        }
        else if(validate_email.test(this.email) == false && this.email != null){
            return 'Incorrect email address';
        }
        else if(database.onLoginIsBusy(this.login) == true && this.email != null){
            return 'This login is taken';
        }
        else if(lowerCaseLatters.test(this.password) == false){
            return 'There is no lower case in the password';
        }
        else if(upperCaseLatters.test(this.password) == false){
            return 'There is no upper case in the password';
        }
        else if(numbers.test(this.password) == false){
            return 'There is a digit missing in the password';
        }
        return null;
    }
}

let user_reg = {
    "email": '',
    "theme": 0,
    "auth": false,
    "tasks": JSON.stringify(support.generateTasks()),
    __proto__: user_login
}