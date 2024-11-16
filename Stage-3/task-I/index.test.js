const solution = require(".");

describe("Автоматизированный склад*", () => {
    test("test-1", () => {
        const result = solution(4, 1, 3, [
            [1, 1],
            [3, 1],
            [2, 1],
            [2, 2]
        ]);
        expect(result).toEqual([1, 1, 2, 3]);
    });
    test("test-2", () => {
        const result = solution(4, 1, 2, [
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1]
        ]);
        expect(result).toEqual([1, 2, 3, 4]);
    });
    test("test-3", () => {
        const result = solution(1, 1, 4, [[1, 1]]);
        expect(result).toEqual([1]);
    });
});
