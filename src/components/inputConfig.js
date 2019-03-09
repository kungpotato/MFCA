import React, { Component } from 'react'
// import { connect } from 'react-redux'
import metaDataService from '../services/metaDataService'
import Metadata from './Metadata'

class InputConfig extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false

    this.state = {

    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) this.getData('department')
    if (this._isMounted) this.getData('material')
    if (this._isMounted) this.getData('unit')
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async getData(condition) {
    // fetch data มา แล้ว bind เข้า  html
    let alldata = ''
    if (condition === 'department') {
      alldata = await metaDataService.getDept()
    } else if (condition === 'material') {
      alldata = await metaDataService.getMat()
    } else if (condition === 'unit') {
      alldata = await metaDataService.getUnit()
    }

    if (condition === 'department') {
      if (this._isMounted) {
        this.setState({ DeptData: alldata })
      }
    } else if (condition === 'material') {
      if (this._isMounted) {
        this.setState({ MatData: alldata })
      }
    } else if (condition === 'unit') {
      if (this._isMounted) {
        this.setState({ UnitData: alldata })
        // this.setState((state, props) => {
        //   props.unitData(alldata)
        //   return {
        //     UnitData: alldata
        //   }
        // })
      }
    }
  }

  handleInputChange = (e) => {
    const { target } = e
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const { value } = target
    const { name } = target
    // const id = target.id
    // console.log(id)
    if (target.type !== 'checkbox') {
      this.setState({
        [name]: value
      })
    }
    // console.log(target.checked)
  }

  saveDeptData = async (param) => {
    const res = await metaDataService.saveToCollection('dept', param)
    console.log(res)
  }

  saveMatData = async (param) => {
    const res = await metaDataService.saveToCollection('mat', param)
    console.log(res)
  }

  saveUnitData = async (param) => {
    const res = await metaDataService.saveToCollection('unit', param)
    console.log(res)
  }

  handleSubmit(e) {
    // e.preventDefault();

    const { target } = e
    let item = {}
    const { valueInput } = this.state

    if (target.options.value === 'Department') {
      item = {
        method: 'save',
        data: { department: valueInput }
      }
      this.saveDeptData(item)
    } else if (target.options.value === 'Material') {
      item = {
        method: 'save',
        data: { material: valueInput }
      }
      this.saveMatData(item)
    } else if (target.options.value === 'Unit') {
      item = {
        method: 'save',
        data: { unit: valueInput }
      }
      this.saveUnitData(item)
    }

    target.options.value = ''
    target.valueInput.value = ''
  }

  render() {
    const scopeStyle = {
      pd20: {
        paddingBottom: '20px'
      }
    }

    // console.log(this.props.UnitData)
    const { value } = this.state
    const {
      DeptData, MatData, UnitData
    } = this.state

    return (
      <div className="container">
        <div className="row pt80" style={scopeStyle.pd20}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Config</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-md-12" style={scopeStyle.pd20}>
                      <button type="submit" className="btn btn-primary btn-md p-left">Submit</button>
                    </div>
                    <div className="col-md-2">
                      <span>Select Topics :</span>
                    </div>
                    <div className="col-md-4">
                      <select
                        defaultValue=""
                        value={value}
                        className="form-control"
                        name="options"
                        id="options"
                        onChange={this.handleInputChange}
                      >
                        <option value="" disabled>Please select</option>
                        <option id="opt-dept">Department</option>
                        <option id="opt-material">Material</option>
                        <option id="opt-unit">Unit</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <span htmlFor="valueInput">Value :</span>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        value={value}
                        className="form-control"
                        id="valueInput"
                        name="valueInput"
                        placeholder="Insert value"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4" style={scopeStyle.pd20}>
            <Metadata title="Departments" fac="dept" data={DeptData} />
          </div>
          <div className="col-md-4" style={scopeStyle.pd20}>
            <Metadata title="Materials" fac="mat" data={MatData} />
          </div>
          <div className="col-md-4" style={scopeStyle.pd20}>
            <Metadata title="Units" fac="unit" data={UnitData} />
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   // bind props เข้ากับ state เพื่อจะนำไปส่งผ่าน props ไปยัง component
//   DeptData: state.DeptData,
//   MatData: state.MatData,
//   UnitData: state.UnitData
// })

// const mapDispachToProps = dispach => ({
//   deptData: param => dispach({ type: 'GET_DEPT_DATA', data: param }),
//   matData: param => dispach({ type: 'GET_MAT_DATA', data: param }),
//   unitData: param => dispach({ type: 'GET_UNIT_DATA', data: param })
//   // ,onAgeDown: () => dispach({ type: "AGE_DOWN" })
// })

// export default connect(mapStateToProps, mapDispachToProps)(InputConfig)
export default InputConfig
