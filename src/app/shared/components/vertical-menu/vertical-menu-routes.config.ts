import {RouteInfo} from "./vertical-menu.metada";

export const ROUTES: RouteInfo[] = [
  {
    path: '', title: 'Dashboard', icon: 'home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right me-1 mt-1', isExternalLink: false, submenu: [
      { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: '/pages/test', title: 'Email', icon: 'mail', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/chat', title: 'Chat', icon: 'message-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/chat-ngrx', title: 'Chat NgRx', icon: 'message-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/taskboard', title: 'Task Board', icon: 'file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/taskboard-ngrx', title: 'Task Board NgRx', icon: 'file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/calendar', title: 'Calendar', icon: 'calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  {
    path: '', title: 'UI Kit', icon: 'aperture', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/uikit/grids', title: 'Grid', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/uikit/typography', title: 'Typography', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/uikit/syntaxhighlighter', title: 'Syntax Highlighter', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/uikit/helperclasses', title: 'Helper Classes', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/uikit/textutilities', title: 'Text Utilities', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/uikit/colorpalettes', title: 'Color Palette', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

      {
        path: '', title: 'Icons', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/uikit/feather', title: 'Feather Icon', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/uikit/font-awesome', title: 'Font Awesome Icon', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/uikit/simple-line', title: 'Simple Line Icon', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
    ]
  },
  {
    path: '', title: 'Components', icon: 'box', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Bootstrap', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/components/buttons', title: 'Buttons', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/ng-buttons', title: 'NG Buttons', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/alerts', title: 'Alerts', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/badges', title: 'Badges', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/dropdowns', title: 'Dropdowns', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/media', title: 'Media Objects', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/pagination', title: 'Pagination', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/progress', title: 'Progress Bars', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/models', title: 'Modals', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/collapse', title: 'Collapse', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/lists', title: 'List', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/accordion', title: 'Accordion', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/carousel', title: 'Carousel', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/popover', title: 'Popover', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/rating', title: 'Rating', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/navs', title: 'Navs', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/tooltip', title: 'Tooltip', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/typeahead', title: 'Typeahead', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Extra', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/components/sweetalerts', title: 'Sweet Alert', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/toastr', title: 'Toastr', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/nouislider', title: 'NoUI Slider', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/upload', title: 'Upload', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/dragndrop', title: 'Drag and Drop', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/tour', title: 'Tour', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/cropper', title: 'Image Cropper', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/avatar', title: 'Avatar', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/components/swiper', title: 'Swiper', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
    ]
  },
  {
    path: '', title: 'Forms', icon: 'edit', class: 'has-sub', badge: 'New', badgeClass: 'badge badge-pill badge-primary float-right me-1 mt-1', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Elements', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/forms/inputs', title: 'Inputs', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/input-groups', title: 'Input Groups', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/radio', title: 'Radio', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/checkbox', title: 'Checkbox', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/switch', title: 'Switch', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/select', title: 'Select', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/editor', title: 'Editor', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/tags', title: 'Input Tags', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/datepicker', title: 'Datepicker', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/forms/timepicker', title: 'Timepicker', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      { path: '/forms/layout', title: 'Layouts', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/forms/validation', title: 'Validation', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/forms/archwizard', title: 'Wizard', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '', title: 'Tables', icon: 'grid', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/tables/basic', title: 'Basic', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/tables/extended', title: 'Extended', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/tables/tables', title: 'Angular', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '/datatables', title: 'Data Tables', icon: 'layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Cards', icon: 'layers', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/cards/basic', title: 'Basic Cards', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/cards/advanced', title: 'Advanced Cards', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Maps', icon: 'map', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/maps/google', title: 'Google Map', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/maps/fullscreen', title: 'Full Screen Map', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Charts', icon: 'bar-chart-2', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-success float-right me-1 mt-1', isExternalLink: false,
    submenu: [
      { path: '/charts/chartjs', title: 'ChartJs', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/chartist', title: 'Chartist', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/apex', title: 'Apex', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/charts/ngx', title: 'NGX', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Pages', icon: 'copy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Authentication', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/forgotpassword', title: 'Forgot Password', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/pages/login', title: 'Login', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/pages/register', title: 'Register', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/pages/lockscreen', title: 'Lock Screen', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
      },
      { path: '/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

      {
        path: '', title: 'Vertical Timeline', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/timeline-vertical-center', title: 'Center', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/timeline-vertical-left', title: 'Left', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/timeline-vertical-right', title: 'Right', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Users', icon: 'arrow-right', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/users-list', title: 'List', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/users-view', title: 'View', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/users-edit', title: 'Edit', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      { path: '/pages/account-settings', title: 'Account Settings', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/profile', title: 'User Profile', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/invoice', title: 'Invoice', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/error', title: 'Error', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/pages/comingsoon', title: 'Coming Soon', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/pages/maintenance', title: 'Maintenance', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/pages/gallery', title: 'Gallery', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/search', title: 'Search', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/faq', title: 'FAQ', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/kb', title: 'Knowledge Base', icon: 'arrow-right', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
  { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];
