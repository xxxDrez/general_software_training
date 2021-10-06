/**
 * This is module support, here are the basic methods for solving the problems
 */
 var support = (function(){
    const getUserID = () => {
        return localStorage.getItem('user_id');
    };
    return {
        getUserID,
        setUserID: function(id) {
            localStorage.setItem('user_id', id);
        },
        sendRedirect: function(url,timeout){
            setTimeout( () => { window.location.href = `${url}` }, timeout);
        },
        checkAuthorization: function(){
            try{
                let database = new Database(getUserID());
                if(database.onGetUserAuth() == true){
                    support.sendRedirect('./dashboard.html',0);
                }
            }
            catch {}
        },
        onUpdateTasks: function(){
            let task = new Tasks(support.taskContainerZeroing(),getUserID());
            task.onLoadUserTasks();
        },
        taskContainerZeroing: function(){
            let tasksContainer = document.getElementsByClassName('container__list')[0];
            tasksContainer.innerHTML = '';
            return tasksContainer;
        },
        sendNotify: function(title,message,type){
            document.getElementsByClassName('notify')[0].style.display = "flex";
            document.getElementsByClassName('notify__title')[0].innerHTML = title;
            type == 0 ? document.getElementsByClassName('notify__title')[0].style.color = 'var(--error-color)' : document.getElementsByClassName('notify__title')[0].style.color = 'var(--success-color)';
            document.getElementsByClassName('notify__message')[0].innerHTML = message;
            setTimeout( () => {
                document.getElementsByClassName('notify')[0].style.display = "none"
            }, 6000);
        },
        logout: function(){
            let database = new Database(getUserID());
            database.onSetUserAuth(false);
            support.sendNotify('Success','You have successfully logged out', 1);
            support.sendRedirect('./login.html',2500);
        },
        getElement: function(id){
            return document.getElementById(id);
        },
        generateTasks: function(){
            let tasks = [
                {
                    status: 1,
                    title: 'Your first task',
                    desc: 'The sample description..'
                },
                {
                    status: 0,
                    title: 'General Soft',
                    desc: 'Course finished'
                }
            ];
            return tasks;
        }
    };
})();