const solution = require(".");

describe("F. Сумма тройных произведений", () => {
    test("test-1", () => {
        const result = solution(3, [1, 2, 3]);
        expect(result).toBe("6");
    });
    test("test-2", () => {
        const result = solution(4, [0, 5, 6, 7]);
        expect(result).toBe("210");
    });
});
