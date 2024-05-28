function Component(id: Number) {
	return (target: Function) => {
		target.prototype.id = id;
	};
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
	propertyDescriptor.value = function (...args: any[]) {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string) {
	let value: number;

	const getter = () => {
		return value;
	};
	const setter = (newValue: number) => {
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

function Param(target: Object, propertyKey: string, index: number) {
	let value: number;

	const getter = () => {
		return value;
	};
	const setter = (newValue: number) => {
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

@Component(1)
export class User {
	@Prop
	id: number;

	@Method
	updateId(@Param newId: number) {
		this.id = newId;
		return this.id;
	}
}

// console.log(new User().id)
