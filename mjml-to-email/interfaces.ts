export abstract class MjmlToObject<T> {
    constructor(public block: Cheerio) {
    };

    abstract toObject(): T
}
