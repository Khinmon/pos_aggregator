odoo.define("pos_aggregator.SessionButton", function (require) {
  "use strict";

  const PosComponent = require("point_of_sale.PosComponent");
  const Registries = require("point_of_sale.Registries");
  const rpc = require("web.rpc");
  const { useState } = owl;
  const { useListener } = require("@web/core/utils/hooks");

  class SessionButton extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
    }

    async onClick() {
      const sessionList = await this.rpc({
        model: "pos.config", // The model you're querying
        method: "search_read", // The method to call on the model
        args: [[["id", "!=", this.env.pos.config.id]]], // Your domain criteria
        fields: ["id", "name"],
      });

      var self = this;
      const { confirmed, payload: employee } = await this.showPopup(
        "SessionPopup",
        {
          title: this.env._t("Change Session"),
          list: sessionList,
        }
      );
      if (!confirmed) {
        return;
      }
    }

    get display_sessions() {
      return [this.env.pos.config.name];
    }
  }
  SessionButton.template = "SessionButton";

  Registries.Component.add(SessionButton);

  return SessionButton;
});
