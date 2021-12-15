/**
 * 
 *  @class: proccessScheduler 
 * 
 *  @description: inorder to schedule the proccesses
 */




class proccessScheudler {

    /**
     *  @function: constructor
     * 
     *  @description: constructor of the proccessScheduler class
     */


    constructor(timeOutQuene)
    {
        this.timeOutQuene = timeOutQuene;
        this.proccesses = {};
    }


    /**
     * 
     *  @function: addProccess
     * 
     *  @purpose: inorder to add a proccess to the proccessScheduler
     * 
     */

    addProccess(proccess)
    {
       return this.proccesses.push(proccess);
    }

    removeProccess(proccess)
    {
      return  this.proccesses.shift(proccess);
    }


    /**
     * 
     * 
     * 
     */

    schedule() {
        processes = this.proccesses;
        
        for (let i = 0; i < processes.length; i++) {
            
        }
    }
}