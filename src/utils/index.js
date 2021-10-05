export function debounce(fn, delay) {
    const self = this;
    return function() {
        if (typeof fn.debounce !== 'undefined') return;
        fn.debounce = setTimeout(() => {
            fn.apply(self)
            delete fn.debounce
        }, delay)
    }
}
