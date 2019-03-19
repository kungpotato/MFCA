import React, { Component } from 'react'
import ReactTable from 'react-table'
import InputMatService from '../services/inputMaterialService'
import InputMaterialService from '../services/metaDataService'
import 'react-table/react-table.css'

const style = {
  alCenter: {
    textAlign: 'center'
  }
}

class InputHistory extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.getMasterDept()
    this._isMounted && this.getInputData()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getInputData = async () => {
    const res = await InputMatService.getInpuMat()
    this._isMounted && this.setState({ data: res })
  }

  getMasterDept = async () => {
    const res = await InputMaterialService.getDept()
    return res
  }

  render() {
    const { data } = this.state

    return (
      <div className="container">
        <div className="row pt80">
          <div className="col-md-12 ">
            <div className="card">
              <div className="card-header">
                <h4>HIstories</h4>
              </div>
              <div className="card-body">
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: 'Production ID',
                      accessor: 'periodCode',
                      Cell: row => (
                        <a
                          href=" "
                          onClick={(e) => {
                            e.preventDefault()
                          }
                        }
                        >
                          {row.value}
                        </a>
                      )
                    },
                    {
                      Header: 'Department',
                      accessor: 'department.department'
                    },
                    {
                      Header: 'Production Date',
                      accessor: 'createdAt'
                    },
                    {
                      Header: 'Edit',
                      accessor: '_id',
                      Cell: id => (
                        <div style={style.alCenter}>
                          <a
                            href=" "
                            onClick={(e) => {
                              e.preventDefault()
                              alert(id.value)
                            }
                            }
                          >
                            <button type="button" className="btn btn-info">
                              <i className="fas fa-pencil-alt" />
                            </button>
                          </a>
                        </div>
                      )
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default InputHistory
