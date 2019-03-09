import React, { Component } from 'react'
// import '../style/inputMat.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import metaDataService from '../services/metaDataService'
import Helper from '../helpers/FunctionHelp'
import inputMaterialService from '../services/inputMaterialService'

class InputMaterial extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false

    this.state = {
      running: '',
      DisplayTr: [],
      multiple: false,
      deptOptions: [],
      matOptions: [],
      unitOptions: []
    }

    this.inputCostNode = React.createRef()
    this.inputQuantityNode = React.createRef()

    this.displayTr = []
    this.saveTr = []
    this.displayRunning = React.createRef()

    this.displayDataMaterial = []
    this.displayDataUnit = []
    this.displayDataCost = []
    this.displayDataQuantity = []
    this.displayBtnDel = []

    this.handleClick = this.handleClick.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.handleDeptChange = this.handleDeptChange.bind(this)
    this.handleMatChange = this.handleMatChange.bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) this.getData('department')
    if (this._isMounted) this.getData('mat')
    if (this._isMounted) this.getData('unit')
    this.setRunning()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getData = async (condition) => {
    if (condition === 'department') {
      const resDept = await metaDataService.getDept()
      if (this._isMounted) {
        this.setState({
          deptOptions: resDept
        })
      }
    } else if (condition === 'mat') {
      const resMat = await metaDataService.getMat()
      if (this._isMounted) {
        this.setState({
          matOptions: resMat
        })
      }
    } else if (condition === 'unit') {
      const resUnit = await metaDataService.getUnit()
      if (this._isMounted) {
        this.setState({
          unitOptions: resUnit
        })
      }
    }
    // console.log(res)
  }

  setRunning() {
    const random = Helper.Running()
    // console.log(random)
    this.setState({
      running: random
    })
  }

  handleClick = (e) => {
    e.preventDefault()

    const {
      selectMat, selectMatId, selectUnit, selectUnitId
    } = this.state
    const inputCost = this.inputCostNode.current.value
    const inputQuantity = this.inputQuantityNode.current.value

    // tr to save
    const setTrSave = {
      mat: selectMatId,
      qty: inputQuantity,
      unit: selectUnitId,
      cost: inputCost
    }
    // tr to show
    const setTrShow = {
      mat: selectMat,
      qty: inputQuantity,
      unit: selectUnit,
      cost: inputCost
    }
    // append data เข้า state
    this.appendData(setTrShow, this.displayTr)
    this.appendData(setTrSave, this.saveTr)

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

  SaveDataInput = async (json) => {
    const res = await inputMaterialService.saveToCollection(json)
    console.log(res)
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

  handleSubmit() {
    // e.preventDefault();
    // const target = e.target;
    const running = this.displayRunning.current
    const { selectDeptId } = this.state
    const tr = this.saveTr
    // console.log(tr)
    const item = {
      method: 'save',
      data: {
        periodCode: running.innerHTML,
        department: selectDeptId,
        dataTable: tr
      }
    }
    this.SaveDataInput(item)
  }

  handleDeptChange(selected) {
    if (selected.length !== 0) {
      this.setState({
        selectDept: selected[0].department, //eslint-disable-line
        selectDeptId: selected[0]._id,
        selectDeptArr: selected
      })
    }
  }

  render() {
    const { DisplayTr } = this.state
    // console.log(DisplayTr)
    const {
      multiple, deptOptions, matOptions, unitOptions
    } = this.state
    const {
      selectDeptArr, selectMatArr, selectUnitArr
    } = this.state
    const { running } = this.state
    const { inputCostNode, inputQuantityNode } = this

    // const table = {
    //   borderCollapse: 'collapse',
    //   width: 100%
    // }

    // th, td {
    //   text-align: left;
    //   padding: 8px;
    // }

    // tr:nth-child(even){background-color: #f2f2f2}

    // th {
    //   background-color: #28a745;
    //   color: white;
    // }
    return (
      <div className="container">
        <div className="row pt80">
          <div className="col-md-12 ">
            <div className="card">
              <div className="card-header">
                <h4>Input Data</h4>
              </div>
              <div className="card-body">
                <form className="row" onSubmit={this.handleSubmit}>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary btn-md p-right">Submit</button>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group row">
                      <div className="col-md-2">
                        <span className="control-label">Department :</span>
                      </div>
                      <div className="col-md-4">
                        <Typeahead
                          labelKey="department"
                          name="department"
                          // ignoreDiacritics={true}
                          multiple={multiple}
                          options={deptOptions}
                          selected={selectDeptArr}
                          onChange={this.handleDeptChange}
                          placeholder="Choose a department..."
                        />
                      </div>
                      <div className="col-md-6">
                        <b>PeriodID : </b>
                        <span ref={this.displayRunning} value={running}>{running}</span>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-4 ">
                    <div className="form-group">
                      <Typeahead
                        labelKey="material"
                        name="material"
                        // ignoreDiacritics={true}
                        multiple={multiple}
                        options={matOptions}
                        onChange={this.handleMatChange}
                        selected={selectMatArr}
                        placeholder="Choose a material..."
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        placeholder=""
                        ref={inputQuantityNode}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <Typeahead
                        labelKey="unit"
                        name="material"
                        // ignoreDiacritics={true}
                        multiple={multiple}
                        options={unitOptions}
                        onChange={this.handleUnitChange}
                        selected={selectUnitArr}
                        placeholder="Choose a unit..."
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <input type="number" className="form-control" name="cost" placeholder="" ref={inputCostNode} />
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
                        {DisplayTr.map(val => (
                          <tr>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InputMaterial
