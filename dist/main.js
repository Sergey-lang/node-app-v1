"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.appBindings = void 0;
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const exception_filter_1 = require("./errors/exception.filter");
const users_service_1 = require("./users/users.service");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const users_repository_1 = require("./users/users.repository");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.Types.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.Types.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.Types.UserController).to(users_controller_1.UsersController);
    bind(types_1.Types.UserService).to(users_service_1.UsersService);
    bind(types_1.Types.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.Types.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.Types.UsersRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.Types.Application).to(app_1.App);
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const appContainer = new inversify_1.Container();
        appContainer.load(exports.appBindings);
        const app = appContainer.get(types_1.Types.Application);
        yield app.init();
        return { appContainer, app };
    });
}
exports.boot = bootstrap();
//# sourceMappingURL=main.js.map