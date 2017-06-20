window.addEventListener("load",function(){
    document.getElementById("addBt").addEventListener("click",addNewitem);
    document.getElementById("search").addEventListener("click",searchItem);
    document.getElementById("clear").addEventListener("click",clearTable);
    document.getElementById("delete").addEventListener("click",deleteMarkItems);
    document.getElementById("sortBt").addEventListener("click",sortByPrice);
    document.getElementById('saveBt').addEventListener('click', saveItems);
    document.getElementById('loadBt').addEventListener('click',loadItems);
    document.getElementById('update').addEventListener("click",UpdateItem);
     document.getElementById('id').innerHTML=itemOperations.returnId();
});

function UpdateItem(){
    var itemObject=itemOperations.RecordToEdit();
    
    console.log(itemObject);
    for(var key in itemObject){
          if(key=='markForDeletion' || key == 'markForEdit'){
          continue;
      }
        else{
         console.log("value of key "+ key +" is:"+itemObject[key]);
        itemObject[key]=document.getElementById(key).value;
        }
    }
    console.log(itemObject);
    
    itemOperations.UpdateRecord(itemObject);
    printItems(itemOperations.itemList);
    removeClass();
    document.getElementById("id").innerHTML=itemOperations.returnId();
    clearField();
}

function removeClass(){
   var bt = document.getElementsByClassName("bt");
    Array.prototype.forEach.apply(bt,[(x)=>{
        x.classList.remove("bt1");
    }]);
}

function sortByPrice(){
    itemOperations.sortByPrice();
    printItems(itemOperations.itemList);
}
function deleteMarkItems(){
    itemOperations.deleteMarkitems();
    printItems(itemOperations.itemList);
      
}

function searchItem(){
    var price=parseInt(document.getElementById("price").value);
    var subArray=itemOperations.searchItem(price);

    printItems(subArray);
}

function printItems(itemArray){
      clearTable();
      itemArray.forEach(printRow);
}

function clearTable(){
      document.getElementById("itemTableBody").innerHTML="";
}

function clearField(){
   var fields = document.getElementsByClassName("cf");
    Array.prototype.forEach.apply(fields,[(x)=>{
        x.value="";
    }]);
}

function addNewitem(){
    var itemName = document.getElementById("name").value;
    var itemDesc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var url = document.getElementById("url").value;
            
    itemOperations.addItem(itemName,itemDesc,price,url);
    //stores value of lass element of the array
        var lastItemObject = itemOperations.itemList[itemOperations.itemList.length-1];
      document.getElementById('id').innerHTML=itemOperations.returnId();
    clearField();
    printRow(lastItemObject);
    
}



function printRow(itemObject){
    var tableBody=document.getElementById("itemTableBody");
    var row=tableBody.insertRow();
    var index=0;
    var id=0;
  for(var key in itemObject){
      if(key=='id'){
          id=itemObject[key];
      }
      if(key=='markForDeletion' || key == 'markForEdit'){
          continue;
      }
      if(key=='url'){
          row.insertCell(index).innerHTML="<img src='"+itemObject[key]+"' width='100' height='100'>";
      }
      else{
       row.insertCell(index).innerHTML = itemObject[key]; 
         
        }
      index++;
  }
    
    //operations
    var deleteImg = document.createElement("img");
    deleteImg.src="images/delete.png";
    deleteImg.className="showcursor";
    var editImg = document.createElement("img");
    editImg.src="images/edit.png";
    editImg.className="showcursor";
    
//     editImg.setAttribute("data-params",id);
    var td = row.insertCell(index);
    td.append(deleteImg);
    deleteImg.addEventListener("click",markForDeletion);
    deleteImg.setAttribute("data-params",id);
    td.append(editImg);
    editImg.addEventListener("click",markForUpdate);
    editImg.setAttribute("data-params",id);
}

function markForUpdate(event){
    var id=event.srcElement.getAttribute("data-params");
    var obj = itemOperations.markForEditing(id); 
    
    var currentTr=event.srcElement.parentElement.parentElement;
    if(!currentTr.classList.contains("showred")){
    currentTr.classList.toggle("showgreen");
         var bt = document.getElementsByClassName("bt");
        Array.prototype.forEach.apply(bt,[function(x){
            x.classList.toggle("bt1");
//            x.disabled = !x.disabled;
        }]);
        if(currentTr.classList.contains("showgreen")){
        for(var key in obj){
        if(key == "markForDeletion" || key == "markForEdit"){
            continue;
        }
        else{
            console.log("value of key "+ key +" is:"+obj[key]);
        document.getElementById(key).value=obj[key];
            document.getElementById("id").innerHTML= obj["id"]; 
       }
    }
        }
     
        if(!currentTr.classList.contains("showgreen")){
            document.getElementById("id").innerHTML=itemOperations.returnId();
        }
}
}

function markForDeletion(event){
    var id=event.srcElement.getAttribute("data-params");
    itemOperations.markUnmark(id);
    //event is the event happening on element and parentElement is parent of that element
    //here event is on the dustbin icon and its parent is td and then again its parent tr
   var currentTr=event.srcElement.parentElement.parentElement;
   if(!currentTr.classList.contains("showgreen")){
    currentTr.classList.toggle("showred");
   }
}


function saveItems(){
    if(window.localStorage){

        //JSON has two functions
        //stringify : to covert to json format {serialisation}
        //parse :  to get the json to a object {deserialisation}
        var json = JSON.stringify(itemOperations.itemList);

        console.log(json);
        localStorage.items = json;
    }
    else{
        alert('Your browser donot support localStorage');
    }
}

function loadItems(){
    if(window.localStorage){
        if(localStorage.items){
            itemOperations.itemList = JSON.parse(localStorage.items);
            printItems(itemOperations.itemList);
        }
        else{
            alert('No such data saved');
        }
    }
    else{
        alert('Your browser donot support localStorage');
    }
}

