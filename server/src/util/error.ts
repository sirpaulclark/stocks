export class ExError extends Error {
    constructor (...args: any[]) {
        super(...args);
        this.status = 0;
    }
    public status: number;
}