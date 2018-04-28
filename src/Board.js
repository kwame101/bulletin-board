import React, {Component} from 'react'
import Note from './Note'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [
                {
                    id: 0,
                    note: "testing text"
                },
                {
                    id: 1,
                    note: "reactive data"
                }
            ]
        }
        this.getNote = this.getNote.bind(this)
        this.update = this.update.bind(this)
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
            <Note key={i}
                index={i}
                onChange={this.update}>
                {note.note}
            </Note>
        )
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

    render () {
        return (
            <div className="board">
                {this.state.notes.map(this.getNote)}
            </div>
        )
    }
}

export default Board