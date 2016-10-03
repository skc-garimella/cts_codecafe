import React, { Component } from 'react';
import CodeList from './code-list';
import SearchBar from './search-bar';
import NavBar from './navbar';
import SidePanel from './side-panel';


export default class App extends Component {

  //this.props.children will have all the child components in a nested scenario.
  //see routes.js for nested components.
  render() {
    return (
      <div>
        <NavBar />
        <SearchBar />
        <div className="row">
          <CodeList />
          <SidePanel />
        </div>
      </div>
    );
  }
}
