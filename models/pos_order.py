# -*- coding: utf-8 -*-

from odoo import fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    is_takeaway = fields.Boolean(default=False, string="Is a Takeaway Order",
                                 help="Is a Takeaway Order")
    token_number = fields.Char(string="Token Number",
                               help="Token number starts from 1")

    def generate_token(self, uid):
        import pdb
        pdb.set_trace()
        uid = "Order " + uid[0]
        order = self.env['pos.order'].search([('pos_reference', 'ilike', uid)])
        order.is_takeaway = True
        if not order.token_number:
            if self.env['res.config.settings'].get_values()[
                    'pos_token']:
                order.token_number = int(
                    self.env['res.config.settings'].get_values()[
                        'pos_token']) + 1
            else:
                order.token_number = 1
            self.env['ir.config_parameter'].sudo().set_param(
                'pos_takeaway.pos_token',
                order.token_number)
            return order.token_number

        else:
            return 0

    def ticket_scheduler(self):
        """This function will reset the Token to 0 by a cron job."""

        generate_token = self.env['ir.config_parameter'].sudo().get_param(
            'generate_token')
        if generate_token:
            self.env['ir.config_parameter'].sudo().set_param('pos_token', 0)
