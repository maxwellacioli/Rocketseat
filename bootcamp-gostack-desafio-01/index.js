const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.body;

  const projFilter = projects.filter((el) => {
    if(el.id == id) {
      return el;
    }
  });

  req.project = projFilter[0];

  return next();
}

function checkProjectProperties(req, res, next) {
  const { id, title } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Id is required' });
  } else if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  req.id = id;
  req.title = title;

  return next();
}

server.post('/projects/:id/tasks', (req, res) => {

  const { id } = req.params;

  const projFilter = projects.filter((el) => {
    if(el.id == id) {
      return el;
    }
  });

  const project = projFilter[0];

  if(project == undefined) {
    return res.status(400).json({ error: `Project not found with id: ${id}` });
  }

  const { title } = req.body;

  project.tasks.push(title);

  return res.json(project);
});

server.post('/projects', checkProjectProperties, checkProjectExists, (req, res) => {
  
  if(req.project != undefined) {
    return res.status(400).json({ error: 'Already exists a project with same id' });
  }

  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projFilter = projects.filter((el) => {
    if(el.id == id) {
      return el;
    }
  });

  const project = projFilter[0];

  if(project != undefined) {
    return res.json(project);
  }

  return res.status(400).json({ error: `Project not found with id: ${id}` });
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  if(req.project == undefined) {
    return res.status(400).json({ error: `Project not found with id: ${id}` });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const { id } = req.params;

  const index = projects.findIndex( (el) => el.id == id);

  projects[index].title = title;

  return res.json(projects[index]);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  if(req.project != undefined) {
    return res.status(400).json({ error: 'Already exists a project with same id' });
  }

  const { id } = req.params;

  const index = projects.findIndex( (el) => el.id == id);
  
  projects.splice(index, 1);

  return res.send();
});

server.listen(3000);