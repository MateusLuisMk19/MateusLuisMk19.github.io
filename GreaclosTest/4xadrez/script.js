// Get all pieces on the board
var pieces = document.querySelectorAll(".piece");

// Add event listener for each piece
for (var i = 0; i < pieces.length; i++) {
  pieces[i].addEventListener("mousedown", startDrag);
}

// Variables to track drag and drop
var activePiece = null;
var startX = 0;
var startY = 0;
var currentX = 0;
var currentY = 0;

function startDrag(e) {
  // Set the active piece to the clicked piece
  activePiece = e.target;

  // Store the initial mouse position
  startX = e.clientX;
  startY = e.clientY;
  // Add event listeners for mouse move and mouse up
  document.addEventListener("mousemove", dragPiece);
  document.addEventListener("mouseup", dropPiece);
}

function dragPiece(e) {
  // Calculate the new position of the piece
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;

  // Update the position of the piece
  activePiece.style.left = activePiece.offsetLeft + currentX + "px";
  activePiece.style.top = activePiece.offsetTop + currentY + "px";

  // Store the new mouse position
  startX = e.clientX;
  startY = e.clientY;
}

function dropPiece(e) {
  // Remove the event listeners for mouse move and mouse up
  document.removeEventListener("mousemove", dragPiece);
  document.removeEventListener("mouseup", dropPiece);

  // Check if the piece was dropped onto a valid square
  var validSquare = checkSquare(e.clientX, e.clientY);
  if (validSquare) {
    // Move the piece to the valid square
    activePiece.style.left = validSquare.offsetLeft + "px";
    activePiece.style.top = validSquare.offsetTop + "px";
  } else {
    // Move the piece back to its original position
    activePiece.style.left = activePiece.dataset.x + "px";
    activePiece.style.top = activePiece.dataset.y + "px";
  }

  // Clear the active piece
  activePiece = null;
}

function checkSquare(x, y) {
  // Check if the mouse position is within the bounds of a square
  for (var i = 0; i < squares.length; i++) {
    var rect = squares[i].getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      // Check if the square is empty or contains an opponent's piece
      if (
        !squares[i].hasChildNodes() ||
        squares[i].firstChild.dataset.color != activePiece.dataset.color
      ) {
        return squares[i];
      }
    }
  }

  // Return null if no valid square was found
  return null;
}
