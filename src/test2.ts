import 'reflect-metadata';

function Inject(key: string) {
	return (target: Function) => {
		Reflect.defineMetadata(key, 1, target);
		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
	};
}

@Inject('c')
export class C {}
