var srcIs = new Array(); //What is the current source.
var photosCount = new Array();// This is the array that keeps all the photos.
var count =0;//This is the count for the position of the photos for the main photo and the photo strip.
var xx = 0;//keep it you will need it.
var absCount =0;//This is an alternative way that you can check for the position of the photos on the screen, the only problem was that I found it to be better only in the end of the project.
var photosStripNum = new Array();//Will keep all the photos in the sprip in the right order.
var srcIs = document.getElementById("mainPhoto");//This get will give the position of the mainPhoto.
const photosNumber = 5; //What is the total number of the photos display in the gallery, you can change it but you will need to fix all the other linked functions.


//This function collects the path of the photos in the gallery
function getPhotos(){
  for(let i= 1; i<= photosNumber; i++){
    photosCount.push(document.getElementById("p"+i).getAttribute("src"));
  }
}
//  console.log("photosCount: " + photosCount);//test
getPhotos();

// If you want to add photos that is not on the first page
var addThosePhotos = ["photos/6.jpg", "photos/7.jpg", "photos/8.jpg", "photos/9.jpg", "photos/10.jpg"];
function addPhotos (){
  photosCount = photosCount.concat(addThosePhotos);
}
addPhotos();
//console.log("photosCount: " + photosCount);//test

//This function in charge on the right arrow to change the main photo in the gallery to the next photo
function nextImage(xx){
//  console.log("srcIs: " + srcIs);
//  console.log("photosCount: " + photosCount.length);

  count += xx;
  if (count < photosCount.length -1 && count > -photosCount.length +1){
      count ++;
      if (count <0 ){
        srcIs.src = photosCount[photosCount.length - Math.abs(count)];

        //console.log("srcIs stc nextImage: " + srcIs.src);
        changePhotosStrip();

     }else{
      srcIs.src = photosCount[Math.abs(count)];
      srcIs.style.transitionDelay = "1s ";

      //srcIs.style.trensform = "10s ease";

      changePhotosStrip();
      //console.log("the count is: " + count);//test
      //console.log("srcIs stc nextImage: " + srcIs.src);
    }
  }else{
    count = 0;
    srcIs.src = photosCount[count];
    changePhotosStrip();
  }
  abso();
}


//This function in charge on the left arrow to change the main photo in the gallery to the last photo
function backImage(){

   if (count < photosCount.length -1 && count > -photosCount.length + 1 ){
     count --;
      //console.log("count back is: " + count);
      if (count < 0 ){
        srcIs.src = photosCount[ photosCount.length - Math.abs(count)];
        changePhotosStrip();
      }else{
        srcIs.src = photosCount[ Math.abs(count)];
        //console.log("count back is: " + count);
        changePhotosStrip();
      }
  }else{
    count = 0;
    srcIs.src = photosCount[count];
    //console.log("srcIs.src bac k 0 is: " + photosCount[count]);
    changePhotosStrip();
  }
  abso();
}

/** I thought on this idea in the end of the project, you can base all the functions base on this absCount **/
function abso(){
  if (count < 0){
    absCount =  photosCount.length - Math.abs(count);
  }else{
    absCount = count;
  }
  //console.log("absCount= " + absCount);
}


/**This function in charge on the strip and change the photos based on the main photo count.
The function is built on 5 stages:
1.The first 5 photos in the gallery will change according to the next photos in the gallery
2.The next 5 or the rest of the photos are starting to repeat themselves and you need to make
sure that the count is the same number of spaces that left in the strip otherwise you will see a bug in the console.
3.when the count reaches to the end it is very important
**/
function changePhotosStrip(){
  if(count > 0 && count <photosNumber){
    for(let x = 0; x <(photosNumber); x++){
     document.getElementById("p" + (x+1)).src = photosCount[x + Math.abs(count)];

     //console.log("count next s1 is: " + count);
     //console.log("changePhotosStrip S1: " + photosCount[x + Math.abs(count)]);
    }
  }else if (count >= photosNumber){
      for(let y = 0; y <(photosCount.length-count); y++){
        document.getElementById("p" + (y+1)).src = photosCount[Math.abs(count+y)];
        //console.log("count next is:s2 " + count);
        //console.log("changePhotosStrip S2: " + photosCount[Math.abs(count+y)]);
      }
      for(let z = photosNumber-count+photosNumber+1; z <= photosNumber; z++){
        document.getElementById("p" + (z)).src = photosCount[Math.abs(z+count-photosCount.length-1)];
        //console.log("count next is S3: " + count);
        //console.log("changePhotosStrip S3: " + photosCount[Math.abs(z+count-photosCount.length-1)]);
      }
  }else if (count < 0 && count >-photosNumber){
      for(let c = 0; c <(Math.abs(count)); c++){
         document.getElementById("p" + (c+1)).src= photosCount[c+photosCount.length + count];
         //console.log("count back is S5:  " + count);
         //console.log("photosNumber is S5:  " + c);
         //console.log("changePhotosStrip S5: " + photosCount[c+photosCount.length + count]);
       }
       for(let d = (Math.abs(count)) ; d <= photosNumber+count+Math.abs(count)-1; d++){
          document.getElementById("p" + (d+1)).src= photosCount[d -Math.abs(count)];
          //console.log("count back is S6:  " + count);
          //console.log("photosNumber is S6:  " + d);
          //console.log("changePhotosStrip S6: " + photosCount[d-1]);
       }
  }else if (count < 0 && count <=-photosNumber){
    for(let e = 0; e <(photosNumber); e++){
       document.getElementById("p" + (e+1)).src= photosCount[e+photosCount.length + count];
       //console.log("count back is S7:  " + count);
       //console.log("photosNumber is S7:  " + e);
       //console.log("changePhotosStrip S7: " + photosCount[e+photosCount.length + count]);
    }
  }else if(count==0){
    for(let n = 0; n < photosNumber; n++){
      document.getElementById("p" + (n+1)).src = photosCount[n];
      //console.log("count 0 is S4:  " + count);
      //console.log("changePhotosStrip S4: " + photosCount[n]);
    }
  }
}
function blinkBlink(){
  $('.circle').removeClass('blink');
  $('.cl'+absCount).addClass('blink');
};



$(function(){
  var cl = $("#circle");
  for (let i = 1; i< photosCount.length; i++){
    $('#circleStrip').append($('#circle').clone().attr('id', 'circle'+ i).attr('class','circle '+ 'cl'+i));
  }
});
$(function (){
  $('.cl0').addClass('blink');
  $('.arrowNext, .clearBoxNext, #clearBoxNextStrip, .horizontalPhotos,.arrowBack, .clearBoxBack, #clearBoxBackStrip').click(function blinkBlink(){
    $('.circle').removeClass('blink');
    $('.cl'+absCount).addClass('blink');
  });
});

//Touch functionality

var start = null;
window.addEventListener("touchstart",function(event){
  if(event.touches.length === 1 ){
    //just on finger touched
    start = event.touches.item(0).clientX;
  }else{
    //a second finger hit the screen, abort the touch
    start = null;
  }
});

window.addEventListener("touchend", function(event){
  var offset=100;//at least 100px are a swipe
  if(start !== 0){
    //the only finger that hit the screen left it
    var end = event.changedTouches.item(0).clientX;
    if(end > start + offset){
        console.log("right swipe");
        nextImage(0);
        blinkBlink();
      //a left -> right swipe
    }
    if (end < start - offset){
      //a right -> left swipe
      console.log("left swipe");
      backImage();
      blinkBlink();
    }
  }
});
