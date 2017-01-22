// (function ($) {
'use strict';

let $students = $('.student-item'),
    perPage = 10,
    totalPages = (Math.ceil($students.length / perPage)),
    animTime = 450,
    searchArray = [];

var noStudentsMessage = $('<h3 class="no-result">No results for your search.</h3>').insertAfter($('.student-list'));

//search input
const searchHTML = `
    <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
    </div>
`;

//pagination buttons
const buttonsHTML = `
    <div class="pagination">
        <ul>
        </ul> 
    </div>
`;

$('.page').append(buttonsHTML);
$('.page-header').append(searchHTML);


//create array of searchable objects to filter
$students.each(function () {
    searchArray.push({
        student: this,
        name: $(this).find('h3').html().toLowerCase()
    });
})

/*=========================
 FUNCTIONS
 ========================== */

function hideStudents(el, start, end) {
    noStudentsMessage.fadeOut(animTime);
    if ($('.student-item:visible').length === 0) {
        noStudentsMessage.fadeIn(animTime);
    }
    el.hide().slice(start, end).fadeIn(animTime);
}

let createPageButtons = (total) => {
    let buttonsHTML = $('.pagination ul');
    buttonsHTML.empty();

    for (var i = 0; i < total; i++) {
        buttonsHTML.append(`
         <li>
            <button>${i + 1}</button>
         </li>
     `)
    };
    buttonsHTML.find('button').eq(0).addClass('active');
};

let showMsg = () => {

}


//init functions
hideStudents($students, 0, perPage);
createPageButtons(totalPages);


/*=========================
 EVENTS
 ========================== */

//when buttons clicked, show correct students
$('.pagination').on('click', 'button', function (e) {

    $('li button').removeClass('active');
    $(this).addClass('active');

    let end = 1 + (parseInt(this.innerHTML) * perPage),
        start = end - perPage;

    if (this.innerHTML === "1") {
        start = 0;
        end = 10;
    }

    hideStudents($students, start, end);
});


$('.student-search').on('click', 'button',function () {

    //store the search input
    let searchVal = $('input').val().trim().toLowerCase();
    
    //run function on every element in students array
    searchArray.forEach(function (i) {
        let index = 0,
            current = i.student;
        if(searchVal){
            //check if text is in current object, -1 = not found
            index = i.name.indexOf(searchVal)
        }

        // if indexOf returns -1, hide this element
        index === -1 ? $(current).hide() : $(current).fadeIn(animTime);
    });



    let pages = Math.ceil($('.student-item:visible').length / perPage);
    console.log($('.student-item:visible').length, pages,$('.student-item:visible') )
    hideStudents($('.student-item:visible'), 0, perPage);
    createPageButtons(pages);
});

// })(jQuery);



















