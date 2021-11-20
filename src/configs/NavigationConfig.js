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
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    title: "sidenav.handphone",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "apps-mail",
        path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
        title: "sidenav.handphone.product_list",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "apps-chat",
        path: `${APP_PREFIX_PATH}/apps/chat`,
        title: "sidenav.handphone.post_product",
        icon: MessageOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "apps-calendar",
        path: `${APP_PREFIX_PATH}/apps/calendar`,
        title: "sidenav.handphone.populer",
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "apps-project",
        path: `${APP_PREFIX_PATH}/apps/project`,
        title: "sidenav.handphone.master_data",
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "apps-project-list",
            path: `${APP_PREFIX_PATH}/apps/project/list`,
            title: "sidenav.handphone.master_data.list",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-project-scrumboard",
            path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
            title: "sidenav.handphone.master_data.scrumboard",
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
        key: "components-general",
        path: `${APP_PREFIX_PATH}/components/general`,
        title: "sidenav.data_source.hp_populer",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "components-general-button",
            path: `${APP_PREFIX_PATH}/components/general/button`,
            title: "sidenav.data_source.hp_populer.google_trend",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "components-general-icon",
            path: `${APP_PREFIX_PATH}/components/general/icon`,
            title: "sidenav.data_source.hp_populer.shopee",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "hp-terlaris",
        path: `${APP_PREFIX_PATH}/components/general`,
        title: "sidenav.data_source.hp_terlaris",
        icon: InfoCircleOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "components-general-button",
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
