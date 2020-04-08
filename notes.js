const fs = require('fs')

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
        console.log("new note added!")
    }
    else{
        console.log("note title already exists!")
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
    addNote : addNote
}