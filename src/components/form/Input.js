import styles from "./Input.module.css"

export default function Input({ type, text, name, placeholder, handleOnChange, value, required }) {
  return (
    <div className={styles.formControl}>
        <label htmlFor={styles.name}>{text}:</label>
        <input 
          type={type} 
          name={name} 
          id={name} 
          placeholder={placeholder} 
          onChange={handleOnChange} 
          value={value}
          required={required ? true : false}
        />
    </div>
  );
}