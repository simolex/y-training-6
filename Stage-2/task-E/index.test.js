const solution = require(".");

describe("E. Удаление медиан", () => {
    test("test-1", () => {
        const result = solution(3, [19, 3, 8]);
        expect(result).toEqual([8, 3, 19]);
    });

    test("test-2", () => {
        const result = solution(4, [1, 2, 4, 2]);
        expect(result).toEqual([2, 2, 1, 4]);
    });
});
