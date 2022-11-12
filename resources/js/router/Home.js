let Home = () => import('../pages/Home')
let ProductDetails = () => import('../pages/ProductDetails')
let ProductListing = () => import('../pages/ProductListing')
let TrackOrder = () => import('../pages/TrackOrder')
let AllCategories = () =>  import('../pages/AllCategories')
let AllBrands = () =>  import('../pages/AllBrands')
let AllOffers = () =>  import('../pages/AllOffers')
let OfferDetails = () =>  import('../pages/OfferDetails')

export default [
    {
        path: '/',
        component: Home,
        name: 'Home',
        meta: { requiresAuth: false },
    },
    {
        path: '/all-categories',
        component: AllCategories ,
        name: 'AllCategories',
        meta: { requiresAuth: false },
    },
    {
        path: '/all-brands',
        component: AllBrands ,
        name: 'AllBrands',
        meta: { requiresAuth: false },
    },
    {
        path: '/all-offers',
        component: AllOffers ,
        name: 'AllOffers',
        meta: { requiresAuth: false },
    },
    {
        path: '/offer/:offerSlug?',
        component: OfferDetails ,
        name: 'OfferDetails',
        meta: { requiresAuth: false },
    },
    {
        path: '/shop',
        component: ProductListing ,
        name: 'Shop',
        meta: { requiresAuth: false },
    },
    {
        path: '/category/:categorySlug?',
        component: ProductListing ,
        name: 'Category',
        meta: { requiresAuth: false },
    },
    {
        path: '/brand/:brandId?',
        component: ProductListing ,
        name: 'Brand',
        meta: { requiresAuth: false },
    },
    {
        path: '/search/:keyword?',
        component: ProductListing ,
        name: 'Search',
        meta: { requiresAuth: false },
    },
    {
        path: '/product/:slug',
        component: ProductDetails ,
        name: 'ProductDetails',
        meta: { requiresAuth: false },
    },
    {
        path: '/track-order',
        component: TrackOrder ,
        name: 'TrackOrder',
        meta: { requiresAuth: true },
    },
]