var React = require('react')
var $ = require('jquery')
var ProfileInfo = require('./profileInfo.jsx')
var Menu = require('./menu.jsx')
var SearchPage = require('./searchPage.jsx')
var MyMealsPage = require('./myMealsPage.jsx')

var Root = React.createClass({

  getInitialState: function () {
    return {
      render: false,
      name: null,
      picture: null,
      page: 'search'
    }
  },

  componentWillMount: function () {
    $.ajax({
      method: 'GET',
      url: '/getInitialData',
      success: (data) => {
        this.setState({
          render: true,
          name: data.name,
          picture: data.picture
        })
      }
    })
  },

  changePage: function (pg) {
  	this.setState({page: pg})
  },

  router: function () {
  	switch(this.state.page) {
  		case 'search':
  			return <SearchPage logged={this.state.name}/>
  			break
  		case 'myMeals':
  			return <MyMealsPage logged={this.state.name}/>
  			break
  		default:
  			return <SearchPage logged={this.state.name}/> 
  	}
  },

  render: function () {
    return (
      <div className='container'>
        {this.state.render
           ?
           <div className='row'>
             <div id='menu-bar' className='col-md-3'>
               <div id='menu'>
                 {this.state.name
                  	&&
	                    <ProfileInfo 
	                    	name={this.state.name} 
	                    	picture={this.state.picture}
	                    />
                	}
                	<Menu 
                		logged={this.state.name}
                		changePage={this.changePage}
                    currentPage={this.state.page}
                	/>
               </div>
             </div>
             <div id="page" className='col-md-9'>
             	<div className='container-fluid'>
             	  {this.router()}
             	 </div>
             </div>
           </div>
           :
           <div>
             Spinning
           </div>
        }
      </div>
    )
  }

})

module.exports = Root