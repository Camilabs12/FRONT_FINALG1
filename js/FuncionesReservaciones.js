//GET, POST , PUT Y DELETE

function getReservaciones(){
    $.ajax({
        url:"http://155.248.209.163:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

function postReservaciones(){

    if ($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 || $("#status").val().length==0 || $("#select-car").val().length==0 || $("#select-client").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        car:{idCar: +$("#select-car").val()},
        client:{idClient: +$("#select-client").val()},
    };
    console.log(cajas);
    
    $.ajax({
        url:"http://155.248.209.163:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la reservación");
            window.location.reload();
        }
    });

}
}

function putReservaciones(idBotonActualizar){

    if ($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 || $("#status").val().length==0 || $("#select-car").val().length==0 || $("#select-client").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

        let cajas = {
            idReservation:idBotonActualizar,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            car:{idCar: +$("#select-car").val()},
            client:{idClient: +$("#select-client").val()},
        };
        
        $.ajax({
            url:"http://155.248.209.163:8080/api/Reservation/update",
            type:"PUT",
            datatype:"JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente la reservación");
                window.location.reload();
            }
        });
        }
        

}


function deleteReservaciones(idBoton){

    Swal.fire({
        title: 'Esta seguro de borrar la reservación? con el id:'+idBoton,
        text: "Si estas seguro se borrará definitivamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'La reservación se ha eliminado correctamente.',
            'success'
          )

    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://155.248.209.163:8080/api/Reservation/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            //alert("se ha borrado correctamente la reservación")
            window.location.reload();
        }
    });
    }
   })
    
}


/////////////////////////////////////

function getReservaciones_Car(){
    $.ajax({
        url:"http://155.248.209.163:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-car");
            $.each(respuesta, function (id,name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
                //console.log(name);
            });
        }

    });

}

function getReservaciones_Client(){
    $.ajax({
        url:"http://155.248.209.163:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-client");
            $.each(respuesta, function (id,name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                //console.log(name);
            });
        }

    });

}

////////////////////////////////////////
function pintarRespuesta(items){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td>"+items[i].car.brand+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].client.email+"</td>";
        myTable+="<td> <button onclick='putReservaciones("+items[i].idReservation+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button> " ;
        myTable+="<td> <button onclick='deleteReservaciones("+items[i].idReservation+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Borrar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}