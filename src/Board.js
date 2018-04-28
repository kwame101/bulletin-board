import React, {Component} from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.getNote = this.getNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.addNote = this.addNote.bind(this)
        this.increamentId = this.increamentId.bind(this)
    }

    /**
     * Pouplate data into notes array
     */
    componentWillMount() {
        const self = this
        if(this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(response => response.json())
                .then(json => json[0].split('. ').forEach(
                    sentence => self.addNote(sentence.substring(0, 25))
                ))
        }
    }

    /**
     * Increament an id
     */
    increamentId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    /**
     * Add new note
     * @param {input text to add} text 
     */
    addNote(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.increamentId(),
                    note: text
                }
            ]
        }))
    }

    /**
     * Remove a note
     * @param {index of the note} id 
     */
    remove (id) {
        console.log(id)
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }

    /**
     * Update a note
     * @param {new input text} newText 
     * @param {index of the note} i 
     */
    update(newText, i) {
        //using a callback func to replace prevState with newState
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }))
    }

    /**
  * List all aviable notes
  * 
  * @param {* note we getting} note 
  * @param {* index of that note} i 
  */
    getNote(note, i) {
        //forech note
        return (
            <Note key={note.id}
                index={note.id}
                onChange={this.update}
                onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }

    render () {
        return (
            <div className="board">
                {this.state.notes.map(this.getNote)}
                <button onClick={this.addNote.bind(null, "New Note")}
                id="add"><FaPlus/>
                </button>
            </div>
        )
    }
}

export default Board