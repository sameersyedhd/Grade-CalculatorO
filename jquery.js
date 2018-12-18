$(document).ready(function () {



    var tableNumber = 1;
    var tableArray = new Array()

    $("#new-unit").click(function () {

        var table = ''
        tableLocalNumber = ('#table' + tableNumber);
        tableArray.push(tableLocalNumber)
        var unitName = '';

        unitRow = "<tr> <td> <input type='text' class='unit-name' placeholder='Unit code:'> </input></td> <td></td> <td> <button class='delete-unit'> x </button></td> </tr>";
        calculaterow = "<tr class = 'calculate-row'> <td> <h5 class='' > Your final result is:  </h5> </td> <td> <h1' class='result'> __________ </h1> </td> <td> <button class='calculate'> Calculate </button></td> </tr>"
        newLine = "<td> <button class='new-line'> + </button> <button class='delete-line'> - </button> </td>"
        // combined into new-line deleteLine = "<td> </td>"
        // combined with unit-row deleteUnit = "<td> <button class='delete-unit'> Delete Unit</button></td>"
        row = "<tr class='ass-row'><td><input type='text' class='assessment' placeholder='Assessment name:'> </input></td><td><input type='number' class='weight' placeholder='Weight %' min='0' max='100'> </input></td><td><input type='number' class='score' placeholder='Score %' min='0' max='100'></input></td></tr>";

        table += unitRow;
        for (var i = 0; i < 5; i++) {
            table += row
        }
        table += newLine
        table += calculaterow

        //table += deleteUnit

        $('<td> <table id=table' + tableNumber + ' >' + table + '</table> </td>').appendTo('#unit-schedule')

        //function to insert new line
        $(tableLocalNumber + ' .new-line').click(function () {
            tableElement = $(this).parent().parent().parent().parent();
            // $(row).insertBefore("#table1 .calculate-row");
            $(row).insertAfter((tableElement.find('.ass-row:last')))
        })

        //function to delete unit
        $(tableLocalNumber + ' .delete-unit').click(function () {
            tableElement = $(this).parent().parent().parent().parent().parent();
            tableElement.remove();
        })

        //function to delete line
        $(tableLocalNumber + ' .delete-line').click(function () {
            tableElement = $(this).parent().parent().parent().parent();
            var junk = $(tableElement.find('tr:last')).prev().prev()
            if ($(tableElement.find('tr')).length > 3) {
                junk.remove();
            }
        })

        //function to calculate the results
        $(tableLocalNumber + " .calculate").click(function () {
            tableElement = $(this).parent().parent().parent().parent();
            var weight = new Array()
            var score = new Array()
            var result = 0
            //create an array with the weightage
            $(tableElement.find('.weight')).each(function () {
                weight.push($(this).val())
            })
            //create an array with the scores
            $(tableElement.find('.score')).each(function () {
                score.push($(this).val())
            })
            //calculate results totals
            $(tableElement.find('.score')).each(function (index) {
                result += ((weight[index] / 100) * score[index])
            })
            //$('assessment-row').appendTo('body');
            $($(tableElement.find('.result'))).html(result + '%')

            if (result > 100 || result < 0) {
                $($(tableElement.find('.result'))).css({
                    "color": 'red'
                });

            }
        })

        //function to auto-calculate
        $(tableLocalNumber + ' .weight').keyup(function () {
            console.log('fuck jim') // get the current value of the input field.
            tableElement = $(this).parent().parent().parent().parent();
            $(tableElement.find('.calculate')).trigger("click")

            weight = tableElement.find('.weight').val()

        if (weight > 100 || weight < 0) {
            $(tableElement.find('.weight')).css({ "color": 'red'});
        }

        if (weight < 100 && weight > 0) {
            $(tableElement.find('.weight')).css({ "color": 'black'});
        }

    })


    //function to auto-calculate
    $(tableLocalNumber + ' .score').keyup(function () {
        tableElement = $(this).parent().parent().parent().parent();
        $(tableElement.find('.calculate')).trigger("click")

        score = tableElement.find('.score').val()


        if (score > 100 || score < 0) {
            $(tableElement.find('.score')).css({ "color": 'red'});
        }

        if (score < 100 && score > 0) {
            $(tableElement.find('.score')).css({ "color": 'black'});
        }
        saveSettings();


        
    })


    function loadSettings() {
        console.log('fuk karen')
        tableElement = $(this).parent().parent().parent().parent();
        $(tableElement.find('.unit-name')).val(localStorage.unitName);

    }
    loadSettings();
    //save settings
    function saveSettings() {
        tableElement = $(this).parent().parent().parent().parent();
        localStorage.unitName = $(tableElement.find('.unit-name')).val();
        console.log('fuck michael')

    }
    tableNumber += 1;

})


for (var i = 0; i < 4; i++) {
    $("#new-unit").trigger("click");
}





})