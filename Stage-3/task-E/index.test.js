const solution = require(".");

describe("18. Значение арифметического выражения", () => {
    test("test-1", () => {
        const result = solution("1+(2*2 - 3)");
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution("1+a+1");
        expect(result).toBeUndefined();
    });
    test("test-3", () => {
        const result = solution("1 1 + 2");
        expect(result).toBeUndefined();
    });
    test("test-5", () => {
        const result = solution("1+2-3+4-5+6-7+8-9+10-11+12-13");
        expect(result).toBe(-5);
    });
    test("test-21+++", () => {
        const result = solution("((1 (3 + 5)) -)");
        expect(result).toBeUndefined();
    });
});
