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
        key: "dashboards-master-data",
        path: `${APP_PREFIX_PATH}/dashboards/master-data`,
        title: "sidenav.dashboard.master_data",
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "dashboards-master-data-form-factor",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/form-factor`,
            title: "sidenav.dashboard.master_data.model_form_factor",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-form-factor",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/device-status`,
            title: "sidenav.dashboard.master_data.device_status",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-color-depth",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/color-depth`,
            title: "sidenav.dashboard.master_data.color_depth",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-sensor",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/sensor`,
            title: "sidenav.dashboard.master_data.sensor",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-cpu",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/cpu`,
            title: "sidenav.dashboard.master_data.cpu",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-operating-system",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/operating-system`,
            title: "sidenav.dashboard.master_data.os",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-memory-card",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/memory-card`,
            title: "sidenav.dashboard.master_data.mem_card",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-memory-capacity",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/memory-capacity`,
            title: "sidenav.dashboard.master_data.mem_cap",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-battery",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/battery`,
            title: "sidenav.dashboard.master_data.battery",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-resolution",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/resolution`,
            title: "sidenav.dashboard.master_data.resolution",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-sim-card",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/sim-card`,
            title: "sidenav.dashboard.master_data.sim_card",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-mno-parent",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/mno-parent`,
            title: "sidenav.dashboard.master_data.mobile_num",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-mno-product",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/mno-product`,
            title: "sidenav.dashboard.master_data.mobile_num_prod",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-media-portal",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/media-portal`,
            title: "sidenav.dashboard.master_data.media_portal",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-province",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/province`,
            title: "sidenav.dashboard.master_data.province",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-city",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/city`,
            title: "sidenav.dashboard.master_data.city",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-district",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/district`,
            title: "sidenav.dashboard.master_data.district",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "dashboards-master-data-sub-district",
            path: `${APP_PREFIX_PATH}/dashboards/master-data/sub-district`,
            title: "sidenav.dashboard.master_data.sub_district",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
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
      {
        key: "dashboards-custom-page",
        path: `${APP_PREFIX_PATH}/dashboards/custom-page`,
        title: "sidenav.dashboard.custom_page",
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
        key: "compare-product-list",
        path: `${APP_PREFIX_PATH}/handphones/compare/list`,
        title: "sidenav.handphones.compare_hp_list",
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

const operatorsNavTree = [
  {
    key: "operators",
    path: `${APP_PREFIX_PATH}/operators`,
    title: "sidenav.operators",
    icon: AntDesignOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "operators-list_operators",
        path: `${APP_PREFIX_PATH}/operators/list`,
        title: "sidenav.operators.list_operators",
        icon: InfoCircleOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "operators-list_packages",
        path: `${APP_PREFIX_PATH}/operators/packages/list`,
        title: "sidenav.operators.list_packages",
        icon: InfoCircleOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...componentsNavTree,
  ...operatorsNavTree,
];

export default navigationConfig;
