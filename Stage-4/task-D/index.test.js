const solution = require(".");

describe("Кровать из стульев*", () => {
    test("test-1", () => {
        const result = solution(4, 7, [
            [1, 1],
            [4, 4],
            [1, 2],
            [2, 3]
        ]);
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution(5, 6, [
            [1, 5],
            [3, 4],
            [5, 3],
            [4, 2],
            [2, 1]
        ]);
        expect(result).toBe(1);
    });
});
