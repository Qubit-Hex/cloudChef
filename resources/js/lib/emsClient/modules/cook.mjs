/**
 *
 *  @module emsClient.modules.cook
 *
 *
 *  @author purpose of this module is the get the cooks data and get a employee score to that cook
 *          in order to track his movements inside of a organization...
 *
 *
 */

export class _cook {

     constructor()
    {

    }

    /**
     *
     *  @method: score
     *
     *  @purpose: inorder to algorithmically detrime if a cook is a good employee
     *
     */
    score(employeeData)
    {
        // this will return the employee score
        const sales = employeeData.sales;
        const complaints = employeeData.complaints;
        const billTime = employeeData.billTime;
        const cleanliness = employeeData.cleanliness;
        const attendance = employeeData.attendance;

        /**
         *
         *  @algorithm: cookEvaluation
         *
         *  @purpose: inorder to get the cook score
         *
         *  @overview: this will be the algorithm that will be used to get the cook score
         *
         */

        function salesBoardGeneration (sales)
        {
            // data should be 2d `array`

            // this will be the sales boar

            const salesBoard = [];

            const range = (value1, value2) => {

                // first let round both of the numbers
                const numberStart = Math.round(value1);
                const numberEnd = Math.round(value2);
                const range = [];

                for (let i = numberStart + 1; i <= numberEnd; i++) {
                    range.push(i);
                }
                return range;
            }
            let populateNumbers = [];

            for (let i = 0; i < sales.length; i++)
            {
                let method = sales[i];
                // create a range of sales -30% to + 30%
                let range1 = method * 0.3;
                let range2 = method * 0.3 + sales[i];
                let absoluteRange = range(range1, range2);

                populateNumbers.push(absoluteRange);
            }

            return populateNumbers;
        }

        // roange of sales lets get a general average

        function complaintBoardGeneration (complaints)
        {
            // data should be 2d `array`
            // this will be the sales boar

            const complainBoard = [];
            const range = (value1, value2) => {

                // first let round both of the numbers
                const numberStart = Math.round(value1);
                const numberEnd = Math.round(value2);

                const values  = [];

                for (let i = numberStart; i <= numberEnd; i++) {

                    if (numberStart === 0) {
                        // check is numberEnd 0
                        if (numberEnd === 0) {
                            values.push(0);
                        }
                    }
                    values.push(i);
                }

                return values;
            }

            let populateNumbers = [];
            for (let i = 0; i < complaints.length; i++) {
               const pAvg = complaints[i];
               const pInflation = complaints[i] * 0.3; //  increase this range by 30%
                const pRange = range(pAvg, pInflation);
                populateNumbers.push(pRange);
            }

            return populateNumbers;
        }

        const cBoard = complaintBoardGeneration(complaints);



        function avgBillTime (billTime)
        {
            // data should be 2d `array`
            // this will be the sales boar
            const billTimeBoard = [];
            const range = (value1, value2) => {

                // first let round both of the numbers
                const numberStart = Math.round(value1);
                const numberEnd = Math.round(value2);

                const values  = [];

                for (let i = numberStart; i <= numberEnd; i++) {


                    values.push(i);
                }

                return values;
            }

            let populateNumbers = [];
            for (let i = 0; i < billTime.length; i++) {
               const pAvg = billTime[i];
               const pInflation = billTime[i] * 1.25; //  increase this range by 30%
                const pRange = range(pAvg, pInflation);

                populateNumbers.push(pRange);
            }

            return populateNumbers;
        }

        return avgBillTime(billTime);
    }
}
