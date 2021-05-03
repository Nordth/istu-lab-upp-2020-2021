var hidden = false;
var right = true;

function hideChat() {
    var chat = document.querySelector(".live-chat")

    if (hidden) {
        chat.style = '';
    } else {
        chat.style = `
            height: 0px;
            overflow: hidden;
            width: 0px;`
    }

    hidden = !hidden;
}

function sendMessage() {
    var chatBox = document.querySelector(".live-chat .chat-box")
    var message = document.querySelector(".live-chat input[type=text]").value;

    chatBox.innerHTML += `<div class="chat-message message-${right ? 'right' : 'left'}">${message}</div>`;

    right = !right;
}