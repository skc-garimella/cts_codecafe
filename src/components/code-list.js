
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchCodeSubs, getImages } from '../actions/index';
import { bindActionCreators } from 'redux'
import CodeListItem from './code-list-item';




class CodeList extends Component {

//Invoked once, both on the client and server, immediately before the initial rendering occurs.
  componentWillMount(){
    this.props.getImages();
    for( var i=1; i<=1347; i++ ) {
      this.props.fetchCodeSubs(i);
    }
  }


  render() {
    if(this.props.codeList<=0) {
      return (
        <div className="col-sm-8">
          <br />
          <br />
          <i className="fa fa-5x fa-pulse fa-spinner fa-align-center text-primary col-sm-offset-4"></i>
          <h3 className="text-primary col-sm-offset-4"></h3>
        </div>
      );
    }
    const codeList = this.props.codeList.slice(0,100);
    //const codeList = this.props.codeList;
    return (
      <div className="col-sm-8 p-scroll">
          <ul className="list-group">
            {codeList.map( (codeItem) => {
            return(  <CodeListItem key={codeItem.id} title={codeItem.title}
                source_code={codeItem.source_code}
                language={codeItem.language}
                compiler_status={codeItem.compiler_status}
                icon={this.props.images.find((image) => {return image.language == codeItem.language;}).icon} />
            );
            })}
          </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return(
    { codeList: state.codeList.search,
      images: state.images
    }
  );
}

function mapDispatchToProps(dispatch) {
  return(bindActionCreators({ fetchCodeSubs, getImages }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeList);
