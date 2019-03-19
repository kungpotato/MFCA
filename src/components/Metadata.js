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
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  componentDidMount() {

  }

  handleInputChange = () => {
    // const { target } = e
    // const { key } = target
  }

  handleSortChange = (e) => {
    const { target } = e
    console.log(target)
  }

  handleSelectAll(e) {
    // datas.forEach(val => val.id === e.target.value )
    const { data } = this.props

    !Helper.isNull(data) && data.forEach(d => {d.isChecked = e.target.checked}) //eslint-disable-line
    !Helper.isNull(data) && this.setState({alldata: data}) //eslint-disable-line
  }

  handleCheckbox(e) {
    e.preventDefault()
    const item = {
      method: 'remove',
      data: []
    }
    const target = e.target.elements
    // console.log(e.target.name)
    for (let i = 0; i < target.length; i += 1) {
      if (target[i].value !== 'checkedall') {
        target[i].checked && item.data.push({ _id: target[i].value })
      }
    }
    const response = this.saveData(item)
    response.then(() => {
      window.location.reload()
    })
  }

  handleRemove(e) {
    // e.preventDefault()
    const { target } = e
    this.setState({ fac: target.name })
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
    return res
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
              <div className="col-md-8">
                <input
                  type="checkbox"
                  value="checkedall"
                  onClick={this.handleSelectAll}
                  style={{ margin: '5px' }}
                />
                check/uncheck all
              </div>
              <div className="col-md-4"><div style={{ float: 'right' }}>ลำดับ</div></div>
              <div className="col-md-12">
                <ul ref={this.ListTag}>
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.department) && (
                  <li key={val._id} style={{ paddingBottom: '15px' }}>
                    <InputCheckbox
                      {...val}
                      item={val._id}
                      handleCheckboxClick={this.handleCheckboxClick}
                    />
                    {val.department}
                    <input
                      type="number"
                      name="sort"
                      value={val.sort}
                      onChange={this.handleSortChange}
                      min="1"
                      max="3"
                      style={{ float: 'right' }}
                    />
                  </li>
                  ))}
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.material) && (
                  <li key={val._id} style={{ paddingBottom: '15px' }}>
                    <InputCheckbox
                      {...val}
                      item={val._id}
                      handleCheckboxClick={this.handleCheckboxClick}
                    />
                    {val.material}
                  </li>
                  ))}
                  {!Helper.isNull(data) && data.map(val => !Helper.isNull(val.unit) && (
                  <li key={val._id} style={{ paddingBottom: '15px' }}>
                    <InputCheckbox
                      {...val}
                      item={val._id}
                      handleCheckboxClick={this.handleCheckboxClick}
                    />
                    {val.unit}
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
