function solution(commands) {
  const result = [];

  const table = Array.from({ length: 51 }, () => Array(51).fill(""));
  const cursor = Array.from({ length: 51 }, (_, i) => Array.from({ length: 51 }, (_, j) => [i, j]));

  for (const command of commands) {
    const cmd = command.split(" ");

    switch (cmd[0]) {
      case "UPDATE": {
        if (cmd.length === 4) {
          const [r, c] = cmd.slice(1, 3).map(Number);
          const value = cmd[3];
          const [cr, cc] = cursor[r][c];
          table[cr][cc] = value;
        } else if (cmd.length === 3) {
          const [, value1, value2] = cmd;
          for (let i = 1; i <= 50; i++) {
            for (let j = 1; j <= 50; j++) {
              const [cr, cc] = cursor[i][j];
              if (table[cr][cc] === value1) {
                table[cr][cc] = value2;
              }
            }
          }
        }
        break;
      }
      case "MERGE": {
        const [r1, c1, r2, c2] = cmd.slice(1).map(Number);
        const [pr1, pc1] = cursor[r1][c1];
        const [pr2, pc2] = cursor[r2][c2];
        if (pr1 === pr2 && pc1 === pc2) break;

        const value = table[pr1][pc1] || table[pr2][pc2];

        for (let i = 1; i <= 50; i++) {
          for (let j = 1; j <= 50; j++) {
            const [cr, cc] = cursor[i][j];
            if (cr === pr2 && cc === pc2) {
              cursor[i][j] = [pr1, pc1];
            }
          }
        }

        table[pr2][pc2] = "";
        table[pr1][pc1] = value;
        break;
      }
      case "UNMERGE": {
        const [r, c] = cmd.slice(1).map(Number);
        const [pr, pc] = cursor[r][c];
        
        const value = table[pr][pc];
        
        for (let i = 1; i <= 50; i++) {
            for (let j = 1; j <= 50; j++) {
                const [cr, cc] = cursor[i][j];
                if (cr === pr && cc === pc) {
                    cursor[i][j] = [i, j];
                }
            }
        }
        
        table[pr][pc] = "";
        table[r][c] = value;
        break;
      }
      case "PRINT": {
        const [r, c] = cmd.slice(1).map(Number);
        const [cr, cc] = cursor[r][c];
        if (table[cr][cc]) {
          result.push(table[cr][cc]);
        } else {
          result.push("EMPTY");
        }
        break;
      }
    }
  }

  return result;
}