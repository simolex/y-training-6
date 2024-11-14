const solution = require(".");

describe("Великое Лайнландское переселение", () => {
    test("test-1", () => {
        const result = solution([1, 2, 3, 2, 1, 4, 2, 5, 3, 1]);
        expect(result).toEqual([-1, 4, 3, 4, -1, 6, 9, 8, 9, -1]);
    });
});
