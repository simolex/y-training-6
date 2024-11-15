const solution = require(".");

describe("Минимальная ПСП", () => {
    test("test-1", () => {
        const result = solution(6, "()[]", "([(");
        expect(result).toBe("([()])");
    });
    test("test-2", () => {
        const result = solution(6, "][)(", "([");
        expect(result).toBe("([][])");
    });
    test("test-3", () => {
        const result = solution(4, "(][)", "()[]");
        expect(result).toBe("()[]");
    });
    test("test-4", () => {
        const result = solution(6, "])([", "");
        expect(result).toBe("()()()");
    });
    test("test-14", () => {
        const result = solution(14, "]([)", "([[]()[]");
        expect(result).toBe("([[]()[]](()))");
    });
});
