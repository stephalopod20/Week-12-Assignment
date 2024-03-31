/*
Create a full CRUD application of your choice using an API or JSON Server.
Use JQuery/AJAX to interact with the API. 
Use a form to post new entities.
Build a way for users to update or delete entities.
Include a way to get entities from the API.
Use Bootstrap and CSS to style your project.
*/

const urlEndpoint = 'https://6605d5ddd92166b2e3c2df20.mockapi.io/api/week12/seaCreatures'

//Read - HTTP verb GET 
$.get(urlEndpoint).then(data => {
    data.map(creature => {              //loops through all creatures to grab the info
        $('tbody').append(          //adds them to the table with their own rows
            $(`
            <tr>
                <td>${creature.id}</td>
                <td>${creature.name}</td>
                <td>${creature.species}</td>
                <td>${creature.isCephalopod}</d>
                <td><button onclick="flushCreature(${creature.id})" id="flush" class="btn btn-danger">🗑</button></td> 
            </tr>
            `)
          )
        })
    });

    //Create - HTTP verb POST
$('#addToAquarium').click(function () {    //button works, click deprecated but?
    $.post(urlEndpoint, {
        name: $('#name').val(),
        species: $('#species').val(),
        isCephalopod: $('#isCephalopod').is(':checked') //OMG IT'S THIS
    })
})


//Delete - HTTP verb DELETE
//It's not refreshing automatically :(
function flushCreature(id) {
    console.log(`Deleting creature with ID #${id}...`);
    $.ajax(`${urlEndpoint}/${id}`, {                  //targets a specific line
        method: 'DELETE'
    })   
}

//It's not updating and I don't know why :(
function updateCreature() {
    let id = $('#creatureId').val();  //grabs user input for id

    $.ajax(`${urlEndpoint}/${id}`, {  //grabs matching id from url
        method: 'PUT',
        data: {
            name: $('#updateName').val(),
            species: $('#updateSpecies').val(),
            isCephalopod: $('#updateCephalopod').is(':checked'),
        }
    })
}

$('#updateCreatureBtn').click(updateCreature)


