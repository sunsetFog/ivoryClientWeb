const modalHelper = (function (bodyCls) {
  return {
    afterOpen: function () {
      document?.body?.classList?.add(bodyCls);
    },
    beforeClose: function () {
      document?.body?.classList?.remove(bodyCls);
    },
  };
})('modal-open');

export default modalHelper;
