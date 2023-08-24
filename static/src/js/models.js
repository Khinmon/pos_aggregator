odoo.define("pos_aggregator.receipt", function (require) {
  "use strict";
  var { Order } = require("point_of_sale.models");
  var Registries = require("point_of_sale.Registries");
  const CustomOrder = (Order) =>
    class CustomOrder extends Order {
      export_for_printing() {
        var result = super.export_for_printing(...arguments);
        result.is_takeway = true;
        result.token = 2;
        return result;
      }
    };
  Registries.Model.extend(Order, CustomOrder);
});
