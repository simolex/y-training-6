const solution = require(".");

describe("G. Цензурное произведение", () => {
    test("test-1", () => {
        const result = solution(3, 1, "aab");
        expect(result).toBe(2);
    });
    test("test-2", () => {
        const result = solution(6, 2, "aabcbb");
        expect(result).toBe(4);
    });
    test("test-3", () => {
        const result = solution(2, 1, "ab");
        expect(result).toBe(2);
    });
    test("test-5", () => {
        const result = solution(1, 0, "a");
        expect(result).toBe(1);
    });
    test("test-16", () => {
        const result = solution(50, 159, "aaabaababaabaaaabaabbxaazbaaaababaababbbaaaabaabbb");
        expect(result).toBe(39);
    });
});
