var createMultiSelectWidget = createMultiSelectWidget || (function(){
  'use strict';
  var pub,
    local = {},
    info = {}
  ;

  local = {
    updateList: function() {
      this.createUnselectedList();
      this.createSelectedList();
    },
    sort: function(){
      info.data.selectedItems.sort();
      info.data.unselectedItems.sort();
    },
    createUnselectedList: function(){
      var that = this;
      info.unselectedWrapper.innerHTML="";
      info.data.unselectedItems.forEach(function(item){
        var li = document.createElement("li");
        li.innerHTML = item;
        info.unselectedWrapper.appendChild(li);
        li.addEventListener("click", that.popUnselectedItem, false);
      });
    },
    createSelectedList: function(){
      var that = this;
      info.selectedWrapper.innerHTML = "";
      info.data.selectedItems.forEach(function(item){
        var li = document.createElement("li");
        li.innerHTML = item;
        info.selectedWrapper.appendChild(li);
        li.addEventListener("click", that.popSelectedItem, false);
      });
    },
    popSelectedItem: function() {
      info.data.selectedItems.splice(info.data.selectedItems.indexOf(this.innerHTML),1);
      info.data.unselectedItems.push(this.innerHTML);
      local.sort();
      local.updateList();
    },
    popUnselectedItem: function(){
      info.data.unselectedItems.splice(info.data.unselectedItems.indexOf(this.innerHTML),1);
      info.data.selectedItems.push(this.innerHTML);
      local.sort();
      local.updateList();
    }
  };

  pub = function(data){
    info.selectedWrapper = document.querySelector("#" + data.selectedId);
    info.unselectedWrapper = document.querySelector("#" + data.unselectedId);
    info.data = data.data;
    local.sort();
    local.updateList();
  };

  return pub;
}());
