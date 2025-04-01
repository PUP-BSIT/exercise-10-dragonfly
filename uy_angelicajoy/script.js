let nameInput = document.getElementById("name");
let commentInput = document.getElementById("comment");
let commentButton = document.getElementById("comment-button");
let teamCommentSection = document.querySelector(".team-comment");

function updateButtonState() {
    let nameValue = nameInput.value.trim();
    let commentValue = commentInput.value.trim();

    commentButton.disabled = !(nameValue && commentValue);
}

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

    teamCommentSection.insertBefore(
        commentWrapper,
        teamCommentSection.querySelector("h4")
    );

    nameInput.value = "";
    commentInput.value = "";

    updateButtonState();
}

nameInput.addEventListener("input", updateButtonState);
commentInput.addEventListener("input", updateButtonState);

commentButton.addEventListener("click", function (e) {
    e.preventDefault();

    let name = nameInput.value.trim();
    let comment = commentInput.value.trim();

    if (name && comment) {
        addComment(name, comment);
    }
});
