const copy = {
  en: {
    eyebrow: "Annoying spouse mode",
    title: "Did you do it already?",
    language: "Language",
    happiness: "Spouse happiness",
    totalTasks: "tasks total",
    openTasks: "open",
    doneTasks: "done",
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
    activeFrom: "Active from",
    activeTo: "Active to",
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
    sittingOutside: "You are outside nagging hours. Enjoy the silence while it lasts.",
    sittingNag: "You lazy still sitting? Stand up now, superstar.",
    sittingWaiting: "I am waiting. Press 'I stood up' and prove you have legs.",
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
    totalTasks: "uloh spolu",
    openTasks: "otvorene",
    doneTasks: "hotove",
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
    activeFrom: "Aktivne od",
    activeTo: "Aktivne do",
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
    sittingOutside: "Sme mimo hodin otravovania. Uzi si ticho, kym trva.",
    sittingNag: "Ty lenivec, stale sedis? Hned sa postav.",
    sittingWaiting: "Cakam. Stlac 'Postavil som sa' a dokaz, ze mas nohy.",
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
  sittingAwaitingStand: false,
  sittingOutsideNotified: false,
  sittingStart: localStorage.getItem("spouse-nudge-sit-start") || "07:00",
  sittingEnd: localStorage.getItem("spouse-nudge-sit-end") || "22:00",
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
  localStorage.setItem("spouse-nudge-sit-start", state.sittingStart);
  localStorage.setItem("spouse-nudge-sit-end", state.sittingEnd);
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
  updateSittingWindowLabel();
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
  updateMood();
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
    text.className = "task-copy";
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
  const open = total - done;
  const percent = total ? Math.round((done / total) * 100) : 0;
  $("#happyPercent").textContent = `${percent}%`;
  $("#totalTasks").textContent = String(total);
  $("#openTasks").textContent = String(open);
  $("#doneTasks").textContent = String(done);
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
  if (!isWithinSittingWindow()) {
    if (!state.sittingOutsideNotified) setSpouseLine(t("sittingOutside"));
    state.sittingSeconds = 0;
    state.sittingAlerted = false;
    state.sittingAwaitingStand = false;
    state.sittingOutsideNotified = true;
    formatSittingTime();
    return;
  }
  state.sittingOutsideNotified = false;

  if (state.sittingAwaitingStand) {
    setSpouseLine(t("sittingWaiting"));
    return;
  }

  state.sittingSeconds += 1;
  formatSittingTime();
  if (!state.sittingAlerted && state.sittingSeconds >= state.sittingLimit * 60) {
    state.sittingAlerted = true;
    state.sittingAwaitingStand = true;
    setSpouseLine(t("sittingNag"));
    notify(t("sittingNag"));
  }
}

function setSitting(active) {
  state.sittingActive = active;
  clearInterval(state.timer);
  if (active) {
    if (!isWithinSittingWindow()) {
      state.sittingSeconds = 0;
      formatSittingTime();
      setSpouseLine(t("sittingOutside"));
    }
    state.timer = setInterval(tickSitting, 1000);
  }
  $("#sitStart").textContent = active ? t("pause") : t("start");
}

function resetSitting() {
  state.sittingSeconds = 0;
  state.sittingAlerted = false;
  state.sittingAwaitingStand = false;
  state.sittingOutsideNotified = false;
  formatSittingTime();
  setSpouseLine(t("sittingReset"));
  if (state.sittingActive) {
    clearInterval(state.timer);
    state.timer = setInterval(tickSitting, 1000);
  }
}

function minutesFromTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function isWithinSittingWindow() {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const start = minutesFromTime(state.sittingStart);
  const end = minutesFromTime(state.sittingEnd);
  if (start <= end) return current >= start && current <= end;
  return current >= start || current <= end;
}

function updateSittingWindowLabel() {
  $("#sittingWindowLabel").textContent = `${state.sittingStart} - ${state.sittingEnd}`;
}

function setPickerValue(hourId, minuteId, value) {
  const [hour, minute] = value.split(":");
  $(`#${hourId}`).value = hour;
  $(`#${minuteId}`).value = minute;
}

function pickerTime(hourId, minuteId) {
  return `${$(`#${hourId}`).value}:${$(`#${minuteId}`).value}`;
}

function populateTimePickers() {
  const hourIds = ["taskHour", "sitStartHour", "sitEndHour"];
  const minuteIds = ["taskMinute", "sitStartMinute", "sitEndMinute"];
  hourIds.forEach((id) => {
    const select = $(`#${id}`);
    select.innerHTML = "";
    for (let hour = 0; hour < 24; hour += 1) {
      const option = document.createElement("option");
      option.value = String(hour).padStart(2, "0");
      option.textContent = String(hour).padStart(2, "0");
      select.append(option);
    }
  });
  minuteIds.forEach((id) => {
    const select = $(`#${id}`);
    select.innerHTML = "";
    for (let minute = 0; minute < 60; minute += 5) {
      const option = document.createElement("option");
      option.value = String(minute).padStart(2, "0");
      option.textContent = String(minute).padStart(2, "0");
      select.append(option);
    }
  });
  setPickerValue("taskHour", "taskMinute", "09:00");
  setPickerValue("sitStartHour", "sitStartMinute", state.sittingStart);
  setPickerValue("sitEndHour", "sitEndMinute", state.sittingEnd);
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
    const time = pickerTime("taskHour", "taskMinute");
    if (!text) return;
    saveTask(text, time, $("#taskTone").value);
    $("#taskText").value = "";
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
  ["sitStartHour", "sitStartMinute", "sitEndHour", "sitEndMinute"].forEach((id) => {
    $(`#${id}`).addEventListener("change", () => {
      state.sittingStart = pickerTime("sitStartHour", "sitStartMinute");
      state.sittingEnd = pickerTime("sitEndHour", "sitEndMinute");
      updateSittingWindowLabel();
      persist();
    });
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
  populateTimePickers();
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
