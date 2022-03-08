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
 *  @param {  menuItem }
 *
 *
 *  @returns {Promise}
 */
const addMenuItem = (menuItem) => {


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
                                                <select className='form-control mt-2' id='menu-name'>
                                                    <option>Select a menu</option>
                                                    {

                                                      // check if the menuContent array is empty
                                                      // if it is then we will render a message


                                                        menuContent.length === 0 ?
                                                            <option>No menus available</option>
                                                            :
                                                            menuContent.map((menu, index) => {
                                                                return menu.map((item, index) => {
                                                                    return <option key={index} id={item.id} onClick={
                                                                        (e) => {
                                                                            // we are now going to call this menu and validate it.
                                                                            let menuID = e.target.id;
                                                                            // next we are going to call the server to check if we
                                                                            // have the correct permissions inorder to edit the menu
                                                                        }
                                                                    }>{item.name}</option>
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
                    <div className='card pos-button'>
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
