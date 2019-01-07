import React, { Component } from 'react';
import './App.css';
import names from './animal_names.json';

const colors = ["orange", "CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon", "black", "lavender", "darkmagenta", "darkorchid", "indigo", "mediumvioletred", "darkslategray", "lightslategray", "rosybrown", "maroon", "seagreen","teal", "darkcyan", "lightseagreen", "cadetblue", "navy", "blue ", "steelblue", "deepskyblue", "darkblue", "skyblue"];

class App extends Component {
 constructor(props){
   super(props);

   this.state = {
    names,
    showItems: 25,
    wrapperCssClass: 'wrapper5',
    newColorsArray: []
  };
   this.handleShowMoreColumns = this.handleShowMoreColumns.bind(this);
   this.handleShowLessColumns = this.handleShowLessColumns.bind(this);
   this.handleShowMoreBoxes = this.handleShowMoreBoxes.bind(this);
   this.handleShowLessBoxes = this.handleShowLessBoxes.bind(this);
   this.onUpdateItem = this.onUpdateItem.bind(this);
   this.colorStyle = this.colorStyle.bind(this);
   this.newcolorStyleArray = this.newcolorStyleArray.bind(this); 
   this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
   this.checkIfUnique = this.checkIfUnique.bind(this);
 }

 componentDidMount() {
  const rand = Math.round(Math.random() * (3000 - 500)) + 600;
  this.interval = setInterval(() => this.onUpdateItem(), rand);
  this.newcolorStyleArray(colors)
}

componentWillUnmount() {
  clearInterval(this.interval);
}

 handleShowMoreBoxes() {
  let { showItems } = this.state;
  if(showItems === 25){
    alert("too many boxes!")
  }else{
    this.setState({
      showItems : showItems + 1
    })
  }
}

handleShowLessBoxes() {
  let { showItems } = this.state;
    this.setState({
      showItems : showItems - 1
    })
}

handleShowMoreColumns() {
  let { wrapperCssClass } = this.state;
  let theNum = Number(wrapperCssClass.match(/\d+/)) +1;
  if(theNum === 6){
    alert("Number of columns too high");
  } else{
    this.setState({
      wrapperCssClass : `wrapper${theNum.toString()}`
    })
  }
}

handleShowLessColumns() {
  let { wrapperCssClass } = this.state;
  let theNum =  Number(wrapperCssClass.match(/\d+/)) -1;
  if(theNum === 0){
    alert("Number of columns too low");
  } else{
    this.setState({
      wrapperCssClass : `wrapper${theNum.toString()}`
    })
  }
}

newcolorStyleArray(array){
for (var i = array.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * i);
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
  this.setState({
    newColorsArray : array
  }) 
}

colorStyle(index){
  let { newColorsArray } = this.state;
  return newColorsArray[index];
}

checkIfUnique(newItemIndex){
  let newColorsArray = [...this.state.newColorsArray]
  let newColor = colors[Math.floor(Math.random()*colors.length)]
  console.log(newColor,newColorsArray[newItemIndex +1])
  while(newColor === newColorsArray[newItemIndex +1] ||
    newColor === newColorsArray[newItemIndex -1] ||
    newColor === newColorsArray[newItemIndex +5] ||
    newColor === newColorsArray[newItemIndex -5]){
    newColor = colors[Math.floor(Math.random()*colors.length)]
  }
  return newColor;
}

updateBackgroundColor(newItemIndex){
  const newColor = this.checkIfUnique(newItemIndex)
  let newColorsArray = [...this.state.newColorsArray]
  newColorsArray[newItemIndex] =  newColor
  this.setState({
    newColorsArray 
  })
}

onUpdateItem = () => {
  let { showItems, names } = this.state;
  const itemArray = names.slice(0, showItems);
  let newItemIndex = Math.floor(Math.random()*itemArray.length);
  let replacedItem = itemArray[newItemIndex];
  let newItem = names[Math.floor(Math.random()*names.length)];
  this.updateBackgroundColor(newItemIndex)
  this.setState(state => {
     names = names.map((item) => {
      if(item === replacedItem){
        return replacedItem = newItem;
      } else {
        return item;
      }
    });
    return {
      names,
    };
  });
};

textBox(){
let { showItems, names, wrapperCssClass } = this.state;
let newArray = names.slice(0, showItems);
  return (
   <div className={`wrapper ${wrapperCssClass}`}>
      {newArray.map((item, index) => (
        <div key={item + index} style={{background:this.colorStyle(index)}}><h1>{item}</h1></div>
      ))}
  </div>
  );
}

  render() {
    return (
      <div className="App">
        <div className="buttonWrapper">
          <button onClick={this.handleShowMoreBoxes}>
            Show more boxes!
          </button>
          <button onClick={this.handleShowLessBoxes}>
           Show less boxes!
          </button>
          <button onClick={this.handleShowMoreColumns}>
           Show more columns!
          </button>
          <button onClick={this.handleShowLessColumns}>
           Show less columns!
          </button>
        </div>
        <div>{ this.textBox() }  </div>
        
      </div>
    )
  }
}

export default App;
