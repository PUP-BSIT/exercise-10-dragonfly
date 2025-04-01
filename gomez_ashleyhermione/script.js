document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("name");
    let commentInput = document.getElementById("comment");
    let submitButton = document.getElementById("submit_comment");
    let commentsSection = document.getElementById("comments_section");
    let sortButtonsContainer = document.createElement("div");
    let sortAscButton = document.createElement("button");
    let sortDescButton = document.createElement("button");

    sortButtonsContainer.classList.add("sort-buttons-container");
    sortAscButton.textContent = "Sort by Date (Ascending)";
    sortDescButton.textContent = "Sort by Date (Descending)";
    sortAscButton.classList.add("sort-button");
    sortDescButton.classList.add("sort-button");

    sortButtonsContainer.appendChild(sortAscButton);
    sortButtonsContainer.appendChild(sortDescButton);
    commentsSection.after(sortButtonsContainer);

    let originalComments = [];
    let newComments = [];

    document
        .querySelectorAll("#comments_section .comment")
        .forEach((commentDiv) => {
            let name = commentDiv.querySelector("h3").textContent.trim();
            let comment = commentDiv.querySelector("p").textContent.trim();
            originalComments.push({ name, comment });
        });

    function validateForm() {
        submitButton.disabled = !(
            nameInput.value.trim() && commentInput.value.trim()
        );
    }

    function addComment() {
        let name = nameInput.value.trim();
        let comment = commentInput.value.trim();
        let date = new Date().toISOString();

        if (!name || !comment) return;

        newComments.push({ name, comment, date });
        renderComments();
        nameInput.value = "";
        commentInput.value = "";
        validateForm();
    }

    function renderComments() {
        commentsSection.innerHTML = "";

        originalComments.forEach(({ name, comment }) => {
            let commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            let nameElement = document.createElement("h3");
            nameElement.textContent = name;

            let commentText = document.createElement("p");
            commentText.textContent = comment;

            commentElement.appendChild(nameElement);
            commentElement.appendChild(commentText);
            commentsSection.appendChild(commentElement);
        });

        newComments.forEach(({ name, comment, date }) => {
            let commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            let nameElement = document.createElement("h3");
            nameElement.textContent = name;

            let commentText = document.createElement("p");
            commentText.textContent = comment;

            let dateElement = document.createElement("span");
            dateElement.textContent = ` (${new Date(date).toLocaleString()})`;

            commentElement.appendChild(nameElement);
            commentElement.appendChild(commentText);
            commentElement.appendChild(dateElement);
            commentsSection.appendChild(commentElement);
        });
    }

    function sortComments(order) {
        newComments.sort((a, b) => {
            return order === "asc"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        });
        renderComments();
    }

    sortAscButton.addEventListener("click", () => sortComments("asc"));
    sortDescButton.addEventListener("click", () => sortComments("desc"));
    nameInput.addEventListener("input", validateForm);
    commentInput.addEventListener("input", validateForm);
    submitButton.addEventListener("click", addComment);
});
