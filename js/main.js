document.addEventListener("DOMContentLoaded", function () {
    let idBtnSend= document.getElementById("idBtnSend");
    idBtnSend.addEventListener('click', sendForm);

    let idBtnCancel= document.getElementById("idBtnCancel");
    idBtnCancel.addEventListener('click', cleanForm);

    let idBtnShowMsg= document.getElementById("idBtnShowMsg");
    idBtnShowMsg.addEventListener('click', showMsg);
    

    let radios=document.getElementsByName("tipoDoc");
    for (let index = 0; index < radios.length; index++) {
        radios[index].addEventListener('click', function () {
            cleanMsgError(null,idTipoDocMsgError);
            let idNumberDoc = document.getElementById("idNumberDoc");
            idNumberDoc.removeAttribute("disabled");
        });       
    }
});


let idName= document.getElementById('idName');
let idNameMsgError = document.getElementById("idNameMsgError");

let idLastName=document.getElementById('idLastName');
let idLastNameMsgError = document.getElementById("idLastNameMsgError");
let idTipoDocMsgError = document.getElementById("idTipoDocMsgError");

let idNumberDoc=document.getElementById('idNumberDoc');
let idNumberDocMsgError = document.getElementById("idNumberDocMsgError");

let idAdressCategory=document.getElementById('idAdressCategory');
let idAdressMsgError = document.getElementById("idAdressMsgError");

let idCodigoPostal=document.getElementById('idCodigoPostal');
let idCodigoPostalMsgError = document.getElementById("idCodigoPostalMsgError");

let idLabelEmail=document.getElementById('idLabelEmail');
let idEmailMsgError = document.getElementById("idEmailMsgError");

let idEdad=document.getElementById('idEdad');
let idEdadMsgError = document.getElementById("idEdadMsgError");

let idNacionalidad=document.getElementById('idNacionalidad');
let idNacionalidadMsgError = document.getElementById("idNacionalidadMsgError");

let idDni=document.getElementById('idDni');
let idCuil=document.getElementById('idCuil');
let validForm=true;
let nroError=0;

const showMsgError = (htmlElement,htmlElementMsg, msg) => {
    cleanMsgError(htmlElement,htmlElementMsg);
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'true');
    htmlElementMsg.innerText = msg;
    htmlElementMsg.style.display = "block";
    validForm = false;
    htmlElementMsg.classList.remove("hidden");
    htmlElementMsg.classList.add("animation");
}

const cleanMsgError = (htmlElement,htmlElementMsg) => {
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'false');
    htmlElementMsg.innerText = "";
    htmlElementMsg.style.display = "none";
    htmlElementMsg.classList.remove("animation");
    htmlElementMsg.classList.add("hidden");
}

const showMsg = (e) => {
    e.preventDefault();
    let contactos="<strong>Contactos almacenados:</strong><br><br>";
    let allMsgs= JSON.parse(localStorage.getItem('msgs'));
    for (let index = 0; index < allMsgs.length; index++) {
        contactos=contactos+"<strong>Contacto N° " + (index+1) +"</strong> <br>";
        contactos=contactos+"Nombre: <strong>" + allMsgs[index].name +"</strong> <br>";
        contactos=contactos+"Apellido: <strong>" + allMsgs[index].lastName +"</strong> <br>";
        contactos=contactos+"<strong>" + allMsgs[index].tipoDoc +"</strong> <br>";
        contactos=contactos+"Nro: <strong>" + allMsgs[index].nroDoc +"</strong> <br>";
        contactos=contactos+"Dirección: <strong>" + allMsgs[index].adress +"</strong><br> ";
        contactos=contactos+"Código Postal: <strong>" + allMsgs[index].cp +"</strong> <br>";
        contactos=contactos+"E-mail: <strong>" + allMsgs[index].email +"</strong><br> ";
        contactos=contactos+"Edad: <strong>" + allMsgs[index].edad +"</strong> <br>";
        contactos=contactos+"Nacionalidad: <strong>" + allMsgs[index].nacionalidad +"</strong> ";
        contactos=contactos+"<br><br>";   

    }
    mostrarPopup(contactos);
}

