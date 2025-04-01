// Comment disabled button
let commentButton = document.getElementById("comment_button");
let nameInput = document.getElementById("name_input");
let messageInput = document.getElementById("message_input");

commentButton.disabled = true;

function toggleButtonState() {
    let isNameFilled = nameInput.value.trim();
    let isMessageFilled = messageInput.value.trim();
    commentButton.disabled = !(isNameFilled && isMessageFilled);
}
nameInput.addEventListener("input", toggleButtonState);
messageInput.addEventListener("input", toggleButtonState);

// Add comment function
function addComment(name, comment) {
    let commentWrapper = document.createElement("div");
    commentWrapper.classList.add("user-comment");

    let nameElement = document.createElement("h4");
    nameElement.classList.add("font-2");
    nameElement.textContent = name;

    let commentElement = document.createElement("p");
    commentElement.textContent = "- " + comment;

    commentWrapper.appendChild(nameElement);
    commentWrapper.appendChild(commentElement);

    let teamCommentSection = document.querySelector(".member-comments");
    teamCommentSection.append(commentWrapper);

    nameInput.value = "";
    messageInput.value = "";

    toggleButtonState();
}

commentButton.addEventListener("click", function (e) {
    e.preventDefault();
    let name = nameInput.value.trim();
    let comment = messageInput.value.trim();
    if (name && comment) {
        addComment(name, comment);
    }
});
