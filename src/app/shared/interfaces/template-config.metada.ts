export interface ITemplateConfig
{
  layout: {
    variant: string;                   // options: Dark, Light & Transparent
    menuPosition: string;              // options: Side, Top (Note: Use 'Side' for Vertical Menu & 'Top' for Horizontal Menu )
    customizer: {
      hidden: boolean;               // options: true, false
    };
    navbar: {
      type: string;                     // options: Static & Fixed
    }
    sidebar: { //Options for Vertical Side menu
      collapsed: boolean;             // options: true, false
      size: string;                   // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
      backgroundColor: string;        // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'

      /* If you want transparent layout add any of the following mentioned classes to backgroundColor of sidebar option :
        bg-glass-1, bg-glass-2, bg-glass-3, bg-glass-4, bg-hibiscus, bg-purple-pizzaz, bg-blue-lagoon, bg-electric-viloet, bg-protage, bg-tundora
      */
      backgroundImage: boolean;        // Options: true, false | Set true to show background image
      backgroundImageURL: string;
    }
  };
}
