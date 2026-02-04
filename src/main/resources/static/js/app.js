// API Base URL
const API_URL = '/api/products';

// DOM Elements
const productForm = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const productId = document.getElementById('product-id');
const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const showAllBtn = document.getElementById('show-all-btn');
const productsTbody = document.getElementById('products-tbody');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Event Listeners
    productForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchBtn.addEventListener('click', handleSearch);
    showAllBtn.addEventListener('click', loadProducts);
});

// Load all products
async function loadProducts() {
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        showError('Error loading products: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Display products in table
function displayProducts(products) {
    productsTbody.innerHTML = '';
    
    if (products.length === 0) {
        productsTbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No products found</td></tr>';
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description || 'N/A'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productsTbody.appendChild(row);
    });
}

// Handle form submit
async function handleSubmit(e) {
    e.preventDefault();
    
    const product = {
        name: productName.value,
        description: productDescription.value,
        price: parseFloat(productPrice.value),
        quantity: parseInt(productQuantity.value)
    };
    
    try {
        const id = productId.value;
        let response;
        
        if (id) {
            // Update existing product
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        } else {
            // Create new product
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        }
        
        if (!response.ok) throw new Error('Failed to save product');
        
        showSuccess(id ? 'Product updated successfully!' : 'Product created successfully!');
        resetForm();
        loadProducts();
    } catch (error) {
        showError('Error saving product: ' + error.message);
    }
}

// Edit product
async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        
        const product = await response.json();
        
        productId.value = product.id;
        productName.value = product.name;
        productDescription.value = product.description || '';
        productPrice.value = product.price;
        productQuantity.value = product.quantity;
        
        formTitle.textContent = 'Edit Product';
        submitBtn.textContent = 'Update Product';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        showError('Error loading product: ' + error.message);
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete product');
        
        showSuccess('Product deleted successfully!');
        loadProducts();
    } catch (error) {
        showError('Error deleting product: ' + error.message);
    }
}

// Search products
async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        loadProducts();
        return;
    }
    
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('Failed to search products');
        
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        showError('Error searching products: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Reset form
function resetForm() {
    productForm.reset();
    productId.value = '';
    formTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Add Product';
    cancelBtn.style.display = 'none';
}

// Show loading indicator
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const formSection = document.querySelector('.form-section');
    formSection.insertBefore(successDiv, formSection.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
