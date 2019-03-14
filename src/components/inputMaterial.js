import React, { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
// import '../style/inputMat.css'
import metaDataService from '../services/metaDataService'
import Helper from '../helpers/FunctionHelp'
import InputDetail from './inputDetail'
import inputMaterialService from '../services/inputMaterialService'

class InputMaterial extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false

    this.state = {
      running: '',
      // DisplayTr: [],
      deptOptions: []
    }

    this.saveTrInput = []
    this.saveTrOutput = []

    this.displayRunning = React.createRef()

    this.handleDeptChange = this.handleDeptChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getDataToSave = this.getDataToSave.bind(this)
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

  SaveDataInput = async (json) => {
    const res = await inputMaterialService.saveToCollection(json)
    return res
  }

  getDataToSave = (data) => {
    data.type === 'input' && this.appendData(data, this.saveTrInput)
    data.type === 'output' && this.appendData(data, this.saveTrOutput)
  }

  appendData = (param, param2) => {
    param2.push(param)
    // console.log(this.state.count)
  }

  handleSubmit(e) {
    e.preventDefault()
    // const target = e.target;
    const running = this.displayRunning.current
    const { selectDeptId } = this.state
    const trInput = this.saveTrInput
    const trOutput = this.saveTrOutput
    // console.log(tr)
    const item = {
      method: 'save',
      data: {
        periodCode: running.innerHTML,
        department: selectDeptId,
        dataTable: trInput,
        dataOutput: trOutput
      }
    }

    const reponse = this.SaveDataInput(item)
    reponse.then((res) => {
      this.setState((state, props) => {
        !Helper.isNull(res) && props.history.push('/input-history')
      })
    })
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
    const { deptOptions, matOptions, unitOptions } = this.state
    const { multiple } = this.state
    const { selectDeptArr } = this.state
    const { running } = this.state

    return (
      <div className="container">
        <div className="row pt80">
          <div className="col-md-12 ">
            <div className="card">
              <div className="card-header">
                <h4>Input And Output Data</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
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
                  </div>
                  <InputDetail
                    name="Input Details"
                    matOptions={matOptions}
                    unitOptions={unitOptions}
                    dataToSave={this.getDataToSave}
                    type="input"
                  />
                  <hr className="pt20" />
                  <InputDetail
                    name="OutPut Details"
                    matOptions={matOptions}
                    unitOptions={unitOptions}
                    dataToSave={this.getDataToSave}
                    type="output"
                  />
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
