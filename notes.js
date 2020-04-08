const fs = require('fs')
const chalk = require('chalk')

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
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

const removeNote = function(title) {
    const notes = loadNotes()
    const noteToKeep = notes.filter(function(note) {
        return note.title !== title
    })
    if(notes.length > noteToKeep.length) {
        console.log(chalk.green.inverse('note removed!'))
        saveNotes(noteToKeep)
    }
    else{
        console.log(chalk.red.inverse("no notes found!"))
    }
}

const loadNotes = function() {
    try {
        const data = fs.readFileSync('notes.json').toString()
        return JSON.parse(data)
    } catch(e){
        return []
    }
}

const saveNotes = function(notes) {
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote
}