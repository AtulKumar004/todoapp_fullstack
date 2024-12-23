import { list, check, todo, home } from "./Icons";

const adminRoutes = [
  {
    id: 1,
    title: "Orders",
    icon: home,
    link: "/orders",
  },
  {
    id: 2,
    title: "Employees",
    icon: list,
    link: "/employees",
  },
 
];

export default adminRoutes;
