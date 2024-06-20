import { checkLogged, checkLogin } from "../shared/authRequired";
import Home from "../pages/Home";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Search from "../pages/Search";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Success from "../pages/Success";
import Customer from "../pages/Customer";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import OrderDetails from "../pages/Orderdetails";

const publicRoutes = [
    {
        path : "/",
        element : Home,
    },
    {
        path : "/Category-:id",
        element : Category,
    },
    {
        path : "/Login",
        element : checkLogged(Login),
    },
    {
        path : "/ProductDetails-:id",
        element : ProductDetails,
    },
    {
        path : "/Search",
        element : Search,
    },
    {
        path : "/Cart",
        element : Cart,
    },
    {
        path : "/Success",
        element : Success,
    },
    {
        path : "*",
        element : NotFound,
    },
    {
        path : "/Register",
        element : checkLogged(Register),
    },
    {
        path : "/Customer",
        element : checkLogin(Customer),
    },
    {
        path : "/Order-:id",
        element : checkLogin(Order),
    },
    {
        path : "/OrderDetails-:id",
        element : checkLogin(OrderDetails),
    },
]

export default publicRoutes;