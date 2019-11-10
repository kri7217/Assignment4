(function () {

  function setBoard() {
    return [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
  }
  var board = setBoard()
  var emptyPositions = []

  // Creates 9x9 squares in DOM
  function generateUI() {

    let containerDiv = document.getElementsByClassName('container')

    for (let i = 0; i < 9; i++) {

      //create a div element for each row in grid
      let rowDiv = document.createElement('div');

      for (let j = 0; j < 9; j++) {

        (function (i, j) {
          //create input element, add eventListener and add to div
          let box = document.createElement('input')
          box.setAttribute('id', `${i}${j}`);
          if (board[i][j] === 0) {
            box.setAttribute('class', 'zeroItem')
          }
          box.value = board[i][j]
          box.disabled = true

          //only for manual sudoko
          //box.addEventListener("change",(e)=>findTheFitAndValidate(i,j,e))
          rowDiv.appendChild(box)
        })(i, j)
      }
      containerDiv[0].appendChild(rowDiv)
    }
  }

  // Prints the board
  function printSudoko() {

    for (let i = 0; i < 9; i++) {

      for (let j = 0; j < 9; j++) {
        let doc = document.getElementById(`${i}${j}`)

        if (doc.classList.contains('zeroItem')) {
          doc.classList.remove('zeroItem')
          doc.classList.add('after0Change')
        }

        doc.value = board[i][j];

      }

    }

  }

  //check whether value is present in row
  function checkValueInRow(row, value) {

    for (var i = 0; i < board[row].length; i++) {

      if (board[row][i] === value) {
        return false;
      }
    }

    return true;
  }

  //check whether value is present in column
  function checkValueInColumn(column, value) {

    for (var i = 0; i < board.length; i++) {

      if (board[i][column] === value) {
        return false;
      }
    }

    return true;
  };

  //check whether the value is present in 3x3 square
  function checkValueInSquare(column, row, value) {
    // Save the upper left corner
    var columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

    // Find the left-most column
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    // Find the upper-most row
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    // Iterate through each row
    for (var i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for (var j = columnCorner; j < columnCorner + squareSize; j++) {
        // Return false is a match is found
        if (board[i][j] === value) {
          return false;
        }
      }
    }
    // If no match was found, return true
    return true;
  };

  //checks the entered value is valid across row, column and 3x3 square
  function checkValue(column, row, value) {
    if (checkValueInRow(row, value) &&
      checkValueInColumn(column, value) &&
      checkValueInSquare(column, row, value)) {
      return true;
    } else {
      return false;
    }
  };

  //if sudoko is solved manually
  function findTheFitAndValidate(x, y, e) {

    let changedBox = document.getElementById(`${x}${y}`)
    let value = parseInt(e.target.value)
    let numberPresent = false

    if (e.target.value != 0) {

      //check the box 3x3
      numberPresent = checkValue(x, y, value)
      if (numberPresent) {
        //change the color of the element and not update the sudoko
        changedBox.setAttribute('class', 'error')
        return;
      }
    }

    if (changedBox.className == 'error') {
      changedBox.className = ""
    }

    //update the sudoko[] at the index
    sudoko[x][y] = value

  }

  //To find solution for the problem// backtrack
  function solvePuzzle() {
    var limit = 9,
      i, row, column, value, found;
    //var emptyPositions = [];

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          emptyPositions.push([i, j]);
        }
      }
    }
    for (i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0];
      column = emptyPositions[i][1];

      value = board[row][column] + 1;

      found = false;
      // Keep trying new values until either the limit
      // was reached or a valid value was found
      while (!found && value <= limit) {

        if (checkValue(column, row, value)) {
          found = true;
          board[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      // If no valid value was found and the limit was
      // reached, move back to the previous position
      if (!found) {
        board[row][column] = 0;
        i--;
      }
    }
  };


  //Button handler
  function attachButtonHandler() {
    document.getElementsByTagName("button")[0].addEventListener('click', (e) => execute())
  }

  generateUI()
  attachButtonHandler()

  function execute() {
    solvePuzzle();
    printSudoko();
  }
})()
