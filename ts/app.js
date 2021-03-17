const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const busqueda = document.querySelector('#busqueda');
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validateForm);
});
const validateForm = (e) => {
    e.preventDefault();
    if (busqueda.value.trim() === '') {
        printMessage('El campo de busquedad esta vacio');
        return;
    };
};
const printMessage = (message) => {
    const alert = document.querySelector('.alerta');
    if (!alert) {
        const divMessage = document.createElement('div');
        divMessage.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        divMessage.textContent = message;
        formulario.appendChild(divMessage);
        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    };
};
