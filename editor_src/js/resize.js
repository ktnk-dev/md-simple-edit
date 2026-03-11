const resizeHandle = document.getElementById('resize')
const elementToResize = document.getElementById('input')

let initialX
let initialWidth

resizeHandle.addEventListener('mousedown', function(e) {
    e.preventDefault();
    initialX = e.clientX
    initialWidth = elementToResize.offsetWidth

    document.addEventListener('mousemove', resizeElement)
    document.addEventListener('mouseup', stopResizing)
});

function resizeElement(e) {
    const currentX = e.clientX
    const deltaX = currentX - initialX
    const newWidth = Math.max(10, initialWidth + deltaX) - 40
    elementToResize.style.width = newWidth + 'px';
    elementToResize.style.minWidth = newWidth + 'px';
}

function stopResizing() {
    document.removeEventListener('mousemove', resizeElement)
    document.removeEventListener('mouseup', stopResizing)
}
