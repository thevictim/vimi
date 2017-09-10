import React from 'react'
import $ from 'jquery'
const date = require('../../../tools/date.js')()
const globals = require('../../../tools/globals.js')
const _ = require('underscore')
const ajx = require('../../../tools/ajax.js')()

class Stations_schedule extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.state.stations[0].schedule[name] = this.state.all_restaurants[value]
    this.forceUpdate()
  }

  componentWillMount() {
    ajx.call({
      method: "GET",
      url: '/stations_today',
      success: (stations) => this.setState({stations})
    })

    ajx.call({
      method: "GET",
      url: '/get_restaurants',
      success: (all_restaurants) => this.setState({all_restaurants})
    })
  }

  render() {
    let {stations} = this.state
    return (
      <div>
        <h1>Schedule of stations</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Station</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {_.map(stations, (station, i) => {
              const restaurants = station.schedule
              return (
                <tr key={i}>
                  <td>
                    <p>{station.location}</p>
                  </td>
                  {_.map(restaurants, (restaurant, j) => {
                    return (
                      <td className="col-xs-2" key={j}>
                        <label>{restaurant.name}</label>
                        <select onChange={this.handleChange.bind(this)} name={j}>
                          <option>select</option>
                          {_.map(this.state.all_restaurants, (restaurant, j) => {
                              return (
                                <option value={j} key={j}>{restaurant.name}</option>
                              )
                            })}
                        </select>

                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}
module.exports = Stations_schedule
