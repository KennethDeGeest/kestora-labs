(() => {
  const measurementId = "G-5L0E24RJJL";
  const consentKey = "kestora.analytics.consent";
  let analyticsLoaded = false;

  const appFromPath = () => location.pathname.split("/").filter(Boolean)[0] || "portfolio";

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      page_title: document.title,
      page_location: location.href
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  function banner() {
    let element = document.querySelector("[data-consent-banner]");
    if (element) return element;
    element = document.createElement("section");
    element.className = "analytics-consent-banner";
    element.dataset.consentBanner = "";
    element.setAttribute("aria-label", "Analytics choice");
    element.innerHTML = '<strong>Help us improve Kestora Labs?</strong><p>Optional analytics tells us which pages and App Store links are useful. It stays off unless you accept. <a href="/privacy.html">Website privacy</a>.</p><div class="analytics-consent-actions"><button type="button" data-consent-reject>Essential only</button><button type="button" data-consent-accept>Accept analytics</button></div>';
    document.body.append(element);
    return element;
  }

  function setChoice(value) {
    localStorage.setItem(consentKey, value);
    const element = banner();
    element.hidden = true;
    if (value === "granted") loadAnalytics();
  }

  const current = localStorage.getItem(consentKey);
  const element = banner();
  element.hidden = current === "granted" || current === "denied";
  if (current === "granted") loadAnalytics();

  document.addEventListener("click", event => {
    const accept = event.target.closest("[data-consent-accept]");
    const reject = event.target.closest("[data-consent-reject]");
    const settings = event.target.closest("[data-cookie-settings]");
    if (accept) setChoice("granted");
    if (reject) setChoice("denied");
    if (settings) {
      localStorage.removeItem(consentKey);
      banner().hidden = false;
    }

    const link = event.target.closest('a[href*="apps.apple.com"]');
    if (!link || !analyticsLoaded || typeof window.gtag !== "function") return;
    const url = new URL(link.href);
    window.gtag("event", "app_store_click", {
      app_name: appFromPath(),
      campaign_token: url.searchParams.get("ct") || "unattributed",
      link_url: link.href,
      link_text: link.textContent.trim().slice(0, 100)
    });
  });
})();

