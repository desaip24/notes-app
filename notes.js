const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.blue.inverse("new note added!"))
    }
    else{
        console.log(chalk.red.inverse("note title already exists!"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > noteToKeep.length) {
        console.log(chalk.green.inverse('note removed!'))
        saveNotes(noteToKeep)
    }
    else{
        console.log(chalk.red.inverse("no notes found!"))
    }
}

const listNontes = () => {
    console.log(chalk.blue.bold("Your Notes:"))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title) 
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.yellow.bold(title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("no note found!"))
    }
    
}

const loadNotes = () => {
    try {
        const data = fs.readFileSync('notes.json').toString()
        return JSON.parse(data)
    } catch(e){
        return []
    }
}

const saveNotes = (notes) => fs.writeFileSync('notes.json',JSON.stringify(notes))


module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNontes,
    readNote : readNote
}