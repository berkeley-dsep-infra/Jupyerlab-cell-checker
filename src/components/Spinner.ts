import { Spinner } from 'spin.js';

// Spinner configuration options
const spinnerOptions = {
  lines: 12, // Number of lines in the spinner
  length: 20, // Length of each line
  width: 10, // Thickness of each line
  radius: 25, // Radius of the inner circle
  scale: 0.1, // Scales the whole spinner
  corners: 1, // Corner roundness (0..1)
  color: '#154F92', // Spinner color
  fadeColor: 'transparent', // Fade color
  top: '50%',
  bottom: '50%',
  speed: 1, // Rounds per second
  rotate: 0, // Rotation offset
  animation: 'spinner-line-fade-quick', // CSS animation
  position: 'relative', // Element positioning
};

export function createSpinner(target: HTMLElement): Spinner {
  const spinner = new Spinner(spinnerOptions);
  spinner.spin(target);
  return spinner;
}

export function stopSpinner(spinner: Spinner | null): void {
  if (spinner) spinner.stop();
}