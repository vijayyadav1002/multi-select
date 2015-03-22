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
      this.createList(true);
      this.createList(false);
      this.checkIfAllSelected();
    },
    checkIfAllSelected: function() {
      if(info.data.unselectedItems.length == 0)
          info.selectUnselectAll.checked  = true;
      else
          info.selectUnselectAll.checked = false;
    },
    selectUnselectAll: function() {
      var pop, push;
      pop = info.selectUnselectAll.checked ? info.data.unselectedItems : info.data.selectedItems;
      push = info.selectUnselectAll.checked ? info.data.selectedItems : info.data.unselectedItems;
      while(pop.length)
        push.push(pop.pop());
      local.updateList();
    },
    sort: function(){
      info.data.selectedItems.sort();
      info.data.unselectedItems.sort();
    },
    createList: function(isSelectedItems) {
      var that = this,
        frag = doc.createDocumentFragment(),
        push = isSelectedItems ? info.data.unselectedItems : info.data.selectedItems,
        pop = isSelectedItems ? info.data.selectedItems : info.data.unselectedItems,
        list = pop,
        wrapper = isSelectedItems ? info.selectedWrapper : info.unselectedWrapper
      ;
      wrapper.innerHTML="";
      list.forEach(function(item){
        var li = doc.createElement("li"),
          check = doc.createElement("input"),
          span = doc.createElement("span")
        ;
        check.setAttribute("value", item);
        check.setAttribute("type", "checkbox");
        if(isSelectedItems)
          check.setAttribute("checked", "checked");
        span.innerHTML = item;
        li.appendChild(check);
        li.appendChild(span);
        frag.appendChild(li);
        check.addEventListener("click", function(){
          that.popNPushItems(item, pop, push);
        }, false);
      });
      wrapper.appendChild(frag);
    },
    popNPushItems: function(item, pop, push) {
      pop.splice(pop.indexOf(item),1);
      push.push(item);
      this.updateList();
    },
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