const cleanForm = (e) => {
    e.preventDefault();
    var inputCollection=document.getElementsByTagName("input");
    var textareaCollection=document.getElementsByTagName("textarea");
    var errorsCollection=document.getElementsByClassName("erroMessage");
    for (let index = 0; index < inputCollection.length; index++) {
        inputCollection[index].value="";
    }
    for (let index = 0; index < textareaCollection.length; index++) {
        textareaCollection[index].value="";
    }
    for (let index = 0; index < errorsCollection.length; index++) {
        errorsCollection[index].classList.remove("animation");
        errorsCollection[index].classList.add("hidden");
        errorsCollection[index].innerText = "";
        errorsCollection[index].style.display = "none";
    }
}

const validateName = (string) => {
    if (verificarNoVacio(string)){ 
        if(verificarCaracteresAlfabeticos_LM_Espacio(string)){        
            if(validarLongitudCadena(idName.value, 3, 20)){               
                cleanMsgError(idName,idNameMsgError);  
            } 
            else {
                let msg="Mínimo 3 caracteres y Máximo 10";
                showMsgError(idName,idNameMsgError,msg);
                almacenarError("<strong>Nombre</strong> Mínimo 3 caracteres y Máximo 10"); 
            }
        }
        else
        {
            let msg="Solo se permiten caracteres alfabéticos y las únicas letras que pueden ser mayúscula son las primeras";
            showMsgError(idName,idNameMsgError,msg);
            almacenarError("<strong>Nombre</strong> Solo se permiten caracteres alfabéticos y las únicas letras que pueden ser mayúscula son las primeras"); 
        }   
    }
    else
    {
        cleanMsgError(idName,idNameMsgError);  
    }
}

const validateLastName = (string) => {
    if (verificarNoVacio(string)){
        if(verificarCaracteresAlfabeticos_SE_caracteres_Espacio(string)){        
            if(validarLongitudCadena(idLastName.value, 2, 20)){                              
                cleanMsgError(idLastName,idLastNameMsgError);
            } 
            else {
                let msg="Mínimo 2 caracteres y Máximo 20";
                showMsgError(idLastName,idLastNameMsgError,msg);
                almacenarError("<strong>Apellido</strong> Mínimo 2 caracteres y Máximo 20"); 
            }
        }
        else
        {
            let msg="Solo se permiten caracteres alfabéticos incluyendo ´ o '";
            showMsgError(idLastName,idLastNameMsgError,msg);
            almacenarError("<strong>Apellido</strong> Solo se permiten caracteres alfabéticos incluyendo ´ o '");
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idLastName,idLastNameMsgError,msg);     
        almacenarError("<strong>Apellido</strong> Campo Obligatorio");    
    }
}

const validateTipoDocumento = () => {
    let selected=false;
    let radios=document.getElementsByName("tipoDoc");
    for (let index = 0; index < radios.length; index++) {
       if(radios[index].checked)
            selected=true;
    }
    if(!selected)
    {
        let msg="Debe seleccionar un Tipo de Documento";
        showMsgError(null,idTipoDocMsgError,msg);
        almacenarError("<strong>Tipo Documento</strong> Debe seleccionar un Tipo de Documento");
    }
    else
        cleanMsgError(null,idTipoDocMsgError);  
}

const validateNroDoc = (string) => {
    if (verificarNoVacio(string)){             
        if(validarDoc(idNumberDoc.value)){ 
            cleanMsgError(idNumberDoc,idNumberDocMsgError);  
        } 
        else {
            let msg="Solo se permiten 7 u 8 digitos (ej. '1.234.567', '12.234.567', '1234567', '12345678')";
            showMsgError(idNumberDoc,idNumberDocMsgError,msg);
            almacenarError("<strong>Nro Documento (dni)</strong> Solo se permiten 7 u 8 digitos (ej. '1.234.567', '12.234.567', '1234567', '12345678')"); 
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idNumberDoc,idNumberDocMsgError,msg);
        almacenarError("<strong>Nro Documento (dni)</strong> Campo Obligatorio");          
    }
}

const validateNroCuil = (string) => {
    if (verificarNoVacio(string)){             
        if(validarCuil(idNumberDoc.value)){ 
            cleanMsgError(idNumberDoc,idNumberDocMsgError);  
        } 
        else {
            let msg="Solo se permiten 11 o 13 digitos (ej. '20-30241956-7', '20302419567')";
            showMsgError(idNumberDoc,idNumberDocMsgError,msg);
            almacenarError("<strong>Nro Documento (cuil)</strong> Solo se permiten 11 o 13 digitos (ej. '20-30241956-7', '20302419567')"); 
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idNumberDoc,idNumberDocMsgError,msg);        
        almacenarError("<strong>Nro Documento (cuil)</strong> Campo Obligatorio"); 
    }
}

