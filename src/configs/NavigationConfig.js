import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "sidenav.dashboard.rss_feed",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-analytic",
        path: `${APP_PREFIX_PATH}/dashboards/analytic`,
        title: "sidenav.dashboard.brand",
        icon: DotChartOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-sales",
        path: `${APP_PREFIX_PATH}/dashboards/sales`,
        title: "sidenav.dashboard.service_center",
        icon: FundOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const appsNavTree = [
  {
    key: "handphones",
    path: `${APP_PREFIX_PATH}/handphones`,
    title: "sidenav.handphones",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "handphones-product-list",
        path: `${APP_PREFIX_PATH}/handphones/product-list`,
        title: "sidenav.handphones.product_list",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "handphones-post-product",
        path: `${APP_PREFIX_PATH}/handphones/post-product`,
        title: "sidenav.handphones.post_product",
        icon: MessageOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "handphones-populer",
        path: `${APP_PREFIX_PATH}/handphones/populer`,
        title: "sidenav.handphones.populer",
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "handphones-master-data",
        path: `${APP_PREFIX_PATH}/handphones/master-data`,
        title: "sidenav.handphones.master_data",
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "handphones-master-data-list",
            path: `${APP_PREFIX_PATH}/handphones/master-data/list`,
            title: "sidenav.handphones.master_data.list",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "handphones-project-scrumboard",
            path: `${APP_PREFIX_PATH}/handphones/project/scrumboard`,
            title: "sidenav.handphones.master_data.scrumboard",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const componentsNavTree = [
  {
    key: "components",
    path: `${APP_PREFIX_PATH}/components`,
    title: "sidenav.data_source",
    icon: AntDesignOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "data_source-hp_populer",
        path: `${APP_PREFIX_PATH}/components/general`,
        title: "sidenav.data_source.hp_populer",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "data_source-hp_populer-google_trend",
            path: `${APP_PREFIX_PATH}/components/general/button`,
            title: "sidenav.data_source.hp_populer.google_trend",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "data_source-hp_populer-shopee",
            path: `${APP_PREFIX_PATH}/components/general/icon`,
            title: "sidenav.data_source.hp_populer.shopee",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "data_source-hp_terlaris",
        path: `${APP_PREFIX_PATH}/components/general`,
        title: "sidenav.data_source.hp_terlaris",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "data_source-hp_terlaris-shopee",
            path: `${APP_PREFIX_PATH}/components/general/button`,
            title: "sidenav.data_source.hp_terlaris.shopee",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...componentsNavTree,
];

export default navigationConfig;
