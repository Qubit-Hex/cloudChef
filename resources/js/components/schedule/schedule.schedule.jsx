/*
 *
 *
 *  @file:  Schedule.Schedule.jsx
 *
 *
 *  @purpose: This component is the main component for the schedule.
 *
 *
 *  @responsibilities:
 *                       - Renders the schedule.
 *                       - It get the schedule data from the server.
 *                       - and checks permissions on each request to see weather we want to show the user schedule or the admin schedule.
 *
 *
 */


/**
 *
 *  @TODO: - Add the ability to edit the schedule.
 *      - Add the ability to delete the schedule.
 *      - Add the ability to add the schedule.
 *      - ALSO WE NEED TO REFACTOR WITH IT IS A WORKING SOLUTION.
 *        BUT LET'S REFINE IT LATER, SO ITS SYTAXICAL SUGAR. :)
 *
 */



import React, { Children } from "react";
import FetchServiceProvider from "../../lib/fetchServiceProvider";

// render the schedule for the api and render it to the screen.

/**
 *
 *  @function: <Network> getStoreSchedule
 *
 *
 *  @purpose: this is inorder to get the schedule for the store returning a promise containing our schedule data for use to work with in other functions.
 *
 */

const getStoreSchedule = (cookie, storeId, week) => {
    const headers = {
        "Content-Type": "application/json",
        accessToken: cookie,
    };

    const route = "/api/store/schedule/get";

    const fetchServiceProvider = new FetchServiceProvider();

    return fetchServiceProvider.get(route, headers);
};

/**
 *  @function ParseUserSchedule
 *
 *
 *  @purpose: this function is used inorder to parse the schedule data from the server. in a format the is usable in the front end.
 *
 *
 *  FIX: FIX THE METHOD INORDER TO FILL EMPTY SCHEDULE DATA. IF WE CANT FETCH CERTIN DAYS FROM THE SERVER...
 *       BUT I MIGHT ADD SOME SORT OF FAIL SAFE METHOD INORDER TO FILL THE SCHEDULE WITH EMPTY DATA. DIRECTLY FROM THE SERVER.
 *       NOT TOO SURE YET.. BUT I THINK IT IS A GOOD IDEA.
 */

const ParseUserSchedule = (props) => {
    const request = new FetchServiceProvider();
    const schedule = getStoreSchedule(request.getCookie("accessToken"), 1);

    const [data, setData] = React.useState([]);

    const [userTotalHours, setUserTotalHours] = React.useState(0);

    // update the state with the data from the server.
    React.useEffect(() => {
        schedule.then((res) => {
            setData(res.data);
        });
    }, []);

    // parse the total hours for the user.
    const parseTotalHours = () => {
        return <td>
            <span className='mt-4'>{userTotalHours}</span></td>;
    };

    // map the employeeID to a array Index that is sorted by the employeeID.

    const mapEmployeeID = (data) => {
        let employeeNumbers = data.map((employee) => {
            return employee.employeeID;
        });

        // remove duplicates from the array.
        employeeNumbers = employeeNumbers.filter((item, index) => {
            return employeeNumbers.indexOf(item) === index;
        });

        // attach employee Data to the employeeID number.
        let employeeData = [];
        employeeNumbers.forEach((employeeID) => {
            let employee = data.filter((employee) => {
                return employee.employeeID === employeeID;
            });

            employeeData.push(employee);
        });
        return employeeData;
    };

    return mapEmployeeID(data).map((item, index) => {
        return item;
    });
};

/**
 *
 * @function: parseTotalHours
 *
 * @purpose: this function is inorder to parse the total hours for the user and return it to the user in html format to be rendered to the screen.
 *
 */

const ParseTotalHours = (props) => {
    return <td>{props.hours}</td>;
};


const getEmployeeInfo = (employeeID) => {
    const api = new FetchServiceProvider();
    const headers = {
        "Content-Type": "application/json",
        accessToken: api.getCookie("accessToken"),
    };

    const route = "/api/store/employee/get/" + employeeID + "/";

    return api.get(route, headers);
}

/**
 *
 * @function: RenderProfile
 *
 *  @purpose: inorder to render the schedule profile to the screen.
 *
 */

const RenderProfile = (props) => {

    const [userProfile, setUserProfile] = React.useState([]);

    React.useEffect( async function () {
            getEmployeeInfo(props.data[0].employeeID).then((res) => {
                setUserProfile(res);
            });
        }, []);




    return (
        <td>
            <div className="col">
                <img
                    src={ userProfile.url }
                    className="profile-img-sm"
                    alt="user photo"
                />
            </div>

            <br />

            <div className="col">
                <span> { userProfile.name }</span>
            </div>

            <div className="col">
                <span className="role-badge badge badge-primary card-text-sub-text ml-1 bold">
                    { userProfile.department  }
                </span>
            </div>
        </td>
    );
}


