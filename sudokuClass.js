class Sudoko {

    constructor() {
        this.board = [
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

    generateUI() {

        let containerDiv = document.getElementsByClassName('container')

        this.board.forEach((row, i) => {
            //create a div element for each row in grid
            let rowDiv = document.createElement('div')
            row.forEach((item, j) => {
                (function (i, j) {
                    //create input element, add eventListener and add to div
                    let box = document.createElement('input')
                    box.setAttribute('id', `${i}${j}`);
                    if (item === 0) {
                        box.setAttribute('class', 'zeroItem')
                    }
                    box.value = item
                    box.disabled = true
                    rowDiv.appendChild(box)
                })(i, j)
            })
            containerDiv[0].appendChild(rowDiv)
        })
    }

    printSudoko() {
        this.board.forEach((row, i) => {

            row.forEach((item, j) => {
                let doc = document.getElementById(`${i}${j}`)

                if (doc.classList.contains('zeroItem')) {
                    doc.classList.remove('zeroItem')
                    doc.classList.add('after0Change')
                }

                doc.value = item;

            })
        })
    }


    checkValueInRow(row, value) {

        for (let i = 0; i < this.board[row].length; i++) {

            if (this.board[row][i] === value) {
                return false;
            }
        }

        return true;
    }

    checkValueInColumn(column, value) {

        for (var i = 0; i < this.board.length; i++) {

            if (this.board[i][column] === value) {
                return false;
            }
        }

        return true;
    }

    checkValue(column, row, value) {
        if (this.checkValueInRow(row, value) &&
            this.checkValueInColumn(column, value) &&
            this.checkValueInSquare(column, row, value)) {
            return true;
        } else {
            return false;
        }
    }

    checkValueInSquare(column, row, value) {
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
                if (this.board[i][j] === value) {
                    return false;
                }
            }
        }
        // If no match was found, return true
        return true;
    }

    solvePuzzle() {
        var limit = 9,
            i, row, column, value, found;
        var emptyPositions = [];


        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] === 0) {
                    emptyPositions.push([i, j]);
                }
            }
        }
        for (i = 0; i < emptyPositions.length;) {
            row = emptyPositions[i][0];
            column = emptyPositions[i][1];

            value = this.board[row][column] + 1;

            found = false;
            // Keep trying new values until either the limit
            // was reached or a valid value was found
            while (!found && value <= limit) {

                if (this.checkValue(column, row, value)) {
                    found = true;
                    this.board[row][column] = value;
                    i++;
                }
                else {
                    value++;
                }
            }
            // If no valid value was found and the limit was
            // reached, move back to the previous position
            if (!found) {
                this.board[row][column] = 0;
                i--;
            }
        }
    }

    attachButtonHandler() {
        document.getElementsByTagName("button")[0].addEventListener('click', (e) => this.execute())
    }

    runAtStart() {
        this.generateUI()
        this.attachButtonHandler()
    }

    execute() {
        this.solvePuzzle();
        this.printSudoko();
    }

}


(function () {
    let sud = new Sudoko()
    sud.runAtStart()
})()