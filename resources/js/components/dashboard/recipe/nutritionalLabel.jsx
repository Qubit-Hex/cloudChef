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
            <b> Serving Size: {props.data.servingSize }  {/* serving size information goes here  */}</b>
            <div  className='mt-2 mb-2' style={{
                borderBottom: '10px solid #000',
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
                                    <span className='text-start w-25'> Fat  { props.data.totalFat + " g " }</span>
                                    <span className='text-end w-75'> { props.data.totalFatPercentage + "%" }  </span>
                                </div>

                                        <ul className='list-group-flush'>
                                            <li className='list-group-item'>
                                             <div className='row'>
                                                <span className='text-start w-25'> Saturated Fat  { props.data.saturatedFat + " g " } </span>
                                                <span className='text-end w-50'> { props.data.saturatedFatPercentage + " % "} </span>
                                             </div>
                                          </li>

                                          <li className='list-group-item'>
                                                <div className='row'>
                                                    <span className='text-start w-25'> Trans Fat { props.data.transFat + " g " } </span>
                                                    <span className="text-end w-50"> { props.data.transFatPercentage + " % " }</span>
                                                </div>
                                          </li>
                                        </ul>
                            </li>
                            {/** end of fat section  */}

                            <li  className='list-group-item'  style={{
                                    borderBottom: '1px solid #ccc',
                                    padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Cholesterol { props.data.cholesterol + " mg " }  </span>
                                    <span className='text-end w-75'> { props.data.cholesterolPercentage  + " % " }   </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Sodium  { props.data.sodium + " mg " }   </span>
                                    <span className='text-end w-75'>  { props.data.sodiumPercentage + " % " } </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Potassium  { props.data.potassium  + " mg "} </span>
                                    <span className='text-end w-75'>{ props.data.potassiumPercentage + " % " }  </span>
                                </div>
                            </li>
                            <li className='list-group-item'  style={{
                                borderBottom: '1px solid #ccc',
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-50'> Total Carbohydrate  { props.data.totalCarb + " g " } </span>
                                    <span className='text-end w-50'> { props.data.totalCarbPercentage + " % " } </span>
                                </div>

                                {/** types of carbs  */}
                                <ul className='list-group-flush'>
                                    <li className='list-group-item'>
                                        <div className='row'>
                                            <span className='text-start w-25'> Dietary Fiber  { props.data.fiber + " g " }  </span>
                                            <span className='text-end w-50'> { props.data.fiberPercentage + " % " } </span>
                                        </div>
                                    </li>
                                    <li className='list-group-item'>
                                        <div className='row'>
                                            <span className='text-start w-25'> Sugars  { props.data.sugar + " g " } </span>
                                            <span className='text-end w-50'> { props.data.sugarPercentage + " % " }  </span>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='list-group-item'  style={{
                                padding: '5px'}}>
                                <div className='row' style={{fontWeight: '600'}}>
                                    <span className='text-start w-25'> Protein  { props.data.protein + " g "} </span>
                                    <span className='text-end w-75'> { props.data.proteinPercentage  + " % "}  </span>
                                </div>

                            </li>
                            <div style={{
                                        borderBottom: '10px solid #000',
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



