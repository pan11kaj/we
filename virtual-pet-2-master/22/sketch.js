var database ,dog;
var position;
var addfood,feed;
var foodobject;
var foodStock;
var hungry;
var gameState = hungry ,readstate;
var currenttime;
function preload()

{
  dogimg = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/bd.png");
  wcroom = loadImage("images/Wc.png");
  garden= loadImage("images/Garden.png");
  saddog = loadImage("images/Lazy.png")
  living = loadImage("images/living.png")
  dogsong = loadSound("dog.mp3");
}

function setup() {
	createCanvas(600, 500);
  database = firebase.database();
  currenttime = hour();
  foodobject=new Food();
  
  dog = createSprite(520,250,10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;
 
  var foodstock = database.ref('Food');
  foodstock.on("value", readPosition);
  feed = createButton("feed dog");
  feed.position(400,50);
  feed.mousePressed(FeedDog);
  addfood = createButton("add food");
  addfood.position(500,50);
  addfood.mousePressed(addFood);
  gameState= database.ref('gameState')
  gameState.on("value",function(data){
    gameState = data.val()
  })
} 

function draw(){
 background(46,139,87);
//  dogsong.play();

 if(currenttime === 16||currenttime === 19 ||currenttime===15 || currenttime === 20|| currenttime === 9){
  
  
  gameState = hungry;
}else{
gameState != hungry; 
}
 if(gameState !== hungry){
   feed.hide()
   dog.visible = false;
 }else{
   feed.show();
   dog.visible = true;
 }
 if(currenttime>20 && currenttime<=8){
   background(bedroom);
   foodobject.hide();
 }
 if(currenttime>=16 && currenttime<=18){
   background(garden);
   foodobject.hide();
 
 }
 if(currenttime>12 && currenttime<16){
  background(living);
  foodobject.hide();
}
if(currenttime===8){
  background(wcroom);
  foodobject.hide();
}

 console.log(currenttime);
 drawSprites();
 foodobject.display();
 
 fill(255,255,254);
 textSize(15);

}
function readPosition(data){
  position = data.val();
  foodobject.Updatefood(position)
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function  addFood(){
position++
database.ref('/').update({
  Food:position
})
}
function FeedDog(){

dog.addImage(dogimg2);
foodobject.Updatefood(foodobject.getFoodStock()-1);
 database.ref('/').update({
   Food:foodobject.getFoodStock(),FeedTime:hour()
   
 })
}
