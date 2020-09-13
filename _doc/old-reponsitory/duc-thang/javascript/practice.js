function CalRetangle(){
    var length=Number(prompt("Input retangle length: "));
    var width=Number(prompt("Input retangle width :"));
    var S=length*width;
    var P= ( length + width)*2;
    
    console.log("Length is: "+length);
    console.log("Width is: "+width);
    console.log("Primeter is: " +P);
    console.log("Area is: " + S);
}
