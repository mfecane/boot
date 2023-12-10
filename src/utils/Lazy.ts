export class LazyFactory<T> {
	private instance: T | null = null

	public constructor(private constructorType: new () => T) {}

	public get(): T {
		if (!this.instance) {
			this.instance = new this.constructorType()
		}
		return this.instance
	}
}
