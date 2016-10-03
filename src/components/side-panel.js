import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterCode } from '../actions/index';
import { bindActionCreators } from 'redux'
import _ from 'underscore';

class SidePanel extends Component {

  render() {
    const codeList = this.props.codeList;
    var languages = {};
    var topLang = [];
    var levels = {};
    var topLevel = [];
    var submissions = {};
    var topSubmission = [];
    if(codeList.length>0){
      languages = _.countBy(codeList, function(codeList) { return codeList.language; });
      topLang = (Object.keys(languages).map(function(_) { return `${_} : ${languages[_]}`; }));
      levels = _.countBy(codeList, function(codeList) { return codeList.metadata.level; });
      topLevel = (Object.keys(levels).map(function(_) { return `${_} : ${levels[_]}`; }));
      submissions = _.countBy(codeList, function(codeList) { return codeList.title; });
      topSubmission = (Object.keys(submissions).map(function(_) { return `${_} : ${submissions[_]}`; }));
    }


    return (
      <div className="col-sm-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="panel-title text-center text-primary">
                    <i className="fa fa-filter fa-fw fa-lg pull-left"></i>
                    <b>Filter By Status</b>
                  </h5>
                </div>
                <div className="panel-body">
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"
                      onChange={() => this.filterByValue('Accepted')} />
                        Accepted
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"
                      onChange={() => this.filterByValue('Skipped')} />
                        Skipped
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"
                      onChange={() => this.filterByValue('Memory')} />
                        Memory / Time limit exceeded
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios4" value="option4"
                       onChange={() => this.filterByValue('Runtime')} />
                        Runtime / Compilation error
                      </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionsRadios" id="optionsRadios4" value="option4"
                       onChange={() => this.filterByValue('Wrong answer')} />
                        Wrong answer
                      </label>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title text-center">
                    <i className="fa fa-border fa-fw fa-lg fa-list-ol pull-left"></i>
                    <b>Statical Analysis</b>
                  </h4>
                </div>
                <div className="panel-body">

                  <ul className="list-group">
                    <li className="list-group-item text-primary text-center"><b>TOTAL SUBMISSIONS :</b> {codeList.length}</li>
                  </ul>

                  <ul className="list-group">
                    <li className="list-group-item text-primary text-center"><b>SUBMISSIONS</b></li>
                    {topSubmission.map((l) => { return (
                      <li key={l} className="list-group-item">{l}</li>
                    );})}
                  </ul>

                  <ul className="list-group">
                    <li className="list-group-item text-primary text-center"><b>LEVELS</b></li>
                    {topLevel.map((l) => { return (
                      <li key={l} className="list-group-item">{l}</li>
                    );})}
                  </ul>

                  <ul className="list-group">
                    <li className="list-group-item text-primary text-center"><b>LANGUAGES</b></li>
                    {topLang.map((l) => { return (
                      <li key={l} className="list-group-item">{l}</li>
                    );})}
                  </ul>


                </div>
              </div>
      </div>
    );
  }

  filterByValue(value) {
    console.log(document);
    this.props.filterCode(value);
  }
}

function mapStateToProps(state) {
  return(
    { codeList: state.codeList.search }
  );
}

function mapDispatchToProps(dispatch) {
  return(bindActionCreators({ filterCode }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
