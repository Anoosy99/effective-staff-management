window.effectiveNotificationState = {
  items: [
    { id: "n1", userId: "e1", en: "You have 2 pending tasks today.", ar: "لديك مهمتان معلقتان اليوم.", whenEn: "Today", whenAr: "اليوم", read: false },
    { id: "n2", userId: "e1", en: "Your monthly salary statement has been published.", ar: "تم نشر بيان راتبك الشهري.", whenEn: "This month", whenAr: "هذا الشهر", read: false },
    { id: "n3", userId: "admin", en: "Ahmed completed a task.", ar: "أكمل أحمد إحدى المهام.", whenEn: "10:05 AM", whenAr: "10:05 ص", read: false }
  ]
};

window.renderEffectiveNotifications = function () {
  if (!window.current) return;
  const state = window.effectiveNotificationState;
  const items = state.items.filter(n => n.userId === window.current.id);
  const badge = document.getElementById("notificationBadge");
  const unread = items.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.classList.toggle("hidden", unread === 0);
};

document.getElementById("notificationBtn").addEventListener("click", function () {
  const existing = document.querySelector(".notification-panel");
  if (existing) { existing.remove(); return; }
  if (!window.current) return;
  const state = window.effectiveNotificationState;
  const items = state.items.filter(n => n.userId === window.current.id);
  const panel = document.createElement("div");
  panel.className = "notification-panel";
  const title = window.lang === "ar" ? "الإشعارات" : "Notifications";
  panel.innerHTML = "<h3>" + title + "</h3><div class='notification-list'>" +
    (items.length ? items.map(n => "<div class='notification-item " + (!n.read ? "unread" : "") + "'><b>" + (window.lang === "ar" ? n.ar : n.en) + "</b><small>" + (window.lang === "ar" ? n.whenAr : n.whenEn) + "</small></div>").join("") : "<div class='notification-item'>—</div>") +
    "</div>";
  document.querySelector(".app header").appendChild(panel);
  items.forEach(n => n.read = true);
  window.renderEffectiveNotifications();
});