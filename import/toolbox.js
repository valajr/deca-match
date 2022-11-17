function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function createElementHTML(tag, cl=null, id=null, action=null) {
    let element = document.createElement(tag);
    if(cl)
        element.setAttribute('class', cl);
    if(id)
        element.id = id;
    if(action)
        element.onclick = action;

    return element;
}

function removeItem(list, value) {
    let index = list.indexOf(value);
    let new_list = [...list];
    if (index > -1) {
      new_list.splice(index, 1);
    }
    return new_list;
  }