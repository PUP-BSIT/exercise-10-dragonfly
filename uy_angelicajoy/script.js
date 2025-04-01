let nameInput = document.getElementById("name");
let commentInput = document.getElementById("comment");
let commentButton = document.getElementById("comment-button");
let teamCommentSection = document.querySelector(".team-comment");

// Store original default comments when page loads
let defaultComments = [];

function initSortControls() {
    // Store default comments first
    storeDefaultComments();

    let sortControls = document.createElement("div");
    sortControls.className = "sort-controls";

    let sortLabel = document.createElement("span");
    sortLabel.textContent = "Sort comments: ";
    sortLabel.className = "sort-label";

    let sortSelect = document.createElement("select");
    sortSelect.id = "comment-sort";
    sortSelect.className = "sort-select";

    let defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.textContent = "Default";

    let newestOption = document.createElement("option");
    newestOption.value = "newest";
    newestOption.textContent = "Newest first";

    let oldestOption = document.createElement("option");
    oldestOption.value = "oldest";
    oldestOption.textContent = "Oldest first";

    sortSelect.appendChild(defaultOption);
    sortSelect.appendChild(newestOption);
    sortSelect.appendChild(oldestOption);

    sortSelect.addEventListener("change", function () {
        sortComments(this.value);
    });

    sortControls.appendChild(sortLabel);
    sortControls.appendChild(sortSelect);

    teamCommentSection.insertBefore(
        sortControls,
        teamCommentSection.firstChild
    );
}

function storeDefaultComments() {
    let commentHeadings = teamCommentSection.querySelectorAll("h4.font-2");

    commentHeadings.forEach((heading) => {
        let defaultComment = {
            name: heading.textContent,
            comment: heading.nextElementSibling
                ? heading.nextElementSibling.tagName === "UL"
                    ? heading.nextElementSibling.querySelector("p").textContent
                    : heading.nextElementSibling.textContent
                : "",
        };
        defaultComments.push(defaultComment);
    });
}

function sortComments(sortOrder) {
    let comments = Array.from(
        teamCommentSection.querySelectorAll(".user-comment")
    );

    if (sortOrder === "newest") {
        comments.sort((a, b) => {
            return (
                new Date(b.dataset.timestamp) - new Date(a.dataset.timestamp)
            );
        });
    } else if (sortOrder === "oldest") {
        comments.sort((a, b) => {
            return (
                new Date(a.dataset.timestamp) - new Date(b.dataset.timestamp)
            );
        });
    } else {
        comments.sort((a, b) => {
            return (
                parseInt(a.dataset.originalIndex) -
                parseInt(b.dataset.originalIndex)
            );
        });
    }

    while (teamCommentSection.firstChild) {
        teamCommentSection.removeChild(teamCommentSection.firstChild);
    }

    let sortControls = document.createElement("div");
    sortControls.className = "sort-controls";

    let sortLabel = document.createElement("span");
    sortLabel.textContent = "Sort comments: ";
    sortLabel.className = "sort-label";

    let sortSelect = document.createElement("select");
    sortSelect.id = "comment-sort";
    sortSelect.className = "sort-select";

    let defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.textContent = "Default";

    let newestOption = document.createElement("option");
    newestOption.value = "newest";
    newestOption.textContent = "Newest first";

    let oldestOption = document.createElement("option");
    oldestOption.value = "oldest";
    oldestOption.textContent = "Oldest first";

    sortSelect.appendChild(defaultOption);
    sortSelect.appendChild(newestOption);
    sortSelect.appendChild(oldestOption);
    sortSelect.value = sortOrder;

    sortSelect.addEventListener("change", function () {
        sortComments(this.value);
    });

    sortControls.appendChild(sortLabel);
    sortControls.appendChild(sortSelect);

    teamCommentSection.appendChild(sortControls);

    let heading = document.createElement("h2");
    heading.className = "font";
    heading.textContent = "Comments";
    teamCommentSection.appendChild(heading);

    defaultComments.forEach((defaultComment) => {
        let nameElement = document.createElement("h4");
        nameElement.className = "font-2";
        nameElement.textContent = defaultComment.name;

        let commentElement = document.createElement("p");
        commentElement.textContent = defaultComment.comment;
        commentElement.classList.add("default-comment");

        teamCommentSection.appendChild(nameElement);
        teamCommentSection.appendChild(commentElement);
    });

    comments.forEach((comment) => {
        teamCommentSection.appendChild(comment);
    });
}

function updateButtonState() {
    let nameValue = nameInput.value.trim();
    let commentValue = commentInput.value.trim();

    commentButton.disabled = !(nameValue && commentValue);
}

let commentCounter = 0;

function addComment(name, comment) {
    let commentWrapper = document.createElement("div");
    commentWrapper.classList.add("user-comment");

    let timestamp = new Date().toISOString();
    commentWrapper.dataset.timestamp = timestamp;
    commentWrapper.dataset.originalIndex = commentCounter++;

    let nameElement = document.createElement("h4");
    nameElement.classList.add("font-2");
    nameElement.textContent = name;

    let commentElement = document.createElement("p");
    commentElement.textContent = "- " + comment;

    let timeElement = document.createElement("small");
    timeElement.classList.add("comment-time");
    timeElement.textContent = new Date().toLocaleString();

    commentWrapper.appendChild(nameElement);
    commentWrapper.appendChild(commentElement);
    commentWrapper.appendChild(timeElement);

    teamCommentSection.appendChild(commentWrapper);

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

document.addEventListener("DOMContentLoaded", function () {
    initSortControls();
});
