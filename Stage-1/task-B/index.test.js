const solution = require(".");

describe("B. Майки и носки", () => {
    test("test-1", () => {
        const result = solution([6, 2, 7, 3]);
        expect(result).toEqual([3, 4]);
    });
    test("test-4", () => {
        const result = solution([0, 2, 5, 1]);
        expect(result).toEqual([1, 6]);
    });
    test("test-5", () => {
        const result = solution([9, 0, 5, 2]);
        expect(result).toEqual([1, 3]);
    });
    test("test-12", () => {
        const result = solution([3, 10, 6, 10]);
        expect(result).toEqual([4, 7]);
    });
});
