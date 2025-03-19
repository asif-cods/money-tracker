// Item controller, Ui controller, Storage controller, App controller

//Storage controller
const  StorageCtrl = (function(){

    return{
        addInStorage : function(newItem){
            let items;

            //check if any item in array
            if(localStorage.getItem("items") === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem("items"));
            }
            items.push(newItem);
            localStorage.setItem("items", JSON.stringify(items));
        },
        getItemInStorage: function(){
            let items;

            //check if any item in array
            if(localStorage.getItem("items") === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;

        },
        deleteItemInStorage : function(id){
            let items;
            items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if(id === item.id){
                    items.splice(index, 1);
                }
            })
            localStorage.setItem("items", JSON.stringify(items));
        },
        updateItemInStorage: function(updateItem){
            let items;
            items = JSON.parse(localStorage.getItem("items"));
            items.forEach((item, index) => {
                if(updateItem.id === item.id){
                    items.splice(index, 1, updateItem);
                }
            })
            localStorage.setItem("items", JSON.stringify(items));
        },
        clearItemInStorage : function(){
            localStorage.removeItem("items");
        }
    }
})();


//Item controller

const Itemctrl = (function(){ // immediatly invokked func
    //Item constructor
    const Item = function(id, name, money){
        this.id = id;
        this.name = name;
        this.money = money;
    }


    // Data structure 
    const data = {
        // items:[
        //     {id:0, name:"bag", money:3000},
        //     {id:1, name:"cake", money:3000},
        //     {id:2, name:"ball", money:3000}
        // ],
        items : StorageCtrl.getItemInStorage(),
        totalMoney:0,
        currentItem: null
    }
    
    return {
        getData: function(){
            return data;
        },
        getItems:function(){
            return data.items;
        },
        getTotleMoney: function(){
            let total = 0;
            if(data.items.length > 0){
                data.items.forEach(function(item){
                    total += item.money;
                    data.totalMoney = total;
                })
            }
            else{
                return data.totalMoney = 0;
            }
            return total;
        },
        addItem : function(name, money){
            let ID;
            // Create Id
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }else{
                ID = 0;
            }
            
            money = parseInt(money);

            //Create a newItem
            newItem = new Item(ID, name, money);

            // Add to an Item Array
            data.items.push(newItem);

            return newItem;
        },
        getItemByID: function(id){
            let found = null;
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;

        },
        setCurrentItem : function(item){
            data.currentItem =item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        clearData : function(){
            data.items = [];
        },
        delteCurrentItem : function(id){
            const ids = data.items.map(function(item){
                return item.id;
            });
            const idIndex = ids.indexOf(id);
            data.items.splice(idIndex,1);
        },
        updateItem : function(name, money){
            const itemMoney = parseInt(money);
            let found = null;
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.money = itemMoney;
                    found = item;
                }
            })
            return found;
            // console.log(found);
        }

}

})();



