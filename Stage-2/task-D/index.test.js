const solution = require(".");

describe("D. Лучший отдых", () => {
    test("test-1", () => {
        const result = solution(3, 2, [4, 2, 1]);
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution(9, 2, [3, 8, 5, 7, 1, 2, 4, 9, 6]);
        expect(result).toBe(3);
    });
    test("test-3", () => {
        const result = solution(3, 0, [1, 3, 1]);
        expect(result).toBe(2);
    });
    test("test-4", () => {
        const result = solution(4, 4, [32, 77, 1, 100]);
        expect(result).toBe(1);
    });
});
