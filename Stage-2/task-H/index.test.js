const solution = require(".");

describe("H. Переезд в опенспейс*", () => {
    test("test-1", () => {
        const result = solution(4, [5, 2, 3, 1]);
        expect(result).toBe("10");
    });
    test("test-2", () => {
        const result = solution(5, [5, 4, 3, 2, 1]);
        expect(result).toBe("15");
    });
});
