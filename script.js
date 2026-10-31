(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Mobile menu
  const btn = $('#menu-btn'), nav = $('#nav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Form validation (HTML attributes do the checking; this shows friendly messages)
  const form = $('#contact-form'), status = $('#form-status');
  const messages = {
    name: 'Please enter your name (at least 2 characters).',
    email: 'Please enter a valid email address.',
    phone: 'Use at least 7 digits, for example +1 555 010 0199.',
    message: 'Please write at least 10 characters.'
  };
  const check = f => {
    const err = $('#e-' + f.name), ok = f.checkValidity();
    if (!err) return ok;
    f.closest('.field').classList.toggle('bad', !ok);
    f.setAttribute('aria-invalid', !ok);
    err.textContent = ok ? '' : (messages[f.name] || f.validationMessage);
    return ok;
  };
  const fields = $$('input, textarea', form);
  fields.forEach(f => { f.addEventListener('blur', () => check(f)); f.addEventListener('input', () => f.closest('.field').classList.contains('bad') && check(f)); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = fields.filter(f => !check(f));
    status.className = 'status';
    if (bad.length) { status.textContent = 'Please fix the highlighted fields.'; bad[0].focus(); return; }
    // No backend in this demo: show a confirmation instead of sending.
    status.className = 'status ok';
    status.textContent = 'Thank you. Your message is ready to send once a backend is connected.';
    form.reset();
  });
})();
