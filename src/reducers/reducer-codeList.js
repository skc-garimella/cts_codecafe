
import React from 'react';
import { FETCH_CODE_SUBMISSIONS, FETCH_CODE_SUBMISSIONS_LAST, FILTER_CODE_LIST, SEARCH_CODE } from '../actions/index';

const INITIAL_STATE = { all: [], search: [] } ;

function saveToDB(data) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if(!indexedDB) {
    console.log("Your Browser does not support IndexedDB");
  }

  const dbName = "submissionBD";
  var db;
  var request = indexedDB.open(dbName, 2);

  request.onerror = function(event) {
    console.log("Error opening DB", event);
  };

  request.onupgradeneeded = function(event) {
    console.log("onUpgrade needed");
    db = event.target.result;
    if(!db.objectStoreNames.contains('submissions')) {
      var objectStore = db.createObjectStore("submissions", { keyPath: "id" });
      objectStore.createIndex("title", "title", { unique: false });
      objectStore.createIndex("compiler_status", "compiler_status", { unique: false });
      objectStore.createIndex("language", "language", { unique: false });
    }
    objectStore.transaction.oncomplete = function(event) {
      var transaction = db.transaction("submissions", "readwrite").objectStore("submissions");
      for (var i in data) {
        transaction.add(data[i]);
      }
    };
  };
  request.onsuccess  = function(event){
    console.log("Success opening DB");
    db = event.target.result;

    var transaction = db.transaction("submissions", "readwrite").objectStore("submissions");
    for (var i in data) {
      transaction.add(data[i]);
    }
  };
}

function filterFromDB(indexName, value, callback) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if(!indexedDB) {
    console.log("Your Browser does not support IndexedDB");
  }

  const dbName = "submissionBD";
  var db;
  var codelist = [];
  var request = indexedDB.open(dbName, 2);
  request.onsuccess = function(event) {
    console.log("Success opening DB");
    db = event.target.result;

    var transaction = db.transaction("submissions").objectStore("submissions");
    var index = transaction.index(indexName);
    var lowerBoundKeyRange = IDBKeyRange.lowerBound(value);
    index.openCursor(lowerBoundKeyRange).onsuccess = function(event) {
      var cursor = event.target.result;
      if(cursor) {
        codelist.push(cursor.value);
        cursor.continue();
      }
      else {
        callback(codelist);
      }
    }
  }
}




export default function PostsReducer(state = INITIAL_STATE, action) {

  switch(action.type){
    case FETCH_CODE_SUBMISSIONS:
      saveToDB(action.payload.data.websites);
      return {
               all: state.all.concat(action.payload.data.websites),
               search: state.search.concat(action.payload.data.websites)
             };

    case FILTER_CODE_LIST:
      const filterResults = state.all.filter( (status) => {
        return ( status.compiler_status.toLowerCase().search(action.payload.toLowerCase()) >= 0 );
      });
      return { ...state, search : filterResults};

    case SEARCH_CODE:
      const searchResults = state.all.filter( (status) => {
        return ( status.language.toLowerCase().search(action.payload.toLowerCase()) >= 0 );
      });
      const searchResults1 = state.all.filter( (status) => {
        return ( status.title.toLowerCase().search(action.payload.toLowerCase()) >= 0 );
      });
      const searchResults2 = state.all.filter( (status) => {
        return ( status.metadata.level.toLowerCase().search(action.payload.toLowerCase()) >= 0 );
      });
      return { ...state, search : searchResults.concat(searchResults1).concat(searchResults2)};

    default:
      return state;
  }
}
