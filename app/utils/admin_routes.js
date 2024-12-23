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
  {
    id: 3,
    title: "Stages",
    icon: list,
    link: "/stages",
  },
 
];

export default adminRoutes;
