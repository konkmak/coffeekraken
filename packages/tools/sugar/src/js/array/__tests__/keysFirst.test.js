var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __keysFirst = require('../keysFirst');
test('sugar.js.array.keysFirst', (done) => __awaiter(this, void 0, void 0, function* () {
    const keys = __keysFirst(['a', 'b', 'd', 'g', 'c'], ['d', 'g']);
    expect(keys).toEqual(['d', 'g', 'a', 'b', 'c']);
    done();
}));