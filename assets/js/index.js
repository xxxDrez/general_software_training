const onRegistration = () => {
    const lowerCaseLatters = /[a-z]/g
    const upperCaseLatters = /[A-Z]/g
    const numbers = /[0-9]/g
    let login = document.getElementsByClassName('body__input')[0]
    let email = document.getElementsByClassName('body__input')[1]
    let pass = document.getElementsByClassName('body__input')[2]
    if(login.value == '' || email.value == '' || pass.value == ''){
        sendNotify('Error','field is empty', '#e47777', 1000)
    } else if(pass.value.match(lowerCaseLatters) == null){
        sendNotify('Error','There is no lower case in the password', '#e47777', 1000)
    } else if(pass.value.match(upperCaseLatters) == null){
        sendNotify('Error','There is no upper case in the password', '#e47777', 1000)
    } else if(pass.value.match(numbers) == null){
        sendNotify('Error','There is a digit missing in the password', '#e47777', 1000)
    } else {
        sendNotify('Success','You are successfully registered', 'green', 1000)
        localStorage.setItem('login', login.value)
        localStorage.setItem('password', pass.value)
        localStorage.setItem('email', email.value)
        localStorage.setItem('theme', 0)
        let db = [
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
        ]
        localStorage.setItem('tasks',  JSON.stringify(db))
        sendRedirect('login.html',2000)
    }
}

const onAuthorization = () => {
    let login = document.getElementsByClassName('body__input')[0]
    let password = document.getElementsByClassName('body__input')[1]
    if(login.value == '' || password.value == ''){
        sendNotify('Error','field is empty', '#e47777', 1000)
    } else {
        if(login.value == localStorage.getItem('login')  && password.value == localStorage.getItem('password')){
            sendNotify('Success',`${login.value} you are successfully authorization`, 'green', 3000)
            localStorage.setItem('session', 1)
            sendRedirect('dashboard.html',2000)
        } else {
            sendNotify('Error','Wrong data, try again', '#e47777', 1000)
        }
    }
}

const sendNotify = (title,message,color,timeout) => {
    document.getElementsByClassName('notify')[0].style.display = "flex"
    document.getElementsByClassName('notify__title')[0].innerHTML = title
    document.getElementsByClassName('notify__title')[0].style.color = color
    document.getElementsByClassName('notify__message')[0].innerHTML = message
    setTimeout( () => {
        document.getElementsByClassName('notify')[0].style.display = "none"
    }, timeout)
}

const sendRedirect = (url,timeout) => {
    setTimeout( () => { window.location.href = `${url}` }, timeout)
}