const validateDireccion = (string) => {
    // alert("-"+string+"-");
    if (verificarNoVacio(string)){             
        if(validarLongitudCadena(idAdress.value, 2, 200)){                              
            cleanMsgError(idAdress,idAdressMsgError);
        } 
        else {
            let msg="Mínimo 2 caracteres y Máximo 200";
            showMsgError(idAdress,idAdressMsgError,msg);
            almacenarError("<strong>Dirección</strong> Mínimo 2 caracteres y Máximo 200");    
        }       
    }else{
        cleanMsgError(idAdress,idAdressMsgError);      
    }
}

const validateEdad = (string) => {
    if (verificarNoVacio(string)){             
        if(validarNumeroEnteroPositivo(idEdad.value)){ 
            cleanMsgError(idEdad,idEdadMsgError);  
        } 
        else {
            let msg="Solo se permiten Valores Enteros Positivos mayores que 0";
            showMsgError(idEdad,idEdadMsgError,msg);
            almacenarError("<strong>Edad</strong> Solo se permiten Valores Enteros Positivos mayores que 0"); 
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idEdad,idEdadMsgError,msg);    
        almacenarError("<strong>Edad</strong> Campo Obligatorio");      
    }
}

const validateCp = (string) => {
    if (verificarNoVacio(string)){             
        if(validarNumeroEnteroPositivo(idCodigoPostal.value)){ 
            cleanMsgError(idCodigoPostal,idCodigoPostalMsgError);  
        } 
        else {
            let msg="Solo se permiten Valores Enteros Positivos mayores que 0";
            showMsgError(idCodigoPostal,idCodigoPostalMsgError,msg);
            almacenarError("<strong>Código Postal</strong> Solo se permiten Valores Enteros Positivos mayores que 0");    
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idCodigoPostal,idCodigoPostalMsgError,msg);        
        almacenarError("<strong>Código Postal</strong> Campo Obligatorio");     
    }
}

const validateEmail = (string) => {
    if (verificarNoVacio(string)){            
        if(validarEmail(idEmail.value)){ 
            cleanMsgError(idEmail,idEmailMsgError);  
        } 
        else {
            let msg="E-mail inválido";
            showMsgError(idEmail,idEmailMsgError,msg);
            almacenarError("<strong>E-mail</strong> inválido");             
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(idEmail,idEmailMsgError,msg);
        almacenarError("<strong>E-mail</strong> Campo Obligatorio");        
    }
}

const saveMsg = (p) => {
    var allMsgs;
    if(localStorage.getItem('msgs'))
    allMsgs= JSON.parse(localStorage.getItem('msgs'));
    else
    allMsgs=[];
    allMsgs.push(p);
    localStorage.setItem('msgs', JSON.stringify(allMsgs));
    console.log(JSON.parse(localStorage.getItem('msgs')));
    showStickyMsg("Contacto guardado exitosamente...");
    cleanForm();
}

const almacenarError = (msg) => {
    nroError=++nroError;
    let errores=document.getElementById('idErrores');
    errores.innerHTML=`<strong>Error N° ${nroError}</strong> - ${msg}.<br>`  + errores.innerHTML; 
}

const sendForm = (e) => {
    e.preventDefault();
    validForm=true;  
    validateName(idName.value);
    validateLastName(idLastName.value);
    validateTipoDocumento();
    validateEdad(idEdad.value);
    validateCp(idCodigoPostal.value);
    validateEmail(idEmail.value);
    if(idDni.checked || idCuil.checked)
    {
        if(idDni.checked) validateNroDoc(idNumberDoc.value);
        else  validateNroCuil(idNumberDoc.value);
    }
   
    validateDireccion(idAdress.value);

    if(validForm){
        //Creo un nuevo msg que envío a LS
        const newMsg={
            name: idName.value.trim(),
            lastName: idLastName.value.trim(),
            tipoDoc:idDni.checked?  "DNI":"CUIL",
            nroDoc: idNumberDoc.value.trim(),
            adress:idAdress.value.trim() ,   
            cp:idCodigoPostal.value.trim() ,   
            email:idEmail.value.trim() ,   
            edad:idEdad.value.trim() ,   
            nacionalidad:idNacionalidad.value.trim() 
        }
        console.log(newMsg);
        saveMsg(newMsg);       
    }
}