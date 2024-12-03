import { Spinner } from 'spin.js';
// Spinner configuration options
const spinnerOptions = {
    lines: 12,
    length: 20,
    width: 10,
    radius: 25,
    scale: 0.2,
    corners: 1,
    color: '#154F92',
    fadeColor: 'transparent',
    speed: 1,
    rotate: 0,
    animation: 'spinner-line-fade-quick',
    position: 'relative', // Element positioning
};
export function createSpinner(target) {
    const spinner = new Spinner(spinnerOptions);
    spinner.spin(target);
    return spinner;
}
export function stopSpinner(spinner) {
    if (spinner)
        spinner.stop();
}
//# sourceMappingURL=Spinner.js.map