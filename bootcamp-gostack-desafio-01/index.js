const express = require('express');

const server = express();

server.use(express.json());

let reqCounter = 0;
const projects = [];

function checkProjectIdExists (req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if(!project) {
    return res.status(400).json({ 
      error: `Does not exist a project with id: ${id}`
    });
  }

  req.project = project;

  return next();
}

server.use((req, res, next) => {
  console.log(`Request method: ${req.method} / Request number: ${++reqCounter}`);
  return next();
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {

  const { id, title } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Id is required' });
  } else if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const proj = projects.find(p => p.id == id);

  if(proj) {
    return res.status(400).json({ 
      error: `Already exists a project with id: ${id}` 
    });
  }

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(project);
});

server.post('/projects/:id/tasks', checkProjectIdExists, (req, res) => {
  const { title } = req.body;

  if(!title) {
    return res.status(400).json({error: 'Title is required'});
  }

  req.project.tasks.push(title);

  return res.json(req.project);
});

server.get('/projects/:id', checkProjectIdExists, (req, res) => {
    return res.json(req.project);
});

server.put('/projects/:id', checkProjectIdExists, (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const { id } = req.project;

  const index = projects.findIndex( (el) => el.id == id);

  projects[index].title = title;

  return res.json(projects[index]);
});

server.delete('/projects/:id', checkProjectIdExists, (req, res) => {
  const { id } = req.project;

  const index = projects.findIndex( (el) => el.id == id);
  
  projects.splice(index, 1);

  return res.json();
});

server.listen(3000);