<header class="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        <!-- Logo -->
        <a href="{{ route('home') }}" class="flex items-center gap-2 shrink-0">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <i data-lucide="key-round" class="w-5 h-5 text-white"></i>
            </div>
            <span class="text-lg font-semibold text-gray-900">Nayizameen</span>
        </a>

        <!-- Nav Links -->
        <nav class="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <a href="#" class="hover:text-primary-700">Buy</a>
            <a href="#" class="hover:text-primary-700">Rent</a>
            <a href="#" class="hover:text-primary-700">Projects</a>
            <a href="#" class="hover:text-primary-700">Commercial</a>
            <a href="#" class="hover:text-primary-700">Areas Guide</a>
            <a href="#" class="hover:text-primary-700">Plots</a>
            <div class="relative group">
                <button class="flex items-center gap-1 hover:text-primary-700">
                    Resources <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </button>
                <div class="absolute hidden group-hover:block top-full left-0 bg-white shadow-lg rounded-lg border border-gray-100 py-2 w-48">
                    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-50">Property Trends</a>
                    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-50">Blogs</a>
                    <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-50">FAQs</a>
                </div>
            </div>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3 shrink-0">
            <a href="#" class="hidden sm:block text-sm font-medium text-gray-700 hover:text-primary-700">Login</a>
            <a href="#" class="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                Add Property
            </a>
            <button class="lg:hidden">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </div>
    </div>
</header>
