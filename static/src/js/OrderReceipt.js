odoo.define("pos_aggregator.OrderReceipt", function (require) {
  "use strict";

  const OrderReceipt = require("point_of_sale.OrderReceipt");
  const Registries = require("point_of_sale.Registries");
  var rpc = require("web.rpc");

  const OrderReceiptToken = (OrderReceipt) =>
    class extends OrderReceipt {
      async onWillUpdateProps(nextProps) {
        super.onWillUpdateProps(nextProps);
        var self = this;
        self.token = 0;
        self.is_takeaway = self.env.pos.get_order().is_takeaway;
        self.takeaway = self.env.pos.takeaway;
        if (self.is_takeaway) {
          await rpc
            .query({
              model: "pos.order",
              method: "generate_token",
              args: [, this.env.pos.get_order_with_uid()],
            })
            .then(function (result) {
              self.token = 2;
            });
        }
      }
    };

  Registries.Component.extend(OrderReceipt, OrderReceiptToken);

  return OrderReceipt;
});
