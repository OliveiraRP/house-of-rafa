export function TextRes({
  text,
  fontSize = 16,
  fontWeight = 400,
  color = "#d4d4d4",
  style,
}) {
  return (
    <span
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        ...style,
      }}
    >
      {text}
    </span>
  );
}
