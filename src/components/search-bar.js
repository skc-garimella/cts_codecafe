import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCode } from '../actions/index';



class SearchBar extends Component {

  constructor(props){
    super(props);

    this.state = { term: '' };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event){
      console.log(event.target.value);
      this.props.searchCode(event.target.value);
      this.setState({term: event.target.value});

      //this.searchCourse(this.state.term);
    }


  onFormSubmit(event){
    event.preventDefault();

    this.props.searchCode(this.state.term);
    //clear the search input after this.
    this.setState({ term: '' });
  }


  render(){
    return(
      <div className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <form role="form" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <input type="search" className="form-control" placeholder="Search (by title, level or language)" onChange={this.onInputChange} />
                    <span className="input-group-btn">
                      <a className="btn btn-primary" type="submit"><span className="glyphicon glyphicon-search"></span></a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ searchCode: searchCode }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);
