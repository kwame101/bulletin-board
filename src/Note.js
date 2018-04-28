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
        this.randomBetween = this.randomBetween.bind(this)
    }

    /**
     * When component mount display 
     */
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }

    /**
     * Set note text area to focus
     */
    componentDidMount() {
        let textArea 
        if(this.state.editing){
            textArea = this._newText
            textArea.focus()
            textArea.select()
        }
    }

    /**
     * if component state change rerender 
     */
    shouldComponentUpdate(nextProps, nextState) {
        //ensure that something has change in the component
        //either props or state
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
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
     * Random position of each note
     * @param {x cordinated} x 
     * @param {y cordinate} y 
     * @param {size in pixels, rem or deg} s 
     */
    randomBetween(x, y, s){
        return x + Math.ceil(Math.random() * (y-x)) + s
    }

    /**
     * Save an edit note
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
        this.props.onRemove(this.props.index)
    }

    /**
     * Render a note form for editing
     */
    renderForm() {
        return (
            <div className="note" style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input => {this._newText = input}} 
                        defaultValue={this.props.children}/>
                    <button id="save" type="submit" ><FaFloppyO/></button>
                </form>
            </div>
        )
    }

    /**
     * Display notes
     */
    renderDisplay () {
        return (
            <div className="note" style={this.style}>
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