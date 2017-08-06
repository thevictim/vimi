const React            = require('react')
const PropTypes        = require('prop-types')
const $ = require('jquery')
const _ = require('underscore')
const date         = require('../../../../tools/date.js')()
const ajx = require('../../../../tools/ajax.js')()

class Payment_Info extends React.Component {

  constructor (props) {
    super(props)
    this.state = _.extend({
      credit_card: {
        number: "",
        cvc: "",
        exp_month: "",
        exp_year: "",
        name: ""
      }
    }, props.product_info)
  }

  credit_card_change (event) {
    let state = this.state
    state["credit_card"][event.target.id] = event.target.value
    this.setState(state)
  }

  pay () {
    ajx.call({
      method: "POST",
      url: this.props.url,
      data: this.state,
      success: (res) => window.location.href = '/',
      show_messages: true,
      show_loading: true
    })
  }

  render () {
    let {number, cvc, type, exp_month, exp_year, name} = this.state.credit_card
    let {autofocus} = this.props
    return (
      <div className="row">
        <div className="col-xs-12 credit-card-div">
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Name on card"
                     type="text"
                     id="name"
                     value={name}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
                     autoFocus={autofocus}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-12">
              <input className="basic-input"
                     placeholder="Card Number"
                     type="text"
                     id="number"
                     value={number}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
          <div className="row">
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="MM"
                     type="text"
                     id="exp_month"
                     value={exp_month}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="YY"
                     type="text"
                     id="exp_year"
                     value={exp_year}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
            <div className ="col-xs-4">
              <input className="basic-input"
                     placeholder="Security Code (CVC)"
                     type="text"
                     id="cvc"
                     value={cvc}
                     onChange={this.credit_card_change.bind(this)}
                     onKeyPress={(t) => {if (t.charCode === 13) this.pay.bind(this)()}}
              />
            </div>
          </div>
        </div>
        <div className='col-xs-12'>
          <button className='btn red-btn pull-right' onClick={this.pay.bind(this)}> Pay </button>
        </div>
      </div>
    )
  }

}

Payment_Info.propTypes = {
  autofocus: PropTypes.bool,
  product_info: PropTypes.object,
  url: PropTypes.string.isRequired
}

Payment_Info.defaultProps = {
  autofocus: true
}

module.exports = Payment_Info
