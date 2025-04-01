document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("name");
    let commentInput = document.getElementById("comment");
    let submitButton = document.getElementById("submit_comment");
    let commentsSection = document.getElementById("comments_section"); 

    function validateForm() {
        submitButton.disabled = !(
            nameInput.value.trim() && commentInput.value.trim()
        );
    }

    function addComment() {
        let name = nameInput.value.trim();
        let comment = commentInput.value.trim();

        if (!name || !comment) return; 

        let newComment = document.createElement("div");
        newComment.classList.add("comment-item");

        newComment.textContent = `${name}: ${comment}`; 

        commentsSection.append(newComment);

        nameInput.value = "";
        commentInput.value = "";
        validateForm();
    }

    nameInput.addEventListener("input", validateForm);
    commentInput.addEventListener("input", validateForm);
    submitButton.addEventListener("click", addComment);
});
