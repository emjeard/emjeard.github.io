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
        key: "dashboards-rss",
        path: `${APP_PREFIX_PATH}/dashboards/rss`,
        title: "sidenav.dashboard.rss_feed",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-brand",
        path: `${APP_PREFIX_PATH}/dashboards/brand`,
        title: "sidenav.dashboard.brand",
        icon: DotChartOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-service-center",
        path: `${APP_PREFIX_PATH}/dashboards/service-center`,
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
        path: `${APP_PREFIX_PATH}/handphones/list`,
        title: "sidenav.handphones.product_list",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "handphones-post-product",
        path: `${APP_PREFIX_PATH}/handphones/post`,
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
        submenu: [
          {
            key: "handphones-populer-hp",
            path: `${APP_PREFIX_PATH}/handphones/populer/hp`,
            title: "sidenav.handphones.populer.hp",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "handphones-populer-komparasi",
            path: `${APP_PREFIX_PATH}/handphones/populer/komparasi`,
            title: "sidenav.handphones.populer.komparasi",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
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
    key: "data_source",
    path: `${APP_PREFIX_PATH}/data-source`,
    title: "sidenav.data_source",
    icon: AntDesignOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "data_source-hp_populer",
        path: `${APP_PREFIX_PATH}/data-source/hp-populer`,
        title: "sidenav.data_source.hp_populer",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "data_source-hp_populer-google_trend",
            path: `${APP_PREFIX_PATH}/data-source/hp-populer/google-trend`,
            title: "sidenav.data_source.hp_populer.google_trend",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "data_source-hp_populer-shopee",
            path: `${APP_PREFIX_PATH}/data-source/hp-populer/shopee`,
            title: "sidenav.data_source.hp_populer.shopee",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "data_source-hp_terlaris",
        path: `${APP_PREFIX_PATH}/data-source/hp-terlaris`,
        title: "sidenav.data_source.hp_terlaris",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "data_source-hp_terlaris-shopee",
            path: `${APP_PREFIX_PATH}/data-source/hp-terlaris/shopee`,
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
