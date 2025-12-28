import styles from "./ColorPickerComponent.module.css";

export function HorizontalColorPickerComponent({
  colors,
  selectedColorId,
  onSelect,
}) {
  return (
    <div className={styles.container}>
      {colors.map((color) => (
        <div
          key={color.id}
          className={`${styles.colorCircle} ${
            selectedColorId === color.id ? styles.selected : ""
          }`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onSelect(color.id)}
        />
      ))}
    </div>
  );
}
