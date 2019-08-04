function ContextMenu(map, content) {
  var me = this;
  //地图中添加鼠标工具MouseTool插件
  this.mouseTool = new AMap.MouseTool(map);

  this.contextMenuPositon = null;
  console.log(content)
  //通过content自定义右键菜单内容
  this.contextMenu = new AMap.ContextMenu({ isCustom: true, content: content });

  //地图绑定鼠标右击事件——弹出右键菜单
  map.on("rightclick", function(e) {
    me.contextMenu.open(map, e.lnglat);
    me.contextMenuPositon = e.lnglat; //右键菜单位置
  });
}

ContextMenu.prototype.zoomMenu = function zoomMenu(tag) {
  //右键菜单缩放地图
  if (tag === 0) {
    map.zoomOut();
  }
  if (tag === 1) {
    map.zoomIn();
  }
  this.contextMenu.close();
};

ContextMenu.prototype.distanceMeasureMenu = function() {
  //右键菜单距离量测
  this.mouseTool.rule();
  this.contextMenu.close();
};

ContextMenu.prototype.addMarkerMenu = function() {
  //右键菜单添加Marker标记
  this.mouseTool.close();
  var marker = new AMap.Marker({
    map: map,
    position: this.contextMenuPositon //基点位置
  });
  this.contextMenu.close();
};

export default ContextMenu;
