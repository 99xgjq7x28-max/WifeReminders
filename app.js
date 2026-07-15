const copy = {
  en: {
    eyebrow: "Annoying spouse mode",
    title: "Did you do it already?",
    language: "Language",
    happiness: "Spouse happiness",
    randomNag: "Nag me",
    tabToday: "Today",
    tabSitting: "Sitting",
    tabSources: "Calendar",
    taskLabel: "New task",
    taskPlaceholder: "Call dentist, send invoice...",
    add: "Add",
    when: "When",
    timePlaceholder: "14:00",
    tone: "Tone",
    toneSweet: "Sweet nag",
    toneSpicy: "Spicy spouse",
    sittingIntro: "Sitting timer",
    start: "Start",
    pause: "Pause",
    stoodUp: "I stood up",
    sitLimit: "Nudge after minutes",
    calendarTitle: "Calendar",
    calendarCopy: "Ask iPhone for real Calendar access through EventKit.",
    remindersTitle: "Reminders",
    remindersCopy: "Ask iPhone for real Reminders access through EventKit.",
    connect: "Connect",
    enableNotifications: "Enable notifications",
    safariNotice: "Safari mode: in-page alerts work here; system notifications need installed web app support.",
    empty: "No tasks yet. Suspiciously peaceful.",
    nativeOnly: "Open this inside the iPhone wrapper so I can ask Apple properly. Browser me has no Calendar keys.",
    accessRequested: "Permission request sent. Finally, official paperwork.",
    accessDenied: "Apple said no access. I am judging the settings quietly.",
    importedCalendar: "Calendar imported",
    importedReminder: "Reminders imported",
    badTime: "Use 24h time like 14:00. AM/PM has been banished.",
    notificationReady: "Notifications are ready. I will be lovingly unbearable on time.",
    notificationFallback: "Safari will alert here while this page is open. Add it to Home Screen for the best iPhone behavior.",
    duePrefix: "Time is up",
    sittingReset: "Fine. You stood up. I am proud, but do not get dramatic.",
    sittingNag: "You lazy still sitting? Stand up now, superstar.",
    done: "Completed",
    sweetLines: [
      "Honey, have you done {task} already, or are we pretending again?",
      "Tiny question: {task}. Big consequences: my look.",
      "Love of my life, please finish {task} before I start sighing professionally."
    ],
    spicyLines: [
      "Have you done {task} already? I aged three years waiting.",
      "{task}. Now. The couch is not your manager.",
      "Interesting strategy, ignoring {task}. Bold. Wrong, but bold."
    ],
    completedLines: [
      "Look at you, productive and everything. I may smile.",
      "Task done. Domestic peace has increased.",
      "Fine, impressive. Spouse happiness is charging."
    ]
  },
  sk: {
    eyebrow: "Rezim otravnej polovicky",
    title: "Uz si to spravil?",
    language: "Jazyk",
    happiness: "Stastie manzelky",
    randomNag: "Otrav ma",
    tabToday: "Dnes",
    tabSitting: "Sedenie",
    tabSources: "Kalendar",
    taskLabel: "Nova uloha",
    taskPlaceholder: "Zavolat zubarovi, poslat fakturu...",
    add: "Pridat",
    when: "Kedy",
    timePlaceholder: "14:00",
    tone: "Ton",
    toneSweet: "Mile rypnutie",
    toneSpicy: "Ostra polovicka",
    sittingIntro: "Casovac sedenia",
    start: "Start",
    pause: "Pauza",
    stoodUp: "Postavil som sa",
    sitLimit: "Pripomen po minutach",
    calendarTitle: "Kalendar",
    calendarCopy: "iPhone si realne vypita pristup do Kalendara cez EventKit.",
    remindersTitle: "Pripomienky",
    remindersCopy: "iPhone si realne vypita pristup do Pripomienok cez EventKit.",
    connect: "Pripojit",
    enableNotifications: "Zapnut notifikacie",
    safariNotice: "Safari rezim: upozornenia v appke funguju tu; systemove notifikacie potrebuju podporu instalovanej web appky.",
    empty: "Ziadne ulohy. Podozrivo pokojne.",
    nativeOnly: "Otvor toto v iPhone wrapperi, aby som si vedela od Apple realne vypytat pristup. Browser nema kluce od Kalendara.",
    accessRequested: "Ziadost o pristup odoslana. Konecne oficialne papierovacky.",
    accessDenied: "Apple nedovolil pristup. Potichu sudim nastavenia.",
    importedCalendar: "Kalendar nacitany",
    importedReminder: "Pripomienky nacitane",
    badTime: "Pouzi 24h cas, napriklad 14:00. AM/PM sme vyhodili.",
    notificationReady: "Notifikacie su pripravene. Budem otravna presne nacas.",
    notificationFallback: "Safari upozorni priamo tu, ked je stranka otvorena. Pre najlepsie iPhone spravanie ju pridaj na plochu.",
    duePrefix: "Cas vyprsal",
    sittingReset: "Dobre. Postavil si sa. Som hrda, ale nerob z toho dramu.",
    sittingNag: "Ty lenivec, stale sedis? Hned sa postav.",
    done: "Hotovo",
    sweetLines: [
      "Milacik, uz si spravil {task}, alebo sa dnes iba tvarime?",
      "Mala otazka: {task}. Velky nasledok: moj pohlad.",
      "Laska mojho zivota, prosim dokoncit {task}, kym nezacnem profesionalne vzdychat."
    ],
    spicyLines: [
      "Uz si spravil {task}? Cakanim som zostarla o tri roky.",
      "{task}. Teraz. Gauci sefovat nebudes.",
      "Zaujimava taktika ignorovat {task}. Odvazne. Zle, ale odvazne."
    ],
    completedLines: [
      "Pozri sa na seba, produktivny clovek. Mozno sa usmejem.",
      "Uloha hotova. Domaci mier narastol.",
      "Dobre, posobive. Stastie manzelky sa nabija."
    ]
  }
};

