formulario = document.getElementById('form-gasto');

const presupuesto = parseFloat(prompt('Ingresa tu presupuesto'));

class Presupuesto{
    constructor(total){
        this.total = total;
    }

    agregaPresupuesto(){
        const padre = formulario;
        const pres = document.getElementById('presupuesto');
        pres.innerHTML = `
            <div class="mt-4 alert alert-info">
                <strong>Presupuesto:</strong> $${this.total}
            </div>
        `;
        padre.appendChild(pres);
    }

    agregarRestante(cantidad){
        const padre = formulario;
        let restante = document.getElementById('restante');
        this.total -= cantidad;
        if(this.total > (presupuesto*0.5)){
            restante.innerHTML = `
                <div class="alert alert-success mt-3">
                    <strong>Restante:</strong> $${this.total}
                </div>
            `;
        }
        else if(this.total > (presupuesto*0.3)){
            restante.innerHTML = `
                <div class="alert alert-warning mt-3">
                    <strong>Restante:</strong> $${this.total}
                </div>
            `;
        }
        else{
            restante.innerHTML = `
                <div class="alert alert-danger mt-3">
                    <strong>Restante:</strong> $${this.total}
                </div>
            `;
        }
        padre.appendChild(restante);
    }
}

pres = new Presupuesto(presupuesto);
pres.agregaPresupuesto();

class Tarea{
    constructor(nombre, cantidad, presupuesto){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.presupuesto = presupuesto;
    }

    agregaTarea(){
        const padre = document.getElementById('gastos');
        let elemento = document.createElement('div');
        elemento.innerHTML = `
        <div class="card my-2">
            <div class="card-body d-flex flex-row align-items-center justify-content-between">
                <div>
                    <strong>${this.nombre}</strong>
                </div>
                <div>
                    <a class="btn btn-primary btn-sm">$${this.cantidad}</a>
                </div>
            </div>
        </div>
        `;
        padre.appendChild(elemento);
    }

    mostrarMensaje(){
        const div = document.createElement('div');
        div.className = `alert alert-danger text-center mt-3`;
        div.appendChild(document.createTextNode('Completa los campos por favor.'));
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

}


// event listeners 

// al agregar tarea
formulario.addEventListener('submit', capturaDatos);


// funciones para los event listeners
function capturaDatos(e){
    e.preventDefault();

    const nombre = document.getElementById('nombre-gasto').value;
    const cantidad = document.getElementById('cantidad-gasto').value;

    let tarea = new Tarea(nombre, cantidad, presupuesto);

    if(nombre==='' || cantidad===NaN){
        return tarea.mostrarMensaje();
    }

    tarea.agregaTarea();
    formulario.reset();
    pres.agregarRestante(cantidad);
}
