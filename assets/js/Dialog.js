/**
 * This is class Dialog, here are the basic methods system dialog.
 */

 class Dialog{
    constructor(){
        this.dialogInner = document.getElementsByClassName('dashboard__dialog__inner')[0];
        this.dialogTitle = document.getElementById("dd__title");
        this.dialogInputTitle = document.getElementById("dd__input__title");
        this.dialogTA = document.getElementById("dd__input__ta");
        this.dialogButtonConfirm = document.getElementById("dd__button__confirm");
        this.dialogText = document.getElementById("dd__text");
        this.dialogCButtons = document.getElementById("dd__control__buttons");
        this.dialogCB = [document.getElementById("dd__control__buttons__1"),document.getElementById("dd__control__buttons__2")];
        this.dialogType = -1;
        this.dialogTempData = {};
        this.dialogResponse = -1;
        this.database = new Database(support.getUserID());
        this.task = this.database.onGetUserTasks();
    }
    
    destroyDialog(){
        this.dialogInner.style.display = 'none';
        this.dialogTitle.style.display = 'none';
        this.dialogTA.style.display = 'none';
        this.dialogButtonConfirm.style.display = 'none';
        this.dialogInputTitle.style.display = 'none';
        this.dialogText.style.display = 'none';
        this.dialogCButtons.style.display = 'none';
        this.dialogType = -1;
        this.dialogResponse = -1;
        this.dialogTempData = {};
    }

    showDialog(type){
        switch(type){
            case 0:
                this.dialogTitle.innerHTML = 'Add New';
                this.dialogInputTitle.value = 'title';
                this.dialogTA.value = 'description';
                this.dialogTitle.style.display = 'block';
                this.dialogTA.style.display = 'block';
                this.dialogButtonConfirm.innerHTML = 'Add';
                this.dialogButtonConfirm.style.display = 'block';
                this.dialogInputTitle.style.display = 'block';
                break;
            case 1:
                this.dialogTitle.innerHTML = this.dialogTempData.title;
                this.dialogTitle.style.display = 'block';
                this.dialogTempData.desc == '' ? this.dialogText.innerHTML = 'No text promited here..' : this.dialogText.innerHTML = this.dialogTempData.desc;
                this.dialogText.style.display = 'block';
                this.dialogCButtons.style.display = 'flex';
                if (this.dialogTempData.status == 1) {
                    this.dialogCB[0].innerHTML = 'Done';
                    this.dialogCB[1].innerHTML = 'Close';
                }
                else {
                    this.dialogCB[0].innerHTML = 'Not done';
                    this.dialogCB[1].innerHTML = 'Close';
                }
                break;
            case 2:
                this.dialogText.innerHTML = `Are you sure you want to delete "${this.dialogTempData.title}" item from the list`;
                this.dialogText.style.display = 'block';
                this.dialogCButtons.style.display = 'flex';
                this.dialogCB[0].innerHTML = 'Confirm';
                this.dialogCB[1].innerHTML = 'Cancel';
                break;
            case 3:
                this.dialogTitle.innerHTML = 'Edit';
                this.dialogTitle.style.display = 'block';
                this.dialogTA.style.display = 'block';
                this.dialogTA.value = this.dialogTempData.desc;
                this.dialogButtonConfirm.innerHTML = 'Save';
                this.dialogButtonConfirm.style.display = 'block';
                this.dialogInputTitle.style.display = 'block';
                this.dialogInputTitle.value = this.dialogTempData.title;
                break;
        }
        this.dialogInner.style.display = 'flex';
        this.dialogType = type;
    }

    onDialogResponse(response){
        switch (this.dialogType) {
            case 0:
                if (this.dialogInputTitle.value == '') return;
                let obj = {
                    status: 1,
                    title: this.dialogInputTitle.value,
                    desc: this.dialogTA.value
                }
                this.task.push(obj);
                support.onUpdateTasks();
                break;
            case 1:
                if (response == 1) {
                    let itemid = document.getElementById(`itemid__${this.dialogTempData.id}`);
                    if (this.dialogTempData.status == 1) {
                        this.task[this.dialogTempData.id].status = 0;
                        itemid.classList.add('list__column_done');
                    }
                    else {
                        this.task[this.dialogTempData.id].status = 1;
                        itemid.classList.remove('list__column_done');
                    }
                }
                break;
            case 2:
                if (response == 1) {
                    this.task.splice(this.dialogTempData.id, 1);
                    let itemid = document.getElementById(`itemid__${this.dialogTempData.id}`);
                    itemid.remove();
                }
                break
            case 3:
                if (this.dialogInputTitle.value == '') return;
                this.task[this.dialogTempData.id].title = this.dialogInputTitle.value;
                this.task[this.dialogTempData.id].desc = this.dialogTA.value;
                let itemid = document.getElementById(`itemid__${this.dialogTempData.id}`);
                itemid.querySelector('.column__title').innerHTML = this.dialogInputTitle.value;
                break;
    
        }
        this.destroyDialog();
        this.database.onSetUserTasks(this.task);
    }

    onUpdateDialogTempData(dialogTemp){
        this.dialogTempData = dialogTemp;
    }
}

