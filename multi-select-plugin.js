var createMultiSelectWidget = createMultiSelectWidget || (function(){
  'use strict';
  var pub,
    local = {},
    info = {},
    doc = document
  ;

  local = {
    updateList: function() {
      this.sort();
      this.createElementUnselectedList();
      this.createElementSelectedList();
      this.checkIfAllSelected();
    },
    checkIfAllSelected: function() {
      if(info.data.unselectedItems.length == 0)
          info.selectUnselectAll.checked  = true;
      else
          info.selectUnselectAll.checked = false;
    },
    selectUnselectAll: function() {
      info.selectUnselectAll.checked ? local.selectAll() : local.unselectAll();
    },
    selectAll: function() {
      while(info.data.unselectedItems.length) {
        info.data.selectedItems.push(info.data.unselectedItems.pop());
      }
      this.updateList();
    },
    unselectAll: function() {
      while(info.data.selectedItems.length) {
        info.data.unselectedItems.push(info.data.selectedItems.pop());
      }
      this.updateList();
    },
    sort: function(){
      info.data.selectedItems.sort();
      info.data.unselectedItems.sort();
    },
    createElementUnselectedList: function(){
      var that = this,
        frag = doc.createDocumentFragment()
      ;
      info.unselectedWrapper.innerHTML="";
      info.data.unselectedItems.forEach(function(item){
        var li = doc.createElement("li"),
          check = doc.createElement("input"),
          span = doc.createElement("span")
        ;
        check.setAttribute("value", item);
        check.setAttribute("type", "checkbox");
        span.innerHTML = item;
        li.appendChild(check);
        li.appendChild(span);
        frag.appendChild(li);
        check.addEventListener("click", function(){
          that.popUnselectedItem(item);
        }, false);
      });
      info.unselectedWrapper.appendChild(frag);
    },
    createElementSelectedList: function(){
      var that = this,
      frag = doc.createDocumentFragment()
      ;
      info.selectedWrapper.innerHTML = "";
      info.data.selectedItems.forEach(function(item){
        var li = doc.createElement("li"),
          check = doc.createElement("input"),
          span = doc.createElement("span")
        ;
        check.setAttribute("value", item);
        check.setAttribute("checked", "checked");
        check.setAttribute("type", "checkbox");
        span.innerHTML = item;
        li.appendChild(check);
        li.appendChild(span);
        frag.appendChild(li);
        check.addEventListener("click", function(){
          that.popSelectedItem(item);
        }, false);
      });
      info.selectedWrapper.appendChild(frag);
    },
    popSelectedItem: function(item) {
      info.data.selectedItems.splice(info.data.selectedItems.indexOf(item),1);
      info.data.unselectedItems.push(item);
      local.sort();
      local.updateList();
    },
    popUnselectedItem: function(item){
      info.data.unselectedItems.splice(info.data.unselectedItems.indexOf(item),1);
      info.data.selectedItems.push(item);
      local.updateList();
    }
  };

  pub = function(data){
    info.selectedWrapper = doc.querySelector("#" + data.selectedId);
    info.unselectedWrapper = doc.querySelector("#" + data.unselectedId);
    info.selectUnselectAll = doc.querySelector("#" + data.selectAllId);
    info.selectUnselectAll.addEventListener("click", local.selectUnselectAll, false);
    info.data = data.data;
    local.updateList();
  };

  return pub;
}());
