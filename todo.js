const local_storage = "my_todo_list_storage";

console.log(local_storage);

const convertStringToObj = (str) => JSON.parse(str) || [];
const convertObjToString = (obj) => JSON.stringify(obj) || "";
const getTodos = () => convertStringToObj( localStorage.getItem(local_storage));
const addTodo = (todo) => localStorage.setItem(local_storage, convertObjToString([...getTodos(), todo]));
const deleteTodo = (todo) => localStorage.setItem(local_storage,
    convertObjToString(getTodos().filter(_todo => _todo !== todo)));
const buildTodo = (todo) => {
    const element = document.createElement("li");
    element.classList.add("list-group-item");
    element.innerText = todo;
    return element;

}
const appendElementToDom = (element) => 
      document.getElementById("todo-list-container").appendChild(element);

const clearTodoList = ()  => document.getElementById("todo-list-container").innerHTML = "" ;
const clearInput = () => document.getElementById("new-todo-input").value = "";

const displayTodo = () => {
    clearInput();
    clearTodoList();
    if (getTodos()) {
        getTodos().forEach(_todo => appendElementToDom(buildTodo(_todo))) ;
    }
  
    initClickListner();
}

const initClickListner = () => {
    Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
        _item.addEventListener("click", ($event) => {
            const todo = $event.target.innerText;
            if(window.confirm ("are you sure to delete ? " + todo , )) {
                deleteTodo(todo);
                displayTodo();
            }
        }) 

    });
}

document.addEventListener("DOMContentLoaded", () => displayTodo() ) ;

document.getElementById("submit-new-todo-btn").addEventListener("click" , ($event) => {
   const newTodoInput = document.getElementById("new-todo-input")
   if  (newTodoInput) {
       addTodo(newTodoInput.value.trim());
       displayTodo();
   }
});

document.getElementById("reset-storage-btn").addEventListener('click' , ($event) => {
    localStorage.removeItem(local_storage);
    displayTodo();
});

