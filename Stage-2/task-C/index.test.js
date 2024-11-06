const solution = require(".");

describe("93. City of Che", () => {
    test("test-1", () => {
        const result = solution(4, 4, [1, 3, 5, 8]);
        expect(result).toBe(2);
    });
});
