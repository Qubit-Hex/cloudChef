/**
 *
 *
 * @file:  nutritionalLabel.jsx
 *
 *
 *
 * @component: NutritionalLabel
 *
 *
 *  @purpose: inorder to generate nutritional labels for the recipes
 *            - this is a functional components so we depends on the props inorder to render the labels
 */

import react from "react";
import { ReactDOM } from "react";



/**
 *
 *   @component: NutritionalLabel
 *
 *   @purpose: inorder to generate nutritional labels for the recipes
 */

export const NutritionalLabel = (props) => {
    
    return (
        <section className='nutritional_facts border w-75 mx-auto d-block p-4'>
        <header className='nutritional_header'>
            <h1 className='text-center h3' style={{fontWeight: '700'}}> Nutritional Facts </h1>
            <b> Serving Size: {props.data.serving}  {/* serving size information goes here  */}</b>
            <div  className='mt-2 mb-2' style={{
                border: '7px solid #000',
            }}></div>
        </header>

        <main>
            {/* nutritional facts container goes here  */}
            {/** here we will display all information such as
             *  calories, fat, carbs, etc.
             */}
            <div className='container nutrition-container'>
                    <div className='row'>

                            <div className='content'>
                               <span> <b> Calories</b> <span> { props.data.calories  } </span></span>
                               <div className='mt-2 mb-2'></div>
                            </div>
                    </div>

                    <div className='row'>
                        <ul className='list-group-flush'>
                            <li className='list-group-item'>
                                <div className='row'>
                                    <b> <span className='text-end d-block'> Daily Value %</span></b>
                                </div>
                            </li>
                            {/** start of fat section  */}
                            <li className='list-group-item' style={{
                                    borderBottom: '1px solid #ccc',
                                    padding: '5px',
                               }}>
                                <div className='row' style={{
                                    fontWeight: '700',
                                }}>
                                    {/** align two text item on to left other to the left */}
                                    <span className='text-start w-25'> Fat  { props.data.fat.total }</span>
                                    <span className='text-end w-75'> { props.data.fat.percent }  </span>
                                </div>

                                        <ul className='list-group-flush'>
                                            <li className='list-group-item'>
                                             <div className='row'>
                                                <span className='text-start w-25'> Saturated Fat  { props.data.fat.saturated.total } </span>
                                                <span className='text-end w-50'> { props.data.fat.saturated.percent } </span>
                                             </div>
                                          </li>

                                          <li className='list-group-item'>
                                                <div className='row'>
                                                    <span className='text-start w-25'> Trans Fat { props.data.fat.trans.total } </span>
                                                    <span className="text-end w-50"> { props.data.fat.trans.percent }</span>
                                                </div>
                                          </li>
                                        </ul>
                            </li>
                            {/** end of fat section  */}

                            <li  className='list-group-item'  style={{
                                    borderBottom: '1px solid #ccc',
                                    padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Cholesterol { props.data.cholesterol.total }  </span>
                                    <span className='text-end w-75'> { props.data.cholesterol.percent }  </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Sodium  { props.data.sodium.total }   </span>
                                    <span className='text-end w-75'>  { props.data.sodium.percent } </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Potassium  { props.data.potassium.total } </span>
                                    <span className='text-end w-75'>{ props.data.potassium.percent }  </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Total Carbohydrate  { props.data.carbohydrates.total } </span>
                                    <span className='text-end w-75'> { props.data.carbohydrates.percent } </span>
                                </div>

                                {/** types of carbs  */}
                                <ul className='list-group-flush'>
                                    <li className='list-group-item'>
                                        <div className='row'>
                                            <span className='text-start w-25'> Dietary Fiber  { props.data.carbohydrates.fiber.total }  </span>
                                            <span className='text-end w-50'> { props.data.carbohydrates.fiber.percent } </span>
                                        </div>
                                    </li>
                                    <li className='list-group-item'>
                                        <div className='row'>
                                            <span className='text-start w-25'> Sugars  { props.data.carbohydrates.sugars.total } </span>
                                            <span className='text-end w-50'> { props.data.carbohydrates.sugars.percent }  </span>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='list-group-item'  style={{
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Protein  { props.data.protien.total } </span>
                                    <span className='text-end w-75'> { props.data.protien.percent }  </span>
                                </div>

                            </li>
                            <div style={{
                                        border: '8px solid #000',
                                        width: '100%',
                                        marginTop: '5px'
                                    }}> </div>
                            <li className='list-group-item'>
                                <small>
                                * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:
                                </small>
                            </li>
                        </ul>

                    </div>
             </div>
         {/* end of nutrition container  */}
        </main>
    </section>
    )

}