const state = {
  lang: localStorage.getItem("spouse-nudge-lang") || "en",
  tasks: JSON.parse(localStorage.getItem("spouse-nudge-tasks") || "[]"),
  sittingSeconds: 0,
  sittingActive: false,
  sittingLimit: Number(localStorage.getItem("spouse-nudge-sit-limit") || 40),
  sittingAlerted: false,
  timer: null,
  notificationTimer: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function t(key) {
  return copy[state.lang][key];
}

function persist() {
  localStorage.setItem("spouse-nudge-tasks", JSON.stringify(state.tasks));
  localStorage.setItem("spouse-nudge-lang", state.lang);
  localStorage.setItem("spouse-nudge-sit-limit", String(state.sittingLimit));
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  $("#sitStart").textContent = state.sittingActive ? t("pause") : t("start");
  $("#language").value = state.lang;
  renderTasks();
  updateMood();
}

function saveTask(text, time, tone) {
  const nowKey = new Date().toISOString().slice(0, 10);
  const task = {
    id: crypto.randomUUID(),
    text,
    time,
    tone,
    done: false,
    source: "app",
    notifiedOn: "",
    createdOn: nowKey
  };
  state.tasks.unshift(task);
  persist();
  renderTasks();
  speakForTask(task);
  scheduleNativeNotification(task, lineFromTask(task));
}

function lineFromTask(task) {
  const list = task.tone === "spicy" ? t("spicyLines") : t("sweetLines");
  return list[Math.floor(Math.random() * list.length)].replace("{task}", task.text);
}

function setSpouseLine(message) {
  $("#spouseLine").textContent = message;
}

function speakForTask(task, sendNotification = false) {
  const message = lineFromTask(task);
  setSpouseLine(message);
  if (sendNotification) notify(message);
}

function notify(message) {
  if (!("Notification" in window)) {
    inAppAlert(message);
    return;
  }
  if (Notification.permission === "granted") {
    new Notification("Spouse Nudge", { body: message });
  } else if (Notification.permission !== "denied") {
    inAppAlert(message);
  }
}

function askNotifications() {
  if (!("Notification" in window)) {
    setSpouseLine(t("notificationFallback"));
    inAppAlert(t("notificationFallback"));
    return;
  }

  const handlePermission = (permission) => {
    if (permission === "granted") {
      setSpouseLine(t("notificationReady"));
    } else {
      setSpouseLine(t("notificationFallback"));
      inAppAlert(t("notificationFallback"));
    }
  };

  const request = Notification.requestPermission(handlePermission);
  if (request?.then) request.then(handlePermission);
}

function inAppAlert(message) {
  setSpouseLine(message);
  const speech = $(".speech-card");
  speech.classList.remove("nudge-now");
  window.requestAnimationFrame(() => speech.classList.add("nudge-now"));
  if ("vibrate" in navigator) navigator.vibrate([160, 80, 160]);
  playNudgeSound();
}

function playNudgeSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.48);
  } catch {
    // Safari may block audio until the user interacts with the page.
  }
}

