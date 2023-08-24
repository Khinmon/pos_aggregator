odoo.define("pos_aggregator.SessionButton", function (require) {
  "use strict";

  const PosComponent = require("point_of_sale.PosComponent");
  const Registries = require("point_of_sale.Registries");
  const rpc = require("web.rpc");
  const { useState } = owl;
  const { identifyError } = require("point_of_sale.utils");
  const {
    ConnectionLostError,
    ConnectionAbortedError,
  } = require("@web/core/network/rpc_service");
  /**
   * @props {models.Order} order
   */
  class SessionButton extends PosComponent {
    setup() {
      this.state = useState({
        displayMoneyDetailsPopup: false,
      });
    }

    get display_sessions() {
      console.log("return this.env.pos.name;", this.env.pos.config.name);
      return [this.env.pos.config.name];
    }

    showSessionButton(val) {
      return this.env.pos && this.env.pos.config.id == val;
    }

    async closeSession(other_session) {
      console.log("other_session", other_session);
      if (!this.closeSessionClicked) {
        window.location = "/web#action=point_of_sale.action_client_pos_menu";
        window.location = "?config_id=" + other_session;
      }
    }

    async confirm(other_session) {
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

    async selectSession() {
      const employeesList = this.env.pos.config((cc) => {
        return {
          id: cc.id,
          name: cc.name,
        };
      });
    }
  }
  SessionButton.template = "SessionButton";

  Registries.Component.add(SessionButton);

  return SessionButton;
});
