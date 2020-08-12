import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard"));

const Category = React.lazy(() =>
  import("./views/category/categorylist/CategoryList")
);
const District = React.lazy(() =>
  import("./views/district/districtlist/DistrictList")
);
const Voucher = React.lazy(() =>
  import("./views/voucher/voucherlist/VoucherList")
);

const Site = React.lazy(() => import("./views/site/sitelist/SiteList"));

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/category", name: "Category", component: Category },
  { path: "/district", name: "District", component: District },
  { path: "/voucher", name: "Voucher", component: Voucher },
  { path: "/tourist-site", name: "Site", component: Site },
];

export default routes;
