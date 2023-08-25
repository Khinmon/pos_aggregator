# -*- coding: utf-8 -*-
{
    'name': "POS Aggregator",

    'summary': """
       pos_aggregator""",

    'description': """
        pos_aggregator
    """,

    'author': "KKM",
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['point_of_sale', 'pos_restaurant', 'web'],

    # always loaded
    'data': [
        'data/ticket_scheduler.xml',
        'views/pos_order_views.xml',
        'views/res_config_settings_views.xml',
    ],

    'assets': {
        'point_of_sale.assets': [
            'pos_aggregator/static/src/js/SessionButton.js',
            'pos_aggregator/static/src/js/SessionPopup.js',
            'pos_aggregator/static/src/js/TakeAwayButton.js',
            'pos_aggregator/static/src/js/ProductScreen.js',
            'pos_aggregator/static/src/js/OrderReceipt.js',
            'pos_aggregator/static/src/js/models.js',
            'pos_aggregator/static/src/xml/SessionButton.xml',
            'pos_aggregator/static/src/xml/TakeAwayButton.xml',
            'pos_aggregator/static/src/xml/OrderReceipt.xml',
            'pos_aggregator/static/src/xml/SessionPopup.xml',

        ],
    },


    'sequence': 2,
    'application': True,

}
