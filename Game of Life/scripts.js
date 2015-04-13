(function () {
  'use strict';

  function paint(grid) {
    var oldTable = document.querySelector('table');
    document.body.removeChild(oldTable);

    var newTable = document.createElement('table');

    grid.forEach(function (row) {
      var tr = document.createElement('tr');
      newTable.appendChild(tr);

      row.forEach(function (cell) {
        var td = document.createElement('td');
        tr.appendChild(td);

        if (cell) {
          td.className = 'alive';
        }
      });
    });

    document.body.appendChild(newTable);
  }



  function promptForWidth() {
    return prompt('How wide?');
  }

  function promptForHeight() {
    return prompt('How tall?');
  }

  function trueOrFalse() {
    if (Math.random() < 0.5) {
      return false;
    } else {
      return true;
    }
  }

  function initialize() {
    var w = promptForWidth();
    var h = promptForHeight();
    var grid1 = [];
    var grid2 = [];

    for (var i = 0; i < w; i++) {
      grid1.push([]);
      grid2.push([]);

      for (var j = 0; j < h; j++) {
        grid1[i].push(trueOrFalse());
        grid2[i].push(false);
      }
    }

    return [grid1, grid2];
  }

  function update(grids) {
    var grid1 = grids[0];
    var grid2 = grids[1];
    var w = grid1.length;
    var h = grid1[0].length;

    for (var i = 0; i < w; i++) {
      for (var j = 0; j < h; j++) {
        var alive = grid1[i][j];
        var neighbors = 0;

        if (grid1[(w + i - 1) % w][(h + j - 1) % h]) { neighbors++; }
        if (grid1[(w + i - 1) % w][(h + j) % h])     { neighbors++; }
        if (grid1[(w + i - 1) % w][(h + j + 1) % h]) { neighbors++; }

        if (grid1[(w + i) % w][(h + j - 1) % h])     { neighbors++; }
        if (grid1[(w + i) % w][(h + j + 1) % h])     { neighbors++; }

        if (grid1[(w + i + 1) % w][(h + j - 1) % h]) { neighbors++; }
        if (grid1[(w + i + 1) % w][(h + j) % h])     { neighbors++; }
        if (grid1[(w + i + 1) % w][(h + j + 1) % h]) { neighbors++; }

        if (alive) {
          if (neighbors === 2 || neighbors === 3) {
            grid2[i][j] = true;
          } else {
            grid2[i][j] = false;
          }
        } else {
          if (neighbors === 3) {
            grid2[i][j] = true;
          } else {
            grid2[i][j] = false;
          }
        }
      }
    }

    return [grid2, grid1];
  }

  var grids = initialize();
  var delay = prompt('How often to update? (milliseconds)');
  setInterval(function () {
    paint(grids[0]);
    grids = update(grids);
  }, delay);
})();
