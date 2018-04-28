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
        this.save = this.save.bind(this)
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
     * 
     */
    save(e) {
        e.preventDefault()
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
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
                <form onSubmit={this.save}>
                    <textarea ref={input => {this._newText = input}} />
                    <button type="submit" ><FaFloppyO/></button>
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
                <p> {this.props.children} </p>
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
        return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Note