
// make connection
var socket = io();
var timer


//query Dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//utility funcs
function emit() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = ''
}
function broadcast() {
    clearTimeout(timer)
    socket.emit('feed', { handle: handle.value })
}




//emit event

btn.addEventListener('click', () => {
    if (handle.value !== '') {
        emit()
    }
})
message.addEventListener('keypress', () => {
    broadcast()
})

//receive events
socket.on('chat', data => {
    feedback.innerHTML = '';
    console.log(data);
    if (data.handle === handle.value) {
        return output.innerHTML += '<p><strong>' + data.handle +
            ':   ' + '</strong>'
            + data.message + '</p>'
    }
    else {
        output.innerHTML += '<p class="ksenos"><strong>' + data.handle +
            ':   ' + '</strong>'
            + data.message + '</p>'
    }
})

socket.on('feed', data => {
    // console.log(data);
    feedback.innerHTML = `<p><em> ${data.handle} is typing...</em></p>`
})


