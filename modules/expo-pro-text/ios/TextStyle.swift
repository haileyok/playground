struct TextStyle: Decodable {
  var color: String? = "black"
  var fontSize: CGFloat? = 12
  var fontStyle: String? = "normal"
  var fontWeight: String? = "normal"
  var letterSpacing: Double?
  var textAlign: String? = "auto"
  var lineHeight: Double?
}
