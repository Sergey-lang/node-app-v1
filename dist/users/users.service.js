"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UsersService = void 0;
const user_entity_1 = require("./user.entity");
const inversify_1 = require("inversify");
const types_1 = require("../types");
let UsersService = class UsersService {
    constructor(configService, usersRepository) {
        this.configService = configService;
        this.usersRepository = usersRepository;
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, password }) {
            const newUser = new user_entity_1.User(email, name);
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(password, Number(salt));
            const isExistedUser = yield this.usersRepository.find(newUser.email);
            if (isExistedUser) {
                return null;
            }
            return this.usersRepository.create(newUser);
        });
    }
    validateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const existedUser = yield this.usersRepository.find(email);
            if (!existedUser) {
                return false;
            }
            const newUser = new user_entity_1.User(existedUser.email, existedUser.name, existedUser.password);
            return newUser.comparePassword(password);
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.Types.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.Types.UsersRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map