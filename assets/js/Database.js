/**
 * This is a database class, for accessing and performing various operations on the database
 */

 class Database {
    
    constructor(user_id){
        this.user_id = user_id;
        this.database = this.onGetDatabase();
    }

    onGetDatabase(){
        this.database = JSON.parse(localStorage.getItem('users'));
        if(this.database == null) this.database = [];
        return this.database;
    }

    onSaveDatabase(){
        if (this.database == null) return;
        localStorage.setItem('users', JSON.stringify(this.database));
    }

    onInsertIntoDatebase(newDataBase){
        this.database.push(newDataBase);
        this.onSaveDatabase();
    }

    onAuthDataCheck(login,password){
        for(let i = 0; i < this.database.length; i++){
            if(this.database[i].login == login && this.database[i].password == password){
                return { success: true, id: i };
            }
        }
        return { success: false, id: -1 };
    }

    onLoginIsBusy(login){
        for(let i = 0; i < this.database.length; i++){
            if(this.database[i].login == login){
                return true;
            }
        }
        return false;
    }

    onSetUserTheme(themeid){
        this.database[this.user_id].theme = themeid;
        this.onSaveDatabase();
    }

    onGetUserTheme(){
        return this.database[this.user_id].theme;
    }

    onSetUserAuth(auth){
        this.database[this.user_id].auth = auth;
        this.onSaveDatabase();
    }

    onGetUserAuth(){
        return this.database[this.user_id].auth;
    }

    onGetUserTasks(){
        return JSON.parse(this.database[this.user_id].tasks);
    }

    onSetUserTasks(tasks){
        this.database[this.user_id].tasks = JSON.stringify(tasks);
        this.onSaveDatabase();
    }

    onGetUserLogin(){
        return this.database[this.user_id].login;
    }

    onGetUserId(){
        return this.user_id;
    }
}