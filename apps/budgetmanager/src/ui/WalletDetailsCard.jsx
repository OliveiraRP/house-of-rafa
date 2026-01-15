import { useEffect, useState, useRef } from "react";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { HorizontalColorPickerComponent } from "@ui/components/ColorPickerComponent";
import { TextRes } from "@ui/utils/TextRes";
import styles from "./WalletDetailsCard.module.css";
import { WalletIcon } from "./WalletIcon";

export function WalletDetailsCard({
  colors,
  selectedColorId,
  onSelect,
  name,
  icon,
  onIconClick,
  onNameChange,
  selectedColorHex,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setIsEditing(false);
    if (e.key === "Escape") setIsEditing(false);
  };
  return (
    <EmptyBoxContainer>
      <div className={styles.cardContainer}>
        <div className={styles.topSection}>
          <WalletIcon
            color={selectedColorHex}
            onIconClick={onIconClick}
            icon={icon}
          />
          <div className={styles.nameColumn}>
            <TextRes text="Name" color="var(--color-text-tertiary)" />
            {isEditing ? (
              <input
                ref={inputRef}
                className={styles.nameInput}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <div onClick={() => setIsEditing(true)}>
                <TextRes
                  text={name}
                  color="var(--color-text-primary)"
                  fontWeight={600}
                  fontSize={18}
                />
              </div>
            )}
          </div>
        </div>
        <HorizontalColorPickerComponent
          colors={colors}
          selectedColorId={selectedColorId}
          onSelect={onSelect}
        />
      </div>
    </EmptyBoxContainer>
  );
}

export function CategoryDetailsCard({
  name,
  icon,
  groupColor,
  onIconClick,
  onNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setIsEditing(false);
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <EmptyBoxContainer>
      <div className={styles.cardContainer}>
        <div className={styles.topSection}>
          <WalletIcon
            color={groupColor}
            onIconClick={onIconClick}
            icon={icon}
          />
          <div className={styles.nameColumn}>
            <TextRes text="Name" color="var(--color-text-tertiary)" />
            {isEditing ? (
              <input
                ref={inputRef}
                className={styles.nameInput}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <div onClick={() => setIsEditing(true)}>
                <TextRes
                  text={name || "New Category"}
                  color="var(--color-text-primary)"
                  fontWeight={600}
                  fontSize={18}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </EmptyBoxContainer>
  );
}
