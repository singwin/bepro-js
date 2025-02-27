require(['gitbook', 'jquery'], (gitbook, $) => {
  const SITES = {
    facebook: {
      label: 'Facebook',
      icon: 'fa fa-facebook',
      onClick(e) {
        e.preventDefault();
        window.open(`http://www.facebook.com/sharer/sharer.php?s=100&p[url]=${encodeURIComponent(location.href)}`);
      },
    },
    twitter: {
      label: 'Twitter',
      icon: 'fa fa-twitter',
      onClick(e) {
        e.preventDefault();
        window.open(`http://twitter.com/home?status=${encodeURIComponent(`${document.title} ${location.href}`)}`);
      },
    },
    google: {
      label: 'Google+',
      icon: 'fa fa-google-plus',
      onClick(e) {
        e.preventDefault();
        window.open(`https://plus.google.com/share?url=${encodeURIComponent(location.href)}`);
      },
    },
    weibo: {
      label: 'Weibo',
      icon: 'fa fa-weibo',
      onClick(e) {
        e.preventDefault();
        window.open(`http://service.weibo.com/share/share.php?content=utf-8&url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}`);
      },
    },
    instapaper: {
      label: 'Instapaper',
      icon: 'fa fa-instapaper',
      onClick(e) {
        e.preventDefault();
        window.open(`http://www.instapaper.com/text?u=${encodeURIComponent(location.href)}`);
      },
    },
    vk: {
      label: 'VK',
      icon: 'fa fa-vk',
      onClick(e) {
        e.preventDefault();
        window.open(`http://vkontakte.ru/share.php?url=${encodeURIComponent(location.href)}`);
      },
    },
  };


  gitbook.events.bind('start', (e, config) => {
    const opts = config.sharing;

    // Create dropdown menu
    const menu = $.map(opts.all, (id) => {
      const site = SITES[id];

      return {
        text: site.label,
        onClick: site.onClick,
      };
    });

    // Create main button with dropdown
    if (menu.length > 0) {
      gitbook.toolbar.createButton({
        icon: 'fa fa-share-alt',
        label: 'Share',
        position: 'right',
        dropdown: [menu],
      });
    }

    // Direct actions to share
    $.each(SITES, (sideId, site) => {
      if (!opts[sideId]) return;

      gitbook.toolbar.createButton({
        icon: site.icon,
        label: site.text,
        position: 'right',
        onClick: site.onClick,
      });
    });
  });
});
