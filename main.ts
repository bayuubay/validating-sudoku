class Sudoku {
  private board: number[][];
  private input: string;
  constructor(input: string) {
    this.input = input;
    this.board = [];
  }

  public get inputs(): string {
    return this.input;
  }

  public get boards(): number[][][] {
    return this.normalizeInput();
  }

  private normalizeInput() {
    const board_data = this.input.split('\n');
    const number_of_board = Number(board_data.shift());
    const table: number[][][] = [];
    for (let j = 0; j < number_of_board; j++) {
      const row: number[][] = [];
      for (let i = j * 9; i < j * 9 + 9; i++) {
        const arr: number[] = [];
        const splitted = board_data[i]?.split(' ') || '';
        for (let k = 0; k < splitted.length; k++) {
          const el = Number(splitted[k]);
          arr.push(el);
        }
        row.push(arr);
      }
      table.push(row);
    }
    return table;
  }

  public validate() {
    const is_valids: string[] = [];
    const data = this.normalizeInput();
    data.forEach((d) => {
      this.board = d;
      console.log(this.board);

      is_valids.push(this.isValid() ? 'Valid' : 'Invalid');
    });
    return is_valids;
  }

  private isValid(): boolean {
    const rows = new Set<number>();
    const columns = new Set<number>();
    const boxes = new Set<number>();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = this.board[i][j];

        if (rows.has(num) || columns.has(num) || boxes.has(num)) {
          return false;
        }

        rows.add(num);
        columns.add(num);
        boxes.add(num);

        if (j === 8) {
          rows.clear();
          columns.clear();
          boxes.clear();
        }
      }
    }

    return true;
  }
}

const inputs = `2
5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
1 9 8 3 4 2 5 6 7
8 5 9 7 6 1 4 2 3
4 2 6 8 5 3 7 9 1
7 1 3 9 2 4 8 5 6
9 6 1 5 3 7 2 8 4
2 8 7 4 1 9 6 3 5
3 4 5 2 8 6 1 7 9
2 8 6 9 4 5 1 7 3
7 1 4 6 3 2 9 5 8
9 3 5 7 8 1 4 2 6
4 2 7 3 5 6 8 1 9
6 5 8 1 9 7 3 4 2
1 9 3 4 2 8 7 6 5
3 6 1 5 7 9 2 8 4
5 4 2 8 1 3 6 9 7
8 7 9 2 6 4 5 3 1`;

const sudoku = new Sudoku(inputs);
console.log(sudoku.validate());

