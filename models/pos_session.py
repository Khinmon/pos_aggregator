from odoo import models


class PosPaymentMethod(models.Model):
    _inherit = "pos.session"

    def _loader_params_pos_order(self):
        result = super()._loader_params_pos_order()
        result['search_params']['fields'].append('is_takeway')

        return result
