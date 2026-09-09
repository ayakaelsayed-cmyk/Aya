const pillarData = [
  { key: 'discovery', label: '01', title: 'Discovery', text: 'Surface brands, opportunities, markets and people worth knowing — with less noise and more signal.', signal: 'FIND WHAT MATTERS' },
  { key: 'connection', label: '02', title: 'Connection', text: 'Create meaningful introductions between the people and partners who can turn potential into momentum.', signal: 'MEET THE RIGHT PARTNER' },
  { key: 'intelligence', label: '03', title: 'Intelligence', text: 'Bring market context and practical signals into the decision — so movement starts with a clearer view.', signal: 'TURN SIGNAL INTO DECISION' },
  { key: 'expansion', label: '04', title: 'Expansion', text: 'Make the route to new territories, qualified partners and wider visibility easier to navigate.', signal: 'MOVE INTO NEW MARKETS' },
  { key: 'growth', label: '05', title: 'Growth', text: 'Build the relationships, visibility and infrastructure that support sustainable commercial progress.', signal: 'GROW WITH DIRECTION' },
];

const detail = document.querySelector('[data-pillar-detail]');
const cards = document.querySelectorAll('[data-pillar]');
function selectPillar(card) {
  const item = pillarData.find((pillar) => pillar.key === card.dataset.pillar);
  if (!item || !detail) return;
  cards.forEach((candidate) => {
    const active = candidate === card;
    candidate.classList.toggle('is-active', active);
    candidate.setAttribute('aria-expanded', String(active));
  });
  detail.classList.remove('is-changing');
  requestAnimationFrame(() => {
    detail.querySelector('[data-detail-number]').textContent = item.label;
    detail.querySelector('[data-detail-title]').textContent = item.title;
    detail.querySelector('[data-detail-text]').textContent = item.text;
    detail.querySelector('[data-detail-signal]').textContent = item.signal;
    detail.dataset.active = item.key;
    detail.classList.add('is-changing');
  });
}
cards.forEach((card) => {
  card.addEventListener('click', () => selectPillar(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectPillar(card);
    }
  });
});
if (cards.length) selectPillar(cards[0]);

/* VIA entry layer: route visitors by what they are trying to accomplish. */
const ecosystem = document.querySelector('#ecosystem');
if (ecosystem && !document.querySelector('.audience-gateway')) {
  const gateway = document.createElement('section');
  gateway.className = 'audience-gateway';
  gateway.setAttribute('aria-labelledby', 'gateway-title');
  gateway.innerHTML = `
    <div class="gateway-head">
      <p class="eyebrow"><span></span> Start with your route</p>
      <h2 id="gateway-title">One ecosystem.<br /><em>Your next move.</em></h2>
      <p>VIA FRANCHISE is designed around the people who move the franchise economy forward. Choose a route and explore what matters next.</p>
    </div>
    <div class="gateway-grid">
      <a href="#ecosystem" data-route="brand"><span>01</span><strong>For Brands</strong><small>Prepare, position and expand with direction.</small><b>↗</b></a>
      <a href="#ecosystem" data-route="investor"><span>02</span><strong>For Investors</strong><small>Discover opportunities and make better connections.</small><b>↗</b></a>
      <a href="#ecosystem" data-route="entrepreneur"><span>03</span><strong>For Entrepreneurs</strong><small>Find the right franchise path and partners.</small><b>↗</b></a>
      <a href="#intelligence" data-route="market"><span>04</span><strong>For Markets</strong><small>Bring brands, demand and expansion into view.</small><b>↗</b></a>
    </div>
  `;
  ecosystem.parentNode.insertBefore(gateway, ecosystem);
  gateway.querySelectorAll('[data-route]').forEach((route) => {
    route.addEventListener('click', () => {
      gateway.querySelectorAll('[data-route]').forEach((item) => item.classList.remove('is-selected'));
      route.classList.add('is-selected');
    });
  });
}
