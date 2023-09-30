const inputElement = document.getElementById('title')
const createBtnt = document.getElementById('create')
const listElement = document.getElementById('list')



const notes = [
    {
    title: 'выучить новую тему js',
    completed: false,
    },
    {
    title: 'сьездить в больницу',
    completed: true,
    },
    
]


function render() {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов!</p>'
    }
    for (let i = 0; i < notes.length; i++) {                    
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
}

render()


createBtnt.onclick = function () {
    if (inputElement.value.length === 0) {
        return
    }
    const newNote = {
        title: inputElement.value,
        completed: false,
    }
    notes.push(newNote)               // добавляет в конец списка
    render()
    inputElement.value = ''
}

listElement.onclick = function (event) {
    // console.log(event.target.dataset.index)
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed

        }   else if (type === 'remove') {
            notes.splice(index, 1)              // 1 - какой по индексу удалить, количество
        }

        render()
    }
}



function getNoteTemplate(note, index) {
    return `              
        <li
            class="list-group-item d-flex justify-content-between align-items-center"
        >
            <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
            <span>
            <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger" data-type="remove" data-index="${index}">&times;</span>
            </span>
        </li>
    `
}