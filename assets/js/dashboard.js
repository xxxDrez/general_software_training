let dialogInner = null
let dialogStatus = false
let dialogType = -1
let dialogTitle = null
let dialogInputTitle = null
let dialogTA = null
let dialogButtonConfirm = null
let dialogText = null
let dialogCButtons = null
let dialogCB = [null, null]
let dialogTempData = {}
let dialogResponse = -1

let tasksContainer = null

let database = null

let searchStatus = -1
let searchString = ''

const displayTask = (id, status, title) => {
    if (status == 1) {
        tasksContainer.innerHTML += `<div class="list__column" id="itemid__${id}"><div class="column__status"><img src="assets/img/check-solid.svg"></div><p class="column__title" onclick="taskInfo(${id});">${title}</p><div class="column__delete" onclick="taskDelete(${id});">+</div><div class="column__edit" onclick="taskEdit(${id});">*</div></div >`;
    }
    else if (status == 0) {
        tasksContainer.innerHTML += `<div class="list__column list__column_done" id="itemid__${id}"><div class="column__status"><img src="assets/img/check-solid.svg"></div><p class="column__title" onclick="taskInfo(${id});">${title}</p><div class="column__delete" onclick="taskDelete(${id});">+</div><div class="column__edit" onclick="taskEdit(${id});">*</div></div >`;
    }
}

const destroyDialog = () => {
    dialogInner.style.display = 'none'
    dialogTitle.style.display = 'none'
    dialogTA.style.display = 'none'
    dialogButtonConfirm.style.display = 'none'
    dialogInputTitle.style.display = 'none'
    dialogText.style.display = 'none'
    dialogCButtons.style.display = 'none'
    dialogType = -1
    dialogResponse = -1
    dialogTempData = {}
}

const updateTheme = (themeid) => {
    if (themeid == 0) {
        document.documentElement.style.setProperty('--theme-color', '#9ba0a9')
    }
    else if (themeid == 1) {
        document.documentElement.style.setProperty('--theme-color', '#ff808f')
    }
    else if (themeid == 2) {
        document.documentElement.style.setProperty('--theme-color', 'yellow')
    }
    localStorage.setItem('theme', themeid)
    document.getElementById("theme__picker").value = themeid
}

const auth = () => {
    if (localStorage.getItem('session') != 1) {
        sendRedirect('login.html', 1)
    }
    else {
        document.getElementsByClassName('body__hey')[0].innerHTML = `Welcome, ${localStorage.getItem('login')} here are your tasks`

        updateTheme(localStorage.getItem('theme'))
        dialogTitle = document.getElementById("dd__title")
        dialogInputTitle = document.getElementById("dd__input__title")
        dialogTA = document.getElementById("dd__input__ta")
        dialogButtonConfirm = document.getElementById("dd__button__confirm")
        dialogInner = document.getElementsByClassName('dashboard__dialog__inner')[0]
        dialogText = document.getElementById("dd__text")
        dialogCButtons = document.getElementById("dd__control__buttons")
        dialogCB = [
            document.getElementById("dd__control__buttons__1"),
            document.getElementById("dd__control__buttons__2")
        ];

        destroyDialog()

        tasksContainer = document.getElementsByClassName('container__list')[0]
        tasksContainer.innerHTML = ''

        database = JSON.parse(localStorage.getItem('tasks'))
        if (database.length != 0) {
            for (let i = 0; i < database.length; i++) {
                displayTask(i, database[i].status, database[i].title)
            }
        }
    }
}
auth()

const taskInfo = (id) => {
    dialogTempData = database[id]
    dialogTempData.id = id
    showDialog(1)
}

const taskDelete = (id) => {
    dialogTempData = database[id]
    dialogTempData.id = id
    showDialog(2)
}

const taskEdit = (id) => {
    dialogTempData = database[id]
    dialogTempData.id = id
    showDialog(3)
}

