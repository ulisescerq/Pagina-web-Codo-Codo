const selectedItems = [];

function agregarItem() {
    // Obtén el valor seleccionado del campo "Abertura"
    const itemSelect = document.getElementById("item");
    const selectedItem = itemSelect.value;

    // Obtén el valor ingresado por el usuario para la cantidad
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    // Busca si ya existe una selección del mismo tipo
    const existingSelection = selectedItems.find(selection => selection.item === selectedItem);

    if (existingSelection) {
        // Si existe, agrega la cantidad a la selección existente
        existingSelection.cantidad += cantidad;
    } else {
        // Si no existe, agrega una nueva selección a la lista
        selectedItems.push({ item: selectedItem, cantidad: cantidad });
    }

    // Muestra la selección actual
    mostrarSeleccion();
}

function mostrarSeleccion() {
    // Muestra las selecciones actuales en la página
    const resultadoDiv = document.getElementById("resultado");
    let total = 0;

    resultadoDiv.innerHTML = "<p>Selecciones actuales:</p>";
    resultadoDiv.innerHTML += "<ul>";

    selectedItems.forEach((selection, index) => {
        let manoDeObra = 0;
        let precioItem = 0;

        switch (selection.item) {
            case "puerta":
                manoDeObra = 50000; // Precio de mano de obra para puertas
                precioItem = 50000;
                break;
            case "ventana":
                manoDeObra = 40000; // Precio de mano de obra para ventanas
                precioItem = 30000;
                break;
            case "porton":
                manoDeObra = 80000; // Precio de mano de obra para portones
                precioItem = 80000;
                break;
            default:
                // Tipo de abertura no reconocido
                break;
        }

        const subtotal = selection.cantidad * (manoDeObra + precioItem);
        resultadoDiv.innerHTML += `<li>${selection.cantidad} ${selection.item}(s) - $${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0 })} <button class="borrar-button" onclick="borrarItem(${index})">Borrar</button></li>`;
        total += subtotal;
    });

    resultadoDiv.innerHTML += "</ul>";
    resultadoDiv.innerHTML += `<p class="resultado-total">Total: $${total.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>`;
}

function borrarItem(index) {
    // Elimina una selección de la lista según su índice
    selectedItems.splice(index, 1);
    mostrarSeleccion();
}

function borrarSeleccion() {
    // Borra todas las selecciones
    selectedItems.length = 0;
    mostrarSeleccion();
}
