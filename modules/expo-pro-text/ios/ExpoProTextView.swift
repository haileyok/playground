import Foundation
import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoProTextView: ExpoView {
  let textView: UITextView = UITextView()
  var style: TextStyle? {
    didSet {
      self.setNeedsLayout()
    }
  }
  var disableLongPress: Bool? {
    didSet {
      configureLongPressRecognizer()
    }
  }
  var segments: Array<TextSegment> = [] {
    didSet {
      setText()
    }
  }

  let onTextPress = EventDispatcher()
  let onTextLongPress = EventDispatcher()
  let onTextLayout = EventDispatcher()

  public required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    // Configure default appearance
    textView.scrollsToTop = false
    textView.isEditable = false
    textView.isScrollEnabled = false
    textView.backgroundColor = .clear

    // Add the text view to the root view
    addSubview(textView)

    // Configure the press recognizer
    configurePressRecognizer()
  }

  override func layoutSubviews() {
    // Set the textView's frame on layout
    setSize()
  }

  func configurePressRecognizer() -> Void {
    let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(callOnPress(_:)))
    textView.addGestureRecognizer(tapGestureRecognizer)
  }

  @IBAction func callOnPress(_ sender: UITapGestureRecognizer) -> Void {
    let layoutManager = textView.layoutManager
    let location = sender.location(in: textView)

    let charIndex = layoutManager.characterIndex(for: location, in: textView.textContainer, fractionOfDistanceBetweenInsertionPoints: nil)

    if charIndex < textView.textStorage.length {
      let text = textView.attributedText.string

      segments.forEach { segment in
        let range = text.range(of: segment.text)

        if let lowerBound = range?.lowerBound, let upperBound = range?.upperBound {
          let lowerIndex = text.distance(from: text.startIndex , to: lowerBound)
          let upperIndex = text.distance(from: text.startIndex, to: upperBound)

          print(lowerIndex)
          print(upperIndex)

          if segment.handlePress, charIndex >= lowerIndex, charIndex <= upperIndex {
            onTextPress([
              "index": segment.index
            ])
          } else {
            textView.selectedTextRange = nil
          }
        }
      }
    }
  }

  func configureLongPressRecognizer() -> Void {
    let longPressGestureRecognizer = UILongPressGestureRecognizer(target: self, action: #selector(callOnLongPress(_:)))

    // We need to disable default longpress recognizers here and add the new one
    if disableLongPress == true, let recognizers = textView.gestureRecognizers {
      for recognizer in recognizers {
        if recognizer.isKind(of: UILongPressGestureRecognizer.self) {
          recognizer.isEnabled = false
        }
      }
      textView.addGestureRecognizer(longPressGestureRecognizer)
    }
  }

  @IBAction func callOnLongPress(_ sender: UITapGestureRecognizer) -> Void {
    // Only run the callback on end
    if sender.state == .ended {
      onTextLongPress()
    }
  }

  func setSize() -> Void {
    // Figure out the height of our text and create a CGRect
    let maxWidth = bounds.width
    let sizeThatFits = textView.sizeThatFits(CGSize(width: maxWidth, height: CGFloat(MAXFLOAT)))
    let size = CGSize(width: maxWidth, height: sizeThatFits.height)
    textView.frame.size = size

    onTextLayout([
      "height": sizeThatFits.height,
      "width": maxWidth
    ])
  }

  func setText() -> Void {
    let finalAttributedString = NSMutableAttributedString()

    segments.forEach { segment in
      let attributes: [NSAttributedString.Key:Any] = [
        .font: UIFont.systemFont(ofSize: segment.style?.fontSize ?? 12.0, weight: .regular),
        .foregroundColor: ExpoProTextUtil.hexToUIColor(hex: segment.style?.color)
      ]

      let string = NSAttributedString(string: segment.text, attributes: attributes)

      finalAttributedString.append(string)
    }

    textView.attributedText = finalAttributedString

    self.setNeedsLayout()
  }
}
