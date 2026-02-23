const resizeHandle = document.getElementById('resize');
const elementToResize = document.getElementById('input'); // Replace with your element's ID

// Variable to store the initial mouse position
let initialX;
// Variable to store the initial width of the element
let initialWidth;

// 1. Start Dragging (mousedown event on the handle)
resizeHandle.addEventListener('mousedown', function(e) {
    e.preventDefault(); // Prevent default browser behavior (like text selection)
    initialX = e.clientX;
    initialWidth = elementToResize.offsetWidth;

    // Attach the move and stop events to the document
    document.addEventListener('mousemove', resizeElement);
    document.addEventListener('mouseup', stopResizing);
});

// 2. Track Movement (mousemove event on the document)
function resizeElement(e) {
    // Get the current horizontal position of the mouse
    const currentX = e.clientX;

    // Calculate the change in position
    const deltaX = currentX - initialX;

    // Calculate the new width
    // Ensure the width doesn't go below a certain minimum (optional)
    const newWidth = Math.max(10, initialWidth + deltaX) - 35;

    // Apply the new width to the element
    elementToResize.style.width = newWidth + 'px';
    elementToResize.style.minWidth = newWidth + 'px';
}

// 3. Stop Dragging (mouseup event on the document)
function stopResizing() {
    // Remove the event listeners
    document.removeEventListener('mousemove', resizeElement);
    document.removeEventListener('mouseup', stopResizing);
}
