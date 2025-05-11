// Elementos del DOM que se utilizarán en el código
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const addProductForm = document.getElementById('addProductForm');
const productsList = document.getElementById('productsList');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewImg = imagePreview.querySelector('img');

// Elementos del DOM para FAQs
const addFaqForm = document.getElementById('addFaqForm');
const faqsList = document.getElementById('faqsList');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Testimonials Management
const testimonialForm = document.getElementById('testimonialForm');
const testimonialsList = document.getElementById('testimonialsList');

// Función para verificar si el usuario está autenticado
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    }
}

// Manejador del formulario de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación simple de credenciales (admin/1234)
    if (username === 'pato@admin.com' && password === 'patito15') {
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Manejador del botón de logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    showLogin();
});

// Funciones para mostrar/ocultar secciones
function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    loadProducts();
    loadFaqs();
}

function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

// Función para manejar la subida de imágenes
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreviewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');
            document.getElementById('imageUrl').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Función para cargar y mostrar los productos en la tabla
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('productsList');
    
    if (!productsList) {
        console.error('No se encontró el elemento productsList');
        return;
    }

    productsList.innerHTML = '';

    if (products.length === 0) {
        // Si no hay productos, mostrar los predeterminados
        const defaultProducts = [
            {
                teamName: "Barcelona",
                price: "89.990",
                imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hJTIwamVyc2V5fGVufDB8fDB8fHww",
                category: "European Clubs",
                season: "2023-2024",
                type: "Home",
                status: "available"
            },
            {
                teamName: "Real Madrid",
                price: "89.990",
                imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hJTIwamVyc2V5fGVufDB8fDB8fHww",
                category: "European Clubs",
                season: "2023-2024",
                type: "Home",
                status: "available"
            },
            {
                teamName: "Argentina",
                price: "99.990",
                imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hJTIwamVyc2V5fGVufDB8fDB8fHww",
                category: "National Teams",
                season: "2023-2024",
                type: "Home",
                status: "available"
            },
            {
                teamName: "Colo Colo",
                price: "79.990",
                imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hJTIwamVyc2V5fGVufDB8fDB8fHww",
                category: "Latin American Teams",
                season: "2023-2024",
                type: "Home",
                status: "available"
            }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
        loadProducts();
        return;
    }

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200';
        row.innerHTML = `
            <td class="px-4 py-3">
                <div class="flex items-center">
                    <img src="${product.imageUrl}" alt="${product.teamName}" class="h-12 w-12 object-cover rounded mr-3">
                    <span>${product.teamName}</span>
                </div>
            </td>
            <td class="px-4 py-3">$${product.price}</td>
            <td class="px-4 py-3">${product.category}</td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 rounded-full text-sm ${product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${product.status === 'available' ? 'Disponible' : 'No Disponible'}
                </span>
            </td>
            <td class="px-4 py-3">
                <button onclick="editProduct(${index})" class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="ri-edit-line"></i>
                </button>
                <button onclick="toggleProductStatus(${index})" class="text-yellow-600 hover:text-yellow-800 mr-2">
                    <i class="ri-refresh-line"></i>
                </button>
                <button onclick="deleteProduct(${index})" class="text-red-600 hover:text-red-800">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

// Manejador del formulario para agregar nuevos productos
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const product = {
        teamName: document.getElementById('teamName').value,
        price: document.getElementById('price').value,
        imageUrl: document.getElementById('imageUrl').value,
        category: document.getElementById('category').value,
        season: document.getElementById('season').value,
        type: document.getElementById('type').value,
        status: document.getElementById('status').value
    };

    // Guardar el nuevo producto en localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    // Limpiar el formulario y actualizar la lista
    addProductForm.reset();
    imagePreview.classList.add('hidden');
    loadProducts();

    // Mostrar mensaje de éxito
    alert('Producto agregado exitosamente');
});

// Función para editar un producto
window.editProduct = function(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    // Llenar el formulario con los datos del producto
    document.getElementById('teamName').value = product.teamName;
    document.getElementById('price').value = product.price;
    document.getElementById('imageUrl').value = product.imageUrl;
    document.getElementById('category').value = product.category;
    document.getElementById('season').value = product.season;
    document.getElementById('type').value = product.type;
    document.getElementById('status').value = product.status;
    
    // Mostrar la imagen en el preview
    if (product.imageUrl) {
        imagePreviewImg.src = product.imageUrl;
        imagePreview.classList.remove('hidden');
    }
    
    // Eliminar el producto existente
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();

    // Scroll al formulario
    document.getElementById('addProductForm').scrollIntoView({ behavior: 'smooth' });
};

// Función para cambiar el estado de disponibilidad de un producto
window.toggleProductStatus = function(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].status = products[index].status === 'available' ? 'unavailable' : 'available';
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
};

// Función para eliminar un producto
window.deleteProduct = function(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
};

// Manejador de tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Actualizar botones
        tabButtons.forEach(btn => {
            btn.classList.remove('active', 'border-primary', 'text-primary');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        button.classList.add('active', 'border-primary', 'text-primary');
        button.classList.remove('border-transparent', 'text-gray-500');
        
        // Actualizar contenido
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabId}Tab`).classList.remove('hidden');
    });
});

