/* "Open in Aureon Cloud" button for Forgejo repo pages.
 * Token kabhi is script me nahi hota. Button:
 *   1. "git clone <repo url>" clipboard me copy karta hai
 *   2. Aureon Cloud IDE naye tab me kholta hai
 * IDE ka address: window.AUREON_IDE_URL, warna git.xyz.com -> ide.xyz.com
 */
(function () {
  if (window.__aureonOpenBtn) return;
  window.__aureonOpenBtn = true;

  function ideUrl() {
    if (window.AUREON_IDE_URL) return window.AUREON_IDE_URL;
    var h = location.hostname;
    if (/^git\./.test(h)) return location.protocol + '//' + h.replace(/^git\./, 'ide.') + '/';
    return null;
  }

  function repoCloneUrl() {
    var m = document.querySelector('meta[name="go-import"]');
    if (!m) return null; // sirf repo pages pe ye meta hota hai
    var parts = (m.getAttribute('content') || '').split(/\s+/);
    return parts.length >= 3 ? parts[2] : null;
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'aureon-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 6000);
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        ta.remove();
        ok ? resolve() : reject(new Error('copy failed'));
      } catch (e) { reject(e); }
    });
  }

  function init() {
    var clone = repoCloneUrl();
    var ide = ideUrl();
    if (!clone || !ide) return;
    var cmd = 'git clone ' + clone;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'aureon-open-btn';
    btn.textContent = 'Open in Aureon Cloud';
    btn.addEventListener('click', function () {
      var win = window.open(ide, '_blank', 'noopener');
      copy(cmd).then(function () {
        toast('Clone command copy ho gaya. IDE ke terminal me paste karo: ' + cmd);
      }, function () {
        toast('Is command ko IDE ke terminal me chalao: ' + cmd);
      });
      if (!win) location.href = ide;
    });

    var host = document.querySelector('.repo-button-row, .clone-buttons-combo, #clone-panel');
    if (host) {
      host.appendChild(btn);
    } else {
      btn.classList.add('aureon-open-floating');
      document.body.appendChild(btn);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
