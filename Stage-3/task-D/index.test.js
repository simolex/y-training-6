const solution = require(".");

describe("142. Постфиксная запись", () => {
    test("test-1", () => {
        const result = solution("8 9 + 1 7 - *");
        expect(result).toBe(-102);
    });
});
