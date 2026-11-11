import AppKit

guard CommandLine.arguments.count >= 4 else {
    fputs("Usage: render-guide-social <output.png> <kicker> <title>\n", stderr)
    exit(1)
}

let output = CommandLine.arguments[1]
let kicker = CommandLine.arguments[2]
let title = CommandLine.arguments[3]
let canvas = NSSize(width: 1200, height: 630)
let image = NSImage(size: canvas)

image.lockFocus()
NSColor(calibratedWhite: 0.97, alpha: 1).setFill()
NSRect(origin: .zero, size: canvas).fill()

let card = NSBezierPath(roundedRect: NSRect(x: 54, y: 54, width: 1092, height: 522), xRadius: 34, yRadius: 34)
NSColor.white.setFill()
card.fill()
NSColor(calibratedWhite: 0.9, alpha: 1).setStroke()
card.lineWidth = 2
card.stroke()

let paragraph = NSMutableParagraphStyle()
paragraph.lineBreakMode = .byWordWrapping

(kicker.uppercased() as NSString).draw(in: NSRect(x: 108, y: 480, width: 700, height: 32), withAttributes: [
    .font: NSFont.systemFont(ofSize: 22, weight: .bold),
    .foregroundColor: NSColor(calibratedWhite: 0.46, alpha: 1),
    .kern: 4
])

(title as NSString).draw(in: NSRect(x: 108, y: 178, width: 670, height: 270), withAttributes: [
    .font: NSFont.systemFont(ofSize: 62, weight: .bold),
    .foregroundColor: NSColor(calibratedWhite: 0.07, alpha: 1),
    .paragraphStyle: paragraph,
    .kern: -2.5
])

let logo = NSBezierPath(roundedRect: NSRect(x: 818, y: 202, width: 238, height: 238), xRadius: 52, yRadius: 52)
NSColor(calibratedWhite: 0.07, alpha: 1).setFill()
logo.fill()
("K" as NSString).draw(in: NSRect(x: 870, y: 242, width: 150, height: 154), withAttributes: [
    .font: NSFont.systemFont(ofSize: 138, weight: .bold),
    .foregroundColor: NSColor.white
])

("KESTORA LABS" as NSString).draw(in: NSRect(x: 108, y: 98, width: 400, height: 34), withAttributes: [
    .font: NSFont.systemFont(ofSize: 25, weight: .semibold),
    .foregroundColor: NSColor(calibratedWhite: 0.32, alpha: 1),
    .kern: 1
])

image.unlockFocus()

guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else {
    fputs("Could not render PNG\n", stderr)
    exit(1)
}

try png.write(to: URL(fileURLWithPath: output))
