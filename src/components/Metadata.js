import React, { Component } from 'react'
import metaDataService from '../services/metaDataService'
import Helper from '../helpers/FunctionHelp'
import InputCheckbox from './inputCheckbox'

class Metadata extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fac: ''
    }
    this.ListTag = React.createRef()

    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
  }

  componentDidMount() {

  }

  handleInputChange = () => {
    // const { target } = e
    // const { key } = target
  }

  handleSelectAll(e) {
    // datas.forEach(val => val.id === e.target.value )
    const { data } = this.props

    !Helper.isNull(data) && data.forEach(d => {d.isChecked = e.target.checked}) //eslint-disable-line
    !Helper.isNull(data) && this.setState({alldata: data}) //eslint-disable-line
  }

  handleCheckbox(e) {
    // e.preventDefault()
    const item = {
      method: 'remove',
      data: []
    }
    const target = e.target.elements
    // console.log(e.target.name)
    for (let i = 0; i < target.length; i += 1) {
      target[i].checked && item.data.push({ _id: target[i].value })
    }
    this.saveData(item)
  }

  handleRemove(e) {
    const { target } = e
    this.setState({
      fac: target.name
    })
  }

  handleCheckboxClick(e) {
    const { data } = this.props

    if (!Helper.isNull(data)) {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i]._id === e.target.value) {
          data[i].isChecked = e.target.checked
        }
      }
    }
    !Helper.isNull(data) && this.setState({ alldata: data }) //eslint-disable-line
  }

  async saveData(param) {
    // inset data to collection
    let res = []
    const { fac } = this.state
    if (fac === 'dept') {
      res = await metaDataService.saveToCollection('dept', param)
    } else if (fac === 'mat') {
      res = await metaDataService.saveToCollection('mat', param)
    } else if (fac === 'unit') {
      res = await metaDataService.saveToCollection('unit', param)
    }
    console.log(res)
  }

  render() {
    const { data } = this.props
    const { title, fac } = this.props

    // console.log(checkStatus)
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <h4>{title}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleCheckbox} className="row">
              <div className="col-md-12" style={{ paddingBottom: '10px' }}>
                <button type="submit" style={{ marginLeft: '10px' }} className="btn btn-danger btn-sm" name={fac} onClick={this.handleRemove}>Remove</button>
              </div>
              <div className="col-md-12">
                <input
                  type="checkbox"
                  value="checkedall"
                  onClick={this.handleSelectAll}
                  style={{ margin: '5px' }}
                />
                check/uncheck all
              </div>
              <div className="col-md-12">
                <ul ref={this.ListTag}>
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.department) && (
                  <li style={{ paddingBottom: '15px' }}>
                    <div className="row">
                      <div className="col-lg-2">
                        <InputCheckbox
                          {...val}
                          item={val._id}
                          handleCheckboxClick={this.handleCheckboxClick}
                        />
                      </div>
                      <div className="col-lg-10">{val.department}</div>
                    </div>
                  </li>
                  ))}
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.material) && (
                  <li style={{ paddingBottom: '15px' }}>
                    <div className="row">
                      <div className="col-lg-2">
                        <InputCheckbox
                          {...val}
                          item={val._id}
                          handleCheckboxClick={this.handleCheckboxClick}
                        />
                      </div>
                      <div className="col-lg-10">{val.material}</div>
                    </div>
                  </li>
                  ))}
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.unit) && (
                  <li style={{ paddingBottom: '15px' }}>
                    <div className="row">
                      <div className="col-lg-2">
                        <InputCheckbox
                          {...val}
                          item={val._id}
                          handleCheckboxClick={this.handleCheckboxClick}
                        />
                      </div>
                      <div className="col-lg-10">{val.unit}</div>
                    </div>
                  </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Metadata
