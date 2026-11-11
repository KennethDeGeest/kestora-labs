(() => {
  const form = document.querySelector('[data-calculator]');
  if (!form) return;

  const basis = form.elements.basis;
  const salesField = form.querySelector('[data-sales-field]');
  const rateField = form.querySelector('[data-rate-field]');
  const fixedField = form.querySelector('[data-fixed-field]');
  const result = document.querySelector('[data-result]');
  const error = form.querySelector('[data-error]');

  const value = (name) => Number.parseFloat(form.elements[name].value) || 0;

  const syncFields = () => {
    const mode = basis.value;
    salesField.hidden = mode !== 'sales';
    rateField.hidden = mode === 'fixed';
    fixedField.hidden = mode !== 'fixed';
  };

  const calculate = (event) => {
    if (event) event.preventDefault();
    const money = window.TipHavenCurrency.formatter();
    error.textContent = '';
    const tips = value('tips');
    const rate = value('rate');
    const sales = value('sales');
    const fixed = value('fixed');
    const hours = value('hours');
    const wage = value('wage');

    if (tips < 0 || sales < 0 || fixed < 0 || wage < 0 || hours < 0 || rate < 0 || rate > 100) {
      error.textContent = 'Use positive amounts and a percentage between 0 and 100.';
      return;
    }
    if (basis.value === 'sales' && sales <= 0) {
      error.textContent = 'Enter the sales amount used for your tip-out.';
      return;
    }

    const base = basis.value === 'sales' ? sales : tips;
    const tipOut = basis.value === 'fixed' ? fixed : base * (rate / 100);
    const netTips = tips - tipOut;
    const wages = hours * wage;
    const total = netTips + wages;
    const hourly = hours > 0 ? total / hours : null;

    result.innerHTML = `<p class="eyebrow">Your result</p>
      <h2>${money.format(tipOut)} tip-out</h2>
      <div class="result-number">${money.format(netTips)} <span>net tips</span></div>
      <ul class="result-breakdown">
        <li><span>Gross tips</span><strong>${money.format(tips)}</strong></li>
        <li><span>Tip-out</span><strong>− ${money.format(tipOut)}</strong></li>
        <li><span>Wages</span><strong>+ ${money.format(wages)}</strong></li>
        <li><span>Total earnings</span><strong>${money.format(total)}</strong></li>
        ${hourly === null ? '' : `<li><span>True hourly earnings</span><strong>${money.format(hourly)}/hr</strong></li>`}
      </ul>
      <p class="result-note">Before taxes. Use your workplace policy to choose the correct tip-out base and rate.</p>`;
    result.focus({ preventScroll: true });
  };

  basis.addEventListener('change', () => { syncFields(); calculate(); });
  form.addEventListener('submit', calculate);
  form.addEventListener('input', () => calculate());
  syncFields();
})();
