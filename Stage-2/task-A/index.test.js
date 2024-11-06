const solution = require(".");

describe("A. Префиксные суммы", () => {
    test("test-1", () => {
        const result = solution([-10, -4, 5, 0, 2]);
        expect(result).toEqual([10, 6, 11, 11, 13]);
    });
});
