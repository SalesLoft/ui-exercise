(function ($, Struct) {
    Struct.Helper = Struct.Helper ||
	(function () {
	    var createBoard = function () {
	        board = new Array();
	        board = [ [0, 0, 0, 0, 0, 0, 0]
	                , [0, 0, 0, 0, 0, 0, 0]
	                , [0, 0, 0, 0, 0, 0, 0]
	                , [0, 0, 0, 0, 0, 0, 0]
	                , [0, 0, 0, 0, 0, 0, 0]
	                , [0, 0, 0, 0, 0, 0, 0]];
	        return board;
	    }

	    var cellContents = function (row, column, g_board) {
	        //Cell is out of bounds
	        if (g_board[row] == undefined) {
	            return -1;
	        } else {
	            return g_board[row][column];
	        }
	    }

	    /*
         * Check the cells around (x, y). If this player's block is adjacent to another one of their blocks check that block.
         */
	    function adjacentCell(y, x, increment_y, increment_x, g_virtualBoard) {
	        //If the adjacent cell we are looking at is out of bounds return.
	        if ((y + increment_y) >= 6 || (x + increment_x) >= 7 || (x + increment_x) <= -1) {
	            return 0;
	        }

	        //current cell position
	        var currentCellPosition = cellContents(y, x, g_virtualBoard);
	        //the adjacent call
	        var observedAdjacentCell = cellContents(y + increment_y, x + increment_x, g_virtualBoard);

	        //does the current player have a block here?
	        if (currentCellPosition !== observedAdjacentCell) {
	            return 0;
	        }
	        //Add +1 to attack or block and move to cell of the adjacent block and check for another block in the same direction. Return the column to block
	        return 1 + adjacentCell(y + increment_y, x + increment_x, increment_y, increment_x, g_virtualBoard);
	    }

	    return {
	        CreateBoard: createBoard
            , CellContents: cellContents
            , AdjacentCell: adjacentCell
	    };
	})();
})(jQuery, Game.Struct);