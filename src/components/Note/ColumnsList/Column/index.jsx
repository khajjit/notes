import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import CardPreview from '../Card/CardPreview'
// import CardView from '../Card/CardView'

class Column extends Component {
  constructor(props) { // {true && <Card />}
    super(props)
    this.onChangeColumnTitle = this.onChangeColumnTitle.bind(this)
    this.activateInput = this.activateInput.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.state = {
      columnNum: props.columnNum,
      inputColumnTitle: props.column.title || '',
      initColumnTitle: props.column.title,
      columnTitleIsActivated: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.column.title !== this.state.initColumnTitle) {
      this.setState({
        initColumnTitle: nextProps.column.title,
        inputColumnTitle: nextProps.column.title
      })
    }
  }

  onChangeColumnTitle(e) {
    this.setState({ inputColumnTitle: e.target.value })
  }

  activateInput(isActivated) {
    this.setState({
      inputColumnTitle: this.state.initColumnTitle,
      columnTitleIsActivated: isActivated
    })
    !isActivated && this.inputColumnTitle.blur()
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.inputColumnTitle === '') {
        e.preventDefault()
      } else {
        this.activateInput(false)
        const { columnNum, inputColumnTitle } = this.state
        this.props.changeColumnTitle(columnNum, inputColumnTitle)
      }
    }
  }

  render() {
    const { inputColumnTitle, columnTitleIsActivated } = this.state
    const { column } = this.props
    return (
      <div className="note-column">
        <div className="column-title">
          <input
            className={'column-title-input ' + (columnTitleIsActivated ? '' : 'active')}
            onFocus={() => this.activateInput(true)}
            onBlur={() => this.activateInput(false)}
            ref={c => this.inputColumnTitle = c}
            onChange={this.onChangeColumnTitle}
            onKeyPress={this.onKeyPress}
            value={inputColumnTitle}
          />
        </div>
        <div className="column-card-list">
          {column.cards.map((card, i) =>
            <CardPreview key={i} cardNum={i} title={card.title} labels={card.labels} />
          )}
          <div className="create-new-card" onClick={() => this.props.createCard(this.state.columnNum)}>
            + Create new card
          </div>
        </div>
      </div>
    )
  }
}

export default Column
