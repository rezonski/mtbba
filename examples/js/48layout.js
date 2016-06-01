function makePopupForm(countries, mountains, types) {

    var tempElement = '';
    countries.forEach(function(country) {
        tempElement += '<span class="countrylabel">' + country.name + ' (' + country.total + ')</span><br>';
        mountains.forEach(function(mountain) {
            if (mountain.id_parent === country.id) {
                tempElement += '<input id="mntcheckbox' + mountain.id + '" type="checkbox" onClick="selectMnt(' + mountain.id + ')" name="' + mountain.name + '" value="' + mountain.id + '">' + mountain.name + ' - ' + mountain.region + ' (' + mountain.total + ')<br>';
            }
        });
    });

    var typeElement = '';
    types.forEach(function(type) {
        typeElement += '<input type="radio" id="typeradio' + type.id + '" onClick="selectType(' + type.id + ')" name="' + type.name + '" value="' + type.id + '">' + type.name + ' - ' + type.desc + '<br>';
    });
    
    document.getElementById('popupform').innerHTML = 
`<form action="#" id="form" method="post" name="form">
    <label for="trailname">Naziv traila</label><br>
    <input id="trailname" name="name" placeholder="Naziv staze" type="text" size="38"><br>
    <label for="traildescription">Opis traila</label><br>
    <textarea id="traildescription" name="description" placeholder="Opis staze" rows="6" cols="40"></textarea><br>
    
    <label for="idplanine">Odaberi planinu</label><br>
    <div id="listaplanina">
        <form action="" id="idplanine" name="idplanine">${tempElement}</form>
    </div>
    
    <label for="tiptraila">Odaberi tip staze</label><br>
    <div id="listatipova">
        <form action="" id="tiptraila" name="tiptraila">${typeElement}</form>
    </div>

    <label for="tiptraila">Sastav traila</label><br>
    <div id="sastavtraila">
        <form action="" id="tiptraila" name="tiptraila">
            <textarea disabled id="sastavtrailatext" name="sastavtrailatext" placeholder="[[1.5, 'M'],[4.5, 'M'],[5.5, 'A'],[7.1, 'S'],[8.5, 'N'],[11.5, 'M'],[13.5, 'S'],[14.5, 'S']]" rows="2" cols="40"></textarea><br>
            <input id="sastavodometar" name="sastavodometar" type="text" size="4" placeholder="km"> km
            <input id="sastavtype" list="podloga" name="podloga" type="text" size="4">
            <datalist id="podloga">
                <option value="A">Asfalt</option>
                <option value="M">Makadam</option>
                <option value="S">Staza</option>
                <option value="N">Nevozljivo</option>
            </datalist>
            <button type="button" onclick="handleSastav()">+/-</button>
            <br>
        </form>
    </div>
</form>`;
}

function makeWaypointsEditor(inWaypoints) {
    var container = document.getElementById('waypointscontainer');
    var tempWp = {};
    var tempElement = '';  
     inWaypoints.forEach(function(wp, wpindex) {
        if (wpindex < (inWaypoints.length - 1)) {
            tempWp = {
                current: wp,
                next: inWaypoints[wpindex+1]
            }
        } else {
            tempWp = {
                current: wp,
                next: null
            }
        }
        tempElement += '<form action="#" class="waypointform" id="form' + wpindex + '" name="form' + wpindex + '">';
        tempElement += 'ID: <input type="text" size="1" id="id' + wpindex + '" value="' + wp.id + '">';
        tempElement += ' Put: <input type="text" size="2" id="odometer' + wpindex + '" value="' + wp.odometer + '"> [km]';
        tempElement += ' Visina: <input type="text" size="2" id="elevation' + wpindex + '" value="' + wp.elevation + '"> [mnv]<br>';
        tempElement += 'Ime: <input type="text" size="20" id="name' + wpindex + '" value="' + wp.name + '">';
        tempElement += ' Visinski profil: <input type="checkbox" id="elevationprofile' + wpindex + '" value="' + wp.elevationprofile + '" ' + ((wp.elevationprofile === 1) ? 'checked' : '') + '><br>';
        tempElement += 'Pikto: <input type="text" size="12" id="pictogram' + wpindex + '" value="' + wp.pictogram + '">';
        tempElement += ' Tacka: <select id="pointtype' + wpindex + '" onchange=changeWpointType(' + wpindex + ')>';
        pointtypesArray.forEach(function (pointtype, pointindex) {
            tempElement += '<option value="' + pointtype.symbol_code +'" ' + ((pointtype.symbol_code === wp.symbol) ? 'selected' : '') + '>' + pointtype.desc +'</option>';
        })
        tempElement += '</select><br>';
        tempElement += '<textarea  rows="5" cols="41" id="desc' + wpindex + '">' + wp.desc + '</textarea><br>';
        tempElement += 'Foto URL: <input type="text" size="27" id="pictureurl' + wpindex + '" value="' + wp.pictureurl + '">';
        tempElement += '<textarea  rows="5" cols="41" id="desc' + wpindex + '">' + generateDesc(tempWp) + '</textarea><br>';
        tempElement += '</form><hr>';
     });

    container.style.display = 'block';
    container.innerHTML = tempElement;
    document.getElementById('buttonwpoints2db').disabled = false;

}