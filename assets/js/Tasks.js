/**
 * This is class Tasks, here are the basic methods
 */
 class Tasks extends Dialog{
    constructor(tasksContainer,user_id){
        super(tasksContainer,user_id);
        if(typeof Tasks.instance === "object"){
            return Tasks.instance;
        }
        this.user_id = user_id;
        this.datebase = new Database(this.user_id);
        this.tasks = this.datebase.onGetUserTasks();
        this.tasksContainer = tasksContainer;
        this.tasksContainer.innerHTML = ''; 
        Tasks.instance = this;
        return this;
    }
    onDisplayTask(id, status, title){
        status == 1 && id != -1 ? this.tasksContainer.innerHTML += `<div class="list__column" id="itemid__${id}"><div class="list__column" id="itemid__${id}" onclick="task.onTaskInfo(${id});"><div class="column__status"><img src="assets/img/check-solid.svg"></div><p class="column__title" onclick="task.onTaskInfo(${id});">${title}</p></div><div class="column__delete" onclick="task.onTaskDelete(${id});">+</div><div class="column__edit" onclick="task.onTaskEdit(${id});">*</div></div>` : status == 0 && id != -1 ? this.tasksContainer.innerHTML += `<div class="list__column list__column_done" id="itemid__${id}"><div class="list__column" id="itemid__${id}" onclick="task.onTaskInfo(${id});"><div class="column__status"><img src="assets/img/check-solid.svg"></div><p class="column__title" onclick="task.onTaskInfo(${id});">${title}</p></div><div class="column__delete" onclick="task.onTaskDelete(${id});">+</div><div class="column__edit" onclick="task.onTaskEdit(${id});">*</div></div>` : id == -1 ? this.tasksContainer.innerHTML += `<div class="list__column" id="itemid__${id}" style="cursor: default; justify-content: center;"><div class="column__title" style="cursor: default;">${title}</div></div>` : false;
    }
    onLoadUserTasks(){
        this.tasks = this.task;
        if(this.tasks.length != 0){
            for (let i = 0; i < this.tasks.length; i++) {
                this.onDisplayTask(i, this.tasks[i].status, this.tasks[i].title);
            }
        }
    }
    onTaskInfo(id){
        const dialog = new Dialog();
        this.dialogTempData = this.tasks[id];
        this.dialogTempData.id = id;
        dialog.onUpdateDialogTempData(this.dialogTempData);
        super.showDialog(1);
    }
    onTaskDelete(id){
        const dialog = new Dialog();
        this.dialogTempData = this.tasks[id];
        this.dialogTempData.id = id;
        dialog.onUpdateDialogTempData(this.dialogTempData);
        super.showDialog(2);
    }
    onTaskEdit(id){
        const dialog = new Dialog();
        this.dialogTempData = this.tasks[id];
        this.dialogTempData.id = id;
        dialog.onUpdateDialogTempData(this.dialogTempData);
        super.showDialog(3);
    }
    onSetTasksContainer(temp){
        this.tasksContainer = temp;
        return 1;
    }
    onGetTaskLenght(){
        return this.tasks.length;
    }
    onGetTaskStatus(id){
        return this.tasks[id].status;
    }
    onGetTaskTitle(id){
        return this.tasks[id].title;
    }
    onAddTaskToTasks(obj){
        this.tasks.push(obj);
    }
}