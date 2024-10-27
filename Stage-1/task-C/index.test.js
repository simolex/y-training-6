const solution = require(".");

describe("C. Надпись на табло", () => {
    test("test-1", () => {
        const result = solution(4, [
            [".", "#", "#", "."],
            [".", "#", "#", "."],
            [".", "#", "#", "."],
            [".", ".", ".", "."]
        ]);
        expect(result).toEqual("I");
    });
    test("test-2", () => {
        const result = solution(5, [
            ["#", ".", ".", ".", "#"],
            [".", "#", ".", "#", "."],
            [".", ".", "#", ".", "."],
            [".", "#", ".", "#", "."],
            ["#", ".", ".", ".", "#"]
        ]);
        expect(result).toBe("X");
    });
});
