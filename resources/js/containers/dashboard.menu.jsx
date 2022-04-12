/**
 *
 *  @component : DashboardMenu
 *
 *
 *  @purpose : inorder to add menus and edit menu details
 *
 *
 *
 *  @functionaily : inorder to add menus, edit menu details, and remove menus from the store
 *
 *
 */


import React from "react";
import ReactDOM from "react-dom";
import { TemplateModal } from "../components/dashboard/recipe/core/template.modal";
import FetchServiceProvider from "../lib/fetchServiceProvider";

/**
 *
 *  @function: addMenu
 *
 *  @purpose: to add a menu to the store
 *
 * @param { menuName }
 *
 * @returns {Promise}
 *
 */

const addMenu = (menuName) => {
    // inorder to perform the api request inorder to add a menu
    const request = () => {
        const api = new FetchServiceProvider();
        const url = `/api/store/menu/add`;

        const data = {
            name: menuName,
        };

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        };
        // return the promise.
        return api.post(url, data, headers);
    }
    return request();
}

/**
 *
 *  @function: getStoreMenus
 *
 *  @purpose: to get the store menus
 *
 *
 *  @parm { <EMPTY> }
 *
 *  @returns {Promise}
 */


const getStoreMenus = () => {

    const request = () => {

        const api = new FetchServiceProvider();
        const url = `/api/store/menu/get`;

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        };

        return api.get(url, headers);
    }

    return request();
}

/**
 *
 *  @function: addMenuItem
 *
 *  @purpose: to add a menu item to the store.
 *
 *  @param {  menuID }
 *
 *
 *  @returns {Promise}
 */
const addMenuItem = (...menu) => {

    const requestStructure = {
        menuID: menu[0],
        name: menu[1],
        price: menu[2],
        catagory: menu[3],
    }

    const request = (requestStructure) => {
        const api = new FetchServiceProvider();
        const url = `/api/store/menu/item/add`;

        const data = {
            menuID: requestStructure.menuID,
            name: requestStructure.name,
            price: requestStructure.price,
            catagory: requestStructure.catagory,
        };

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        };

        return api.post(url, data, headers);

    }

    // new the promise to the user inorder to handle the response
    return request(requestStructure);
}



/**
 *
 *  @function: deleteMenu
 *
 *  @purpose: inorder to delete a menu from the store in our system
 *
 *  @param { menuID }
 */

const deleteMenu = (menuID) => {


    const request = (menuID) => {
        const api = new FetchServiceProvider();
        const url = `/api/store/menu/delete`;

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'menuID': menuID,
        };

        return api.delete(url, headers);
    }

    return request(menuID);
}

/**
 *
 *  @function: fetchMenuItems
 *
 *  @purpose: inorder to fetch the menu items from the store
 *
 *  @param { menuID }
 *
 *  @returns {Promise}
 *
 *
 */

const fetchMenuItems = (menuID) => {

    const request = (menuID) => {
        const api = new FetchServiceProvider();
        const url = `/api/store/menu/item/get`;

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
            'menuID': menuID,
        };

        return api.get(url, headers);
    }

    return request(menuID);
}

/**
 *
 *  @function: deleteMenuItem
 *
 *
 *  @purpose: inorder to delete a menu item from the store
 *
 *
 *  @param { menuItemID }
 *
 */

 const deleteMenuItem = (menuItemID) => {

        const request = (menuItemID) => {
            const api = new FetchServiceProvider();
            const url = `/api/store/menu/item/delete`;

            const headers = {
                'Content-Type': 'application/json',
                'accessToken': api.getCookie('accessToken'),
                'menuItemID': menuItemID,
            };

            return api.delete(url, headers);
        }

        return request(menuItemID);

}

/**
 *
 *  @function: editMenuItem
 *
 *
 *  @purpose: inorder to edit a menu item from the store. this function will be used to edit the menu item name, price, and catagory
 *
 *
 * @param {*} menuItemID
 * @param {*} name
 * @param {*} price
 * @param {*} catagory
 */


