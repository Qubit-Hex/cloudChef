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


import react from "react";
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


export const DashboardMenu = (props) => {

    return (



        <div className='container-fluid rm-pm dashboard-content'>

            {/** to hold the modals  */}
            <div id='modal-container'></div>
              <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='header-title'>Menu</h1>
                        <h2 className="header-subtitle text-center">Add, Edit, and Remove Menus</h2>
                        <img src='/img/SVG/Dog call.svg' className='mx-auto' width={350} height={350} />
                        <small className='text-muted text-center'> Add Menu's edit existing menus and menu items</small>

                    </div>
                    {/** sub title */}
                </div>

                <div className='row d-flex pos'>
                  <div className='col'>
                    <div className='card pos-button' onClick={
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
                                                                        <div>
                                                                            <img src='/img/SVG/store.svg' className='mx-auto' width={350} height={350} />
                                                                            <h3 className='header-subtitle text-center'>Successfully added the menu</h3>
                                                                            <h4 className='header-title'>
                                                                                Please enjoy you new menu!
                                                                            </h4>
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
                                                    } else {
                                                        // if the name is not valid then we will show an error message
                                                        // to the user
                                                        alert('The name must be at least 3 characters long and can only contain aphabets and numbers');
                                                    }

                                                }

                                            }>Add Menu</button>
                                        </div>
                                    </div>

                                } />, container);
                        }
                    }>
                        <div className='card-header'>
                            <h3 className='card-title'>Add Menu</h3>
                        </div>

                        <div className='card-body'>
                            <i className='fas fa-plus-circle fa-4x'></i>
                        </div>
                    </div>
                </div>


                    <div className='col'>
                        <div className='card pos-button' onClick={
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
                                                                        <input type='number' className='form-control mt-1' id='item-price' placeholder='Enter the item price' />
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

                                }, 3000);
                            }
                        }>
                        <div className='card-header'>
                            <h3 className='card-title'>Add Item</h3>
                        </div>
                        <div className='card-body'>
                            <i className='fas fa-edit fa-4x'></i>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <div className='card pos-button' onClick={
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
                                                        <div>
                                                            <h3 className='text-center text-danger' style={{
                                                                fontWeight: '600',
                                                                fontSize: '1.5rem'

                                                            }}>Are you sure you want to delete this menu?</h3>
                                                            <small className='text-muted text-center'> Please note that this action is irreversible </small>
                                                            <button className='btn btn-danger m-1' onClick={
                                                                (e) => {
                                                                    // send the request to the server
                                                                    return deleteMenu(menuID).then(response => {
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
                                                                <i  className="fas fa-trash-alt"></i>
                                                                    Delete Menu </button>
                                                            <button className='btn btn-message m-1' onClick={
                                                                (e) => {
                                                                    ReactDOM.unmountComponentAtNode(container);
                                                                }
                                                            }>Cancel</button>
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
                        <div className='card-header'>
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
                        <table className='table'>
                            {/** table structure item, catagory, price  */}
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                <td> Flank Steak</td>
                                <td> Entree </td>
                                <td> $12.00 </td>
                                <td className='d-flex'>
                                    <button className='btn btn-message m-1'> Edit </button>
                                    <button className='btn btn-danger m-1'> Delete </button>

                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>

    );
}
