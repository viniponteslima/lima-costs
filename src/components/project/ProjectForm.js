import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';
import styles from './ProjectForm.module.css'

import { useEffect, useState } from 'react';

export default function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || [])

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
  })

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value})
  }

  function handleCategory(e) {
    setProject({...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    }})
  }


  return (
    <form onSubmit={submit} className={styles.form}>
        <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            required
        />
        <Input 
            type="number" 
            text="Orçamento do Projeto" 
            name="budget" 
            placeholder="Insira o Orçamento do projeto" 
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
            required
        />
        <Select 
            name="categoryId"
            text="Selecione a categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
        />
        <Submit text={btnText} />
    </form>
  );
}