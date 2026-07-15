# Spouse Nudge iOS bridge

Use `SpouseNudgeBridge.swift` inside a small `WKWebView` iOS wrapper.

Required `Info.plist` keys:

- `NSCalendarsUsageDescription`: Spouse Nudge needs Calendar access to turn events into funny reminders.
- `NSRemindersUsageDescription`: Spouse Nudge needs Reminders access to import your reminders.

The bridge uses the iOS 17 full-access EventKit APIs when available and falls
back to the older request API on older iOS versions. It also requests
`UNUserNotificationCenter` permission when a timed task is scheduled.

Minimal setup:

```swift
let configuration = WKWebViewConfiguration()
let webView = WKWebView(frame: .zero, configuration: configuration)
let bridge = SpouseNudgeBridge(webView: webView)
```

Keep `bridge` strongly referenced by the view controller. The web app calls the native bridge through:

```js
window.webkit.messageHandlers.appleAccess.postMessage(...)
```

The bridge returns imported Apple items to:

```js
window.spouseNudgeReceiveAppleItems(kind, items)
```
