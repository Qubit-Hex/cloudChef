/**
 *
 *  @file: recipeSearchModule.jsx
 *
 *
 *  @purpose: inorder to seperate the search functionaility.
 *
 */



import React from 'react';
import ReactDOM from 'react-dom';


export const RecipeSearchModule = (props) =>
{
    return (
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
    )
}
