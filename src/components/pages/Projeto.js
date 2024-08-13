import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm';
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from '../service/ServiceCard';

export default function Projeto() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))
        }, [id])

  function editPost(project) {
    setMessage("")
    if (project.budget < project.cost) {
      setMessage("O custo não pode ser maior que o orçamento.")
      setType("error")
      return false
    }


    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage("Projeto atualizado.")
        setType("success")
      })
      .catch((err) => console.log(err))

  }

  function createService(project) {
    setMessage("")

    const lastService = project.services[project.services.length -1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado.")
      setType("error")
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage("Projeto atualizado.")
        setType("success")
        toggleServiceForm()
      })
      .catch((err) => console.log(err))
  }

  function removeService(id, cost) {
    setMessage("")
    
    const servicesUpdate = project.services.filter((service) => service.id !== id)

    const projectUpdated = project

    projectUpdated.services = servicesUpdate

    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated),
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(projectUpdated)
        setServices(servicesUpdate)
        setType("success")
        setMessage('Serviço removido.')
      })
      .catch((err) => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

    
  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
          {message && (
            <Message type={type} msg={message} />
          )}
            <div className={styles.projectDetails_Container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm 
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
              </div>
              )}
            </div>
            <div className={styles.serviceForm_Container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.projectInfo}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length === 0 ? (
                <p>Não há serviõs cadastrados</p>
              ) : (
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}