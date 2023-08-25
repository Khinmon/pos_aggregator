odoo.define("pos_aggregator.SessionPopup", function (require) {
  "use strict";

  const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
  const PosComponent = require("point_of_sale.PosComponent");
  const Registries = require("point_of_sale.Registries");
  const rpc = require("web.rpc");
  const { useState } = owl;
  const { useListener } = require("@web/core/utils/hooks");

  class SessionPopup extends AbstractAwaitablePopup {
    setup() {
      super.setup();
      this.state = useState({
        displayMoneyDetailsPopup: false,
      });
    }
    async closeSession(other_session) {
      console.log("other_session", other_session);
      if (!this.closeSessionClicked) {
        window.location = "/web#action=point_of_sale.action_client_pos_menu";
        window.location = "?config_id=" + other_session;
      }
    }

    async sessionconfirm(other_session) {
      console.log(other_session);
      if (!this.cashControl || !this.hasDifference()) {
        this.closeSession(other_session);
      } else if (this.hasUserAuthority()) {
        const { confirmed } = await this.showPopup("ConfirmPopup", {
          title: this.env._t("Payments Difference"),
          body: this.env._t(
            "Do you want to accept payments difference and post a profit/loss journal entry?"
          ),
        });
        if (confirmed) {
          this.closeSession(other_session);
        }
      } else {
        await this.showPopup("ConfirmPopup", {
          title: this.env._t("Payments Difference"),
          body: _.str.sprintf(
            this.env._t(
              "The maximum difference allowed is %s.\n\
                        Please contact your manager to accept the closing difference."
            ),
            this.env.pos.format_currency(this.amountAuthorizedDiff)
          ),
          confirmText: this.env._t("OK"),
        });
      }
    }
  }

  SessionPopup.template = "SessionPopup";

  Registries.Component.add(SessionPopup);

  return SessionPopup;
});
