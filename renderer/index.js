'use strict'

const { ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
  ipcRenderer.send('delete-todo', e.target.textContent)
}

// create add todo window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window')
})
document.getElementById('goToGmail').addEventListener('click', () => {
  ipcRenderer.send('go-to-gmail')
})
document.getElementById('getInbox').addEventListener('click', () => {
  ipcRenderer.send('get-inbox')
})
document.getElementById('log-in').addEventListener('click', () => {
  event.preventDefault();
  ipcRenderer.send('add-autor')
})
// on receive todos
ipcRenderer.on('todos', (event, todos) => {
  // get the todoList ul
  const todoList = document.getElementById('todoList')

  // create html string
  const todoItems = todos.reduce((html, todo) => {
    html += `<li class="todo-item">${todo}</li>`

    return html
  }, '')

  // set list html to the todo items
  todoList.innerHTML = todoItems

  // add click handlers to delete the clicked todo
  todoList.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })
})



ipcRenderer.on('mails', (event, mails) => {
console.log(mails);
for (let i of mails){
  console.log(i)
}
  const container = document.getElementById('container-emails');
  const mailItems = mails.reduce((htm, mail) => {
    htm += `<li class="email">${mail.message}</li>`
    return htm
  }, '');

  container.innerHTML = mailItems;


})


ipcRenderer.on('inbox', (event, mails) => {
  console.log(mails);
  for (let i of mails){
    console.log(i)
  }
    const container = document.getElementById('container-inbox');
    const mailItems = mails.reduce((htm, mail) => {
      htm += `<li class="email">${mail.message}</li>`
      return htm
    }, '');
  
    container.innerHTML = mailItems;
  
  
  })
  