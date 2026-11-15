import AppKit

guard CommandLine.arguments.count == 8 else {
    fputs("Usage: render-app-guide-social <output.png> <app> <kicker> <title> <screenshot.png> <background-hex> <accent-hex>\n", stderr)
    exit(1)
}

func color(_ hex: String) -> NSColor {
    let cleaned = hex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
    guard cleaned.count == 6, let value = Int(cleaned, radix: 16) else { return .white }
    return NSColor(
        calibratedRed: CGFloat((value >> 16) & 0xff) / 255,
        green: CGFloat((value >> 8) & 0xff) / 255,
        blue: CGFloat(value & 0xff) / 255,
        alpha: 1
    )
}

let output = CommandLine.arguments[1]
let app = CommandLine.arguments[2]
let kicker = CommandLine.arguments[3]
let title = CommandLine.arguments[4]
let screenshotPath = CommandLine.arguments[5]
let background = color(CommandLine.arguments[6])
let accent = color(CommandLine.arguments[7])
let ink = color("171315")
let canvas = NSSize(width: 1200, height: 630)
let image = NSImage(size: canvas)

image.lockFocus()
background.setFill()
NSRect(origin: .zero, size: canvas).fill()

let accentBar = NSBezierPath(roundedRect: NSRect(x: 62, y: 548, width: 112, height: 12), xRadius: 6, yRadius: 6)
accent.setFill()
accentBar.fill()

let paragraph = NSMutableParagraphStyle()
paragraph.lineBreakMode = .byWordWrapping

(kicker.uppercased() as NSString).draw(in: NSRect(x: 62, y: 492, width: 670, height: 34), withAttributes: [
    .font: NSFont.systemFont(ofSize: 21, weight: .bold),
    .foregroundColor: accent,
    .kern: 3.2
])

(title as NSString).draw(in: NSRect(x: 62, y: 185, width: 675, height: 286), withAttributes: [
    .font: NSFont.systemFont(ofSize: 62, weight: .bold),
    .foregroundColor: ink,
    .paragraphStyle: paragraph,
    .kern: -2.4
])

(app as NSString).draw(in: NSRect(x: 62, y: 82, width: 360, height: 40), withAttributes: [
    .font: NSFont.systemFont(ofSize: 27, weight: .bold),
    .foregroundColor: ink,
    .kern: 1
])

("KESTORA LABS" as NSString).draw(in: NSRect(x: 62, y: 45, width: 360, height: 28), withAttributes: [
    .font: NSFont.systemFont(ofSize: 18, weight: .semibold),
    .foregroundColor: color("77716d"),
    .kern: 2.2
])

let deviceRect = NSRect(x: 850, y: 28, width: 274, height: 594)
let shadow = NSShadow()
shadow.shadowColor = NSColor.black.withAlphaComponent(0.18)
shadow.shadowBlurRadius = 26
shadow.shadowOffset = NSSize(width: 0, height: -8)
shadow.set()
let device = NSBezierPath(roundedRect: deviceRect, xRadius: 42, yRadius: 42)
ink.setFill()
device.fill()
NSGraphicsContext.current?.saveGraphicsState()
NSShadow().set()

let screenRect = deviceRect.insetBy(dx: 8, dy: 8)
let screen = NSBezierPath(roundedRect: screenRect, xRadius: 35, yRadius: 35)
screen.addClip()
if let screenshot = NSImage(contentsOfFile: screenshotPath) {
    screenshot.draw(in: screenRect, from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}
NSGraphicsContext.current?.restoreGraphicsState()

image.unlockFocus()

guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else {
    fputs("Could not render PNG\n", stderr)
    exit(1)
}

try png.write(to: URL(fileURLWithPath: output))
