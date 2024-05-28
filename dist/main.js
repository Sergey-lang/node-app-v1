"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const exception_filter_1 = require("./errors/exception.filter");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.Types.ILogger).to(logger_service_1.LoggerService);
    bind(types_1.Types.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.Types.UserController).to(users_controller_1.UsersController);
    bind(types_1.Types.Application).to(app_1.App);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.Types.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
