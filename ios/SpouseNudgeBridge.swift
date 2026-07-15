import EventKit
import UserNotifications
import WebKit

final class SpouseNudgeBridge: NSObject, WKScriptMessageHandler {
    private let eventStore = EKEventStore()
    private weak var webView: WKWebView?

    init(webView: WKWebView) {
        self.webView = webView
        super.init()
        webView.configuration.userContentController.add(self, name: "appleAccess")
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard
            let body = message.body as? [String: Any],
            let action = body["action"] as? String
        else { return }

        switch action {
        case "requestCalendar":
            requestCalendarAccess()
        case "requestReminders":
            requestReminderAccess()
        case "scheduleNotification":
            scheduleNotification(body)
        default:
            break
        }
    }

    private func requestCalendarAccess() {
        let completion: (Bool, Error?) -> Void = { [weak self] granted, _ in
            self?.handleCalendarAccess(granted: granted)
        }

        if #available(iOS 17.0, *) {
            eventStore.requestFullAccessToEvents(completion: completion)
        } else {
            eventStore.requestAccess(to: .event, completion: completion)
        }
    }

    private func requestReminderAccess() {
        let completion: (Bool, Error?) -> Void = { [weak self] granted, _ in
            self?.handleReminderAccess(granted: granted)
        }

        if #available(iOS 17.0, *) {
            eventStore.requestFullAccessToReminders(completion: completion)
        } else {
            eventStore.requestAccess(to: .reminder, completion: completion)
        }
    }

    private func handleCalendarAccess(granted: Bool) {
        guard granted else {
            call("window.spouseNudgeAppleAccessDenied()")
            return
        }

        let start = Calendar.current.startOfDay(for: Date())
        let end = Calendar.current.date(byAdding: .day, value: 1, to: start) ?? Date()
        let predicate = eventStore.predicateForEvents(withStart: start, end: end, calendars: nil)
        let items = eventStore.events(matching: predicate).map { event in
            [
                "title": event.title ?? "Calendar item",
                "time": hhmm(event.startDate)
            ]
        }
        sendItems(kind: "calendar", items: items)
    }

    private func handleReminderAccess(granted: Bool) {
        guard granted else {
            call("window.spouseNudgeAppleAccessDenied()")
            return
        }

        let predicate = eventStore.predicateForIncompleteReminders(withDueDateStarting: nil, ending: nil, calendars: nil)
        eventStore.fetchReminders(matching: predicate) { [weak self] reminders in
            guard let self else { return }
            let items = (reminders ?? []).prefix(20).map { reminder in
                [
                    "title": reminder.title ?? "Reminder",
                    "time": self.hhmm(reminder.dueDateComponents?.date)
                ]
            }
            self.sendItems(kind: "reminders", items: Array(items))
        }
    }

    private func scheduleNotification(_ body: [String: Any]) {
        guard
            let id = body["id"] as? String,
            let title = body["title"] as? String,
            let notificationBody = body["body"] as? String,
            let time = body["time"] as? String
        else { return }

        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
            guard granted else { return }
            let parts = time.split(separator: ":").compactMap { Int($0) }
            guard parts.count == 2 else { return }

            var date = Calendar.current.dateComponents([.year, .month, .day], from: Date())
            date.hour = parts[0]
            date.minute = parts[1]
            if let fireDate = Calendar.current.date(from: date), fireDate <= Date() {
                date = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute],
                                                       from: Calendar.current.date(byAdding: .day, value: 1, to: fireDate) ?? fireDate)
            }

            let content = UNMutableNotificationContent()
            content.title = title
            content.body = notificationBody
            content.sound = .default

            let trigger = UNCalendarNotificationTrigger(dateMatching: date, repeats: false)
            let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
            UNUserNotificationCenter.current().add(request)
        }
    }

    private func sendItems(kind: String, items: [[String: String]]) {
        guard
            let data = try? JSONSerialization.data(withJSONObject: items),
            let json = String(data: data, encoding: .utf8)
        else { return }
        call("window.spouseNudgeReceiveAppleItems('\(kind)', \(json))")
    }

    private func call(_ javascript: String) {
        DispatchQueue.main.async { [weak self] in
            self?.webView?.evaluateJavaScript(javascript)
        }
    }

    private func hhmm(_ date: Date?) -> String {
        guard let date else { return "" }
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_GB")
        formatter.dateFormat = "HH:mm"
        return formatter.string(from: date)
    }
}
