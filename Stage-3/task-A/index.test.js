const solution = require(".");

describe("I. Правильная скобочная последовательность", () => {
    test("test-1", () => {
        const result = solution("()[]");
        expect(result).toBe("yes");
    });
    test("test-2", () => {
        const result = solution("([)]");
        expect(result).toEqual("no");
    });
    test("test-3", () => {
        const result = solution("([");
        expect(result).toEqual("no");
    });
    test("test-4", () => {
        const result = solution("())(()");
        expect(result).toEqual("no");
    });
});
