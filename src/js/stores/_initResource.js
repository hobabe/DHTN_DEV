EPT._initResource = {
  resourceFrames(scene, actions){
    // console.log(actions);
    for(var i=0;i<actions.length;i++){
      var a = actions[i];
      scene.anims.create({
        key: a.action,
        frames: EPT._array.initFramesWithKey(a.action,a.count),
        frameRate: a.frameRate,
        repeat: a.repeat
      });
    }
  }
};