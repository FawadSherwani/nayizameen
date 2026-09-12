@extends('layouts.app')

@section('title', 'Nayizameen - Find a Property with Ease and Confidence')

@section('content')

{{-- ============ HERO ============ --}}
<section class="relative bg-gradient-to-b from-primary-50 to-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
            <span class="inline-block text-xs font-semibold tracking-wider text-primary-700 mb-3">
                PAKISTAN'S TRUSTED PROPERTY PORTAL
            </span>
            <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Find a Property with Ease and <span class="text-primary-700">Confidence</span>
            </h1>
            <p class="text-gray-500 text-base md:text-lg mb-6 max-w-md">
                Explore thousands of verified properties for sale, rent and investment across Pakistan.
            </p>

            <div class="flex gap-8">
                @foreach($stats as $stat)
                    <div>
                        <div class="text-2xl md:text-3xl font-bold text-primary-700">{{ $stat['value'] }}</div>
                        <div class="text-sm text-gray-500">{{ $stat['label'] }}</div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="relative h-64 md:h-96 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80"
                 alt="Modern building" class="w-full h-full object-cover rounded-2xl">
        </div>
    </div>

    {{-- ======= SEARCH BOX ======= --}}
    <div class="max-w-6xl mx-auto px-4 md:px-6 -mt-6 md:-mt-10 relative z-10">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6">

            <div class="flex gap-6 border-b border-gray-100 mb-5 text-sm font-medium text-gray-500">
                <button class="pb-3 border-b-2 border-primary-700 text-primary-700">Buy</button>
                <button class="pb-3 hover:text-gray-800">Rent</button>
                <button class="pb-3 hover:text-gray-800">Projects</button>
                <button class="pb-3 hover:text-gray-800">Commercial</button>
            </div>

            <form action="{{ route('home') }}" method="GET" class="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div class="col-span-1 border border-gray-200 rounded-lg px-3 py-2">
                    <label class="text-[11px] text-gray-400 flex items-center gap-1">
                        <i data-lucide="home" class="w-3.5 h-3.5"></i> Property Type
                    </label>
                    <select name="type" class="w-full text-sm font-medium bg-transparent focus:outline-none">
                        <option>All Types</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                    </select>
                </div>

                <div class="col-span-1 border border-gray-200 rounded-lg px-3 py-2">
                    <label class="text-[11px] text-gray-400 flex items-center gap-1">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> Location
                    </label>
                    <select name="location" class="w-full text-sm font-medium bg-transparent focus:outline-none">
                        <option>All Cities</option>
                        <option>Lahore</option>
                        <option>Karachi</option>
                        <option>Islamabad</option>
                    </select>
                </div>

                <div class="col-span-1 border border-gray-200 rounded-lg px-3 py-2">
                    <label class="text-[11px] text-gray-400 flex items-center gap-1">
                        <i data-lucide="ruler" class="w-3.5 h-3.5"></i> Area
                    </label>
                    <select name="area" class="w-full text-sm font-medium bg-transparent focus:outline-none">
                        <option>All Areas</option>
                        <option>5 Marla</option>
                        <option>10 Marla</option>
                        <option>1 Kanal</option>
                    </select>
                </div>

                <div class="col-span-1 border border-gray-200 rounded-lg px-3 py-2">
                    <label class="text-[11px] text-gray-400 flex items-center gap-1">
                        <i data-lucide="tag" class="w-3.5 h-3.5"></i> Purpose
                    </label>
                    <select name="purpose" class="w-full text-sm font-medium bg-transparent focus:outline-none">
                        <option>All Purpose</option>
                        <option>For Sale</option>
                        <option>For Rent</option>
                    </select>
                </div>

                <button type="submit" class="col-span-2 md:col-span-1 bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm">
                    <i data-lucide="search" class="w-4 h-4"></i> Search Properties
                </button>
            </form>

            <div class="flex flex-wrap items-center gap-2 mt-5">
                <span class="text-xs font-medium text-gray-500 mr-1">Popular Searches:</span>
                @foreach($popularSearches as $city)
                    <a href="#" class="text-xs font-medium text-gray-600 border border-gray-200 rounded-full px-3 py-1 hover:border-primary-600 hover:text-primary-700">
                        {{ $city }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- ============ FEATURED PROJECTS ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16">
    <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-900">Featured Projects</h2>
        <a href="#" class="text-sm font-medium text-primary-700 flex items-center gap-1 hover:underline">
            View All Projects <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        @foreach($featuredProjects as $project)
            <div class="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group">
                <div class="relative h-40">
                    <img src="{{ $project['image'] }}" alt="{{ $project['title'] }}" class="w-full h-full object-cover">
                    <span class="absolute top-3 left-3 bg-primary-800/90 text-white text-[10px] font-semibold px-2 py-1 rounded">
                        {{ $project['badge'] }}
                    </span>
                    <button class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                        <i data-lucide="heart" class="w-3.5 h-3.5 text-gray-500"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-900 mb-1">{{ $project['title'] }}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <i data-lucide="map-pin" class="w-3 h-3"></i> {{ $project['location'] }}
                    </p>
                    <p class="text-sm font-semibold text-primary-700 mb-3">{{ $project['price'] }}</p>
                    <a href="#" class="block text-center bg-primary-700 hover:bg-primary-800 text-white text-xs font-medium py-2 rounded-lg">
                        View Details
                    </a>
                </div>
            </div>
        @endforeach
    </div>
</section>

{{-- ============ POPULAR LOCATIONS ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16">
    <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-900">Popular Locations</h2>
        <a href="#" class="text-sm font-medium text-primary-700 flex items-center gap-1 hover:underline">
            View All Locations <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        @foreach($popularLocations as $loc)
            <a href="#" class="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md hover:border-primary-200 transition">
                <div class="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary-50 flex items-center justify-center">
                    <i data-lucide="landmark" class="w-5 h-5 text-primary-700"></i>
                </div>
                <div class="font-medium text-gray-900 text-sm">{{ $loc['name'] }}</div>
                <div class="text-xs text-gray-400">{{ $loc['count'] }}</div>
            </a>
        @endforeach
    </div>
</section>

{{-- ============ FEATURED PROPERTIES ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16">
    <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-900">Featured Properties 1</h2>
        <a href="#" class="text-sm font-medium text-primary-700 flex items-center gap-1 hover:underline">
            View All Properties <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        @foreach($featuredProperties as $prop)
            <div class="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-40">
                    <img src="{{ $prop['image'] }}" alt="{{ $prop['title'] }}" class="w-full h-full object-cover">
                    <div class="absolute top-3 left-3 flex gap-1">
                        @foreach($prop['tags'] as $tag)
                            <span class="bg-primary-800/90 text-white text-[10px] font-semibold px-2 py-1 rounded">{{ $tag }}</span>
                        @endforeach
                    </div>
                    <button class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                        <i data-lucide="heart" class="w-3.5 h-3.5 text-gray-500"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-900 mb-1">{{ $prop['title'] }}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <i data-lucide="map-pin" class="w-3 h-3"></i> {{ $prop['location'] }}
                    </p>
                    <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        @if($prop['area']) <span class="flex items-center gap-1"><i data-lucide="ruler" class="w-3 h-3"></i> {{ $prop['area'] }}</span> @endif
                        @if($prop['beds']) <span class="flex items-center gap-1"><i data-lucide="bed" class="w-3 h-3"></i> {{ $prop['beds'] }} Beds</span> @endif
                        @if($prop['baths']) <span class="flex items-center gap-1"><i data-lucide="bath" class="w-3 h-3"></i> {{ $prop['baths'] }} Baths</span> @endif
                    </div>
                    <p class="text-sm font-semibold text-primary-700">{{ $prop['price'] }}</p>
                </div>
            </div>
        @endforeach
    </div>
</section>

{{-- ============ QUICK LINKS STRIP ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16">
    <div class="bg-gray-50 rounded-2xl border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-5 gap-6">
        @foreach($quickLinks as $link)
            <a href="#" class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary-400">
                    <i data-lucide="{{ $link['icon'] }}" class="w-5 h-5 text-primary-700"></i>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-900">{{ $link['title'] }}</div>
                    <div class="text-xs text-gray-400">{{ $link['desc'] }}</div>
                </div>
            </a>
        @endforeach
    </div>
</section>

{{-- ============ TRUSTED BY ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16">
    <h2 class="text-center text-sm font-semibold text-gray-400 tracking-wider mb-6">TRUSTED BY THOUSANDS</h2>
    <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        @foreach($trustedBy as $brand)
            <span class="text-gray-400 font-medium text-sm">{{ $brand }}</span>
        @endforeach
    </div>
</section>

{{-- ============ CTA BANNER ============ --}}
<section class="max-w-7xl mx-auto px-4 md:px-6 mt-16 mb-4">
    <div class="bg-primary-50 rounded-2xl grid md:grid-cols-2 items-center overflow-hidden">
        <div class="p-8 md:p-10">
            <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Need Help Finding the Right Property?</h3>
            <p class="text-gray-500 mb-4">Our property experts are here to help you.</p>
            <p class="flex items-center gap-2 font-medium text-primary-800 mb-4">
                <i data-lucide="phone" class="w-4 h-4"></i> +92 307 111 6563
            </p>
            <a href="#" class="inline-block bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg">
                Contact Us
            </a>
        </div>
        <div class="h-48 md:h-64">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
                 alt="Interior" class="w-full h-full object-cover">
        </div>
    </div>
</section>

@endsection