const editMenuItem = (menuItemID, name, price, catagory) => {


    console.log(menuItemID, name, price, catagory);
    const request = (menuItemID, name, price, catagory) => {
        const api = new FetchServiceProvider();
        const url = `/api/store/menu/item/update`;

        const data = {
            menuItemID: menuItemID,
            name: name,
            price: price,
            catagory: catagory,
        };

        const headers = {
            'Content-Type': 'application/json',
            'accessToken': api.getCookie('accessToken'),
        };

        return api.patch(url, data, headers);
    }

    return request(menuItemID, name, price, catagory);
}


// REFACTOR THIS COMPONENT INORDER FOR IT TO BE MORE MODULAR AND EASIER TO READ.




export const DashboardMenu = (props) => {

    const [storeMenu, setStoreMenu] = React.useState([]);

    React.useEffect(() => {
        getStoreMenus().then((response) => {
            setStoreMenu(response.menus);
        })
    }, []);

    return (

        <div className='container-fluid rm-pm dashboard-content'>

            {/** to hold the modals  */}
            <div id='modal-container'></div>
              <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='header-title'>Menu</h1>
                        <h2 className="header-subtitle text-center">Add, Edit, and Remove Menus</h2>
                        <img src='/img/SVG/cooking.svg' className='mx-auto w-100 mt-2 mb-' width={200} height={200} />
                        <small className='text-muted text-center'> Add Menu's edit existing menus and menu items</small>

                    </div>
                    {/** sub title */}
                </div>

                <div className='row d-flex pos'>
                  <div className='col'>
                    <div className='btn-message text-center' onClick={
                        (e) => {
                            const container = document.getElementById('modal-container');

                            ReactDOM.render(
                                <TemplateModal title='Add Menu' body={
                                    <div>
                                        {/** add a form to contain the following
                                         *   menu name
                                         *
                                         */}
                                        <div className='form-group'>
                                            <label htmlFor='menu-name mt-2'>Menu Name</label>
                                            <small className='text-muted'> Example eg: (" Dinner Menu ")</small>
                                            <input type='text' className='form-control mt-2' id='menu-name' placeholder='Menu Name' />
                                        </div>

                                        {/** add a button and center it on the form */}
                                        <div className='text-center'>
                                            <button className='btn btn-message m-2 w-auto' onClick={
                                                (e) => {
                                                    const name = document.getElementById('menu-name').value;

                                                    // now pass the props to the right place

                                                    // first do some validation on the form
                                                    // then send the request to the server

                                                    // must be more than 3 characters and can only
                                                    // contain aphabets and numbers and spaces

                                                    const regEx = /^[a-zA-Z0-9 ]{3,}$/;

                                                    if (regEx.test(name) && name.length > 3) {
                                                        // if the validation is successful then we will send the request to the server
                                                        addMenu(name).then((response) => {
                                                            // render either an error or success message

                                                            if (response.status === 200) {
                                                                return ReactDOM.render(
                                                                    <TemplateModal title='Success' body={
                                                                        <div className='text-center'>
                                                                            <img src='/img/SVG/store.svg' className='mx-auto' width={300} height={300} />
                                                                            <h3 className='header-subtitle'>Successfully added the menu</h3>
                                                                            <p>
                                                                                {/** menu icon  */}
                                                                                Please enjoy your new menu!
                                                                            </p>
                                                                            <button className='btn btn-message' onClick={
                                                                                (e) => {
                                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                                }
                                                                            }>Close</button>
                                                                        </div>
                                                                    } />, container);
                                                            } else {
                                                                return ReactDOM.render(
                                                                    <TemplateModal title='Error' body={
                                                                        <div className='text-center'>
                                                                            <img src='/img/SVG/store.svg' className='mx-auto' width={300} height={300} />
                                                                            <h3 className='text-danger text-bold'>{response.message}</h3>
                                                                            <button className='btn btn-message' onClick={
                                                                                (e) => {
                                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                                }
                                                                            }>Close</button>
                                                                        </div>
                                                                    } />, container);
                                                            }
                                                        });
                                                    } else {
                                                        // display an alert to the user and log the error
                                                        alert('The name must be at least 3 characters long and can only contain a-z A-z and numbers');
                                                        // log the error
                                                        console.error('The name must be at least 3 characters long and can only contain a-z A-z and numbers');
                                                    }

                                                }

                                            }>Add Menu</button>
                                        </div>
                                    </div>

                                } />, container);
                        }
                    }>
                        <div>
                            <h3 className='card-title'>Add Menu</h3>
                        </div>

                        <div className='card-body'>
                            <i className='fas fa-plus-circle fa-4x'></i>
                        </div>
                    </div>
                </div>


                    <div className='col'>
                        <div className='btn btn-message text-center' onClick={
                            (e) => {
                                const container = document.getElementById('modal-container');

                                const menus = getStoreMenus();
                                const menuContent = [];
                                // the response will be a list of menus
                                menus.then(response => {
                                    // now push the list of menus into
                                    // the menuEntrys array
                                    // wait 1 second for a response
                                    // before rendering the modal
                                    if (response.menus) {
                                        // wait one second before rendering the modal
                                        setTimeout(() => {
                                            menuContent.push(response.menus);
                                        }, 1000);

                                    }
                                });


                                // wait for menuContent to be populated
                                // before rendering the modal
                                setTimeout(() => {

                                return ReactDOM.render(
                                    <TemplateModal title='Edit Menu' body={
                                        <div>
                                            {/** add a form to contain the following
                                             * select form of the menus */}
                                            <div className='form-group'>
                                                <label htmlFor='menu-name mt-2'>Menu Name</label>

                                                <select className='form-control mt-2' id='menu-name'
                                                onClick={
                                                    (e) => {
                                                        // we are now going to call this menu and validate it.
                                                        let menuID = e.target.value;
                                                        // next we are going to call the server to check if we
                                                        // have the correct permissions inorder to edit the menu

                                                        // now lets return a new modal with the form inorder to add a item
                                                        // to the menu
                                                        // we will also pass the menuID to the server when submitting the field

                                                        // now we will render the modal
                                                        ReactDOM.render(
                                                            <TemplateModal title='Add Item' body={
                                                                <div>
                                                                    <div className='form-group'>
                                                                        <label htmlFor='item-name'>Item Name</label>
                                                                        <input type='text' className='form-control mt-1' id='item-name' placeholder='Enter the item name' />
                                                                    </div>
                                                                    <div className='form-group'>
                                                                        <label htmlFor='item-price'>Item Price</label>
                                                                        <input type='number' step='0.01' min='0' className='form-control mt-1' id='item-price' placeholder='Enter the item price' />
                                                                    </div>
                                                                    <div className='form-group'>
                                                                        {/** catagory
                                                                         */}
                                                                        <label htmlFor='item-catagory'>Item Catagory</label>
                                                                        <input className='form-control mt-1' id='item-catagory' placeholder='Enter the item catagory' />
                                                                    </div>
                                                                    <div className='form-group mt-2'>
                                                                        {/** button on the form */}
                                                                        <button className='btn btn-message'
                                                                        onClick={
                                                                            (e) => {

                                                                                // send the request to the server
                                                                                const itemName = document.getElementById('item-name').value;
                                                                                const itemPrice = document.getElementById('item-price').value;
                                                                                const itemCatagory = document.getElementById('item-catagory').value;

                                                                                // perform some validation here
                                                                                // before sending the request

                                                                                const inputTests = {
                                                                                    itemName: itemName.length >= 3,
                                                                                    itemPrice: itemPrice.length >= 1,
                                                                                    itemCatagory: itemCatagory.length >= 3

                                                                                };

                                                                                if (inputTests.itemName === false ) {
                                                                                    // display an alert to the user and log the error
                                                                                    alert('The name must be at least 3 characters long and can only contain a-z A-z and numbers');
                                                                                    // cancel all execution
                                                                                    return;
                                                                                }

                                                                                if (inputTests.itemPrice === false ) {
                                                                                    // display an alert to the user and log the error
                                                                                    alert('The price must be at least 1 characters long and can only contain a-z A-z and numbers');
                                                                                    // cancel all execution
                                                                                    return;
                                                                                }

                                                                                if (inputTests.itemCatagory === false) {
                                                                                    // display an alert to the user and log the error
                                                                                    alert('The catagory must be at least 3 characters long and can only contain a-z A-z and numbers');
                                                                                    // cancel all execution
                                                                                    return;
                                                                                }

                                                                                // if all the guards are true then continue. the execution
                                                                                // now lets send the value to the function that will handle the request

                                                                                return addMenuItem(menuID, itemName, itemPrice, itemCatagory).then(response => {
                                                                                    if (response.status === 200) {
                                                                                        return ReactDOM.render(
                                                                                            <TemplateModal title='Success' body={
                                                                                                <div>
                                                                                                    <img src='/img/SVG/store.svg' className='mx-auto' width={350} height={350} />
                                                                                                    <h3 className='text-success text-bold text-center'>{response.message}</h3>
                                                                                                    <button className='btn btn-message' onClick={
                                                                                                        (e) => {
                                                                                                            ReactDOM.unmountComponentAtNode(container);
                                                                                                        }
                                                                                                    }>Close</button>
                                                                                                </div>
                                                                                            } />, container);
                                                                                    } else {
                                                                                        return ReactDOM.render(
                                                                                            <TemplateModal title='Error' body={
                                                                                                <div>
                                                                                                    <img src='/img/SVG/store.svg' className='mx-auto' width={350} height={350} />
                                                                                                    <h3 className='text-danger text-bold text-center'>{response.message}</h3>
                                                                                                    <button className='btn btn-message' onClick={
                                                                                                        (e) => {
                                                                                                            ReactDOM.unmountComponentAtNode(container);
                                                                                                        }
                                                                                                    }>Close</button>
                                                                                                </div>
                                                                                            } />, container);
                                                                                    }
                                                                                });

                                                                            }
                                                                        }>
                                                                            <i  className="fas fa-plus-circle"></i>
                                                                             Add Item </button>
                                                                    </div>
                                                                </div>
                                                            }  />, container)
                                                    }
                                                }>
                                                    <option>Select a menu</option>
                                                    {

                                                      // check if the menuContent array is empty
                                                      // if it is then we will render a message


                                                        menuContent.length === 0 ?
                                                            <option>No menus available</option>
                                                            :
                                                            menuContent.map((menu, index) => {
                                                                return menu.map((item, index) => {
                                                                    return <option key={index} value={item.id}>{item.name}</option>
                                                                })
                                                            })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                    } />, container);

                                }, 1500);
                            }
                        }>
                        <div>
                            <h3 className='card-title'>Add Item</h3>
                        </div>
                        <div className='card-body'>
                            <i className='fas fa-edit fa-4x'></i>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <div className='btn btn-message text-center' onClick={
                        (e) => {
                            let container = document.getElementById('modal-container');
                            let menu = getStoreMenus();
                            let menuContent = [];

                            menu.then(response => {

                                // set timeout to get the menus of the store
                                    if (response.menus) {
                                        menuContent.push(response.menus);
                                    }
                            });

                            // wait for our data before the render begins
                            setTimeout(() => {
                                ReactDOM.render(<TemplateModal title='Delete Menu' body={
                                    <div>
                                        {/** create a select from inorder to delete the menu that is selected.  */}
                                        <div className='form-group'>
                                            <label htmlFor='menu-name'>Menu Name</label> <br />
                                            <small className='text-muted'>Select the menu you want to delete</small>
                                            <select className='form-control m-1' id='menu-name' onClick={
                                                (e) => {
                                                    // get the menu id
                                                    const menuID = document.getElementById('menu-name').value;


                                                    // trigger a cofirmation because this action is irreversible
                                                    ReactDOM.render(<TemplateModal title='Confirm' body={
                                                        <div className='text-center'>
                                                            <img src='/img/errors/cancel.svg' width={300} height={300} />
                                                            <h3 className='text-center text-danger mt-3'>Are you sure you want to delete this menu?</h3>
                                                            <small className='text-muted text-center'> Please note that this action is irreversible </small>
                                                            <div className='form-group d-flex mt-3'>

                                                            <button className='btn btn-message m-1' onClick={
                                                                (e) => {
                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                }
                                                            }>Cancel</button>


                                                            <button className='btn btn-danger m-1' onClick={
                                                                (e) => {
                                                                    // send the request to the server
                                                                    return deleteMenu(menuID).then(response => {
                                                                        if (response.status === 200) {
                                                                            return ReactDOM.render(
                                                                                <TemplateModal title='Success' body={
                                                                                    <div className='text-center'>
                                                                                        <img src='/img/SVG/store.svg' className='mx-auto' width={300} height={300} />
                                                                                        <h3>{response.message}</h3>
                                                                                        <button className='btn btn-message' onClick={
                                                                                            (e) => {
                                                                                                ReactDOM.unmountComponentAtNode(container);
                                                                                            }
                                                                                        }>Close</button>
                                                                                    </div>
                                                                                } />, container);
                                                                        } else {
                                                                            return ReactDOM.render(
                                                                                <TemplateModal title='Error' body={
                                                                                    <div>
                                                                                        <img src='/img/SVG/store.svg' className='mx-auto' width={350} height={350} />
                                                                                        <h3 className='text-danger text-bold text-center'>{response.message}</h3>
                                                                                        <button className='btn btn-message' onClick={
                                                                                            (e) => {
                                                                                                ReactDOM.unmountComponentAtNode(container);
                                                                                            }
                                                                                        }>Close</button>

                                                                                    </div>
                                                                                } />, container);
                                                                        }
                                                                    });

                                                                }
                                                            }>
                                                                <i className='fas fa-trash-alt'></i>
                                                                    Delete Menu </button>
                                                            </div>
                                                        </div>
                                                    } />, container);


                                                    // now lets send the value to the function that will handle the request
                                                }
                                            }>
                                                {
                                                    menuContent.length === 0 ?
                                                        <option>No menus available</option>
                                                        :
                                                        menuContent.map((menu, index) => {
                                                            return menu.map((element, index) => {
                                                                return <option key={index} value={element.id}> { element.name }</option>
                                                            })
                                                        })
                                                }

                                            </select>
                                        </div>
                                    </div>
                                } />, container);
                            }, 1500);
                        }
                    }>
                        <div>
                            <h3 className='card-title'>Remove Menu</h3>
                        </div>

                        <div className='card-body'>
                            <i className='fas fa-trash-alt fa-4x'></i>
                        </div>
                    </div>
                </div>
            </div>





                <div className='row'>
                    {/** create a table for displaying menu items */}
                    <div className='col-md'>
                        <div className='card'>
                            <div className='card-header' style={{
                                backgroundColor: 'transparent',
                            }}>
                                {/** clip board  icon */}
                                <h3 className='card-title'>Menu Items    <span className='fas fa-clipboard-list fa-2x ml-2 mr-2'></span></h3>
                            </div>
                            <div className='card-body'>
                                {/** get the user to select a menu   */}
                                <div>
                                    <img src='/img/SVG/tasting.svg'width={400} height={400} className='mx-auto w-100'  />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='menu-name'>Menu Name</label> <br />
                                    <small className='text-muted'>Select the menu you want to view</small>
                                    <select className='form-control m-1' id='menu-name' onClick={
                                        (e) => {
                                            // get the menu id
                                            const menuID = document.getElementById('menu-name').value;
                                            const menuItems = fetchMenuItems(menuID);
                                            let  menuItemsContent = [];

                                            menuItems.then(response => {
                                                if (response.menuItems) {
                                                    menuItemsContent.push(response.menuItems);
                                                }
                                            });


                                            const tableContainer = document.getElementById('menu-table-container');

                                            // wait for our data before the render begins
                                            setTimeout(() => {
                                               // render our table here


                                                ReactDOM.render(
                                                    <div>
                                                        <table className='table table-striped table-hover'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Price</th>
                                                                    <th>Description</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {


                                                                    // check is menu items is empty
                                                                    menuItemsContent[0].length === 0 ?

                                                                        <tr>
                                                                            <td colSpan={4}>
                                                                                <img src='/img/SVG/store.svg' className='mx-auto' width={350} height={350} />
                                                                                No menu items available
                                                                                </td>
                                                                        </tr>
                                                                        :
                                                                        menuItemsContent.map((menuItem, index) => {
                                                                            return menuItem.map((element, index) => {


                                                                                let elementValues = element;

                                                                                return <tr key={index} >
                                                                                    <td>{element.name}</td>
                                                                                    <td>{element.price}</td>
                                                                                    <td>{element.catagory}</td>
                                                                                    <td className='d-flex'>
                                                                                        <button className='btn btn-danger m-1' value={element.id} onClick={
                                                                                            (e) => {
                                                                                                const menuItemID = e.target.value;


                                                                                                return deleteMenuItem(menuItemID).then(response => {
                                                                                                    if (response.status === 200)  {
                                                                                                        // render a modal to show the user that the menu item has been deleted
                                                                                                        const container = document.getElementById('modal-container');
                                                                                                        ReactDOM.render(<TemplateModal title="Delete Menu Item" body={
                                                                                                            <div className='text-center'>
                                                                                                                <h3>Menu Item Deleted</h3>
                                                                                                                <p>The menu item has been deleted</p>
                                                                                                                <button className='btn btn-message m-1' onClick={
                                                                                                                    (e) => {
                                                                                                                        ReactDOM.unmountComponentAtNode(container);
                                                                                                                    }
                                                                                                                }>
                                                                                                                    Close </button>
                                                                                                            </div>
                                                                                                        } />, container);

                                                                                                        }
                                                                                                });
                                                                                            }
                                                                                        }>
                                                                                            <i className='fas fa-trash-alt'></i>
                                                                                        </button>
                                                                                        <button className='btn btn-warning m-1' value={element.id} onClick={
                                                                                            // we will pass an aditional parameter to the function inorder to share the access of the resource.
                                                                                            (e, elementValues) => {

                                                                                                const menuItemID = e.target.value;

                                                                                                // trigger  A MODAL INORDER TO EDIT THE MENU

                                                                                                const elementContent = element;
                                                                                                const container = document.getElementById('modal-container');
                                                                                                // trigger a modal to have the following ? contnent

                                                                                                ReactDOM.render(<TemplateModal title="Edit Menu Item" menuID={menuItemID} body={
                                                                                                    <div className='text-center'>
                                                                                                        <h3 style={{fontWeight: 700, textAlign: 'center'}}>Edit Menu Item</h3>
                                                                                                        {/** need the following fields is recipe name, recipe price
                                                                                                         * and  the recipe catagory
                                                                                                         */}
                                                                                                        <form onSubmit={
                                                                                                            (e, id = menuItemID) => {
                                                                                                                e.preventDefault();
                                                                                                                const name = document.getElementById('menu-item-name').value;
                                                                                                                const price = document.getElementById('menu-item-price').value;
                                                                                                                const catagory = document.getElementById('menu-item-catagory').value;

                                                                                                                console.log(id);
                                                                                                                // update the menu item
                                                                                                                // send the request to the server and get a response
                                                                                                                // and render a modal to show the user that the menu item has been updated < based on response >

                                                                                                                editMenuItem(id, name, price, catagory).then(response => {
                                                                                                                    if (response.status === 200) {
                                                                                                                        // render a modal to show the user that the menu item has been deleted
                                                                                                                        const container = document.getElementById('modal-container');
                                                                                                                        ReactDOM.render(<TemplateModal title="Edit Menu Item" body={
                                                                                                                            <div className='text-center'>
                                                                                                                                <img src='/img/SVG/store.svg' width={300} height={300} />
                                                                                                                                {/** font awesome success icon */}
                                                                                                                                <h3>
                                                                                                                                    <i className='fas fa-check-circle fa-1x' style={{color: 'green'}}></i>
                                                                                                                                    Menu Item Updated
                                                                                                                                </h3>
                                                                                                                                <p style={{fontWeight: 600}}>The menu item has been updated</p>
                                                                                                                                <button className='btn btn-message m-1' onClick={
                                                                                                                                    (e) => {
                                                                                                                                        ReactDOM.unmountComponentAtNode(container);
                                                                                                                                    }
                                                                                                                                }>
                                                                                                                                    Close </button>
                                                                                                                            </div>
                                                                                                                        } />, container);

                                                                                                                    } else {
                                                                                                                        // trigger a error modal
                                                                                                                        const container = document.getElementById('modal-container');
                                                                                                                        ReactDOM.render(<TemplateModal title="Edit Menu Item" body={
                                                                                                                            <div className='text-center'>
                                                                                                                                <img src='/img/SVG/store.svg' width={300} height={300} />
                                                                                                                                <h3 className='text-danger'>
                                                                                                                                    {/** errror icon font awesome */}
                                                                                                                                    <i className='fas fa-exclamation-circle fa-1x' style={{color: 'red'}}></i>
                                                                                                                                    Menu Item Update Failed
                                                                                                                                </h3>
                                                                                                                                <p>The menu item has not been updated</p>
                                                                                                                                <button className='btn btn-message m-1' onClick={
                                                                                                                                    (e) => {
                                                                                                                                        ReactDOM.unmountComponentAtNode(container);
                                                                                                                                    }
                                                                                                                                }>
                                                                                                                                    Close </button>
                                                                                                                            </div>
                                                                                                                        } />, container);

                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }>
                                                                                                            <div className='form-group'>
                                                                                                                <label htmlFor='menu-item-name'>Menu Item Name</label>
                                                                                                                <input type='text' className='form-control mt-1' id='menu-item-name' defaultValue={elementContent.name} />
                                                                                                            </div>
                                                                                                            <div className='form-group'>
                                                                                                                <label htmlFor='menu-item-price'>Menu Item Price</label>
                                                                                                                <input type='number' step='0.01' min='0' className='form-control mt-1' id='menu-item-price' defaultValue={elementContent.price} />
                                                                                                            </div>
                                                                                                            <div className='form-group'>
                                                                                                                <label htmlFor='menu-item-catagory'>Menu Item Catagory</label>
                                                                                                                <input type='text' className='form-control mt-1' id='menu-item-catagory' defaultValue={elementContent.catagory} />
                                                                                                            </div>
                                                                                                            <div className='d-flex'>
                                                                                                            <button className='btn btn-danger m-1' onClick={
                                                                                                                (e) => {
                                                                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                                                                }
                                                                                                            }>
                                                                                                                Close </button>
                                                                                                            <button className='btn btn-message m-1' type='submit'>
                                                                                                                Update
                                                                                                            </button>
                                                                                                        </div>

                                                                                                        </form>
                                                                                                    </div>
                                                                                                } />, container);
                                                                                            }
                                                                                        }>
                                                                                            <i className='fas fa-edit'></i>
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            })
                                                                        })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    , tableContainer);
                                        }, 1000);

                                    }
                                    }>
                                        <option>Select a menu</option>
                                        {
                                            storeMenu.map((menu, index) => {
                                                return <option key={index} value={menu.id}> { menu.name }</option>
                                            })
                                        }
                                    </select>
                                </div>


                                <div id='menu-table-container' className='mt-4'></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    );
}