/**
 *
 * @function: generateStoreMembersSchedule
 *
 * @purpose: this function is inorder to generate the schedule for the store members and return it to the user in html format to be rendered to the screen.
 *
*/


const GenerateStoreMembersSchedule = (props) => {
    const StoreSchedule = ParseUserSchedule(props);

    const [userTotalHours, setUserTotalHours] = React.useState(0);

    // here we will update the state with the total hours for the user.
    const calculateTotalHours = (data) => {

        let totalHours = 0;

        // map hour hours that the user has worked.
        let calc = data.map((item) => {

            if (item.is_off_day === 1) {
                return 0;
            }
            // if the user is working on a day that is not a off day.
            return item.end_time - item.start_time;
        });

        // sum all the numbers in the array we created.
        calc.forEach((item) => {
            totalHours += item;
        });

        // send an overTime message to the user if they have worked more than 40 hours.
        if (totalHours > 40) {

            return (<td className="card-text-sub-text">
                <div className='alert alert-warning' role='alert'>
                 <i className="fas fa-exclamation-triangle mt-2"></i>
                    <span> OverTime  </span>
                    <span className='ml-4 mt-2 text-center'>{ totalHours - 40 } Hours</span>
                </div>

                <span className='role-na badge badge-danger card-text-sub-text ml-1 bold'>
                        <p> { totalHours } </p>
                </span>


          </td>);
        }

        // send a normal message to the user if they have worked less than 40 hours or less
        return (<td className="card-text-sub-text">
            <span className='role-na badge badge-success card-text-sub-text ml-1  ml-1 bold'>
            {totalHours}
            </span>
        </td>);
    };

    // render the time badge based on the time.
    const renderTimeBadge = (time) => {
        if (time.is_off_day === 1) {
            return (
                <span className="role-danger badge badge-danger card-text-sub-text  bold">
                    {" "}
                    OFF{" "}
                </span>
            );
            return "OFF";
        } else if (time.is_open === 0) {
            return (
                <span className="role-na badge badge-danger card-text-sub-text bold">
                    {" UNAVAILABLE "}
                </span>
            )
        }

        else {
            // this is temporary. we will be changing to float values inorder to get the hours + the minutes.
            // of the schedule time.
            return (
                <span className="role-badge badge badge-success card-text-sub-text  bold">
                    {" "}
                    {time.start_time +
                        ":00" +
                        " - " +
                        time.end_time +
                        ":00"}{" "}
                </span>
            );
        }
    };

    // here we are going render the remaining table table data for each user
    // this is a <td> generator for the schedule. for each user. when going over the map function.
    const renderTable = (data) => {
        return data.map((item, index) => {
            return <td key={index}> {renderTimeBadge(item)}</td>;
        });
    };

    return StoreSchedule.map((employee, index) => {

        return (
            <tr key={index}>
                <RenderProfile data={employee} key={index}/>

                {/* call our functions inorder to complete the table row of the schedule component */}
                {renderTable(employee)}
                {calculateTotalHours(employee)}
            </tr>
        );
    });
};

/**
 *
 *  @function: SchedulePannel
 *
 *
 *  @description: This component is responsible for rendering the schedule of the organization.
 *
 */

export const SchedulePannel = (props) => {
    const { NetworkRequest } = new FetchServiceProvider();

    const request = new FetchServiceProvider();

    const { userCookie } = request.getCookie("accessToken");

    return (
        <table class="table mt-4">
            <thead>
                <tr>
                    <th scope="col"> Name </th>

                    <th scope="col"> Monday </th>
                    <th scope="col"> Tuesday </th>
                    <th scope="col"> Wednesday </th>
                    <th scope="col"> Thursday </th>
                    <th scope="col"> Friday </th>
                    <th scope="col"> Saturday </th>
                    <th scope="col"> Sunday </th>
                    <th scope="col"> Total Hours </th>
                </tr>
            </thead>
            <tbody id="wrapper_test">
                {/** call our rendering function to render the said schedule */}

                <GenerateStoreMembersSchedule
                    week={props.week}
                    year={props.year}
                >
                    {props.Children}
                </GenerateStoreMembersSchedule>
            </tbody>
        </table>
    );
};
