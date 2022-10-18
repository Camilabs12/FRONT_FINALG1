//GET, POST , PUT Y DELETE

function getMensajes(){
    $.ajax({
        url:"http://155.248.209.163:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

function postMensajes(){

    if ($("#messageText").val().length==0 || $("#select-car").val().length==0 || $("#select-client").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        messageText:$("#messageText").val(),
        car:{idCar: +$("#select-car").val()},
        client:{idClient: +$("#select-client").val()},
    };
    console.log(cajas);
    
    $.ajax({
        url:"http://155.248.209.163:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
        }
    });

}
}

function putMensajes(idBotonActualizar){
    //console.log(idMessage);
    if ($("#messageText").val().length==0 || $("#select-car").val().length==0 || $("#select-client").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

        let cajas = {
            messageText:$("#messageText").val(),
            car:{idCar: +$("#select-car").val()},
            client:{idClient: +$("#select-client").val()},
        };
        
        $.ajax({
            url:"http://155.248.209.163:8080/api/Message/update",
            type:"PUT",
            datatype:"JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente el mensaje");
                window.location.reload();
            }
        });
    }
}



function deleteMensajes(idBoton){

    Swal.fire({
        title: 'Esta seguro de borrar el mensaje? con el id:'+idBoton,
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
            'El mensaje se ha eliminado correctamente.',
            'success'
          )

    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://155.248.209.163:8080/api/Message/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            //alert("se ha borrado correctamente el mensaje")
            window.location.reload();
        }
    });
    }
   })
    
}

/////////////////////////////////////

function getMensajes_Car(){
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

function getMensajes_Client(){
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
        myTable+="<td>"+items[i].messageText+"</td>";
        myTable+="<td>"+items[i].car.name+"</td>";
        myTable+="<td>"+items[i].car.brand+"</td>";
        myTable+="<td>"+items[i].client.name+"</td>";
        myTable+="<td>"+items[i].client.email+"</td>";
        myTable+="<td> <button onclick='putMensajes("+items[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button> " ;
        myTable+="<td> <button onclick='deleteMensajes("+items[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Borrar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}