export class LastN<T> {
    private items: T[] = [];

    constructor(private size: number) {}

    add(item: T) {
        this.items.unshift(item);
        if (this.items.length > this.size) {
            this.items.pop();
        }
        return this.snapshot();
    }

    snapshot() {
        return this.items.slice();
    }
}
