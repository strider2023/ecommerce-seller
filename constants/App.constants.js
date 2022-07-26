import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import DvrRoundedIcon from '@mui/icons-material/DvrRounded';

export const SUPPLIER_HEADER = [
    {
        name: "Home",
        description: "Your very own performance dashboard!",
        link: "/supplier-home",
        value: "supplier-home",
        icon: <HomeRoundedIcon/>
    },
    {
        name: "Products",
        description: "Manage products listed on Lehlah.",
        link: "/products?tab=products",
        value: "products",
        icon: <LocalMallRoundedIcon/>
    },
    {
        name: "Orders",
        description: "Manage orders placed on LehLah.",
        link: "/orders?tab=pending",
        value: "orders",
        icon: <ShoppingCartRoundedIcon/>
    },
    {
        name: "Collections",
        description: "Branding content linked to your seller profile.",
        link: "/collections",
        value: "collections",
        icon: <AutoAwesomeMosaicRoundedIcon/>
    },
    {
        name: "Profile",
        description: "View or update your seller profile.",
        link: "/profile",
        value: "profile",
        icon: <AccountCircleRoundedIcon/>
    },
    // {
    //     name: "Shipping Calculator",
    //     description: "Calculate cost of shipping.",
    //     link: "/shipping",
    //     value: "shipping",
    //     icon: <LocalShippingRoundedIcon/>
    // }
];

export const STYLISTS_HEADER = [
    {
        name: "Styles Metadata",
        description: "Your very own performance dashboard!",
        link: "/metadata",
        value: "metadata",
        icon: <AutoAwesomeRoundedIcon/>
    },
    {
        name: "Collections",
        description: "Branding content linked to your seller profile.",
        link: "/collections",
        value: "collections",
        icon: <AutoAwesomeMosaicRoundedIcon/>
    },
    {
        name: "Profile",
        description: "View or update your profile.",
        link: "/profile",
        value: "profile",
        icon: <AccountCircleRoundedIcon/>
    }
];

export const ADMIN_HEADER = [
    {
        name: "Users",
        description: "Manage application users.",
        link: "/users",
        value: "users",
        icon: <SupervisedUserCircleRoundedIcon/>
    },
    {
        name: "Application Data",
        description: "Manage application wide constants.",
        link: "/app-data",
        value: "app-data",
        icon: <DvrRoundedIcon/>
    },
    {
        name: "Styles Metadata",
        description: "Your very own performance dashboard!",
        link: "/metadata",
        value: "metadata",
        icon: <AutoAwesomeRoundedIcon/>
    },
    {
        name: "Profile",
        description: "View or update your seller profile.",
        link: "/profile",
        value: "profile",
        icon: <AccountCircleRoundedIcon/>
    }
];

export const INFLUENCERS_HEADER = [
    {
        name: "Home",
        description: "Your very own performance dashboard!",
        link: "/supplier-home",
        value: "supplier-home",
        icon: <HomeRoundedIcon/>
    }
];


export const ANONYMOUS_PATHS = ['/', '/register', '/forgot', '/app-data', '/users']

export const SELLER_PATHS = ['/collections', '/orders', '/products', '/profile', '/shipping', '/supplier-home'];

export const INDIAN_LANGUAGES = [
    { id: "English", label: "English" },
    { id: "Bengali", label: "বাংলা (Bengali)" },
    { id: "Gujarati", label: "ગુજરાતી (Gujarati)" },
    { id: "Hindi", label: "हिन्दी (Hindi)" },
    { id: "Kannada", label: "ಕನ್ನಡ (Kannada)" },
    { id: "Malayalam", label: "മലയാളം (Malayalam)" },
    { id: "Marathi", label: "मराठी (Marathi)" },
    { id: "Tamil", label: "தமிழ் (Tamil)" },
    { id: "Telugu", label: "హౌసా (Telugu)" },
  ]
  

