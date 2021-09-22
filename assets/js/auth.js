const onRegistration = () => {
    user_reg.login = document.getElementById('login').value;
    user_reg.password = document.getElementById('password').value;
    user_reg.email = document.getElementById('email').value;
    if(user_reg.validate_data() != null){
        support.sendNotify('Error',`${user_reg.validate_data()}`, 0);
    } else {
        let database = new Database();
        support.sendNotify('Success','You are successfully registered', 1)
        database.onInsertIntoDatebase({login: user_reg.login, password: user_reg.password, email: user_reg.email, theme: user_reg.theme, auth: user_reg.auth, tasks: user_reg.tasks});
        support.sendRedirect('login.html',2500);
    }
}

const onAuthorization = () => {
    user_login.login = document.getElementById('login').value;
    user_login.password = document.getElementById('password').value;
    if(user_login.validate_data() != null){
        support.sendNotify('Error',`${user_login.validate_data()}`, 0);
    } else {
        let database = new Database();
        let dataCheck = database.onAuthDataCheck(user_login.login,user_login.password);
        if(dataCheck.success == true){
            database = new Database(dataCheck.id);
            support.sendNotify('Success',`${database.onGetUserLogin()} you are successfully authorization`, 1)
            database.onSetUserAuth(true);
            support.setUserID(database.onGetUserId());
            support.sendRedirect('dashboard.html',2500)
        } else {
            support.sendNotify('Error','Wrong data, try again', 0)
        }
    }
}

support.checkAuthorization();
