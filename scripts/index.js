// setup materialize components.
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.modal.init(modals);

    var items = document.querySelectorAll('.collapsible', function() {
        M.Collapsible.init(items);
    })
});