"use client";

import React from "react";
import styles from "./ToogleSwitch.module.scss";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <div className={styles.switchWrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