//Ui controller
const Uictrl = (function(){

    return {
        populateItemList: function(items){
            console.log(items);
            let li = "";
            items.forEach(item => {
                li += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong> :
                <em>${item.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>
                </a>
            </li>`;
            });
            document.querySelector("#item-list").innerHTML= li;
        },
        showTotalMoney: function(total){
            document.querySelector(".total-money").innerHTML = total;
        },
        clearEditState: function(){
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },
        showEditState: function(){
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },
        addItemToForm: function(){
            console.log(Itemctrl.getCurrentItem()); // it return obj
            document.querySelector("#item-name").value = Itemctrl.getCurrentItem().name;
            document.querySelector("#item-money").value = Itemctrl.getCurrentItem().money;

        },
        clearList: function(e){
            e.preventDefault();
            document.querySelector("#item-list").innerHTML = "";
        },
        getItemInput: function(){
            // e.preven/tDefault();
            // const name = 
            
            return {
                name : document.querySelector("#item-name").value,
                money : document.querySelector("#item-money").value
            }
        },
        clearInputState : function(){
            document.querySelector("#item-name").value = "",
            document.querySelector("#item-money").value = ""
        },
        addListUi : function(item){
            //Ceeate li
            const li = document.createElement("li");

            // Add li class
            li.className = "collection-item";
            // add ID 
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}</strong> :
                <em>${item.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>
                </a>
            `;
            //append li to ul
            document.querySelector(".collection").appendChild(li);
        },
        clearUi : function(){
            const itemCollection = document.querySelector(".collection");
            itemCollection.innerHTML = "";
        },
        deleteItemUi : function(id){
            const itemId = `#item-${id}`;
            const itemUi = document.querySelector(itemId);
            itemUi.remove();
        },
        updateListUi : function(item){
            console.log(item.id);
            const listCollection = document.querySelectorAll(".collection-item");
            // console.log(listCollection);
            listCollection.forEach(function(eachList){
                const listId = eachList.getAttribute("id");
                console.log(listId);
                if(listId === `item-${item.id}`){
                    let updatingList = document.querySelector(`#item-${item.id}`);
                    updatingList.innerHTML = `<strong>${item.name}</strong> :
                <em>${item.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>
                </a>
                    `;
                }
            })
        }
    }
})();



// App controller
const App = (function(){

    const loadEventListener = function(){
        document.querySelector(".add-btn").addEventListener("click", addItem);
        document.querySelector("#item-list").addEventListener("click", editItem);
        document.querySelector(".clear-btn").addEventListener("click", clearItem);
        document.querySelector(".delete-btn").addEventListener("click", delteItem);
        document.querySelector(".update-btn").addEventListener("click", updateItem);
        document.querySelector(".back-btn").addEventListener("click", backItem);
    }

    const addItem = function(e){
        e.preventDefault();
        const input = Uictrl.getItemInput();
        if(input.name === "" || input.money === ""){
            alert("please fill the input field");
        }
        else{
            const newItem = Itemctrl.addItem(input.name, input.money);
            Uictrl.addListUi(newItem);

            //get the total
            const totalMoney = Itemctrl.getTotleMoney();

            //adding in local storage
            StorageCtrl.addInStorage(newItem);

                        //Show the total
            Uictrl.showTotalMoney(totalMoney);
            Uictrl.clearInputState();
        }
    }
    const editItem = function(e){
        if(e.target.classList.contains("edit-item")){
            // get the list id 
            const listID = e.target.parentElement.parentElement.id;
            // break into array
            const listArr = listID.split("-");
            // convert id to number
            const id = parseInt(listArr[1]);

            const itemToEditID = Itemctrl.getItemByID(id);
            Itemctrl.setCurrentItem(itemToEditID);
            
            console.log(itemToEditID);
            Uictrl.showEditState();
            Uictrl.addItemToForm();
            
        } 
    }
    const clearItem = function(){
            Itemctrl.clearData();
            Uictrl.clearUi();
            StorageCtrl.clearItemInStorage();
             //get the total
             const totalMoney = Itemctrl.getTotleMoney();

             //Show the total
            Uictrl.showTotalMoney(totalMoney);
            Uictrl.clearInputState();

    }
    const delteItem = function(e){
        const currentItem = Itemctrl.getCurrentItem();

        Itemctrl.delteCurrentItem(currentItem.id);
        Uictrl.deleteItemUi(currentItem.id);
        StorageCtrl.deleteItemInStorage(currentItem.id);
        const totalMoney = Itemctrl.getTotleMoney();

        //Show the total
       Uictrl.showTotalMoney(totalMoney);
       Uictrl.clearInputState();
       Uictrl.clearEditState();

    }
    const updateItem = function(){
        const item = Uictrl.getItemInput();

        const updateItemData = Itemctrl.updateItem(item.name, item.money);
        Uictrl.updateListUi(updateItemData);
        StorageCtrl.updateItemInStorage(updateItemData);
        const totalMoney = Itemctrl.getTotleMoney();

        //Show the total
       Uictrl.showTotalMoney(totalMoney);
       Uictrl.clearInputState();
       Uictrl.clearEditState();
    }
    const backItem = function(){
        Uictrl.clearInputState();
        Uictrl.clearEditState();
    }

    return {
        //start or init
        init: function(){
            Uictrl.clearEditState();

            const items = Itemctrl.getItems();
            // console.log(items);
            if(items.length > 0){
                Uictrl.populateItemList(items);
            }
            const totalMoney = Itemctrl.getTotleMoney();
            Uictrl.showTotalMoney(totalMoney);
            // Itemctrl.clearBtn();
            loadEventListener();
            // addItem();
        }
    }
})();

App.init(); //program start from here