// Función para cargar FAQs desde localStorage
function loadFaqs() {
    const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
    faqsList.innerHTML = '';

    if (faqs.length === 0) {
        // Si no hay FAQs, mostrar las predeterminadas
        const defaultFaqs = [
            {
                question: "¿Las poleras son originales?",
                answer: "Sí, todas nuestras poleras son 100% originales y cuentan con garantía de autenticidad. Trabajamos directamente con proveedores oficiales."
            },
            {
                question: "¿Cuánto tiempo tarda el envío?",
                answer: "Los envíos dentro de Santiago se realizan en 24-48 horas hábiles. Para regiones, el tiempo estimado es de 2-4 días hábiles dependiendo de la localidad."
            },
            {
                question: "¿Puedo personalizar mi polera?",
                answer: "Sí, ofrecemos servicio de personalización con nombres y números. Puedes solicitarlo al momento de realizar tu compra por un costo adicional de $10.000."
            },
            {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos transferencias bancarias, depósitos, tarjetas de crédito/débito a través de WebPay, y efectivo en caso de retiro en tienda."
            },
            {
                question: "¿Cómo puedo saber qué talla elegir?",
                answer: "En cada producto encontrarás una guía de tallas. Si tienes dudas, puedes contactarnos por Instagram o WhatsApp y te ayudaremos a elegir la talla correcta."
            }
        ];
        localStorage.setItem('faqs', JSON.stringify(defaultFaqs));
        loadFaqs();
        return;
    }

    faqs.forEach((faq, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'bg-gray-50 rounded-lg p-4 mb-4';
        faqElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold">${faq.question}</h3>
                <div class="flex space-x-2">
                    <button onclick="editFaq(${index})" class="text-blue-600 hover:text-blue-800">
                        <i class="ri-edit-line"></i>
                    </button>
                    <button onclick="deleteFaq(${index})" class="text-red-600 hover:text-red-800">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
            <p class="text-gray-600">${faq.answer}</p>
        `;
        faqsList.appendChild(faqElement);
    });
}

// Manejador del formulario para agregar nuevas FAQs
addFaqForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const faq = {
        question: document.getElementById('faqQuestion').value,
        answer: document.getElementById('faqAnswer').value
    };

    // Guardar la nueva FAQ en localStorage
    const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
    faqs.push(faq);
    localStorage.setItem('faqs', JSON.stringify(faqs));

    // Limpiar el formulario y actualizar la lista
    addFaqForm.reset();
    loadFaqs();
});

// Función para editar una FAQ
window.editFaq = function(index) {
    const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
    const faq = faqs[index];
    
    // Llenar el formulario con los datos de la FAQ
    document.getElementById('faqQuestion').value = faq.question;
    document.getElementById('faqAnswer').value = faq.answer;
    
    // Eliminar la FAQ existente
    faqs.splice(index, 1);
    localStorage.setItem('faqs', JSON.stringify(faqs));
    
    // Actualizar la lista
    loadFaqs();

    // Scroll al formulario
    document.getElementById('addFaqForm').scrollIntoView({ behavior: 'smooth' });
};

// Función para eliminar una FAQ
window.deleteFaq = function(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
        const faqs = JSON.parse(localStorage.getItem('faqs')) || [];
        faqs.splice(index, 1);
        localStorage.setItem('faqs', JSON.stringify(faqs));
        loadFaqs();
    }
};

// Add new testimonial
testimonialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const initials = document.getElementById('clientInitials').value;
    const text = document.getElementById('testimonialText').value;
    const rating = parseInt(document.getElementById('rating').value);
    
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.push({ name, initials, text, rating });
    
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    testimonialForm.reset();
    loadTestimonials();
});

// Load testimonials from localStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonialsList.innerHTML = '';

    if (testimonials.length === 0) {
        // Si no hay testimonios, mostrar los predeterminados
        const defaultTestimonials = [
            {
                name: "Martín González",
                initials: "MG",
                text: "Excelente calidad en las poleras. Compré la del Barcelona y es idéntica a la original. El envío fue muy rápido y la atención al cliente inmejorable.",
                rating: 5
            },
            {
                name: "Carolina Rodríguez",
                initials: "CR",
                text: "Compré la camiseta de Argentina para mi esposo y quedó encantado. La tela es muy buena y la talla perfecta. Definitivamente volveré a comprar.",
                rating: 4
            },
            {
                name: "Javier Vargas",
                initials: "JV",
                text: "Ya he comprado varias camisetas y todas son de excelente calidad. El proceso de compra es muy sencillo y la comunicación por Instagram es rápida y eficiente.",
                rating: 5
            }
        ];
        localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
        loadTestimonials();
        return;
    }
    
    testimonials.forEach((testimonial, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200';
        
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        row.innerHTML = `
            <td class="px-4 py-3">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ${testimonial.initials}
                    </div>
                    <div class="ml-3">
                        <div class="font-medium">${testimonial.name}</div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-3">${testimonial.text}</td>
            <td class="px-4 py-3 text-yellow-400">${stars}</td>
            <td class="px-4 py-3">
                <button onclick="editTestimonial(${index})" class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="ri-edit-line"></i>
                </button>
                <button onclick="deleteTestimonial(${index})" class="text-red-600 hover:text-red-800">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </td>
        `;
        
        testimonialsList.appendChild(row);
    });
}

// Edit testimonial
window.editTestimonial = function(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    const testimonial = testimonials[index];
    
    // Llenar el formulario con los datos del testimonio
    document.getElementById('clientName').value = testimonial.name;
    document.getElementById('clientInitials').value = testimonial.initials;
    document.getElementById('testimonialText').value = testimonial.text;
    document.getElementById('rating').value = testimonial.rating;
    
    // Eliminar el testimonio existente
    testimonials.splice(index, 1);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    loadTestimonials();

    // Scroll al formulario
    document.getElementById('testimonialForm').scrollIntoView({ behavior: 'smooth' });
};

// Delete testimonial
window.deleteTestimonial = function(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este testimonio?')) {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.splice(index, 1);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        loadTestimonials();
    }
};

// Initialize testimonials and FAQs on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTestimonials();
    loadFaqs();
});

// Inicializar la aplicación verificando el estado de autenticación
checkAuth(); 