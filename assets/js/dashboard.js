const updateTheme = (themeid) => {
    if (themeid == 0) {
        document.documentElement.style.setProperty('--theme-color', '#9ba0a9');
    }
    else if (themeid == 1) {
        document.documentElement.style.setProperty('--theme-color', '#ff808f');
    }
    else if (themeid == 2) {
        document.documentElement.style.setProperty('--theme-color', 'yellow');
    }
    database.onSetUserTheme(themeid);
    document.getElementById("theme__picker").value = themeid;
}

const callBackDashBoard = () => {
    try {
        if (database.onGetUserAuth() == false) {
            support.sendRedirect('login.html', 0);
        } else {
            document.getElementsByClassName('body__hey')[0].innerHTML = `Welcome, ${database.onGetUserLogin()} here are your tasks`;
            updateTheme(database.onGetUserTheme());
            dialog = new Dialog();
            dialog.destroyDialog();
            task.onLoadUserTasks();
        }
    } catch(e){
        //console.log(e);
        support.sendRedirect('login.html', 0);
    }
}
callBackDashBoard();

const updateSearch = (value) => {
    searchString = value;
    updateTasksBySearch();
}

const updateStatus = (value) => {
    searchStatus = value;
    updateTasksBySearch();
}

const updateTasksBySearch = () => {
    task.onSetTasksContainer(support.taskContainerZeroing());
    let count = 0;
    if (task.onGetTaskLenght() != 0) {
        if (searchStatus != -1) {
            for (let i = 0; i < task.onGetTaskLenght(); i++) {
                if (task.onGetTaskTitle(i).toUpperCase().includes(searchString.toUpperCase()) && task.onGetTaskStatus(i) == searchStatus) {
                    task.onDisplayTask(i, task.onGetTaskStatus(i), task.onGetTaskTitle(i));
                    count += 1;
                }
            }
        }
        else {
            for (let i = 0; i < task.onGetTaskLenght(); i++) {
                if (task.onGetTaskTitle(i).toUpperCase().includes(searchString.toUpperCase())) {
                    task.onDisplayTask(i, task.onGetTaskStatus(i), task.onGetTaskTitle(i));
                    count +=1;
                }
            }
        }
    }
    if(count == 0) task.onDisplayTask(-1, '', 'Nothing was found');
}
