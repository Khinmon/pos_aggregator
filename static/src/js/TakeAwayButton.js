odoo.define("pos_aggregator.TakeAwayButton", function (require) {
  "use strict";
  const PosComponent = require("point_of_sale.PosComponent");
  const ProductScreen = require("point_of_sale.ProductScreen");
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require("point_of_sale.Registries");

  //Extending the PosComponent to enable the takeaway for the order.
  class TakeAwayButton extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
    }

    async onClick() {
      var selectedOrder = this.env.pos.get_order();
      selectedOrder.initialize_validation_date();
      if (selectedOrder.is_empty()) {
        return alert("Please add product!!");
      } else {
        const sendButton = document.getElementById("takeaway_button_id");
        sendButton.className = "control-button highlight";
        selectedOrder.is_takeaway = true;
      }
    }
  }

  TakeAwayButton.template = "TakeAwayButton";

  ProductScreen.addControlButton({
    component: TakeAwayButton,
  });

  Registries.Component.add(TakeAwayButton);
  return TakeAwayButton;
});
