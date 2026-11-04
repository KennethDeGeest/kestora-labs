const rateForm = document.querySelector('[data-rate-calculator]');
const rateResult = document.querySelector('[data-rate-result]');

rateForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(rateForm);
  const weight = Number(data.get('rateWeight'));
  const units = data.get('rateUnits');
  if (!Number.isFinite(weight) || weight <= 0 || !rateResult) return;

  const low = weight * 0.0025;
  const high = weight * 0.005;
  const unit = units === 'lb' ? 'lb' : 'kg';
  const digits = units === 'lb' ? 1 : 2;
  rateResult.innerHTML = `<strong>${low.toFixed(digits)}–${high.toFixed(digits)} ${unit} per week</strong><p>That is about ${(low * 4.345).toFixed(digits)}–${(high * 4.345).toFixed(digits)} ${unit} per average month. This published bodybuilding range is a reference point, not a promise or medical target.</p>`;
  rateResult.hidden = false;
  rateResult.focus();
});
