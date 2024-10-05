$(document).ready(function() {
    $('#myTable').DataTable();

    
    let cart = [];
    
    
    $('.view-products').click(function() {
        $('#product-view').show();
        $('#datatable-view').hide();
        $('#cart-view').hide();
    });

    $('.view-datatable').click(function() {
        $('#product-view').hide();
        $('#datatable-view').show();
        $('#cart-view').hide();
    });

    $('.view-cart').click(function() {
        $('#product-view').hide();
        $('#datatable-view').hide();
        $('#cart-view').show();
        updateCartView();
    });

    // Agregar 
    $('.add-to-cart').click(function() {
        const product = $(this).closest('.product');
        const name = product.data('name');
        const price = product.data('price');
        cart.push({ name: name, price: price });
        $('.cart-count').text(cart.length); 
    });

    // Actualiza 
    function updateCartView() {
        $('#cart-items').empty(); 
        let total = 0; 
        cart.forEach((item, index) => {
            $('#cart-items').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td><button class="remove-from-cart" data-index="${index}">Eliminar</button></td>
                </tr>
            `);
            total += item.price; 
        });
        $('#cart-items').append(`
            <tr>
                <td colspan="2"><strong>Total Productos: $${total.toFixed(2)}</strong></td>
            </tr>
        `);
    }

    // Proceder a la compra 
    $('#checkout-button').click(function() {
        const descuentoPorcentaje = parseFloat($('#input-descuento').val()) || 0; 
        const costoEnvio = parseFloat($('#input-envio').val()) || 0; 
        let totalCarrito = 0;

        // Calcula el total
        cart.forEach(item => {
            totalCarrito += item.price;
        });

        // Descuento
        if (descuentoPorcentaje > 0 && descuentoPorcentaje <= 100) {
            const descuento = (totalCarrito * descuentoPorcentaje) / 100; 
            totalCarrito -= descuento;
        }

        // Suma 
        totalCarrito += costoEnvio;

        alert(`Total a pagar: $${totalCarrito.toFixed(2)}\n(Incluye un ${descuentoPorcentaje}% de descuento y envío de $${costoEnvio})`);
    });

    

    // Eliminar 
    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        cart.splice(index, 1); 
        $('.cart-count').text(cart.length); 
        updateCartView(); 
    });

    // Vaciar 
    $('#clear-cart-button').click(function() {
        cart = []; 
        $('.cart-count').text(cart.length); 
        updateCartView(); 
    });
});
