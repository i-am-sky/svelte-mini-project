export function createCounter() {
    let count = $state(0);

    return {
        get count() {return count},
        set count(value) {count = value}
    }
}