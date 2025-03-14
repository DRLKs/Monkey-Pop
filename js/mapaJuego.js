const gridSize = 20;
        const pathPositions = [
            [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 5], [4, 5], [5, 5],
            [6, 5], [7, 5], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [9, 10],
            [10, 10], [11, 10], [12, 10], [13,10], [13, 9], [13, 8], [13, 7], [13, 6], [13, 5],
            [13, 4], [13, 4], [14, 4], [15, 4], [16,4], [16, 5], [16, 6], [16, 7], [16, 8],
            [16, 9], [16, 10], [16, 11], [16, 12], [16, 13], [16, 14], [16, 15],
            [15, 15], [14, 15], [14, 15], [13, 15],  [12, 15], [11, 15], [10, 15],
            [9, 15],  [8, 15], [7, 15],  [6, 15],  [6, 16], [6, 17], [6, 18],
            [6, 19],  [6, 20]    
        ];
        
        const grid = document.getElementById("grid");
        let cells = [];
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                if (pathPositions.some(pos => pos[0] === row && pos[1] === col)) {
                    cell.classList.add("path");
                }
                grid.appendChild(cell);
                cells.push(cell);
            }
        }
        
        function spawnEnemy() {
            let enemyIndex = 2 * gridSize + 0;
            let enemy = document.createElement("div");
            enemy.classList.add("enemy");
            cells[enemyIndex].appendChild(enemy);
            let i = 0;
            function move() {
                if (i < pathPositions.length - 1) {
                    let nextPos = pathPositions[i + 1];
                    cells[nextPos[0] * gridSize + nextPos[1]].appendChild(enemy);
                    i++;
                    setTimeout(move, 500);
                } else {
                    enemy.remove();
                }
            }
            move();
        }
        
        setInterval(spawnEnemy, 2000);