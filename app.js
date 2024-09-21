const inputBox = document.getElementById('todoInputData');
const inputButton = document.getElementById('todoInputButton');
const listContainer = document.getElementsByClassName('todoListContainer')[0];
let task = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];

let saveData = (newData) => {
  task.unshift({ data: newData, status: 'pending' });
  localStorage.setItem('todoList', JSON.stringify(task));
  console.log(task);
};

let deleteData = (todo) => {
  const index = todo.id;
  task.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(task));
  loadData();
};

let updateData = (todo) => {
  const index = todo.id;
  console.log(index);
  if (todo.checked) {
    task[index].status = 'completed';
  } else {
    task[index].status = 'pending';
  }
  localStorage.setItem('todoList', JSON.stringify(task));
  loadData();
};

let loadData = () => {
  let tempDiv = '';
  task.forEach((value, index) => {
    let status = value.status === 'completed' ? 'checked' : '';
    let textDecoration = value.status === 'completed' ? 'line-through' : 'none';
    let newTodoItem = `
        <div class="todoList" data-index=${index}>
            <div class="todoListContent" >
                <input type="checkbox" name="todoListCheckbox" onclick="updateData(this)" id=${index} ${status} >
                <p style="text-decoration:${textDecoration}">${value.data}</p>
            </div>
            <button class="todoListButton" onclick="deleteData(this)" id=${index}>
                <i class="fa fa-times"></i>
            </button>
        </div>
    `;
    tempDiv += newTodoItem;
  });

  listContainer.innerHTML = tempDiv;
};

inputButton.addEventListener('click', () => {
  const inputValue = inputBox.value.trim();
  if (inputValue) {
    inputBox.value = '';
    saveData(inputValue);
    loadData();
  }
});

inputBox.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    const inputValue = inputBox.value.trim();
    if (inputValue) {
      inputBox.value = '';
      saveData(inputValue);
      loadData();
    }
  }
});

loadData();
