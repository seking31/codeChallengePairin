import React, { Component } from 'react';
import './App.css';

const colors = ["orange", "CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon", "black", "orange", "CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon", "black","orange", "CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon", "black"];
var names = ["mandrill","ground hog","chimpanzee","squirrel","panther","warthog","kitten","wolf","monkey","ferret","anteater","coyote","polar bear","zebra","mountain goat","vicuna","horse","dromedary","puma","ape","canary","steer","guinea pig","wombat","opossum","deer","kangaroo","jaguar","seal","okapi","leopard","walrus","gorilla","crocodile","eagle owl","thorny devil","parrot","chameleon","budgerigar","lamb","alpaca","dingo","eland","baboon","mongoose","donkey","cheetah","camel","marmoset","chipmunk","antelope","beaver","silver fox","capybara","lovebird","aardvark","ibex","dog","waterbuck","bald eagle","cat","gila monster","duckbill platypus","buffalo","starfish","pronghorn","mouse","orangutan","shrew","ocelot","weasel","bear","chinchilla","lemur","musk-ox","hartebeest","grizzly bear","dormouse","gemsbok","meerkat","bumble bee","doe","fox","marten","llama","argali","porpoise","bat","finch","chamois","bull","lizard","coati","fawn","hyena","parakeet","yak","pony","woodchuck","peccary","cow","ewe","ox","ermine","skunk","goat","sheep","raccoon","rooster","salamander","hamster","alligator","colt","bison","frog","giraffe","hedgehog","crow","guanaco","jackal","rat","lion","gnu","rhinoceros","puppy","gazelle","bighorn","mule","mink","panda","octopus","aoudad","basilisk","badger","ram","lynx","prairie dog","dugong","elk","snake","porcupine","springbok","burro","mustang","oryx","otter","pig","blue crab","stallion","gopher","impala","bunny","dung beetle","fish","tiger","hog","wildcat","mole","tapir","hare","turtle","addax","quagga","koala","civet","iguana","jerboa","snowy owl","muskrat","rabbit","mare","elephant","hippopotamus","wolverine","boar","cougar","zebu","mynah bird","whale","musk deer","reindeer","highland cow","chicken","armadillo","sloth","newt","moose","toad"];

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
      wrapperCssClass : "wrapper" + theNum.toString()
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
      wrapperCssClass : "wrapper" + theNum.toString()
    })
  }
}

newcolorStyleArray(a){
let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  this.setState({
    newColorsArray : a
  }) 
}

colorStyle(index){
  let { newColorsArray } = this.state;
  return newColorsArray[index];
}

updateBackgroundColor(newItemIndex){
  const newColor = colors[Math.floor(Math.random()*colors.length)];
  let newColorsArray = [...this.state.newColorsArray]
  newColorsArray[newItemIndex] = newColor
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
   <div className={wrapperCssClass}>
      {newArray.map((item, index) => (
        <div className="textBox" key={item + index} style={{background:this.colorStyle(index)}}><h1>{item}</h1></div>
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
       { this.textBox() }  
      </div>
    );
  }
}

export default App;
