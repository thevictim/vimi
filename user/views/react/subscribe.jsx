import React from 'react'
import Payment from './payment/payment.jsx'
import globals from '../../../tools/globals.js'
const ajx = require('../../../tools/ajax.js')()

class Subscribe extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      orders: []
    }
  }
  
  componentWillMount () {
    ajx.call({
      method: "GET",
      url: "/get_user_orders",
      success: (orders) => this.setState({orders})
    })
  }
  
  change_step (step) {
    this.setState({step})
  }

  render() {
    let {step, orders} = this.state
    let user = window.store.get('user')
    return (
      <div className="banner subscribe-banner">
        <div className="container">
          <div className="row">
            {step == 0 && 
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center join-our-community">
                <h1>Your {globals.trial_days} days trial is over </h1>
                {orders.length <= 2 && <h3>But our 9.99/month subscription is really convenient!</h3>}
                {orders.length > 2 && <h3 className="alert alert-success"> This month you ordered {orders.length} times and saved an average of ${5*orders.length} on delivery fees </h3> }
                  <button className="btn red-btn margin-top-10" onClick={() => this.change_step.bind(this)(1)}>
                    Tell me more
                  </button>
              </div>
            }
            {step == 1 &&
              <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
                <h1>$9.99/Month</h1>
                <h2>No more delivery fees. Unsubscribe with one click</h2>
                <Payment url="/subscribe" btn_text="Subscribe" last_4_digits={user.last_4_digits}/>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

}

module.exports = Subscribe
