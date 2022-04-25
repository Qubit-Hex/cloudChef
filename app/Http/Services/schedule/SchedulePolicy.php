<?php




/**
 *
 *  @class: SchedulePolicy
 *
 *
 *  @purpose: inorder to filter and validate request in our controller but also
 *            hiding back the general logic of how the filtering and validation is done
 *            from the controller. to provide a more modular and reusable code.
 *
 */


namespace App\Http\Services\schedule;

use App\Models\employeeModel;
use App\Models\scheduleGroup;


// grab the user policy
use App\Http\Services\users\userPolicy;


class SchedulePolicy extends userPolicy {
    // implement the policy filter and validation here...


    public function __construct($request)
    {
        parent::__construct($request);
        $this->employees = new employeeModel();
        $this->scheduleGroup = new scheduleGroup();
        $this->request = $request;
    }

    /**
     *
     *  @method: 
     *
     *
     */




}



?>
