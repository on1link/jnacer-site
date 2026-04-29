(function () {
    'use strict';

    /* ===== sidebar hamburger ===== */
    const hamburger = document.querySelector('.shell__hamburger');
    const sidebar = document.querySelector('.sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = sidebar.classList.toggle('is-open');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('click', (e) => {
            if (
                sidebar.classList.contains('is-open') &&
                !sidebar.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                sidebar.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ===== clock ===== */
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        const pad = (n) => String(n).padStart(2, '0');
        const tick = () => {
            const d = new Date();
            clockEl.textContent =
                pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + ' CET';
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ===== project expand ===== */
    document.querySelectorAll('.proj__more').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.proj');
            if (card) card.classList.toggle('proj--open');
        });
    });

    /* ===== copy buttons ===== */
    document.querySelectorAll('.copy[data-copy]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const val = el.dataset.copy;
            if (val && navigator.clipboard) {
                navigator.clipboard.writeText(val).then(() => {
                    const old = el.textContent;
                    el.textContent = 'copied';
                    setTimeout(() => { el.textContent = old; }, 1200);
                });
            }
        });
    });

    /* ===== sidebar active section (home scroll sync) ===== */
    const sections = ['about', 'projects', 'stack', 'experience', 'contact'];
    const anchorItems = Array.from(document.querySelectorAll('.sidebar .sb-item[href]'));
    const anchorById = new Map();
    anchorItems.forEach((a) => {
        const href = a.getAttribute('href') || '';
        const hashIdx = href.indexOf('#');
        if (hashIdx >= 0) {
            const id = href.slice(hashIdx + 1);
            if (id) anchorById.set(id, a);
        }
    });

    const presentIds = sections.filter((id) => document.getElementById(id));
    if (presentIds.length >= 2 && anchorById.size > 0) {
        const syncSide = () => {
            let cur = presentIds[0];
            for (const id of presentIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const r = el.getBoundingClientRect();
                if (r.top < window.innerHeight * 0.35) cur = id;
            }
            anchorById.forEach((a, id) => {
                a.classList.toggle('sb-item--active', id === cur);
            });
        };
        window.addEventListener('scroll', syncSide, { passive: true });
        syncSide();
    }

    /* ===== ⌘K command palette ===== */
    const cmdkBackdrop = document.getElementById('cmdk-backdrop');
    const cmdkDialog = document.getElementById('cmdk');
    const cmdkInput = document.getElementById('cmdk-input');
    const cmdkList = document.getElementById('cmdk-list');
    const cmdkEmpty = document.getElementById('cmdk-empty');

    if (cmdkBackdrop && cmdkDialog && cmdkInput && cmdkList) {
        const pages = [
            { label: 'README.md', kind: 'page', url: '/' },
            { label: 'about.md', kind: 'page', url: '/about/' },
            { label: 'projects.py', kind: 'page', url: '/projects/' },
            { label: 'blog/', kind: 'page', url: '/blog/' },
            { label: 'stack.toml', kind: 'page', url: '/stack/' },
            { label: 'contact.yml', kind: 'section', url: '/#contact' },
            { label: 'experience.log', kind: 'section', url: '/#experience' },
            { label: 'impressum.md', kind: 'legal', url: '/impressum/' },
            { label: 'privacy.md', kind: 'legal', url: '/privacy/' },
            { label: 'cv.pdf', kind: 'file', url: '/Nacer-Jorge-CV.pdf' },
        ];

        let activeIdx = 0;
        let filtered = [];

        const render = (query) => {
            const q = query.toLowerCase().trim();
            filtered = q ? pages.filter((p) => p.label.toLowerCase().includes(q)) : pages.slice();
            cmdkList.innerHTML = '';
            filtered.forEach((p, i) => {
                const li = document.createElement('li');
                li.className = 'cmdk__item' + (i === 0 ? ' is-active' : '');
                li.dataset.idx = i;
                li.innerHTML = '<span>' + p.label + '</span><span class="cmdk__item-kind">' + p.kind + '</span>';
                cmdkList.appendChild(li);
            });
            activeIdx = 0;
            if (cmdkEmpty) cmdkEmpty.hidden = filtered.length > 0;
        };

        const open = () => {
            cmdkBackdrop.classList.add('is-open');
            cmdkDialog.classList.add('is-open');
            cmdkInput.value = '';
            render('');
            cmdkInput.focus();
        };

        const close = () => {
            cmdkBackdrop.classList.remove('is-open');
            cmdkDialog.classList.remove('is-open');
        };

        const navigate = (idx) => {
            if (filtered[idx]) {
                close();
                window.location.href = filtered[idx].url;
            }
        };

        const setActive = (idx) => {
            const items = cmdkList.querySelectorAll('.cmdk__item');
            items.forEach((el, i) => el.classList.toggle('is-active', i === idx));
            activeIdx = idx;
            if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
        };

        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                cmdkDialog.classList.contains('is-open') ? close() : open();
            }
            if (!cmdkDialog.classList.contains('is-open')) return;
            if (e.key === 'Escape') { close(); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, filtered.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
            if (e.key === 'Enter') { e.preventDefault(); navigate(activeIdx); }
        });

        cmdkInput.addEventListener('input', () => render(cmdkInput.value));
        cmdkBackdrop.addEventListener('click', close);
        cmdkList.addEventListener('click', (e) => {
            const item = e.target.closest('.cmdk__item');
            if (item) navigate(Number(item.dataset.idx));
        });
    }

    /* ===== hero: live SGD-on-a-surface demo ===== */
    const svg = document.getElementById('demo-svg');
    if (svg) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const W = 320, H = 200;
        const f = (x, y) => (x * x - 1) * (x * x - 1) + y * y + 0.15;
        const grad = (x, y) => [4 * x * (x * x - 1), 2 * y];

        const nx = 64, ny = 40;
        const xs = [], ys = [];
        for (let i = 0; i < nx; i++) xs.push(-2 + 4 * i / (nx - 1));
        for (let j = 0; j < ny; j++) ys.push(-1.5 + 3 * j / (ny - 1));
        const mapX = (x) => (x + 2) / 4 * W;
        const mapY = (y) => H - (y + 1.5) / 3 * H;

        const HX = 80, HY = 50;
        let cells = '';
        for (let i = 0; i < HX; i++) for (let j = 0; j < HY; j++) {
            const x = -2 + 4 * i / (HX - 1);
            const y = -1.5 + 3 * j / (HY - 1);
            const v = Math.min(f(x, y), 4) / 4;
            const a = 0.08 + 0.35 * (1 - v);
            cells += `<rect x="${i * (W / HX)}" y="${j * (H / HY)}" width="${W / HX + 0.6}" height="${H / HY + 0.6}" fill="currentColor" opacity="${a.toFixed(3)}"/>`;
        }

        const levels = [0.25, 0.6, 1.2, 2.2];
        let contours = '';
        for (const L of levels) {
            let d = '';
            for (let j = 0; j < ny - 1; j++) {
                for (let i = 0; i < nx - 1; i++) {
                    const x0 = xs[i], x1 = xs[i + 1], y0 = ys[j], y1 = ys[j + 1];
                    const a = f(x0, y0), b = f(x1, y0), c = f(x1, y1), dv = f(x0, y1);
                    const idx = (a > L ? 1 : 0) | (b > L ? 2 : 0) | (c > L ? 4 : 0) | (dv > L ? 8 : 0);
                    if (idx === 0 || idx === 15) continue;
                    const lerp = (p, q, va, vb) => {
                        const t = (L - va) / (vb - va);
                        return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
                    };
                    const P = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
                    const V = [a, b, c, dv];
                    const edges = [[0, 1], [1, 2], [2, 3], [3, 0]];
                    const pts = [];
                    for (const [ei, ej] of edges) {
                        if ((V[ei] > L) !== (V[ej] > L)) pts.push(lerp(P[ei], P[ej], V[ei], V[ej]));
                    }
                    if (pts.length >= 2) {
                        d += `M${mapX(pts[0][0]).toFixed(2)} ${mapY(pts[0][1]).toFixed(2)} L${mapX(pts[1][0]).toFixed(2)} ${mapY(pts[1][1]).toFixed(2)} `;
                    }
                }
            }
            contours += `<path d="${d}" stroke="currentColor" stroke-width="0.6" fill="none" opacity="0.28"/>`;
        }

        svg.innerHTML =
            '<g style="color: var(--accent)">' + cells + '</g>' +
            '<g style="color: var(--accent)">' + contours + '</g>' +
            '<path id="traj" d="" stroke="var(--accent-2)" stroke-width="1.6" fill="none"/>' +
            '<circle id="ball" r="3.2" fill="var(--accent-2)" stroke="var(--bg)" stroke-width="1"/>';

        let pt = [-1.6 + Math.random() * 0.3, 1.1 + Math.random() * 0.2];
        let vel = [0, 0];
        let path = [];
        let step = 0;
        const lr = 0.003, mom = 0.9;
        const stepEl = document.getElementById('d-step');
        const lossEl = document.getElementById('d-loss');
        const trajEl = document.getElementById('traj');
        const ballEl = document.getElementById('ball');

        const frame = () => {
            const [gx, gy] = grad(pt[0], pt[1]);
            vel[0] = mom * vel[0] - lr * gx;
            vel[1] = mom * vel[1] - lr * gy;
            pt[0] += vel[0];
            pt[1] += vel[1];
            pt[0] += (Math.random() - 0.5) * 0.004;
            pt[1] += (Math.random() - 0.5) * 0.004;
            path.push([mapX(pt[0]), mapY(pt[1])]);
            if (path.length > 260) path.shift();
            const d = 'M' + path.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join(' L');
            if (trajEl) trajEl.setAttribute('d', d);
            if (ballEl) {
                ballEl.setAttribute('cx', mapX(pt[0]));
                ballEl.setAttribute('cy', mapY(pt[1]));
            }
            step++;
            if (stepEl) stepEl.textContent = step;
            if (lossEl) lossEl.textContent = f(pt[0], pt[1]).toFixed(4);
            if (step % 900 === 0) {
                pt = [-1.6 + Math.random() * 3.2, 1.1 - Math.random() * 2.2];
                vel = [0, 0];
                path = [];
            }
            if (!reducedMotion) requestAnimationFrame(frame);
        };
        if (reducedMotion) {
            frame();
        } else {
            requestAnimationFrame(frame);
        }
    }
})();
