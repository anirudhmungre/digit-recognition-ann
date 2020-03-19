"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RandomHelper {
    static randomFloat(minimum = 0, maximum = 1) {
        return Math.random() * (maximum - minimum) + minimum;
    }
}
exports.RandomHelper = RandomHelper;
//# sourceMappingURL=RandomHelper.js.map