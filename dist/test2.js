"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
require("reflect-metadata");
function Inject(key) {
    return (target) => {
        Reflect.defineMetadata(key, 1, target);
        const meta = Reflect.getMetadata(key, target);
        console.log(meta);
    };
}
let C = class C {
};
exports.C = C;
exports.C = C = __decorate([
    Inject('c')
], C);
//# sourceMappingURL=test2.js.map