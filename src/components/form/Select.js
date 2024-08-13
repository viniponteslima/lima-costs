import styles from "./Select.module.css"

export default function Select({ text, name, options, handleOnChange, value, required }) {
  return (
    <div className={styles.formControl}>
        <label htmlFor={styles.name}>{text}:</label>
        <select
          name={name} 
          id={name} 
          onChange={handleOnChange} 
          value={value || ''}
          required={required ? true : false}
        >
          <option value='' disabled>Selecione uma opção</option>
          {options.map((o) => (
            <option value={o.value} key={o.id}>{o.name}</option>
          ))}
        </select>
    </div>
  );
}