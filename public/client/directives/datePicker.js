(function () {
    angular
        .module("datePicker", [])
        .directive("datePicker", datePicker);

    function datePicker() {

        function link(scope, element, attrs) {
            element
                .datepicker({
                    format: 'mm/dd/yyyy',
                    startDate: '01/01/2010',
                    endDate: '12/30/2020'
                });
        }
        return {
            link: link
        };

    }
})();