import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NovoProjeto.module.css'

export default function NovoProjeto() {

  const navigate = useNavigate()

  function createPost(project) {
    
    // Inicializar custos e serviços
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/projetos', { state: { message: 'Projeto criado com sucesso!' } })
      })
      .catch(err => console.log(err))

  }

  return (
    <section className={styles.novoProjeto_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </section>
  );
}