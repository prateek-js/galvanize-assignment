var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const config = require('config');
const app1 = require('./app');
const port = config.get('PORT') || 8000;
const server = app1.listen(port, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield require('./startup/db')();
        console.log(`started on ${port}`);
    });
});
module.exports = server;
//# sourceMappingURL=server.js.map