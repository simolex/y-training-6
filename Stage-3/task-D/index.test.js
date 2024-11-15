const solution = require(".");

describe("Постфиксная запись", () => {
    test("test-1", () => {
        const result = solution("8 9 + 1 7 - *");
        expect(result).toBe(-102);
    });
});