function isValidTime(value) {
  return /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
}

function checkDueTasks() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  state.tasks.forEach((task) => {
    if (!task.time || task.done || task.notifiedOn === today || task.time !== current) return;
    task.notifiedOn = today;
    const message = `${t("duePrefix")}: ${lineFromTask(task)}`;
    setSpouseLine(message);
    notify(message);
  });
  persist();
  renderTasks();
}

function scheduleNativeNotification(task, message) {
  const bridge = window.webkit?.messageHandlers?.appleAccess;
  if (!bridge || !task.time) return;
  bridge.postMessage({
    action: "scheduleNotification",
    id: task.id,
    title: "Spouse Nudge",
    body: message,
    time: task.time
  });
}

function renderTasks() {
  const tasks = $("#tasks");
  tasks.innerHTML = "";
  if (!state.tasks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = t("empty");
    tasks.append(empty);
    return;
  }

  state.tasks.forEach((task) => {
    const item = document.createElement("article");
    item.className = `task${task.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.ariaLabel = `${t("done")}: ${task.text}`;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = task.text;
    const meta = document.createElement("small");
    meta.textContent = [task.time || "", task.source === "app" ? "App" : task.source].filter(Boolean).join(" / ");
    text.append(title, meta);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.type = "button";
    deleteButton.ariaLabel = `Delete ${task.text}`;
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, text, deleteButton);
    tasks.append(item);
  });
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  if (task.done) {
    const lines = t("completedLines");
    setSpouseLine(lines[Math.floor(Math.random() * lines.length)]);
  } else {
    speakForTask(task);
  }
  persist();
  renderTasks();
  updateMood();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  persist();
  renderTasks();
  updateMood();
}

function updateMood() {
  const total = state.tasks.length;
  const done = state.tasks.filter((task) => task.done).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  $("#happyPercent").textContent = `${percent}%`;
  $("#happyBar").style.width = `${percent}%`;
  const fillHeight = Math.round(93 * (percent / 100));
  $("#spouseFill").setAttribute("height", fillHeight);
  $("#spouseFill").setAttribute("y", 245 - fillHeight);
  $("#spouseMouth").setAttribute("d", moodMouth(percent));
  $("#leftBrow").setAttribute("d", percent < 50 ? "M86 78l19 6" : "M86 82l19-4");
  $("#rightBrow").setAttribute("d", percent < 50 ? "M119 84l19-6" : "M119 78l19 4");
}

function moodMouth(percent) {
  if (percent < 25) return "M94 124c9-12 29-12 38 0";
  if (percent < 60) return "M96 120c10 2 24 2 34 0";
  if (percent < 90) return "M96 118c10 8 24 8 34 0";
  return "M92 114c13 18 37 18 50 0";
}

function formatSittingTime() {
  const minutes = Math.floor(state.sittingSeconds / 60).toString().padStart(2, "0");
  const seconds = (state.sittingSeconds % 60).toString().padStart(2, "0");
  $("#sittingTime").textContent = `${minutes}:${seconds}`;
}

function tickSitting() {
  state.sittingSeconds += 1;
  formatSittingTime();
  if (!state.sittingAlerted && state.sittingSeconds >= state.sittingLimit * 60) {
    state.sittingAlerted = true;
    setSpouseLine(t("sittingNag"));
    notify(t("sittingNag"));
  }
}

function setSitting(active) {
  state.sittingActive = active;
  clearInterval(state.timer);
  if (active) {
    state.timer = setInterval(tickSitting, 1000);
  }
  $("#sitStart").textContent = active ? t("pause") : t("start");
}

function resetSitting() {
  setSitting(false);
  state.sittingSeconds = 0;
  state.sittingAlerted = false;
  formatSittingTime();
  setSpouseLine(t("sittingReset"));
}

function addImported(kind, items = []) {
  const imported = $("#imported");
  const line = document.createElement("div");
  line.className = "imported-item";
  line.textContent = `${kind === "calendar" ? t("importedCalendar") : t("importedReminder")}: ${items.length}`;
  imported.prepend(line);

  items.forEach((item) => {
    saveTask(item.title, item.time || "", kind === "calendar" ? "sweet" : "spicy");
    state.tasks[0].source = kind === "calendar" ? "Calendar" : "Reminders";
  });
  persist();
  renderTasks();
}

function requestAppleAccess(kind) {
  const bridge = window.webkit?.messageHandlers?.appleAccess;
  if (!bridge) {
    setSpouseLine(t("nativeOnly"));
    return;
  }
  bridge.postMessage({ action: kind === "calendar" ? "requestCalendar" : "requestReminders" });
  setSpouseLine(t("accessRequested"));
}

window.spouseNudgeReceiveAppleItems = function spouseNudgeReceiveAppleItems(kind, items) {
  addImported(kind, Array.isArray(items) ? items : []);
};

window.spouseNudgeAppleAccessDenied = function spouseNudgeAppleAccessDenied() {
  setSpouseLine(t("accessDenied"));
};

function randomNag() {
  const openTasks = state.tasks.filter((task) => !task.done);
  if (openTasks.length) {
    speakForTask(openTasks[Math.floor(Math.random() * openTasks.length)]);
    return;
  }
  const lines = t("completedLines");
  setSpouseLine(lines[Math.floor(Math.random() * lines.length)]);
}

function bindEvents() {
  $("#language").addEventListener("change", (event) => {
    state.lang = event.target.value;
    persist();
    applyLanguage();
  });

  $("#taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("#taskText").value.trim();
    const time = $("#taskTime").value.trim();
    if (!text) return;
    if (time && !isValidTime(time)) {
      setSpouseLine(t("badTime"));
      $("#taskTime").focus();
      return;
    }
    saveTask(text, time, $("#taskTone").value);
    event.target.reset();
  });

  $("#taskTime").addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
    event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.toggle("active", item === tab));
      $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === tab.dataset.tab));
    });
  });

  $("#randomNag").addEventListener("click", randomNag);
  $("#enableNotifications").addEventListener("click", askNotifications);
  $("#sitStart").addEventListener("click", () => setSitting(!state.sittingActive));
  $("#standNow").addEventListener("click", resetSitting);
  $("#sitLimit").addEventListener("input", (event) => {
    state.sittingLimit = Number(event.target.value);
    $("#sitLimitValue").textContent = state.sittingLimit;
    state.sittingAlerted = state.sittingSeconds >= state.sittingLimit * 60;
    persist();
  });
  $("#syncCalendar").addEventListener("click", () => requestAppleAccess("calendar"));
  $("#syncReminders").addEventListener("click", () => requestAppleAccess("reminders"));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {
    setSpouseLine(t("notificationFallback"));
  });
}

function init() {
  $("#sitLimit").value = state.sittingLimit;
  $("#sitLimitValue").textContent = state.sittingLimit;
  bindEvents();
  applyLanguage();
  formatSittingTime();
  if (!state.tasks.length) {
    setSpouseLine(state.lang === "sk"
      ? "Pridaj ulohu a ja ta zacnem laskavo sudit."
      : "Add a task and I will start lovingly judging you.");
  } else {
    randomNag();
  }
  clearInterval(state.notificationTimer);
  state.notificationTimer = setInterval(checkDueTasks, 15000);
  checkDueTasks();
  registerServiceWorker();
}

init();
