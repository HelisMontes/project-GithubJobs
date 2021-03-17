const formulario:any = document.querySelector('#formulario');
const resultado:any = document.querySelector('#resultado');
const busqueda:any = document.querySelector('#busqueda');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validateForm);
});

const validateForm = (e:any):void => {
    e.preventDefault();
    if(busqueda.value.trim() === ''){
        printMessage('El campo de busquedad esta vacio');
        return;
    };
    searchAPI(busqueda.value);
};

const printMessage = (message:string):void => {
    const alert:any = document.querySelector('.alerta');
    if(!alert){
        const divMessage:any = document.createElement('div');
        divMessage.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        divMessage.textContent = message;
        formulario.appendChild(divMessage);    
        setTimeout(() => {
            divMessage.remove();
        },3000);
    };
};

const searchAPI = (search:string):void => {
    const axios:any = ''///Creo la variable solo para quitar el error en ts
    const githubUrl:string = `https://jobs.github.com/positions.json?search=${search}`;
    const URL:string = `https://api.allorigins.win/get?url=${ encodeURIComponent( githubUrl) }`;
    axios.get(URL)
        .then(respuesta => showtJobs( JSON.parse( respuesta.data.contents) ) )
};

const showtJobs = (jobs:any[]) => {
    removeJobsHTML();
    if(jobs.length > 0) {
        resultado.classList.add('grid');
        jobs.map(vacante => {
            const { company, title, type, url} = vacante; 
            resultado.innerHTML += `
                <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-2xl font-light mb-4">${title}</h2>
                    <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
                </div>
            `;
        });
    } else {
        const noResultados = document.createElement('p');
        resultado.classList.remove('grid');
        noResultados.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
        noResultados.textContent = 'No Hay Resultados';
        resultado.appendChild(noResultados);    
    }
}

const removeJobsHTML = ():void => {
    while(resultado.firstChild){
        resultado.firstChild.remove();
    };
};