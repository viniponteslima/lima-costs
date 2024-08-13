import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

export default function ProjectCard({ id, name, budget, category, handleRemove}) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }
  
  return (
    <div className={styles.projectCard}>
      <h4 title={name}><span>{name}</span></h4>
      <div className={styles.projectCard_infos}>
        <p>
            <span>Orçamento:</span> R${budget}
        </p>
        <p className={styles.categoryText}>
            <span className={`${styles[category.toLowerCase()]}`}></span> {category}
        </p>

      </div>
      <div className={styles.projectCard_actions}>
          <Link to={`/projeto/${id}`}>
            <BsPencil /> Editar
          </Link>
          <button onClick={remove}>
            <BsFillTrashFill /> Excluir
          </button>
      </div>
    </div>
  );
}