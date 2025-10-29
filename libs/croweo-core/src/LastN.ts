export class LastN<T> {
    constructor(private size: number, private items?: T[]) {}

    add(item: T) {
        if (!this.items) {
            this.items = [];
        }
        this.items.unshift(item);
        if (this.items.length > this.size) {
            this.items.pop();
        }
        return this.snapshot();
    }

    snapshot() {
        return this.items?.slice();
    }
}
