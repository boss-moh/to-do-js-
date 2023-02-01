
function makeElement(str, isComplete) {
    let element = document.createElement('div')
    element.classList.add('todo-row')

    element.innerHTML = `
    <div >
      ${str}
    </div>
    <div class='icons'>
      <button class='edit-icon' >Edit</button>
      <button class='delete-icon' >Delete</button>
      <button class='done-icon' >done</button>
    </div>
    `;
    if (isComplete) {
        element.classList.add('completee')
    }
    return element
}

function addEvents(element, str) {
    // event of task delete
    let i = element.querySelector('.delete-icon')
    i.addEventListener('click', (e) => {
        delElement(element, str)
    });

    // event of task edit
    i = element.querySelector('.edit-icon');
    i.addEventListener('click', () => {
        document.querySelector('.todo-input.edit').value = element.children[0].innerHTML.trim();
        document.querySelector('.form-group.edit').style.display = 'block';
        document.querySelector('.form-group.add').style.display = 'none';
        delElement(element, str)
    });


    // event of task done
    i = element.querySelector('.done-icon');
    i.addEventListener('click', () => {

        const data = getLocal()
        let isFinsh = data[str].isComplete

        if (isFinsh) {
            element.classList.remove('completee')
        } else {
            element.classList.add('completee')
        }

        data[str].isComplete = !isFinsh
        setLocal(data)
    });
}

function addTask(str, isComplete = false) {

    // store it in local
    const data = getLocal()
    data[str] = ({ str, isComplete })
    setLocal(data)

    // make task
    let element = makeElement(str, isComplete)

    addEvents(element, str)

    // add the task 
    let todo = document.querySelector('.todo-app');
    todo.appendChild(element)

    return true;
}

function setUp() {
    let btnAdd = document.querySelector('button.add');
    let textAdd = document.querySelector('.todo-input.add');
    btnAdd.addEventListener('click', (e) => {
        if (textAdd.value.trim().length >= 0) {
            addTask(textAdd.value.trim());
            textAdd.value = ''
        }
        e.preventDefault();
    })

    let btnEdit = document.querySelector('button.edit');
    let textEdit = document.querySelector('.todo-input.edit');
    let groupEdit = document.querySelector('.form-group.edit');
    groupEdit.style.display = 'none';
    btnEdit.addEventListener('click', (e) => {
        if (textEdit.value.length >= 0) {
            addTask(textEdit.value);
            textEdit.value = ''
            document.querySelector('.form-group.edit').style.display = 'none';
            document.querySelector('.form-group.add').style.display = 'block';
        }

        e.preventDefault();
    })

    loading()

}

// store data in local storage
function setLocal(data) {
    localStorage.setItem('data', JSON.stringify(data))
}

// get data in local storage
function getLocal() {
    return JSON.parse(localStorage.getItem('data')) || {}
}
// loading data from local storage
function loading() {
    const data = getLocal()
    for (let item in data) {
        addTask(data[item]?.str, data[item]?.isComplete)
    }
}
// delete element
function delElement(element, str) {
    const data = getLocal()
    delete data[str];
    setLocal(data)
    element.remove()
}


function main() {
    setUp()
}





main()