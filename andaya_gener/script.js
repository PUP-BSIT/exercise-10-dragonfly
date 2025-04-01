const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const commentButton = document.getElementById('comment_button');
const commentForm = document.getElementById('comment_form');
const commentsSection = document.getElementById('comments_section');

// Function to toggle the button state
function toggleButtonState() {
    commentButton.disabled = !(
        nameInput.value.trim() && commentInput.value.trim()
    );
}

// Function to add a new comment
function addComment(event) {
    event.preventDefault(); // Prevent form submission

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name && comment) {
        const newComment = document.createElement('p');
        newComment.textContent = `${comment} - ${name}`;
        commentsSection.querySelector('.asset').appendChild(newComment);
    }

    // Clear input fields and reset button state
    nameInput.value = '';
    commentInput.value = '';
    toggleButtonState();
}

// Add event listeners to input fields and to the form for the submit action 
nameInput.addEventListener('input', toggleButtonState);
commentInput.addEventListener('input', toggleButtonState);
commentForm.addEventListener('submit', addComment);