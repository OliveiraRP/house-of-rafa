import styles from "./TabBarComponent.module.css";
import { IconRes } from "../../utils/IconRes";

export function TabBarComponent({ tabs, activeTabId, onTabChange }) {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <div
            key={tab.id}
            className={`${styles.tabItem} ${isActive ? styles.active : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <IconRes
              icon={tab.icon}
              size={24}
              color={
                isActive
                  ? "var(--color-accent-primary)"
                  : "var(--color-text-secondary)"
              }
            />
            <span className={styles.label}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}
