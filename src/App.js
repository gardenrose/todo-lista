import { Component } from 'react';
import './App.css';

var i = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      list: []
    };
    this.getItemsOnLoad();
  }
  componentDidMount(){
    this.getItemsOnLoad();
  }
  render() {
    return (
      <div>

      <h1 className="naslov">TO DO LIST</h1>
        <div className = "unos">
          <input type="text" value={this.state.input} onChange={e => this.setInput(e.target.value)}></input>
          <button onClick={() => this.add()}>Add</button>
        <div className = "lista">
          <ol>
            {this.state.list.map(item => {
              return (
                <li>
                  {item} &nbsp;
                  <button  onClick={() => this.edit(item)}>Edit</button>
                  <button  onClick={() => this.remove(item)}>Delete</button>
                  <input type = "checkbox"></input>
                </li>
              );
            })}
          </ol>
        </div>
        </div>
      </div>
    );
  }

  setInput(value) {
    this.setState({ input: value });
  }

  add() {
    const item = this.state.input.slice()
    i = i + 1;
    const list = this.state.list;
    if(item !== "") {
      list.push(item);
      this.setState({
        list: list,
        input: ""
      });
    }
    localStorage.setItem("list", list);
  }
    

  remove(item) {
    const list = this.state.list;
    const updatedList = list.filter(x => x !== item);
    this.setState({ list: updatedList });
    localStorage.setItem("list", updatedList);
  }

 edit(item) {
    const list = this.state.list;
    var j;
    var editedValue = prompt("Edit to do item", "");
    for (j = 0; j < list.length; j++) {
      if(list[j] === item) {
        list[j] = editedValue;
      }
    }
    this.setState({ list: list });
    localStorage.setItem("list", list);
  }

getItemsOnLoad() {
  if(localStorage.getItem("input") !== null && localStorage.getItem("list") !== null){
    var inp = localStorage.getItem("input");
    var lst = localStorage.getItem("list").split(",");
    this.setState({ input : inp , list:lst});
  }
}

}

export default App;
