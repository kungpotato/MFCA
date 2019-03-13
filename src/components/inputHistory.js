import React, { Component } from 'react'
import ReactTable from 'react-table'
import InputMatService from '../services/inputMaterialService'
import 'react-table/react-table.css'

class InputHistory extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {

    }
  }

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) this.getInputData()
  }

  getInputData = async () => {
    const res = await InputMatService.getInpuMat()
    this.setState({ data: res })
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
                        <a href=" ">{row.value}</a>
                      )
                    },
                    {
                      Header: 'Department',
                      accessor: 'department'
                    },
                    {
                      Header: 'Production Date',
                      accessor: 'createdAt'
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
