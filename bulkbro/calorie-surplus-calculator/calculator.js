const form = document.querySelector('[data-calculator]');
const result = document.querySelector('[data-result]');
const error = document.querySelector('[data-error]');

const roundToTen = value => Math.round(value / 10) * 10;

form?.addEventListener('submit', event => {
  event.preventDefault();
  error.textContent = '';

  const data = new FormData(form);
  const age = Number(data.get('age'));
  const weight = Number(data.get('weight'));
  const height = Number(data.get('height'));
  const activity = Number(data.get('activity'));
  const surplus = Number(data.get('surplus'));
  const units = data.get('units');
  const equation = data.get('equation');

  if (![age, weight, height, activity, surplus].every(Number.isFinite) || age < 18 || weight <= 0 || height <= 0) {
    error.textContent = 'Enter valid values. This educational calculator is intended for adults aged 18 or older.';
    return;
  }

  const weightKg = units === 'imperial' ? weight * 0.45359237 : weight;
  const heightCm = units === 'imperial' ? height * 2.54 : height;
  const coefficient = equation === 'male' ? 5 : -161;
  const resting = 10 * weightKg + 6.25 * heightCm - 5 * age + coefficient;
  const maintenance = resting * activity;
  const target = maintenance + surplus;

  result.innerHTML = `
    <p class="eyebrow" style="color:#c8d4e5">Your starting estimate</p>
    <h2>Daily calorie target</h2>
    <div class="result-number">${roundToTen(target).toLocaleString()} <span>kcal/day</span></div>
    <ul class="result-breakdown">
      <li><span>Estimated resting needs</span><strong>${roundToTen(resting).toLocaleString()} kcal</strong></li>
      <li><span>Estimated maintenance</span><strong>${roundToTen(maintenance).toLocaleString()} kcal</strong></li>
      <li><span>Chosen surplus</span><strong>+${surplus.toLocaleString()} kcal</strong></li>
    </ul>
    <p class="result-note">This is a formula-based starting point, not a measurement of your metabolism. Track your intake and weight response, then adjust from real results.</p>
    <a class="button" href="https://apps.apple.com/app/apple-store/id6770476671?pt=128911414&amp;ct=kestora_bulkbro_calc_result&amp;mt=8" data-app-name="BulkBro" data-link-position="calculator_result">Let BulkBro adapt it ↗</a>`;
  result.focus();
});
