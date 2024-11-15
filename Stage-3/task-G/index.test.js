const solution = require(".");

describe("Очередь в ПВЗ*", () => {
    test("test-1", () => {
        const result = solution(3, 4, [1, 5, 9]);
        expect(result).toBe("22");
    });
    test("test-2", () => {
        const result = solution(3, 0, [4, 4, 4]);
        expect(result).toBe("36");
    });
});
