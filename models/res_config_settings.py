# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_aggregator = fields.Boolean(
        related='pos_config_id.module_pos_aggregator', readonly=False)

    pos_token = fields.Integer(help="The token will be start from 1.",
                               string="Token")
    takeaway = fields.Boolean(string="POS Takeaways",
                              help="This will enable the Take Away feature "
                                   "on POS.")

    @api.onchange('pos_aggregator')
    def onchange_pos_aggregator(self):
        if self.pos_aggregator:
            self.pos_module_pos_restaurant = False

    @api.onchange('pos_module_pos_restaurant')
    def onchange_pos_module_pos_restaurant(self):
        if self.pos_module_pos_restaurant:
            self.pos_aggregator = False

    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        res.update(
            takeaway=self.env['ir.config_parameter'].sudo().get_param(
                'pos_takeaway.takeaway'),
            pos_token=self.env['ir.config_parameter'].sudo().get_param(
                'pos_takeaway.pos_token')
        )
        return res

    def set_values(self):
        res = super(ResConfigSettings, self).set_values()
        self.env['ir.config_parameter'].sudo().set_param(
            'pos_takeaway.takeaway',
            self.takeaway or False)
        self.env['ir.config_parameter'].sudo().set_param(
            'pos_takeaway.pos_token',
            self.pos_token or 0)
        return res
