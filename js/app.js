document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        nombre: '',
        asunto: '',
        mensaje: '',
    }

    
    //Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputNombre = document.querySelector('#nombre');
    const inputEmailCc = document.querySelector('#emailcc')
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    

    //Asignar eventos de validacion de formularios
    //blur --> Cuando cambio de input se ejecuta el callback o función
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputNombre.addEventListener('input', validar);
    inputEmailCc.addEventListener('input', validarEmailCc);
    formulario.addEventListener('submit', enviarEmail);
    
    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
    })
    
    function validar(e){
        
        if(e.target.value.trim() === ''){

            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;   
        }

        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            
           
                mostrarAlerta('El email no es valido', e.target.parentElement);
                email[e.target.id] = '';
                comprobarEmail();
                return;
           
        }

        limpiarAlerta(e.target.parentElement);

        //asignar valores
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        //Comprobar email
        comprobarEmail();
    }
    
    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);

        //Generar alerta HTML
        const error = document.createElement('P');


        //NOTA: Es mejor usar textContent en lugar de innerHTML cuando los datos vienen de API o bases de datos
        //Si usas innerHTML te arriesgas a un ataque de cross site scripting
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        //Inyectar error al formulario
        referencia.appendChild(error)
        
    }

    function limpiarAlerta(referencia){
       //comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');

        if(alerta){
            alerta.remove();
        }
        
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
       
        return resultado;
        
    }

    function comprobarEmail(){
       //console.log(email);


        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled=true;
            return;
        }
        
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled=false;
    }

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white','p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);


            setTimeout(()=>{
                alertaExito.remove();
            }, 2000)

        }, 3000);

        resetFormulario();


    }

    function resetFormulario(){
        email.email = '';
        email.asunto = '';
        email.nombre = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();

    }

    function validarEmailCc(e){
        if(e.target.value !== '' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled=true;
            
            return;
        }

        limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        
    }

    
})