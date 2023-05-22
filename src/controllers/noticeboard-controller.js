export const noticeboardController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "noticeboard ",
        };
        return h.view("noticeboard-view", viewData);
      },
    },
  };
  