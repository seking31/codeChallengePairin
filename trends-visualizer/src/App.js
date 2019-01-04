import React, { Component } from 'react';
import './App.css';
//do eslint

const colors = ["CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon","CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan", "CadetBlue", "silver", "salmon", "CornflowerBlue", "Aquamarine", "gray", "pink", "DarkCyan ", "CadetBlue", "silver", "salmon", "CornflowerBlue"];
var names = ["mandrill","ground hog","chimpanzee","squirrel","panther","warthog","kitten","wolf","monkey","ferret","anteater","coyote","polar bear","zebra","mountain goat","vicuna","horse","dromedary","puma","ape","canary","steer","guinea pig","wombat","opossum","deer","kangaroo","jaguar","seal","okapi","leopard","walrus","gorilla","crocodile","eagle owl","thorny devil","parrot","chameleon","budgerigar","lamb","alpaca","dingo","eland","baboon","mongoose","donkey","cheetah","camel","marmoset","chipmunk","antelope","beaver","silver fox","capybara","lovebird","aardvark","ibex","dog","waterbuck","bald eagle","cat","gila monster","duckbill platypus","buffalo","starfish","pronghorn","mouse","orangutan","shrew","ocelot","weasel","bear","chinchilla","lemur","musk-ox","hartebeest","grizzly bear","dormouse","gemsbok","meerkat","bumble bee","doe","fox","marten","llama","argali","porpoise","bat","finch","chamois","bull","lizard","coati","fawn","hyena","parakeet","yak","pony","woodchuck","peccary","cow","ewe","ox","ermine","skunk","goat","sheep","raccoon","rooster","salamander","hamster","alligator","colt","bison","frog","giraffe","hedgehog","crow","guanaco","jackal","rat","lion","gnu","rhinoceros","puppy","gazelle","bighorn","mule","mink","panda","octopus","aoudad","basilisk","badger","ram","lynx","prairie dog","dugong","elk","snake","porcupine","springbok","burro","mustang","oryx","otter","pig","blue crab","stallion","gopher","impala","bunny","dung beetle","fish","tiger","hog","wildcat","mole","tapir","hare","turtle","addax","quagga","koala","civet","iguana","jerboa","snowy owl","muskrat","rabbit","mare","elephant","hippopotamus","wolverine","boar","cougar","zebu","mynah bird","whale","musk deer","reindeer","highland cow","chicken","armadillo","sloth","newt","moose","toad"];

class App extends Component {
 constructor(props){
   super(props);

   this.state = {
    names,
    showItems: 25
  };
   this.handleShowMore = this.handleShowMore.bind(this);
   this.handleShowLess = this.handleShowLess.bind(this);
   this.onUpdateItem = this.onUpdateItem.bind(this);
   this.colorStyle = this.colorStyle.bind(this);
 }

 componentDidMount() {
  const rand = Math.round(Math.random() * (3000 - 500)) + 500;
  this.interval = setInterval(() => this.onUpdateItem(), rand);
}
componentWillUnmount() {
  clearInterval(this.interval);
}

 handleShowMore() {
  let { showItems } = this.state;
  this.setState({
    showItems: 
    showItems >= colors.length ?
    showItems : showItems + 1
  })
}

handleShowLess() {
  let { showItems, names } = this.state;
  this.setState({
    showItems: 
    showItems >= names.length ?
    showItems : showItems - 1
  })
}
  //randomize
  //https://stackoverflow.com/questions/22467842/assign-random-picked-color-with-javascript
 colorStyle(index){
  return colors[index];
}


onUpdateItem = () => {
  let { showItems, names } = this.state;
  const itemArray = names.slice(0, showItems);
  let replacedItem = itemArray[Math.floor(Math.random()*itemArray.length)];
  let newItem = names[Math.floor(Math.random()*names.length)];
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
  let { showItems, names } = this.state;
  let newArray = names.slice(0, showItems);
  return (
    <div className="wrapper">
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
      <button onClick={this.handleShowMore}>
          Show more!
        </button>
        <button onClick={this.handleShowLess}>
          Show less!
        </button>
      </div>
       { this.textBox() }  
      </div>
    );
  }
}

export default App;
