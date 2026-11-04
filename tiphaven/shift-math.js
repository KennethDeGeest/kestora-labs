const form = document.querySelector('#shift-math-form');
const result = document.querySelector('#shift-math-result');

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const value = name => Math.max(0, Number(data.get(name)) || 0);
  const cash = value('cash');
  const card = value('card');
  const tipout = value('tipout');
  const wage = value('wage');
  const hours = value('hours');
  const total = Math.max(0, cash + card - tipout + wage * hours);
  const hourly = hours > 0 ? total / hours : 0;
  result.innerHTML = `<span>Total earnings</span><strong>${money(total)}</strong><small>${money(hourly)} per hour</small>`;
  result.focus();
});
