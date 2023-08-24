# -*- coding: utf-8 -*-
from odoo import api, fields, models, _, tools


class PosConfig(models.Model):
    _inherit = "pos.config"

    module_pos_aggregator = fields.Boolean(
        string="Is an Aggregator")


    def search_pos_config(self, config_id):
        data = []
        arrays = self.env['pos.config'].search([])
        # for k in arrays:
        #     data.append({'id': k.id, 'name': k.name})
        return arrays
