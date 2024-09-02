export type configType = {
  site: {
    url: string;
    title: string;
    type: 'website' | 'article' | 'product';
    icon: string;
    icon16: string;
    icon32: string;
    icon192: string;
    icon256: string;
    shortcutIcon: string;
    image: string;
  };
  pages: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
};
