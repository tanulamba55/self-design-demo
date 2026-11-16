/* Design-review shell: floating page menu + reset. Injected into every page; independent of the page runtime. */
(function () {
  var GROUPS = [
    { title: 'Main pages', items: [
      ['V5-Home.dc.html', 'Home'],
      ['V5-Discover.dc.html', 'Career Discovery'],
      ['V5-Courses.dc.html', 'Courses'],
      ['V5-Learn.dc.html', 'My Learning (live)'],
      ['V5-Login.dc.html', 'Log in'],
      ['V5-Method.dc.html', 'How we score']
    ] },
    { title: 'Course pages', items: [
      ['V5-Course-gd1.dc.html', 'Group Discussion Mastery'],
      ['V5-Course-gd2.dc.html', 'GD Basics for School Students'],
      ['V5-Course-li1.dc.html', 'LinkedIn Profile Builder'],
      ['V5-Course-li2.dc.html', 'LinkedIn for Your First Job Hunt'],
      ['V5-Course-cm1.dc.html', 'Speak with Confidence'],
      ['V5-Course-cm2.dc.html', 'Interview & Presentation Skills'],
      ['V5-Course-ld1.dc.html', 'Leadership Foundations'],
      ['V5-Course-ld2.dc.html', 'Club & Student Council Leadership']
    ] },
    { title: 'My Learning states', items: [
      ['V5-Learn-s1.dc.html', '1 · Purchased, not started'],
      ['V5-Learn-s2.dc.html', '2 · One course ongoing'],
      ['V5-Learn-s3.dc.html', '3 · One ongoing + one not started'],
      ['V5-Learn-s4.dc.html', '4 · One completed + one ongoing'],
      ['V5-Learn-s5.dc.html', '5 · Both completed'],
      ['V5-Learn-s6.dc.html', '6 · No courses (empty)'],
      ['V5-Learn-s7.dc.html', '7 · Multiple purchased, none started']
    ] }
  ];

  var here = decodeURIComponent(location.pathname.split('/').pop() || '');

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  function build() {
    if (document.getElementById('demo-shell')) return;
    var css = el('style', { text:
      '#demo-shell{position:fixed;right:16px;bottom:16px;z-index:2147483000;font:600 14px/1.3 Manrope,system-ui,sans-serif}' +
      '#demo-shell *{box-sizing:border-box}' +
      '#demo-btn{display:flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border:0;border-radius:999px;background:#1C1B29;color:#fff;font:inherit;cursor:pointer;box-shadow:0 10px 30px -8px rgba(28,27,41,.55)}' +
      '#demo-btn:hover{background:#2B2566}' +
      '#demo-btn:focus-visible,#demo-panel a:focus-visible,#demo-panel button:focus-visible{outline:2px solid #5146E6;outline-offset:2px}' +
      '#demo-panel{position:absolute;right:0;bottom:56px;width:320px;max-width:calc(100vw - 32px);max-height:min(70vh,560px);overflow:auto;background:#fff;color:#1C1B29;border:1px solid #ECE6EE;border-radius:20px;padding:16px;box-shadow:0 30px 70px -30px rgba(81,70,230,.5)}' +
      '#demo-panel[hidden]{display:none}' +
      '#demo-panel h2{margin:0 0 4px;font:500 18px Outfit,system-ui,sans-serif}' +
      '#demo-panel p{margin:0 0 12px;font-weight:500;font-size:13px;color:#5C5A63}' +
      '#demo-panel h3{margin:14px 0 6px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#5146E6}' +
      '#demo-panel a{display:block;padding:9px 10px;border-radius:10px;color:#1C1B29;text-decoration:none;font-weight:600}' +
      '#demo-panel a:hover{background:#F6F4FF}' +
      '#demo-panel a[aria-current]{background:#ECE9FF;color:#4338CA}' +
      '#demo-panel .row{display:flex;gap:8px;margin-top:14px}' +
      '#demo-panel .row a,#demo-panel .row button{flex:1;text-align:center;border:1.5px solid #D9D2E4;background:#fff;border-radius:999px;padding:10px;font:inherit;cursor:pointer;color:#1C1B29}' +
      '#demo-panel .row button:hover{border-color:#5146E6}'
    });
    document.head.appendChild(css);

    var panel = el('div', { id: 'demo-panel', hidden: '', role: 'dialog', 'aria-label': 'Design review pages' });
    panel.appendChild(el('h2', { text: 'Design review' }));
    panel.appendChild(el('p', { text: 'Clickable prototype with sample content. Jump to any page or state.' }));
    GROUPS.forEach(function (g) {
      panel.appendChild(el('h3', { text: g.title }));
      g.items.forEach(function (it) {
        var a = el('a', { href: it[0], text: it[1] });
        if (it[0] === here) a.setAttribute('aria-current', 'page');
        panel.appendChild(a);
      });
    });
    var reset = el('button', { type: 'button', text: 'Reset demo data' });
    reset.addEventListener('click', function () {
      try {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf('self_v5_') === 0) localStorage.removeItem(k); });
      } catch (e) {}
      location.reload();
    });
    panel.appendChild(el('div', { class: 'row' }, [el('a', { href: 'index.html', text: 'All pages' }), reset]));

    var btn = el('button', { id: 'demo-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'demo-panel', text: 'Design review ▴' });
    btn.addEventListener('click', function () {
      var open = panel.hasAttribute('hidden');
      if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hasAttribute('hidden')) { panel.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });

    document.body.appendChild(el('div', { id: 'demo-shell' }, [panel, btn]));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
