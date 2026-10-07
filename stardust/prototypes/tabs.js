// Team tabs — the source's showTabSection(idx) behaviour, bound by class instead of inline onclick.
document.querySelectorAll('.tabs-section').forEach((section) => {
  const buttons = [...section.querySelectorAll('.tab-buttons button')];
  const panels = [...section.querySelectorAll('.tab-content')];
  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b, i) => b.classList.toggle('active', i === idx));
      panels.forEach((p, i) => p.classList.toggle('active', i === idx));
    });
  });
});
