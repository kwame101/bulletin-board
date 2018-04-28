import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/md/save'

class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    /**
     * Edit a note on the board
     */
    edit() {
        this.setState({
            editing:true
        })
    }

    /**
     * Remove the note from the board
     */
    remove() {

    }

    /**
     * Render a note form for editing
     */
    renderForm() {
        return (
            <div className="note">
                <form>
                    <textarea />
                    <button><FaFloppyO/></button>
                </form>
            </div>
        )
    }

    /**
     * Display notes
     */
    renderDisplay () {
        return (
            <div className="note">
                <p> React Tuts </p>
                <span>
                    <button onClick={this.edit} id="edit"><FaPencil/> </button>
                    <button onClick={this.remove} id="remove"><FaTrash /> </button>
                    </span>
            </div>
        )
    }

    /**
     * Render fucn
     */
    render() {
        if(this.state.editing){
            return this.renderForm()
        }
        else {
            return this.renderDisplay()
        }
    }
}

export default Note