const showDialog = (type) => {
    switch (type) {
        case 0:
            dialogTitle.innerHTML = 'Add New'
            dialogTitle.style.display = 'block'
            dialogTA.style.display = 'block'
            dialogButtonConfirm.innerHTML = 'Add'
            dialogButtonConfirm.style.display = 'block'
            dialogInputTitle.style.display = 'block'
            break
        case 1:
            dialogTitle.innerHTML = dialogTempData.title
            dialogTitle.style.display = 'block'
            if (dialogTempData.desc == '') dialogText.innerHTML = 'No text promited here..'
            else dialogText.innerHTML = dialogTempData.desc
            dialogText.style.display = 'block'
            dialogCButtons.style.display = 'flex'
            if (dialogTempData.status == 1) {
                dialogCB[0].innerHTML = 'Done'
                dialogCB[1].innerHTML = 'Close'
            }
            else {
                dialogCB[0].innerHTML = 'Not done'
                dialogCB[1].innerHTML = 'Close'
            }
            break
        case 2:
            dialogText.innerHTML = `Are you sure you want to delete "${dialogTempData.title}" item from the list`
            dialogText.style.display = 'block'
            dialogCButtons.style.display = 'flex'
            dialogCB[0].innerHTML = 'Confirm'
            dialogCB[1].innerHTML = 'Cancel'
            break
        case 3:
            dialogTitle.innerHTML = 'Edit'
            dialogTitle.style.display = 'block'
            dialogTA.style.display = 'block'
            dialogTA.value = dialogTempData.desc
            dialogButtonConfirm.innerHTML = 'Save'
            dialogButtonConfirm.style.display = 'block'
            dialogInputTitle.style.display = 'block'
            dialogInputTitle.value = dialogTempData.title
            break
    }
    dialogInner.style.display = 'flex'
    dialogType = type
}

const onDialogResponse = (response) => {
    switch (dialogType) {
        case 0:
            if (dialogInputTitle.value == '') return
            let obj = {
                status: 1,
                title: dialogInputTitle.value,
                desc: dialogTA.value
            }
            let id = database.push(obj)
            displayTask(id - 1, 1, dialogInputTitle.value)
            break
        case 1:
            if (response == 1) {
                let itemid = document.getElementById(`itemid__${dialogTempData.id}`)
                if (dialogTempData.status == 1) {
                    database[dialogTempData.id].status = 0
                    itemid.classList.add('list__column_done')
                }
                else {
                    database[dialogTempData.id].status = 1
                    itemid.classList.remove('list__column_done')
                }
            }
            break
        case 2:
            if (response == 1) {
                database.splice(dialogTempData.id, 1)
                let itemid = document.getElementById(`itemid__${dialogTempData.id}`)
                itemid.remove()
            }
            break
        case 3:
            if (dialogInputTitle.value == '') return
            database[dialogTempData.id].title = dialogInputTitle.value
            database[dialogTempData.id].desc = dialogTA.value
            let itemid = document.getElementById(`itemid__${dialogTempData.id}`)
            itemid.querySelector('.column__title').innerHTML = dialogInputTitle.value
            break

    }
    destroyDialog()
    dataSave()
}

const updateSearch = (value) => {
    searchString = value
    updateTasksBySearch()
}

const updateStatus = (value) => {
    searchStatus = value
    updateTasksBySearch()
}

const updateTasksBySearch = () => {
    tasksContainer.innerHTML = ''
    if (database.length != 0) {
        if (searchStatus != -1) {
            for (let i = 0; i < database.length; i++) {
                if (database[i].title.includes(searchString) && database[i].status == searchStatus) {
                    displayTask(i, database[i].status, database[i].title)
                }
            }
        }
        else {
            for (let i = 0; i < database.length; i++) {
                if (database[i].title.includes(searchString)) {
                    displayTask(i, database[i].status, database[i].title)
                }
            }
        }
    }
}

const dataSave = () => {
    if (database == null) return
    localStorage.setItem('tasks', JSON.stringify(database))
}
