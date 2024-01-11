public class ExpoProTextUtil {
  public static func hexToUIColor(hex: String?) -> UIColor {
    let r, g, b, a: CGFloat

    if let hex, hex.hasPrefix("#") {
      print("got here")
      let start = hex.index(hex.startIndex, offsetBy: 1)
      let hexColor = String(hex[start...])

      if hexColor.count == 8 {
        print("got here2")
        let scanner = Scanner(string: hexColor)
        var hexNumber: UInt64 = 0

        if scanner.scanHexInt64(&hexNumber) {
          print("got here3")
          r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
          g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
          b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
          a = CGFloat(hexNumber & 0x000000ff) / 255

          return UIColor(red: r, green: g, blue: b, alpha: a)
        }
      }
    }

    return UIColor.black
  }
}
