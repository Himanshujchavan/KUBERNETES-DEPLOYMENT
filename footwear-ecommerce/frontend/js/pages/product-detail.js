import { fetchProductById } from "../services/product-service.js"
import { addToCart } from "../services/cart-service.js"
import { updateCartCount } from "../components/header.js"
import { fetchProducts } from "../services/product-service.js" // Declare fetchProducts
import { createProductCard } from "../components/product-card.js" // Declare createProductCard

export async function loadProductDetailPage(productId) {
  const contentContainer = document.getElementById("content-container")

  // Show loading state
  contentContainer.innerHTML = `
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  `

  try {
    // Fetch product details
    const product = await fetchProductById(productId)

    if (!product) {
      throw new Error("Product not found")
    }

    // Prepare HTML content
    const productDetailHTML = `
      <div class="container mx-auto py-8 px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Images -->
          <div class="space-y-4">
            <div class="bg-white rounded-lg overflow-hidden">
              <img id="main-image" src="${product.image}" alt="${product.name}" class="w-full h-auto object-cover">
            </div>
            
            <div class="grid grid-cols-4 gap-2">
              <div class="cursor-pointer border-2 border-transparent hover:border-primary rounded-md overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-cover thumbnail-image">
              </div>
              <div class="cursor-pointer border-2 border-transparent hover:border-primary rounded-md overflow-hidden">
                <img src="https://picsum.photos/seed/${product.id}-2/300/300" alt="${product.name}" class="w-full h-auto object-cover thumbnail-image">
              </div>
              <div class="cursor-pointer border-2 border-transparent hover:border-primary rounded-md overflow-hidden">
                <img src="https://picsum.photos/seed/${product.id}-3/300/300" alt="${product.name}" class="w-full h-auto object-cover thumbnail-image">
              </div>
              <div class="cursor-pointer border-2 border-transparent hover:border-primary rounded-md overflow-hidden">
                <img src="https://picsum.photos/seed/${product.id}-4/300/300" alt="${product.name}" class="w-full h-auto object-cover thumbnail-image">
              </div>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold mb-2">${product.name}</h1>
              <p class="text-gray-600 mb-4">${product.category}</p>
              <div class="flex items-center mb-4">
                <div class="flex text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-gray-600 ml-2">(24 reviews)</span>
              </div>
              <p class="text-2xl font-bold text-primary">₹${product.price}</p>
            </div>
            
            <div class="border-t border-b py-4">
              <p class="text-gray-700">
                Premium quality ${product.category.toLowerCase()} footwear designed for maximum comfort and durability. 
                Perfect for everyday use with ergonomic design and cushioned insole.
              </p>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 font-medium mb-2">Size</label>
                <div class="flex flex-wrap gap-2">
                  <button class="size-btn w-10 h-10 rounded-md border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">6</button>
                  <button class="size-btn w-10 h-10 rounded-md border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">7</button>
                  <button class="size-btn w-10 h-10 rounded-md border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">8</button>
                  <button class="size-btn w-10 h-10 rounded-md border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">9</button>
                  <button class="size-btn w-10 h-10 rounded-md border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">10</button>
                </div>
              </div>
              
              <div>
                <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                <div class="flex items-center">
                  <button id="decrease-qty" class="w-10 h-10 rounded-l-md border flex items-center justify-center hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input type="number" id="quantity" value="1" min="1" class="w-16 h-10 border-t border-b text-center focus:outline-none">
                  <button id="increase-qty" class="w-10 h-10 rounded-r-md border flex items-center justify-center hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <button id="add-to-cart-btn" class="btn btn-primary flex-1 py-3">Add to Cart</button>
              <button id="wishlist-btn" class="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Add to Wishlist
              </button>
            </div>
            
            <div class="border-t pt-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over ₹999
              </div>
              <div class="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                30-day easy returns
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Description Tabs -->
        <div class="mt-16">
          <div class="border-b">
            <div class="flex flex-wrap -mb-px">
              <button class="tab-btn inline-block p-4 border-b-2 border-primary text-primary" data-tab="description">Description</button>
              <button class="tab-btn inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300" data-tab="specifications">Specifications</button>
              <button class="tab-btn inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300" data-tab="reviews">Reviews</button>
            </div>
          </div>
          
          <div class="py-6">
            <div id="description-tab" class="tab-content">
              <h3 class="text-lg font-semibold mb-4">Product Description</h3>
              <p class="text-gray-700 mb-4">
                Experience ultimate comfort with our premium ${product.name}. Designed with the latest technology and high-quality materials, these shoes provide exceptional support and durability for everyday wear.
              </p>
              <p class="text-gray-700 mb-4">
                The breathable upper material keeps your feet cool and comfortable all day long, while the cushioned insole provides excellent shock absorption. The durable outsole offers superior traction on various surfaces, making these shoes perfect for any activity.
              </p>
              <p class="text-gray-700">
                Available in multiple sizes and colors, these versatile shoes are a must-have addition to your footwear collection.
              </p>
            </div>
            
            <div id="specifications-tab" class="tab-content hidden">
              <h3 class="text-lg font-semibold mb-4">Product Specifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium mb-2">Materials</h4>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Upper: Premium synthetic leather</li>
                    <li>Insole: Memory foam cushioning</li>
                    <li>Outsole: Durable rubber</li>
                    <li>Lining: Breathable mesh</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Features</h4>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Lightweight design</li>
                    <li>Shock absorption</li>
                    <li>Anti-slip outsole</li>
                    <li>Moisture-wicking lining</li>
                  </ul>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="font-medium mb-2">Care Instructions</h4>
                <p class="text-gray-700">
                  Clean with a damp cloth and mild soap. Air dry away from direct heat or sunlight. Do not machine wash or tumble dry.
                </p>
              </div>
            </div>
            
            <div id="reviews-tab" class="tab-content hidden">
              <h3 class="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div class="space-y-6">
                <div class="border-b pb-4">
                  <div class="flex items-center mb-2">
                    <div class="flex text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="ml-2 font-medium">Rahul S.</span>
                    <span class="ml-auto text-sm text-gray-500">2 weeks ago</span>
                  </div>
                  <p class="text-gray-700">
                    Extremely comfortable and stylish. I've been wearing these for a week now and they still feel great. Highly recommend!
                  </p>
                </div>
                
                <div class="border-b pb-4">
                  <div class="flex items-center mb-2">
                    <div class="flex text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="ml-2 font-medium">Priya M.</span>
                    <span class="ml-auto text-sm text-gray-500">1 month ago</span>
                  </div>
                  <p class="text-gray-700">
                    Good quality but runs a bit small. I had to exchange for a larger size. Customer service was very helpful with the exchange process.
                  </p>
                </div>
                
                <div>
                  <div class="flex items-center mb-2">
                    <div class="flex text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="ml-2 font-medium">Vikram J.</span>
                    <span class="ml-auto text-sm text-gray-500">2 months ago</span>
                  </div>
                  <p class="text-gray-700">
                    Decent shoes for the price. They look good but I'm not sure how long they'll last with regular use. Comfortable enough for short periods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Products -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-8">You May Also Like</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="related-products">
            <!-- Related products will be inserted here -->
          </div>
        </div>
      </div>
    `

    // Update content
    contentContainer.innerHTML = productDetailHTML

    // Add event listeners
    document.getElementById("decrease-qty").addEventListener("click", () => {
      const quantityInput = document.getElementById("quantity")
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1
      }
    })

    document.getElementById("increase-qty").addEventListener("click", () => {
      const quantityInput = document.getElementById("quantity")
      const currentValue = Number.parseInt(quantityInput.value)
      quantityInput.value = currentValue + 1
    })

    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      const quantity = Number.parseInt(document.getElementById("quantity").value)
      const selectedSize = document.querySelector(".size-btn.selected")?.textContent || "8"

      // Add product to cart with selected options
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
      })

      // Update cart count
      updateCartCount()

      // Show notification
      showAddedToCartNotification(product.name)
    })

    // Size buttons
    document.querySelectorAll(".size-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        // Remove selected class from all size buttons
        document.querySelectorAll(".size-btn").forEach((btn) => {
          btn.classList.remove("selected", "bg-primary", "text-white")
        })

        // Add selected class to clicked button
        e.target.classList.add("selected", "bg-primary", "text-white")
      })
    })

    // Tab buttons
    document.querySelectorAll(".tab-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.add("hidden")
        })

        // Remove active class from all tab buttons
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.remove("border-primary", "text-primary")
          btn.classList.add("border-transparent", "hover:text-gray-600", "hover:border-gray-300")
        })

        // Add active class to clicked tab button
        e.target.classList.add("border-primary", "text-primary")
        e.target.classList.remove("border-transparent", "hover:text-gray-600", "hover:border-gray-300")

        // Show selected tab content
        const tabId = e.target.dataset.tab
        document.getElementById(`${tabId}-tab`).classList.remove("hidden")
      })
    })

    // Thumbnail images
    document.querySelectorAll(".thumbnail-image").forEach((img) => {
      img.addEventListener("click", (e) => {
        document.getElementById("main-image").src = e.target.src

        // Update border for selected thumbnail
        document.querySelectorAll(".thumbnail-image").forEach((thumb) => {
          thumb.parentElement.classList.remove("border-primary")
          thumb.parentElement.classList.add("border-transparent")
        })
        e.target.parentElement.classList.remove("border-transparent")
        e.target.parentElement.classList.add("border-primary")
      })
    })

    // Load related products
    loadRelatedProducts(product.category)
  } catch (error) {
    console.error("Error loading product detail page:", error)
    contentContainer.innerHTML = `
      <div class="container mx-auto py-16 px-4 text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
        <p class="mb-8">We couldn't find the product you're looking for. It may have been removed or doesn't exist.</p>
        <button class="btn btn-primary" onclick="history.back()">Go Back</button>
      </div>
    `
  }
}

function showAddedToCartNotification(productName) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transform translate-y-10 opacity-0 transition-all duration-300"
  notification.textContent = `${productName} added to cart`

  // Add to DOM
  document.body.appendChild(notification)

  // Trigger animation
  setTimeout(() => {
    notification.classList.remove("translate-y-10", "opacity-0")
  }, 10)

  // Remove after delay
  setTimeout(() => {
    notification.classList.add("translate-y-10", "opacity-0")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

async function loadRelatedProducts(category) {
  try {
    const products = await fetchProducts()

    // Filter related products by category
    const relatedProducts = products
      .filter((product) => product.category.toLowerCase().includes(category.toLowerCase()))
      .slice(0, 4)

    // Add related products to the page
    const relatedProductsContainer = document.getElementById("related-products")

    if (relatedProductsContainer) {
      relatedProducts.forEach((product) => {
        relatedProductsContainer.appendChild(createProductCard(product))
      })
    }
  } catch (error) {
    console.error("Error loading related products:", error)
  }
}
