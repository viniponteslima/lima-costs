import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

export default function ServiceCard({ id, name, cost, description, handleRemove }) {

	const remove = (e) => {
		e.preventDefault()
		handleRemove(id, cost)
	}

	return (
		<div className={styles.projectCard}>
			<h4 title={name}><span>{name}</span></h4>
				<div className={styles.projectCard_infos}>
					<p><span>Custo total:</span> R${cost}</p>
					<p>{description}</p>
				</div>
				<div className={styles.projectCard_actions}>
					<button onClick={remove}>
						<BsFillTrashFill /> Excluir
					</button>
				</div>
		</div>
  );
}