const solution = require(".");

describe("J. Исследование улик*", () => {
    test("test-1", () => {
        const result = solution(6, [3, 3, 3, 4, 4, 5], 4, 2, [3, 4, 5, 6]);
        expect(result).toEqual([1, 1, 2, 2]);
    });

    test("test-2", () => {
        const result = solution(7, [1, 5, 7, 2, 10, 10, 6], 7, 0, [1, 2, 3, 4, 5, 6, 7]);
        expect(result).toEqual([1, 1, 1, 4, 4, 6, 7]);
    });

    test("test-001", () => {
        const result = solution(10, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 10, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("test-002", () => {
        const result = solution(10, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 10, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("test-003", () => {
        const result = solution(10, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 10, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("test-004", () => {
        const result = solution(10, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 1, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test("test-005", () => {
        const result = solution(10, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });

    test("test-006", () => {
        const result = solution(10, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("test-007", () => {
        const result = solution(10, [1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 10, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 1, 1, 2, 2, 6, 6, 6, 7, 8]);
    });

    test("test-008", () => {
        const result = solution(10, [1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 10, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result).toEqual([1, 1, 1, 1, 1, 6, 6, 6, 6, 6]);
    });

    test("test-009", () => {
        const result = solution(
            16,
            [1, 1, 1, 1, 2, 2, 3, 2, 3, 3, 3, 4, 4, 5, 4, 4],
            16,
            2,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        );
        expect(result).toEqual([1, 1, 1, 2, 2, 3, 3, 8, 8, 8, 8, 8, 10, 10, 15, 15]);
    });

    test("test-010", () => {
        const result = solution(
            16,
            [1, 1, 1, 1, 2, 2, 3, 2, 3, 3, 3, 4, 4, 5, 4, 4],
            16,
            16,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        );
        expect(result).toEqual([1, 1, 1, 1, 1, 1, 1, 8, 8, 8, 8, 8, 8, 8, 15, 15]);
    });

    test("test-011", () => {
        const result = solution(
            16,
            [1, 1, 1, 1, 2, 2, 3, 2, 3, 3, 3, 4, 4, 5, 4, 4],
            16,
            0,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        );
        expect(result).toEqual([1, 2, 3, 4, 4, 6, 6, 8, 8, 10, 11, 11, 13, 13, 15, 16]);
    });

    test("test-012", () => {
        const result = solution(
            12,
            [1, 2, 2, 2, 2, 3, 4, 5, 5, 5, 6, 7],
            12,
            2,
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        );
        expect(result).toEqual([1, 1, 1, 1, 3, 3, 3, 3, 4, 5, 5, 5]);
    });

    test("test-013", () => {
        const result = solution(4, [1, 3, 2, 3], 1, 0, [4]);
        expect(result).toEqual([3]);
    });
});
