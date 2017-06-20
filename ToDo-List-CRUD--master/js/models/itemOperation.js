var itemOperations = {
    itemList:[],
    itemNo :1,
    addItem : function(name,desc,price,url){
       
        var itemObject = new Item(this.itemNo,name,desc,price,url);
        this.itemNo++;
        this.itemList.push(itemObject);
    },
    searchItem:function(price){
//        console.log(this.itemList);
//        console.log(this.itemList.length);
       // var subArray=
         return this.itemList.filter(function(itemObject){
//             console.log(itemObject.price+" "+price);
           return itemObject.price>=price; 
        });
        //return subArray;
    },
    markUnmark:function(id){
        var itemObject= this.itemList.filter(function(itemObject){
            return itemObject.id==id;
        })[0];
        itemObject.markForDeletion=!itemObject.markForDeletion;
    },
    deleteMarkitems:function(){
       this.itemList= this.itemList.filter(function(itemObject){
            return !itemObject.markForDeletion;
        });
    },
    sortByPrice(){
      this.itemList=  this.itemList.sort(function(firstObject,secondObject){
           return firstObject.price - secondObject.price; 
        });
    },
    returnId:function(){
        return this.itemNo;
    },
    markForEditing : function(id){
         var itemObject = this.itemList.filter(function(itemObject){
           return itemObject.id==id; 
        })[0];
        itemObject.markForEdit = !itemObject.markForEdit;
        return itemObject;
    },
    RecordToEdit : function(){
        return this.itemList.filter(function(itemObject){
           return itemObject.markForEdit; 
        })[0];
    },
    UpdateRecord: function(itemObject){
        itemObject.markForEdit=false;
        this.itemList[itemObject["id"]-1]=itemObject;
        
    }
        
    }
    
    
    
