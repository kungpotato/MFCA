import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import Helper from '../helpers/FunctionHelp'
import '../App.css'

class InputDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multiple: false
    }

    this.inputCostNode = React.createRef()
    this.inputQuantityNode = React.createRef()

    this.displayTr = []

    this.displayDataMaterial = []
    this.displayDataUnit = []
    this.displayDataCost = []
    this.displayDataQuantity = []
    this.displayBtnDel = []

    this.handleDel = this.handleDel.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMatChange = this.handleMatChange.bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
  }

  handleClick = (e) => {
    e.preventDefault()

    const {
      selectMat, selectMatId, selectUnit, selectUnitId
    } = this.state
    const inputCost = this.inputCostNode.current.value
    const inputQuantity = this.inputQuantityNode.current.value
    const { type } = this.props
    // tr to save
    const setTrSave = {
      type,
      table: {
        mat: selectMatId,
        qty: inputQuantity,
        unit: selectUnitId,
        cost: inputCost
      }
    }
    // tr to show
    const setTrShow = {
      mat: selectMat,
      qty: inputQuantity,
      unit: selectUnit,
      cost: inputCost
    }

    const { dataToSave } = this.props
    dataToSave && dataToSave(setTrSave)

    // append data เข้า state
    this.appendData(setTrShow, this.displayTr)

    this.setState({
      DisplayTr: this.displayTr,
      selectMatId: [],
      selectUnitId: [],
      selectMatArr: [],
      selectUnitArr: []
    })

    this.inputCostNode.current.value = ''
    this.inputQuantityNode.current.value = ''
  }

  handleUnitChange = (selected) => {
    // console.log(selected)
    if (selected.length !== 0) {
      this.setState({
        selectUnit: selected[0].unit, //eslint-disable-line
        selectUnitId: selected[0]._id,
        selectUnitArr: selected
      })
    }
  }

  handleMatChange = (selected) => {
    // console.log(selected)
    if (selected.length !== 0) {
      this.setState({
        selectMat: selected[0].material, //eslint-disable-line
        selectMatId: selected[0]._id,
        selectMatArr: selected
      })
    }
  }

  appendData = (param, param2) => {
    param2.push(param)
    // console.log(this.state.count)
  }

  handleDel(val) {
    const { displayTr } = this
    // console.log(id, displayTr)
    for (let i = 0; i < displayTr.length; i += 1) {
      if (!Helper.isNull(displayTr[i])) {
        if (displayTr[i] === val) {
          delete this.displayTr[i]
          this.setState({
            DisplayTr: this.displayTr
          })
        }
      }
    }
  }

  render() {
    const { name } = this.props
    const { DisplayTr } = this.state
    const { multiple } = this.state
    const { matOptions, unitOptions } = this.props
    const { selectMatArr, selectUnitArr } = this.state
    return (
      <div className="row">
        <div className="col-md-12"><h5>{name}</h5></div>
        <div className="col-md-4 ">
          <div className="form-group">
            {matOptions && (
              <Typeahead
                labelKey="material"
                name="material"
                id="material"
                multiple={multiple}
                options={matOptions}
                onChange={this.handleMatChange}
                selected={selectMatArr}
                placeholder="Choose a material..."
              />
            )}
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="quantity"
              placeholder=""
              ref={this.inputQuantityNode}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            {unitOptions && (
              <Typeahead
                labelKey="unit"
                name="unit"
                id="unit"
                multiple={multiple}
                options={unitOptions}
                onChange={this.handleUnitChange}
                selected={selectUnitArr}
                placeholder="Choose a unit..."
              />
            )}
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <input type="number" className="form-control" name="cost" placeholder="" ref={this.inputCostNode} />
          </div>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary btn-sm p-right" onClick={this.handleClick}>
            <i className="fas fa-plus" />
            Add
          </button>
        </div>
        <div className="col-md-12">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Cost</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!Helper.isNull(DisplayTr) && DisplayTr.map(val => (
                <tr key={val.mat}>
                  <td>{val.mat}</td>
                  <td>{val.qty}</td>
                  <td>{val.unit}</td>
                  <td>{val.cost}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      name="row"
                      onClick={() => this.handleDel(val)}
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default InputDetail
