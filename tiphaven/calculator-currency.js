(() => {
  const currencies = [
    ['USD', 'US dollar'], ['EUR', 'Euro'], ['GBP', 'British pound'],
    ['CAD', 'Canadian dollar'], ['AUD', 'Australian dollar'], ['NZD', 'New Zealand dollar'],
    ['CHF', 'Swiss franc'], ['JPY', 'Japanese yen'], ['SEK', 'Swedish krona'],
    ['NOK', 'Norwegian krone'], ['DKK', 'Danish krone'], ['PLN', 'Polish złoty'],
    ['INR', 'Indian rupee'], ['AED', 'UAE dirham'],
  ];

  const form = document.querySelector('[data-calculator]');
  if (!form) return;

  const grid = form.querySelector('.form-grid');
  const field = document.createElement('div');
  field.className = 'field currency-field';
  field.innerHTML = `<label for="currency">Currency</label><select id="currency" name="currency" aria-label="Currency">${currencies.map(([code, name]) => `<option value="${code}">${code} — ${name}</option>`).join('')}</select>`;
  grid.prepend(field);

  const select = field.querySelector('select');
  const saved = localStorage.getItem('tiphaven-calculator-currency');
  if (currencies.some(([code]) => code === saved)) select.value = saved;

  const formatter = () => new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: select.value,
  });

  const syncSymbols = () => {
    const currencyPart = formatter().formatToParts(0).find((part) => part.type === 'currency');
    const symbol = currencyPart?.value || select.value;
    form.querySelectorAll('.money-input:not(.suffix) > span:first-child').forEach((node) => {
      node.textContent = symbol;
    });
  };

  select.addEventListener('change', () => {
    localStorage.setItem('tiphaven-calculator-currency', select.value);
    syncSymbols();
    form.dispatchEvent(new Event('input', { bubbles: true }));
  });

  syncSymbols();
  window.TipHavenCurrency = {
    formatter,
    minorUnitFactor: () => 10 ** formatter().resolvedOptions().maximumFractionDigits,
  };
})();
